import vuePlugin from "rollup-plugin-vue";
import scss from "rollup-plugin-scss";

export default {
  input: "src/index.js",
  sourcemap: "inline",
  output: [
    {
      file: "dist/main.js",
      format: "es",
    },
  ],
  plugins: [
    vuePlugin(/* options */),
    scss(), // will output compiled styles to output.css
  ],
  external: ["vue", "@declarative-gridstack/core"],
};
