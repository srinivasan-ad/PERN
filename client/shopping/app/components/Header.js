import React from "react";
import { HiBell, HiSelector } from "react-icons/hi";
function Header() {
  return (
    <header className="border-b-2 ">
      <nav className="max-w-[1490px] mx-auto pt-2 flex flex-row justify-between items-center">
        <div className="flex ">
          <p className=" font-black text-2xl ">A</p>
          <span className=" inline-flex items-center">
            <span className="pl-10">
              <img
                src="/images/Download.jpg"
                className="h-7 rounded-full w-7"
              />
            </span>
            <span className="pl-4 pr-3">
              <p className=" text-[13px]  font-medium">
                Srinivasanad's projects
              </p>
            </span>
            <span className=" pt-[6px]  rounded-lg h-7 w-12">
              <p className=" text-[11px] bg-slate-200 font-light rounded-lg text-center">
                Hobby
              </p>
            </span>
            <span className="pl-2 ">
              <HiSelector />
            </span>
          </span>
        </div>
        <div className="flex items-center max-w-[600px] ">
          <span>
            <button className=" border border-gray-300 py-1 px-3 text-[13.6px] font-light rounded-md hover:font-normal hover:bg-gray-100">
              Feedback
            </button>
          </span>
          <span className="pl-4 text-[13.6px] font-light">
            <p>Changelog</p>
          </span>
          <span className="pl-4 text-[13.6px] font-light">
            <p>Help</p>
          </span>
          <span className="pl-4 text-[13.6px] font-light">
            <p>Docs</p>
          </span>
          <span className="pl-10 text-[13.6px] font-light">
            <button className="border rounded-full p-1 border-gray-300">
              <HiBell className="h-5 w-5" />
            </button>
          </span>
          <span className="pl-3">
            <img src="./images/Download.jpg" className="h-9 w-9 rounded-full" />
          </span>
        </div>
      </nav>
      <div className="max-w-[1490px] mx-auto ">
        <nav className="flex space-x-5 text-sm leading-5">
          <p className="border-b-2 border-black px-0.5 py-3.5 text-gray-400">
            Overview
          </p>
          <p className="border-b-2 border-transparent border-black px-0.5 py-3.5 text-gray-400  text-center  rounded-md transition-transform ease-in-out duration-150">
            Integrations
          </p>
          <p className="border-b-2 border-transparent border-black px-0.5 py-3.5  text-gray-400  transition-transform  ease-in-out text-center  rounded-md  duration-150">
            Activity
          </p>
          <p className="border-b-2 border-transparent border-black px-0.5 py-3.5 text-gray-400  transition ease-in-out text-center  rounded-md duration-150">
            Domains
          </p>
          <p className="border-b-2 border-transparent border-black px-0.5 py-3.5 text-gray-400  transition ease-in-out text-center  rounded-md duration-150">
            Usage
          </p>
          <p className="border-b-2 border-transparent border-black px-0.5 py-3.5 text-gray-400  transition ease-in-out text-center  rounded-md duration-150">
            Monitoring
          </p>
          <p className="border-b-2 border-transparent border-black px-0.5 py-3.5 text-gray-400  transition ease-in-out text-center  rounded-md duration-150">
            Storage
          </p>
          <p className="border-b-2 border-transparent border-black px-0.5 py-3.5 text-gray-400  transition ease-in-out text-center  rounded-md duration-150">
            AI
          </p>
          <p className="border-b-2 border-transparent border-black px-0.5 py-3.5 text-gray-400  transition ease-in-out text-center  rounded-md duration-150">
            Settings
          </p>
        </nav>
      </div>
    </header>
  );
}

export default Header;
