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
          renderList(id)
      })
      
      
      })
    
    
  }); 

  function renderList(id){
    db.collection('students').doc(id).collection("registeredEvents").get().then((snapshots1)=>{
        regEventsList(snapshots1.docs)
    })
  }


  const regeventulList = document.querySelector(".unordered_list_event");


  function regEventsList(events){
    let html = '';
    var clubName = []
    var i = 0
	events.forEach(doc => {
        const event = doc.data();		
        clubName[i] = event.clubname
        i+=1
		var date = event.time.toDate().toDateString();
		var time = event.time.toDate().toLocaleTimeString();
        var clubclassf = event.clubname+"f"
        var clubclassnf = event.clubname+"nf"
        
        
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
                        <p>
                            <ul>
                                <li><strong>Event Details</strong> </li>
                                <li>Date - ${date}</li>
                                <li>Time - ${time}</li>
                                <li>Venue - ${event.hall}</li>
                            </ul>
                        </p>

    
                    </div>
                </div>
            </div>



        </div>
    </li>
    `;
    html += li;
    
	});
    regeventulList.innerHTML += html;
    
    for(var k = 0;k<clubName.length;k++){
        var clubbName = clubName[k]
        if(followedClubs.includes(clubbName)){
            console.log("hii")
            var x, i,y,j;
            var clubf = "."+clubbName+"f"
            var clubnf = "."+clubbName+"nf"
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

  