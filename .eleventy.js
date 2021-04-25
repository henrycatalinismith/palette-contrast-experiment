const rehype = require("@hendotcat/11tyhype")
const fs = require("fs-extra")
const htmlmin = require("html-minifier")
const rehypeMinifyWhitespace = require("rehype-minify-whitespace")
const sass = require("sass")

fs.ensureDirSync("_data")
fs.ensureDirSync("_includes")

module.exports = function(eleventyConfig) {
  console.log("contrast")

  eleventyConfig.addCollection(
    "palettes",
    function(collectionApi) {
      return collectionApi.getFilteredByGlob("palettes/*.md")
    }
  )

  eleventyConfig.addGlobalData(
    "css",
    function() {
      return sass.renderSync({ file: "style.scss" }).css
    }
  )

  eleventyConfig.addPlugin(rehype, {
    plugins: [
      [rehypeMinifyWhitespace],
    ]
  })

  eleventyConfig.addWatchTarget("style.scss")
}

