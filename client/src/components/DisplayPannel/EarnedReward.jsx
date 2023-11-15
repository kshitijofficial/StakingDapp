import { useState,useContext,useEffect } from "react";
import {ethers} from "ethers"
import web3Context from "../../context/Web3Context"
import StakingContext from "../../context/StakingContext"
const EarnedReward =()=>{
  const {stakingContract,selectedAccount}=useContext(web3Context);
  const {isReload}=useContext(StakingContext);
  const [rewardVal,setRewardVal]=useState(0);

  useEffect(()=>{
    const fetchStakeRewardInfo =async()=>{
        try{
          //fetching earned amount of a user
           const rewardValueWei = await stakingContract.earned(selectedAccount);
           const rewardValueEth = ethers.formatUnits(rewardValueWei,18).toString();
           setRewardVal(rewardValueEth)
        }catch(error){
            console.error("Error fetching data:",error.message)
        }
    }
    stakingContract && fetchStakeRewardInfo();
  },[stakingContract,selectedAccount,isReload])

  return(
    <div> 
       <p>Earned Reward: {rewardVal}</p> 
    </div>
  )
}
export default EarnedReward;