import React,{Component} from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'



export default class CreateUser extends Component{
    constructor(props){
        super(props)

        this.onChangeUserName = this.onChangeUserName.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    
        this.state={
            username : ""
        }
    }

    onChangeUserName(e){
        this.setState({
        username : e.target.value       
        })
    }

    onSubmit(e){
        e.preventDefault();
        const user={
        username : this.state.username
        }
        axios.post('http://localhost:5000/users/add', user)
        .then(res => alert(res.data))
    
        this.setState({
            username : ""
        })

    }


    render(){
        return(
            <div className="container" style={{display:"flex", flexDirection:"row", width:"100%", height : "700px"}}>
                <div className="user-cont ">
                <div className="row justify-content-center ">
                    <div className="col-md-7 style-bg box-shadow" style={{padding : "40px"}}>
                <h2 className="heading">Create User</h2>
                <form action="post" onSubmit={this.onSubmit}>
                    <div className="form-group" style={{marginTop:"15px"}}>
                        <TextField id="outlined-basic" 
                        label="Dexcripition" 
                        id="filled-basic" 
                        value={this.state.username}
                        onChange={this.onChangeUserName}
                        style={{width:"100%",backgroundColor:"transparent" }}
                        />
                    </div>

                    <div style={{marginTop : '20px'}}>
                    <Button variant="contained" type="submit"  style={{backgroundColor:"#000000",color:"#ffffff"}}>
                            Create User
                    </Button>
                    </div>


                </form>
                </div>
            </div>
        </div>
        </div>
        )
    }

}