"use client";
import React, { useState, useEffect } from "react";
import { Grid2 as Grid, Typography, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UserInput from "@/components/UserInput";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Post } from "@/models/interfaces";
import { useSession } from "next-auth/react";
import PostsDialog from "../../../components/PostsDialog";

export default function PostsPage() {
  const theme = useTheme();
  const router = useRouter();
  const { data } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };

    fetchPosts();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = async (title: string, content: string) => {
    try {
      const response = await axios.post("/api/posts", { title, content });
      setPosts((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to create post", error);
    } finally {
      handleClose();
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const response = await axios.delete(`/api/posts/${postId}`);
      setPosts((prev) => prev.filter((post) => post._id !== response.data._id));
    } catch (error) {
      console.error("Failed to create post", error);
    } finally {
      handleClose();
    }
  };

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
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
          }}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        {posts.map((post, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <UserInput
              data={post}
              type="preview"
              onClick={() => router.push(`/posts/${post._id}`)}
              onDelete={
                post.author._id === data?.user?.id
                  ? () => deletePost(post._id)
                  : undefined
              }
            />
          </Grid>
        ))}
      </Grid>
      <PostsDialog
        open={open}
        header={"Agregar Post"}
        handleClose={handleClose}
        handleConfirm={handlePost}
      />
    </div>
  );
}
