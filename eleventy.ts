import { rehypePlugin } from "@hendotcat/11tyhype"
import { sassPlugin } from "@hendotcat/11tysass"
import { reactPlugin } from "@hendotcat/11tysnap"
import { EleventyCollection, EleventyLayout } from "@hendotcat/11tytype"
import * as fs from "fs-extra"
import rehypeMinifyWhitespace from "rehype-minify-whitespace"
import rehypeUrls from "rehype-urls"

declare global {
  interface Home {
    title: string
    description: string
  }

  type ContrastScore = "AAA" | "AA" | "AA Large" | "Fail"

  interface Color {
    label: string
    value: string
  }

  interface Palette {
    name: string
    description: string
    colors: Color[]
    pairs: {
      bg: Color
      fg: Color
      ratio: string
      label: string
    }[]
    summary: {
      scores: Record<ContrastScore, number>
      total: number
    }
  }

  type Collections = {
    palettes: EleventyCollection<Palette>
  }

  type Layout<Template> = EleventyLayout<Template, Collections>
}

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
