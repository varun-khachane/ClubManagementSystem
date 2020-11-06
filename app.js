var express = require("express");


var firebase = require("firebase");
var firebaseConfig = {
   apiKey: "AIzaSyD1zNmA4uYzezvcCJhBFMEblmKiyBY_De0",
   authDomain: "club-activity-management.firebaseapp.com",
   databaseURL: "https://club-activity-management.firebaseio.com",
   projectId: "club-activity-management",
   storageBucket: "club-activity-management.appspot.com",
   messagingSenderId: "386510555091",
   appId: "1:386510555091:web:477e5a39bee0b2eb53d126",
   measurementId: "G-3C312DNRFF"
};
var fb = firebase.initializeApp(firebaseConfig);
const auth = fb.auth();
const db = fb.firestore();
db.settings({timestampsInSnapshots: true});

var app = express();
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");



//routes///////////////////////////////////////////////////////////////////////////



app.get("/",function(req,res){
	res.render("home");
});

var user = {msg:""};

app.get("/login",function(req,res){
	res.render("login",{user:user});
});


app.post("/login",function(req,res){
	const uid = req.body.username;
	const pw = req.body.password;
	var index = uid.search('@');
	var checkUser = (uid.charAt(index+1));
	var msg  = {};
	auth.signInWithEmailAndPassword(uid,pw).then(cred => {
		
		if(checkUser === 'd'){
			res.redirect("/dhara");
		}else if(checkUser === 'a'){
			res.redirect("/admin");
		}else if(checkUser === 's'){
			res.redirect("/student");
		}
	}).catch(error => {
		// const loginError = document.querySelector(".alert");
		// loginError.style.display = "block";
		// loginError.innerHTML = error;
		// $('.alert').delay(3000).fadeOut('slow');
		// loginForm.reset();
		user = {msg: error};
		res.redirect("/login");
	})
});



app.use((req,res,next) => {
	if(auth.currentUser == null){
		res.redirect("/")
	}
	return next();
   });


function authChecker(req,res,next) {
	auth.onAuthStateChanged(function(user1) {
	  if (!user1) {
	  	//window.location.href = "../";
	  	res.render("login",{user:user})
	  } else {
	  	//const logout = document.querySelector('.logout-btn');
		// logout.addEventListener('click', (e) => {
			// e.preventDefault();
			next();
		// 	auth.signOut().then(() => {
		// 		// window.location.href = '../';
		// 		res.redirect("/");

		// 	// });
		// });
	  }
	});
}

app.use(authChecker);

app.get("/logout",(req,res)=>{
	auth.signOut().then(()=>{
		res.redirect("/");
	});
})



//admin routes/////////////////////////////////////////////////////////////////////



async function eventApprovallist(snapshot, eventList) {
	snapshot.forEach((doc) => {
		db.collection("clubs").doc(doc.id).collection("events").get().then((snapshot1) =>{
			snapshot1.forEach(doc1 => {
				eventList[i] = doc1.data();
				eventList[i].clubname = doc.data().name;
				i++;	
			});
		});
	});

	return eventList;
}

app.get("/admin",function(req,res){

	
	if(auth.currentUser != null){
		db.collection("clubs").get().then((snapshot) =>{
			let i = 0;
			eventList = new Array();
			eventList =  await eventApprovallist(snapshot, eventList);
			console.log(eventList);
			res.render("admin/admin_homepage",{eventList: eventList});	
		}).catch((err) => {
			console.log(err);
		});
	}
	else{
		res.redirect("/")
	}
	
});

//dhara routes//////////////////////////////////////////////////////////////////////

app.get("/dhara",function(req,res){
	res.render("dhara/dhara_homepage");
});

app.get("/dhara/events",function(req,res){
	res.render("dhara/currEvents");
});

app.get("/dhara/events/new",function(req,res){
	res.render("dhara/eventForm");
});


//student routes//////////////////////////////////////////////////////////////////////

app.get("/student",function(req,res){
	res.render("students/student_homepage");
});

app.get("/student/all_clubs",function(req,res){
	res.render("students/students_club");
});

app.get("/student/all_clubs/club",function(req,res){
	res.render("students/club_page");
});



// app.listen(process.env.PORT, process.env.IP, function(){
// 	console.log("Server started...");
// })

app.listen(3000,function(){
	console.log("Server started at 3000...");
});