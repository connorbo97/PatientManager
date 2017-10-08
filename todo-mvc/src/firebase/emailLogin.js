import firebase from 'firebase'

export const emailLogin = (email, password) => {
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// .s..
	});	
}