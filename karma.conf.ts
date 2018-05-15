module.exports = (config: any) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      'spec/**/*[sS]pec.ts',
    ],
    exclude: [
    ],
    preprocessors: {
      'spec/**/*[sS]pec.ts': 'karma-typescript',
    },
    reporters: ['progress', 'karma-typescript'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity,
  });
};
