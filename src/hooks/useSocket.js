import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { actionTypes } from "../state/reducer";

const useSocket = (state, dispatch, scrollToBottom) => {
  const onceRef = useRef(false);

  useEffect(() => {
    dispatch({ type: actionTypes.SET_MESSAGES, payload: [] });
    state.socket?.emit("join", state.currentRoom);
  }, [state.currentRoom, state.socket, dispatch]);

  useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;

    const socket = io("ws://localhost:8000");
    dispatch({ type: actionTypes.SET_SOCKET, payload: socket });

    socket.on("connect", () => {
      dispatch({ type: actionTypes.SET_NAME, payload: `anon-${socket.id}` });
      dispatch({ type: actionTypes.SET_CONNECTED, payload: true });
      socket.emit("join", state.currentRoom);
    });

    socket.on("message", (msg) => {
      msg.date = new Date(msg.date);
      dispatch({ type: actionTypes.ADD_MESSAGE, payload: msg });
      scrollToBottom();
    });

    socket.on("messages", (msgs) => {
      const formattedMessages = msgs.messages.map((msg) => ({
        ...msg,
        date: new Date(msg.date),
      }));
      dispatch({ type: actionTypes.SET_MESSAGES, payload: formattedMessages });
      scrollToBottom();
    });
  }, [state.currentRoom, dispatch, scrollToBottom]);
};

export default useSocket;
