const express = require('express');
const axios = require('axios');
const app = express();
const https = require('https')
const port = process.env.PORT;

app.use(express.json());
app.listen(port, () => {
    console.log("server is running");
});

const api = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})


app.post("/registerCart", async (req, res) => {
    const { items, apiKey } = req.body;
    api.defaults.headers.common['Authorization'] = apiKey;
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
                "category": "Pratos mais escolhidos",
                "action": item.trim()
            }
        });
        console.log(data);
    };
    res.send(data.json());
});
