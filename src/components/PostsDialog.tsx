import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface PostsDialogProps {
  open: boolean;
  header: string;
  defaultTitle?: string;
  defaultContent?: string;
  handleClose: () => void;
  handleConfirm: (title: string, content: string) => void;
}

const PostsDialog: React.FC<PostsDialogProps> = ({
  header,
  defaultTitle,
  defaultContent,
  open,
  handleClose,
  handleConfirm,
}) => {
  const [title, setTitle] = useState(defaultTitle || "");
  const [content, setContent] = useState(defaultContent || "");
  useEffect(() => {
    if (!open) {
      setTitle(defaultTitle || "");
      setContent(defaultContent || "");
    }
  }, [defaultContent, defaultTitle, open]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{header}</DialogTitle>
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
        <Button
          onClick={() => handleConfirm(title, content)}
          disabled={!title || !content}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostsDialog;
