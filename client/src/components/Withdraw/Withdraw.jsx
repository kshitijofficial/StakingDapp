import { useContext, useRef, useState } from "react";
import { ethers } from "ethers";
import web3Context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";
import Button from "../Button/Button";
import "./Withdraw.css";
import { toast } from "react-hot-toast";

const Withdraw = () => {
  const { stakingContract, provider } = useContext(web3Context);
  const { isReload, setIsReload } = useContext(StakingContext);
  const [transactionStatus, setTransactionStatus] = useState("");
  const wihtdrawTokenRef = useRef();

  const withdrawToken = async (e) => {
    e.preventDefault();
    const amount = wihtdrawTokenRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      // console.error("Please enter a valid positive number.");
      toast.error("Please enter a valid positive number.");

      return;
    }
    const amountToWithdraw = ethers.parseUnits(amount, 18).toString();
    try {
      const transaction = await stakingContract.withdrawStakedTokens(
        amountToWithdraw
      );
      setTransactionStatus(toast.promise("Transaction Is Pending..."));
      // setTransactionStatus("Transaction Is Pending...");
      const transactionObj = await provider.getTransaction(transaction.hash);
      const receipt = await transactionObj.wait();
      if (receipt.status === 1) {
        setTransactionStatus(toast.success("Transaction Is Successful"));
        setIsReload(!isReload);
        setTimeout(() => {
          setTransactionStatus("");
        }, 5000);
        wihtdrawTokenRef.current.value = "";
      } else {
        // setTransactionStatus("Transaction failed. Please try again.");
        setTransactionStatus(
          toast.error("Transaction failed. Please try again.")
        );
      }
    } catch (error) {
      console.error("Token Approval Not Successful", error.message);
      // toast.error("Token Approval Not Successful", error.message);
    }
  };
  return (
    <>
      {/* {transactionStatus && <div>{transactionStatus}</div>} */}
      <form className="withdraw-form" onSubmit={withdrawToken}>
        <label>Withdraw Token:</label>
        <input type="text" ref={wihtdrawTokenRef} />
        <Button
          onClick={withdrawToken}
          type="submit"
          label="Withdraw Staked Token"
        />
      </form>
    </>
  );
};
export default Withdraw;

//check wallet connected or not when a button is clicked
//transaction rolling until transaction is not successful
//how to change the stake amount once a user stake
//code repetitions avoid for transactions
//try and catch removal using custom hooks
//how to manage state of connected account and chain id if in future it changes
