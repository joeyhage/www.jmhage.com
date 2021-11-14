module.exports = {
  siteUrl: "https://www.jmhage.com/",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", disallow: "/api" }],
    additionalSitemaps: [
      "https://www.jmhage.com/server-sitemap.xml",
    ],
  },
  exclude: ["/api/*", "/server-sitemap.xml"],
};
