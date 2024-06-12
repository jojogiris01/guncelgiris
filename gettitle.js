const http = require('http');
const https = require('https');
const { parse } = require('node-html-parser');

// Hedef URL
const url = 'https://www.example.com';

// HTTP GET isteği gönderme fonksiyonu
function fetchTitle(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                const root = parse(data);
                const title = root.querySelector('title').text;
                resolve(title);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Ana fonksiyon
async function main() {
    try {
        const title = await fetchTitle(url);
        console.log('Title:', title);
    } catch (error) {
        console.error('Hata:', error);
    }
}

// Uygulamayı başlat
main();
