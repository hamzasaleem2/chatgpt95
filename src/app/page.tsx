"use client";
import Chat from "@/components/Chat";
import Start from "@/components/Start";
import React, { useState } from "react";

export default function Page() {
  const [isChatOpen, setIsChatOpen] = useState(true);

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div>
      <Start />
      {isChatOpen && <Chat onClose={handleCloseChat} />}
    </div>
  );
}
