import React from 'react';

export default function ChatMessageInput(props){
	function onSubmit(e){
	  e.preventDefault();
	  props.convert();
	}
	return(
		<div className="fixed-bottom bg-love inverse mt-3 p-3">
			<input type="text" name="message" className="form-control" id="chatMessageInput" onChange={props.onChange} value={props.message} onKeyDown={props.emojiKeyDown} placeholder="Write Your Emojis Here" required/>
		</div>
	)
}