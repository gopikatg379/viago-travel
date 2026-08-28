import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../../../lib/prisma";

export async function POST(request) {
  try {
    const form = await request.formData();

    const email = String(form.get("email") || "")
      .toLowerCase()
      .trim();

    const password = String(form.get("password") || "");

    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return NextResponse.redirect(
        new URL("/admin/login?error=invalid", request.url),
        303
      );
    }

    const passwordValid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordValid) {
      return NextResponse.redirect(
        new URL("/admin/login?error=invalid", request.url),
        303
      );
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
      },
      process.env.AUTH_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const response = NextResponse.redirect(
      new URL("/admin/dashboard", request.url),
      303
    );

    response.cookies.set("viago_admin", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.redirect(
      new URL("/admin/login?error=server", request.url),
      303
    );
  }
}