"use client";
import React, { useState } from "react";
import {
  Grid2 as Grid,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UserInput from "@/components/UserInput";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

const mockPosts = [
  {
    id: "1",
    author: { id: "1", name: "John Doe", image: "image1.png" },
    title: "First Post",
    createdAt: "2023-10-01T10:00:00Z",
    content: "This is the content of the first post.",
    commentsCount: 2,
  },
  {
    id: "2",
    author: { id: "2", name: "Jane Smith", image: "image2.png" },
    title: "Second Post",
    createdAt: "2023-10-02T11:00:00Z",
    content: "This is the content of the second post.",
    commentsCount: 1,
  },
  {
    id: "3",
    author: { id: "3", name: "Alice Johnson", image: "image3.png" },
    title: "Third Post",
    createdAt: "2023-10-03T09:00:00Z",
    content: "This is the content of the third post.",
    commentsCount: 1,
  },
  {
    id: "4",
    author: { id: "4", name: "Bob Brown", image: "image4.png" },
    title: "Fourth Post",
    createdAt: "2023-10-04T08:00:00Z",
    content: "This is the content of the fourth post.",
    commentsCount: 1,
  },
  {
    id: "5",
    author: { id: "5", name: "Charlie Davis", image: "image5.png" },
    title: "Fifth Post",
    createdAt: "2023-10-05T07:00:00Z",
    content: "This is the content of the fifth post.",
    commentsCount: 1,
  },
  {
    id: "6",
    author: { id: "6", name: "Diana Evans", image: "image6.png" },
    title: "Sixth Post",
    createdAt: "2023-10-06T06:00:00Z",
    content: "This is the content of the sixth post.",
    commentsCount: 1,
  },
  {
    id: "7",
    author: { id: "7", name: "Eve Foster", image: "image7.png" },
    title: "Seventh Post",
    createdAt: "2023-10-07T05:00:00Z",
    content: "This is the content of the seventh post.",
    commentsCount: 1,
  },
  {
    id: "8",
    author: { id: "8", name: "Frank Green", image: "image8.png" },
    title: "Eighth Post",
    createdAt: "2023-10-08T04:00:00Z",
    content: "This is the content of the eighth post.",
    commentsCount: 1,
  },
  {
    id: "9",
    author: { id: "9", name: "Grace Harris", image: "image9.png" },
    title: "Ninth Post",
    createdAt: "2023-10-09T03:00:00Z",
    content: "This is the content of the ninth post.",
    commentsCount: 1,
  },
  {
    id: "10",
    author: { id: "10", name: "Henry Irving", image: "image10.png" },
    title: "Tenth Post",
    createdAt: "2023-10-10T02:00:00Z",
    content: "This is the content of the tenth post.",
    commentsCount: 1,
  },
];

export default function PostsPage() {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTitle("");
    setContent("");
    setOpen(false);
  };

  const handlePost = () => {
    console.log({ title, content });
    handleClose();
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
        {mockPosts.map((post, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <UserInput
              data={post}
              type="preview"
              onClick={() => router.push(`/posts/${post.id}`)}
            />
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Titulo"
            type="text"
            fullWidth
            variant="filled"
            placeholder="Titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Contenido"
            type="text"
            fullWidth
            variant="filled"
            placeholder="Contenido"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handlePost} disabled={!title || !content}>
            Postear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
