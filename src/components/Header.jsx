import React from "react";
import almaLogo from "../assets/alma-logo.png";

const Header = () => {
  return (
    <div className="sticky top-0 left-0 right-0 flex items-center justify-center w-full px-5 py-3 bg-yellow-400 shadow-xl  h-fit sm:justify-start">
      <img
        src={almaLogo}
        alt={almaLogo}
        className="w-[145px] h-[38px] shadow-black"
      />
    </div>
  );
};

export default Header;
