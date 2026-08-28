const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD || "ChangeMe123!", 12);
  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_SEED_EMAIL || "admin@viago.in" },
    update: {},
    create: { name: "Viago Admin", email: process.env.ADMIN_SEED_EMAIL || "admin@viago.in", password },
  });

  const packages = [
    {
      title: "Kerala Backwater Escape", slug: "kerala-backwater-escape", destination: "Kerala", country: "India", category: "Domestic",
      duration: "5 Days / 4 Nights", days: 5, nights: 4, price: 14999, originalPrice: 17999,
      shortDescription: "Tea hills, calm backwaters and boutique stays across Munnar and Alleppey.",
      description: "Experience Kerala at an easy, memorable pace with misty plantations, scenic drives and backwater moments.",
      highlights: "Munnar tea gardens\nAlleppey backwater cruise\nPrivate sightseeing\nBreakfast included",
      inclusions: "4 nights accommodation\nDaily breakfast\nPrivate transfers\nSightseeing as per itinerary",
      exclusions: "Airfare\nPersonal expenses\nOptional activities", hotelDetails: "Premium 3-star / 4-star stays with breakfast.",
      transportation: "Private air-conditioned vehicle.", terms: "Rates are subject to availability.",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85", featured: true, active: true,
      seoTitle: "Kerala Backwater Escape | Viago", seoDescription: "Book a 5-day Kerala holiday with Munnar and Alleppey.",
      itineraries: { create: [
        { day: 1, title: "Arrive in Kochi", description: "Meet your representative and drive to Munnar." },
        { day: 2, title: "Explore Munnar", description: "Tea gardens, viewpoints and nature." },
        { day: 3, title: "Munnar to Alleppey", description: "Scenic transfer to Kerala's backwaters." },
        { day: 4, title: "Backwater experience", description: "Cruise and a relaxed sunset." },
        { day: 5, title: "Departure", description: "Transfer to Kochi for your onward journey." },
      ]}
    },
    {
      title: "Bali Honeymoon Bliss", slug: "bali-honeymoon-bliss", destination: "Bali", country: "Indonesia", category: "Honeymoon",
      duration: "6 Days / 5 Nights", days: 6, nights: 5, price: 42999, originalPrice: 48999,
      shortDescription: "A romantic Bali escape with Ubud, temples, beaches and private experiences.",
      description: "A romantic itinerary designed for couples who want beautiful stays and iconic Bali moments.",
      highlights: "Ubud day tour\nTemple sunset experience\nPrivate transfers\nCouple-friendly stays",
      inclusions: "5 nights accommodation\nBreakfast\nAirport transfers\nSelected sightseeing", exclusions: "Flights\nVisa fees\nPersonal expenses",
      hotelDetails: "Boutique hotel and private villa combination.", transportation: "Private transfers for scheduled tours.", terms: "Entry requirements are the traveller's responsibility.",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85", featured: true, active: true,
      seoTitle: "Bali Honeymoon Package | Viago", seoDescription: "Discover a romantic 6-day Bali honeymoon.",
    }
  ];

  for (const item of packages) {
    await prisma.package.upsert({ where: { slug: item.slug }, update: {}, create: item });
  }
}
main().finally(() => prisma.$disconnect());
