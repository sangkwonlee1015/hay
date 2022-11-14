const BASE_URL = "http://localhost:8080";
// const BASE_URL = "https://k7a603.p.ssafy.io";
const API_BASE_URL = "/api";

// 경로
const USER_URL = "/user";
const MYPAGE_URL = "/mypage";
const VOTES_URL = "/votes";

// URI
// User
const INFOINPUT_URL = "/info";
const DUPLICATECHECK_URL = "/nickname/check";
const LOGIN_URL = "/login";
const TOKEN_URL = "/token";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=2cc38f3feb14c46b190ca5fe77598eb6&redirect_uri=http://localhost:3000/kakaologin&response_type=code`;

// Mypage
const NICKNAME_URL = "/nickname";
const LOGOUT_URL = "/logout";
const LOCATION_URL = "/location";
const LOCATION_SETTING_URL = "/location/current";
const LOCATION_RANGE = "/location/range";

// Votes
const COMMENT_URL = "/comment";
const LIKES_URL = "/likes";
const RESULT_URL = "/result";

const api = {
  // user
  signup: () => API_BASE_URL + USER_URL + INFOINPUT_URL,
  nicknameDuplicateCheck: () => API_BASE_URL + USER_URL + DUPLICATECHECK_URL,
  login: () => API_BASE_URL + USER_URL + LOGIN_URL,
  kakaoLogin: () => KAKAO_AUTH_URL,
  token: () => API_BASE_URL + USER_URL + TOKEN_URL,

  // mypage
  getNickname: () => API_BASE_URL + MYPAGE_URL + NICKNAME_URL,
  putNickname: () => API_BASE_URL + MYPAGE_URL + NICKNAME_URL,
  logout: () => API_BASE_URL + MYPAGE_URL + LOGOUT_URL,
  getLocation: () => API_BASE_URL + MYPAGE_URL + LOCATION_URL,
  addLocation: () => API_BASE_URL + MYPAGE_URL + LOCATION_URL,
  deleteLocation: (locationId) =>
    API_BASE_URL + MYPAGE_URL + LOCATION_URL + `/${locationId}`,
  setCurrentLocation: () => API_BASE_URL + MYPAGE_URL + LOCATION_SETTING_URL,
  getCurrentLocation: () => API_BASE_URL + MYPAGE_URL + LOCATION_SETTING_URL,
  setLocationRange: () => API_BASE_URL + MYPAGE_URL + LOCATION_RANGE,

  // votes
  getVotes: () => API_BASE_URL + VOTES_URL,
  getVoteDetail: (voteId) => API_BASE_URL + VOTES_URL + `/${voteId}`,
  pickVote: (voteId) => API_BASE_URL + VOTES_URL + `/${voteId}`,
  addComment: (voteId) => API_BASE_URL + VOTES_URL + `/${voteId}` + COMMENT_URL,
  deleteComment: (voteId, commentId) =>
    API_BASE_URL + VOTES_URL + `/${voteId}` + COMMENT_URL + `/${commentId}`,
  likeComment: (voteId, commentId) =>
    API_BASE_URL +
    VOTES_URL +
    `/${voteId}` +
    COMMENT_URL +
    `/${commentId}` +
    LIKES_URL,
  addVotes: () => API_BASE_URL + VOTES_URL,
  getVotesResult: (voteId) =>
    API_BASE_URL + VOTES_URL + `/${voteId}` + RESULT_URL,
  voteEarlyFinish: (voteId) => API_BASE_URL + VOTES_URL + `/${voteId}`,
};

export default api;
