"use client";
import React from "react";
import { useParams } from "next/navigation";

export default function PostPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Post {id}</h1>
      {/* Add your post details here */}
    </div>
  );
}
