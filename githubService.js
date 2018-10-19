var github = require('octonode');

async function getPullRequests(repository,token) {
    const client = github.client(token)
    const repo = client.repo(`ehealthAfrica/${repository}`)
    const result = await repo.prsAsync()
    return result[0].map(pull => ({
        project: repository,
        pr_link: pull.html_url,
        opened_by: pull.user.login,
        reviewers: pull.requested_reviewers.map(rev => rev.login).join(','),
        created_at: (pull.created_at.split('T')[0])
    }));
}
module.exports = async function getAllPRs(repos,token) {
    let index = 0;
    let prTracker = [];
    while (index < repos.length) {
        const pr = await getPullRequests(repos[index],token)
        console.log('...fetching')
        prTracker = [...prTracker, ...pr]
        index++;
    }
    console.log('\n')
    console.log('\n')
    console.log(JSON.stringify(prTracker))
    console.log('\n')
    console.log('\n')
    return prTracker
}
// getAllPRs(repos)
// console.log(prTracker)