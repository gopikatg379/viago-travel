export async function parsePackageForm(form) {
  // ---------------------------------------
  // MAIN IMAGE URL
  // ---------------------------------------

  const imageUrl = String(
    form.get("imageUrl") || ""
  ).trim();

  if (!imageUrl) {
    throw new Error("Main image is required");
  }

  // ---------------------------------------
  // ITINERARY
  // ---------------------------------------

  const itineraryText = String(
  form.get("itinerary") || ""
);

const itineraries = itineraryText
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line, index) => {

    // If "|" exists, use:
    // Title | Description
    if (line.includes("|")) {
      const [titlePart, ...descriptionParts] =
        line.split("|");

      const title = titlePart.trim();

      const description =
        descriptionParts
          .join("|")
          .trim();

      return {
        day: index + 1,

        title:
          title.substring(0, 200) ||
          `Day ${index + 1}`,

        description:
          description ||
          "Details will be shared.",
      };
    }

    // If no "|" exists,
    // treat the whole line as description
    return {
      day: index + 1,
      title: `Day ${index + 1}`,
      description: line,
    };
  });

  // ---------------------------------------
  // GALLERY URLS
  // ---------------------------------------

  let galleryUrls = [];

  const galleryData =
    form.get("galleryUrls");

  if (galleryData) {
    try {
      galleryUrls = JSON.parse(
        String(galleryData)
      );
    } catch {
      galleryUrls = [];
    }
  }

  const gallery = galleryUrls
    .filter(Boolean)
    .map((url) => ({
      image: url,
    }));

  // ---------------------------------------
  // PACKAGE DATA
  // ---------------------------------------

  return {
    data: {
      title: String(
        form.get("title") || ""
      ).trim(),

      slug: String(
        form.get("slug") || ""
      )
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),

      destination: String(
        form.get("destination") || ""
      ).trim(),

      country: String(
        form.get("country") || ""
      ).trim(),

      category: String(
        form.get("category") || ""
      ).trim(),

      duration: String(
        form.get("duration") || ""
      ).trim(),

      days: Number(
        form.get("days")
      ),

      nights: Number(
        form.get("nights")
      ),

      price: Number(
        form.get("price")
      ),

      originalPrice:
        form.get("originalPrice")
          ? Number(
              form.get(
                "originalPrice"
              )
            )
          : null,

      shortDescription: String(
        form.get(
          "shortDescription"
        ) || ""
      ).trim(),

      description: String(
        form.get(
          "description"
        ) || ""
      ).trim(),

      highlights: String(
        form.get("highlights") || ""
      ).trim(),

      inclusions: String(
        form.get("inclusions") || ""
      ).trim(),

      exclusions: String(
        form.get("exclusions") || ""
      ).trim(),

      hotelDetails:
        String(
          form.get("hotelDetails") || ""
        ).trim() || null,

      transportation:
        String(
          form.get("transportation") || ""
        ).trim() || null,

      terms:
        String(
          form.get("terms") || ""
        ).trim() || null,

      image: imageUrl,

      featured:
        form.get("featured") === "on",

      active:
        form.get("active") === "on",

      seoTitle:
        String(
          form.get("seoTitle") || ""
        ).trim() || null,

      seoDescription:
        String(
          form.get(
            "seoDescription"
          ) || ""
        ).trim() || null,
    },

    itineraries,

    gallery,
  };
}