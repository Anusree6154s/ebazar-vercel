const path = require("path");

function resolveEnvFile() {
  const env = process.env.NODE_ENV;

  switch (env) {
    case "production":
      return path.resolve(__dirname, "../../../.env.prod");
    case "development":
      return path.resolve(__dirname, "../../../.env.dev");
    case "test":
      return path.resolve(__dirname, "../../../.env.test");
    case "local":
      console.log(path.resolve(__dirname, "../../../.env.local"));
      return path.resolve(__dirname, "../../../.env.local");
    default:
      return path.resolve(__dirname, "../../../.env");
  }
}

module.exports = resolveEnvFile;
