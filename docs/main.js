//setTimeout(function () {
//        fetchScroe(kid_name, kid_id)
//    }, 5 * 60 * 1000)

// update the +- buttons value
function updateIncrement(inc) {
    //document.querySelectorAll(".minus").innerText = -1 * inc;
    //document.querySelectorAll(".plus").innerText = "+" + inc;
};

// get increment from toggle selector
//document.querySelector('input[name="inc"]:checked').value

// fetch family
function fetchData(url, callback) {
    var options = {
        "async": true,
        "crossDomain": true,
        "url": "https://goals-d78c.restdb.io/rest/" + url,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "5e872193111788414066c5e9",
            "cache-control": "no-cache"
        }
    }

    $.ajax(options).done(function (response) {

        var obj = (response);
        console.log(obj);

        if (callback) {
            callback(response);
        }

    });
}


kidTemplate = function (kidName, score, target, reward) {
    return `
        <div class="kid ${kidName}">
            <div class="main">
                <div class="kid_name">${kidName}</div>
                <div class="subtitle">Current score</div>
                <div class="change_score">

                    <div class="minus" onclick="updateScore(-1, 'rotem', 'mobile')"></div>

                    <div class="score">${score}</div>

                    <div class="plus" onclick="updateScore(1, 'rotem', 'mobile')"></div>
                </div>
                <div class="select_increment">
                    <div class="subtitle">How much points to add?</div>
                    <ul>
                        <li>
                            <input type="radio" id="one" name="inc" value="1" checked class="first" onclick="updateIncrement(this.value)">
                            <label for="one">1</label>
                        </li>
                        <li>
                            <input type="radio" id="two" name="inc" value="2" onclick="updateIncrement(this.value)">
                            <label for="two">2</label>
                        </li>
                        <li>
                            <input type="radio" id="five" name="inc" value="5" onclick="updateIncrement(this.value)">
                            <label for="five">5</label>
                        </li>
                        <li>
                            <input type="radio" id="ten" name="inc" value="10" class="last" onclick="updateIncrement(this.value)">
                            <label for="ten">10</label>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="info">
                <div class="score_status">
                    <div class="label">Target</div>
                    <div class="goal">${target}</div>
                </div>
                <div class="reward">
                    <div class="label">Reward</div>
                    <div>${reward}</div>
                </div>
            </div>
        </div>
    `
}


fetchData("members/5e8ae9005053da750001c1a2",
    function (response) {
        let family_id = response.family[0]._id;

        fetchData("members?q=" + JSON.stringify({
                "family._id": family_id
            }),
            function (response) {

                let memberIds = response.filter(member => member.role === 'child').map(member => member._id)

                fetchData("goals?q=" + JSON.stringify({
                        "member._id": {
                            $in: memberIds
                        },
                        "isActive": true
                    }),
                    function (goals) {

                        var i = 0;
                        for (i = 0; i < goals.length; i++) {
                            $("#main").append(kidTemplate(goals[i].member[0].name, goals[i].score, goals[i].target, goals[i].reward));
                        }
                        updateIncrement(1);

                    }
                )

            });
    });


//update score
function updateScore() {
    var jsondata = {
        goals: [{
            score: 55
                }]
    };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://goals-d78c.restdb.io/rest/members/5e8ae9005053da750001c19e",
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "5e872193111788414066c5e9",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}