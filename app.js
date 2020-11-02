var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/",function(req,res){
	res.render("home");
});

app.get("/login",function(req,res){
	res.render("login");
});

app.post("/login",function(req,res){
	var id = req.body.username;
	var pw = req.body.password;
	res.redirect("/"); //Go to home page of student or admin or dhara 
})

//admin routes

app.get("/admin",function(req,res){
	res.render("admin/admin_homepage");
});

//dhara routes

app.get("/dhara",function(req,res){
	res.render("dhara/dhara_homepage");
});

app.get("/dhara/events",function(req,res){
	res.render("dhara/currEvents");
});

app.get("/dhara/events/new",function(req,res){
	res.render("dhara/eventForm");
});


//student routes

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