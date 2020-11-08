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

//getting data from firestore
db.collection("clubs").get().then((snapshot) =>{
	
	snapshot.forEach((doc) => {
		db.collection("clubs").doc(doc.id).collection("events").where('status','==','A').get().then((snapshot1) =>{
			eventsList(snapshot1.docs,doc.id);
		});
	});
	
})

//rendering the data to frontend
const eventulList = document.querySelector(".unordered_list_event");
function eventsList(events,club){
	let html = '';
	events.forEach(doc => {
		const event = doc.data();		
		ID ={
			club : club,
			event: doc.id
		};
		var date = event.time.toDate().toDateString();
		var time = event.time.toDate().toLocaleTimeString();
		// const tr = `
		// 	<tr class="event-row">
		// 		<td class="event-name">${event.name}</td>
		// 		<td class="event-time">${time}</td>
		// 		<td class="event-duration">${event.duration}</td>
		// 		<td class="event-date">${date}</td>
		// 		<td class="venue">${event.hall}</td>
		// 		<td class="name">${event.clubname}</td>
		// 		<td class="approval">
		// 			<button class="${ID.club}" id="${ID.event}" onclick="approveEvent(this.className,this.id)">
		// 				<span class="fas fa-check"></span>
		// 			</button>
		// 			<button class="${ID.club}" id="${ID.event}" onclick="disapproveEvent(this.className,this.id)">
		// 				<span class="fas fa-times"></span>
		// 			</button>
		// 		</td>
		// 	</tr>
		// `;
        // html += tr;
        
        const li = `
        <li class="event-list">
        <div class="card">
            <div class="card-header">
                 ${event.clubname}
                 <div class="float-right"><button class="btn btn-outline-danger"><i class="fas fa-heart"></i>  Follow</button></div>
                 
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <img class="img-fluid" src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="">
                </div>
                <div class="col-sm-8">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">${event.desc}
                        </p>
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-outline-success align-bottom" data-toggle="modal"
                            data-target="#exampleModal">
                            Register
                        </button>
                        

                        <!-- Modal -->
                        <div class="modal fade" id="exampleModal" tabindex="-1"
                            aria-labelledby="exampleModalLabel">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Event Details</h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <ul>
                                            <li>Date - ${date}</li>
                                            <li>Time - ${time}</li>
                                            <li>Venue - ${event.hall}</li>

                                        </ul>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-success"
                                            data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    </li>
    `;
    html += li;
	});
	eventulList.innerHTML += html;
}