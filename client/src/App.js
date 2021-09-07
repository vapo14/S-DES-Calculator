import "./App.css";
import { SDES } from "./scripts/S-DES";
import { generateKeys } from "./scripts/KeyGeneration";
import { useState } from "react";
import { validatePlaintext, validateKey } from "./scripts/ValidateInput";

function App() {
  const [Ciphertext, setCiphertext] = useState("");
  const [KeyGeneration, setKeyGeneration] = useState("");

  const runSDES = (e) => {
    e.preventDefault();
    let plaintext = e.target[0].value;
    let key = e.target[1].value;
    if (validatePlaintext(plaintext) && validateKey(key)) {
      setCiphertext(SDES(plaintext, generateKeys(key)));
      setKeyGeneration(generateKeys(key).html);
    } else {
      console.log("invalid text");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>S-DES Encryption Calculator</h1>
      <div className="input-form">
        <form onSubmit={runSDES}>
          <label>8-bit Plaintext</label>
          <input
            type="text"
            maxLength={8}
            placeholder="8-bit Binary Plaintext"
          ></input>

          <div style={{ marginTop: "40px" }}>
            <label>10-bit Key</label>
            <input
              type="text"
              maxLength={10}
              placeholder="10-bit Binary Key"
            ></input>
          </div>
          <button type="submit">Run</button>
        </form>
      </div>
      <div
        style={{ textAlign: "center" }}
        dangerouslySetInnerHTML={{ __html: KeyGeneration }}
      ></div>
      <div>
        <h3 style={{ textAlign: "center" }}>Ciphertext: {Ciphertext}</h3>
      </div>
    </div>
  );
}

export default App;
