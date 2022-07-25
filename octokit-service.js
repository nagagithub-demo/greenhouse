const { Octokit } = require("octokit");

//import { Octokit, App } from "octokit";
const  PERSONAL_ACCESS_TOKEN = process.env.PERSONAL_ACCESS_TOKEN;

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({
  auth: PERSONAL_ACCESS_TOKEN 
});

this.createIssueNewRepoProtected = function(owner, repo, sender){
  return new Promise(function(resolve, reject) {
    octokit.request('POST /repos/{owner}/{repo}/issues', {
      owner: owner,
      repo: repo,
      title: 'New repo created and protected',
      body: `Hello @${sender}, ${repo} is created. 
      We enabled following restrictions, please take a look and act apropriatly.
      1) Require a pull request before merging.
        1.a) Requires 2 approvals
      2) Require status checks to pass before merging
        2.a) Require branches to be up to date before merging
      3) Require conversation resolution before merging
      4) Not restristing anybody to push to this branch.`,
      assignees: [sender],
      labels: [
        'documentation'
      ]
    })
    .then(result => resolve(result))
    .catch(err => reject(err))
  }) 
}

this.createIssueNewRepoNotProtected = function(owner, repo, sender){
  return new Promise(function(resolve, reject) {
    octokit.request('POST /repos/{owner}/{repo}/issues', {
      owner: owner,
      repo: repo,
      title: 'New repo NOT protected',
      body: `Hello @${sender}, ${repo} is created. 
      We could not automatically updat the protections rules.
      Please add the protection at the earliest.
      
      Please let us you know if we can improve these alerts.`,
      assignees: [sender],
      labels: [
        'bug'
      ]
    })
    .then(result => resolve(result))
    .catch(err => reject(err))
  }) 
}

 
this.protectBranch = function(owner, repo, branch) {
  return new Promise(function(resolve, reject) {
    octokit.request('PUT /repos/{owner}/{repo}/branches/{branch}/protection', {
      owner: owner,
      repo: repo,
      branch: branch,
      required_status_checks: {
        strict: true,
        contexts: ["travis-ci"]
      },
      enforce_admins: true,
      required_pull_request_reviews: {
        required_approving_review_count: 2
      },
      restrictions: null,
      required_conversation_resolution: true
    }).then(res => resolve(res))
    .catch(err => reject(err));
  })
}