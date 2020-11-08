//fetching currUser details
auth.onAuthStateChanged(function(user){
    if(user) {
        let userEmail = user.email;
        let atIndex = userEmail.indexOf("@");
        const userName = userEmail.substr(0, atIndex);
    }
})