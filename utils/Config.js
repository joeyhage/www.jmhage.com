const SITE_URL = "https://www.jmhage.com";

export const Config = {
  site: {
    owner: "Joey Hage",
    title: "Joey Hage",
    domain: "www.jmhage.com",
  },
  pageMeta: {
    openGraph: {
      githubUser: "joeyhage",
      linkedInUser: "jmhage",
    },
    home: {
      url: SITE_URL,
      slug: "/",
    },
    projects: {
      url: SITE_URL,
      slug: "/projects",
    },
    blogIndex: {
      url: `${SITE_URL}/blog`,
      slug: "/blog",
    },
    blogIndexPage: {
      slug: "/blog/page/[page]",
    },
    post: {
      slug: "/blog/[slug]",
    },
    contact: {
      url: SITE_URL,
      slug: "/contact",
    },
    notFound: {
      url: SITE_URL,
      slug: "/404",
    },
  },
  pagination: {
    pageSize: 2,
    recentPostsSize: 3,
  },
  menuLinks: [
    {
      displayName: "Home",
      path: "/",
    },
    {
      displayName: "Projects",
      path: "/projects",
    },
    {
      displayName: "Blog",
      path: "/blog",
    },
    {
      displayName: "Contact",
      path: "/contact",
    },
  ],
};
