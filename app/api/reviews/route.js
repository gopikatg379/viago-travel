import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const location = String(body.location || "").trim();
    const review = String(body.review || "").trim();
    const rating = Number(body.rating);

    if (!name) {
      return Response.json(
        { message: "Name is required." },
        { status: 400 }
      );
    }

    if (!review) {
      return Response.json(
        { message: "Review is required." },
        { status: 400 }
      );
    }

    if (!rating || rating < 1 || rating > 5) {
      return Response.json(
        { message: "Please select a rating between 1 and 5." },
        { status: 400 }
      );
    }

    const newReview = await prisma.review.create({
      data: {
        name,
        location: location || null,
        rating,
        review,
        status: "PENDING",
        featured: false,
      },
    });

    return Response.json(
      {
        message: "Thank you! Your review has been submitted for approval.",
        review: newReview,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Review submission error:", error);

    return Response.json(
      { message: "Could not submit review. Please try again." },
      { status: 500 }
    );
  }
}