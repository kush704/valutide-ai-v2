// components/Sidebar.tsx
const Sidebar = () => {
  return (
    <div className="h-full p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-700">Past Chats</h2>
      <ul className="space-y-2">
        <li className="text-blue-600 cursor-pointer">Photosynthesis</li>
        <li className="text-blue-600 cursor-pointer">Budget Question</li>
        <li className="text-blue-600 cursor-pointer">New Chat</li>
      </ul>
    </div>
  );
};

export default Sidebar;
