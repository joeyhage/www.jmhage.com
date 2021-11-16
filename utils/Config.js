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
    about: {
      url: `${SITE_URL}/about`,
      slug: "/about",
    },
    projectIndex: {
      url: `${SITE_URL}/projects`,
      slug: "/projects",
    },
    projectIndexPage: {
      slug: "/projects/page/[page]",
    },
    project: {
      slug: "/projects/[slug]",
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
      url: `${SITE_URL}/contact`,
      slug: "/contact",
    },
    notFound: {
      url: SITE_URL,
      slug: "/404",
    },
  },
  pagination: {
    pageSize: 3,
    recentPostsSize: 3,
  },
  menuLinks: [
    {
      displayName: "Home",
      path: "/",
    },
    {
      displayName: "About",
      path: "/about",
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
