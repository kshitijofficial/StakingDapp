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

  const aproveToken = async (e) => {
    e.preventDefault();
    const amount = approvedTokenRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      // console.error("Please enter a valid positive number.");
      toast.error("Please enter a valid positive number.");

      return;
    }
    const amountToSend = ethers.parseUnits(amount, 18).toString();
    try {
      const transaction = await stakeTokenContract.approve(
        stakingContract.target,
        amountToSend
      );
      setTransactionStatus(toast.error("Transaction Is Pending..."));
      // setTransactionStatus("Transaction Is Pending...");
      const transactionObj = await provider.getTransaction(transaction.hash);
      const receipt = await transactionObj.wait();
      if (receipt.status === 1) {
        setTransactionStatus(toast.success("Transaction Is Successful"));
        // setTransactionStatus("Transaction Is Successful");
        setTimeout(() => {
          setTransactionStatus("");
        }, 5000);
        approvedTokenRef.current.value = "";
      } else {
        setTransactionStatus(
          toast.error("Transaction failed. Please try again.")
        );

        // setTransactionStatus("Transaction failed. Please try again.");
      }
    } catch (error) {
      // console.error("Token Approval Not Successful", error.message);
      toast.error("Token Approval Not Successful", error.message);
    }
  };
  return (
    <>
      {transactionStatus && <div>{transactionStatus}</div>}
      <form onSubmit={aproveToken} className="token-amount-form">
        <label className="token-input-label">Token Approval:</label>
        <input type="text" ref={approvedTokenRef} />
        <Button onClick={aproveToken} type="submit" label="Token Approval" />
      </form>
    </>
  );
};
export default TokenApproval;

//transaction rolling until transaction is not successful - Rahul
//use useCallback for window.ethereum
//changing reward or staked amount re render whole component. Even though no use sometime
