const fs = require("fs");
const path = require("path");

function buildList(dir, prefix) {
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".html"))
    .sort()
    .map(f => {
      const filePath = path.join(dir, f);
      const html = fs.readFileSync(filePath, "utf8");

      let title = html.match(/<title>(.*?)<\/title>/i)?.[1];
      if (!title) title = html.match(/<h1[^>]*>(.*?)<\/h1>/i)?.[1];
      if (!title) title = f.replace(".html", "").replace(/-/g, " ");

      return `<li><a href="${prefix}/${f}">${title}</a></li>`;
    })
    .join("\n");
}

const ramblingsList = buildList("./bible/articles", "articles");
let ramblingsPage = fs.readFileSync("./bible/ramblings.html", "utf8");
ramblingsPage = ramblingsPage.replace("<!-- RAMBLINGS -->", ramblingsList);
fs.writeFileSync("./bible/ramblings.html", ramblingsPage);

const studiesList = buildList("./bible/studies", "studies");
let studiesPage = fs.readFileSync("./bible/studies.html", "utf8");
studiesPage = studiesPage.replace("<!-- STUDIES -->", studiesList);
fs.writeFileSync("./bible/studies.html", studiesPage);

console.log("ramblings.html and studies.html updated");
