hostname = 'https://mikemccolm.pythonanywhere.com'


async function getprediction()
{
    document.getElementById("winner").innerHTML = 'Loading...'
    document.getElementById("confidence").innerHTML = 'Loading...'
    document.getElementById("synced").innerHTML = 'Loading...'
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', 'https://mikemccolm.pythonanywhere.com');
    myHeaders.append('Cache-Control', 'no-cache');

    var raw = JSON.stringify({
        "teamA":document.getElementById("teamA_id").value,
        "teamB":document.getElementById("teamB_id").value,
        "year":document.getElementById("year_id").value
    });

    var requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    if (document.getElementById("teamA_id").value.length > 0)
    {
        console.log
        fetch("https://mikemccolm.pythonanywhere.com/predict", requestOptions)
        .then(response => response.json())
        .then(result => setElements(result['winner'], result['confidence'].toString(),result['synced'].toString()))
        .catch(err => document.getElementById("errormessage").innerHTML = 'ERROR -' + err.message + ' - API is likely down.')
    }
    else
    {
        document.getElementById("errormessage").innerHTML = 'You need to load and pick teams first.'
    }
   
}

function setElements(winner, confidence,synced)
{
    document.getElementById("winner").innerHTML = winner
    document.getElementById("confidence").innerHTML = confidence
    if (synced == 'false')
    {
        document.getElementById("synced").innerHTML = 'NO'
    }
    else
    {
        document.getElementById("synced").innerHTML = 'YES'

    }
    document.getElementById("errormessage").innerHTML = ''
}

function getteams()
{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', 'https://mikemccolm.pythonanywhere.com')
    myHeaders.append('Cache-Control','no-cache');

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

    fetch("https://mikemccolm.pythonanywhere.com/teams", requestOptions)
    .then(response => response.json())
    .then(result => updateTeams(result.teams))
    .catch(err => document.getElementById("errormessage").innerHTML = 'ERROR' + err.message)
}

function updateTeams(teams)
{
    document.getElementById("errormessage").innerHTML = ''
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
