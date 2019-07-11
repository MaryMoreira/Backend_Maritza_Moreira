const express    = require('express');
const router     = express.Router();
const { getParams, getItems, getAllItems }  = require('./lib');


// middleware that is specific la solicitud del cliente
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now(), ' Request: ', req.method, req.url, req.body);
    next();
});

// obtiene los parametros de la busqueda
router.post('/params', (req, res) => {
    res.send(getParams()); // envia los parametros de busqueda
    res.end();
});

// obtiene los items de la busqueda
router.post('/items', (req, res) => {
    let query = req.body;
    if(query.custom == 'true'){
        res.send( getItems(query) ); // obtiene los items dependiendo el query enviado por el cliente
    }else{
        res.send( getAllItems() );   // obtiene todos los items
    }
    res.end();
});

module.exports = router;