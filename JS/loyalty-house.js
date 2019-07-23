var statistics = [
    {
        "id" : "Republicans",
        "numberOfRepsR" : null,
        "VotedWithParty" : null,
        "averageComparisonVotingWithParty": null,
        "doNotVoteWithParty" : null,
        "doVoteWithParty" : null,
        "missedMostVotes": null,
        "missedLeastVotes" : null
        },
          {
        "id" : "Democrats",
        "numberOfRepsD" : null,
        "VotedWithParty" : null,
        "averageComparisonVotingWithParty": null,
        "doNotVoteWithParty" : null,
        "doVoteWithParty" : null,
        "missedMostVotes": null,
        "missedLeastVotes" : null      
        },
          {
        "id" : "Independents",
        "numberOfRepsI" : null,
        "VotedWithParty" : null,
        "averageComparisonVotingWithParty": null,
        "doNotVoteWithParty" : null,
        "doVoteWithParty" : null,
        "missedMostVotes": null,
        "missedLeastVotes" : null      
        }
   ]

//var membersLoyaltyHouse = datosHouse.results[0].members;

var membersLoyaltyHouse = [];
var filtroPartidoLoyaltyD = [];
var filtroPartidoLoyaltyR = [];
var filtroPartidoLoyaltyI = [];


var divisionRepublicanLoy = [];
var divisionDemocratLoy = [];
var divisionIndependentLoy = [];
var diezxCientoLoy = [];
var porcentageLoy = [];
var porcentageBotHouse = [];


function filtroPorPartidosLoyalty(){
    
filtroPartidoLoyaltyD = membersLoyaltyHouse.filter (member => member.party === "D");
filtroPartidoLoyaltyR = membersLoyaltyHouse.filter (member => member.party === "R");
filtroPartidoLoyaltyI = membersLoyaltyHouse.filter (member => member.party === "I");

document.getElementById("loyaltyHomeDem").innerHTML = filtroPartidoLoyaltyD.length;
document.getElementById("loyaltyHomeRep").innerHTML = filtroPartidoLoyaltyR.length;
document.getElementById("loyaltyHomeInd").innerHTML = filtroPartidoLoyaltyI.length;    
    
}

//filtroPorPartidosLoyalty();


function divisionLoyHos() {

    divisionRepublicanLoy = filtroPartidoLoyaltyR.reduce((acc,votante) => acc + votante.votes_with_party_pct, 0)/filtroPartidoLoyaltyR.length;

        document.getElementById("pctLoyR").innerHTML = divisionRepublicanLoy.toFixed(2);

    divisionDemocratLoy = filtroPartidoLoyaltyD.reduce((acc,votante) => acc + votante.votes_with_party_pct, 0)/filtroPartidoLoyaltyD.length;

        document.getElementById("pctLoyD").innerHTML = divisionDemocratLoy.toFixed(2);

    divisionIndependentLoy = filtroPartidoLoyaltyI.reduce((acc,votante) => acc + votante.votes_with_party_pct, 0)/filtroPartidoLoyaltyI.length;

        //document.getElementById("pctLoyI").innerHTML = divisionIndependentLoy.toFixed(2);
}


//divisionLoyHos()

function llenarLeastLoyalTable() {
var myHtml5 = ""
    
    for(var pos = 0; pos < porcentageBotHouse.length; pos ++){
        
        myHtml5 = myHtml5 + "<tr>"
        + "<td><a href = "+ porcentageBotHouse [pos].url + ">"+ porcentageBotHouse [pos].first_name + " " + (porcentageBotHouse [pos].middle_name || "")  + " " + porcentageBotHouse [pos].last_name +"</a></td>"
        + "<td>" + Math.round(porcentageBotHouse [pos].total_votes * porcentageBotHouse [pos].votes_with_party_pct / 100) +"</td>"
        + "<td>" + porcentageBotHouse [pos].votes_with_party_pct.toFixed(2) +"</td>"
        + "</tr>"
        
    }
    
    document.getElementById("HouseLoy").innerHTML = myHtml5

}


function llenarTablaLoyHos2(){

var myHtml6 = ""
    
    for(var pos = 0; pos < porcentageLoy.length; pos ++){
        
        myHtml6 = myHtml6 + "<tr>"
        + "<td><a href = "+ porcentageLoy [pos].url + ">"+ porcentageLoy [pos].first_name + " " + (porcentageLoy [pos].middle_name || "")  + " " + porcentageLoy [pos].last_name +"</a></td>"
        + "<td>" + Math.round(porcentageLoy [pos].total_votes * porcentageLoy [pos].votes_with_party_pct / 100) +"</td>"
        + "<td>" + porcentageLoy [pos].votes_with_party_pct.toFixed(2) +"</td>"
        + "</tr>"
        
    }
    
    document.getElementById("HouseBotLoy").innerHTML = myHtml6
}
    
function ordenarMiembrosLoyHouse (miembros){
    return miembros.slice().sort (function (a , b){
            return (a.votes_with_party_pct - b.votes_with_party_pct)                  
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

    membersLoyaltyHouse = datosHouse.results[0].members;
    
    filtroPartidoLoyaltyD = membersLoyaltyHouse.filter(member => member.party === "D");

    filtroPartidoLoyaltyR = membersLoyaltyHouse.filter(member => member.party === "R");

    filtroPartidoLoyaltyI = membersLoyaltyHouse.filter(member => member.party === "I");
    
    miembrosOrdenadoss = ordenarMiembrosLoyHouse (membersLoyaltyHouse);

    diezxCientoLoy = membersLoyaltyHouse.length * 10 / 100;

    porcentageBotHouse = membersLoyaltyHouse.slice(0, diezxCientoLoy).sort((sen1, sen2) => sen2.votes_with_party_pct - sen1.votes_with_party_pct).reverse()

    porcentageLoy = miembrosOrdenadoss.slice().reverse().slice(0, diezxCientoLoy).sort((sen3, sen4) => sen4.votes_with_party_pct - sen3.votes_with_party_pct)

    filtroPorPartidosLoyalty();

    divisionLoyHos()

    llenarLeastLoyalTable();

    llenarTablaLoyHos2();



}).catch(function (error) {
    console.log("Request failed: " + error.message);
});








