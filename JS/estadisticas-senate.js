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

//var membersssSenate = datosSenate.results[0].members; 

var membersssSenate = [];


var filtroPorPartidoDsenate = [];
var filtroPorPartidoRsenate = [];
var filtroPorPartidoIsenate = [];

function filtrosPorPartys() {

    filtroPorPartidoDsenate = membersssSenate.filter(member => member.party === "D");
    console.log(filtroPorPartidoDsenate);

    filtroPorPartidoRsenate = membersssSenate.filter(member => member.party === "R");
    console.log(filtroPorPartidoRsenate);

    filtroPorPartidoIsenate = membersssSenate.filter(member => member.party === "I");
    console.log(filtroPorPartidoIsenate);


    document.getElementById("senateRepublicans").innerHTML = filtroPorPartidoRsenate.length;
    document.getElementById("senateDemocrats").innerHTML = filtroPorPartidoDsenate.length;
    document.getElementById("senateIndependents").innerHTML = filtroPorPartidoIsenate.length;

}

//filtrosPorPartys();

var divisionRepublican = filtroPorPartidoRsenate.reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / filtroPorPartidoRsenate.length;
var divisionDemocrat = filtroPorPartidoDsenate.reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / filtroPorPartidoDsenate.length;
var divisionIndependent = filtroPorPartidoIsenate.reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / filtroPorPartidoIsenate.length;
var diezxCiento = [];
var porcentage = [];


function divisionAttSenate() {

    divisionRepublican = filtroPorPartidoRsenate.reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / filtroPorPartidoRsenate.length;


    document.getElementById("pctRepSenate").innerHTML = divisionRepublican.toFixed(2);


    divisionDemocrat = filtroPorPartidoDsenate.reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / filtroPorPartidoDsenate.length;

    console.log(divisionDemocrat);

    document.getElementById("pctDemSenate").innerHTML = divisionDemocrat.toFixed(2);


    divisionIndependent = filtroPorPartidoIsenate.reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / filtroPorPartidoIsenate.length;

    console.log(divisionIndependent);

    document.getElementById("pctIndSenate").innerHTML = divisionIndependent.toFixed(2);
    
}

//divisionAttSenate();

function llenarTablaAttSenate() {

    var myHtml1 = ""

    for (var pos = 0; pos < porcentage.length; pos++) {
        myHtml1 = myHtml1 + "<tr>" +
            "<td><a href = " + porcentage[pos].url + ">" + porcentage[pos].first_name + " " + (porcentage[pos].middle_name || "") + " " + porcentage[pos].last_name + "</a></td>" +
            "<td>" + porcentage[pos].missed_votes + "</td>" +
            "<td>" + porcentage[pos].missed_votes_pct.toFixed(2) + "</td>" +
            "</tr>"

    }

    document.getElementById("datosHousess").innerHTML = myHtml1
}

llenarTablaAttSenate();


var reversed = membersssSenate.reverse();
var porcentageTop = [];

function llenarTablaAttSenate2() {

    var myHtml2 = ""

    porcentageTop.reverse();

    for (var pos = 0; pos < porcentageTop.length; pos++) {
        myHtml2 = myHtml2 + "<tr>" +
            "<td><a href = " + porcentageTop[pos].url + ">" + porcentageTop[pos].first_name + " " + (porcentageTop[pos].middle_name || "") + " " + porcentageTop[pos].last_name + "</a></td>" +
            "<td>" + porcentageTop[pos].missed_votes + "</td>" +
            "<td>" + porcentageTop[pos].missed_votes_pct.toFixed(2)+ "</td>" +
            "</tr>"

    }

    document.getElementById("datosSenatess").innerHTML = myHtml2

}

function ordenarMiembrosAttSenate(miembros){
    return miembros.slice().sort(function (b, a) {
        return (a.missed_votes_pct - b.missed_votes_pct)
    })
    
    
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

    membersssSenate = datosSenate.results[0].members;

    filtroPorPartidoDsenate = membersssSenate.filter(member => member.party === "D");

    filtroPorPartidoRsenate = membersssSenate.filter(member => member.party === "R");

    filtroPorPartidoIsenate = membersssSenate.filter(member => member.party === "I");
    
    miembrosOrdenadosSen = ordenarMiembrosAttSenate(membersssSenate);

    diezxCiento = membersssSenate.length * 10 / 100;

    porcentage = miembrosOrdenadosSen.slice(0, diezxCiento);

    porcentageTop = miembrosOrdenadosSen.slice().reverse().slice(0, diezxCiento).reverse()
    
    filtrosPorPartys();

    divisionAttSenate();

    llenarTablaAttSenate();

    llenarTablaAttSenate2();


}).catch(function (error) {
    console.log("Request failed: " + error.message);
});