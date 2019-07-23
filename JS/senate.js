//MOSTRAR EL CONTENIDO DE UNA TABLA JSON EN HTML (SIN FORMATO)

//var miPre = document.getElementById("datosSenado")
//miPre.innerHTML = JSON.stringify(datosSenate,null,2);


//1 Hemos declarado la variable miPre
//2 Al elemento <pre> le hemos puesto el ID datosSenado en el html. Para llamar a un ID que tengamos en el html se utiliza el método document.getElementById (ID que queremos), por lo tanto miPre = a datosSenado.
//3 Con miPre.innerHTML-->le estamos diciendo que escriba dentro del elemento invocado <pre> que es el que tiene el id datosSenado.
//4 Con = JSON.stringify(datosSenate, null, 2) --> Con JSON.stringify le estamos diciendo que convierta un valor de javascript en una cadena de texto y con (datosSenate, null, 2), datosSenate es el objeto que convertimos, null es no se, y 2 son los espacios en blanco que quieres dejar. 



//INSPECCIONAR ARRAY DATOSSENATE.RESULTS.MEMBERS Y BUSCAR LOS CAMPOS QUE QUEREMOS COMO FIRSTNAME ,PARTY, STATE, SENIORITY... Y CON ELLOS CREAR UNA TABLA E INTRODUCIRLA EN EL HTML. ADEMAS HEMOS CREADO UN LINK CON SUS PAGINAS WEB A TODOS LOS NOMBRES CON EL <A HREF>. (ENTENDER)

//    var members = datosSenate.results[0].members;

var members = [];

function llenarTabla(members) {

    var myHtml = ""

    for (var pos = 0; pos < members.length; pos++) {
        myHtml = myHtml + "<tr>" +
            "<td> <a href = " + members[pos].url + ">" + members[pos].first_name + " " + (members[pos].middle_name || "") + " " + members[pos].last_name + "</a></td>" +
            "<td>" + members[pos].party + "</td>" +
            "<td>" + members[pos].state + "</td>" +
            "<td>" + members[pos].seniority + "</td>" +
            "<td>" + members[pos].votes_with_party_pct + "</td>" +
            "</tr>"

    }

    document.getElementById("datosSenado").innerHTML = myHtml
}

//llenarTabla(members);


//EJEMPLO COMENTADO DE COMO HEMOS HECHO EL SIGUIENTE EJERCICIO


//arreglo.tranformarCadaItem(item :convertir a: item.value)
//    
//var arreglo = [1, 2, 3]
//
//var otroArreglo = arreglo.map(number => number + 2)


function filtraParty() {

    //Con document.queryselectorall (Party-chk (cque es la clase) checked (chequeado) Estamos aislando el valor de cada checkbox cuando esta chekeado.
    var parties = Array.from(document.querySelectorAll('.party-chck:checked')) //(Se crea array con array.form puesto que cabe la posibilidad de seleccionar 2 valores o 3 (Democratas, Republicanos o INdependientes)) 
        .map(checkbox => checkbox.value) //(con el map transformas el array de arriba dependiendo de las casillas chekeadas)


    var filteredMembers = members.filter(member => parties.includes(member.party)); //Va a incluir cada miembro si el checkbox incluye su partido


    llenarTabla(filteredMembers);
}

// Meter dentro de llenarEstados





//objeto Set, que le permite almacenar valores únicos de cualquier tipo. En otras palabras, Set eliminará automáticamente los duplicados por nosotros. Con esto al array creado anteriormente de estados, le eliminamos los duplicados



//Mostrar los estados ( en el menu desplegable creado )

function llenarStados() {
    var filterStates = members.map(member => member.state);
    var states = [...new Set(filterStates)];

    var myHtml = "<option value='all' selected>All</option>"

    for (var pos = 0; pos < states.length; pos++) {
        myHtml = myHtml + "<option value=" + states[pos] + ">" + states[pos] + "</option>"
    }


    document.getElementById("selectEstados").innerHTML = myHtml
}

//llenarStados();

//ESTA FUNCION ESTA COMENTADA POR QUE LA VAMOS A USAR MAS ABAJO PARA QUE LOS 2 FILTROS (ESTADOS Y PARTIDOS) FIUNCIONEN A LA VEZ.


//function filtraStado (){
//    var valorEstado = document.getElementById("selectEstados")
//    
//    var stateValue = valorEstado.value
//        
//    var miembrosFiltrados = members.filter (member => member.state === stateValue)
//   
//    console.log("mfiltrados" , miembrosFiltrados);
//    
//    llenarTabla(miembrosFiltrados)

//}

//CON ESTA FUNCION LO QUE HACEMOS ES QUE LOS 2 FILTROS FUNCIONEN A LA VEZ (ESTADOS Y PARTIDOS DE LOS MIEMBROS)

function ambosFiltros() {

    var parties = Array.from(document.querySelectorAll('.party-chck:checked'))
        .map(checkbox => checkbox.value)

    var valorEstado = document.getElementById("selectEstados")

    var stateValue = valorEstado.value

    var miembrosPorPartido = members.filter(member => parties.includes(member.party))

    console.log("estado:", stateValue)

    if (stateValue === "all") {
        llenarTabla(miembrosPorPartido);
    } else {
        var miembrosPorPartidoYEstado = miembrosPorPartido.filter(member => member.state == stateValue)
        llenarTabla(miembrosPorPartidoYEstado);
    }
}






fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {

    method: "GET",
    headers: {
        'X-API-Key': 'ZPpLZRf8MXWyb7L5Dv79AErqDwJ9KIXvtsNkorsq'
    }
}).then(function (response) {

    if (response.ok) {

        return response.json();
    }

    throw new Error(response.statusText);
}).then(function (json) {

    datosSenate = json;

    members = datosSenate.results[0].members;

    llenarTabla(members);

    llenarStados();

    ambosFiltros();

    console.log(datosSenate);


}).catch(function (error) {
    console.log("Request failed: " + error.message);
});