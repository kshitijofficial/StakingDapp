import React, { useState } from "react";
import "./App.css";
import Wallet from "./components/Wallet/Wallet";
import StakedRewardInfo from "./components/DisplayPannel/StakedRewardRateInfo";
import StakeAmount from "./components/StakeToken/StakeAmount";
import TokenApproval from "./components/StakeToken/TokenApproval";

import Navigation from "./components/Navigation/Navigation";
import Withdraw from "./components/Withdraw/Withdraw";
import { StakingProvider } from "./context/StakingContext";

function App() {
  const [displaySection, setDisplaySection] = useState("stake");

  const handleButtonClick = (section) => {
    setDisplaySection(section);
  };

  return (
    <div className="main-section">
      <Wallet>
        <Navigation />
        <StakingProvider>
          <StakedRewardInfo />

          <div className="main-content">
            <div className="button-section">
              <button
                onClick={() => handleButtonClick("stake")}
                className={displaySection === "stake" ? "" : "active"}
              >
                Stake
              </button>
              <button
                onClick={() => handleButtonClick("withdraw")}
                className={displaySection === "withdraw" ? "" : "active"}
              >
                Withdraw
              </button>
            </div>
            {displaySection === "stake" && (
              <div className="stake-wrapper">
                <TokenApproval />
                <StakeAmount />
              </div>
            )}

            {displaySection === "withdraw" && (
              <div className="stake-wrapper">
                <Withdraw />
              </div>
            )}
          </div>
        </StakingProvider>
      </Wallet>
    </div>
  );
}

export default App;
