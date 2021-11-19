import { Config } from "./Config";

/**
 * This class constructs GraphQL queries for blog posts, page content and other data
 * and calls out to the Contentful GraphQL API.
 *
 * Contentful GraphQL API docs:
 * https://www.contentful.com/developers/docs/references/graphql/
 *
 * Explore the GraphQL API in depth in the GraphiQL Playground:
 * https://graphql.contentful.com/content/v1/spaces/{SPACE_ID}/explore?access_token={ACCESS_TOKEN}
 *
 */

const defaultOptions = {
  preview: false,
};

export default class ContentfulApi {
  /**
   * Fetch the content for a single page by slug.
   *
   * The content type uses the powerful Rich Text field type for the
   * body of the post.
   *
   * This query fetches linked assets (i.e. images) and entries
   * (i.e. video embed and code block entries) that are embedded
   * in the Rich Text field. This is rendered to the page using
   * @components/RichTextPageContent.
   *
   * For more information on Rich Text fields in Contentful, view the
   * documentation here: https://www.contentful.com/developers/docs/concepts/rich-text/
   *
   * Linked assets and entries are parsed and rendered using the npm package
   * @contentful/rich-text-react-renderer
   *
   * https://www.npmjs.com/package/@contentful/rich-text-react-renderer
   *
   * param: slug (string)
   *
   */
  static async getPageContentBySlug(slug, options = defaultOptions) {
    const variables = { slug, preview: options.preview };
    const query = `
    query GetPageContentBySlug($slug: String!, $preview: Boolean!) {
      pageContentCollection(limit: 1, where: {slug: $slug}, preview: $preview) {
        items {
          sys {
            id
          }
          heroBanner {
            headline
            subHeading
            internalLink
            externalLink
            ctaText
            image {
              url
              title
              description
              width
              height
            }
          }
          title
          description
          slug
          body {
            json
            links {
              entries {
                block {
                  sys {
                    id
                  }
                  __typename
                  ... on VideoEmbed {
                    title
                    embedUrl
                  }
                  ... on CodeBlock {
                    description
                    language
                    code
                  }
                }
              }
              assets {
                block {
                  sys {
                    id
                  }
                  url
                  title
                  width
                  height
                  description
                }
              }
            }
          }
        }
      }
    }`;

    const response = await this.callContentful(query, variables, options);

    const pageContent = response.data.pageContentCollection.items
      ? response.data.pageContentCollection.items
      : [];

    return pageContent.pop();
  }

  /**
   * Fetch the total number of projects.
   */
  static async getTotalProjectsNumber() {
    const query = `
      {
        projectCollection {
          total
        }
      }
    `;

    const response = await this.callContentful(query);
    const totalProjects = response.data.projectCollection.total
      ? response.data.projectCollection.total
      : 0;

    return totalProjects;
  }

  /**
   * Fetch a batch of project slugs (by given page number).
   *
   * This method queries the GraphQL API for a single batch of project slugs.
   *
   * The query limit of 100 is the maximum number of slugs
   * we can fetch with this query due to GraphQL complexity costs.
   *
   * For more information about GraphQL query complexity, visit:
   * https://www.contentful.com/developers/videos/learn-graphql/#graphql-fragments-and-query-complexity
   *
   * param: page (number)
   *
   */
  static async getPaginatedProjectSlugs(page) {
    const queryLimit = 100;
    const skip = page === 1 ? 0 : (page - 1) * queryLimit;

    const variables = { limit: queryLimit, skip };

    const query = `query GetPaginatedProjectSlugs($limit: Int!, $skip: Int!) {
      projectCollection(limit: $limit, skip: $skip, order: sys_publishedAt_DESC) {
        total
        items {
          slug
        }
      }
    }`;

    const response = await this.callContentful(query, variables);
    
    const { total } = response.data.projectCollection;
    const slugs = response.data.projectCollection.items
      ? response.data.projectCollection.items.map((item) => item.slug)
      : [];

    return { slugs, total };
  }

  /**
   * Fetch all project slugs.
   *
   * This method queries the GraphQL API for project slugs
   * in batches that accounts for the query complexity cost,
   * and returns them in one array.
   *
   * This method is used on pages/projects/[slug] inside getStaticPaths() to
   * generate all dynamic project routes.
   *
   * For more information about GraphQL query complexity, visit:
   * https://www.contentful.com/developers/videos/learn-graphql/#graphql-fragments-and-query-complexity
   *
   */
  static async getAllProjectSlugs() {
    let page = 1;
    let shouldQueryMoreSlugs = true;
    const returnSlugs = [];

    while (shouldQueryMoreSlugs) {
      const response = await this.getPaginatedProjectSlugs(page);

      if (response.slugs.length > 0) {
        returnSlugs.push(...response.slugs);
      }

      shouldQueryMoreSlugs = returnSlugs.length < response.total;
      page++;
    }

    return returnSlugs;
  }

  /**
   * Fetch a batch of projects (by given page number).
   *
   * This method queries the GraphQL API for a single batch of projects.
   *
   * The query limit of 10 is the maximum number of posts
   * we can fetch with this query due to GraphQL complexity costs.
   *
   * For more information about GraphQL query complexity, visit:
   * https://www.contentful.com/developers/videos/learn-graphql/#graphql-fragments-and-query-complexity
   *
   * param: page (number)
   *
   */
  static async getPaginatedProjects(page) {
    const queryLimit = 10;
    const skip = page === 1 ? 0 : (page - 1) * queryLimit;

    const variables = { limit: queryLimit, skip };

    const query = `query GetPaginatedProjects($limit: Int!, $skip: Int!) {
      projectCollection(limit: $limit, skip: $skip, order: sys_publishedAt_DESC) {
        total
        items {
          sys {
            id
          }
          title
          slug
          excerpt
          preview {
            sys {
              id
            }
            title
            description
            contentType
            fileName
            url
            size
            width
            height
          }
        }
      }
    }`;

    const response = await this.callContentful(query, variables);

    const projects = response.data.projectCollection
      ? response.data.projectCollection
      : { total: 0, items: [] };

    return projects;
  }

  /**
   * Fetch a single project by slug.
   *
   * This method is used on pages/project/[slug] to fetch the data for
   * individual project at build time, which are prerendered as
   * static HTML.
   *
   * The content type uses the powerful Rich Text field type for the
   * body of the project.
   *
   * This query fetches linked assets (i.e. images) and entries
   * (i.e. video embed and code block entries) that are embedded
   * in the Rich Text field. This is rendered to the page using
   * @components/RichTextPageContent.
   *
   * For more information on Rich Text fields in Contentful, view the
   * documentation here: https://www.contentful.com/developers/docs/concepts/rich-text/
   *
   * Linked assets and entries are parsed and rendered using the npm package
   * @contentful/rich-text-react-renderer
   *
   * https://www.npmjs.com/package/@contentful/rich-text-react-renderer
   *
   * param: slug (string)
   *
   */
  static async getProjectBySlug(slug, options = defaultOptions) {
    const variables = { slug, preview: options.preview };
    const query = `query GetProjectBySlug($slug: String!, $preview: Boolean!) {
      projectCollection(limit: 1, where: {slug: $slug}, preview: $preview) {
        total
        items {
          sys {
            id
          }
          title
          slug
          excerpt
          externalUrl
          sourceCodeUrl
          previewWide {
            sys {
              id
            }
            title
            description
            contentType
            fileName
            url
            size
            width
            height
          }
          body {
            json
            links {
              entries {
                inline {
                  sys {
                    id
                  }
                  __typename
                }
                block {
                  sys {
                    id
                  }
                  __typename
                  ... on CodeBlock {
                    description
                    language
                    code
                  }
                }
              }
              assets {
                block {
                  sys {
                    id
                  }
                  url
                  title
                  width
                  height
                  description
                }
              }
            }
          }
        }
      }
    }`;

    const response = await this.callContentful(query, variables, options);
    const projects = response.data.projectCollection.items
      ? response.data.projectCollection.items
      : [];

    return projects.pop();
  }

  /**
   * Fetch website assets needed for all pages
   */
  static async getSiteAssets() {
    const query = `query {
      assetCollection(where: {
        contentfulMetadata: {
          tags_exists: true
          tags: {
              id_contains_all: ["assetSite"]
          }
        }
      }) {
        items {
          sys {
            id
          }
          title
          description
          contentType
          fileName
          url
          size
          width
          height
        }
      }
    }`;

    const response = await this.callContentful(query);
    const assets = response.data.assetCollection.items
      ? response.data.assetCollection.items
      : [];
    return assets;
  }

  /**
   * Call the Contentful GraphQL API using fetch.
   *
   * param: query (string)
   */
  static async callContentful(query, variables = {}, options = defaultOptions) {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

    const accessToken = options.preview
      ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.CONTENTFUL_ACCESS_TOKEN;

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    };

    try {
      const data = await fetch(fetchUrl, fetchOptions).then((response) =>
        response.json(),
      );
      return data;
    } catch (error) {
      throw new Error("Could not fetch data from Contentful!");
    }
  }
}
