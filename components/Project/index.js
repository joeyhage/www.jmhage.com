import ExternalUrl from "@components/Project/ExternalUrl";
import RichTextPageContent from "@components/RichTextPageContent";
import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
import TypographyStyles from "@styles/Typography.module.css";
import Image from "next/image";

export default function Project({ project }) {
  return (
    <article className={RichTextPageContentStyles.page}>
      <h1 className={TypographyStyles.heading__h1}>{project.title}</h1>
      <figure className="image is-16by9 mb-5">
        <Image
          src={project.previewWide.url}
          alt={project.previewWide.title}
          layout="fill"
        />
      </figure>
      <RichTextPageContent
        richTextBodyField={project.body}
        renderH2Links={true}
      />
      {project.externalUrl && <ExternalUrl url={project.externalUrl} />}
    </article>
  );
}
