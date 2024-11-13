"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();
  console.log(data, status);

  return (
    <div className="space-x-2">
      <button
        className="text-white p-2 border-white border rounded-xl"
        onClick={() => signIn("google")}
      >
        LOGIN GUGELS
      </button>
      <button
        className="text-white p-2 border-white border rounded-xl"
        onClick={() => signIn("github")}
      >
        LOGIN GITJAB
      </button>
      <button
        className="text-white p-2 border-white border rounded-xl"
        onClick={() => signOut()}
      >
        LOGOOUT PAPAAAA
      </button>
      <p>
        {status} - {data?.user?.id}- {data?.user?.email} - {data?.user?.image} -{" "}
        {data?.user?.name} -
      </p>
    </div>
  );
}
