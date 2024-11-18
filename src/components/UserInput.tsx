import React from "react";
import { Paper, Box, Avatar, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Post, Comment } from "@/models/interfaces";
import EditIcon from "@mui/icons-material/Edit";

interface PostPreviewProps {
  data: Post | Comment;
  type: "preview" | "post" | "comment";
  onClick?: () => void;
  onDelete?: () => void;
  onUpdate?: () => void;
}

const isPost = (data: Post | Comment): data is Post => {
  return (data as Post).title !== undefined;
};

const UserInput: React.FC<PostPreviewProps> = ({
  data,
  type,
  onClick,
  onDelete,
  onUpdate,
}) => {
  return (
    <div onClick={onClick && onClick}>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          minHeight: type === "comment" ? "auto" : 160,
          cursor: type === "preview" ? "pointer" : "default",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Box display="flex" alignItems="center">
            <Avatar alt={data.author.name} src={data.author.image} />
            <Box ml={2}>
              <Typography variant="body1">{data.author.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(data.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </Box>
          <Box display="flex">
            {onDelete && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            )}
            {onUpdate && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdate();
                }}
              >
                <EditIcon color="info" />
              </IconButton>
            )}
          </Box>
        </Box>
        {isPost(data) && (
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data.title}
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary">
          {type === "preview" && isPost(data)
            ? `${data.commentsCount} comments`
            : data.content}
        </Typography>
      </Paper>
    </div>
  );
};

export default UserInput;
