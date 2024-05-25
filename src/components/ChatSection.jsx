import MessageList from "./MessageList";

const ChatSection = ({ messages, name, lastMessageRef, messageListRef }) => (
  <section className="flex-1 bg-ctp-crust overflow-y-auto relative" ref={messageListRef}>
    <div className="p-4">
      <MessageList messages={messages} currentUser={name} lastMessageRef={lastMessageRef} />
    </div>
  </section>
);

export default ChatSection;
