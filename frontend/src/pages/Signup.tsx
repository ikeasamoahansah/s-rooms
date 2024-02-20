import React from "react";
import {Link} from "react-router-dom";
import Cookies from 'js-cookie';

type UserState = {
    email: String;
    username: String;
    password: String;
    password2: String;
}

class Signup extends React.Component<{}, UserState>{
    state: UserState = {
        email: '',
        username: '',
        password: '',
        password2: ''
    }

    constructor(props: {}){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value } as Pick<UserState, any>);
    }

    handleSubmit = async (e:any) => {
        e.preventDefault();

        // Create JSON object with login
        const signupData = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
        }

        const csrftoken = Cookies.get('csrftoken');
        const url = 'http://127.0.0.1:8000/accounts/register/';

        // Send POST request to Django server
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken || ''
            },
            body: JSON.stringify(signupData)
        })

        // Get response from server
        if (response.status === 201){
            alert('User created successfully');
        } else {
            alert('There was an error creating the user');
        }
    }   
    
    render(){
        return(
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input type="password" name="password2" onChange={this.handleChange} />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        )
    }

}

export default Signup