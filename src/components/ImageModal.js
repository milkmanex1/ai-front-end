import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { XIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card.js";
import { download } from "../assets"; //this is a download.png picture
import { downloadImage } from "../utils"; //this is a function to download a picture

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100vh",
  bgcolor: "black",
  border: "0px solid #000",
  boxShadow: 24,
  p: 0,
  borderRadius: "0px",
};

const variants = {
  hover: {
    scale: 1.05,
    //   y: -3,
    // textShadow: "0px 0px 8px rgb(255,255,255)",
    // boxShadow: "0px 0px 8px rgb(255,255,255)",
    // transition: {
    //   yoyo: Infinity,
    // },
  },
  //   tap: { rotate: [0, -30, 0], transition: { duration: 0.5 } },
  // tap: { scale: 0.9 },
};
export default function BasicModal({ _id, name, prompt, photo }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    console.log("opening modal");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div className="card">
      {/* This div contains the original image to be clicked */}

      <Card {...{ _id, name, prompt, photo, handleOpen }}></Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="w-full h-full flex justify-center align-center overflow-hidden">
            <img className="object-cover" src={photo} alt="prompt" />
            {/*----- close image modal button ------*/}
            <div onClick={handleClose} className="absolute top-8  z-10 ">
              <XIcon className="text-white/40 hover:text-white cursor-pointer hover:border-2 hover:border-white rounded-full p-2 h-16 w-16 "></XIcon>
            </div>
            <div className="w-50 flex flex-col  absolute bottom-0 left-0 right-0 bg-black/40 m-2 p-4 rounded-md">
              <p className="text-white text-sm overflow-y-auto prompt">
                {prompt}
              </p>
              <div className="mt-4 flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
                    {name[0]}
                  </div>
                  <p className="text-white text-sm">{name}</p>
                  <button
                    type="button"
                    onClick={() => {
                      downloadImage(_id, photo);
                    }}
                    className="ml-24 outline-none bg-transparent border-none"
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
          </div>
        </Box>
      </Modal>
    </div>
  );
}
