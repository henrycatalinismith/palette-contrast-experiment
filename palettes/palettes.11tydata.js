const fs = require("fs-extra")
const { hex, score } = require("wcag-contrast")

function pairs(colors) {
  const pairs = []
  colors.forEach(bg => {
    colors.forEach(fg => {
      if (bg.value === fg.value) {
        return
      }
      const ratio = hex(bg.value, fg.value)
      const label = score(ratio)
      pairs.push({
        bg,
        fg,
        ratio,
        label,
      })
    })
  })

  pairs.sort((a, b) => {
    return b.ratio - a.ratio
  })

  return pairs
}

function summary(colors) {
  const p = pairs(colors)
  const scores = {
    "AAA": 0,
    "AA": 0,
    "AA Large": 0,
    "Fail": 0,
  }
  const total = p.length

  p.forEach(pair => {
    scores[pair.label] += 1
  })

  return {
    scores,
    total,
  }
}

module.exports = {
  layout: "palette",
  eleventyComputed: {
    pairs: data => pairs(data.colors),
    summary: data => summary(data.colors),

    slug: data => {
      return data.name.toLowerCase().replace(/ /g, "-")
    },

    permalink: data => {
      fs.ensureDirSync(`./_site/${data.page.fileSlug}`)
      return `${data.page.fileSlug}/index.html`
    }
  }
}

