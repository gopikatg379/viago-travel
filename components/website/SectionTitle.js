export default function SectionTitle({
  eyebrow,
  title,
  text,
  center = false,
}) {
  return (
    <div
      className={
        center
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl"
      }
    >
      {eyebrow && (
        <span
          className={`kerala-eyebrow ${
            center ? "justify-center before:hidden" : ""
          }`}
        >
          {eyebrow}
        </span>
      )}

      <h2 className="section-title mt-4">
        {title}
      </h2>

      {text && (
        <p className="mt-5 max-w-2xl text-base leading-8 text-[#6e746f] md:text-lg">
          {text}
        </p>
      )}
    </div>
  );
}