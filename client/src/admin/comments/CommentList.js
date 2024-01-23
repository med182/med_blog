// CommentList.js
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";

const CommentList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="commentBody" label="Comment Body" />
      <TextField source="username" label="Username" />
      <EditButton basePath="/comments" />
      <DeleteButton basePath="/comments" />
    </Datagrid>
  </List>
);

export default CommentList;
