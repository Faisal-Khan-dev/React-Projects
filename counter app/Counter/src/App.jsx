import { useState } from "react"



function App() {

  const [counter, setCounter]=useState(0)
  const addValue = () => {

    if (counter < 20) {
      setCounter(counter + 1)
      console.log("counter", counter + 1);
    }
  }
  
  const removeValue = () => {
    if (counter > 0) {
      setCounter(counter - 1)
      
      console.log("counter", counter - 1);
    }
  }
  
  
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
      <h1 className="text-white text-7xl">
        Counter : {String(counter).padStart(2, "0")}
      </h1>
      <div className="space-x-4 mt-8">
        <button
          className="px-4 py-2 bg-green-500 text-white font-bold hover:bg-green-700 rounded hover:cursor-pointer"
          onClick={addValue}
        >
          Add Value
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white font-bold hover:bg-red-700 rounded hover:cursor-pointer"
          onClick={removeValue}
        >
          Remove Value
        </button>
      </div>
    </div>
  );
}

export default App
