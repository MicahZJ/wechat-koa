const state = {
  token: localStorage.getItem("token") || "",
  token_err: "",
  status: "",
  userInfo: {}
};

export default state;
