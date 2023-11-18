import { useContext } from "react";
import web3Context from "../../context/Web3Context";
const ConnectedAccount = () => {
  const { selectedAccount } = useContext(web3Context);
  return (
    <div>
      <p className="connected-ac">
        {selectedAccount ? selectedAccount : "Connect Account"}
      </p>
    </div>
  );
};
export default ConnectedAccount;
