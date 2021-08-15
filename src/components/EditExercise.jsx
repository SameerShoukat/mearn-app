import React,{Component} from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'
import {connect} from 'react-redux'
import { updateExercise } from '../store/action/actions';
/*css*/
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


class EditExercise extends Component{
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
        console.log(this.props.match.params.id)
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
        .then(res =>{
            this.setState({
                username : res.data.username,
                description : res.data.description,
                duration : res.data.duration,
                date :new Date(res.data.date)  
            })
            
        })
        .catch(error => console.log(error))

        axios.get('http://localhost:5000/users')
        .then(res=>{
            if(res.data.length > 0){
                this.setState({
                    users : res.data.map(user => user.username),
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

        const {update_exercise} = this.props
        await update_exercise(this.props.match.params.id, exercise)

        // await axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
        // .then(res=> alert(res.data))
        this.setState({
            username : "",
            description : "",
            duration : "",
            date : ""
        })
        window.location = "/"

        
    }
    
    render(){
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 style-bg" style={{marginTop:'100px',padding:"40px"}}>
                <h2 className="heading">Edit Exercise Log</h2>
                <form action="post" onSubmit={this.onSubmit}>
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
                        <TextField id="outlined-basic" 
                        label="Dexcripition" 
                        id="filled-basic" 
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        style={{width:"100%",backgroundColor:"transparent" }}
                        />
                    </div>

                    <div className="form-group" style={{marginTop:"15px"}}>
                        <TextField id="outlined-basic" 
                        label="Duration (in minute)" 
                        id="filled-basic"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                        style={{width:"100%",backgroundColor:"transparent" }}
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
                            Update Exercise
                    </Button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        )
    }

}
const mapDispatchToProp = (disptach) =>{
    return({
        update_exercise :(index, exercisePost) => disptach(updateExercise(index,exercisePost))
    })

}

export default connect(null, mapDispatchToProp)(EditExercise);
