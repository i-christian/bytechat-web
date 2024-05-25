import { Bars3Icon } from "@heroicons/react/24/outline";

const Header = ({ currentRoom, setSidebarOpen }) => (
  <header className="bg-ctp-mantle sticky top-0 z-40">
    <div className="hidden lg:flex justify-center items-center gap-x-6 px-2 sm:px-6">
      <h1 className="text-xl text-white font-bold my-4">{currentRoom}</h1>
    </div>
    <div className="lg:hidden flex justify-between items-center px-2 sm:px-6">
      <button type="button" className="-m-2.5 p-2.5 text-gray-400" onClick={() => setSidebarOpen(true)}>
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <h1 className="text-sm font-semibold leading-6 text-white">{currentRoom}</h1>
    </div>
  </header>
);

export default Header;
