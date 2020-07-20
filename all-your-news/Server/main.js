const https = require('https');
const express = require('express');
const router = express.Router();
const app = express();

const nyt_api_key = "PnjspRzKJvEfFV6gUyHrwmz6DT7oEgyD";
const guardian_api_key = "4a4c4b72-2b40-492f-af31-b4627e133bae";


router.get("/get_article/:source_name", function(req, res){
	res.setHeader('Content-Type', "application/json");
  	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	if(req.params.source_name == "guardian"){
		https.get("https://content.guardianapis.com/"+req.query.identifier+"?api-key="+guardian_api_key+"&show-blocks=all", response => {
		let data = "";
		response.on("data", chunk => {
			data += chunk;
		});
		response.on("end", () => {
			res.send(JSON.parse(data));
		});
	}).on("error", err => {
			console.log("Error: "+ err.message);
		});
	}
	else if(req.params.source_name == "nyt"){
		https.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(%22'+req.query.identifier+'%22)&api-key='+nyt_api_key, response => {
		let data = "";
		response.on("data", chunk => {
			data += chunk;
		});
		response.on("end", () => {
			res.send(JSON.parse(data));
		});
	}).on("error", err => {
			console.log("Error: "+ err.message);
		});
	}
	else{
		res.send("Invalid source name");
	}
});


router.get("/search/:source_name/:keyword", function(req, res){
	res.setHeader('Content-Type', "application/json");
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	if(req.params.source_name == "guardian"){
		https.get("https://content.guardianapis.com/search?q="+req.params.keyword+"&api-key="+guardian_api_key+"&show-blocks=all", response => {
		let data = "";
		response.on("data", chunk => {
			data += chunk;
		});
		response.on("end", () => {
			res.send(JSON.parse(data));
		});
	}).on("error", err => {
			console.log("Error: "+ err.message);
		});
	}
	else if(req.params.source_name == "nyt"){
		https.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+req.params.keyword+"&api-key="+nyt_api_key, response => {
		let data = "";
		response.on("data", chunk => {
			data += chunk;
		});
		response.on("end", () => {
			res.send(JSON.parse(data));
		});
	}).on("error", err => {
			console.log("Error: "+ err.message);
		});
	}
	else{
		res.send("Invalid source name");
	}
});


router.get("/section_news/:source_name/:section_name", function(req, res){
	res.setHeader('Content-Type', "application/json");
  	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	if (req.params.source_name === "guardian"){
		var section_name = req.params.section_name;
		if (req.params.section_name === "home"){
			section_name = "(sport|business|technology|politics)";
		}
		if (req.params.section_name == "sports"){
			section_name = "sport";
		}
		https.get("https://content.guardianapis.com/search?api-key="+guardian_api_key+"&section="+section_name+"&show-blocks=all", response => {
		let data = "";
		response.on("data", chunk => {
			data += chunk;
		});
		response.on("end", () => {
			res.send(JSON.parse(data));
		});
	}).on("error", err => {
			console.log("Error: "+ err.message);
		});
	}
	else if(req.params.source_name == "nyt"){
		https.get("https://api.nytimes.com/svc/topstories/v2/"+req.params.section_name+".json?api-key="+nyt_api_key, response => {
		let data = "";
		response.on("data", chunk => {
			data += chunk;
		});
		response.on("end", () => {
			res.send(JSON.parse(data));
		});
	}).on("error", err => {
			console.log("Error: "+ err.message);
		});
	}
	else{
		res.send("Invalid source name");
	}
});


app.use(router);

app.listen(8080, function(){
	console.log("NOW LISTENING");
});


/*
API_KEY = 4a4c4b72-2b40-492f-af31-b4627e133bae

HOME TAB GUARDIAN 
https://content.guardianapis.com/search?api-key=4a4c4b72-2b40-492f-af31-b4627e133bae&section=(sport|business|technology|politics)&show-blocks=all
https://content.guardianapis.com/?api-key=4a4c4b72-2b40-492f-af31-b4627e133bae&section=(sport|business|technology|politics)&showblocks=all
SECTIONS GUARDIAN 
WORLD https://content.guardianapis.com/world?api-key=4a4c4b72-2b40-492f-af31-b4627e133bae&showblocks=all
SPORT https://content.guardianapis.com/sport?api-key=4a4c4b72-2b40-492f-af31-b4627e133bae&showblocks=all
BUSINESS https://content.guardianapis.com/business?api-key=4a4c4b72-2b40-492f-af31-b4627e133bae&showblocks=all
TECHNOLOGY https://content.guardianapis.com/technology?api-key=4a4c4b72-2b40-492f-af31-b4627e133bae&showblocks=all
POLITICS https://content.guardianapis.com/politics?api-key=4a4c4b72-2b40-492f-af31-b4627e133bae&showblocks=all

SEARCH GUARDIAN
https://content.guardianapis.com/search?q=adele&api-key=4a4c4b72-2b40-492f-af31-b4627e133bae&show-blocks=all

ARTICLE
http://localhost:8080/get_article/guardian?identifier=world/2020/mar/10/tuesday-briefing-occasions-of-contagion-italy-in-lockdown
*/

/*
API_KEY = PnjspRzKJvEfFV6gUyHrwmz6DT7oEgyD

HOME TAB NYT 
https://api.nytimes.com/svc/topstories/v2/home.json?api-key=PnjspRzKJvEfFV6gUyHrwmz6DT7oEgyD

SECTIONS NYT
WORLD https://api.nytimes.com/svc/topstories/v2/world.json?api-key=PnjspRzKJvEfFV6gUyHrwmz6DT7oEgyD
POLITICS https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=PnjspRzKJvEfFV6gUyHrwmz6DT7oEgyD
BUSINESS  https://api.nytimes.com/svc/topstories/v2/business.json?api-key=PnjspRzKJvEfFV6gUyHrwmz6DT7oEgyD
TECHNOLOGY  https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=PnjspRzKJvEfFV6gUyHrwmz6DT7oEgyD
SPORTS https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=PnjspRzKJvEfFV6gUyHrwmz6DT7oEgyD

SEARCH NYT
https://api.nytimes.com/svc/search/v2/articlesearch.json?q=ed-sheeran&api-key=PnjspRzKJvEfFV6gUyHrwmz6DT7oEgyD

ARTICLE
https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("https://www.nytimes.com/interactive/2020/03/11/science/how-coronavirus-hijacks-your-cells.html")&api-key=PnjspRzKJvEfFV6gUyHrwmz6DT7oEgyD
http://localhost:8080/get_article/nyt?identifier=https://www.nytimes.com/interactive/2020/03/11/science/how-coronavirus-hijacks-your-cells.html
*/



/*const server = http.createServer(function(request, response){
	response.setHeader('Content-type', 'application/json');
	response.writeHead(200);

	let dataObj = {"name": "Bob", "address": "221 B"};
	let data = JSON.stringify(dataObj);

	response.end(data);

	//console.log(http.METHODS);
	//console.log(http.STATUS_CODES);
	//console.log(request.headers);
	//console.log(request.method);
	//console.log(request);
	let path = url.parse(request.url, true);
	//console.log(path);
	//console.log(path.query["search"]);
});

function guardian_world(){
	var data = "";
	https.get("https://content.guardianapis.com/world?api-key=4a4c4b72-2b40-492f-af31-b4627e133bae&showblocks=all", response => {
		response.on("data", chunk => {
			data += chunk;
		});
		response.on("end", () => {
			
			return JSON.parse(data);
		});
	}).on("error", err => {
			console.log("Error: "+ err.message);
		});
}
	//POLITICS
function guardian_politics(){
	https.get("https://content.guardianapis.com/politics?api-key=4a4c4b72-2b40-492f-af31-b4627e133bae&showblocks=all", response => {
		let data = "";
		response.on("data", chunk => {
			data += chunk;
		});
		response.on("end", () => {
			return data;
			console.log(guardian_section_data);
			
		});
	}).on("error", err => {
			console.log("Error: "+ err.message);
		});
}

	//BUSINESS
function guardian_business(){
	https.get("https://content.guardianapis.com/business?api-key=4a4c4b72-2b40-492f-af31-b4627e133bae&showblocks=all", response => {
		let data = "";
		response.on("data", chunk => {
			data += chunk;
		});
		response.on("end", () => {
			return data;
			//console.log(guardian_section_data);
			
		});
	}).on("error", err => {
			console.log("Error: "+ err.message);
		});
}
	//TECHNOLOGY
function guardian_technology(){
	https.get("https://content.guardianapis.com/technology?api-key=4a4c4b72-2b40-492f-af31-b4627e133bae&showblocks=all", response => {
		let data = "";
		response.on("data", chunk => {
			data += chunk;
		});
		response.on("end", () => {
			return data;
			//console.log(guardian_section_data);
			
		});
	}).on("error", err => {
			console.log("Error: "+ err.message);
		});
}
	//SPORT
function guardian_sports(){
	https.get("https://content.guardianapis.com/sport?api-key=4a4c4b72-2b40-492f-af31-b4627e133bae&showblocks=all", response => {
		let data = "";
		response.on("data", chunk => {
			data += chunk;
		});
		response.on("end", () => {
			return data;
			
		});
	}).on("error", err => {
			console.log("Error: "+ err.message);
		});
}

function guardian_section_request(){
	var g_world = guardian_world();
	var g_politics = guardian_politics();
	var g_business = guardian_business();
	var g_tech = guardian_technology();
	var g_sports = guardian_sports();
	var g_section = "";
	console.log();
}

guardian_section_request();

router.get("/hi", function(req, res){
	//response.send({type: "GET"});
	console.log("HIIIIII!");
	res.send({name:"HI"});
});


server.listen(8080, function(){
	console.log('Listening on port 8080!');
})
*/