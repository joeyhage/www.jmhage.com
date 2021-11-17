import ContentWrapper from "@components/ContentWrapper";
import PageMeta from "@components/PageMeta";
import Project from "@components/Project";
import MainLayout from "@layouts/main";
import { Config } from "@utils/Config";
import ContentfulApi from "@utils/ContentfulApi";

export default function ProjectWrapper(props) {
  const { assets, project, preview, topics } = props;

  return (
    <MainLayout assets={assets} preview={preview}>
      <PageMeta
        title={project.title}
        description={project.title}
        url={`${Config.pageMeta.projectIndex.url}/${project.slug}`}
      />
      <ContentWrapper>
        <Project project={project} topics={topics} />
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
  const topics = await getGitHubTopics(project.sourceCodeUrl);

  return {
    props: {
      assets,
      preview,
      project,
      topics,
    },
  };
}

async function getGitHubTopics(sourceCodeUrl) {
  if (sourceCodeUrl && sourceCodeUrl.startsWith("https://github.com/")) {
    try {
      const data = await fetch(`https://api.github.com/repos/${sourceCodeUrl.split("/").slice(3).join("/")}/topics`).then((response) =>
        response.json(),
      );
      return data.names;
    } catch (error) {
      console.error("could not get GitHub topics", error);
    }
  }
  return [];
}
