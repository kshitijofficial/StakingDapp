import { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import web3Context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";
import "./DisplayPannel.css";
import { toast } from "react-hot-toast";

const StakedAmount = () => {
  const { stakingContract, selectedAccount } = useContext(web3Context);
  const { isReload } = useContext(StakingContext);

  const [stakedAmount, setStakedAmount] = useState("0");
  useEffect(() => {
    const fetchStakeRewardInfo = async () => {
      try {
        const amountStakedWei = await stakingContract.stakedBalance(
          selectedAccount
        );
        const amountStakedEth = ethers.formatUnits(
          amountStakedWei.toString(),
          18
        );
        setStakedAmount(amountStakedEth.toString());
      } catch (error) {
        toast.error("Error fetching data:", error.message);
      }
    };
    stakingContract && fetchStakeRewardInfo();
  }, [stakingContract, selectedAccount, isReload]);

  return (
    <div className="staked-amount">
      <p>Staked Amount: </p> <span>{stakedAmount}</span>
    </div>
  );
};
export default StakedAmount;
