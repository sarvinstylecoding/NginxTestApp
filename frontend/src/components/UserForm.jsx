import React, { useState } from "react";
import Input from "./Input";

function UserForm({ onAddUser }) {
  const [name, setName] = useState("");

  const handleChange = (e) => setName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) return;

    onAddUser(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        aria-label="New User"
        onChange={handleChange}
        placeholder="Add a new user..."
        type="text"
        value={name}
      />
    </form>
  );
}

export default UserForm;
