import {ethers,Contract} from "ethers"
import stakingAbi from "../ABI/stakingAbi.json"
import stakeTokenAbi from "../ABI/stakeTokenAbi.json"

export const connectWallet = async () => {
   
    try {
       let [signer,provider,stakingContract,stakeTokenContract,chainId]=[null,null,null,null,null]
       if (window.ethereum == null) {
        throw new Error('Metamask is not installed');
        }
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        let chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
        chainId= parseInt(chainIdHex, 16);
   
        let selectedAccount = accounts[0];
        if(!selectedAccount){
        throw new Error("No Ethereum accounts available")
        }
        
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
      
        const stakingContractAddress="0x1578b355aeB33401C8Cdc7438D5729CAc3ebD07A"
        const stakeTokenContractAddress = "0xff7A0222AA93a90FE079915EcA1f5Ec53c9AeFc5"
        stakingContract = new Contract(stakingContractAddress,stakingAbi,signer);
        stakeTokenContract = new Contract(stakeTokenContractAddress,stakeTokenAbi,signer)
        // const amountStaked = await stakeTokenContract.decimals();
        // console.log(amountStaked)
        return {provider,selectedAccount,stakingContract,stakeTokenContract,chainId};
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
