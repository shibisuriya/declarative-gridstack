import { babel } from "@rollup/plugin-babel";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/main.js",
      format: "es",
      plugins: [{ presets: ["@babel/preset-env"] }],
    },
  ],
  external: ["react", "react-dom", "@declarative-gridstack/core"],
  plugins: [babel({ presets: ["@babel/preset-react"] })],
};
