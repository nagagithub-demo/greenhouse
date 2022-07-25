var express = require('express');
var bodyParser = require('body-parser');
var octokitService = require("./octokit-service.js")

const app = express();
app.use(bodyParser.json()); // support json encoded bodies


app.post('/', function (req, res, next) {
   eventOn = req.headers['x-github-event'];
   payload = req.body;
   action = payload.action;

   if (eventOn === "repository" && action === "created") {
      setTimeout( ()=> console.log("woke up after 1 sec"), 1000)
      repo = payload.repository.name;
      branch = payload.repository.default_branch;
      owner = payload.repository.owner.login;
      sender = payload.sender.login;
      octokitService.protectBranch(owner, repo, branch)
      .then(result => {
         //console.log("result=" + JSON.stringify(result))
         octokitService.createIssueNewRepoProtected(owner, repo, sender)
         res.send(result);
      }).catch(err => {
         //console.log(JSON.stringify(err))
         octokitService.createIssueNewRepoNotProtected(owner, repo, sender)
         next(err)
      })   
   } else {
      res.send("This event is ignored")
   }
})

var server = app.listen(3000, function () {

   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})