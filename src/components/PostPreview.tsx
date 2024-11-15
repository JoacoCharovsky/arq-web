import React from "react";
import { Paper, Box, Avatar, Typography } from "@mui/material";

interface PostPreviewProps {
  author: {
    name: string;
    avatarUrl: string;
  };
  title: string;
  createdAt: string;
  content: string;
  commentsCount: number;
  detailView: boolean;
  onClick?: () => void;
}

const PostPreview: React.FC<PostPreviewProps> = ({
  author,
  title,
  createdAt,
  commentsCount,
  content,
  detailView,
  onClick,
}) => {
  return (
    <div onClick={onClick && onClick}>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          minHeight: 160,
          cursor: detailView ? "default" : "pointer",
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar alt={author.name} src={author.avatarUrl} />
          <Box ml={2}>
            <Typography variant="body1">{author.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(createdAt).toLocaleString()}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {detailView ? content : `${commentsCount} comments`}
        </Typography>
      </Paper>
    </div>
  );
};

export default PostPreview;
