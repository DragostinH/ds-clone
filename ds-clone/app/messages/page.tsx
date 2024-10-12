"use client";

import { signOut } from "next-auth/react";
import Button from "../components/Button";

const Messages = () => {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/", // Redirect to home page after sign out
    });
  };
  return (
    <div className="">
      You have successfully logged in!
      <Button onClick={() => handleLogout()}>Sign Out</Button>
    </div>
  );
};

export default Messages;
