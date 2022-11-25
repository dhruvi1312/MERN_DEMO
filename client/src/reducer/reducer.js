import { ADD_STUDENT, ALL_STUDENTS, CURRENT_STUDENT, SIGNIN, UPDATE_STUDENT} from '../ActionTypes/index';

const initialState = {
  admin: {},
  students: [],
  currentStudent: {},
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        admin: action.payload,
      };
    case ALL_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };
    case ADD_STUDENT:
      return {
        ...state,
        students: [...action.payload]
      }
    case UPDATE_STUDENT:
      return {
        ...state,
        students: [...action.payload]
      }
    case CURRENT_STUDENT:
      return {
        ...state,
        currentStudent:action.payload
      }
    default:
      return state;
  }
};

export default Reducer;
