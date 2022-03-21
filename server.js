const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const memberRoute = require('./routes/routes')

const app = express()
app.set('view engine', 'ejs')
app.set('views','views') //explicitly setting the views directory

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'public')))

app.use('/api/members',memberRoute)

app.use((req,res) => {
    res.status(404).send('<h1>Error 404</h1>')
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`server started at port ${PORT}`))