//fetching currUser details from db
var uid, clubName, clubDesc;
const clubNameClass = document.querySelector('.club-name');
const clubDescClass = document.querySelector('.club-desc');
const venueObj = {}

// db.collection('clubs').get().then(snapshots => {
//     snapshots.docs.forEach(doc =>{
//         id = doc.id
//         db.collection('clubs').doc(id).collection('events').where('status','==','A').get().then(snap1 => {
//             snap1.docs.forEach(doc1 => {
//                 var timestamp = doc1.data().time
                
//                 console.log(timestamp.toDate().toDateString())

//             })
//         })
//     })
// })

// function showData(){
//     var value = document.querySelector('#eventDate').value
//     console.log(value)
// }

auth.onAuthStateChanged(function(user){
    if(user) {
        let userEmail = user.email;
        let atIndex = userEmail.indexOf("@");
        clubName = userEmail.substr(0, atIndex);


        db.collection("clubs").where('name','==', clubName).get().then((snapshot)=>{
            uid = snapshot.docs[0].id; 
            clubDesc = snapshot.docs[0].data().desc;
        })
        .catch(function(error){
            console.log("user with the name:",clubName," not found!\n",error);
        })
    }
});

//create a dateTime stamp in JS
function newTimeStamp(dateTime) {
    var dateString = dateTime,  //(actual format = '2013-09-17')
    dateTimeParts = dateString.split(' '),
    timeParts = dateTimeParts[1].split(':'),
    dateParts = dateTimeParts[0].split('-'),
    date;

    date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1]);
    return new firebase.firestore.Timestamp.fromDate(date);
}

//store the eventForm input details.
const eventForm = document.querySelector("#eventDetails");
eventForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let eventName = eventForm['eventNameInput'].value;
    let eventDesc = eventForm['descInput'].value;
    let eventDate = eventForm['eventDate'].value;
    let eventTime = eventForm['eventTime'].value;
    let eventDuration = eventForm['eventDuration'].value;
    let eventPlace = eventForm['eventPlace'].value;
    let eventURL = eventForm['posterURL'].value;
    let eventStatus = 'NA';
    let eventTimeStamp = newTimeStamp(eventDate + " " + eventTime);
    console.log(eventTimeStamp);

    db.collection("clubs").doc(uid).collection("events").add({
        clubname: clubName,
        desc: eventDesc,
        duration: eventDuration,
        hall : eventPlace,
        name: eventName,
        status: eventStatus,
        time: eventTimeStamp,
        url: eventURL
    })
    .then(function(docRef) {
        eventForm.reset();
        console.log("New event requested with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});


// Disable all the booked-halls.
// $(document).ready(function(){
//     let venueID = $('#eventPlace');
//     // let approvedEvents = new Array();
//     console.log("uid:" ,uid);
//     db.collection('clubs').doc(uid).collection('events').get().then((snapshot)=>{
//         snapshot.forEach((doc)=>{
//             const venue = doc.data().hall;
//             const status = doc.data().status;

//             if(status == 'A'){  //disable all the booked venues.
//                 $(`${venueID} option[${venue}]`).attr("disabled","disabled");   
//             }
//         });
//     });
// });