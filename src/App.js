import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';
import './bootstrap.css';
import './custom-style.css';

import LoginForm from './components/LoginForm.js';
import Navbar from './components/Navbar.js';
import ChatWindow from './components/ChatWindow.js';


export default class App extends Component {
	state = {
		users: [],
		user: '',
		userName: '',
		userEmail: '',
		password: '',
		signedIn: false,
		error: false
	}
	componentDidMount(){
		firebase.auth().onAuthStateChanged(user => {
			if(user){
				const newUser = {
					email: user.email,
					name: user.displayName,
					photoUrl: user.photoURL
				}
				this.setState({user: newUser})
			}else{
				this.setState({user: ''})
			}
		})
		firebase.database().ref('users')
			.on('child_added', (snapshot) => {
			const users = [...this.state.users];
			
			const user = {
				key: snapshot.key,
				value: snapshot.val()
			}
			users.push(user);
			this.setState({
				users: users
			});
		})
		firebase.database().ref(`users`)
			.on('child_changed', (snapshot) => {
			
            const users = [...this.state.users];
			
			const updatedUsers = users.map( item =>{
				if(item.key == snapshot.key){
					return Object
						.assign({}, item, {value: snapshot.val()})
				}else{
					return item;
				}
			})
            this.setState({
				todos: updatedUsers
			});
        })
		firebase.database().ref(`users`)
			.on('child_removed', (snapshot) => {
            const users = [...this.state.users];
			
			const filteredUser = users.filter((item) =>{
				if(item.key !== snapshot.key){
					return item;
				}
			})
            this.setState({
				todos: filteredUser
			});
        })
	}
	signInEmail = () => {
		firebase.auth().signInWithEmailAndPassword(this.state.userEmail, this.state.password)
		.catch(error => console.log(error))
	}
	signOut = () => {
		firebase.auth().signOut();
	}
	
	onChange = (e) => this.setState({[e.target.name]: e.target.value})
	
	errorCheck = () => {
		if(this.props.userEmail && this.props.password){
			this.setState({ error: false })
		}else {
			this.setState({ error: true })
		}
	}
	
	render(){
		return (
			<div className="App">
					<Navbar
						user={this.state.user}
						userName={this.state.userName}
						signOut={this.signOut} />
			
					<main className="mt-5">
						<div className="container">
							
							{ !this.state.user &&
								<LoginForm
									user={this.state.user}
									userName={this.state.userName}
									userEmail={this.state.userEmail}
									password={this.state.password}
									error={this.state.error}
									errorCheck={this.errorCheck}
									onChange={this.onChange}
									signInEmail={this.signInEmail} />
							}
							{ this.state.user &&
								<ChatWindow
									user={this.state.user}
									userEmail={this.state.userEmail}
									onChange={this.onChange}/>
							}
						</div>
					</main>
			</div>
		);
	}
}