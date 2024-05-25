import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { Bars3Icon } from "@heroicons/react/24/outline";

import Sidebar from "./components/Sidebar";
import SidebarDesktop from "./components/SidebarDesktop";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentRoom, setCurrentRoom] = useState("General");
  const [name, setName] = useState(null);
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const onceRef = useRef(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    setMessages([]);
    socket?.emit("join", currentRoom);
  }, [currentRoom]);

  useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;

    const socket = io("ws://localhost:8000");
    setSocket(socket);

    socket.on("connect", () => {
      setName(`anon-${socket.id}`);
      setConnected(true);
      socket.emit("join", currentRoom);
    });

    socket.on("message", (msg) => {
      msg.date = new Date(msg.date);
      setMessages((messages) => [...messages, msg]);
      scrollToBottom();
    });

    socket.on("messages", (msgs) => {
      const formattedMessages = msgs.messages.map((msg) => ({
        ...msg,
        date: new Date(msg.date),
      }));
      setMessages(formattedMessages);
      scrollToBottom();
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket?.emit("message", { text: input, room: currentRoom });
    setInput("");
  };

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
      <section className="h-screen p-4 bg-ctp-crust flex flex-col flex-grow justify-end overflow-hidden">
        <header className="bg-ctp-base rounded-t-lg sticky top-0 z-40">
          <div className="hidden lg:flex justify-center items-center gap-x-6 bg-ctp-mantle px-2 sm:px-6">
            <h1 className="text-xl text-white font-bold my-4">{currentRoom}</h1>
          </div>
          <div className="lg:hidden flex justify-between items-center bg-ctp-mantle px-2 sm:px-6">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <h1 className="text-sm font-semibold leading-6 text-white">{currentRoom}</h1>
          </div>
        </header>
        <MessageList messages={messages} currentUser={name} lastMessageRef={lastMessageRef} />
        <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
      </section>
    </main>
  );
};

export default App;
