import React, { useState } from "react";
import { toggleLike, updateComment, deleteComment } from "../../libs/api";

export default function CommentItem({ comment, token, onReply }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.content);

  const handleLike = async () => {
    await toggleLike(comment._id, token);
  };

  const handleUpdate = async () => {
    await updateComment(comment._id, { content: text }, token);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteComment(comment._id, token);
  };

  return (
    <div className="border-b p-2 ml-4">
      <p className="font-bold">{comment.userId.username}</p>

      {isEditing ? (
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      ) : (
        <p>{comment.content}</p>
      )}

      <div className="flex gap-3 text-sm">
        <button onClick={handleLike}>👍 {comment.likes.length}</button>
        <button onClick={() => onReply(comment._id)}>💬 Trả lời</button>
        {isEditing ? (
          <button onClick={handleUpdate}>✅ Lưu</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>✏️ Sửa</button>
        )}
        <button onClick={handleDelete}>🗑️ Xoá</button>
      </div>

      {/* Hiển thị replies */}
      {comment.replies?.length > 0 && (
        <div className="ml-6">
          {comment.replies.map((r) => (
            <CommentItem key={r._id} comment={r} token={token} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}
