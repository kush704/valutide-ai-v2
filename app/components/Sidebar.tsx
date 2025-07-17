'use client';

import React from 'react';

type Chat = {
  id: string;
  title: string;
};

type SidebarProps = {
  chats: Chat[];
  setChatId: (id: string) => void;
  startNewChat: () => Promise<string>;
  currentChatId: string | null;
};

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  setChatId,
  startNewChat,
  currentChatId,
}) => {
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

  const getEmoji = (title: string) => {
    const char = title.trim().charAt(0).toUpperCase();
    if ('ABCDEF'.includes(char)) return '📘';
    if ('GHIJKL'.includes(char)) return '🧾';
    if ('MNOPQR'.includes(char)) return '💬';
    return '💡';
  };

  const handleNewChat = async () => {
    const newChatId = await startNewChat();
    setChatId(newChatId);
  };

  return (
    <div className="w-64 bg-gray-100 p-4 shadow-md h-screen space-y-4 overflow-y-auto">
      <h2 className="text-xl font-semibold text-purple-700">💬 Chats</h2>

      <button
        onClick={handleNewChat}
        className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        ➕ New Chat
      </button>

      <div className="space-y-2">
        {chats.map((chat, index) => {
          const color = colorVariants[index % colorVariants.length];
          const isActive = chat.id === currentChatId;
          return (
            <button
              key={chat.id}
              onClick={() => setChatId(chat.id)}
              className={`w-full text-left p-2 rounded-lg truncate flex items-center gap-2 shadow-sm ${
                isActive ? 'ring-2 ring-blue-500 font-bold' : 'hover:bg-blue-100'
              } ${color}`}
            >
              <span>{getEmoji(chat.title || 'Untitled')}</span>
              <span className="truncate">{chat.title || 'Untitled'}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
