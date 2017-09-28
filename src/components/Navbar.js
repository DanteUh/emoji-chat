import React from 'react';

export default function Navbar(props){
  return(
	  <div>
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
		  		<a className="navbar-brand convert-emoji" href="index.html">HeyMoji</a>
		  		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
		  		</button>
		  		<div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
				{ props.user &&
					<ul className="navbar-nav">
						<li className="nav-item active">
							<a className="nav-link" href="#">{props.userName} <span className="sr-only">(current)</span></a>
						</li>
					</ul>
				}
				{ props.user && <button className="btn btn-primary" onClick={props.signOut}> Sign out </button>
					}
		  		</div>
			</div>
		</nav>
	</div>
	)
}