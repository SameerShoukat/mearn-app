import axios from 'axios'
import Noty from 'noty';


function notification(message){
  new Noty({
    type : "alert",
    layout: 'topRight',
    timeout : 1500,
    text: message
  }).show();
}




export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE'
export const DELETE_POSTS = 'DELETE_POSTS'
export const UPDATE_POSTS = 'UPDATE_POSTS'
export const ADD_POSTS = "ADD_POSTS"



export const getPosts = () => ({ type: GET_POSTS })

export const getPostsSuccess = posts => ({type: GET_POSTS_SUCCESS, payload: posts,})

export const getPostsFailure = () => ({ type: GET_POSTS_FAILURE })

export const deletePost = (index) =>({type:DELETE_POSTS, payload : index})

export const updatePost = (exercise) => ({ type: UPDATE_POSTS , payload: exercise})

export const addPost = (newExercise) =>({type : ADD_POSTS , payload : newExercise})


export function fetchallPosts() {
  return async dispatch => {
    dispatch(getPosts())
    try {
      const res = await axios.get('http://localhost:5000/exercises')
      const data = await res.data
      dispatch(getPostsSuccess(data))
    } catch (error) {
      dispatch(getPostsFailure())
    }
  }
}

/*delete exercise*/
export function deleteExercise(id){
  return async dispatch =>{
    dispatch(deletePost(id))
    try{
    await axios.delete('http://localhost:5000/exercises/'+id)
        .then(response => notification(response.data))
      }
      catch(error){
        notification(error)
      }
  }
}

/*update exercise*/
export function updateExercise(index , exercise){
  return async dispatch =>{
    dispatch(updatePost(exercise))
    try{
      await axios.post('http://localhost:5000/exercises/update/'+ index, exercise)
      .then( response => notification(response.data))
    }
    catch(error){
      notification(error)
    }

  }

} 

export default function addExercise(exercise){
  return async dispatch =>{
    dispatch(addPost(exercise))
    try{
      await axios.post('http://localhost:5000/exercises/add/', exercise)
      .then(res=> notification(res.data))
    }
    catch(error){
      notification(error)
    }

  }

}