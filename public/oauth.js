

const GITHUB_CLIENT_ID="Ov23liUc212oQckd6RDF"

const redirectUri="https://automatic-github-pr-review-system-1x04vusf0.vercel.app/"

document.getElementById("githubLoginButton").addEventListener("click",()=>{
    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo%20admin:repo_hook&redirect_uri=${encodeURIComponent(redirectUri)}`


    window.location.href = githubOAuthUrl;

});