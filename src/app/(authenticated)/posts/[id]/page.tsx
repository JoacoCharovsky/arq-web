"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import UserInput from "@/components/UserInput";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment, TextField } from "@mui/material";

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
  const [comment, setComment] = useState("");

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

  return (
    <div className="space-y-10">
      <UserInput data={data} type="post" />
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
          <UserInput type="comment" data={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}
