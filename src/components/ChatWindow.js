import React, { Component } from 'react';
import firebase from './../firebase';
import emojione from 'emojione';
import $ from 'jquery';

import ChatMessageInput from './ChatMessageInput.js';
//import ChatMessagesDisplay from './ChatMessagesDisplay.js';

export default class ChatWindow extends Component {
	state = {
		message: '',
		messages: []
	}
	
	componentDidMount(){
		firebase.database().ref(`messages`)
			.orderByChild('date')
			.on('child_added', (snapshot) => {
            const messages = [...this.state.messages];
			
			const message = {
				key: snapshot.key,
				value: snapshot.val()
			}
			messages.push(message);
            this.setState({
				messages: messages
			});
			
			this.emojiConvert();
        })
		
		firebase.database().ref(`messages`)
			.on('child_removed', (snapshot) => {
            const messages = [...this.state.messages];
			
			const filteredMessage = messages.filter((item) =>{
				if(item.key !== snapshot.key){
					return item;
				}
			})
            this.setState({
				messages: filteredMessage
			});
        })
		
		firebase.database().ref(`messages`)
			.on('child_changed', (snapshot) => {
			
            const messages = [...this.state.messages];
			
			const updatedMessages = messages.map( item =>{
				if(item.key === snapshot.key){
					return Object
						.assign({}, item, {value: snapshot.val()})
				}else{
					return item;
				}
			})
            this.setState({
				messages: updatedMessages
			});
        })
	}
	
	addMessage = (e) => {
       e.preventDefault();
	
	   const user = firebase.auth().currentUser;
		
       const objectToPush = {
          content: this.state.message,
		  uid: user.uid,
		  uMail: user.email
       }
       firebase.database().ref(`messages`)
		   .push(objectToPush)
		   .then(()=> { console.log('Pushed!') })
		   .catch(error => { console.log('Something went wrong', error) })
	   
	   this.setState({message: ''})
    }
	
	removeMessage = (key) => {
        firebase.database().ref(`messages/${key}`).remove()
            .then(()=> {console.log('Removed!')})
            .catch(error => {console.log('You messed up', error)})
    }
	
	emojiKeyDown = (e) => {
		let message = this.state.message
		switch(e.keyCode) {
			case 80:
				return this.setState({ message: `:joy: ${message}` })
				break;
			case 81:
				return this.setState({ message: `:cry: ${message}` })
				break;
			case 82:
				return this.setState({ message: `:triumph: ${message}` })
				break;
			case 83:
				return this.setState({ message: `:imp: ${message}` })
				break;
			case 84:
				return this.setState({ message: `:thumbsup: ${message}` })
				break;
			case 85:
				return this.setState({ message: `:confused: ${message}` })
				break;
			case 86:
				return this.setState({ message: `:angry: ${message}` })
				break;
			case 87:
				return this.setState({ message: `:sunglasses: ${message}` })
				break;
			case 88:
				this.setState({ message: `:smile: ${message}` })
				break;
			case 8:
				this.setState({message: ''})
				break;
			case 13:
				this.addMessage(e);
				this.emojiConvert();
				break;	
			default:
				console.log("Not a Emoji");
		}
	}
	
	emojiConvert = () => {
		$(".convert-emoji").each(function() {
            var original = $(this).html();
            // use .shortnameToImage if only converting shortnames (for slightly better performance)
            var converted = emojione.toImage(original);
            $(this).html(converted);
        });
	}
	
	convert = (e) => {
		e.preventDefault();
		
		var input = document.getElementById('messageValue').innerHTML;
		var output = emojione.toImage(input);
		document.getElementById('output').innerHTML = output;
		
		this.setState({message: ''})
	}
	render(){
		const messageList = this.state.messages.map((message, index) =>
            <div key={message.key}>
				<div className="chat-message card text-white bg-info mx-auto mb-3" style={{maxWidth: '20rem'}}>
				  <div className="card-body">
					<p className="font-italic text-left">Sent by: {message.value.uMail}</p>
					<h3 className="convert-emoji">{message.value.content}</h3>
					<button className="btn btn-danger text-white mt-2" onClick={() => {this.removeMessage(message.key)}}>
						Delete
					</button>
				  </div>
				</div>				
            </div>
		)
		return (
			<div className="chatWindow">
				<div className="container">
					<div className="mb-5">
						{messageList}
					</div>
					<ChatMessageInput
						emojiKeyDown={this.emojiKeyDown}
						convert={this.convert}
						addMessage={this.addMessage}
						onChange={this.props.onChange}
						message={this.state.message}/>
				</div>
			</div>
		)
	}
};