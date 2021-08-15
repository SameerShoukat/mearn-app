import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router , Route} from 'react-router-dom';
import Navbar from './components/navbar';
import ExerciseList from './components/ExerciseList';
import EditExercise from './components/EditExercise'
import CreateExercise from './components/createExercise'
import CreateUser from './components/createUser'
import background from './assets/bg.jpg'

function App() {
  return (
    <div>
        <div className="background-image" style={{backgroundImage : `url(${background})`}}>
        <Router>
            <Navbar/>
              <Route path="/" exact component={ExerciseList}></Route>
              <Route path="/edit/:id" component={EditExercise}></Route>
              <Route path="/create" component={CreateExercise}></Route>
              <Route path="/user" component={CreateUser}></Route>
          </Router>
        
      </div>
    </div>
  );
}

export default App;
