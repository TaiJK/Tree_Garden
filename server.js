const express = require('express')
const app = express()

//
app.get('/',(req,res) => {
    res.send('Hello client!')
})

app.listen(3000,() => { 
    console.log(' Node js file is runnig on port 3000')
})