// PostList.js
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";

const PostList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="body" />
      <EditButton basePath="/posts" />
      <DeleteButton basePath="/posts" />
    </Datagrid>
  </List>
);

export default PostList;