auth.signOut();
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const uid = loginForm['login-uid'].value;
	const pw = loginForm['login-pw'].value;
	var index = uid.search('@');
	var checkUser = (uid.charAt(index+1));
	auth.signInWithEmailAndPassword(uid,pw).then(cred => {
		if(checkUser === 'd'){
			window.location.href = '/dhara';
		}else if(checkUser === 'a'){
			window.location.href = '/admin';
		}else if(checkUser === 's'){
			window.location.href = '/student';
		}
		
		loginForm.reset();
	}).catch(error => {
		const loginError = document.querySelector(".alert");
		loginError.style.display = "block";
		loginError.innerHTML = error;
		$('.alert').delay(3000).fadeOut('slow');
		loginForm.reset();
	})
})