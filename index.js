const { default: axios } = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3000;
const FunctionURL = "https://bu1rajazuredemo.azurewebsites.net/api/funcColorCodeConverter?code=sNoS6-8GlB6-YqXgqhtpfP9MBFfhU3BZ0J6N8kHRz5zYAzFuufjZ3A%3D%3D"
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/convert', async (req, res) => {
    const { hexColor } = req.body;

    if (!hexColor) {
        return res.status(400).send('hexColor is required');
    }

    try{
        const response = await axios.post(FunctionURL, {hexColor});
        console.log(response.data);
        res.send(response.data);
    }catch(err){
        console.log(err);
        res.status(500).send('Error making request to Azure Function');
    }
});


app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});