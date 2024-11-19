import { auth } from "../../auth";

export async function authService() {
  const session = await auth();
  if (session) {
    return session;
  } else {
    throw new Error("401");
  }
}
