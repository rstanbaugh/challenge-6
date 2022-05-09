var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term")




var getUserRepos = function(user){
  // format the github url
  var apiUrl = "https://api.github.com/users/"+user+"/repos";

  // make a request to the api
  fetch(apiUrl).then (response => {
    //  check if api returned any repos
    if(response.ok){
      response.json()
        .then (data => displayRepos(data, user));
    } else {
      alert("Error: Github User Not Found");
    }
  })

  // catch network errors
  .catch(error => {
    // this catch is chained to the end of the '.then()
    alert("unable to connect to GitHub");
  });
};
  

var displayRepos = function(repos, searchTerm){
  if (repos.length ===0){
    repoContainerEl.textContent = "No repositories found.";
  }
  // clear old content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  // loop over repos
  for (i in repos){
    // format repos name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href","./single-repo.html?repo="+repos[i].name)

    // create a span element to hold repo name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

      // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if(repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(titleEl);

    // append icons to repo container
    repoEl.appendChild(statusEl)

    // append container
    repoContainerEl.appendChild(repoEl);
  };
};


// event handlers
var formSubmitHandler = function(event){
  event.preventDefault();
  
  // get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username")
  }
}



// event listner
userFormEl.addEventListener("submit",formSubmitHandler);