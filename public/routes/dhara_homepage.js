//UPCOMING EVENTS THAT ARE ALREADY APPROVED-----------------------------------------

//getting data from firestore
db.collection("clubs").get().then((snapshot) =>{
	let i = 0;
	eventList = new Array();
	snapshot.forEach((doc) => {
		db.collection("clubs").doc(doc.id).collection("events").where('status','==','A').get().then((snapshot1) =>{
			eventsApproved(snapshot1.docs);
		});
	});
	
});

//rendering the data to frontend (UPCOMING EVENTS THAT ARE ALREADY APPROVED)
const eventApprovedList = document.querySelector(".approved");
function eventsApproved(events){
	let html = '';
	events.forEach(doc => {
		const event = doc.data();
		var date = event.time.toDate().toDateString();
		var time = event.time.toDate().toLocaleTimeString();
		const tr = `
			<tr class="event-row">
				<td class="event-name">${event.name}</td>
				<td class="event-time">${time}</td>
				<td class="event-duration">${event.duration}</td>
				<td class="event-date">${date}</td>
				<td class="venue">${event.hall}</td>
				<td class="name">${event.clubname}</td>
			</tr>
		`;
		html += tr;
	});
	eventApprovedList.innerHTML += html;
}



// header of the CLUBS:
//fetch the club details & update clubDesc.
let uid;
const clubDetails = (clubName)=> {
    db.collection("clubs").where('name','==', clubName).get().then((snapshot)=>{
        uid = snapshot.docs[0].data().uid;     
        const desc = snapshot.docs[0].data().desc;
        clubDesc.innerHTML = desc;
    })
}

const clubName = document.querySelector('.club-name');
const clubDesc = document.querySelector('.club-desc');

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

//Update Club-details
function updateDesc(newDesc) {
    console.log(clubName.innerHTML);

    // db.collection("clubs").where('name','==', clubName.innerHTML).get().then((snapshot)=>{
    //     console.log(snapshot.docs[0].data());
    //     const localClubName = snapshot.docs[0].data().name;
        console.log("curr uid:",uid);
        // db.collection("clubs").doc(uid).get().then();
        db.collection("clubs").doc(uid).update({
            desc : newDesc
        }).then(()=>{
            console.log("club-desc successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    // });


    
    
}