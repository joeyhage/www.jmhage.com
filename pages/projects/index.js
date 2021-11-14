import ContentWrapper from "@components/ContentWrapper";
import HeroBanner from "@components/HeroBanner";
import PageContentWrapper from "@components/PageContentWrapper";
import PageMeta from "@components/PageMeta";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import { Config } from "@utils/Config";
import ContentfulApi from "@utils/ContentfulApi";

export default function Projects(props) {
  const { assets, pageContent, recentPosts, preview } = props;

  const pageTitle = pageContent ? pageContent.title : "Projects";

  const pageDescription = pageContent
    ? pageContent.description
    : "Personal website for Joey Hage";

  return (
    <>
      <MainLayout assets={assets} preview={preview}>
        <PageMeta
          title={pageTitle}
          description={pageDescription}
          url={Config.pageMeta.home.url}
        />

        {pageContent && pageContent.heroBanner !== null && (
          <HeroBanner data={pageContent.heroBanner} />
        )}

        <ContentWrapper>
          {pageContent && pageContent.body && (
            <PageContentWrapper>
              <RichTextPageContent richTextBodyField={pageContent.body} />
            </PageContentWrapper>
          )}
        </ContentWrapper>
      </MainLayout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.projects.slug,
    {
      preview: preview,
    },
  );

  const recentPosts = await ContentfulApi.getRecentPostList();
  const assets = await ContentfulApi.getSiteAssets();

  return {
    props: {
      assets,
      preview,
      pageContent: pageContent || null,
      recentPosts,
    },
  };
}
