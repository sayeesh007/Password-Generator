import { useEffect, useState, useCallback ,useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charecterallowed, setCharecterallowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenarator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charecterallowed) str += "~!@#$%^&*()_+";

    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charecterallowed, setPassword]);

  useEffect(() => {
    passwordGenarator();
  }, [length, numberAllowed, charecterallowed, passwordGenarator]);

  const copyPassword=useCallback( ()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <main className="w-full h-screen flex flex-col justify-center items-center gap-3 bg-black text-white">
        <h1 className="text-5xl ">Password Generator</h1>
        <section className="w-2/5 h-1/4 bg-blue-900 rounded-2xl">
          <div className="w-full h-20 p-2 flex ">
            <input
              className="w-full rounded-full m-2 p-2 text-black"
              type="text"
              value={password}
              readOnly
              ref={passwordRef}
            />
            <button className="bg-orange-600 rounded-full px-5 my-2"
            onClick={()=>copyPassword()}
            >
              Copy
            </button>
          </div>
          <div className="w-full h-1/2 flex justify-center items-center gap-6">
            <div>
              <input
                className="m-2"
                type="range"
                min={6}
                max={50}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="">Length ({length})</label>
            </div>
            <div>
              <input
                className="m-2"
                type="checkbox"
                name="Number"
                value={numberAllowed}
                onChange={(e) => setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor="">Number</label>
            </div>
            <div>
              <input
                className="m-2"
                type="checkbox"
                name="Special Charecter"
                value={charecterallowed}
                onChange={(e) => {
                  setCharecterallowed((prev) => !prev);
                }}
              />
              <label htmlFor="">Secial Charecter</label>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
