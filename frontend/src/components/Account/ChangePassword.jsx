import { useState } from "react";

export default function ChangePassword({ setTab, user }) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (newPass !== confirmPass) {
    setError("❌ Mật khẩu mới không khớp");
    return;
  }

  try {
    const res = await fetch("http://localhost:5001/api/auth/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ oldPass, newPass }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    setSuccess("✅ Đổi mật khẩu thành công!");
    setTimeout(() => setTab("info"), 1500);
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Mật khẩu hiện tại"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="password"
          placeholder="Nhập lại mật khẩu mới"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          className="border p-2 w-full rounded"
        />

        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}

        <div className="space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Lưu
          </button>
          <button
            type="button"
            onClick={() => setTab("info")}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
