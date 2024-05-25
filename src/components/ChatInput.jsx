import { ArrowUpIcon } from "@heroicons/react/24/outline";

const ChatInput = ({ input, setInput, sendMessage }) => (
  <form className="flex items-center h-11 relative" onSubmit={sendMessage}>
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
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

export default ChatInput;
