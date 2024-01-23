// CommentEdit.js
import * as React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

const CommentEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="commentBody" label="Comment Body" />
      <TextInput source="username" label="Username" />
    </SimpleForm>
  </Edit>
);

export default CommentEdit;
