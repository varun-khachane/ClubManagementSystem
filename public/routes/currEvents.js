let uid;
auth.onAuthStateChanged(function(user){
    if(user) { 
        let userEmail = user.email;
        let atIndex = userEmail.indexOf("@");
        const userName = userEmail.substr(0, atIndex);
		db.collection("clubs").where('name','==', userName).get().then((snapshot)=>{
		        uid = snapshot.docs[0].id; 
		}).then((func) => {
			//NOT APPROVED
			db.collection("clubs").doc(uid).collection("events").where('status','==','NA').get().then((snapshot1) =>{
				eventsWaitingForApproval(snapshot1.docs);
			});				

			//APPROVED
			
			db.collection("clubs").doc(uid).collection("events").where('status','==','A').get().then((snapshot1) =>{
				eventsApproved(snapshot1.docs);
			});
		})
    }
});



const eventWaitingList = document.querySelector("#events-waiting");
function eventsWaitingForApproval(events){
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
	eventWaitingList.innerHTML += html;
}


const eventApprovedList = document.querySelector("#events-approved");
function eventsApproved(events){
	let html = '';
	events.forEach(doc => {
		const event = doc.data();
		ID ={
			event: doc.id
		};
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
				<td class="cancelBtn">
					<a class="btn btn-outline-danger btn-md" id="${ID.event}" tabindex="-1" role="button" onclick="disapproveEvent(this.id)" aria-disabled="true">Cancel</a>
				</td>
			</tr>
		`;
		html += tr;
	});
	eventApprovedList.innerHTML += html;
}

function disapproveEvent(eventDocID){
	db.collection("clubs").doc(uid).collection("events").doc(eventDocID).delete().then(function() {
	    console.log("Document successfully deleted!");
	    window.location.reload();
	}).catch(function(error) {
	    console.error(error);
	});
}