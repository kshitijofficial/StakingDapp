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
      toast.error("Please enter a valid positive number.");

      return;
    }
    const amountToWithdraw = ethers.parseUnits(amount, 18).toString();
    try {
      const transaction = await stakingContract.withdrawStakedTokens(
        amountToWithdraw
      );
      setTransactionStatus(toast.promise("Transaction Is Pending..."));
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
        setTransactionStatus(
          toast.error("Transaction failed. Please try again.")
        );
      }
    } catch (error) {
      console.error("Token Approval Not Successful", error.message);
    }
  };
  return (
    <>
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
