// CommentDelete.js
import * as React from "react";
import { DeleteButton, useDelete } from "react-admin";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const CommentDeleteButton = ({ record, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const { handleDelete } = useDelete("comments", record.id, record, props);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    handleDelete();
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClick} label="ra.action.delete">
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <div>Are you sure you want to delete this comment?</div>
        <div>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Delete</Button>
        </div>
      </Dialog>
    </>
  );
};

export const CommentDelete = (props) => (
  <DeleteButton {...props} button={CommentDeleteButton} />
);
