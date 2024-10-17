import { CircleUserIcon, LucideBot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";

interface IDefaultLayoutProps {
  children?: React.ReactNode;
  heading?: string;
  pageHeaderChildrenRight?: React.ReactNode;
}

export const DefaultLayout = ({
  children,
  heading,
  pageHeaderChildrenRight,
}: IDefaultLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-start items-start font-semibold text-gray-50 space-x-1 w-screen h-screen">
      <nav className="py-2 px-6 flex items-center text-center justify-between w-full border-b-[1px] border-gray-500 bg-gray-800">
        <span
          onClick={() => navigate("/")}
          className="flex cursor-pointer hover:bg-gradient-to-r border hover:border-gray-200 px-1.5 py-0.5 hover:from-red-500 hover:to-orange-500 hover:bg-clip-text  text-white text-lg hover:text-gray-500"
        >
          <LucideBot className="mr-1 mb-1" />
          SB
        </span>
        <span>
          <CircleUserIcon />
        </span>
      </nav>
      <main className="h-full w-full p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">{heading}</h1>
          {pageHeaderChildrenRight}
        </div>
        {children}
      </main>
    </div>
  );
};
