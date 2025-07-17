'use client';

import { useState } from 'react';
import { useChat } from '@/hooks/usechat';

export default function Sidebar() {
  const { chats, setChatId, startNewChat, chatId } = useChat();
  const [collapsed, setCollapsed] = useState(false);

  const colorVariants = [
    'bg-red-100 text-red-900',
    'bg-yellow-100 text-yellow-900',
    'bg-green-100 text-green-900',
    'bg-blue-100 text-blue-900',
    'bg-purple-100 text-purple-900',
    'bg-pink-100 text-pink-900',
    'bg-indigo-100 text-indigo-900',
    'bg-orange-100 text-orange-900',
  ];

  const getIconForTitle = (title: string) => {
    const firstChar = title.trim().charAt(0).toUpperCase();
    if ('ABCDEF'.includes(firstChar)) return '📘';
    if ('GHIJKL'.includes(firstChar)) return '🧾';
    if ('MNOPQR'.includes(firstChar)) return '💬';
    return '💡';
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[60px]' : 'w-[240px]'
      } bg-gray-100 h-screen p-2`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          {!collapsed && 'Chats'}
        </h2>
        <button
          className="text-xl"
          onClick={() => setCollapsed(!collapsed)}
          title="Toggle Sidebar"
        >
          ⋮
        </button>
      </div>

      {/* New Chat */}
      <button
        onClick={startNewChat}
        className="w-full bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition"
      >
        {!collapsed ? '+ New Chat' : '+'}
      </button>

      {/* Chat List */}
      <div className="mt-4 space-y-2 overflow-y-auto max-h-[80vh]">
        {chats.map((chat, index) => {
          const color = colorVariants[index % colorVariants.length];
          const isActive = chat.id === chatId;
          const title = chat.title || 'Untitled';
          const icon = getIconForTitle(title);

          return (
            <button
              key={chat.id}
              onClick={() => setChatId(chat.id)}
              className={`w-full text-left truncate p-2 rounded shadow-sm transition flex items-center gap-2 ${
                isActive
                  ? `ring-2 ring-blue-500 ${color} font-bold`
                  : `${color} hover:brightness-110`
              }`}
            >
              <span>{icon}</span>
              {!collapsed && <span className="truncate">{title}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
