import axios from 'axios';

import {
  GET_ALL_COWS,
  GET_COW_DETAIL,
  POST_COW,
  PUT_COW,
  DELETE_COW,
  CLEAR_STATE,
} from './actionTypes.js';

export function getAllCows() {
  return async (dispatch) => {
    try {
      var json = await axios.get('/');
      return dispatch({
        type: GET_ALL_COWS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCowDetail(id) {
  return async (dispatch) => {
    try {
      var json = await axios.get(`/${id}`);
      return dispatch({
        type: GET_COW_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postCow(cowToCreate) {
  return async (dispatch) => {
    try {
      let response = await axios.post('/post', cowToCreate);
      dispatch({
        type: POST_COW,
        payload: true,
      });
      return response.status;
    } catch (error) {
      dispatch({
        type: POST_COW,
        payload: false,
      });
      return false;
    }
  };
}

export function editCow(id, payload) {
  return async (dispatch) => {
    try {
      let json = await axios.put(`/put/${id}`, payload);
      dispatch({
        type: PUT_COW,
        payload: json.data,
      });
      return json.status;
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteCow(id) {
  return async (dispatch) => {
    try {
      let json = await axios.delete(`/delete/${id}`);
      dispatch({
        type: DELETE_COW,
        payload: json.data,
      });
      return json.status;
    } catch (error) {
      console.log(error);
    }
  };
}

export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}
