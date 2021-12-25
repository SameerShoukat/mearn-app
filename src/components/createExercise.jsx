import React,{Component} from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'
import {connect} from 'react-redux'
import addExercise from '../store/action/actions';
/*css*/
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';




class CreateExercise extends Component{
    constructor(props){
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state={
            username:'',
            description : '',
            duration : 0,
            date : new Date(),
            users : [],
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users')
        .then(res=>{
            if(res.data.length > 0){
                this.setState({
                    users : res.data.map(user => user.username),
                    username : res.data[0].username
                })

            }
        })
      

    }
    onChangeUserName(e){
        this.setState({
            username : e.target.value
        });
    }
    onChangeDescription(e){
        this.setState({
            description : e.target.value
        });
    }
    onChangeDuration(e){
        this.setState({
            duration : e.target.value
        });
    }
    onChangeDate(date){
        this.setState({
            date : date
        });
    }
    async onSubmit(e){
        e.preventDefault();

        const exercise ={
            username : this.state.username,
            description : this.state.description,
            duration : this.state.duration,
            date : this.state.date
        }
        const {add_exercise} = this.props
        await add_exercise(exercise)
        this.setState({
            username : "",
            description : "",
            duration : "",
            date : ""
            
        })

    }
    
    render(){
        return(
            <div className="container ">
                <div className="row justify-content-center">
                    <div className="col-md-7 style-bg " style={{marginTop:'80px',padding:"40px"}}>
                <h2 className="heading">Create Exercise Log</h2>

                <form action="post" onSubmit={this.onSubmit} >
                <FormControl className="style-select">
                <InputLabel id="demo-controlled-open-select-label">Username</InputLabel>
                <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                value={this.state.username}
                onChange={this.onChangeUserName}
                >
                {
                    this.state.users.map((users, i)=>{
                        return <MenuItem value={users} key={users}>
                            {users}
                        </MenuItem>;
                    })
                }
                </Select>
            </FormControl>
                    <div className="form-group" style={{marginTop:"15px"}}>
                    <TextField id="standard-basic" label="Description" value={this.state.description}
                        onChange={this.onChangeDescription}
                        style={{width:"100%", }} />
                    </div>

                    <div className="form-group" style={{marginTop:"15px"}}>
                        <TextField id="outlined-basic" 
                        label="Duration (in minute)" 
                        id="filled-basic" 
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                        style={{width:"100%", }}
                        />
                    </div>
                    <div className="form-group style-date" style={{width:"100%",marginTop:"5px",borderBottom:"0.2px solid #878787"}}>
                        <label htmlFor="date" >Date :</label>
                        <div>
                            <DatePicker 
                            selected ={this.state.date}
                            onChange ={this.onChangeDate}
                            >

                            </DatePicker>
                        </div>
                    </div>

                    <div style={{marginTop : '20px'}}>
                    <Button variant="contained" type="submit" style={{backgroundColor:"#000000",color:"#ffffff"}}>
                            Create Exercise
                    </Button>
                    </div>
                </form>
                </div>
                </div>
            </div>
        )
    }

}


const mapDispatchToProp = (dispatch) =>{
    return({
        add_exercise : (exercise) => dispatch(addExercise(exercise))
    })
}

export default connect(null,mapDispatchToProp)(CreateExercise)