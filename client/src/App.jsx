import './App.css'
import Wallet from './components/Wallet/Wallet'
import StakedRewardInfo from "./components/DisplayPannel/StakedRewardRateInfo"
import StakeAmount from './components/StakeToken/StakeAmount'
import TokenApproval from './components/StakeToken/TokenApproval'
import ClaimReward from './components/ClaimReward/ClaimReward'
import Navigation from './components/Navigation/Navigation'
import Withdraw from './components/Withdraw/Withdraw'
import {StakingProvider} from "./context/StakingContext";

function App() {
  return (
    <>  
     <Wallet> 
      <Navigation/> 
      <StakingProvider>
        <StakedRewardInfo/>
        <StakeAmount/>
        <Withdraw/>
      </StakingProvider>
      <TokenApproval/>
      <ClaimReward/>
    </Wallet>
    </>
  )
}

export default App
