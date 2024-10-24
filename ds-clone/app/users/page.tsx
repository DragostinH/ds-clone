"use client";

import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/users");
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return <ul>{loading ? <p>Loading...</p> : users.map((user) => <li key={user._id}>{user.name}</li>)}</ul>;
}
