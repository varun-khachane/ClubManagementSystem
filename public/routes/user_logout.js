auth.onAuthStateChanged(function(user) {
  if (!user) {
  	window.location.href = "/login";
  } else {
  	const logout = document.querySelector('.logout-btn');
	logout.addEventListener('click', (e) => {
		e.preventDefault();
		auth.signOut();
	});
  }
});