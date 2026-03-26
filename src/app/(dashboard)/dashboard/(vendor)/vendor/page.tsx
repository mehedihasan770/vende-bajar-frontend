import { getServerUser } from "@/utils/getServerUser";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const user = await getServerUser();
  redirect(`/dashboard/${user?.role || 'user'}`);
  return null;
};

export default DashboardPage;