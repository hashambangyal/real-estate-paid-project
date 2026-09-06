import { prisma } from "@/lib/prisma";
import { sendInquiryEmail } from "@/services/emailService";


// Create Inquiry
export async function createInquiry(data) {
  const {
    name,
    email,
    phone,
    message,
  } = data;

  // Validation
  if (!name?.trim()) {
    throw new Error("Name is required");
  }

  if (!email?.trim()) {
    throw new Error("Email is required");
  }

  if (!message?.trim()) {
    throw new Error("Message is required");
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    throw new Error("Invalid email address");
  }

  // Save inquiry in database
  const inquiry = await prisma.inquiry.create({
    data: {
      name: name.trim(),

      email: email
        .trim()
        .toLowerCase(),

      phone:
        phone?.trim() || null,

      message:
        message.trim(),
    },
  });

  // Send notification email
  try {
    await sendInquiryEmail({
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      message: inquiry.message,
    });
  } catch (error) {
    console.error(
      "Inquiry saved but email sending failed:",
      error
    );
  }

  return inquiry;
}


// Get All Inquiries
export async function getInquiries() {
  return await prisma.inquiry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}


// Get Inquiry By ID
export async function getInquiryById(id) {
  if (!id) {
    throw new Error("Inquiry ID is required");
  }

  const inquiry = await prisma.inquiry.findUnique({
    where: {
      id,
    },
  });

  if (!inquiry) {
    throw new Error("Inquiry not found");
  }

  return inquiry;
}


// Delete Inquiry
export async function deleteInquiry(id) {
  if (!id) {
    throw new Error("Inquiry ID is required");
  }

  const inquiry = await getInquiryById(id);

  await prisma.inquiry.delete({
    where: {
      id,
    },
  });

  return inquiry;
}