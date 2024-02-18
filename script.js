async function shortenUrl() {
    const longUrl = document.getElementById('urlInput').value;
    const response = await fetch('/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
    });

    const data = await response.json();
    document.getElementById('shortUrl').innerText = `Short URL: ${window.location.origin}/${data.shortUrl}`;
}