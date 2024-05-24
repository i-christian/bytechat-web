import { classNames } from "../utils";
import { colorForName } from "../utils";

const MessageList = ({ messages }) => (
  <ul className="p-4">
    {messages?.map((msg, index) => (
      <li key={index} className="flex w-full justify-start gap-x-4 mb-4 align-top">
        <div className="bg-ctp-mantle p-2 rounded-lg">
          <div className="flex flex-row gap-x-6 items-center">
            <p className={classNames("text-sm font-semibold", `text-${colorForName(msg.user)}`)}>
              {msg.user}
            </p>
            <p className="text-ctp-text text-sm">{msg.date.toLocaleString()}</p>
          </div>
          <p className="text-ctp-text mt-1 text-lg">{msg.text}</p>
        </div>
      </li>
    ))}
  </ul>
);

export default MessageList;
