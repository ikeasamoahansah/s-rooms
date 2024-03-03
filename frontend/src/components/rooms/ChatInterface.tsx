import React from "react";
import axios from "axios";
import { getToken, getUser } from "../../context/auth";

interface Message {
    sender: number;
    content: string;
    timestamp: Date;
}

interface ChatInterfaceProps {
    groupId: number;
}

interface ChatInterfaceState {
    messages: Message[];
    newMessage: string;
}

class ChatInterface extends React.Component<ChatInterfaceProps, ChatInterfaceState> {
    constructor(props: ChatInterfaceProps) {
        super(props);
        this.state = {
            messages: [],
            newMessage: "",
        };
        this.fetchMessages(props.groupId);
    }

    fetchMessages = async (roomId:number) => {
        const response = await axios.get(`http://127.0.0.1:8000/rooms/${roomId}`, {
            headers: {
                Authorization: `token ${getToken()}`
            }
        })
        this.setState({ messages: response.data.messages });
    }

    componentDidMount() {
        // Fetch messages from the server or initialize with some default messages
        // Example: this.fetchMessages();
    }

    // Function to send a new message
    sendMessage = () => {
        const { newMessage } = this.state;
        const { groupId } = this.props;

        // Create a new message object
        const message: Message = {
            sender: getUser(), // Replace with the actual sender's name
            content: newMessage,
            timestamp: new Date(),
        };

        // Send the message to the server or update the local state
        // Example: this.sendMessageToServer(message);
        axios.post("/rooms", message)
            .then(response => {
            // Handle the response from the server
            })
            .catch(error => {
            // Handle any errors that occur during the request
            });

        // Clear the input field
        this.setState({ newMessage: "" });
    };

    // Function to handle input change
    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newMessage: event.target.value });
    };

    render() {
        const { messages, newMessage } = this.state;

        return (
            <div className="flex flex-col h-screen">
                <div className="flex-1 p-4 overflow-v-auto">
                    {messages.map((message, index) => (
                        <div key={index}>
                            <strong>{message.sender}</strong>: {message.content}
                        </div>
                    ))}
                </div>
                <div className="flex items-center p-4">
                    <input type="text" value={newMessage} onChange={this.handleInputChange} />
                    <button onClick={this.sendMessage} className="bg-blue-500 text-white p-2 rounded-r-lg ml-2">Send</button>
                </div>
            </div>
        );
    }
}

export default ChatInterface;
