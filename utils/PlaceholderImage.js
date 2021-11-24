import * as ContentfulImage from "@components/ContentfulImage";
import { getPlaiceholder } from "plaiceholder";

export async function toBase64(image) {
  const { base64 } = await getPlaiceholder(
    ContentfulImage.contentfulLoader({
      src: image.url,
      width: 3840,
      quality: 100,
    }),
  );
  return base64;
}
