import { FooterCore } from "@axa-fr/react-toolkit-layout-footer";
import "@axa-fr/react-toolkit-layout-footer/dist/af-footer.css";
import Footer from "react-footer-bar";

const FooterForAll = () => {
  return (
    <div>
      <Footer
        textArray={["Copyright@2023", "Thanks for visiting", "All the best!"]}
        backGroundStyle={{
          backgroundColor: "#80B3FF",
        }}
        textStyle={{
          fontSize: 20,
        }}
        enableAnimation
      />
      <FooterCore>
        <strong>@ 2023 SHOPLANE-Lavanya</strong>

        <i> All right reserved</i>
      </FooterCore>
    </div>
  );
};
export default FooterForAll;
