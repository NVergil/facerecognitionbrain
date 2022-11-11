import React from "react";

const ImageLinkForm = ({ onInputChange, onButtonSubmit, onEnterKeydown }) => {
  return (
    <div>
      <p className="f3">
        {"This Magic Brain will detect faces in your pictures, Give it a try"}
      </p>
      <div className="flex justify-center">
        <div className="pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
            onKeyDown={onEnterKeydown}
          />
          <button
            className="w-30 dim f4 link ph3 pv2 dib white bg-light-purple ba b--black-05 pointer"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
