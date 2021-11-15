import { Config } from "@utils/Config";
import OpenGraph from "@utils/OpenGraph";
import Head from "next/head";

export default function PageMeta(props) {
  const { title, description, url, canonical } = props;
  const siteTitle = `${title} | ${Config.site.title}`;

  return (
    <Head>
      <title>{siteTitle}</title>

      {canonical && <link rel="canonical" href={canonical} />}

      <meta name="title" content={siteTitle} />
      <meta property="og:title" content={title} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />

      <meta property="og:url" content={url} />

      <meta property="og:image" content={OpenGraph.generateImageUrl(title)} />

      <link rel="icon" href="/favicon.ico" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0f111a" />
      <meta name="msapplication-TileColor" content="#b91d47" />
      <meta name="theme-color" content="#283848" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap"
        rel="stylesheet"
      />
      {props.children}
    </Head>
  );
}
