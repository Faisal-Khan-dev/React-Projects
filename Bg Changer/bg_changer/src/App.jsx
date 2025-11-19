import './App.css'
import { useState } from "react";

function App() {

  const [color, setColor] = useState("olive");

  return (
    <>
      <nav
        className="w-full h-screen duration-200 flex flex-wrap flex-col justify-end"
        style={{ backgroundColor: color }}
      >
        <div className="w-full text-center my-8">
          <h1 className="text-6xl text-white font-bold">Background Changer</h1>
        </div>
        <div className="mx-15 py-4 mb- mb-8 rounded-lg bg-amber-400 flex flex-wrap gap-7 justify-center">
          <button
            onClick={() => {
              setColor("red");
            }}
            className="bg-red-500  text-white rounded-lg px-8 py-2 font-bold cursor-pointer hover:bg-red-600"
          >
            Red
          </button>
          <button
            onClick={() => {
              setColor("blue");
            }}
            className="bg-blue-500 text-white rounded-lg px-8 py-2 font-bold cursor-pointer hover:bg-blue-600"
          >
            Blue
          </button>
          <button
            onClick={() => {
              setColor("green");
            }}
            className="bg-green-500 text-white rounded-lg px-8 py-2 font-bold cursor-pointer hover:bg-green-600"
          >
            Green
          </button>
          <button
            onClick={() => {
              setColor("black");
            }}
            className="bg-black text-white rounded-lg px-8 py-2 font-bold cursor-pointer hover:bg-black"
          >
            black
          </button>
          <button
            onClick={() => {
              setColor("purple");
            }}
            className="bg-purple-500 text-white rounded-lg px-8 py-2 font-bold cursor-pointer hover:bg-purple-600"
          >
            purple
          </button>
          <button
            onClick={() => {
              setColor("gray");
            }}
            className="bg-gray-500 text-white rounded-lg px-8 py-2 font-bold cursor-pointer hover:bg-gray-600"
          >
            gray
          </button>
          <button
            onClick={() => {
              setColor("orange");
            }}
            className="bg-orange-500 text-white rounded-lg px-8 py-2 font-bold cursor-pointer hover:bg-orange-600"
          >
            gray
          </button>
          <button
            onClick={() => {
              setColor("fuchsia");
            }}
            className="bg-fuchsia-500 text-white rounded-lg px-8 py-2 font-bold cursor-pointer hover:bg-fuchsia-600"
          >
            fuchsia
          </button>
        </div>
      </nav>
    </>
  );
}

export default App
