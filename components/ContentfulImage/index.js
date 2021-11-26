import Image from "next/image";

export function normalizeSrc(src) {
  return src[0] === "/" ? src.slice(1) : src;
}

export function contentfulLoader({ src, width, quality }) {
  const params = ["w=" + width];

  if (quality) {
    params.push("q=" + quality);
  }

  return `${normalizeSrc(src)}?${params.join("&")}`;
}

export default function ContentfulImage(props) {
  return <Image loader={contentfulLoader} {...props} />;
}
