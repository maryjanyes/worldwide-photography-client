const htmlTemplate = (bundleName = './bundle.js') => `
  <!DOCTYPE html>
  <html>
      <head>
        <title>WorldwidePhotography</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="assets/images/logo.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
      </head>
      <body>
        <div id="root"></div>
        <script src="${bundleName}"></script>
      </body>
  </html>
  `

module.exports = htmlTemplate
