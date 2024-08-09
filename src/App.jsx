import { useReducer, useRef } from "react";
import Sidebar from "./components/Sidebar";
import SidebarDesktop from "./components/SidebarDesktop";
import Header from "./components/Header";
import ChatSection from "./components/ChatSection";
import Footer from "./components/Footer";
import { initialState, actionTypes, reducer } from "./state/reducer";
import useSocket from "./hooks/useSocket";
import useSidebarWidth from "./hooks/useSidebarWidth";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const lastMessageRef = useRef(null);
  const messageListRef = useRef(null);

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useSocket(state, dispatch, scrollToBottom);
  useSidebarWidth(dispatch);

  const sendMessage = (e) => {
    e.preventDefault();
    state.socket?.emit("message", { text: state.input, room: state.currentRoom });
    dispatch({ type: actionTypes.SET_INPUT, payload: "" });
  };

  const rooms = ["General", "Programming", "Games", "Sports"];

  let content = (
    <main className="h-screen w-screen bg-ctp-crust text-ctp-text overflow-hidden relative flex">
      <SidebarDesktop
        rooms={rooms}
        currentRoom={state.currentRoom}
        setCurrentRoom={(room) => dispatch({ type: actionTypes.SET_CURRENT_ROOM, payload: room })}
        className="hidden lg:flex lg:flex-col fixed top-0 left-0 h-full bg-ctp-mantle z-40 "
      />

      <Sidebar
        rooms={rooms}
        currentRoom={state.currentRoom}
        setCurrentRoom={(room) => dispatch({ type: actionTypes.SET_CURRENT_ROOM, payload: room })}
        sidebarOpen={state.sidebarOpen}
        setSidebarOpen={(open) => dispatch({ type: actionTypes.SET_SIDEBAR_OPEN, payload: open })}
        className={`h-full ${state.sidebarOpen ? "w-1/5" : "w-2/5"} bg-ctp-mantle z-40`}
      />

      <div className="flex flex-col flex-1">
        <Header currentRoom={state.currentRoom} setSidebarOpen={(open) => dispatch({ type: actionTypes.SET_SIDEBAR_OPEN, payload: open })} />
        <ChatSection messages={state.messages} name={state.name} lastMessageRef={lastMessageRef} messageListRef={messageListRef} />
        <Footer input={state.input} setInput={(input) => dispatch({ type: actionTypes.SET_INPUT, payload: input })} sendMessage={sendMessage} state={state} currentRoom={state.currentRoom} />
      </div>
    </main>

  );

  return content;
};

export default App;
