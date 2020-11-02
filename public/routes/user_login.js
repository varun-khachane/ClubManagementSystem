const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const uid = loginForm['login-uid'].value;
	const pw = loginForm['login-pw'].value;

	auth.signInWithEmailAndPassword(uid,pw).then(cred => {
		window.location.href = '/admin';
		loginForm.reset();
	}).catch(error => {
		const loginError = document.querySelector(".alert");
		loginError.style.display = "block";
		loginError.innerHTML = error;
		$('.alert').delay(3000).fadeOut('slow');
		loginForm.reset();
	})
})