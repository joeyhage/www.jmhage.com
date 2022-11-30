import Footer from "@components/Footer";
import Header from "@components/Header";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import GlobalStyles from "./main.styles.js";

export default function MainLayout({ assets, children, preview }) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LcdP0cjAAAAAAWfIPehf_K_LLzSp_6JM0MeZvdX">
      {preview && <PreviewBanner />}
      <Header assets={assets} />
      <main>{children}</main>
      <Footer />

      <style jsx global>
        {GlobalStyles}
      </style>
    </GoogleReCaptchaProvider>
  );
}
