export default function AccountInfo({ setTab, user }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Thông tin tài khoản</h2>

      <div className="space-y-3 text-lg">
        <div>Email: <b>{user.email}</b></div>
        <div>Tên hiển thị: <b>{user.username}</b></div>
        <div>Giới tính: <b>{user.gender}</b></div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setTab("edit")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ✏️ Chỉnh sửa thông tin
        </button>
        <button
          onClick={() => setTab("password")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🔑 Đổi mật khẩu
        </button>
      </div>
    </div>
  );
}
