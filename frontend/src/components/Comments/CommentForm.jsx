import React, { useState } from "react";
import { createComment } from "../../libs/api";

export default function CommentForm({ movieId, parentId = null, token, onSuccess }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    await createComment(movieId, { content, parentId }, token);
    setContent("");
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Viết bình luận..."
        className="border rounded p-2"
      />
      <button type="submit" className="bg-red-500 text-white px-4 py-1 rounded">
        Gửi
      </button>
    </form>
  );
}
