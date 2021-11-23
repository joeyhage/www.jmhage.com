import ContentWrapper from "@components/ContentWrapper";
import HeroBanner from "@components/HeroBanner";
import PageContentWrapper from "@components/PageContentWrapper";
import PageMeta from "@components/PageMeta";
import ProjectList from "@components/ProjectList";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import { Config } from "@utils/Config";
import ContentfulApi from "@utils/ContentfulApi";

export default function ProjectIndexPage(props) {
  const { assets, projects, totalPages, currentPage, pageContent, preview } =
    props;

  /**
   * This provides some fallback values to PageMeta so that a pageContent
   * entry is not required for /blog
   */
  const pageTitle = pageContent ? pageContent.title : "Projects";
  const pageDescription = pageContent
    ? pageContent.description
    : "Projects | Joey Hage";

  return (
    <MainLayout assets={assets} preview={preview}>
      <PageMeta
        title={`${pageTitle} Page ${currentPage}`}
        description={pageDescription}
        url={`${Config.pageMeta.projectIndex.url}/page/${currentPage}`}
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

export async function getStaticPaths() {
  const totalProjects = await ContentfulApi.getTotalProjectsNumber();
  const totalPages = Math.ceil(totalProjects / Config.pagination.pageSize);

  const paths = [];

  /**
   * Start from page 2, so we don't replicate /projects
   * which is page 1
   */
  for (let page = 2; page <= totalPages; page++) {
    paths.push({ params: { page: page.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const projects = await ContentfulApi.getPaginatedProjects(params.page);
  const totalPages = Math.ceil(projects.toEtal / Config.pagination.pageSize);
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.projectIndex.slug,
    {
      preview: preview,
    },
  );
  const assets = await ContentfulApi.getSiteAssets();

  return {
    props: {
      assets,
      preview,
      projects: projects.items,
      totalPages,
      currentPage: params.page,
      pageContent: pageContent || null,
    },
  };
}
