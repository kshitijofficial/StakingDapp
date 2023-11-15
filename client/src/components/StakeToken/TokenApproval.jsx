import { useContext,useRef, useState} from "react";
import { ethers } from "ethers";
import web3Context from "../../context/Web3Context"
import Button from "../Button/Button";

const TokenApproval = ()=>{
  const {stakingContract,stakeTokenContract,provider}=useContext(web3Context);
  const [transactionStatus,setTransactionStatus]=useState("");
  const approvedTokenRef = useRef();

  const aproveToken = async(e)=>{
    e.preventDefault()
     const amount = approvedTokenRef.current.value.trim();
     if(isNaN(amount) || amount<=0){
        console.error("Please enter a valid positive number.")
        return;
     }
        const amountToSend = ethers.parseUnits(amount,18).toString()
     try{
      const transaction = await stakeTokenContract.approve(stakingContract.target,amountToSend);
      setTransactionStatus("Transaction Is Pending...")
      const transactionObj = await provider.getTransaction(transaction.hash);
      const receipt = await transactionObj.wait();
      if(receipt.status === 1){
        setTransactionStatus("Transaction Is Successful")
        setTimeout(()=>{
          setTransactionStatus("")
        },5000) 
        approvedTokenRef.current.value="";
      } else{
        setTransactionStatus("Transaction failed. Please try again.");
      }

    }catch(error){
        console.error("Token Approval Not Successful",error.message)
    }
  }
  return(
    <>
     {transactionStatus  && <div>{transactionStatus}</div>}
     <form onSubmit={aproveToken}>
       <label>Token Approval:</label>
       <input type="text" ref={approvedTokenRef}/>
       <Button onClick={aproveToken} type="submit" label="Token Approval"/>
     </form>
    </>
  )
}
export default TokenApproval;

//transaction rolling until transaction is not successful - Rahul
//use useCallback for window.ethereum
//changing reward or staked amount re render whole component. Even though no use sometime