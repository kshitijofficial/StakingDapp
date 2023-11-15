import { useContext } from "react";
import web3Context from "../../context/Web3Context";
const ConnectedAccount = ()=>{
  const {selectedAccount}=useContext(web3Context)
  return(
    <div>
        <p>Connected Account:{selectedAccount}</p>
    </div>
  )
}
export default ConnectedAccount;