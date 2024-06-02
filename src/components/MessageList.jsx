import { useState, useEffect } from "react";
import { colorForName } from "../utils/index";

const MessageList = ({ messages, currentUser, lastMessageRef }) => {
  const [expandedMessages, setExpandedMessages] = useState([]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleMessageExpansion = (index) => {
    if (expandedMessages.includes(index)) {
      setExpandedMessages(expandedMessages.filter((i) => i !== index));
    } else {
      setExpandedMessages([...expandedMessages, index]);
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diff = now - messageDate;
    const oneDay = 24 * 60 * 60 * 1000;
    if (diff < oneDay) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return messageDate.toLocaleString();
  };

  // Function to calculate minimum width
  const calculateMinWidth = (user, date) => {
    const userLength = user.length;
    const dateLength = formatDate(date).length;
    // Assuming average character width of 8px, plus 5px space
    return (userLength + dateLength) * 8 + 5;
  };

  // Sort messages by date before rendering
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <ul className="p-4 overflow-auto max-h-full">
      {sortedMessages?.map((msg, index) => {
        if (!msg || !msg.user) return null;

        const isCurrentUser = msg.user === currentUser;
        const isMessageExpanded = expandedMessages.includes(index);
        const messageText =
          isMessageExpanded || !msg.text || msg.text.length <= 200
            ? msg.text
            : msg.text.slice(0, 200) + "...";

        const minWidth = calculateMinWidth(msg.user, msg.date);

        return (
          <li
            key={index}
            ref={index === sortedMessages.length - 1 ? lastMessageRef : null}
            className={`mb-4 flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 max-w-md bg-gray-800 text-white rounded-lg shadow-md`}
              style={{ minWidth: `${minWidth}px` }}
            >
              <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center mb-1">
                  <p
                    className={`text-sm font-semibold text-${colorForName(msg.user)}`}
                  >
                    {msg.user === currentUser ? "You" : msg.user}
                  </p>
                  <p className="text-xs text-gray-400">
                    {!msg.isTyping ? formatDate(msg.date) : ""}
                  </p>
                </div>
                {msg.text && !msg.isTyping && (
                  <p className="text-sm break-words">{messageText}</p>
                )}
                {msg.isTyping && (
                  <p className="text-xs text-gray-400 italic mb-1">
                    {msg.user} is typing...
                  </p>
                )}
                {msg.text && msg.text.length > 200 && (
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
