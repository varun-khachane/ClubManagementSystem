

auth.onAuthStateChanged(function(user){
    if(user) { 
        let userEmail = user.email;
        let atIndex = userEmail.indexOf("@");
        const userName = userEmail.substr(0, atIndex);
        console.log(userName);  //debug
        clubname.innerHTML = userName;  //setting clubName
        const club = clubDetails(userName); //setting clubDetails
        setClubLogo(userName);
    }
});


const clubDetails = (clubname)=> {
    db.collection("clubs").where('name','==', clubname).get().then((snapshot)=>{
        uid = snapshot.docs[0].id; 
        const desc = snapshot.docs[0].data().desc;
        clubdesc.innerHTML = desc;
    })
}

//clubLogo
function setClubLogo(userName) {
    var clubLogo = document.querySelector('.club-logo');
    /*  //method 1: 
    const extension = [".png", ".jpg", ".svg", ".jpeg"];
    var imgSrc = "/images/" + userName;
    var flag = false;
    for(var i=0;i<extension.length;i++) {
        var path = imgSrc + extension[i];
        console.log("club logo path:",path);
        clubLogo.src = path;
        // clubLogo.onload = function(e){
        //     clubLogo.src = path;
        //     flag = true;
            
        // };

        clubLogo.addEventListener('onload',(e)=>{
            clubLogo.src = path;
            flag = true;
        });
        if(flag) break;
    }

    if(flag == false) {
        clubLogo.src = "/images/default.jpg";
    }
    */
   var imgSrc = "/images/" + userName + '.jpg';
   clubLogo.src = imgSrc;
    clubLogo.onload = function(e){
        clubLogo.src = imgSrc;
    };

    clubLogo.onerror = function(e){
        clubLogo.src = "/images/default.jpg";
    };

}

const clubname = document.querySelector('.club-name');
const clubdesc = document.querySelector('.club-desc');

// export {setClubLogo};