import PublishedDate from "@components/Post/PublishedDate";
import Tags from "@components/Post/Tags";
import ButtonStyles from "@styles/Button.module.css";
import ContentListStyles from "@styles/ContentList.module.css";
import RecentPostListStyles from "@styles/RecentPostList.module.css";
import { Config } from "@utils/Config";
import ReactMarkdownRenderers from "@utils/ReactMarkdownRenderers";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function RecentPostList({ posts }) {
  return (
    <>
      <h2 className={RecentPostListStyles.recentPostList__header}>
        Recent articles
      </h2>
      <ol className={ContentListStyles.contentList}>
        {posts.map((post) => (
          <li key={post.sys.id}>
            <article className={ContentListStyles.contentList__post}>
              <PublishedDate date={post.date} />
              <Link href={`/blog/${post.slug}`}>
                <a className={ContentListStyles.contentList__titleLink}>
                  <h2 className={ContentListStyles.contentList__title}>
                    {post.title}
                  </h2>
                </a>
              </Link>
              {post.tags !== null && <Tags tags={post.tags} />}
              <div className={ContentListStyles.contentList__excerpt}>
                <ReactMarkdown
                  children={post.excerpt}
                  renderers={ReactMarkdownRenderers(post.excerpt)}
                />
              </div>
            </article>
          </li>
        ))}
      </ol>
      <Link href={Config.pageMeta.blogIndex.slug}>
        <a className={ButtonStyles.button} style={{ fontFamily: "Roboto" }}>
          See more articles
        </a>
      </Link>
    </>
  );
}
