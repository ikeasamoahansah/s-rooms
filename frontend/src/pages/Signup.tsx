import {Component} from "react";
// import {Link} from "react-router-dom";

interface UserState {
    email: String;
    username: String;
    password: String;
    password2: String;
}

class Signup extends Component<{}, UserState>{
    state: UserState = {
        email: '',
        username: '',
        password: '',
        password2: ''
    }

    constructor(props: {}){
        super(props);

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
            password: this.state.password,
            password2: this.state.password2
        }
    }
}

export default Signup