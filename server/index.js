/* Http Server */

const path       = require('path'),
      express    = require('express'),
      bodyParser = require('body-parser'),
      router     = require('./router');

const PORT    = process.env.PORT || 8002; // definicion del puerto

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto : ${PORT}`);
})


