const fs = require('fs');

const MIN_PRICE = 0;
const MAX_PRICE = 1;

class DataManager { // clase que maneja los datos de las proiedades

    constructor(){ // constructor
        this.loadData();
    }

    // carga los datos del archivo json
    loadData() {
        let content = fs.readFileSync("server/storage/data.json");
        this._data = JSON.parse(content);

        this._ciudades = [];
        this._tipos    = [];

        this._data.forEach( o => {
            // obtiene las diferentes ciudades de los datos
            if(this._ciudades.find( c => c == o.Ciudad) == undefined){
                this._ciudades.push(o.Ciudad);
            }
            // obtiene los tipos existentes de los datos
            if(this._tipos.find( t => t == o.Tipo) == undefined){
                this._tipos.push(o.Tipo);
            }
            // obtiene el precio como integer
            o._precio = parseInt( o.Precio.replace('$','').replace(',','') );
        });

        this._ciudades.sort();
        this._tipos.sort();

        //console.log("ciudades :", this._ciudades);
        //console.log("tipos :", this._tipos);
        //console.log("all :", this._data);
    }

    // filtra los datos utilizando el query
    filter(query) {
        let isCity, isType, isPrice;

        let prices = query.precio.split(';'); // obtiene el minimo y maximo precio de la consulta
        prices[MIN_PRICE] = parseInt(prices[MIN_PRICE]);
        prices[MAX_PRICE] = parseInt(prices[MAX_PRICE]);

        return DM._data.filter( o => {
                    isCity = query.ciudad == '' ? true : query.ciudad == o.Ciudad;
                    isType = query.tipo   == '' ? true : query.tipo   == o.Tipo;
                    isPrice = o._precio >= prices[MIN_PRICE] && o._precio <= prices[MAX_PRICE];

                    return isCity && isType && isPrice; //  // si es de la ciudad y es del tipo solicitado y es del precio requerido pertenece al filtro
                });
    }
}

// obtiene una instancia de los datos
var DM = new DataManager();


module.exports = {

    // obtiene los parametros de busqueda
    getParams : () => {
        return {
            ciudades : DM._ciudades,
            tipos    : DM._tipos
        }
    },

    // obtiene todos los items
    getAllItems : () => {
        return {
            items : DM._data
        }
    },

    // obtiene los items dependiendo del query
    getItems : (query) => {
        return {
            items : DM.filter(query)
        }
    }
}