import Author from "@components/Post/Author";
import ExternalUrl from "@components/Post/ExternalUrl";
import PublishedDate from "@components/Post/PublishedDate";
import Tags from "@components/Post/Tags";
import RichTextPageContent from "@components/RichTextPageContent";
import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
import TypographyStyles from "@styles/Typography.module.css";

export default function Post({ post }) {
  return (
    <article className={RichTextPageContentStyles.page}>
      {post.externalUrl && <ExternalUrl url={post.externalUrl} />}
      <PublishedDate date={post.date} />
      {!!post.tags && <Tags tags={post.tags} />}
      <h1 className={TypographyStyles.heading__h1}>{post.title}</h1>
      <RichTextPageContent richTextBodyField={post.body} renderH2Links={true} />
      {!!post.author && <Author author={post.author} />}
    </article>
  );
}
