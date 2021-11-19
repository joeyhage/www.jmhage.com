import ContentWrapper from "@components/ContentWrapper";
import HeroBanner from "@components/HeroBanner";
import PageContentWrapper from "@components/PageContentWrapper";
import PageMeta from "@components/PageMeta";
import ProjectList from "@components/ProjectList";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import { Config } from "@utils/Config";
import ContentfulApi from "@utils/ContentfulApi";

export default function ProjectIndex(props) {
  const { assets, projects, currentPage, totalPages, pageContent, preview } =
    props;

  /**
   * This provides some fallback values to PageMeta so that a pageContent
   * entry is not required for /projects
   */
  const pageTitle = pageContent ? pageContent.title : "Projects";
  const pageDescription = pageContent
    ? pageContent.description
    : "Projects | Joey Hage";

  return (
    <MainLayout assets={assets} preview={preview}>
      <PageMeta
        title={pageTitle}
        description={pageDescription}
        url={Config.pageMeta.projectIndex.url}
      />

      {pageContent.heroBanner !== null && (
        <HeroBanner data={pageContent.heroBanner} />
      )}

      <ContentWrapper>
        {pageContent.body && (
          <PageContentWrapper>
            <RichTextPageContent richTextBodyField={pageContent.body} />
          </PageContentWrapper>
        )}
        <ProjectList
          projects={projects}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </ContentWrapper>
    </MainLayout>
  );
}

export async function getStaticProps({ preview = false }) {
  const projects = await ContentfulApi.getPaginatedProjects(1);
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.projectIndex.slug,
    {
      preview: preview,
    },
  );

  const totalPages = Math.ceil(
    projects.total / Config.pagination.pageSize,
  );

  const assets = await ContentfulApi.getSiteAssets();

  return {
    props: {
      assets,
      preview,
      projects: projects.items,
      totalPages,
      currentPage: "1",
      pageContent: pageContent || null,
    },
  };
}
