"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    let visitorId = localStorage.getItem(
      "viago_visitor_id"
    );

    if (!visitorId) {
      visitorId = crypto.randomUUID();

      localStorage.setItem(
        "viago_visitor_id",
        visitorId
      );
    }

    fetch("/api/visitors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorId,
      }),
    }).catch((error) => {
      console.error(
        "Visitor tracking failed:",
        error
      );
    });
  }, []);

  return null;
}