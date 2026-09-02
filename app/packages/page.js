import WebsiteShell from "@/components/website/WebsiteShell";
import PackageCard from "@/components/website/PackageCard";
import SectionTitle from "@/components/website/SectionTitle";
import { getPackages } from "@/lib/packages";

export const metadata = {
  title: "Travel Packages",
  description:
    "Browse Viago domestic, international, honeymoon, family and adventure holiday packages.",
};

export const revalidate = 60;

export default async function PackagesPage({
  searchParams,
}) {
  const q = await searchParams;

  const destination =
    q.destination?.trim() || "";

  const category =
    q.category || "";

  const maxPrice =
    Number(q.maxPrice || 0);

  const maxDays =
    Number(q.maxDays || 0);

  // --------------------------------
  // SEARCHED PACKAGES
  // --------------------------------

  let items = await getPackages({
    destination,
    category:
      category || undefined,
  });

  if (maxPrice) {
    items = items.filter(
      (p) =>
        Number(p.price) <= maxPrice
    );
  }

  if (maxDays) {
    items = items.filter(
      (p) =>
        p.days <= maxDays
    );
  }

  // --------------------------------
  // SUGGESTIONS
  // --------------------------------

  let suggestions = [];

  if (items.length === 0) {
    const allPackages =
      await getPackages({});

    suggestions =
      allPackages.slice(0, 3);
  }

  return (
    <WebsiteShell>

      {/* PAGE HEADER */}
      <section className="bg-[#f7faff] py-16">
        <div className="container-site">
          <SectionTitle
            eyebrow="Travel packages"
            title="Find a trip that fits your mood."
            text="Use the filters to narrow things down, then open any package for the full itinerary and inclusions."
          />
        </div>
      </section>

      {/* PACKAGES */}
      <section className="section-pad">
        <div className="container-site grid gap-8 lg:grid-cols-[280px_1fr]">

          {/* FILTER */}
          <form className="h-fit rounded-3xl border border-slate-200 p-6 lg:sticky lg:top-24">

            <h2 className="text-lg font-black">
              Filter packages
            </h2>

            {/* Destination */}
            <label className="mt-5 block text-sm font-bold">
              Destination

              <input
                name="destination"
                defaultValue={
                  destination
                }
                placeholder="e.g. Kerala"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0051FF]"
              />
            </label>

            {/* Category */}
            <label className="mt-4 block text-sm font-bold">
              Category

              <select
                name="category"
                defaultValue={
                  category
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
              >
                <option value="">
                  All categories
                </option>

                {[
                  "Domestic",
                  "International",
                  "Honeymoon",
                  "Family",
                  "Adventure",
                  "Weekend Trips",
                ].map((x) => (
                  <option key={x}>
                    {x}
                  </option>
                ))}
              </select>
            </label>

            {/* Max Price */}
            <label className="mt-4 block text-sm font-bold">
              Max price

              <select
                name="maxPrice"
                defaultValue={
                  q.maxPrice || ""
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
              >
                <option value="">
                  Any
                </option>

                <option value="20000">
                  ₹20,000
                </option>

                <option value="30000">
                  ₹30,000
                </option>

                <option value="50000">
                  ₹50,000
                </option>
              </select>
            </label>

            {/* Duration */}
            <label className="mt-4 block text-sm font-bold">
              Max duration

              <select
                name="maxDays"
                defaultValue={
                  q.maxDays || ""
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
              >
                <option value="">
                  Any
                </option>

                <option value="3">
                  3 days
                </option>

                <option value="5">
                  5 days
                </option>

                <option value="7">
                  7 days
                </option>
              </select>
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-[#0051FF] px-4 py-3 font-bold text-white transition hover:bg-[#0042d1]"
            >
              Apply filters
            </button>
          </form>

          {/* RESULTS */}
          <div>

            {items.length > 0 ? (
              <>
                <div className="mb-6 text-sm text-slate-500">
                  {items.length}{" "}
                  package
                  {items.length !== 1
                    ? "s"
                    : ""}{" "}
                  found
                </div>

                <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((p) => (
                    <PackageCard
                      key={p.id}
                      pkg={p}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* NO RESULT */}
                <div className="rounded-[28px] border border-slate-200 bg-[#f8fafc] px-6 py-10 text-center md:px-10">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eaf1ff] text-2xl">
                    ✈️
                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-[#173f35]">
                    {destination
                      ? `No packages found for "${destination}"`
                      : "No packages found"}
                  </h2>

                  <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
                    We don't currently
                    have a package that
                    matches your search.
                    But you might like
                    one of these journeys.
                  </p>
                </div>

                {/* SUGGESTIONS */}
                {suggestions.length >
                  0 && (
                  <div className="mt-10">

                    <div className="mb-6">
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#0051FF]">
                        Recommended for you
                      </span>

                      <h3 className="mt-2 text-2xl font-bold text-[#173f35]">
                        You may also like
                      </h3>
                    </div>

                    <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                      {suggestions.map(
                        (p) => (
                          <PackageCard
                            key={
                              p.id
                            }
                            pkg={p}
                          />
                        )
                      )}
                    </div>

                  </div>
                )}
              </>
            )}

          </div>
        </div>
      </section>
    </WebsiteShell>
  );
}