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
api.defaults.headers.common['Authorization'] = process.env.SECRET_API;

app.post("/registerCart", async (req, res) => {
    const pratos = ["Prato 01","Prato 02","Prato 03"];
    const bebidas = ["Bebida 01", "Bebida 02", "Bebida 03"];
    const sobremesas = ["Sobremesa 01", "Sobremesa 02", "Sobremesa 03"];
    let category = "";
    const { items } = req.body;
    const products = items.split(',');
  for(let item of products) {
        if(pratos.includes(item.trim()))
            category = "Pratos mais escolhidos";
        else if(bebidas.includes(item.trim())){
            category = "Bebidas mais escolhidas";
        }
        else if(sobremesas.includes(item.trim())){
            category = "Sobremesas mais escolhidas";
        }
        let { data } = await api.post('https://http.msging.net/commands', {
            "id": Math.floor(Date.now() * Math.random()).toString(36),
            "to": "postmaster@analytics.msging.net",
            "method": "set",
            "type": "application/vnd.iris.eventTrack+json",
            "uri": "/event-track",
            "resource": {
                "category": category,
                "action": item.trim()
            }
        });
        console.log(data);
    };
    res.send('Relatórios Criados');
});
