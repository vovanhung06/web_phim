import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!email) return "Vui lòng nhập email.";
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    if (!re.test(email)) return "Email không hợp lệ.";
    if (!password) return "Vui lòng nhập mật khẩu.";
    //if (password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự.";
    return "";
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  const v = validate();
  if (v) return setError(v);

  try {
    setLoading(true);

    const res = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Đăng nhập thất bại.");

    // ✅ Lưu token + email vào localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", email);

    // 🔄 thông báo cho các component khác (Header) cập nhật ngay
    window.dispatchEvent(new Event("storage"));

    alert("Đăng nhập thành công!");
    if (onLogin) onLogin(data); // callback nếu bạn muốn

if (email === "admin@gmail.com") {
  window.open("/admin", "_blank"); // mở tab mới
  navigate("/"); // vẫn giữ user ở trang chủ hiện tại
} else {
  navigate("/");
}

  } catch (err) {
    setError(err.message || "Đăng nhập thất bại.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      {/* Lớp nền mờ bao quanh */}
      <div className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/73969b52-b6e4-4dbd-9f4c-1f7bcdd5b7b7/8b9e4a6c-8c7a-4bb0-9db7-6f7d3d2d5c2a/VN-vi-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover bg-center opacity-40"></div>
      {/* Khung bao quanh */}
      <div className="relative z-10 max-w-md w-full bg-black/80 rounded-xl shadow-lg p-10 border border-zinc-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-600">
          Đăng nhập
        </h1>

        {error && (
          <div className="text-sm text-red-400 bg-red-900/40 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md bg-zinc-800 border border-zinc-700 p-3 text-white focus:ring-2 focus:ring-red-600 outline-none"
              placeholder="you@gmail.com"
              required
            />
          </div>

          <div className="relative">
            <label className="text-sm">Mật khẩu</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md bg-zinc-800 border border-zinc-700 p-3 pr-12 text-white focus:ring-2 focus:ring-red-600 outline-none"
              placeholder="Mật khẩu của bạn"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-10 text-xs text-gray-400 hover:text-white"
            >
              {showPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded border-gray-600 text-red-600 focus:ring-red-600 bg-zinc-800"
              />
              <span className="ml-2 text-gray-300">Ghi nhớ tôi</span>
            </label>
            <a href="#" className="text-red-500 hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold disabled:opacity-50 transition"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <div className="pt-4 text-center text-sm text-gray-400">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-red-500 hover:underline">
              Đăng ký
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}
