"use client";

import { useEffect, useRef, useState } from "react";

const destinations = [
  "MUNNAR TEA HILLS",
  "VARKALA CLIFFS",
  "PERIYAR FOREST",
  "FORT KOCHI",
  "WAYANAD TRAILS",
  "ATHIRAPPILLY FALLS",
  "ALLEPPEY BACKWATERS",
  "KOVALAM BEACH",
  "THEKKADY",
  "KUMARAKOM",
];

const stats = [
  {
    number: 2400,
    suffix: "+",
    label: "Journeys planned",
  },
  {
    number: 14,
    suffix: " yrs",
    label: "Years of travel experience",
  },
  {
    number: 62,
    suffix: "%",
    label: "Guests who return or refer",
  },
];

function Counter({ number, suffix }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = counterRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;

        hasAnimated.current = true;

        const duration = 1800;
        const startTime = performance.now();

        function animate(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Smooth animation
          const easeOut = 1 - Math.pow(1 - progress, 3);

          setCount(Math.floor(number * easeOut));

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(number);
          }
        }

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [number]);

  return (
    <span ref={counterRef}>
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function TravelStats() {
  return (
    <section className="overflow-hidden bg-[#fffdf8]">
      {/* Destination Marquee */}

      <div className="border-y border-[#c7923e]/20 bg-[#eee0c7] py-5">
        <div className="viago-marquee flex w-max">
          {[...destinations, ...destinations].map((destination, index) => (
            <div
              key={`${destination}-${index}`}
              className="flex shrink-0 items-center"
            >
              <span className="whitespace-nowrap px-7 font-serif text-lg font-bold tracking-[0.03em] text-[#405b58] md:px-10 md:text-xl">
                {destination}
              </span>

              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#287552]" />
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}

      <div className="container-site py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-t border-[#287552] pt-6"
            >
              <div className="font-serif text-5xl font-bold tracking-tight text-[#07364a] sm:text-6xl">
                <Counter
                  number={stat.number}
                  suffix={stat.suffix}
                />
              </div>

              <p className="mt-3 text-sm tracking-[0.04em] text-[#536764] md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .viago-marquee {
          animation: viago-marquee-animation 30s linear infinite;
        }

        @keyframes viago-marquee-animation {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .viago-marquee {
            animation-duration: 22s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .viago-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}