// fetch score from datawaves
var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36");
	myHeaders.append("Sec-Fetch-Dest", "empty");

	var raw = JSON.stringify({"target_property":"amount","group_by":"kid"});

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: raw,
	  redirect: 'follow'
	};

	fetch("https://datawaves.io/api/v1.0/projects/bppnu7223akg0274c7dg/queries/goals/sum", requestOptions)
	  	.then(response => response.json())
		.then(json => { document.querySelector("#score").innerText = json.result[0].sum })
	  	.catch(error => console.log('error', error));