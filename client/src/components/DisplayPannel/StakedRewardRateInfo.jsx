import StakedAmount from "./StakedAmount";
import RewardRate from "./RewardRate";
import EarnedReward from "./EarnedReward";
const StakedRewardInfo =()=>{
  return(
    <div>
       <StakedAmount></StakedAmount>
       <RewardRate></RewardRate>
       <EarnedReward></EarnedReward>
    </div>
  )
}
export default StakedRewardInfo;