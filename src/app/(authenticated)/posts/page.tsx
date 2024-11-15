"use client";
import React from "react";
import { Grid2 as Grid, Typography, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PostPreview from "@/components/PostPreview";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

const mockPosts = [
  {
    id: 1,
    author: {
      id: 1,
      name: "John Doe",
      avatarUrl: "/static/images/avatar/1.jpg",
    },
    title: "First Post",
    createdAt: "2023-10-01T10:00:00Z",
    commentsCount: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    author: {
      id: 2,
      name: "Jane Smith",
      avatarUrl: "/static/images/avatar/2.jpg",
    },
    title: "Second Post",
    createdAt: "2023-10-02T12:00:00Z",
    commentsCount: 3,
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    author: {
      id: 1,
      name: "John Doe",
      avatarUrl: "/static/images/avatar/1.jpg",
    },
    title: "First Post",
    createdAt: "2023-10-01T10:00:00Z",
    commentsCount: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 4,
    author: {
      id: 2,
      name: "Jane Smith",
      avatarUrl: "/static/images/avatar/2.jpg",
    },
    title: "Second Post",
    createdAt: "2023-10-02T12:00:00Z",
    commentsCount: 3,
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 5,
    author: {
      id: 2,
      name: "Jane Smith",
      avatarUrl: "/static/images/avatar/2.jpg",
    },
    title: "Second Post",
    createdAt: "2023-10-02T12:00:00Z",
    commentsCount: 3,
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 6,
    author: {
      id: 1,
      name: "John Doe",
      avatarUrl: "/static/images/avatar/1.jpg",
    },
    title: "First Post",
    createdAt: "2023-10-01T10:00:00Z",
    commentsCount: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 7,
    author: {
      id: 2,
      name: "Jane Smith",
      avatarUrl: "/static/images/avatar/2.jpg",
    },
    title: "Second Post",
    createdAt: "2023-10-02T12:00:00Z",
    commentsCount: 3,
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

export default function PostsPage() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          gap: "12px",
        }}
      >
        <Typography variant="h4" component="h1">
          Posts
        </Typography>
        <IconButton
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        {mockPosts.map((post, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <PostPreview
              {...post}
              detailView={false}
              onClick={() => router.push(`/posts/${post.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
