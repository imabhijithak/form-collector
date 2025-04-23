import { json } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  
  await prisma.submission.create({
    data: { name, email, phone },
  });
  
  console.log("Received form:", { name, email, phone });

  return json({ success: true });
};

export default function CustomerForm() {
  const data = useActionData();

  return (
    <div style={{ padding: 20 }}>
      <h2>Customer Form</h2>
      <Form method="post">
        <input name="name" placeholder="Name" required /><br />
        <input name="email" placeholder="Email" type="email" required /><br />
        <input name="phone" placeholder="Phone" required /><br />
        <button type="submit">Submit</button>
      </Form>
      {data?.success && <p>Form submitted successfully!</p>}
    </div>
  );
}
