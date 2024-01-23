// UserDelete.js
import * as React from "react";
import { DeleteButton, DeleteWithConfirmButton } from "react-admin";

const UserDeleteButton = (props) => (
  <DeleteWithConfirmButton
    {...props}
    label="Supprimer"
    icon={<DeleteButton />}
    redirect="/users"
  />
);

export default UserDeleteButton;
