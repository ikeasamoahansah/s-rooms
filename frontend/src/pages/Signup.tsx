import React from "react";
import {Link, redirect} from "react-router-dom";
import api from "../api";

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

        // const csrftoken = Cookies.get('csrftoken');

        // Send POST request to Django server
        const response = await api.post("/api/accounts/register/", {
            email: signupData.email,
            username: signupData.username,
            password: signupData.password,
            password2: signupData.password2
        });

        // Get response from server
        if (response.status === 201){
            redirect('/login');
        } else {
            alert('There was an error creating the user');
        }
    }   
    
    render(){
        return (
            <div className="flex justify-center items-center h-screen">
                <form onSubmit={this.handleSubmit} className="flex flex-col items-center">
                    <div className="mb-4">
                        <label htmlFor="email" className="mr-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            className="border border-gray-300 rounded px-2 py-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="mr-2">
                            Username:
                        </label>
                        <input
                            type="text"
                            name="username"
                            onChange={this.handleChange}
                            className="border border-gray-300 rounded px-2 py-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mr-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            className="border border-gray-300 rounded px-2 py-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mr-2">Confirm Password:</label>
                        <input
                            type="password"
                            name="password2"
                            onChange={this.handleChange}
                            className="border border-gray-300 rounded px-2 py-1"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Sign Up
                    </button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        );
    }

}

export default Signup