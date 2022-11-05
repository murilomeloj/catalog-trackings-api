const express = require('express');
const axios = require('axios');
const app = express();
const https = require('https')
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
    console.log("server is running");
});

const api = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})
api.defaults.headers.common['Authorization'] = process.env.SECRET_API || "Key dGFrZWJsaXBjZGEyOm44NEF6RG14UlBCb1h1UzJHRmY1";

app.post("/registerCart", async (req, res) => {
    const { items } = req.body;
    const products = items.split(',');
    console.log(products.length);
  for(let item of products) {
        let { data } = await api.post('https://http.msging.net/commands', {
            "id": Math.floor(Date.now() * Math.random()).toString(36),
            "to": "postmaster@analytics.msging.net",
            "method": "set",
            "type": "application/vnd.iris.eventTrack+json",
            "uri": "/event-track",
            "resource": {
                "category": "testeApiMuriloNumeroFim",
                "action": item.trim()
            }
        });
        console.log(data);
    };
    res.send('Relatórios Criados');
});