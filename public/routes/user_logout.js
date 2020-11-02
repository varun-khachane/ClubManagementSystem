auth.onAuthStateChanged(function(user) {
  if (!user) {
  	window.location.href = "../";
  } else {
  	const logout = document.querySelector('.logout-btn');
	logout.addEventListener('click', (e) => {
		e.preventDefault();
		auth.signOut().then(() => {
			window.location.href = '../';
		});
	});
  }
});