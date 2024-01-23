// UserList.js
import * as React from "react";
import { List, Datagrid, TextField, EditButton } from "react-admin";
import UserDeleteButton from "./UserDeleteButton";

export const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="email" />
      <EditButton basePath="/users" />
      <UserDeleteButton />
    </Datagrid>
  </List>
);
