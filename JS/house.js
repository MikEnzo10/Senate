//var miPre = document.getElementById("datosCamara")
//miPre.innerHTML = JSON.stringify(datosHouse,null,2);

//var memberss = datosHouse.results[0].members;

var memberss = []

function llenarTabla(memberss) {




    var myHtml = ""

    for (var pos = 0; pos < memberss.length; pos++) {
        myHtml = myHtml + "<tr>" +
            "<td> <a href = " + memberss[pos].url + ">" + memberss[pos].first_name + " " + (memberss[pos].middle_name || "") + " " + memberss[pos].last_name + "</a></td>" +
            "<td>" + memberss[pos].party + "</td>" +
            "<td>" + memberss[pos].state + "</td>" +
            "<td>" + memberss[pos].seniority + "</td>" +
            "<td>" + memberss[pos].votes_with_party_pct + "</td>" +
            "</tr>"

    }

    document.getElementById("datosHouses").innerHTML = myHtml
}

//llenarTabla(memberss);







//objeto Set, que le permite almacenar valores únicos de cualquier tipo. En otras palabras, Set eliminará automáticamente los duplicados por nosotros.



function llenarStadosHouse() {
    var filterStatesHouse = memberss.map(member => member.state);

    var states = [...new Set(filterStatesHouse)];

    var myHtml = "<option value='all' selected>All</option>"

    for (var pos = 0; pos < states.length; pos++) {
        myHtml = myHtml + "<option value=" + states[pos] + ">" + states[pos] + "</option>"
    }


    document.getElementById("selectEstadosHouse").innerHTML = myHtml
}

//llenarStadosHouse();

function ambosFiltrosHouse() {

    var partiesHouse = Array.from(document.querySelectorAll('.party-chck-house:checked'))
        .map(checkbox => checkbox.value)


    var valorEstado = document.getElementById("selectEstadosHouse")

    var stateValue = valorEstado.value

    var miembrosPorPartido = memberss.filter(member => partiesHouse.includes(member.party))

    console.log("estado:", stateValue)

    if (stateValue === "all") {
        llenarTabla(miembrosPorPartido);
    } else {
        var miembrosPorPartidoYEstado = miembrosPorPartido.filter(member => member.state == stateValue)
        llenarTabla(miembrosPorPartidoYEstado);
    }
}


fetch("https://api.propublica.org/congress/v1/113/house/members.json", {

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

    datosHouse = json;

    memberss = datosHouse.results[0].members;

    llenarTabla(memberss);

    llenarStadosHouse();

    ambosFiltrosHouse();

    console.log(datosHouse);


}).catch(function (error) {
    console.log("Request failed: " + error.message);
});