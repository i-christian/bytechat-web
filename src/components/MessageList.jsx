import { useState, useEffect } from 'react';
import { colorForName } from "../utils";

const MessageList = ({ messages, currentUser, lastMessageRef }) => {
  const [expandedMessages, setExpandedMessages] = useState([]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleMessageExpansion = (index) => {
    if (expandedMessages.includes(index)) {
      setExpandedMessages(expandedMessages.filter(i => i !== index));
    } else {
      setExpandedMessages([...expandedMessages, index]);
    }
  };

  return (
    <ul className="p-4 overflow-auto max-h-full">
      {messages?.map((msg, index) => {
        const isCurrentUser = msg.user === currentUser;
        const isMessageExpanded = expandedMessages.includes(index);
        const messageText = isMessageExpanded || msg.text.length <= 200 ? msg.text : msg.text.slice(0, 200) + '...';

        return (
          <li
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={`mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`p-3 rounded-lg max-w-xs ${isCurrentUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
              <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center mb-1">
                  <p className={`text-sm font-semibold ${isCurrentUser ? 'text-white' : `text-${colorForName(msg.user)}`}`}>
                    {msg.user}
                  </p>
                  <p className={`text-xs ${isCurrentUser ? 'text-gray-300' : 'text-gray-600'}`}>
                    {msg.date.toLocaleString()}
                  </p>
                </div>
                <p className="mt-1 text-sm break-words">{messageText}</p>
                {msg.text.length > 200 && (
                  <button
                    className="text-blue-500 hover:underline mt-1 text-sm"
                    onClick={() => toggleMessageExpansion(index)}
                  >
                    {isMessageExpanded ? "Read less" : "Read more"}
                  </button>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default MessageList;
