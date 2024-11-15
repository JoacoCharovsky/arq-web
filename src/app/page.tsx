import { redirect } from "next/navigation";
import { auth } from "../../auth";

export default async function BasePath() {
  const session = await auth();
  if (!session) {
    redirect("/auth");
  } else {
    redirect("/posts");
  }
}
