import ContentfulImage from "@components/ContentfulImage";
import ExternalUrl from "@components/Project/ExternalUrl";
import Tags from "@components/Project/Tags";
import RichTextPageContent from "@components/RichTextPageContent";
import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
import TypographyStyles from "@styles/Typography.module.css";

export default function Project({ project, topics }) {
  return (
    <article className={RichTextPageContentStyles.page}>
      {!!topics && <Tags tags={topics} />}
      <h1 className={TypographyStyles.heading__h1}>{project.title}</h1>
      <figure className="image is-16by9 mb-5">
        <ContentfulImage
          src={project.previewWide.url}
          alt={project.previewWide.title}
          style={{width: '100%', height: 'auto'}}
          placeholder="blur"
          width={100}
          height='auto'
          blurDataURL={project.previewWide.base64}
        />
      </figure>
      <RichTextPageContent
        richTextBodyField={project.body}
        renderH2Links={true}
      />
      {project.externalUrl && (
        <ExternalUrl url={project.externalUrl}>Project link</ExternalUrl>
      )}
      {project.sourceCodeUrl && (
        <ExternalUrl url={project.sourceCodeUrl}>Source code link</ExternalUrl>
      )}
    </article>
  );
}
