'use strict'

class GithubService {
  constructor(github, arrRepoNames, token, moment, accountName = 'ehealthAfrica') {
    this.github = github;
    this.arrRepoNames = arrRepoNames;
    this.token = token;
    this.moment = moment;
    this.accountName = accountName;
    this.objGithub = this.github.client(this.token);
    this.TIME_ZONE = '+01:00';
    this.DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss.sssZ';
  }

  async getRepositories() {
    let numIndex = 0;
    let arrRepositories = [];
    while (numIndex < this.arrRepoNames.length) {
      const arrPullRequests = await this.getPullRequests(this.arrRepoNames[numIndex])
      if (arrPullRequests) arrRepositories = [...arrRepositories, ...arrPullRequests];
      numIndex++;
    }
    return arrRepositories
  }

  async getPullRequests(strRepoName) {
    const objRepo = this.objGithub.repo(`${this.accountName}/${strRepoName}`);
    const arrPullRequests = await objRepo.prsAsync();
    if (!arrPullRequests[0].length) return;
    return arrPullRequests[0].map(async (objPullRequest) => this.getReviewDetails(strRepoName, objPullRequest))
  }

  async getReviewDetails(strRepoName, objPullRequest) {
    var objGithubPullRequest = await this.objGithub.pr(`${this.accountName}/${strRepoName}`, objPullRequest.number);
    const objReviews = await objGithubPullRequest.reviewsAsync();
    const objAllReviews = this.getReviews(objReviews, objPullRequest);
    return this.getPullRequest(strRepoName, objPullRequest, objAllReviews);
  }

  getReviews(objReviews, objPullRequest) {
    let objAllReviews = '';
    if (objReviews[0].length) {
      objReviews[0].forEach(objReview => {
        objAllReviews += this.formatReview(objReview, objPullRequest);
      });
    }
    return objAllReviews;
  }

  getPullRequest(strRepoName, objPullRequest, objAllReviews) {
    return {
      project: strRepoName,
      created_at: (objPullRequest.created_at.split('T')[0]),
      opened_by: objPullRequest.user.login,
      reviewers: objPullRequest.requested_reviewers.map(rev => rev.login).join(',\n'),
      reviews: objAllReviews,
      pr_link: objPullRequest.html_url,
    }
  }

  formatReview(objReview, objPullRequest) {
    const objStatus = {'APPROVED': 'Approved', 'CHANGES_REQUESTED': 'Requested Changes'};
    if (objReview.state === 'COMMENTED') return '';
    return `${objStatus[objReview.state]} (${objReview.user.login}) ${this.time(objPullRequest.created_at, objReview.submitted_at)}\n`;
  }

  time(timeOpened, timeReviewed) {
    const prOpen = this.moment(timeOpened, this.DATE_TIME_FORMAT).utcOffset(this.TIME_ZONE);
    const prTouch = this.moment(timeReviewed, this.DATE_TIME_FORMAT).utcOffset(this.TIME_ZONE);
    const reviewDuration =  prOpen.diff(prTouch, 'minutes');
    const prResult = `${this.moment.duration(reviewDuration, "minutes").humanize()} ago`;
    return prResult;
  }
}

module.exports = GithubService;
