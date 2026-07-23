import React from "react";
import UserListItem from "./UserListItem";
import "./UserList.css";

function UserList({ users, onDeleteUser }) {
  return (
    <ul className="MovieList">
      {users.map((user) => (
        <UserListItem
          key={user._id}
          user={user}
          onDeleteUser={() => onDeleteUser(user)}
        />
      ))}
    </ul>
  );
}

export default UserList;
