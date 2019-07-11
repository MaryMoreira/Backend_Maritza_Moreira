/* Http Server con Express */

const express    = require('express'),
      bodyParser = require('body-parser'),
      router     = require('./router');

const PORT    = process.env.PORT || 8002; // definicion del puerto

const app = express(); // crea la instancia de express

app.use(bodyParser.json());  // utiliza json para la comunicacion
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public')); // indica que la carpeta static es la public
app.use('/', router); // coloca los routings a express

// inicializa el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto : ${PORT}`);
})


