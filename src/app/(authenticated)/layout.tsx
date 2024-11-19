"use client";
import React, { useLayoutEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, status } = useSession();
  const router = useRouter();

  useLayoutEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Foro UP
          </Typography>
          {data?.user && (
            <>
              <Avatar
                alt={data.user.name!}
                src={data.user.image || undefined}
              />
              <Typography
                variant="body1"
                component="div"
                sx={{ marginLeft: 2, marginRight: 2 }}
              >
                {data?.user?.name}
              </Typography>
              <IconButton
                onClick={() => signOut({ redirectTo: "/auth" })}
                color="inherit"
              >
                <LogoutIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ marginTop: 6 }}>{children}</Box>
      </Container>
    </div>
  );
}
