// module.exports = {
//   preset: "ts-jest",
//   // testEnvironment: "node",
//   transform: {
//     // '^.+\\.ts?$': 'ts-jest',
//     "^.+\\.jsx?$": "babel-jest",
//   },
//   transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
// };
export default {
  preset: "ts-jest",
  // testEnvironment: "node",
  transform: {
    // '^.+\\.ts?$': 'ts-jest',
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
};