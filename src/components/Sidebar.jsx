import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { classNames } from "../utils";

const Sidebar = ({ rooms, currentRoom, setCurrentRoom, sidebarOpen, setSidebarOpen }) => {
  const handleRoomClick = (room) => {
    setCurrentRoom(room);
    setSidebarOpen(false);
  };

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-hidden" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex flex-col h-full max-w-xs w-full bg-ctp-base">
            <div className="flex items-center justify-between px-6 py-4">
              <h1 className="text-2xl font-bold text-white">Rooms</h1>
              <button
                type="button"
                className="text-white rounded-md hover:bg-ctp-mantle p-2 focus:outline-none focus:ring focus:ring-blue-500"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto">
              <ul role="list" className="space-y-1">
                {rooms?.map((room) => (
                  <li
                    key={room}
                    className={classNames(
                      "px-6 py-4 hover:bg-ctp-mantle",
                      currentRoom === room ? "bg-ctp-mantle" : ""
                    )}
                    onClick={() => handleRoomClick(room)}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-medium text-ctp-text">{room}</p>
                      <ChevronRightIcon className="h-6 w-6 text-ctp-blue" />
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default Sidebar;
