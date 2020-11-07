//EVENTS THAT ARE WAITING FOR APPROVAL------------------------------------------------

//getting data from firestore
db.collection("clubs").get().then((snapshot) =>{
	let i = 0;
	eventList = new Array();
	snapshot.forEach((doc) => {
		db.collection("clubs").doc(doc.id).collection("events").where('status','==','NA').get().then((snapshot1) =>{
			eventsWaitingForApproval(snapshot1.docs);
		});
	});
	
}).catch((err) => {
	console.log(err);
});

//rendering the data to frontend
const eventWaitingList = document.querySelector(".waiting-for-approval");
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
				<td class="approval">
					<button onclick="approveEvent()">
						<span class="fas fa-check"></span>
					</button>
					<button onclick="disapproveEvent()">
						<span class="fas fa-times"></span>
					</button>
				</td>
			</tr>
		`;
		html += tr;
	});
	eventWaitingList.innerHTML += html;
}


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
	
}).catch((err) => {
	console.log(err);
});

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

//WHEN ADMIN CLICKS APPROVE EVENT BUTTON-----------------------------------------
function approveEvent(){
	
}


//WHEN ADMIN CLICKS DISAPPROVE EVENT BUTTON-----------------------------------------
function disapproveEvent(){
	
}


