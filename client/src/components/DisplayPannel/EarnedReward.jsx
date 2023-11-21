import { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import web3Context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";
import { toast } from "react-hot-toast";

const EarnedReward = () => {
  const { stakingContract, selectedAccount } = useContext(web3Context);
  const { isReload } = useContext(StakingContext);
  const [rewardVal, setRewardVal] = useState(0);

  useEffect(() => {
    const fetchStakeRewardInfo = async () => {
      try {
        const rewardValueWei = await stakingContract.earned(selectedAccount);
        const rewardValueEth = ethers
          .formatUnits(rewardValueWei, 18)
          .toString();
        setRewardVal(rewardValueEth);
      } catch (error) {
        toast.error("Error fetching data:", error.message);
      }
    };
    stakingContract && fetchStakeRewardInfo();
  }, [stakingContract, selectedAccount, isReload]);

  return (
    <div className="earned-reward">
      <p>Earned Reward:</p>
      <span>{rewardVal}</span>
    </div>
  );
};
export default EarnedReward;
