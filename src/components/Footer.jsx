import ChatInput from "./ChatInput";

const Footer = ({ input, setInput, sendMessage }) => (
  <footer className="bg-inherit py-2">
    <div className="max-w-screen-lg mx-auto bg-ctp-crust px-4 py-2 mt-4 mb-2 rounded-md">
      <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  </footer>
);

export default Footer;
