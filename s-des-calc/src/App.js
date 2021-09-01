import "./App.css";
import { SDES } from "./scripts/S-DES";
import { generateKeys } from "./scripts/KeyGeneration";
import { useState, useEffect } from "react";

function App() {
  const [Ciphertext, setCiphertext] = useState("");

  const runSDES = (e) => {
    e.preventDefault();
    let plaintext = e.target[0].value;
    let key = e.target[1].value;
    setCiphertext(SDES(plaintext, generateKeys(key)));
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>S-DES Encryption Calculator</h1>

      <div className="input-form">
        <form onSubmit={runSDES}>
          <label>Plaintext</label>
          <input type="text" placeholder="8-bit Binary Plaintext"></input>
          <label>Key</label>
          <input type="text" placeholder="10-bit Binary Key"></input>
          <button type="submit">Run</button>
        </form>
      </div>
      <div>
        <h3 style={{ textAlign: "center" }}>Ciphertext: {Ciphertext}</h3>
      </div>
    </div>
  );
}

export default App;
