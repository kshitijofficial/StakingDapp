import React, { useState, useContext, useRef } from "react";
import { ethers } from "ethers";
import web3Context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";
import "./StakeToken.css";

import Button from "../Button/Button";
import { toast } from "react-hot-toast";

const StakeAmount = ({ children }) => {
  const { stakingContract, provider } = useContext(web3Context);
  const { isReload, setIsReload } = useContext(StakingContext);

  const [transactionStatus, setTransactionStatus] = useState("");
  const stakeAmountRef = useRef();

  const saveSettings = async (message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(message);
      }, 2000);
    });
  };

  const stakeToken = async (e) => {
    e.preventDefault();
    const amount = stakeAmountRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive number.");
      return;
    }

    try {
      if (!stakingContract) {
        toast.error("Staking contract is not initialized.");
        return;
      }

      const amountToStake = ethers.parseUnits(amount, 18).toString();
      const transaction = await stakingContract.stake(amountToStake);

      if (!transaction) {
        toast.error("Transaction is null or undefined.");
        return;
      }

      toast.promise(saveSettings("Transaction is pending..."), {
        loading: "Transaction is pending...",
        success: <b>Transaction Successful</b>,
        error: (errorMessage) => {
          console.error(errorMessage);
          toast.error("Transaction failed. Please try again.");
        },
      });

      const transactionObj = await provider.getTransaction(transaction.hash);
      const receipt = await transactionObj.wait();

      if (receipt.status === 1) {
        setIsReload(!isReload);
        setTimeout(() => {
          setTransactionStatus("");
        }, 5000);
        stakeAmountRef.current.value = "";
      } else {
        setTransactionStatus(
          toast.error("Transaction failed. Please try again.")
        );
      }
    } catch (error) {
      toast.error("Staking Error: " + error.message);
      setTransactionStatus(
        toast.error("An error occurred while staking. Please try again.")
      );
    }
  };

  return (
    <>
      <form onSubmit={stakeToken} className="stake-amount-form">
        <label className="stake-input-label">Enter Staked Amount:</label>
        <input type="text" ref={stakeAmountRef} />
        <Button onClick={stakeToken} type="submit" label="Stake Token" />
      </form>
    </>
  );
};

export default StakeAmount;
