const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const { getParams, getItems }  = require('./lib');


// middleware that is specific la solicitud del cliente
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now(), ' Request: ', req.method, req.url, req.body);
    next();
});

// pagina inicial
router.get('/', function(req, res) {
    res.sendFile('im the home page!');
    res.end();
});

// obtiene los parametros de la busqueda
router.post('/params', (req, res) => {
    let data = getParams();
    res.send(data);
    res.end();
});

// obtiene los items de la busqueda
router.post('/items', (req, res) => {
    let data = getItems(req.data);
    console.log("items"), req;
});

module.exports = router;