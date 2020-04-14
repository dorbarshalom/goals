// fetch score from datawaves
function fetchScore(kid_name, kid_id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36");
    myHeaders.append("Sec-Fetch-Dest", "empty");

    var raw = JSON.stringify({
        "target_property": "amount",
        "group_by": "kid"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://datawaves.io/api/v1.0/projects/bppnu7223akg0274c7dg/queries/goals/sum", requestOptions)
        .then(response => response.json())
        .then(json => {
            document.getElementById(kid_name).innerText = json.result[kid_id].sum;
        })
        .catch(error => console.log('error', error));

    setTimeout(function () {
        fetchScroe(kid_name, kid_id)
    }, 5 * 60 * 1000)
}


// update the +- buttons value
function updateIncrement(inc) {
    document.querySelector(".minus").innerText = -1 * inc;
    document.querySelector(".plus").innerText = "+" + inc;
};

// get increment from toggle selector
function updateScore(updown, kid, category) {
    sendScoreEvent(updown * parseInt(document.querySelector('input[name="inc"]:checked').value), kid, category)
        .then(httpResponse => {
            if (httpResponse.ok) {
                //update the dom
            } else {
                //notify the user about error
            }
        })
        .catch(err => {
            //notify the user
        })
    // fake update of score
}


// send the inc to runkit
function sendScoreEvent(amount, kid, category) {
    console.log(amount + ' , ' + kid + ' , ' + category);
    // const URI = 'https://datawaves.io/api/v1.0/projects/bppnu7223akg0274c7dg/events/score'
    const URI = 'https://goals-i9rlmguq9ba8.runkit.sh/'
    return fetch(URI, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            // Authorization: '09c166a6875c4rrWhvbVrJSWfWK1VcLi4b859e3b607cd090dd0c',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            kid,
            amount,
            category
        })
    })
}

//var increment = document.getElementById('scoreIncrement').value;