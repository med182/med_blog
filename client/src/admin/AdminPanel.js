// AdminPanel.js
import * as React from "react";
import { Admin, Resource } from "react-admin";
import dataProvider from "../config/DataProvider";
import PostList from "./posts/PostList";
import PostEdit from "./posts/PostEdit";
import PostDelete from "./posts/PostDelete";
// Importations pour les commentaires
import CommentList from "./comments/CommentList";
import CommentEdit from "./comments/CommentEdit";
import CommentDeleteButton from "./comments/CommentDeleteButton";

// Importations pour les utilisateurs
import UserList from "./users/UserList";
import UserEdit from "./users/UserEdit";
import UserDeleteButton from "./users/UserDeleteButton";
import UserCreate from "./users/UserCreate";

const AdminPanel = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostDelete}
    />
    <Resource
      name="comments"
      list={CommentList}
      edit={CommentEdit}
      create={CommentDeleteButton}
    />
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
      delete={UserDeleteButton}
    />
  </Admin>
);

export default AdminPanel;
