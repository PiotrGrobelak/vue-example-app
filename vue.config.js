module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "./src/styles/style.scss";
        `,
      },
    },
  },
};
