import { useContext, useState } from "react";
import web3Context from "../../context/Web3Context";
import Button from "../Button/Button";
import { toast } from "react-hot-toast";
import "./ClaimReward.css";

const ClaimReward = () => {
  const { stakingContract } = useContext(web3Context);
  const [transactionStatus, setTransactionStatus] = useState("");

  const claimReward = async () => {
    try {
      setTransactionStatus("Transaction Is Pending...");

      await stakingContract.getReward();

      setTransactionStatus("");

      toast.success("Transaction Is Successful");
    } catch (error) {
      console.error("Claim Reward Failed", error.message);

      toast.error("Claim Reward Failed. Please check the console for details.");
    }
  };

  return (
    <div className="claim-reward">
      <Button type="button" label="Claim Reward" onClick={claimReward} />
    </div>
  );
};

export default ClaimReward;
