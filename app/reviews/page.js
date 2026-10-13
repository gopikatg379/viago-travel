import WebsiteShell from "@/components/website/WebsiteShell";
import ReviewForm from "@/components/website/ReviewForm";

export const metadata = {
  title: "Traveller Reviews | Viago",
  description:
    "Read experiences from Viago travellers and share your own travel story.",
};

export default function ReviewsPage() {
  return (
    <WebsiteShell>
      <section className="bg-[#173f35] px-5 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#e8c986]">
            Traveller Stories
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-6xl">
            Every journey has a story.
          </h1>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-white/70">
            Travelled with Viago? We'd love to hear about your experience.
          </p>
        </div>
      </section>

      <ReviewForm />
    </WebsiteShell>
  );
}