import { useState,useContext,useEffect } from "react";
import {ethers} from "ethers"
import web3Context from "../../context/Web3Context"
import StakingContext from "../../context/StakingContext"
const RewardRate =()=>{
  const {stakingContract,selectedAccount}=useContext(web3Context);
  const {isReload}=useContext(StakingContext);

  const [rewardRate,setRewardRate]=useState("0")
  useEffect(()=>{
    const fetchStakeRewardInfo =async()=>{
        try{
           //fetching reward rate
           const rewardRateWei = await stakingContract.REWARD_TOKEN();
           const rewardRateEth = ethers.formatUnits(rewardRateWei.toString(),18)
           setRewardRate(rewardRateEth.toString())
        }catch(error){
            console.error("Error fetching data:",error.message)
        }
    }
    stakingContract && fetchStakeRewardInfo();
  },[stakingContract,selectedAccount,isReload])

  return(
    <div>
       <p>Reward Rate: {rewardRate} token/sec</p> 
    </div>
  )
}
export default RewardRate ;