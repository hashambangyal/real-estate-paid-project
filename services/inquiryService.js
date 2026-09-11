import { prisma } from "@/lib/prisma";
import { sendInquiryEmail, sendInquiryReplyEmail } from "@/services/emailService";

// Helper for percentage diff
function calcPctChange(current, previous) {
  if (previous === 0) {
    return current > 0 ? "+100%" : "0%";
  }
  const diff = Math.round(((current - previous) / previous) * 100);
  return diff >= 0 ? `+${diff}%` : `${diff}%`;
}

// ----------------------------------------------------
// Create Inquiry
// ----------------------------------------------------
export async function createInquiry(data) {
  const {
    name,
    email,
    phone,
    message,
    propertyId,
  } = data;

  if (!name?.trim()) {
    throw new Error("Name is required");
  }

  if (!email?.trim()) {
    throw new Error("Email is required");
  }

  if (!message?.trim()) {
    throw new Error("Message is required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    throw new Error("Invalid email address");
  }

  const inquiry = await prisma.inquiry.create({
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      message: message.trim(),
      propertyId: propertyId?.trim() || null,
      status: "NEW",
    },
    include: {
      property: {
        include: {
          city: true,
          images: {
            take: 1,
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  // Send admin notification
  try {
    await sendInquiryEmail({
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      message: inquiry.message,
    });
  } catch (error) {
    console.error("Inquiry notification email failed:", error);
  }

  return inquiry;
}

// ----------------------------------------------------
// Get Inquiries (with Search, Status, Date filters & Pagination)
// ----------------------------------------------------
export async function getInquiries({
  search = "",
  status = "",
  dateFilter = "",
  sortBy = "createdAt",
  sortOrder = "desc",
  page = 1,
  limit = 20,
} = {}) {
  const where = {};

  // Text search
  if (search && search.trim()) {
    const term = search.trim();
    where.OR = [
      { name: { contains: term, mode: "insensitive" } },
      { email: { contains: term, mode: "insensitive" } },
      { phone: { contains: term, mode: "insensitive" } },
      { message: { contains: term, mode: "insensitive" } },
      {
        property: {
          title: { contains: term, mode: "insensitive" },
        },
      },
    ];
  }

  // Status filter
  if (status && status !== "ALL") {
    where.status = status;
  }

  // Date range filter
  if (dateFilter && dateFilter !== "ALL") {
    const now = new Date();
    if (dateFilter === "today") {
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      where.createdAt = { gte: startOfDay };
    } else if (dateFilter === "week") {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      where.createdAt = { gte: sevenDaysAgo };
    } else if (dateFilter === "month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      where.createdAt = { gte: startOfMonth };
    }
  }

  // Sorting
  const allowedSortFields = ["createdAt", "name", "status"];
  const finalSortBy = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
  const finalSortOrder = sortOrder === "asc" ? "asc" : "desc";

  const numPage = Math.max(1, Number(page) || 1);
  const numLimit = Math.max(1, Math.min(100, Number(limit) || 20));
  const skip = (numPage - 1) * numLimit;

  const [inquiries, total] = await Promise.all([
    prisma.inquiry.findMany({
      where,
      skip,
      take: numLimit,
      orderBy: {
        [finalSortBy]: finalSortOrder,
      },
      include: {
        property: {
          include: {
            city: true,
            images: {
              take: 1,
              orderBy: { order: "asc" },
            },
          },
        },
      },
    }),
    prisma.inquiry.count({ where }),
  ]);

  return {
    inquiries,
    pagination: {
      page: numPage,
      limit: numLimit,
      total,
      totalPages: Math.ceil(total / numLimit) || 1,
    },
  };
}

// ----------------------------------------------------
// Get Inquiry By ID
// ----------------------------------------------------
export async function getInquiryById(id) {
  if (!id) {
    throw new Error("Inquiry ID is required");
  }

  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: {
      property: {
        include: {
          city: true,
          images: {
            take: 1,
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!inquiry) {
    throw new Error("Inquiry not found");
  }

  return inquiry;
}

// ----------------------------------------------------
// Update Inquiry Status
// ----------------------------------------------------
export async function updateInquiryStatus(id, status) {
  if (!id) {
    throw new Error("Inquiry ID is required");
  }

  const validStatuses = ["NEW", "IN_PROGRESS", "REPLIED", "CLOSED"];
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status: ${status}. Must be one of: ${validStatuses.join(", ")}`);
  }

  const updated = await prisma.inquiry.update({
    where: { id },
    data: { status },
    include: {
      property: {
        include: {
          city: true,
          images: {
            take: 1,
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  return updated;
}

// ----------------------------------------------------
// Reply to Inquiry via Email and update status to REPLIED
// ----------------------------------------------------
export async function replyToInquiry(id, { subject, message }) {
  if (!id) {
    throw new Error("Inquiry ID is required");
  }
  if (!message?.trim()) {
    throw new Error("Reply message cannot be empty");
  }

  const inquiry = await getInquiryById(id);

  // Send reply email to client
  await sendInquiryReplyEmail({
    to: inquiry.email,
    clientName: inquiry.name,
    subject: subject?.trim() || `Re: Inquiry regarding ${inquiry.property?.title || "Property"}`,
    message: message.trim(),
  });

  // Update status in database
  const updated = await prisma.inquiry.update({
    where: { id },
    data: { status: "REPLIED" },
    include: {
      property: {
        include: {
          city: true,
          images: {
            take: 1,
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  return updated;
}

// ----------------------------------------------------
// Delete Inquiry
// ----------------------------------------------------
export async function deleteInquiry(id) {
  if (!id) {
    throw new Error("Inquiry ID is required");
  }

  const inquiry = await getInquiryById(id);

  await prisma.inquiry.delete({
    where: { id },
  });

  return inquiry;
}

// ----------------------------------------------------
// Get Inquiry Analytics & Metric Cards Stats
// ----------------------------------------------------
export async function getInquiryStats() {
  const now = new Date();

  // Time boundaries
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  // Parallel database aggregates
  const [
    totalCount,
    last30DaysCount,
    prev30DaysCount,
    thisWeekCount,
    lastWeekCount,
    todayCount,
    yesterdayCount,
    uniqueUsersAll,
    uniqueUsersLast30,
    uniqueUsersPrev30,
    newCount,
    inProgressCount,
    repliedCount,
    closedCount,
  ] = await Promise.all([
    // Total
    prisma.inquiry.count(),
    // 30 Days
    prisma.inquiry.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.inquiry.count({ where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } } }),
    // This Week vs Last Week
    prisma.inquiry.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.inquiry.count({ where: { createdAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo } } }),
    // Today vs Yesterday
    prisma.inquiry.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.inquiry.count({ where: { createdAt: { gte: startOfYesterday, lt: startOfToday } } }),
    // Unique Users
    prisma.inquiry.groupBy({ by: ["email"] }),
    prisma.inquiry.groupBy({ by: ["email"], where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.inquiry.groupBy({ by: ["email"], where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } } }),
    // Status breakdown
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.inquiry.count({ where: { status: "IN_PROGRESS" } }),
    prisma.inquiry.count({ where: { status: "REPLIED" } }),
    prisma.inquiry.count({ where: { status: "CLOSED" } }),
  ]);

  return {
    totalInquiries: {
      value: totalCount,
      change: calcPctChange(last30DaysCount, prev30DaysCount),
      period: "vs. last 30 days",
    },
    thisWeek: {
      value: thisWeekCount,
      change: calcPctChange(thisWeekCount, lastWeekCount),
      period: "vs. last week",
    },
    today: {
      value: todayCount,
      change: calcPctChange(todayCount, yesterdayCount),
      period: "vs. yesterday",
    },
    uniqueUsers: {
      value: uniqueUsersAll.length,
      change: calcPctChange(uniqueUsersLast30.length, uniqueUsersPrev30.length),
      period: "vs. last 30 days",
    },
    statusCounts: {
      NEW: newCount,
      IN_PROGRESS: inProgressCount,
      REPLIED: repliedCount,
      CLOSED: closedCount,
      ALL: totalCount,
    },
  };
}