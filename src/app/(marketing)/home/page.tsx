import React from "react";
import Footer from "./components/footer";
import GetStarted from "./components/get-started";
import Join from "./components/join";
import JoinWidget from "./components/join-widget";
import Offer from "./components/offer";
import PaymentManagement from "./components/payment-management";
import SmartWay from "./components/smart-way";
import SME from "./components/SME";
import Solution from "./components/solution";
import SubFooter from "./components/sub-footer";

const page = () => {
  return (
    <div className="pt-[104px]">
      <GetStarted />
      <Solution />
      <Offer />
      <SME />
      <PaymentManagement />
      <SmartWay />
      <Join />
      <JoinWidget />
      <Footer />
      <SubFooter />
    </div>
  );
};

export default page;
