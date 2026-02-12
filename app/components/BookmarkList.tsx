"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";

export default function BookmarkList({ user }: any) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBookmarks(data || []);
    } catch (error) {
      toast.error("Failed to fetch bookmarks");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();

    const channel = supabase
      .channel("bookmarks-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
        },
        () => {
          fetchBookmarks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const deleteBookmark = async (id: string, title: string) => {
    try {
      const { error } = await supabase.from("bookmarks").delete().eq("id", id);

      if (error) throw error;

      toast.success(`"${title}" deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete bookmark");
      console.error(error);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No bookmarks yet
        </h3>
        <p className="text-gray-500">
          Start adding your favorite links above!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Your Collection ({bookmarks.length})
      </h2>
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 p-6 group"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 block mb-2 group-hover:underline"
              >
                {bookmark.title}
              </a>
              <p className="text-sm text-gray-500 truncate">{bookmark.url}</p>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => copyToClipboard(bookmark.url)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
                title="Copy URL"
              >
                Copy
              </button>
              <button
                onClick={() => deleteBookmark(bookmark.id, bookmark.title)}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
