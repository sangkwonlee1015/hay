const API_BASE_URL = 'http://localhost:8080/api';
// const API_BASE_URL = "https://k7a603.p.ssafy.io/api";

// 경로
const USER_URL = "/user";
const MYPAGE_URL = "/mypage";
const VOTES_URL = "/votes";

// URI
// User
const INFOINPUT_URL = "/info";
const DUPLICATECHECK_URL = "/nickname/check";

// Mypage
const NICKNAME_URL = "/nickname";
const LOGOUT_URL = "/logout";
const LOCATION_URL = "/location";
const LOCATION_SETTING_URL = "/location/current";

// Votes
const COMMENT_URL = '/comment';
const LIKES_URL = '/likes';
const RESULT_URL = '/result';


const api = {
  // user
  signup: () => API_BASE_URL + USER_URL + INFOINPUT_URL,
  nicknameDuplicateCheck: () => API_BASE_URL + USER_URL + DUPLICATECHECK_URL,

  // mypage
  getNickname: () => API_BASE_URL + MYPAGE_URL + NICKNAME_URL,
  putNickname: () => API_BASE_URL + MYPAGE_URL + NICKNAME_URL,
  logout: () => API_BASE_URL + MYPAGE_URL + LOGOUT_URL,
  getLocation: () => API_BASE_URL + MYPAGE_URL + LOCATION_URL,
  addLocation: () => API_BASE_URL + MYPAGE_URL + LOCATION_URL,
  deleteLocation: (locationId) =>
    API_BASE_URL + MYPAGE_URL + LOCATION_URL + `/${locationId}`,
  setCurrentLocation: () => API_BASE_URL + MYPAGE_URL + LOCATION_SETTING_URL,

  // votes
  getVotes: () => API_BASE_URL + VOTES_URL,
  getVoteDetail: (voteId) => API_BASE_URL + VOTES_URL + `/${voteId}`,
  pickVote: (voteId) => API_BASE_URL + VOTES_URL + `/${voteId}`,
  addComment: (voteId) => API_BASE_URL + VOTES_URL + `/${voteId}` + COMMENT_URL,
  deleteComment: (voteId, commentId) =>
    API_BASE_URL + VOTES_URL + `/${voteId}` + COMMENT_URL + `/${commentId}`,
  likeComment: (voteId, commentId) =>
    API_BASE_URL + VOTES_URL + `/${voteId}` + COMMENT_URL + `/${commentId}` + LIKES_URL,
  addVotes: () => API_BASE_URL + VOTES_URL,
  getVotesResult: (voteId) => API_BASE_URL + VOTES_URL + `/${voteId}` + RESULT_URL,
  voteEarlyFinish: (voteId) => API_BASE_URL + VOTES_URL + `/${voteId}`,
};

export default api;
