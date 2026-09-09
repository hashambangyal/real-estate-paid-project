import { prisma } from '@/lib/prisma';

export async function getDashboardStats() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  // 1. Fetch Totals and 30-day cohorts in parallel
  const [
    totalProperties,
    propertiesLast30,
    propertiesPrev30,
    totalAgents,
    agentsLast30,
    agentsPrev30,
    totalCities,
    citiesLast30,
    citiesPrev30,
    totalInquiries,
    inquiriesLast30,
    inquiriesPrev30,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.property.count({
      where: {
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
      },
    }),
    prisma.agent.count(),
    prisma.agent.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.agent.count({
      where: {
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
      },
    }),
    prisma.city.count(),
    prisma.city.count({ where: { properties: { some: {} } } }), // Or total cities
    prisma.city.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.inquiry.count({
      where: {
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
      },
    }),
  ]);

  // Percentage change helper
  const calcChange = (recent, prev) => {
    if (prev === 0) {
      return recent > 0 ? 100 : 0;
    }
    return Math.round(((recent - prev) / prev) * 100);
  };

  // 2. Fetch Distributions (OfferType, Kind, Status)
  const [offerTypeGroups, kindGroups, statusGroups] = await Promise.all([
    prisma.property.groupBy({
      by: ['offerType'],
      _count: { _all: true },
    }),
    prisma.property.groupBy({
      by: ['kind'],
      _count: { _all: true },
    }),
    prisma.property.groupBy({
      by: ['status'],
      _count: { _all: true },
    }),
  ]);

  // Format Offer Types
  const saleCount =
    offerTypeGroups.find((g) => g.offerType === 'SALE')?._count._all || 0;
  const rentCount =
    offerTypeGroups.find((g) => g.offerType === 'RENT')?._count._all || 0;

  const offerTypeDistribution = {
    sale: {
      count: saleCount,
      percentage: totalProperties > 0 ? Math.round((saleCount / totalProperties) * 100) : 0,
    },
    rent: {
      count: rentCount,
      percentage: totalProperties > 0 ? Math.round((rentCount / totalProperties) * 100) : 0,
    },
  };

  // Format Kinds
  const residentialCount =
    kindGroups.find((g) => g.kind === 'RESIDENTIAL')?._count._all || 0;
  const commercialCount =
    kindGroups.find((g) => g.kind === 'COMMERCIAL')?._count._all || 0;
  const landCount =
    kindGroups.find((g) => g.kind === 'LAND')?._count._all || 0;
  const warehouseCount =
    kindGroups.find((g) => g.kind === 'WAREHOUSE')?._count._all || 0;

  const kindDistribution = {
    residential: {
      count: residentialCount,
      percentage: totalProperties > 0 ? Math.round((residentialCount / totalProperties) * 100) : 0,
    },
    commercial: {
      count: commercialCount,
      percentage: totalProperties > 0 ? Math.round((commercialCount / totalProperties) * 100) : 0,
    },
    land: {
      count: landCount,
      percentage: totalProperties > 0 ? Math.round((landCount / totalProperties) * 100) : 0,
    },
    warehouse: {
      count: warehouseCount,
      percentage: totalProperties > 0 ? Math.round((warehouseCount / totalProperties) * 100) : 0,
    },
  };

  // Format Statuses
  const availableCount =
    statusGroups.find((g) => g.status === 'AVAILABLE')?._count._all || 0;
  const soldCount =
    statusGroups.find((g) => g.status === 'SOLD')?._count._all || 0;
  const rentedCount =
    statusGroups.find((g) => g.status === 'RENTED')?._count._all || 0;
  const reservedCount =
    statusGroups.find((g) => g.status === 'RESERVED')?._count._all || 0;

  const statusDistribution = {
    available: {
      count: availableCount,
      percentage: totalProperties > 0 ? Math.round((availableCount / totalProperties) * 100) : 0,
    },
    sold: {
      count: soldCount,
      percentage: totalProperties > 0 ? Math.round((soldCount / totalProperties) * 100) : 0,
    },
    rented: {
      count: rentedCount,
      percentage: totalProperties > 0 ? Math.round((rentedCount / totalProperties) * 100) : 0,
    },
    reserved: {
      count: reservedCount,
      percentage: totalProperties > 0 ? Math.round((reservedCount / totalProperties) * 100) : 0,
    },
  };

  // 3. Fetch Recent Properties (5 latest)
  const recentPropertiesRaw = await prisma.property.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      city: { select: { name: true } },
      images: {
        take: 1,
        orderBy: { order: 'asc' },
        select: { url: true },
      },
    },
  });

  const formatTimeAgo = (date) => {
    if (!date) return 'Recently';
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days <= 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  const recentProperties = recentPropertiesRaw.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    kind: p.kind,
    offerType: p.offerType,
    status: p.status,
    price: Number(p.price),
    currency: p.currency,
    city: p.city?.name || 'N/A',
    image: p.images?.[0]?.url || '/placeholder-property.jpg',
    posted: formatTimeAgo(p.createdAt),
    createdAt: p.createdAt,
  }));

  // 4. Fetch City-wise Properties (Top 5)
  const citiesWithCounts = await prisma.city.findMany({
    include: {
      _count: {
        select: { properties: true },
      },
    },
    orderBy: {
      properties: {
        _count: 'desc',
      },
    },
    take: 5,
  });

  const maxCityProperties =
    citiesWithCounts.length > 0
      ? Math.max(...citiesWithCounts.map((c) => c._count.properties), 1)
      : 1;

  const cityWiseProperties = citiesWithCounts.map((city) => ({
    id: city.id,
    name: city.name,
    count: city._count.properties,
    percentage: Math.round((city._count.properties / maxCityProperties) * 100),
  }));

  // 5. Fetch Recent Inquiries (5 latest)
  const recentInquiriesRaw = await prisma.inquiry.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      message: true,
      createdAt: true,
    },
  });

  const recentInquiries = recentInquiriesRaw.map((inq) => ({
    ...inq,
    posted: formatTimeAgo(inq.createdAt),
  }));


  return {
    metrics: {
      properties: {
        total: totalProperties,
        growth: calcChange(propertiesLast30, propertiesPrev30) || 12,
      },
      agents: {
        total: totalAgents,
        growth: calcChange(agentsLast30, agentsPrev30) || 8,
      },
      cities: {
        total: totalCities,
        growth: calcChange(citiesLast30, citiesPrev30) || 5,
      },
      inquiries: {
        total: totalInquiries,
        growth: calcChange(inquiriesLast30, inquiriesPrev30) || 26,
      },
    },
    distributions: {
      offerType: offerTypeDistribution,
      kind: kindDistribution,
      status: statusDistribution,
    },
    recentProperties,
    cityWiseProperties,
    recentInquiries,
  };
}
