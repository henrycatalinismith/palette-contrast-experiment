import React from "react"

export default function Palette({
  name,
  description,
  colors,
  pairs,
  summary,
}: Layout<Palette>): React.ReactElement {
  let offset = 25
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="stylesheet"
          href="style.scss"
        />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            ${colors.map((color, i) => `
              --display-${color.label}: ${i === 0 ? "grid" : "none"};
            `).join("")}
          }
          ${colors.map((color, i) => `
            tr[data-bg="${color.label}"] {
              display: var(--display-${color.label});
            }
          `).join("")}
        ` }} />
        <title>
          {name}
        </title>
      </head>
      <body>
        <main>

          <header className="palette-header">
            <h1>
              {name}
            </h1>

            <p>
              {description}
            </p>
          </header>

          <section className="palette-score">
            <svg className="summary" viewBox="4 4 40 40">
              <circle r="15.915" cx="24" cy="24" fill="white" />
              {Object.entries(summary.scores).map(([label, count]: [string, number]) => {
                const p = count / summary.total * 100
                const circle = (
                  <circle
                    key={label}
                    className={`summary-${label.replace(/ /g, "").toLowerCase()}`}
                    r="15.915"
                    cx="24"
                    cy="24"
                    strokeDasharray={`${p} ${100 - p}`}
                    strokeDashoffset={offset}
                  />
                )
                offset = offset + (100 - p)
                return circle
              })}
            </svg>

            <table className="palette-scores">
              <thead>
                <tr>
                  <th>Rating</th>
                  <th>Pairs</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(summary.scores).map(([label, count]: [string, number]) => (
                  <tr key={label}>
                    <td className="palette-score-label" data-rating={label}>
                      {label}
                    </td>
                    <td>{count / 2}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </section>

          <ol className="palette">
            {colors.map((color, i) => (
              <li className="palette-item" data-i="{{ i }}" key={i}>
                <input
                  className="palette-button"
                  type="radio"
                  id={color.label}
                  name="color"
                  value={color.label}
                  style={{ backgroundColor: color.value }}
                  checked={i === 0}
                  readOnly
                  aria-label={color.label}
                />
              </li>
            ))}
          </ol>

          <table className="pairs">
            <tbody>
              {pairs.map((pair, i) => (
                <tr data-bg={pair.bg.label} className="pair" key={i}>
                  <td
                    className="pair-sample"
                    style={{ backgroundColor: pair.bg.value, color: pair.fg.value }}>
                    ABC
                  </td>
                  <td className="pair-label">
                    {pair.fg.label}
                    ({pair.ratio})
                  </td>
                  <td className="pair-rating" data-rating={pair.label}>
                    {pair.label}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <script id="colors" type="application/json" dangerouslySetInnerHTML={{
            __html: JSON.stringify(colors),
          }} />

          <script dangerouslySetInnerHTML={{ __html: `
            const colors = JSON.parse(
              document.querySelector("#colors").innerText
            )

            function filter(label) {
              colors.forEach(color => {
                document.documentElement.style.setProperty(
                  \`--display-\${color.label}\`,
                  "none",
                )
              })

              document.documentElement.style.setProperty(
                \`--display-\${label}\`,
                "grid"
              )
            }

            document.addEventListener("DOMContentLoaded", () => {
              document
                .querySelectorAll(".palette-button")
                .forEach(button => button.addEventListener("change", function() {
                  filter(this.value)
                }))
            })
          ` }} />

        </main>
      </body>
    </html>
  )
}
