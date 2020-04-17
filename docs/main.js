//setTimeout(function () {
//        fetchScroe(kid_name, kid_id)
//    }, 5 * 60 * 1000)

// update the +- buttons value

function updateIncrement(element, inc) {
    console.log(".kid[data-goal=" + element +"]");
        $(`.kid[data-goal="${element}"] .minus`).text(-1 * inc);
        $(`.kid[data-goal="${element}"] .plus`).text("+" + inc);

        $(".kid[data-goal=" + element + "] li").removeClass("active");
        $(".kid[data-goal=" + element + "] li[data-value=" + inc + "]").addClass("active");
    };


// get increment from toggle selector
//document.querySelector('input[name="inc"]:checked').value


kidTemplate = function (kidName, goalId, score, target, reward) {
    return `
        <div class="kid ${kidName}" data-goal="${goalId}">
        
            <div class="main">
            <div class="overlay">
                 <div class="spinner"></div>
            </div>
                <div class="kid_name">${kidName}</div>
                <div class="subtitle">Current score</div>
                <div class="change_score">

                    <div class="minus" onclick="updateScore('${goalId}',-1)"></div>

                    <div class="score">${score}</div>

                    <div class="plus" onclick="updateScore('${goalId}',1)"></div>
                </div>
                <div class="select_increment">
                    <div class="subtitle">How much points to add?</div>
                    
                    <ul>
                        <li data-value="1" onclick="updateIncrement('${goalId}', 1)" class="first">1</li>
                        <li data-value="2" onclick="updateIncrement('${goalId}', 2)">2</li>
                        <li data-value="5" onclick="updateIncrement('${goalId}', 5)">5</li>
                        <li data-value="10" onclick="updateIncrement('${goalId}', 10)" class="last">10</li>
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
        <script>updateIncrement('${goalId}', 1);</script>
    `
}


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
                            $("#main").append(kidTemplate(goals[i].member[0].name, goals[i]._id, goals[i].score, goals[i].target, goals[i].reward));
                        }
                    }
                )

            });
    });


//update score
function updateScore(goalId,updown) {
    
    var inc = $(`.kid[data-goal="${goalId}"] .select_increment li.active`).data("value");
    inc = inc*updown;
    console.log(inc);

    //show the overlay
    $(`.kid[data-goal="${goalId}"] .overlay`).css({"visibility":"visible","opacity":"0.7"});
    
    var jsondata = {"$inc": {"score": inc}}
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://goals-d78c.restdb.io/rest/goals/" + goalId,
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
        console.log(response.score);
        $(`.kid[data-goal="${goalId}"] .score`).text(response.score);
        //hide the overlay
        $(`.kid[data-goal="${goalId}"] .overlay`).css({"visibility":"hidden","opacity":"0"});
    });
}

