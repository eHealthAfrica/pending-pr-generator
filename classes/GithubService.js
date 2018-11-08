class GithubService {
  constructor(objGithubClient, arrRepoNames, token, moment, strAccountName = 'ehealthAfrica') {
    this.objGithubClient = objGithubClient;
    this.arrRepoNames = arrRepoNames;
    this.token = token;
    this.moment = moment;
    this.strAccountName = strAccountName;
    this.objGithub = this.objGithubClient.client(this.token);
    this.TIME_ZONE = '+01:00';
    this.DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss.sssZ';
  }

  async getRepositories() {
    const arrPullRequests = await this.getUnfilteredRepositories();
    return Promise.all(arrPullRequests).then((arrPrs) => {
      const arrFilteredPullRequests = arrPrs.filter(pr => pr.length);
      let arrSpreadedPullRequests = [];

      arrFilteredPullRequests.forEach((arrPullRequest) => {
        arrSpreadedPullRequests = [...arrSpreadedPullRequests, ...arrPullRequest];
      });

      return arrSpreadedPullRequests;
    }).catch(error => new Error(error));
  }

  getUnfilteredRepositories() {
    let numIndex = 0;
    const arrRepositories = [];
    while (numIndex < this.arrRepoNames.length) {
      arrRepositories.push(this.fetchPullRequests(this.arrRepoNames[numIndex]));
      numIndex += 1;
    }
    return Promise.all(arrRepositories);
  }

  async fetchPullRequests(strRepoName) {
    const objRepo = this.objGithub.repo(`${this.strAccountName}/${strRepoName}`);
    const arrPullRequests = await objRepo.prsAsync();
    return this.getPullRequests(strRepoName, arrPullRequests);
  }

  getPullRequests(strRepoName, arrPullRequests) {
    try {
      const temp = [];
      let numIndex = 0;
      if (!arrPullRequests[0].length) return {};
      while (numIndex < arrPullRequests[0].length) {
        temp.push(this.getReviewDetails(strRepoName, arrPullRequests[0][numIndex]));
        numIndex += 1;
      }
      return Promise.all(temp);
    } catch (error) {
      return {};
    }
  }

  async getReviewDetails(strRepoName, objPullRequest) {
    try {
      const objGithubPullRequest = await this.objGithub.pr(`${this.strAccountName}/${strRepoName}`, objPullRequest.number);
      const objReviews = await objGithubPullRequest.reviewsAsync();
      const objAllReviews = this.getReviews(objReviews, objPullRequest);
      return this.constructor.getPullRequest(strRepoName, objPullRequest, objAllReviews);
    } catch (error) {
      return {};
    }
  }

  getReviews(objReviews, objPullRequest) {
    let objAllReviews = '';
    if (objReviews[0] && objReviews[0].length) {
      objReviews[0].forEach((objReview) => {
        objAllReviews += this.formatReview(objReview, objPullRequest);
      });
    }
    return objAllReviews;
  }

  static getPullRequest(strRepoName, objPullRequest, objAllReviews) {
    return {
      project: strRepoName,
      created_at: (objPullRequest.created_at.split('T')[0]),
      opened_by: objPullRequest.user.login,
      reviewers: objPullRequest.requested_reviewers.map(rev => rev.login).join(',\n'),
      reviews: objAllReviews,
      pr_link: objPullRequest.html_url,
    };
  }

  formatReview(objReview, objPullRequest) {
    const objStatus = { APPROVED: 'Approved', CHANGES_REQUESTED: 'Requested Changes' };
    if (objReview.state === 'COMMENTED') return '';
    return `${objStatus[objReview.state]} (${objReview.user.login}) ${this.time(objPullRequest.created_at, objReview.submitted_at)}\n`;
  }

  time(timeOpened, timeReviewed) {
    const prOpen = this.moment(new Date().toISOString(), this.DATE_TIME_FORMAT)
      .utcOffset(this.TIME_ZONE);
    const prTouch = this.moment(timeReviewed, this.DATE_TIME_FORMAT).utcOffset(this.TIME_ZONE);
    const reviewDuration = prOpen.diff(prTouch, 'minutes');
    const prResult = `${this.moment.duration(reviewDuration, 'minutes').humanize()} ago`;
    return prResult;
  }
}

module.exports = GithubService;
