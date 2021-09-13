import "./App.css";
import { SDES } from "./scripts/S-DES";
import { generateKeys } from "./scripts/KeyGeneration";
import { useState } from "react";
import { validatePlaintext, validateKey } from "./scripts/ValidateInput";

function App() {
  const [Ciphertext, setCiphertext] = useState("");
  const [KeyGeneration, setKeyGeneration] = useState("");
  const [Mode, setMode] = useState("ENCRYPT");

  const runSDES = (e) => {
    e.preventDefault();
    let plaintext = e.target[0].value;
    let key = e.target[1].value;
    if (validatePlaintext(plaintext) && validateKey(key)) {
      setCiphertext(SDES(plaintext, generateKeys(key), Mode));
      setKeyGeneration(generateKeys(key).html);
    } else {
      console.log("invalid text");
    }
  };

  const handleMode = (e) => {
    console.log(Mode);
    setMode(Mode === "ENCRYPT" ? "DECRYPT" : "ENCRYPT");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }} className="navBar">
        S-DES Encryption Calculator
      </h1>
      <div
        className="input-form"
        style={{ position: "fixed", left: "10%", top: "150px" }}
      >
        <h2>Inputs: </h2>
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
          <div style={{ marginTop: "40px", display: "flex" }}>
            <input type="checkbox" onChange={handleMode}></input>
            <label style={{ paddingTop: "8px" }}>Decrypt</label>
          </div>
          <button type="submit">Run</button>
        </form>
        <h2>Ciphertext: {Ciphertext.ciphertext}</h2>
        <p>
          More about{" "}
          <a href="http://mercury.webster.edu/aleshunas/COSC%205130/G-SDES.pdf">
            S-DES Encryption Algorithm{" "}
          </a>{" "}
        </p>
      </div>
      <h2 style={{ textAlign: "center" }}>Results:</h2>
      <div style={{ display: "flex", marginLeft: "30%" }}>
        <div
          style={{ textAlign: "center", margin: "50px" }}
          dangerouslySetInnerHTML={{ __html: KeyGeneration }}
          className="fade-in"
        ></div>
        <div
          className="fade-in"
          style={{ textAlign: "center", margin: "50px" }}
          dangerouslySetInnerHTML={{ __html: Ciphertext.html }}
        ></div>
      </div>
    </div>
  );
}

export default App;
