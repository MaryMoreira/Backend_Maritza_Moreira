
var customSearch = false;

//Inicializador del elemento Slider
function initSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 1000,
    to: 20000,
    prefix: "$"
  })
}

// setea la visibilidad de la busqueda
function setSearch() {
  let busqueda = $('#checkPersonalizada')
  let selectItems = $("select");
  // atiende cuando cambia el valor del check
  busqueda.on('change', (e) => {
    if (customSearch == false) {
      selectItems.css('display','inline');
      this.customSearch = true
    } else {
      selectItems.css('display','node');
      customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

// funcion que envia la peticion al servidor mediante ajax
function sendRequest(url, data, done){
    $.ajax({
      url : url,
      method: "POST",
      data: data
    }).done( (msg) => {
        done(msg);
    }).fail( (jqXHR, txtStatus) => {
        console.erro("ERROR", txtStatus);
    });
}

// obtiene los parametros de busqueda del servidor (ciudad y tipos)
function getSearchParams(){
  sendRequest('/params', { name: 'param search'}, (data) => {
      if(data){ // si existe datos
        if(data.ciudades) renderCiudades(data.ciudades);
        if(data.tipos) renderTipos(data.tipos);
      }
  });
}

// coloca las ciudades obtenidas del servidor
function renderCiudades(ciudades){
  let htmlCiudades = $('#ciudad');
  ciudades.forEach( o =>  htmlCiudades.append(`<option value="${o}">${o}</option>`) );
}

// coloca llos tipos  obtenidos del servidor
function renderTipos(tipos){
  let htmlTipos = $('#tipo');
  tipos.forEach( o =>  htmlTipos.append(`<option value="${o}">${o}</option>`) );
}

// inicia el ambiente del cliente
function init(){
  initSlider();
  setSearch();
  getSearchParams();
}


// si se da click en el boton
$('#buscar').click( (e) => {

  if(customSearch){

  }else{

  }

});


// inicializa el ambiente
init();