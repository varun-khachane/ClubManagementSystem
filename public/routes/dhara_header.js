

auth.onAuthStateChanged(function(user){
    if(user) { 
        let userEmail = user.email;
        let atIndex = userEmail.indexOf("@");
        const userName = userEmail.substr(0, atIndex);
        console.log(userName);  //debug
        clubName.innerHTML = userName;
        const club = clubDetails(userName);
    }
});


const clubDetails = (clubName)=> {
    db.collection("clubs").where('name','==', clubName).get().then((snapshot)=>{
        uid = snapshot.docs[0].id; 
        const desc = snapshot.docs[0].data().desc;
        clubDesc.innerHTML = desc;
    })
}

const clubName = document.querySelector('.club-name');
const clubDesc = document.querySelector('.club-desc');