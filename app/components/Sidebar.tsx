'use client';

type Chat = {
  title: string;
  messages: { type: 'user' | 'ai'; content: string }[];
};

type Props = {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  onNewChat: () => void;
};

const Sidebar: React.FC<Props> = ({ chats = [], onSelectChat, onNewChat }) => {
  return (
    <div className="h-full w-64 p-4 bg-white shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Past Chats</h2>

      <button
        onClick={onNewChat}
        className="mb-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        + New Chat
      </button>

      <ul className="space-y-2">
        {chats.map((chat, index) => (
          <li
            key={index}
            onClick={() => onSelectChat(chat)}
            className="cursor-pointer text-blue-600 hover:underline truncate"
            title={chat.title}
          >
            {chat.title || `Chat ${index + 1}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
