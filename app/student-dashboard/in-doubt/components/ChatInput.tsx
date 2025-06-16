'use client';

import React, { useState } from 'react';
import { PaperClipIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline';

type Props = {
  onSubmit: (message: string, image?: File) => void;
};

const ChatInput: React.FC<Props> = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSend = () => {
    if (message.trim() || file) {
      onSubmit(message.trim(), file || undefined);
      setMessage('');
      setFile(null);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-white p-4 border-t">
      <label className="cursor-pointer">
        <PaperClipIcon className="h-6 w-6 text-gray-500" />
        <input
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send a message..."
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
      />
      <button onClick={handleSend}>
        <ArrowUpCircleIcon className="h-8 w-8 text-blue-600 hover:text-blue-700" />
      </button>
    </div>
  );
};

export default ChatInput;
