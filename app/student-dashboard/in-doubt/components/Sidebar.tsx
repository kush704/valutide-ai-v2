'use client';

import { useState } from 'react';
import { useChat } from '@/hooks/usechat';

export default function Sidebar() {
  const { chats, setChatId, startNewChat, chatId } = useChat();
  const [collapsed, setCollapsed] = useState(false);

  const colorVariants = [
    'bg-red-200 text-red-900',
    'bg-yellow-200 text-yellow-900',
    'bg-green-200 text-green-900',
    'bg-blue-200 text-blue-900',
    'bg-purple-200 text-purple-900',
    'bg-pink-200 text-pink-900',
    'bg-indigo-200 text-indigo-900',
    'bg-orange-200 text-orange-900',
  ];

  const getIconForTitle = (title: string) => {
    const firstChar = title.trim().charAt(0).toUpperCase();
    if ('ABCDEF'.includes(firstChar)) return '📘';
    if ('GHIJKL'.includes(firstChar)) return '🧾';
    if ('MNOPQR'.includes(firstChar)) return '💬';
    return '💡';
  };

  return (
    <div className={`transition-all duration-300 ease-in-out ${collapsed ? 'w-[60px]' : 'w-[240px]'} bg-gray-100 h-screen p-2`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-purple-700">{!collapsed && '💬 Chats'}</h2>
        <button className="text-xl" onClick={() => setCollapsed(!collapsed)} title="Toggle Sidebar">⋮</button>
      </div>

      {/* New Chat Button */}
      <button
        onClick={startNewChat}
        className="w-full bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition"
      >
        {!collapsed ? '➕ New Chat' : '+'}
      </button>

      {/* Chat List */}
      <div className="mt-4 space-y-2 overflow-y-auto max-h-[80vh]">
        {chats.map((chat, index) => {
          const colorClass = colorVariants[index % colorVariants.length];
          const isSelected = chat.id === chatId;
          const title = chat.title || 'Untitled';
          const icon = getIconForTitle(title);

          return (
            <button
              key={chat.id}
              onClick={() => setChatId(chat.id)}
              className={`w-full text-left truncate p-2 rounded shadow-sm flex items-center gap-2 transition
                ${colorClass} ${isSelected ? 'ring-2 ring-blue-500 font-bold' : 'hover:brightness-105'}
              `}
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
