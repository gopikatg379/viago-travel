import prisma from "@/lib/prisma";
import { samplePackages } from "@/lib/data";

export async function getPackages({ featured, destination, category, active = true } = {}) {
  try {
    return await prisma.package.findMany({
      where: {
        ...(active !== undefined ? { active } : {}),
        ...(featured !== undefined ? { featured } : {}),
        ...(destination ? { destination: { contains: destination } } : {}),
        ...(category ? { category } : {}),
      },
      include: { images: true, itineraries: { orderBy: { day: "asc" } } },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    let items = samplePackages.filter((item) => active === undefined || item.active === active);
    if (featured !== undefined) items = items.filter((item) => item.featured === featured);
    if (destination) items = items.filter((item) => item.destination.toLowerCase().includes(destination.toLowerCase()));
    if (category) items = items.filter((item) => item.category === category);
    return items;
  }
}

export async function getPackageBySlug(slug) {
  try {
    return await prisma.package.findUnique({
      where: { slug },
      include: { images: true, itineraries: { orderBy: { day: "asc" } } },
    });
  } catch {
    return samplePackages.find((item) => item.slug === slug) || null;
  }
}