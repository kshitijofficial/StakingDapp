import { useState,useContext,useRef} from "react";
//import { transactionStatus } from "../../utils/transactionStatus";
import {ethers} from "ethers"
import web3Context from "../../context/Web3Context"
import StakingContext from "../../context/StakingContext"

import Button from "../Button/Button";
const StakeAmount = ({children})=>{
  const {stakingContract,provider}=useContext(web3Context);
  const {isReload,setIsReload}=useContext(StakingContext);
  
  const [transactionStatus,setTransactionStatus]=useState("");
  const stakeAmountRef = useRef();

  const stakeToken = async(e)=>{
    e.preventDefault()
     const amount = stakeAmountRef.current.value.trim();
     if(isNaN(amount) || amount<=0){
        console.error("Please enter a valid positive number.")
        return;
     }
     const amountToStake = ethers.parseUnits(amount,18).toString()
     try{
     const transaction = await stakingContract.stake(amountToStake);
     setTransactionStatus("Transaction Is Pending...")
      const transactionObj = await provider.getTransaction(transaction.hash);
      const receipt = await transactionObj.wait();

      if(receipt.status === 1){
        setTransactionStatus("Transaction Is Successful")
        setIsReload(!isReload)
        setTimeout(()=>{
          setTransactionStatus("")
        },5000) 
        stakeAmountRef.current.value="";
      } else{
        setTransactionStatus("Transaction failed. Please try again.");
      }
    }catch(error){
        console.error("Staking Error",error.message)
    }
  }
  return(
    <>
     {transactionStatus  && <div>{transactionStatus}</div>}
 
     <form onSubmit={stakeToken}>
       <label>Staked Amount:</label>
       <input type="text" ref={stakeAmountRef}/>
       <Button onClick={stakeToken} type="submit" label="Stake Token"/>
     </form>
    </>
  )
}
export default StakeAmount;