import { useEffect, useRef } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

const ChatInput = ({ input, setInput, sendMessage, state, currentRoom }) => {
  const typingRef = useRef(false);

  const handleKeyDown = () => {
    if (!typingRef.current && input.trim() !== "") {
      typingRef.current = true;
      if (state.socket) {
        state.socket.emit("typing", currentRoom);
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value === "") {
      typingRef.current = false;
      if (state.socket) {
        state.socket.emit("typing", currentRoom);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(e);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.socket, currentRoom]);

  return (
    <form className="flex items-center h-11 relative" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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
