// fetch the score for the kid page
function fetchGoal(goalId) {
    var options = {
        "async": true,
        "crossDomain": true,
        "url": "https://goals-d78c.restdb.io/rest/goals/" + goalId,
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
        
        $("#goal div").text(obj.reward);
        $("#name").text(obj.member[0].name);
        $("#score").text(obj.score);
        $("#target").text("/ " + obj.target);        
    });
}
