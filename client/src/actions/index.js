import * as API from '../API';
import { ALL_STUDENTS, SIGNIN, ADD_STUDENT, CURRENT_STUDENT } from '../ActionTypes';

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await API.signIn(formData);
    dispatch({ type: SIGNIN, payload: data.res });
    navigate('/student-list');
  } catch (error) {
    console.log('Error:', error.message);
  }
};

export const addStudent = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await API.addStudent(formData);
    dispatch({ type: ADD_STUDENT, payload: data.res || [] });
    dispatch(allStudents());
    // navigate('/student-list');
  } catch (error) {
    console.log('Error:', error.message);
  }
};
export const updateStudent = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await API.updateStudent(formData);
    dispatch({ type: ADD_STUDENT, payload: data.res || [] });
    dispatch(allStudents());
    // navigate('/student-list');
  } catch (error) {
    console.log('Error:', error.message);
  }
};

export const allStudents = () => async (dispatch) => {
  try {
    const { data } = await API.allStudents();
    dispatch({ type: ALL_STUDENTS, payload: data.res || [] });
  } catch (error) {
    console.log('Error:', error.message);
  }
};

export const studentById = (formdata) => async (dispatch) => {
  try {
    console.log(formdata)
    const { data } = await API.studentById(formdata);
    dispatch({ type: CURRENT_STUDENT, payload: data.res || [] });
  } catch (error) {
    console.log('Error:', error.message);
  }
};

export const deleteStudent = (formdata) => async (dispatch) => {
  try {
    console.log(formdata)
    const { data } = await API.deleteStudent(formdata);
    dispatch(allStudents())
    // dispatch({ type: CURRENT_STUDENT, payload: data.res || [] });
  } catch (error) {
    console.log('Error:', error.message);
  }
};
