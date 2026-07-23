import React from "react";
import "./UserListItem.css";

function User({ user, onDeleteUser }) {
  return (
    <li className="MovieListItem">
      {user.name}
      <button className="MovieListItem__Delete" onClick={onDeleteUser}>
        <img src="/images/delete.svg" alt="Delete user" />
      </button>
    </li>
  );
}

export default User;
