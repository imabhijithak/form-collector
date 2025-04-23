import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import styles from  './styles.css';  // Importing the styles.css
const prisma = new PrismaClient();

export const loader = async () => {
  const submissions = await prisma.submission.findMany({ orderBy: { createdAt: 'desc' } });
  return json(submissions);
};

export default function SubmissionsPage() {
  const submissions = useLoaderData();

  return (
    <div className="container" style={{ padding: 20 }}>
      <h1>Form Submissions</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{new Date(s.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
