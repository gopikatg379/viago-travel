import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const visitorId = body.visitorId;

    if (!visitorId) {
      return NextResponse.json(
        { message: "Visitor ID required" },
        { status: 400 }
      );
    }

    await prisma.siteVisitor.upsert({
      where: {
        visitorId,
      },
      update: {
        visitCount: {
          increment: 1,
        },
      },
      create: {
        visitorId,
        visitCount: 1,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Visitor tracking error:", error);

    return NextResponse.json(
      { message: "Could not track visitor" },
      { status: 500 }
    );
  }
}