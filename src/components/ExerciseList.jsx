import React,{Component} from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import {Link} from 'react-router-dom';
import  { connect } from 'react-redux';
import { fetchallPosts, deleteExercise } from '../store/action/actions';

const Exercise = (props) =>{
   return <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id} className="tr-action text-success">edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }} className="tr-action text-danger" >delete</a>
    </td>
  </tr>
}

 class ExerciseList extends Component{

    constructor(props){
        super(props)

        this.deleteExercise = this.deleteExercise.bind(this)

        // // this.state= { 
        //   exercise : [],
        //   }
    }

   async componentDidMount(){
       const {exercise_list} = this.props
    /* await axios.get('http://localhost:5000/exercises/')
      .then(response => {
          this.setState({ 
            exercise: response.data,
          })
      })
      .catch((error) => {
        console.log(error);
      })*/
    }

    async deleteExercise(id){
      const {delete_exercise} = this.props
      await delete_exercise(id)

    }

    
    exerciseList() {
      return this.props.exercise.map(currentexercise => {
       return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
      })
      
    }
  


    render() {
      if (this.props.loading) return <p style={{textAlign:"center"}
    }>Loading...</p>;
      if (this.props.hasErrors) return <p>No Exercise to display ...</p>;
      else{
        return (
          <div className="container" style={{marginTop:"20px"}}>
            <h3 className="heading">Logged Exercises</h3>
            <div className="style-bg border" style={{marginTop:"50px",padding:"20px"}}>
            <table className="table  text-light " >
              <thead style={{border :"none"}}>
                <tr>
                  <th>Username</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
            { this.exerciseList() }
          </tbody>
              </table>
              </div>
          </div>
        )
      }
    }
  }
    const mapStateToProps = (state) =>({
      loading : state.exercises.loading,
      exercise : state.exercises.exercise,
      hasError : state.exercises.hasError,

    })

    const mapDispatchToProp = (dispatch) => {
      return({
      exercise_list : () => {dispatch(fetchallPosts())},
      delete_exercise : (id)=> {dispatch(deleteExercise(id))}
      })
    }


    export default connect(mapStateToProps, mapDispatchToProp)(ExerciseList);