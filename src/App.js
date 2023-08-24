import { useState, useEffect } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [greeting, doGreeting] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [relode, setRelode] = useState(false);
  

  useEffect(() => {
    const loadProvider = async () => {
      let contractAddress = "your contract address";
      const url = "http://localhost:8545";
      const provider = new ethers.providers.JsonRpcProvider(url);
      const contract = new ethers.Contract(
        contractAddress,
        Greeter.abi,
        provider
      );
      setContract(contract);
      setProvider(provider);
      // console.log(contract);
    };
    loadProvider();
  }, []);
  useEffect(() => {
    const getGreetings = async () => {
      const greeting = await contract.greet();
      doGreeting(greeting);
    };
    contract && getGreetings();
  }, [contract,relode]);

  const changeGreetings = async () => {
    const input = document.querySelector("#value");
    const signer = contract.connect(provider.getSigner());
    signer.setGreeting(input.value);
     setRelode(!relode)
    // setTimeout(function () {
    //   window.location.reload(1);
    // });
    // setTimeout();
  };
  return (
    <div className="center">
      <h3>{greeting}</h3>
      <input className="input" type="text" id="value"></input>
      <button className="button" onClick={changeGreetings}>
        Change
      </button>
    </div>
  );
}

export default App;