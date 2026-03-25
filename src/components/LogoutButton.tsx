"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("vende_token"); // কুকি ডিলিট হলো
    router.refresh(); // এবার পেজটি রিফ্রেশ হবে এবং UI আপডেট হবে
  };

  return <button onClick={handleLogout}>LogOut</button>;
};

export default LogoutButton;