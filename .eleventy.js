const fs = require("fs-extra")
const htmlmin = require("html-minifier")
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

  eleventyConfig.addTransform(
    "htmlmin",
    function(content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        content = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        })
      }
      return content
    }
  )

  eleventyConfig.addWatchTarget("style.scss")
}

