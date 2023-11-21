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

  const stakeToken = async (e) => {
    e.preventDefault();
    const amount = stakeAmountRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      // console.error("Please enter a valid positive number.");
      toast.error("Please enter a valid positive number.");

      return;
    }

    try {
      if (!stakingContract) {
        // console.error("Staking contract is not initialized.");
        toast.error("Staking contract is not initialized.");

        return;
      }

      const amountToStake = ethers.parseUnits(amount, 18).toString();
      const transaction = await stakingContract.stake(amountToStake);

      if (!transaction) {
        toast.error("Transaction is null or undefined.");
        // console.error("Transaction is null or undefined.");
        return;
      }

      setTransactionStatus(toast.promise("Transaction is pending..."));

      // setTransactionStatus("Transaction is pending...");
      const transactionObj = await provider.getTransaction(transaction.hash);
      const receipt = await transactionObj.wait();

      if (receipt.status === 1) {
        // setTransactionStatus("Transaction is successful");
        setTransactionStatus(toast.success("Transaction is successful"));

        setIsReload(!isReload);
        setTimeout(() => {
          setTransactionStatus("");
        }, 5000);
        stakeAmountRef.current.value = "";
      } else {
        setTransactionStatus(
          toast.error("Transaction failed. Please try again.")
        );
        // setTransactionStatus("Transaction failed. Please try again.");
      }
    } catch (error) {
      toast.error("Staking Error:", error.message);

      // console.error("Staking Error:", error.message);
      setTransactionStatus(
        toast.error("An error occurred while staking. Please try again.")

        // "An error occurred while staking. Please try again."
      );
    }
  };

  return (
    <>
      <div className="staked-amount-no">
        {/* {transactionStatus} */}
        {/* //  && <div>{transactionStatus}
          //  </div>
         */}
        {/* {transactionStatus && <div>{transactionStatus}</div>} */}
      </div>

      <form onSubmit={stakeToken} className="stake-amount-form">
        <label className="stake-input-label">Enter Staked Amount:</label>
        <input type="text" ref={stakeAmountRef} />
        <Button onClick={stakeToken} type="submit" label="Stake Token" />
      </form>
    </>
  );
};

export default StakeAmount;

// import { useState, useContext, useRef } from "react";
// import { ethers } from "ethers";
// import web3Context from "../../context/Web3Context";
// import StakingContext from "../../context/StakingContext";
// import "./StakeToken.css";

// import Button from "../Button/Button";
// import { toast } from "react-hot-toast";

// const StakeAmount = ({ children }) => {
//   const { stakingContract, provider } = useContext(web3Context);
//   const { isReload, setIsReload } = useContext(StakingContext);

//   const [transactionStatus, setTransactionStatus] = useState("");
//   const stakeAmountRef = useRef();

//   const stakeToken = async (e) => {
//     e.preventDefault();
//     const amount = stakeAmountRef.current.value.trim();
//     if (isNaN(amount) || amount <= 0) {
//       console.error("Please enter a valid positive number.");
//       return;
//     }
//     const amountToStake = ethers.parseUnits(amount, 18).toString();
//     try {
//       const transaction = await stakingContract.stake(amountToStake);
//       setTransactionStatus("Transaction Is Pending...");
//       const transactionObj = await provider.getTransaction(transaction.hash);
//       const receipt = await transactionObj.wait();

//       if (receipt.status === 1) {
//         setTransactionStatus("Transaction Is Successful");
//         setIsReload(!isReload);
//         setTimeout(() => {
//           setTransactionStatus("");
//         }, 5000);
//         stakeAmountRef.current.value = "";
//       } else {
//         setTransactionStatus("Transaction failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Staking Error", error.message);
//     }
//   };
//   return (
//     <>
//       {transactionStatus && <div>{transactionStatus}</div>}
//       {/* {transactionStatus && toast.success("You did it!")} */}

//       <form onSubmit={stakeToken} className="stake-amount-form">
//         <label className="stake-input-label">Enter Staked Amount:</label>
//         <input type="text" ref={stakeAmountRef} />
//         <Button onClick={stakeToken} type="submit" label="Stake Token" />
//       </form>
//     </>
//   );
// };
// export default StakeAmount;
