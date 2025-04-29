import AdminDashboard from "../../components/AdminPage/AdminDashboard";
import { getAuthUser } from "@/src/lib/auth/getAuthUser";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const user = await getAuthUser();

  if (user?.role !== "admin") {
    redirect("/");
  }
  return (
    <>
      <AdminDashboard />
    </>
  );
}
