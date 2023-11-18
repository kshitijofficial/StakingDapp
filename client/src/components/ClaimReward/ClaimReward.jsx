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
      const transaction = await stakingContract.getReward();
      const receipt = await transaction.wait();
      setTransactionStatus(toast.error("Transaction Is Pending..."));
      if (receipt.status === 1) {
        setTransactionStatus(toast.success("Transaction Is Successful"));

        setTimeout(() => {
          setTransactionStatus("");
        }, 5000);
      } else {
        // setTransactionStatus("Transaction failed. Please try again.");
        setTransactionStatus(
          toast.error("Transaction failed. Please try again.")
        );
      }
    } catch (error) {
      toast.error("Claim Reward Failed", error.message);
    }
  };
  return (
    <>
      {transactionStatus && <div>{transactionStatus}</div>}
      <Button type="button" label="Claim Reward" onClick={claimReward} />
    </>
  );
};

export default ClaimReward;
