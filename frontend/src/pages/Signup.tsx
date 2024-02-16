import {Component} from "react";
import {Link} from "react-router-dom";

interface User {
    email: String;
    username: String;
    password: String;
    password2: String;
}

class Signup extends Component<User>{
    constructor(props:any){
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            password2: ''
        };

    }

    handleChange = (e:any) => {
        const {name, value} = e.target();
        this.setState({[name]: value})
    }

    handleSubmit = (e:any) => {
        e.preventDefault();

        // Create JSON object with login
        const signupData = {
            email: this.state.email,
            username: this.state.username,
            
        }
    }
}

export default Signup