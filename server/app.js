const express = require("express"); // instance of framework express
const app = express(); // instance of const express
const port = 3001;

app.get("/",(req,res)=>{
    res.send(home.html);
})

// listening on port 3001
app.listen(port,() => {
    console.log(`Example app listening on port http://127.0.0.1:${port}/`);
});

// database
