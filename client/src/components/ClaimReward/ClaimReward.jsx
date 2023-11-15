import { useContext,useState } from "react";
import web3Context from "../../context/Web3Context"
import Button from "../Button/Button";
const ClaimReward = ()=>{
 const {stakingContract}=useContext(web3Context);
 const [transactionStatus,setTransactionStatus]=useState("");
 const claimReward = async()=>{
  try{
    const transaction = await stakingContract.getReward();
    const receipt = await transaction.wait()
    setTransactionStatus("Transaction Is Pending...")
    if(receipt.status === 1){
        setTransactionStatus("Transaction Is Successful")
        setTimeout(()=>{
          setTransactionStatus("")
        },5000) 
      } else{
        setTransactionStatus("Transaction failed. Please try again.");
      }
  }catch(error){
    console.error("Claim Reward Failed",error.message)
  }
 }
 return (
    <>
     {transactionStatus  && <div>{transactionStatus}</div>}
     <Button type="button" label="Claim Reward" onClick={claimReward}/>
    </>
 )
}

export default ClaimReward;