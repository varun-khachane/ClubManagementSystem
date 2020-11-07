//EVENTS THAT ARE WAITING FOR APPROVAL------------------------------------------------

//getting data from firestore
db.collection("clubs").onSnapshot((snapshot) =>{
	let i = 0;
	eventList = new Array();
	snapshot.forEach((doc) => {
		db.collection("clubs").doc(doc.id).collection("events").where('status','==','NA').onSnapshot((snapshot1) =>{
			eventsWaitingForApproval(snapshot1.docs,doc.id);
		});
	});
	
})

//rendering the data to frontend
const eventWaitingList = document.querySelector(".waiting-for-approval");
function eventsWaitingForApproval(events,club){
	let html = '';
	events.forEach(doc => {
		const event = doc.data();		
		ID ={
			club : club,
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
				<td class="approval">
					<button class="${ID.club}" id="${ID.event}" onclick="approveEvent(this.className,this.id)">
						<span class="fas fa-check"></span>
					</button>
					<button class="${ID.club}" id="${ID.event}" onclick="disapproveEvent(this.className,this.id)">
						<span class="fas fa-times"></span>
					</button>
				</td>
			</tr>
		`;
		html += tr;
	});
	eventWaitingList.innerHTML += html;
}


//WHEN ADMIN CLICKS APPROVE EVENT BUTTON-----------------------------------------
function approveEvent(clubDocID,eventDocID){
	db.collection("clubs").doc(clubDocID).collection("events").doc(eventDocID).update({
		status: "A"
	});
	document.getElementById("event-approved").style.display = "block";
	$('#event-approved').delay(2000).fadeOut('slow');
}


//WHEN ADMIN CLICKS DISAPPROVE EVENT BUTTON-----------------------------------------
function disapproveEvent(clubDocID,eventDocID){
	db.collection("clubs").doc(clubDocID).collection("events").doc(eventDocID).delete().then(function() {
	    console.log("Document successfully deleted!");
	}).catch(function(error) {
	    console.error(error);
	});
	document.getElementById("event-disapproved").style.display = "block";
	$('#event-disapproved').delay(2000).fadeOut('slow');
}



//UPCOMING EVENTS THAT ARE ALREADY APPROVED-----------------------------------------

//getting data from firestore
db.collection("clubs").onSnapshot((snapshot) =>{
	let i = 0;
	eventList = new Array();
	snapshot.forEach((doc) => {
		db.collection("clubs").doc(doc.id).collection("events").where('status','==','A').onSnapshot((snapshot1) =>{
			eventsApproved(snapshot1.docs);
		});
	});
	
})

//rendering the data to frontend
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




