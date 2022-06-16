module.exports = {
  lang: 'en-US',
  title: 'NestJS Payment Documentation 🎉',
  description: 'Nodejs payment wrote in typescript',
  base: process.env.DEPLOY_ENV === 'gh-pages' ? '/nestjs-boilerplate/' : '/',
  themeConfig: {
    sidebar: [
      ['/', 'Introduction'],
      '/docs/development',
      '/docs/architecture',
      '/docs/naming-cheatsheet',

      // '/docs/routing',
      // '/docs/state',

      '/docs/linting',

      // '/docs/editors',
      // '/docs/production',
      // '/docs/troubleshooting',
    ],
  },
};
