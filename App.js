import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleProcess = () => {
    const lines = inputText.split("\n");
    const addressMap = new Map();
    let isValid = true;

    for (const line of lines) {
      const [address, amount] = line.split(/[\s,=]/).map((str) => str.trim());

      if (!address || isNaN(amount) || amount <= 0) {
        isValid = false;
        break;
      }

      if (addressMap.has(address)) {
        addressMap.set(address, addressMap.get(address) + Number(amount));
      } else {
        addressMap.set(address, Number(amount));
      }
    }

    if (isValid) {
      const resultText = Array.from(addressMap.entries())
        .map(([address, totalAmount]) => {
          return `${address}=${totalAmount}`;
        })
        .join("\n");
      setResult(`Success:\n${resultText}`);
    } else {
      setResult("Invalid input data");
    }
  };

  return (
    <div>
      <textarea
        className="adress"
        rows="10"
        cols="50"
        placeholder="Enter address and amount (one per line)"
        value={inputText}
        onChange={handleInputChange}
      />
      <button className="btn" onClick={handleProcess}>
        SUBMIT
      </button>
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  );
}

export default App;
