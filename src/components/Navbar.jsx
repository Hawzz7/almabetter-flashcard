import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen px-4 h-fit">
      <div className="flex items-center justify-center w-full h-fit sm:justify-start sm:w-[570px] md:w-[710px] lg:w-[870px]">
        <p className="text-[28px] font-medium">Create Flashcard</p>
      </div>
      <div className="flex items-center justify-center w-full h-fit sm:justify-start sm:w-[570px] md:w-[710px] lg:w-[870px] gap-2">
        <Link
        to="/createflashcard"
        className="text-sm duration-200 focus:underline hover:text-red-700 focus:text-red-700 decoration-red-700 focus:decoration-4 decoration-4 underline-offset-4 hover:scale-105">
          Create New
        </Link>
        <Link to='/flashcards' className="text-sm duration-200 hover:scale-105 focus:underline hover:text-red-700 focus:text-red-700 decoration-red-700 focus:decoration-4 decoration-4 underline-offset-4">
          My Flashcards
        </Link>
      </div>
      <hr className="w-full pb-2 border-t-2 border-black sm:w-[600px] md:w-[710px] lg:w-[870px]" />
    </div>
  );
};

export default Navbar;
