import { auth } from "@/auth";
import EditRoleMobile from "@/components/EditRoleMobile";
import { Nav } from "@/components/Nav";
import ConnectToDB from "@/lib/db";
import { User } from "@/models/user.models";
import { redirect } from "next/navigation";

export default async function Home() {
  await ConnectToDB();

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userDoc = await User.findById(session.user.id).lean();

  if (!userDoc) {
    redirect("/login");
  }

  const user = {
    id: userDoc._id.toString(),
    name: userDoc.name,
    email: userDoc.email,
    mobile: userDoc.mobile,
    role: userDoc.role,
    image: userDoc.image ?? null,
  };
  const inComplete = !user.mobile;

  if (inComplete) {
    return <EditRoleMobile />;
  }

  return <Nav user={user} />;
}
