import SocialLinks from "@components/SocialLinks";
import FooterStyles from "@styles/Footer.module.css";
import { Config } from "@utils/Config";

export default function Footer() {
  return (
    <footer className={FooterStyles.footer}>
      <SocialLinks fillColor="#fff" />
      <p className={FooterStyles.footer__copyright}>
        © {new Date().getFullYear()} {Config.site.owner} All Rights Reserved.
      </p>
    </footer>
  );
}
