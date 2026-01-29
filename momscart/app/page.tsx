import { auth } from "@/auth";
import AdminDashboard from "@/components/AdminDashboard";
import EditRoleMobile from "@/components/EditRoleMobile";
import { Nav } from "@/components/Nav";
import UserDashboard from "@/components/UserDashboard";
import DeliveryBoyDashboard from "@/components/DeliveryBoyDashboard";
import ConnectToDB from "@/lib/db";
import { User } from "@/models/user.models";
import { redirect } from "next/navigation";

export default async function Home() {
  await ConnectToDB();

  const session = await auth();
  console.log(session);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await User.findById(session.user.id);

  if (!user) {
    redirect("/login");
  }

  
  const inComplete = !user.mobile;

  if (inComplete) {
    return <EditRoleMobile />;
  }

  const plainUser = JSON.parse(JSON.stringify(user));
  console.log(plainUser)
  console.log(user)


  return (
    <>
      <Nav user={plainUser} />
      {user.role=="user"?(<UserDashboard/>):user.role=="admin"?(<AdminDashboard/>):(<DeliveryBoyDashboard/>)}
    </>
  );
}
