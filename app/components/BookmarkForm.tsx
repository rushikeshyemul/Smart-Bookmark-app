"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";

export default function BookmarkForm({ user }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const addBookmark = async (e: any) => {
    e.preventDefault();

    if (!title || !url) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("bookmarks").insert([
        {
          title,
          url,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      toast.success("Bookmark added successfully!");
      setTitle("");
      setUrl("");
    } catch (error) {
      toast.error("Failed to add bookmark");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={addBookmark} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2.5">
          📝 Bookmark Name
        </label>
        <input
          type="text"
          placeholder="e.g., React Documentation, My Portfolio"
          className="w-full px-4 py-3.5 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-gray-400 hover:border-gray-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2.5">
          🔗 Website URL
        </label>
        <input
          type="url"
          placeholder="https://www.example.com"
          className="w-full px-4 py-3.5 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none placeholder:text-gray-400 hover:border-gray-300"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Adding Bookmark...
          </span>
        ) : (
          "Add Bookmark"
        )}
      </button>
    </form>
  );
}
