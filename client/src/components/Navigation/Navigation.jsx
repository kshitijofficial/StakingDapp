import ClaimReward from "../ClaimReward/ClaimReward";
import Wallet from "../Wallet/Wallet";
import ConnectedAccount from "./ConnectedAccount";
import ConnectedNetwork from "./ConnectedNetwork";
import "./Navigation.css";

const Navigation = () => {
  return (
    <header className="navbar">
      <div className="navbar-btns">
        <Wallet></Wallet>
        <ClaimReward />
      </div>
      <div className="navbar-acc">
        <ConnectedAccount />
        <ConnectedNetwork />
      </div>
    </header>
  );
};
export default Navigation;
