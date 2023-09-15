const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

// app.get('/',(req,res)=>{
//     console.log("hii")
//     res.render('index.html')
// })


app.post('/submit', (req, res) => {
    const formData = req.body;
    console.log(formData);

    fetchExternalAPI(formData)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error("Error:", error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

async function fetchExternalAPI(formData) {
    try {
        const response = await fetch("https://forms.maakeetoo.com/formapi/367", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Code": "BQUH7K8YDCEQMV03XL9RHHJYD",
                credentials: 'include'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Failed to fetch external API: ${response.statusText}`);
        }
    } catch (error) {
        throw error;
    }
}

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});