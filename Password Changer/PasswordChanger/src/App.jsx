import { useCallback, useEffect, useRef, useState } from "react"


function App() {

  const [length, setLength] = useState(6)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("");

  const passRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "0123456789"
    }
    if (character) {
      str += "!@#$%^&*()_={}[]~"
    }

    for (let i = 1; i < length; i++) {
        
      const char = Math.floor(Math.random() * str.length + 1 )
      console.log("char" , char);
      pass += str.charAt(char);
    }
    console.log("pass", pass);
    setPassword(pass)
    

  }, [length, number, character])

  const copyPassword = useCallback(() => {

    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    
    passwordGenerator()
    // console.log("pass" , setPassword());
  }, [length, number, character, passwordGenerator])
  
  

  return (
    <>
      <div className="w-full max-w-130 mx-auto my-15 shadow-md px-4 py-3 text-orange-500 rounded-lg bg-gray-700">
        <h1 className="text-white text-2xl text-center my-3 mb-4">
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            className="outline-none bg-white w-full py-1 px-3"
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            ref={passRef}
          />
          <button
            onClick={copyPassword}
            className="shrink-0 px-3 py-1 outline-none cursor-pointer hover:bg-blue-700 bg-blue-600 text-white ml-1.5"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-wrap text-sm gap-x-2">
          <div className="flex gap-x-1 items-center">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="w-20 pb-0.5">Length : {length}</label>
          </div>

          <div className="flex gap-x-1 items-center">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => setNumber((prev) => !prev)}
            />
            <label className=" pb-0.5">Number</label>
          </div>

          <div className="flex gap-x-1 items-center">
            <input
              type="checkbox"
              defaultChecked={character}
              id="numberInput"
              onChange={() => setCharacter((prev) => !prev)}
            />
            <label className=" pb-0.5">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
