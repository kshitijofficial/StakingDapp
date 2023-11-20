import { useContext } from "react";
import web3Context from "../../context/Web3Context";

const ConnectedNetwork = () => {
  const { chainId } = useContext(web3Context);
  if (chainId === 11155111) {
    return <p className="network">Sepolia</p>;
  } else {
    return <p className="network"> Network Not Detected</p>;
  }
};
export default ConnectedNetwork;
