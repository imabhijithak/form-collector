// app/routes/api.form-submit.tsx
import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import prisma from "D:/shopify app/form-collector/app/routes/prisma.server";  // make sure this path matches your project

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  try {
    await prisma.submission.create({
      data: {
        name,
        email,
        phone,
      },
    });

    return json({ success: true });
  } catch (error) {
    console.error("Form submission error:", error);
    return json({ success: false, error: "Failed to save data" }, { status: 500 });
  }
};
