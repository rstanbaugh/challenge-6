var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector ("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");


var displayWarning = function(repo) {
  // add text to warning container
  limitWarningEl.textContent = "To see more than 30 issues, visit ";

  // create link element
  var linkEl = document.createElement("a");
  linkEl.textContent = "GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  // append to warning container
  limitWarningEl.appendChild(linkEl);
};

var getRepoName = function(){
  var queryString = document.location.search;
  var repoName = queryString.split("=")[1];
  getRepoIssues(repoName);
  repoNameEl.textContent = repoName;
};

var getRepoIssues = function(repo){
  var apiUrl = "https://api.github.com/repos/" + repo +"/issues?direction=asc";
  fetch(apiUrl).then(response =>{
    // response was successful
    if (response.ok){
      response.json().then (data =>{
        displayIssues(data);

        // check if api has paginated issues
        if(response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      alert("There was a problem with your request!");
    }
  });
};



var displayIssues = function(issues){
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }
  // console.log(data);
  for (let i in issues){
    // create a link element to take users to the issue on github
    var issueEl = document.createElement("a");
    issueEl.classList = ("list-item flex-row justify-space-between align-center");
    issueEl.setAttribute("href", "issues[i].html_url");
    issueEl.setAttribute("target", "_blank");

    var titelEl = document.createElement("span");
    titelEl.textContent = issues[i].title;

    // append to container
    issueEl.appendChild(titelEl);

    // create a type element
    var typeEl = document.createElement("span");

    // check if issues is an actual issu eor a pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull Request)";
    } else {
      typeEl.textContent = "(Issue)";
    }

    // append to container
    issueEl.appendChild(typeEl);

    // disply on web page
    issueContainerEl.appendChild(issueEl);
  }
};


getRepoName();
// getRepoIssues("facebook/react");
