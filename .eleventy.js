const { rehypePlugin } = require("@hendotcat/11tyhype")
const { sassPlugin } = require("@hendotcat/11tysass")
const { reactPlugin } = require("@hendotcat/11tysnap")
const { register } = require("esbuild-register/dist/node")
const fs = require("fs-extra")
const rehypeMinifyWhitespace = require("rehype-minify-whitespace")
const rehypeUrls = require("rehype-urls")

register()

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

  const siteUrl = process.env.CI ? "https://hen.cat/contrast/" : ""

  eleventyConfig.addPlugin(rehypePlugin, {
    plugins: [
      [rehypeUrls, url => {
        if (url.href.startsWith("/")) {
          return `${siteUrl}${url.href}`
        }
      }]
    ]
  })

  eleventyConfig.addPlugin(reactPlugin, {
    verbose: true,
  })

  eleventyConfig.addPlugin(sassPlugin, {
    files: [{
      file: "style.scss",
      outFile: "style.[hash].css",
      outputStyle: "compressed",
    }],
    verbose: true,
  })

  eleventyConfig.addWatchTarget("style.scss")

  const dir = {
    includes: "_includes",
    layouts: "_layouts",
  }

  return {
    dir,
  }
}
