const standardConfig = require('./tailwind.config');

module.exports = {
  ...standardConfig,
  darkMode: ['class', '[data-mode="dark"]'],
};
