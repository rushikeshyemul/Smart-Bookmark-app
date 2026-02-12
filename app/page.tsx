"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { useRouter } from "next/navigation";
import BookmarkForm from "./components/BookmarkForm";
import BookmarkList from "./components/BookmarkList";
import toast from "react-hot-toast";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Bookmarks
              </h1>
              <p className="text-gray-500 mt-2">
                Welcome back, {user.email?.split("@")[0]}!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          </div>

          <BookmarkForm user={user} />
        </div>

        <BookmarkList user={user} />
      </div>
    </div>
  );
}
