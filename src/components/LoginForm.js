import React, { Component } from 'react';
import firebase from './../firebase';

export default class LoginForm extends Component {
	
	onSubmit = e => {
		e.preventDefault();
		
		this.props.errorCheck();
		
		firebase.auth().createUserWithEmailAndPassword(this.props.userEmail, this.props.password)
		.then(()=>{	
		   const user = firebase.auth().currentUser;

		   const objectToPush = {
			  displayName: this.state.userName,
			  uid: user.uid,
			  uMail: user.email
		   }
		   firebase.database().ref(`users`)
			.push(objectToPush)
			.then(()=> { console.log('Success!') })
			.catch(error => { console.log('Something went wrong when pushing to database', error) })

			})
			.catch(error => console.log(error))
	}
	
	
	render(){
		const errorClass = this.props.error ? 'is-invalid': '';
		console.log(this.props.userEmail)
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<input type="email" name="userEmail" value={this.props.userEmail} onChange={this.props.onChange} className={`form-control ${errorClass}`} aria-describedby="emailHelp" placeholder="Enter email" required />
						<div className="invalid-feedback">
							Please provide a valid email
						</div>
						<small className="text-muted">We will never share your email with anyone else.</small>
					</div>				
					<div className="form-group">
						<input type="email" name="userName" value={this.props.userName} onChange={this.props.onChange}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username" />
					</div>
					<div className="form-group">
						<input type="password" name="password" value={this.props.password} onChange={this.props.onChange} className={`form-control ${errorClass}`} placeholder="Password" required />
					</div>
					<div className="invalid-feedback">
						Please provide a valid password
					</div>
					<button type="submit" className="btn btn-primary">Register</button>
				</form>
				{ !this.props.user && <button className="btn btn-love" onClick={this.props.signInEmail}> Login </button>
							}
			</div>
		)
	}
};