import Link from "next/link";
import prisma from "@/lib/prisma";

import {
  PackageOpen,
  Star,
  MapPinned,
  MessageSquareText,
  CircleCheckBig,
  Users,
  Eye,
  ArrowUpRight,
  Plus,
  CalendarDays,
  TrendingUp,
  Inbox,
  Plane,
} from "lucide-react";

import { getAdminSession } from "@/lib/auth";
import EnquiryChart from "@/components/admin/EnquiryChart";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const session = await getAdminSession();

  let stats = {
    total: 0,
    active: 0,
    featured: 0,
    destinations: 0,
    enquiries: 0,
    visitors: 0,
    visits: 0,
    todayEnquiries: 0,
    monthEnquiries: 0,
  };

  let chartData = [];

  try {
    const now = new Date();

    // Start of today
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // Start of current month
    const monthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    // Last 14 days
    const fourteenDaysAgo = new Date();

    fourteenDaysAgo.setDate(
      fourteenDaysAgo.getDate() - 13
    );

    fourteenDaysAgo.setHours(
      0,
      0,
      0,
      0
    );

    const [
      total,
      active,
      featured,
      groups,
      enquiries,
      visitors,
      visitData,
      todayEnquiries,
      monthEnquiries,
      recentEnquiries,
    ] = await Promise.all([
      prisma.package.count(),

      prisma.package.count({
        where: {
          active: true,
        },
      }),

      prisma.package.count({
        where: {
          featured: true,
        },
      }),

      prisma.package.groupBy({
        by: ["destination"],
      }),

      prisma.enquiry.count(),

      // Unique visitors
      prisma.siteVisitor.count(),

      // Total visits
      prisma.siteVisitor.aggregate({
        _sum: {
          visitCount: true,
        },
      }),

      // Today's enquiries
      prisma.enquiry.count({
        where: {
          createdAt: {
            gte: todayStart,
          },
        },
      }),

      // This month's enquiries
      prisma.enquiry.count({
        where: {
          createdAt: {
            gte: monthStart,
          },
        },
      }),

      // Enquiries for chart
      prisma.enquiry.findMany({
        where: {
          createdAt: {
            gte: fourteenDaysAgo,
          },
        },
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),
    ]);

    stats = {
      total,
      active,
      featured,
      destinations: groups.length,
      enquiries,
      visitors,
      visits:
        visitData._sum.visitCount || 0,
      todayEnquiries,
      monthEnquiries,
    };

    // -------------------------
    // CREATE LAST 14 DAYS DATA
    // -------------------------

    const days = {};

    for (let i = 13; i >= 0; i--) {
      const date = new Date();

      date.setDate(
        date.getDate() - i
      );

      const key = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(
        date.getDate()
      ).padStart(2, "0")}`;

      days[key] = {
        date: date.toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
          }
        ),

        enquiries: 0,
      };
    }

    recentEnquiries.forEach(
      (enquiry) => {
        const date =
          new Date(
            enquiry.createdAt
          );

        const key = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(
          date.getDate()
        ).padStart(2, "0")}`;

        if (days[key]) {
          days[key].enquiries += 1;
        }
      }
    );

    chartData =
      Object.values(days);
  } catch (error) {
    console.error(
      "Dashboard error:",
      error
    );
  }

  const cards = [
    {
      icon: PackageOpen,
      title: "Total Packages",
      value: stats.total,
      description:
        "Packages created",
    },

    {
      icon: CircleCheckBig,
      title: "Active Packages",
      value: stats.active,
      description:
        "Currently published",
    },

    {
      icon: MessageSquareText,
      title: "Enquiries",
      value: stats.enquiries,
      description: `${stats.todayEnquiries} received today`,
    },

    {
      icon: Users,
      title: "Visitors",
      value: stats.visitors,
      description:
        "Unique website visitors",
    },

    {
      icon: Eye,
      title: "Total Visits",
      value: stats.visits,
      description:
        "Website visits",
    },
  ];

  return (
    <div className="pb-12">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Welcome back,{" "}
            <span className="font-bold text-[#173f35]">
              {session?.name ||
                "Admin"}
            </span>
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#173f35] md:text-4xl">
            Viago Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Track your packages,
            enquiries and website
            activity.
          </p>
        </div>

       <Link
  href="/admin/packages/add"
  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173f35] px-5 py-3 text-sm font-bold !text-white transition hover:bg-[#24594a] hover:!text-white"
>
  <Plus size={18} className="text-white" />
  <span className="text-white">Add Package</span>
</Link>
      </div>

      {/* ================= MAIN CARDS ================= */}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map(
          ({
            icon: Icon,
            title,
            value,
            description,
          }) => (
            <div
              key={title}
              className="group rounded-[24px] border border-slate-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(23,63,53,.08)]"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eff5f2] text-[#173f35]">
                  <Icon size={21} />
                </span>

                <ArrowUpRight
                  size={17}
                  className="text-slate-300 transition group-hover:text-[#c7923e]"
                />
              </div>

              <div className="mt-6 text-3xl font-black tracking-tight text-[#173f35]">
                {value.toLocaleString()}
              </div>

              <div className="mt-1 text-sm font-bold text-slate-700">
                {title}
              </div>

              <p className="mt-1 text-xs text-slate-400">
                {description}
              </p>
            </div>
          )
        )}
      </div>

      {/* ================= GRAPH AREA ================= */}

      <div className="mt-7 grid gap-6 xl:grid-cols-[1.7fr_.7fr]">
        {/* ENQUIRY GRAPH */}

        <div className="rounded-[28px] border border-slate-100 bg-white p-6 md:p-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#c7923e]">
                <TrendingUp size={15} />

                Enquiry performance
              </div>

              <h2 className="mt-2 text-2xl font-black text-[#173f35]">
                Enquiries over time
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Customer enquiries received
                during the last 14 days.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl bg-[#f8f4e9] px-4 py-2 text-xs font-bold text-[#173f35]">
              <CalendarDays
                size={15}
              />

              Last 14 days
            </div>
          </div>

          <EnquiryChart
            data={chartData}
          />
        </div>

        {/* ENQUIRY SUMMARY */}

        <div className="overflow-hidden rounded-[28px] bg-[#173f35] p-7 text-white">
          <div className="relative">
            <div className="absolute -right-16 -top-20 h-44 w-44 rounded-full border border-white/10" />

            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
              <Inbox size={21} />
            </span>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#e5c27e]">
              Enquiry Summary
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Customer interest
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/60">
              See how many customers are
              reaching out to Viago.
            </p>

            <div className="mt-7 grid gap-3">
              <div className="rounded-2xl bg-white/[0.07] p-5">
                <div className="text-3xl font-black">
                  {
                    stats.todayEnquiries
                  }
                </div>

                <p className="mt-1 text-sm text-white/60">
                  Enquiries today
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.07] p-5">
                <div className="text-3xl font-black">
                  {
                    stats.monthEnquiries
                  }
                </div>

                <p className="mt-1 text-sm text-white/60">
                  This month
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.07] p-5">
                <div className="text-3xl font-black">
                  {stats.enquiries}
                </div>

                <p className="mt-1 text-sm text-white/60">
                  Total enquiries
                </p>
              </div>
            </div>

            <Link
              href="/admin/enquiries"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#e5c27e]"
            >
              View enquiries

              <ArrowUpRight
                size={16}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= WEBSITE PERFORMANCE ================= */}

      <div className="mt-7 grid gap-6 lg:grid-cols-3">
        {/* VISITORS */}

        <div className="rounded-[26px] border border-slate-100 bg-white p-7">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eff5f2] text-[#173f35]">
            <Users size={21} />
          </span>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
            Website audience
          </p>

          <div className="mt-2 text-4xl font-black text-[#173f35]">
            {stats.visitors.toLocaleString()}
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Unique visitors
          </p>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Total visits
              </span>

              <span className="font-bold text-[#173f35]">
                {stats.visits.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* DESTINATIONS */}

        <div className="rounded-[26px] border border-slate-100 bg-white p-7">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#faf4e8] text-[#b98434]">
            <MapPinned size={21} />
          </span>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
            Destination coverage
          </p>

          <div className="mt-2 text-4xl font-black text-[#173f35]">
            {stats.destinations}
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Destinations available
          </p>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Featured packages
              </span>

              <span className="font-bold text-[#173f35]">
                {stats.featured}
              </span>
            </div>
          </div>
        </div>

        {/* TIP */}

        <div className="relative overflow-hidden rounded-[26px] bg-[#f8f4e9] p-7">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-[#c7923e]/20" />

          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#173f35] text-white">
            <Plane size={21} />
          </span>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#b98434]">
            Viago tip
          </p>

          <h3 className="mt-2 text-xl font-black text-[#173f35]">
            Keep your storefront fresh.
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Add seasonal packages,
            refresh your pricing and
            feature your strongest
            holidays to attract more
            travellers.
          </p>

          <Link
            href="/admin/packages"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#173f35]"
          >
            Manage packages

            <ArrowUpRight
              size={16}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}