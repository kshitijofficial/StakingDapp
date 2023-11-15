import { useContext } from "react";
import web3Context from "../../context/Web3Context";

const ConnectedNetwork = ()=>{
  const {chainId}=useContext(web3Context)
  if(chainId===11155111){
     return <p>Connected Network: Sepolia</p>
  }else{
    return <p>Connected Network: Not Detected</p>
  }
}
export default ConnectedNetwork;