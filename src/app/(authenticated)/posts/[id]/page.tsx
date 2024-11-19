"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import UserInput from "@/components/UserInput";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment, Skeleton, TextField } from "@mui/material";
import axios from "axios";
import { Post, Comment } from "@/models/interfaces";
import PostsDialog from "@/components/PostsDialog";
import { useSession } from "next-auth/react";

export default function PostPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data } = useSession();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await axios.get(`/api/posts/${id}`);
        setPost(postResponse.data);

        const commentsResponse = await axios.get(`/api/posts/${id}/comments`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Failed to fetch post or comments", error);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/api/posts/${id}/comments`, {
        content: comment,
      });
      setComments((prev) => [...prev, response.data]);
      setComment("");
    } catch (error) {
      console.error("Failed to create comment", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(`/api/posts/${id}`);
      router.push(`/posts`);
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  const handleEdit = async (title: string, content: string) => {
    try {
      const response = await axios.put(`/api/posts/${id}`, { title, content });
      setPost(response.data);
    } catch (error) {
      console.error("Failed to update post", error);
    } finally {
      setOpenEdit(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await axios.delete(`/api/posts/${id}/comments`, {
        data: { commentId },
      });
      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  return (
    <div className="space-y-10">
      {!post ? (
        <Skeleton variant="rounded" height={160} />
      ) : (
        <div>
          <UserInput
            data={post}
            type="post"
            onDelete={
              post.author._id === data?.user?.id
                ? () => deletePost()
                : undefined
            }
            onUpdate={
              post.author._id === data?.user?.id
                ? () => setOpenEdit(true)
                : undefined
            }
          />
          <PostsDialog
            open={openEdit}
            defaultTitle={post.title}
            defaultContent={post.content}
            header={"Editar Post"}
            handleClose={() => setOpenEdit(false)}
            handleConfirm={handleEdit}
          />
        </div>
      )}

      <div className="space-y-3 px-6">
        <TextField
          value={comment}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          variant="outlined"
          fullWidth
          placeholder="Agregar Comentario"
          sx={{ backgroundColor: "background.paper" }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSubmit} color="primary">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        {comments.map((comment) => (
          <UserInput
            type="comment"
            data={comment}
            key={comment._id}
            onDelete={
              comment.author._id === data?.user?.id
                ? () => deleteComment(comment._id)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
