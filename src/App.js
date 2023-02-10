import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo, ai } from "./assets";
import { Home, CreatePost } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <div className="flex gap-x-2">
            <img src={ai} alt="logo" className="w-14 object-contain" />

            <div className="flex items-center">
              <div className="text-wrap w-24 font-Azonix font-bold text-xl">
                A-Image
              </div>
            </div>
          </div>
        </Link>

        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md hover:bg-indigo-500/90"
        >
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create-post" element={<CreatePost />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;