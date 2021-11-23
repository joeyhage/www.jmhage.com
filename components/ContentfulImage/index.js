import Image from "next/image";

function normalizeSrc(src) {
  return src[0] === "/" ? src.slice(1) : src;
}

const contentfulLoader =
  (priority) =>
  ({ src, width, quality }) => {
    const params = ["w=" + width];

    if (quality) {
      params.push("q=" + quality);
    }

    if (priority) {
      params.push("fm=jpg", "fl=progressive");
    }

    return `${normalizeSrc(src)}?${params.join("&")}`;
  };

export default function ContentfulImage(props) {
  return <Image loader={contentfulLoader(props.priority)} {...props} />;
}
