import React from "react";
import DefinitionList from "../_includes/definition-list";

export default function Home({
  title,
  description,
  collections,
}: Layout<Home>): React.ReactElement {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="style.scss" />
        <title>contrast</title>
      </head>
      <body>
        <main>
          <header>
            <h1>{title}</h1>
            <p>{description}</p>
          </header>

          <DefinitionList
            items={collections.palettes.map((palette) => ({
              termHref: `/${palette.fileSlug}`,
              termText: palette.data.name,
              detailsText: palette.data.description,
            }))}
          />
        </main>
      </body>
    </html>
  );
}
