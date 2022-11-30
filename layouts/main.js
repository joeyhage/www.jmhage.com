import Footer from "@components/Footer";
import Header from "@components/Header";
import GlobalStyles from "./main.styles.js";

export default function MainLayout({ assets, children, preview }) {
  return (
    <>
      {preview && <PreviewBanner />}
      <Header assets={assets} />
      <main>{children}</main>
      <Footer />

      <style jsx global>
        {GlobalStyles}
      </style>
    </>
  );
}
