const { readFileSync, writeFileSync } = require('node:fs')
const { resolve } = require('node:path')

const ghpageScript = `
<!-- Start Single Page Apps for GitHub Pages -->
<script type="text/javascript">
  // Single Page Apps for GitHub Pages
  // MIT License
  // https://github.com/rafgraph/spa-github-pages
  // This script checks to see if a redirect is present in the query string,
  // converts it back into the correct url and adds it to the
  // browser's history using window.history.replaceState(...),
  // which won't cause the browser to attempt to load the new url.
  // When the single page app is loaded further down in this file,
  // the correct url will be waiting in the browser's history for
  // the single page app to route accordingly.
  ;(function (l) {
    if (l.search[1] === '/') {
      var decoded = l.search
        .slice(1)
        .split('&')
        .map(function (s) {
          return s.replace(/~and~/g, '&')
        })
        .join('?')
      window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash)
    }
  })(window.location)
</script>
<!-- End Single Page Apps for GitHub Pages -->
`

const indexHtmlPath = resolve(__dirname, '../dist/index.html')
const indexHtml = readFileSync(indexHtmlPath, 'utf-8')

writeFileSync(
  indexHtmlPath,
  indexHtml
    .replace(/<title>.*<\/title>/, '<title>Idux Archive</title>')
    .replace(/(.*)<\/head>/, (_, $1) => `${$1}${ghpageScript}</head>`),
)
