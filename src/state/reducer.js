export const initialState = {
  messages: [],
  input: "",
  currentRoom: "General",
  name: null,
  socket: null,
  connected: false,
  sidebarOpen: false,
  sidebarWidth: 0,
};

export const actionTypes = {
  SET_MESSAGES: "SET_MESSAGES",
  ADD_MESSAGE: "ADD_MESSAGE",
  SET_INPUT: "SET_INPUT",
  SET_CURRENT_ROOM: "SET_CURRENT_ROOM",
  SET_NAME: "SET_NAME",
  SET_SOCKET: "SET_SOCKET",
  SET_CONNECTED: "SET_CONNECTED",
  SET_SIDEBAR_OPEN: "SET_SIDEBAR_OPEN",
  SET_SIDEBAR_WIDTH: "SET_SIDEBAR_WIDTH",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_MESSAGES:
      return { ...state, messages: action.payload };
    case actionTypes.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case actionTypes.SET_INPUT:
      return { ...state, input: action.payload };
    case actionTypes.SET_CURRENT_ROOM:
      return { ...state, currentRoom: action.payload };
    case actionTypes.SET_NAME:
      return { ...state, name: action.payload };
    case actionTypes.SET_SOCKET:
      return { ...state, socket: action.payload };
    case actionTypes.SET_CONNECTED:
      return { ...state, connected: action.payload };
    case actionTypes.SET_SIDEBAR_OPEN:
      return { ...state, sidebarOpen: action.payload };
    case actionTypes.SET_SIDEBAR_WIDTH:
      return { ...state, sidebarWidth: action.payload };
    default:
      return state;
  }
};
