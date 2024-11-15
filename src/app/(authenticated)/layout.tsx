"use client";
import React from "react";
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

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useSession();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Foro UP
          </Typography>
          {data?.user && (
            <>
              <Avatar alt="User Name" src="/static/images/avatar/1.jpg" />
              <Typography
                variant="body1"
                component="div"
                sx={{ marginLeft: 2, marginRight: 2 }}
              >
                {data?.user?.name}
              </Typography>
              <IconButton onClick={() => signOut()} color="inherit">
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
