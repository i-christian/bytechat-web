import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { actionTypes } from "../state/reducer";

const useSocket = (state, dispatch, scrollToBottom) => {
  const onceRef = useRef(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    dispatch({ type: actionTypes.SET_MESSAGES, payload: [] });
    state.socket?.emit("join", state.currentRoom);
  }, [state.currentRoom, state.socket, dispatch]);

  useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;

    let socket = state.socket;
    if (!socket) {
      socket = io("ws://localhost:8000");
      dispatch({ type: actionTypes.SET_SOCKET, payload: socket });
    }

    socket.on("connect", () => {
      dispatch({ type: actionTypes.SET_NAME, payload: `anon-${socket.id}` });
      dispatch({ type: actionTypes.SET_CONNECTED, payload: true });
      socket.emit("join", state.currentRoom);
    });

    socket.on("message", (msg) => {
      msg.date = new Date(msg.date);
      dispatch({ type: actionTypes.ADD_MESSAGE, payload: msg });
      // Remove typing messages when a new message arrives
      dispatch({ type: actionTypes.CLEAR_TYPING_MESSAGES });
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

    socket.on("typing", (typingMessage) => {
      if (typeof typingMessage !== 'string') return;
      const typingMsg = {
        text: '',
        user: typingMessage,
        date: new Date(),
        isTyping: true,
      };
      dispatch({ type: actionTypes.ADD_TYPING_MESSAGE, payload: typingMsg });
      scrollToBottom();
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        dispatch({ type: actionTypes.REMOVE_MESSAGE, payload: typingMsg });
      }, 3000);
    });

    return () => {
      clearTimeout(typingTimeoutRef.current);
    };
  }, [state.currentRoom, dispatch, scrollToBottom, state.socket]);
};

export default useSocket;
