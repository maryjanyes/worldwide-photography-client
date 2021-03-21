const htmlTemplate = (bundleName = './bundle.js') => `
  <!DOCTYPE html>
  <html>
      <head>
        <title>WorldwidePhotography.com | Photo contests</title>
        <link rel="icon" href="assets/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id="root"></div>
        <script src="${bundleName}"></script>
      </body>
  </html>
  `

module.exports = htmlTemplate
