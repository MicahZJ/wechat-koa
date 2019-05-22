import * as types from "./mutation-types";

export const actionsSetUserInfo = ({ commit }, res) => {
  commit(types.SET_USERINFO, res);
};

export const loginToken = async ({ commit }, res) => {
  commit(types.SET_TOKEN, res);
};
