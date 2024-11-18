"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import UserInput from "@/components/UserInput";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment, Skeleton, TextField } from "@mui/material";
import axios from "axios";
import { Post } from "@/models/interfaces";
import PostsDialog from "@/components/PostsDialog";

const data = {
  id: "8",
  author: { id: "8", name: "Frank Green", image: "avatar8.png" },
  title: "Eighth Post",
  createdAt: "2023-10-08T04:00:00Z",
  content: "This is the content of the eighth post.",
  commentsCount: 9,
};

const comments = [
  {
    id: "8",
    postId: "7",
    author: { id: "8", name: "Frank Green", image: "image8.png" },
    content: "Nice post!",
    createdAt: "2023-10-07T06:00:00Z",
  },
  {
    id: "2",
    postId: "7",
    author: { id: "8", name: "Frank Green", image: "image8.png" },
    content: "Nice post!",
    createdAt: "2023-10-07T06:00:00Z",
  },
  {
    id: "4",
    postId: "7",
    author: { id: "8", name: "Frank Green", image: "image8.png" },
    content: "Nice post!",
    createdAt: "2023-10-07T06:00:00Z",
  },
  {
    id: "5",
    postId: "7",
    author: { id: "8", name: "Frank Green", image: "image8.png" },
    content:
      "Nice postñlsdkfñ laskdlñf kasdlñf klsañdfk lañsdkf lñasdkf lñasdkf lñaskdf lñasdf asdf! Nice postñlsdkfñ laskdlñf kasdlñf klsañdfk lañsdkf lñasdkf lñasdkf lñaskdf lñasdf asdfNice postñlsdkfñ laskdlñf kasdlñf klsañdfk lañsdkf lñasdkf lñasdkf lñaskdf lñasdf asdfNice postñlsdkfñ laskdlñf kasdlñf klsañdfk lañsdkf lñasdkf lñasdkf lñaskdf lñasdf asdfNice postñlsdkfñ laskdlñf kasdlñf klsañdfk lañsdkf lñasdkf lñasdkf lñaskdf lñasdf asdfNice postñlsdkfñ laskdlñf kasdlñf klsañdfk lañsdkf lñasdkf lñasdkf lñaskdf lñasdf asdfNice postñlsdkfñ laskdlñf kasdlñf klsañdfk lañsdkf lñasdkf lñasdkf lñaskdf lñasdf asdf",
    createdAt: "2023-10-07T06:00:00Z",
  },
];

export default function PostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        console.log(response);

        setPost(response.data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    console.log(comment);
    setComment("");
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
      console.error("Failed to create post", error);
    }
  };

  const handleEdit = async (title: string, content: string) => {
    try {
      const response = await axios.put(`/api/posts/${id}`, { title, content });
      setPost(response.data);
    } catch (error) {
      console.error("Failed to create post", error);
    } finally {
      setOpenEdit(false);
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
            onDelete={() => deletePost()}
            onUpdate={() => setOpenEdit(true)}
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
        {/* {comments.map((comment) => (
          <UserInput type="comment" data={comment} key={comment.id} />
        ))} */}
      </div>
    </div>
  );
}
