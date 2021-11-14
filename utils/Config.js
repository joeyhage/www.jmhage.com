const SITE_URL = "https://www.jmhage.com";

export const Config = {
  site: {
    owner: "Joey Hage",
    title: "My new Next.js + Contentful blog site",
    domain: "www.jmhage.com",
  },
  pageMeta: {
    openGraph: {
      twitterUser: "contentful",
    },
    home: {
      url: SITE_URL,
      slug: "/",
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
      displayName: "Blog",
      path: "/blog",
    },
  ],
};
