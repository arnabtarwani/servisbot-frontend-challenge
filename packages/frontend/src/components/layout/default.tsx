import { ArrowLeft, CircleUserIcon, LucideBot } from "lucide-react";
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
    <div className="flex flex-col justify-start items-start font-semibold text-gray-900 space-x-1 w-screen h-screen overflow-hidden">
      <nav className="py-2 px-6 flex items-center text-center justify-between w-full border-b-[1px] border-gray-200 bg-gray-50 shadow-sm">
        <span
          onClick={() => navigate("/")}
          className="flex cursor-pointer hover:bg-gradient-to-r border-2 border-gray-900 px-1.5 py-0.5 hover:from-red-500 hover:to-orange-500 hover:bg-clip-text text-gray-900 text-lg hover:text-gray-800"
        >
          <LucideBot className="mr-1 mb-1" />
          SB
        </span>
        <span>
          <CircleUserIcon />
        </span>
      </nav>
      <main className="h-full w-full px-6 py-6">
        <div className="flex justify-between items-center">
          <div
            onClick={() => {
              if (location.pathname !== "/") navigate(-1);
            }}
            className="flex justify-center items-center space-x-2 cursor-pointer"
          >
            {location.pathname !== "/" && (
              <ArrowLeft className="cursor-pointer" />
            )}
            <h1 className="text-xl font-semibold">{heading}</h1>
          </div>
          {pageHeaderChildrenRight}
        </div>
        {children}
      </main>
    </div>
  );
};
