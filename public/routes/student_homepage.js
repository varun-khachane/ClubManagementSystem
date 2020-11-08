////////////////////////

//NAME OF THE STUDENT AND REGNO


auth.onAuthStateChanged(function(user) {
    
    db.collection('students').where('uid','==',user.uid).get().then(snapshots => {
        console.log();
      document.getElementById('navuser').innerHTML = snapshots.docs[0].data().name;
      document.getElementById('navuser-reg').innerHTML = snapshots.docs[0].data().regno;
    })
  }); 

///////////////////////

// Events List

