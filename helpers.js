const apiurl = 'http://127.0.0.1:8080/predict'
body2 = {}

async function getprediction()
{
    document.getElementById("winner").innerHTML = 'Loading...'
    document.getElementById("confidence").innerHTML = 'Loading...'
    document.getElementById("synced").innerHTML = 'Loading...'
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', 'http://127.0.0.1:8080')

    var raw = JSON.stringify({
        "teamA":document.getElementById("teamA_id").value,
        "teamAseed":1,
        "teamB":document.getElementById("teamB_id").value,
        "teamBseed":1,
        "year":document.getElementById("year_id").value
    });

    var requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8080/predict", requestOptions)
    .then(response => response.json())
    .then(result => setElements(result.winner, result.confidence.toString(),result.synced.toString()))
}

function setElements(winner, confidence,synced)
{
    document.getElementById("winner").innerHTML = winner
    document.getElementById("confidence").innerHTML = confidence
    document.getElementById("synced").innerHTML = synced
}

function getteams()
{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', 'http://127.0.0.1:8080')

    var raw = JSON.stringify({
        "year":document.getElementById("year_id").value
    });

    var requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8080/teams", requestOptions)
    .then(response => response.json())
    .then(result => updateTeams(result.teams))
}

function updateTeams(teams)
{
    teams = teams.sort()

    teamA = document.getElementById('teamA_id')
    teamB = document.getElementById('teamB_id')

    var child = teamB.lastElementChild; 
        while (child) {
            teamB.removeChild(child);
            child = teamB.lastElementChild;
        }
    var child = teamA.lastElementChild; 
        while (child) {
            teamA.removeChild(child);
            child = teamA.lastElementChild;
        }
    
    for (var i = 0; i < teams.length; i++) 
    {
        var optionB = document.createElement("option");
        optionB.value = teams[i];
        optionB.text = teams[i];
        teamB.appendChild(optionB);
        var optionA = document.createElement("option");
        optionA.value = teams[i];
        optionA.text = teams[i];
        teamA.appendChild(optionA);
    }
}