import ContentWrapper from "@components/ContentWrapper";
import PageMeta from "@components/PageMeta";
import Project from "@components/Project";
import MainLayout from "@layouts/main";
import { Config } from "@utils/Config";
import ContentfulApi from "@utils/ContentfulApi";

export default function ProjectWrapper(props) {
  const { assets, project, preview } = props;

  return (
    <MainLayout assets={assets} preview={preview}>
      <PageMeta
        title={project.title}
        description={project.title}
        url={`${Config.pageMeta.projectIndex.url}/${project.slug}`}
      />
      <ContentWrapper>
        <Project project={project} />
      </ContentWrapper>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const blogPostSlugs = await ContentfulApi.getAllProjectSlugs();

  const paths = blogPostSlugs.map((slug) => {
    return { params: { slug } };
  });

  // Using fallback: "blocking" here enables preview mode for unpublished blog slugs
  // on production
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params, preview = false }) {
  const project = await ContentfulApi.getProjectBySlug(params.slug, {
    preview: preview,
  });

  // Add this with fallback: "blocking"
  // So that if we do not have a post on production,
  // the 404 is served
  if (!project) {
    return {
      notFound: true,
    };
  }

  const assets = await ContentfulApi.getSiteAssets();

  return {
    props: {
      assets,
      preview,
      project,
    },
  };
}
