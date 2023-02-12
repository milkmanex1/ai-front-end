import React from "react";
import { download } from "../assets"; //this is a download.png picture
import { downloadImage } from "../utils"; //this is a function to download a picture

const Card = ({ _id, name, prompt, photo, handleOpen }) => {
  return (
    <div
      onClick={handleOpen}
      className="rounded-xl group relative shadow-card hover:shadow-cardhover card cursor-pointer"
    >
      <img
        src={photo}
        alt={prompt}
        className="w-full h-auto object-cover rounded-xl"
      />
      <div className="hidden group-hover:flex flex-col  absolute bottom-0 left-0 right-0 bg-black/40 m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
        <div className="mt-4 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              downloadImage(_id, photo);
            }}
            className="outline-none bg-transparent border-none"
          >
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
