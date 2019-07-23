var statistics = [
    {
        "id": "Republicans",
        "numberOfRepsR": null,
        "VotedWithParty": null,
        "averageComparisonVotingWithParty": null,
        "doNotVoteWithParty": null,
        "doVoteWithParty": null,
        "missedMostVotes": null,
        "missedLeastVotes": null
        },
    {
        "id": "Democrats",
        "numberOfRepsD": null,
        "VotedWithParty": null,
        "averageComparisonVotingWithParty": null,
        "doNotVoteWithParty": null,
        "doVoteWithParty": null,
        "missedMostVotes": null,
        "missedLeastVotes": null
        },
    {
        "id": "Independents",
        "numberOfRepsI": null,
        "VotedWithParty": null,
        "averageComparisonVotingWithParty": null,
        "doNotVoteWithParty": null,
        "doVoteWithParty": null,
        "missedMostVotes": null,
        "missedLeastVotes": null
        }
   ]


//var membersss = datosHouse.results[0].members; 

var membersss = [];
var filtroPorPartidoD = [];
var filtroPorPartidoR = [];
var filtroPorPartidoI = [];
var divisionDemocratHouse = [];
var divisionRepublicHouse = [];
var diezxCientos = [];
var porcentageBot = [];
var porcentageTopHouse = [];



function filtrosPorPartido() {

    filtroPorPartidoD = membersss.filter(member => member.party === "D");
    filtroPorPartidoR = membersss.filter(member => member.party === "R");
    filtroPorPartidoI = membersss.filter(member => member.party === "I");

    document.getElementById("numberRepublican").innerHTML = filtroPorPartidoR.length;
    document.getElementById("numberDemocrat").innerHTML = filtroPorPartidoD.length;
    //document.getElementById("numberIndependent").innerHTML = filtroPorPartidoI.length;
}

//filtrosPorPartido();

function divisionHouse() {

    divisionDemocratHouse = filtroPorPartidoD.reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / filtroPorPartidoD.length;

        document.getElementById("pctDem").innerHTML = divisionDemocratHouse.toFixed(2);

    divisionRepublicHouse = filtroPorPartidoR.reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / filtroPorPartidoR.length;

        document.getElementById("pctRep").innerHTML = divisionRepublicHouse.toFixed(2);
}

//divisionHouse();

function llenarTablaAttHouse() {

    var myHtml3 = ""

    for (var pos = 0; pos < porcentageBot.length; pos++) {
        myHtml3 = myHtml3 + "<tr>" +
            "<td><a href = " + porcentageBot[pos].url + ">" + porcentageBot[pos].first_name + " " + (porcentageBot[pos].middle_name || "") + " " + porcentageBot[pos].last_name + "</a></td>" +
            "<td>" + porcentageBot[pos].missed_votes + "</td>" +
            "<td>" + porcentageBot[pos].missed_votes_pct.toFixed(2) + "</td>" +
            "</tr>"
    }
    document.getElementById("SenateBot").innerHTML = myHtml3
}

//llenarTablaAttHouse();

function llenarTablaAttHouse2() {

    var myHtml4 = ""


    for (var pos = 0; pos < porcentageTopHouse.length; pos++) {
        myHtml4 = myHtml4 + "<tr>" +
            "<td><a href = " + porcentageTopHouse[pos].url + ">" + porcentageTopHouse[pos].first_name + " " + (porcentageTopHouse[pos].middle_name || "") + " " + porcentageTopHouse[pos].last_name + "</a></td>" +
            "<td>" + porcentageTopHouse[pos].missed_votes + "</td>" +
            "<td>" + porcentageTopHouse[pos].missed_votes_pct.toFixed(2) + "</td>" +
            "</tr>"
    }
    document.getElementById("datosLeastHouse").innerHTML = myHtml4

}

//llenarTablaAttHouse2();

function ordenarMiembrosAttHouse(miembros){

 return miembros.slice().sort(function (a, b) {
        return (a.missed_votes_pct - b.missed_votes_pct)
    })
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

    membersss = datosHouse.results[0].members;

    filtroPorPartidoD = membersss.filter(member => member.party === "D");

    filtroPorPartidoR = membersss.filter(member => member.party === "R");

    filtroPorPartidoI = membersss.filter(member => member.party === "I");
    
    miembrosOrdenadosAttHouse = ordenarMiembrosAttHouse(membersss)

    diezxCientos = membersss.length * 10 / 100;

    porcentageBot = miembrosOrdenadosAttHouse.slice(0, diezxCientos);

    porcentageTopHouse = miembrosOrdenadosAttHouse.slice().reverse().slice(0, diezxCientos);

    filtrosPorPartido();

    divisionHouse();

    llenarTablaAttHouse();

    llenarTablaAttHouse2();

}).catch(function (error) {
    console.log("Request failed: " + error.message);
});