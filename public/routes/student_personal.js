const followedClubs = new Array()

auth.onAuthStateChanged(function(user) {
    
    db.collection('students').where('uid','==',user.uid).get().then(snapshots => {
    const id =  snapshots.docs[0].id
      document.getElementById('navuser').innerHTML = snapshots.docs[0].data().name;
      document.getElementById('navuser-reg').innerHTML = snapshots.docs[0].data().regno;

      db.collection('students').doc(id).collection('followed-clubs').get().then(snap => {
        let i = 0 
        snap.forEach((doc1) => {
              followedClubs[i] = doc1.data().name
              i++
          })
          renderList()
      })
      
      })
    
  }); 

  function renderList(){
  
    for(var i =0;i<followedClubs.length;i++){
         followedClub = followedClubs[i]

         db.collection("clubs").where("name","==",followedClub).get().then((snapshot) =>{
	
            snapshot.forEach((doc) => {
                console.log()
                db.collection("clubs").doc(doc.id).collection("events").where('status','==','A').get().then((snapshot1) =>{
                    eventsList(snapshot1.docs,doc.data().name,doc.id);
                });
            });
            
        })
    }

}

const eventulList = document.querySelector(".unordered_list_event");
function eventsList(events,clubName,club){
    let html = '';
    
	events.forEach(doc => {
        const event = doc.data();		
        
        ID ={
			club : club,
			event: doc.id
        };
        var regbuttonId = ID.club+","+ID.event
        
		
		var date = event.time.toDate().toDateString();
		var time = event.time.toDate().toLocaleTimeString();
        var clubclassf = event.clubname+"f"
        var clubclassnf = event.clubname+"nf"
        var modalId = event.name+"modal"
        
        const li = `
        <li class="event-list">
        <div class="card">
            <div class="card-header">
                 ${event.clubname}
                 <div class="float-right">
                 <button class="btn btn-outline-danger ${clubclassnf}" id="${event.clubname}" onclick="clubFollow(this.id)" style="display: block;"><i class="fas fa-heart"></i>  Follow</button>
                 <button class="btn btn-danger ${clubclassf}" style="display: none;"><i class="fas fa-heart"></i>  Following</button>
                 </div>
                 
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <img class="img-fluid" src=${event.url} alt="">
                </div>
                <div class="col-sm-8">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">${event.desc}
                        </p>
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-outline-success align-bottom" data-toggle="modal"
                            data-target="#${modalId}">
                            More Info..
                        </button>
                        

                        <!-- Modal -->
                        <div class="modal fade" id="${modalId}" tabindex="-1"
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
                                        <button type="button" id="${regbuttonId}" class="btn btn-primary" onclick="regEvent(this.id)">Register</button>
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
    

    if(followedClubs.includes(clubName)){
        
        var x, i,y,j;
        var clubf = "."+clubName+"f"
        var clubnf = "."+clubName+"nf"
        x = document.querySelectorAll(clubnf);
        
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        y = document.querySelectorAll(clubf);
        for (j = 0; j < y.length; j++) {
            y[j].style.display = "block";
        }
    }
}

function clubFollow(clubName){
    auth.onAuthStateChanged(function(user) {
        
        db.collection('students').where('uid','==',user.uid).get().then(snapshots => {
            const id = snapshots.docs[0].id
            
            db.collection("students").doc(id).collection('followed-clubs').where('name','==',clubName).get().then(doc1 => {
                console.log(doc1)
                if(doc1.exists){
                    
                    console.log('already followed')
                }
                else{
                    db.collection("students").doc(id).collection('followed-clubs').doc(clubName).set({
                        name: clubName
                    })
                    .then(() => {
                        console.log("follwed the club")
                        window.location.reload()
                
                    })
                    
                }
            })
          
        })
      }); 

}

function regEvent(clubevent){
    var id = clubevent.split(",")
    var clubsid = id[0]
    var eventsid = id[1]
    
    db.collection('clubs').doc(clubsid).collection('events').doc(eventsid).get().then(docf => {
        
        auth.onAuthStateChanged(function(user) {
            
            db.collection('students').where('uid','==',user.uid).get().then(snapshots => {
                const id = snapshots.docs[0].id
                
                        db.collection("students").doc(id).collection('registeredEvents').doc(docf.data().name).set({
                            clubname: docf.data().clubname,
                            desc: docf.data().desc,
                            duration : docf.data().duration,
                            hall : docf.data().hall,
                            name : docf.data().name,
                            time : docf.data().time,
                            url: docf.data().url
                        })
                        .then(() => {
                            console.log("registered for event")
                            window.alert("Registered for event successfully.")
                            
                    
                        })
          
            })

        })
        
    })

}

