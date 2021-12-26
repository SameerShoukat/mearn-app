import * as actions from '../action/actions'

export const initialState = {
    loading : false,
    hasErrors : false,
    exercise : []
}

export default function exerciseReducer ( state = initialState, action){
        switch (action.type) {
        case actions.GET_POSTS:
          return { ...state, loading: true }
        case actions.GET_POSTS_SUCCESS:
        console.log(action.payload)
          return { exercise: action.payload, loading: false, hasErrors: false }
        case actions.GET_POSTS_FAILURE:
          return { ...state, loading: false, hasErrors: true }
        case actions.DELETE_POSTS :
          return {...state, exercise : state.exercise.filter((item) => item._id !== action.payload)}
        default:
          return state
      }
     
}