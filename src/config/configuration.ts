export default () => ({
  mongo: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  github: {
    id: process.env.GITHUB_ID,
    secret: process.env.GITHUB_SECRET,
  },
});
