const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.set('view engine', 'ejs')
app.set('views','views') //explicitly setting the views directory

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'public')))


const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`server started at port ${PORT}`))