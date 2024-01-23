// PostCreate.js
import * as React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

const PostCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput multiline source="body" />
    </SimpleForm>
  </Create>
);

export default PostCreate;
