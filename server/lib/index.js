const fs = require('fs');

class DataManager { // datos

    constructor(){
        this.loadData();
    }

    // carga los datos del archivo com9o json
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

        console.log("ciudades :", this._ciudades);
        console.log("tipos :", this._tipos);
        //console.log("all :", this._data);
    }
}

// obtiene una instancia de los datos
var DM = new DataManager();


module.exports = {

    getParams : () => {
        return {
            ciudades : DM._ciudades,
            tipos    : DM._tipos
        }
    },

    getItems : (req) => {

    }
}