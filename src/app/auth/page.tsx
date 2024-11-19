"use client";
import { signIn, useSession } from "next-auth/react";
import React, { useLayoutEffect } from "react";
import { Paper, Typography, IconButton, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useRouter } from "next/navigation";

export default function Auth() {
  const { status } = useSession();
  const router = useRouter();

  useLayoutEffect(() => {
    if (status === "authenticated") {
      router.push("/posts");
    }
  }, [status, router]);

  return (
    <Paper
      elevation={3}
      sx={{ padding: 4, maxWidth: 400, margin: "auto", textAlign: "center" }}
    >
      <Typography
        variant="h2"
        component="h2"
        sx={{ marginBottom: 2, fontSize: "1.4rem" }}
      >
        Acceda para continuar
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "space-evenly", marginTop: 2 }}
      >
        <IconButton
          onClick={() => signIn("google", { redirectTo: "/posts" })}
          aria-label="Log in with Google"
        >
          <GoogleIcon fontSize="large" />
        </IconButton>
        <IconButton
          onClick={() => signIn("github", { redirectTo: "/posts" })}
          aria-label="Log in with GitHub"
        >
          <GitHubIcon fontSize="large" />
        </IconButton>
      </Box>
    </Paper>
  );
}
