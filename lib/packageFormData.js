import { uploadToCloudinary } from "@/lib/cloudinary";

export async function parsePackageForm(form) {
  // ---------------------------------------
  // MAIN IMAGE
  // ---------------------------------------

  const mainImageFile = form.get("mainImage");

  let uploadedMainImage = null;

  if (
    mainImageFile &&
    typeof mainImageFile !== "string" &&
    mainImageFile.size > 0
  ) {
    uploadedMainImage =
      await uploadToCloudinary(
        mainImageFile,
        "viago/packages/main"
      );
  }

  const imageUrl = String(
    form.get("imageUrl") || ""
  ).trim();

  const image =
    uploadedMainImage || imageUrl;

  if (!image) {
    throw new Error(
      "Main image is required"
    );
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
      const [title, ...rest] =
        line.split("|");

      return {
        day: index + 1,

        title:
          title.trim() ||
          `Day ${index + 1}`,

        description:
          rest
            .join("|")
            .trim() ||
          "Details will be shared.",
      };
    });

  // ---------------------------------------
  // GALLERY IMAGES
  // ---------------------------------------

  const galleryFiles = form
    .getAll("gallery")
    .filter(
      (file) =>
        file &&
        typeof file !== "string" &&
        file.size > 0
    );

  const gallery = [];

  for (const file of galleryFiles) {
    const uploadedImage =
      await uploadToCloudinary(
        file,
        "viago/packages/gallery"
      );

    if (uploadedImage) {
      gallery.push({
        image: uploadedImage,
      });
    }
  }

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
        .replace(
          /[^a-z0-9]+/g,
          "-"
        )
        .replace(
          /^-+|-+$/g,
          ""
        ),

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
        form.get(
          "originalPrice"
        )
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
        form.get(
          "highlights"
        ) || ""
      ).trim(),

      inclusions: String(
        form.get(
          "inclusions"
        ) || ""
      ).trim(),

      exclusions: String(
        form.get(
          "exclusions"
        ) || ""
      ).trim(),

      hotelDetails:
        String(
          form.get(
            "hotelDetails"
          ) || ""
        ).trim() || null,

      transportation:
        String(
          form.get(
            "transportation"
          ) || ""
        ).trim() || null,

      terms:
        String(
          form.get(
            "terms"
          ) || ""
        ).trim() || null,

      image,

      featured:
        form.get(
          "featured"
        ) === "on",

      active:
        form.get(
          "active"
        ) === "on",

      seoTitle:
        String(
          form.get(
            "seoTitle"
          ) || ""
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