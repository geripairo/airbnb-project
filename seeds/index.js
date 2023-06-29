const mongoose = require('mongoose')
const House = require('../models/house');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


mongoose.connect('mongodb://0.0.0.0:27017/airbnb', connectOptions)
const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", () => {
    console.log("Database connected")
})

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

// FUNCIÓN PARA HACER EL SEED DE LAS CASAS CON BUCLE
const seedDB = async() => {
    await House.deleteMany({});
    for (let i = 0; i<30; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 50 + 10)
        const house = new House({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: await seedImage(),
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem iusto dignissimos exercitationem architectosed voluptates cumque, in eius dolores nostrum ratione. Aliquid nostrum numquam nobis consectetur evenietvoluptatum exercitationem tempore?',
            price

        })
        await house.save();
    }
}

// FUNCIÓN PARA TOMAR IMÁGENES (UNSPLASH API)
async function seedImage() {
    const client_id = '?client_id=beYX72K4KHkCAZuaakBJXF0fHFYhqSooyIEDxYqFKyw'
    const collection = '&query=airbnb-house'
    try{
        const res = await fetch(`https://api.unsplash.com/photos/random/${client_id}${collection}`)        
        const data = await res.json()
        return data.urls.regular
    }
    catch (err) {
        console.error(err)
    }
  }

//   LLAMAMOS AL SEED Y EJECUTAMOS LA FUNCIÓN
seedDB().then(() => {mongoose.connection.close()});