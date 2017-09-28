import React from 'react';

export default function ChatMessagesDisplay(props){
	const date = Date();
  	return(
	  <div>
	  	<div className="card text-white bg-info mb-3" style={{maxWidth: '20rem'}}>
		  <div className="card-body">
			<p className="font-italic text-left">Sent by: {props.userEmail}</p>
		  </div>
		</div>
	  </div>
	)
}