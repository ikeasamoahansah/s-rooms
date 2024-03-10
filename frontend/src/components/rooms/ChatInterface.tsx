import React from "react";
import axios from "axios";
import { getToken, getUser } from "../../context/auth";

interface Message {
    room: number;
    user: number;
    text: string;
    created_at: Date;
}

interface ChatInterfaceProps {
    messages: Message[];
    roomId: any;
}

interface ChatState {
    newMessage: string;
}

class ChatInterface extends React.Component<ChatInterfaceProps, ChatState> {
    constructor(props: ChatInterfaceProps) {
        super(props);
        this.state = {
            newMessage: ""
        }
    }

    // Function to send a new message
    sendMessage = () => {
        const {roomId} = this.props;
        const {newMessage} = this.state;

        // Create a new message object
        const message: Message = {
            room: roomId,
            user: getUser(), // Replace with the actual sender's name
            text: newMessage,
            created_at: new Date(),
        };

        // Send the message to the server or update the local state
        // Example: this.sendMessageToServer(message);
        axios.post("http://127.0.0.1:8000/rooms", message, {
            headers: {
                'Authorization': `token ${getToken()}`
            }
        })
    };

    // Function to handle input change
    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newMessage: event.target.value });
    };

    render() {

        const messages = this.props.messages;
        const {newMessage} = this.state;

        return (
            <div className="flex flex-col h-screen">
                <div className="flex-1 p-4 overflow-v-auto">
                    {messages.map((message, index: number) => (
                        <div key={index}>
                            <strong>{message.user.username}</strong>: {message.text}
                        </div>
                    ))}
                </div>
                <div className="flex items-center p-4 ">
                    <input type="text" value={newMessage} onChange={this.handleInputChange} />
                    <button onClick={this.sendMessage} className="bg-blue-500 text-white p-2 rounded-r-lg ml-2">Send</button>
                </div>
            </div>
        );
    }
}

export default ChatInterface;
