import { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import web3Context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";
import { toast } from "react-hot-toast";

const RewardRate = () => {
  const { stakingContract, selectedAccount } = useContext(web3Context);
  const { isReload } = useContext(StakingContext);

  const [rewardRate, setRewardRate] = useState("0");
  useEffect(() => {
    const fetchStakeRewardInfo = async () => {
      try {
        const rewardRateWei = await stakingContract.REWARD_TOKEN();
        const rewardRateEth = ethers.formatUnits(rewardRateWei.toString(), 18);
        setRewardRate(rewardRateEth.toString());
      } catch (error) {
        toast.error("Error fetching data:", error.message);
      }
    };
    stakingContract && fetchStakeRewardInfo();
  }, [stakingContract, selectedAccount, isReload]);

  return (
    <div className="reward-rate">
      <p>Reward Rate:</p>
      <span>{rewardRate} token/sec </span>
    </div>
  );
};
export default RewardRate;
