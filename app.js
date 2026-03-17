const express = require("express")

const app = express()

app.get("/", () => {
    res.send("Hello Backend from Ayush");
});

app.listen(3000, () => {
    console.log("Server running on port 3000")
})