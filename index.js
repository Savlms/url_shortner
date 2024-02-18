const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const urlDatabase = {};

app.get('/:shortUrl', (req, res) => {
    const { shortUrl } = req.params;
    const longUrl = urlDatabase[shortUrl];

    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.post('/shorten', (req, res) => {
    const { longUrl } = req.body;

    if (isValidUrl(longUrl)) {
        const shortUrl = shortid.generate();
        urlDatabase[shortUrl] = longUrl;
        res.json({ shortUrl });
    } else {
        res.status(400).json({ error: 'Invalid URL' });
    }
});

function isValidUrl(url) {
    // Simple URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
