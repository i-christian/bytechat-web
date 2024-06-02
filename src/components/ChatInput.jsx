import { useEffect, useRef, useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

const ChatInput = ({ input, setInput, sendMessage, state, currentRoom }) => {
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isFirstTyping, setIsFirstTyping] = useState(true);
  const typingRef = useRef(false);
  const TYPING_DELAY = 60000;

  useEffect(() => {
    const handleKeyDown = () => {
      if (!typingRef.current) {
        typingRef.current = true;
        if (isFirstTyping && state.socket) {
          state.socket.emit("typing", currentRoom);
          setIsFirstTyping(false);
        }
        if (typingTimeout) clearTimeout(typingTimeout);
        setTypingTimeout(
          setTimeout(() => {
            typingRef.current = false;
            setIsFirstTyping(true);
            if (!isFirstTyping && state.socket) {
              state.socket.emit("typing", currentRoom);
            }
          }, TYPING_DELAY)
        );
      }
    };

    const handleKeyUp = () => {
      if (typingTimeout) clearTimeout(typingTimeout);
      typingRef.current = false;
      setTypingTimeout(
        setTimeout(() => {
          if (!typingRef.current && state.socket) {
            state.socket.emit("typing", currentRoom);
          }
        }, TYPING_DELAY)
      );
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [state.socket, currentRoom, typingTimeout, isFirstTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFirstTyping(true);
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(null);
    sendMessage(e);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value === "") {
      setIsFirstTyping(true);
      if (typingTimeout) clearTimeout(typingTimeout);
      setTypingTimeout(null);
    }
  };

  return (
    <form className="flex items-center h-11 relative" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="flex-1 p-2 pl-4 pr-10 rounded-full bg-ctp-crust text-ctp-text placeholder-ctp-subtext0 border border-ctp-text"
        placeholder="Message..."
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-ctp-blue p-2 rounded-full flex items-center justify-center disabled:opacity-50"
        disabled={!input.trim()}
      >
        <ArrowUpIcon className="h-5 w-5 text-white" />
      </button>
    </form>
  );
};

export default ChatInput;
