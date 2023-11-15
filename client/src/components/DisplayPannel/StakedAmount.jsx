import { useState,useContext,useEffect } from "react";
import {ethers} from "ethers"
import web3Context from "../../context/Web3Context"
import StakingContext from "../../context/StakingContext"
const StakedAmount =()=>{
  const {stakingContract,selectedAccount}=useContext(web3Context);
  const {isReload}=useContext(StakingContext);
  
  const [stakedAmount,setStakedAmount]=useState("0")
  useEffect(()=>{
    const fetchStakeRewardInfo =async()=>{
        try{
          //fetching staked amount of a user
           const amountStakedWei = await stakingContract.stakedBalance(selectedAccount);
           const amountStakedEth= ethers.formatUnits(amountStakedWei.toString(),18)
           setStakedAmount(amountStakedEth.toString())
        }catch(error){
            console.error("Error fetching data:",error.message)
        }
    }
    stakingContract && fetchStakeRewardInfo();
  },[stakingContract,selectedAccount,isReload])

  return(
    <div>
       <p>Staked Amount: {stakedAmount}</p> 
    </div>
  )
}
export default StakedAmount;