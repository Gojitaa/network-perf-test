const express = require('express')
const db = require('./db/emoji.json')
const fs = require('fs')
const spdy = require('spdy')
const path = require('path')

const app = express()
const staticPath = path.join(__dirname, '../dist')

app.use(express.static(staticPath, {
  etag: true, 
  lastModified: false,
  setHeaders: (res, path) => {
	if (path.endsWith('.js')) {
		res.setHeader('Cache-Control', 'max-age=31536000');
    }

	if(path.endsWith('.html')) {
		res.setHeader('Cache-Control', 'no-cache');	
	}
  },
}))

app.get('/', async (_, response) => {
	if(!response.push) {
		return;
	}
	const jsFile = 'index.bb0033a5.js'
	const file = await fs.readFile(`../dist/${jsFile}`)
	response.push(jsFile, {}).end(file)
});

app.get('/api/emojies/:emojiName', (request, response) => {
	const { emojiName } = request.params

	response.setHeader('Cache-Control', 'no-store')
	const foundEmoji = Object.keys(db).find(name => name === emojiName)

	response.json({ name: emojiName, url: db[foundEmoji] })
});

const PORT = process.env.PORT || 3000;
// uncomment for HTTP 1.1
/*app.listen(PORT, function() {
  console.log(`Server is on port ${PORT}`)
});*/

// comment to disable HTTP2
spdy.createServer(
  {
    key: fs.readFileSync("./example2_server/cert.key"),
    cert: fs.readFileSync("./example2_server/cert.crt")
  },
  app
).listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
