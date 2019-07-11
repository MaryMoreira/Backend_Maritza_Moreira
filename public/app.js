/* Modulo que permite buscar propiedades solicitandolas al servidor mediante ajax*/

// inicializador del elemento Slider
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

// viusaliza o no la busqueda personalizada y captura el click al hacer una busqueda
function setSearch() {
  let busqueda     = $('#checkPersonalizada')
  let selectItems  = $("select");
  let customSearch = false;

  // atiende cuando cambia el valor de la busqueda personalizada o no
  busqueda.on('change', (e) => {
    if (customSearch) {
      selectItems.css('display','node');
      customSearch = false
    } else {
      selectItems.css('display','inline');
      customSearch = true
    }
    $('#personalizada').toggleClass('invisible')
  })

  // atiende al boton buscar (si se da click en el boton)
  $('#buscar').click( (e) => {
    let query;
    // obtiene el query a enviar al servidor
    if(customSearch){
      query = { custom: true,
                ciudad: $('#ciudad').val(),
                tipo: $('#tipo').val(),
                precio: $('#rangoPrecio').val() };
    }else{
      query = { custom: false }; // todos los items
    }

    // envia la solicitud de los items(propiedades)
    sendRequest('/items', query, (dataRes) => {
      renderPropiedades(dataRes); // renderiza los datos de las propiedades
    })
  });
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

// coloca los tipos  obtenidos del servidor
function renderTipos(tipos){
  let htmlTipos = $('#tipo');
  tipos.forEach( o =>  htmlTipos.append(`<option value="${o}">${o}</option>`) );
}

// coloca las propiedades obtenidas en la busqueda
function renderPropiedades(data){
  let items = [];
  let listaItems = $('.lista');

  if(data && data.items){ // si los datos no vienen correctamente
    items = data.items;
  }

  listaItems.empty(); // limpia los elementos

  items.forEach( o => {  // colocamos los elementos obtenidos en el servidor
    listaItems.append(`
          <div class="card horizontal">
            <div class="card-image">
              <img src="img/home.jpg">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <div>
                  <b>Direccion: </b>${o.Direccion}<p></p>
                </div>
                <div>
                  <b>Ciudad: </b>${o.Ciudad}<p></p>
                </div>
                <div>
                  <b>Telefono: </b>${o.Telefono}<p></p>
                </div>
                <div>
                  <b>Código postal: </b>${o.Codigo_Postal}<p></p>
                </div>
                <div>
                  <b>Precio: </b>${o.Tipo}<p></p>
                </div>
                <div>
                  <b>Tipo: </b>${o.Precio}<p></p>
                </div>
              </div>
              <div class="card-action right-align">
                <a href="#">Ver más</a>
              </div>
            </div>
          </div>
    `);
  })
}

// inicia el ambiente del cliente
function init(){
  initSlider();
  setSearch();
  getSearchParams();
}

// inicializa el ambiente
init();