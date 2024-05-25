import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { classNames } from "../utils";

const SidebarDesktop = ({ rooms, currentRoom, setCurrentRoom }) => (
  <aside className="hidden lg:block lg:w-72">
    <div className="bg-ctp-crust p-4 pr-0 h-full overflow-y-auto" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <h1 className="text-2xl text-center text-white font-bold mb-4">Rooms</h1>
      <ul className="mt-4">
        {rooms?.map((room) => (
          <li
            key={room}
            className={classNames(
              "px-4 py-3 rounded-md cursor-pointer transition-colors duration-300 ease-in-out",
              "hover:bg-ctp-mantle focus:bg-ctp-mantle focus:outline-none",
              currentRoom === room ? "bg-ctp-mantle" : "hover:bg-ctp-base"
            )}
            onClick={() => setCurrentRoom(room)}
          >
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium text-ctp-text">{room}</p>
              <ChevronRightIcon className="h-6 w-6 text-ctp-blue" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

export default SidebarDesktop;

