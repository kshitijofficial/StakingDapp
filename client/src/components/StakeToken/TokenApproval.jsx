import { useContext, useRef, useState } from "react";
import { ethers } from "ethers";
import web3Context from "../../context/Web3Context";
import Button from "../Button/Button";
import { toast } from "react-hot-toast";

const TokenApproval = () => {
  const { stakingContract, stakeTokenContract, provider } =
    useContext(web3Context);
  const [transactionStatus, setTransactionStatus] = useState("");
  const approvedTokenRef = useRef();

  const saveSettings = async (message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(message);
      }, 2000);
    });
  };

  const approveToken = async (e) => {
    e.preventDefault();
    const amount = approvedTokenRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive number.");
      return;
    }

    const amountToSend = ethers.parseUnits(amount, 18).toString();

    try {
      const transaction = await stakeTokenContract.approve(
        stakingContract.target,
        amountToSend
      );

      setTransactionStatus("Transaction Is Pending...");
      toast.promise(saveSettings("Transaction Is Pending..."), {
        loading: "Transaction Is Pending...",

        success: <b>Transaction Successful</b>,
        error: (errorMessage) => {
          console.error(errorMessage);
          setTransactionStatus("Transaction failed. Please try again.");
        },
      });
      const transactionObj = await provider.getTransaction(transaction.hash);
      const receipt = await transactionObj.wait();

      if (receipt.status !== 1) {
        setTransactionStatus("Transaction failed. Please try again.");
      }
    } catch (error) {
      console.error("Token Approval Not Successful", error.message);
      setTransactionStatus("Token Approval Not Successful");
    }
  };

  return (
    <>
      <form onSubmit={approveToken} className="token-amount-form">
        <label className="token-input-label">Token Approval:</label>
        <input type="text" ref={approvedTokenRef} />
        <Button onClick={approveToken} type="submit" label="Token Approval" />
      </form>
    </>
  );
};

export default TokenApproval;
