const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const port = process.env.PORT || 9000;   // Define el puerto 9000 o el que nos sirva un servicio de cloud en el caso de subirlo
const dotenv = require('dotenv').config();
const methodOverride = require('method-override')
const morgan = require('morgan')
const ejsMate = require('ejs-mate')

const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


// Importing router (characters)
const useRouter = require('./router/houseRoutes')

// Middlewares
app.use(morgan('tiny'))
app.use(methodOverride('_method')) // Activamos el override para el method de los form
app.use(express.json()); // Activamos el Json
app.use(express.urlencoded({extended:true})) // Activamos los datos por formulario
app.use(express.static('public')) // Le decimos dónde están los archivos estáticos
app.use('', useRouter); // Establecemos el router

// App setting EJS files directory
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


mongoose.connect('mongodb://0.0.0.0:27017/airbnb', connectOptions)
const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", () => {
    console.log("Database connected")
})

app.listen(port, () => console.log(`Connected on http://localhost:${port}`))  //Conectamos el puerto a través de la variable port