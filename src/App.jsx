import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { Bars3Icon } from "@heroicons/react/24/outline";

import Sidebar from "./components/Sidebar";
import SidebarDesktop from "./components/SidebarDesktop";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentRoom, setCurrentRoom] = useState("General");
  const [name, setName] = useState(null);
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const onceRef = useRef(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMessages([]);
    socket?.emit("join", currentRoom);
  }, [currentRoom]);

  useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;

    const socket = io("ws://localhost:3000");
    setSocket(socket);

    socket.on("connect", () => {
      setName(`anon-${socket.id}`);
      setConnected(true);
      socket.emit("join", currentRoom);
    });

    socket.on("message", (msg) => {
      msg.date = new Date(msg.date);
      setMessages((messages) => [...messages, msg]);
    });

    socket.on("messages", (msgs) => {
      const formattedMessages = msgs.messages.map((msg) => ({
        ...msg,
        date: new Date(msg.date),
      }));
      setMessages(formattedMessages);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket?.emit("message", { text: input, room: currentRoom });
    setInput("");
  };

  const rooms = ["General", "Programming", "Games", "Sports"];

  return (
    <main className="h-screen w-screen flex text-ctp-text">
      <Sidebar
        rooms={rooms}
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <SidebarDesktop rooms={rooms} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} />
      <div className="h-screen p-4 bg-ctp-crust flex flex-col flex-grow justify-end">
        <div className="bg-ctp-base rounded-t-lg flex-grow">
          <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-ctp-mantle px-2 sm:px-6 lg:hidden">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 text-sm font-semibold leading-6 text-white">
              <h1 className="text-2xl text-white font-bold py-4">{currentRoom}</h1>
            </div>
          </div>
          <h1 className="hidden lg:block text-2xl text-center text-white font-bold my-4">{currentRoom}</h1>
          <MessageList messages={messages} />
        </div>
        <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
      </div>
    </main>
  );
}

export default App;
