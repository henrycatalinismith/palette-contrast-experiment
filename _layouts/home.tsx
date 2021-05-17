import React from "react"
import DefinitionList from "../_includes/definition-list"

export default function Home(props: any): React.ReactElement {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <link
          rel="canonical"
          href="https://hen.cat/contrast/"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="stylesheet"
          href="style.scss"
        />
        <title>
          contrast
        </title>
      </head>
      <body>
        <main>
          <header>
            <h1>
              {props.title}
            </h1>
            <p>
              {props.description}
            </p>
          </header>

          <DefinitionList
            items={props.collections.palettes.map(palette => ({
              termHref: `/${palette.data.slug}`,
              termText: palette.data.name,
              detailsText: palette.data.description
            }))}
          />
        </main>
      </body>
    </html>
  )
}
  