const { createCommand } = require('scaffold-kit/command');
const {
  updateFile
} = require('scaffold-kit/executor');

module.exports = createCommand({
  description: 'Create a new route.',
  usage: 'my-backend route [options...]',
  executeInProjectRootDirectory: true,
  options: [
    {
      name: 'method',
      type: String,
      description: 'The HTTP method for the route.',
      defaultValue: 'get',
      saveToPreference: false
    },
    {
      name: 'url',
      type: String,
      description: 'The relative URL from root.',
      defaultValue: 'new-route',
      saveToPreference: false
    }
  ],
  execute: ({ options }) => {
    updateFile({
      at: 'router.js',
      updator: (content) => {
        if (content.match(
          new RegExp(`router\\.${options.method}\\('/${options.url}'`, 'g')
        )) {
          return content;
        } else {
          return content +
            `router.${options.method}('/${options.url}', ` +
            `(ctx, next) => ctx.body = 'welcome to /${options.url}');` + '\n';
        }
      },
      rollbacker: (content) => {
        return content.replace(new RegExp(
          `router\\.${options.method}\\('/${options.url}', ` +
          `\\(ctx, next\\) => ctx\\.body = 'welcome to /${options.url}'\\);\n`,
          'gm'
        ), '');
      }
    });
  }
});
