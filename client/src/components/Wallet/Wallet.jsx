import { useState } from "react";
import {connectWallet} from "../../utils/connectWallet.jsx"
import Web3Context from "../../context/Web3Context"
import Button from "../Button/Button";

const Wallet = ({children}) => {
  const [isLoading,setIsLoading]=useState(false);
  const [state,setState]=useState({
    provider:null,
    account:null,
    stakingContract:null,
    stakeTokenContract:null,
    chainId:null
  })
  window.ethereum.on('chainChanged',async()=>{
    let chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
    const chainId= parseInt(chainIdHex, 16);
    setState(prevState => ({ ...prevState, chainId }));
  });

  window.ethereum.on('accountsChanged', async()=>{
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const selectedAccount=accounts[0];
    setState(prevState => ({ ...prevState, selectedAccount }));
  })
  const handleWallet=async ()=>{
      try{
        setIsLoading(true);
        const {provider,selectedAccount,stakingContract,stakeTokenContract,chainId} = await connectWallet();
      
        setState({provider,selectedAccount,stakingContract,stakeTokenContract,chainId})
      }catch(error){
        console.error("Error connecting wallet:",error.message)
      } finally{ 
        setIsLoading(false)
      }
     }
  
  return (
    <div>
      <Web3Context.Provider value={state}>
        {children}
      </Web3Context.Provider>
      {isLoading && <p>Loading...</p>}
      <Button onClick={handleWallet} type="button" label="Connect Wallet" />

     </div>
  )
}
export default Wallet;