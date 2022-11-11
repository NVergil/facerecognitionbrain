import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";

const Logo = () => {
  return (
    <Tilt
      className="ma4 mt0 br3 shadow-2 flex justify-center items-center"
      style={{
        height: "210px",
        width: "210px",
      }}
    >
      <div className="">
        <img className="w-80" src={brain} alt="brainlogo"></img>
      </div>
    </Tilt>
  );
};

export default Logo;
