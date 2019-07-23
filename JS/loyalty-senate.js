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

//var membersLoyaltySenate = datosSenate.results[0].members;

var membersLoyaltySenate = [];
var filtroPartidoLoySenD = [];
var filtroPartidoLoySenR = [];
var filtroPartidoLoySenI = [];


function filtrosPorPartidoLoySen() {

    filtroPartidoLoySenD = membersLoyaltySenate.filter(member => member.party === "D");
    filtroPartidoLoySenR = membersLoyaltySenate.filter(member => member.party === "R");
    filtroPartidoLoySenI = membersLoyaltySenate.filter(member => member.party === "I");

    document.getElementById("loyaltySenDem").innerHTML = filtroPartidoLoySenD.length;
    document.getElementById("loyaltySenRep").innerHTML = filtroPartidoLoySenR.length;
    document.getElementById("loyaltySenInd").innerHTML = filtroPartidoLoySenI.length;
}

//filtrosPorPartidoLoySen();

var divisionRepublicanLoySen = [];
var divisionDemocratLoySen = [];
var divisionIndependentLoySen = [];
var diezxCientoLoySen = [];
var porcentageLoySen = [];
var porcentageBotSenate = [];


function divisionLoySen() {

    divisionRepublicanLoySen = filtroPartidoLoySenR.reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / filtroPartidoLoySenR.length;

        document.getElementById("pctLoySenR").innerHTML = divisionRepublicanLoySen.toFixed(2);

    divisionDemocratLoySen = filtroPartidoLoySenD.reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / filtroPartidoLoySenD.length;

        document.getElementById("pctLoySenD").innerHTML = divisionDemocratLoySen.toFixed(2);

    divisionIndependentLoySen = filtroPartidoLoySenI.reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / filtroPartidoLoySenI.length;

        document.getElementById("pctLoySenI").innerHTML = divisionIndependentLoySen.toFixed(2);

}

//divisionLoySen();

function llenarTablaLoySen() {

    var myHtml7 = ""
    

    for (var pos = 0; pos < porcentageLoySen.length; pos++) {

        myHtml7 = myHtml7 + "<tr>" +
            "<td><a href = " + porcentageLoySen[pos].url + ">" + porcentageLoySen[pos].first_name + " " + (porcentageLoySen[pos].middle_name || "") + " " + porcentageLoySen[pos].last_name + "</a></td>" +
            "<td>" + Math.round(porcentageLoySen[pos].total_votes * porcentageLoySen[pos].votes_with_party_pct / 100) + "</td>" +
            "<td>" + porcentageLoySen[pos].votes_with_party_pct.toFixed(2) + "</td>" +
            "</tr>"

    }

    document.getElementById("senateLoy").innerHTML = myHtml7;
}

//llenarTablaLoySen();


function llenarTablaLoySen2() {

    var myHtml8 = ""

    porcentageLoySen.reverse();

    for (var pos = 0; pos < porcentageLoySen.length; pos++) {

        myHtml8 = myHtml8 + "<tr>" +
            "<td><a href = " + porcentageBotSenate[pos].url + ">" + porcentageBotSenate[pos].first_name + " " + (porcentageBotSenate[pos].middle_name || "") + " " + porcentageBotSenate[pos].last_name + "</a></td>" +
            "<td>" + Math.round(porcentageBotSenate[pos].total_votes * porcentageBotSenate[pos].votes_with_party_pct / 100) + "</td>" +
            "<td>" + porcentageBotSenate[pos].votes_with_party_pct.toFixed(2) + "</td>" +
            "</tr>"
    }

     document.getElementById("senateBotLoy").innerHTML = myHtml8;
}

//llenarTablaLoySen2();

function ordenarMiembros(miembros) {
    
 return miembros.slice().sort(function (a, b) {
        return (a.votes_with_party_pct - b.votes_with_party_pct)
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

    membersLoyaltySenate = datosSenate.results[0].members;
    
    filtroPartidoLoySenD = membersLoyaltySenate.filter(member => member.party === "D");

    filtroPartidoLoySenR = membersLoyaltySenate.filter(member => member.party === "R");

    filtroPartidoLoySenI = membersLoyaltySenate.filter(member => member.party === "I");
    
    miembrosOrdenados = ordenarMiembros(membersLoyaltySenate);

    diezxCientoLoySen = membersLoyaltySenate.length * 10 / 100;

    porcentageBotSenate = miembrosOrdenados.slice(0, diezxCientoLoySen);

    porcentageLoySen = miembrosOrdenados.slice().reverse().slice(0, diezxCientoLoySen);

    filtrosPorPartidoLoySen();

    divisionLoySen();

    llenarTablaLoySen();

    llenarTablaLoySen2();



}).catch(function (error) {
    console.log("Request failed: " + error.message);
});