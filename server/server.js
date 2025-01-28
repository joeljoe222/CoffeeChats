const express = require("express"); // instance of framework express
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


const app = express(); // instance of const express
const port = 3001;

const database = require('./database')

// store input from frontend and send to database 

app.get('/images/:filename', (req, res)=> {

})
app.get("/posts", (req, res) => {
    database.getPosts((error, posts)=>{
    if (error){
        res.send({error: error.message})
        return
    }   
    res.send({posts})
    })
})



app.post("/posts", upload.single('image'),(req, res) => {
    const {filename, path} = req.file; // from mutler
    const description = req.body.description

    const image_url = `/images/${filename}`;
    // save to database
        database.createPost(description, `/images/${filename}`, (error, insertID) => {
        if (error){
            res.send({error: error.message})
            return
        }
        res.send({
            id: insertID,
            description,
            image_url 
        })
    })

})

// listening on port 3001
app.listen(port,() => {
    console.log(`Example app listening on port http://127.0.0.1:${port}/`);
});


