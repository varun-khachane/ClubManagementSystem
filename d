[33mcommit e27960b96eaf0a10f1bb8bab880b6c24195a1a0b[m[33m ([m[1;36mHEAD -> [m[1;32mmaster[m[33m, [m[1;31morigin/master[m[33m, [m[1;31morigin/HEAD[m[33m)[m
Author: RishikeshSV <rishuvidyarthi@gmail.com>
Date:   Mon Nov 2 17:37:52 2020 +0530

    admin route naming

[1mdiff --git a/app.js b/app.js[m
[1mindex 9ec4d1d..a7c53b5 100644[m
[1m--- a/app.js[m
[1m+++ b/app.js[m
[36m@@ -22,7 +22,7 @@[m [mapp.post("/login",function(req,res){[m
 [m
 //admin routes[m
 [m
[31m-app.get("/admin_home",function(req,res){[m
[32m+[m[32mapp.get("/admin",function(req,res){[m
 	res.render("admin/admin_homepage");[m
 });[m
 [m

[33mcommit 2b9cb91f3f1f9f895a89e7de66219c6937c68da1[m
Author: RishikeshSV <rishuvidyarthi@gmail.com>
Date:   Sun Oct 25 17:18:11 2020 +0530

    including express

[1mdiff --git a/app.js b/app.js[m
[1mnew file mode 100644[m
[1mindex 0000000..9ec4d1d[m
[1m--- /dev/null[m
[1m+++ b/app.js[m
[36m@@ -0,0 +1,66 @@[m
[32m+[m[32mvar express = require("express");[m
[32m+[m[32mvar app = express();[m
[32m+[m[32mvar bodyParser = require("body-parser");[m
[32m+[m
[32m+[m[32mapp.use(express.static(__dirname + "/public"));[m
[32m+[m[32mapp.use(bodyParser.urlencoded({extended:true}));[m
[32m+[m[32mapp.set("view engine", "ejs");[m
[32m+[m
[32m+[m[32mapp.get("/",function(req,res){[m
[32m+[m	[32mres.render("home");[m
[32m+[m[32m});[m
[32m+[m
[32m+[m[32mapp.get("/login",function(req,res){[m
[32m+[m	[32mres.render("login");[m
[32m+[m[32m});[m
[32m+[m
[32m+[m[32mapp.post("/login",function(req,res){[m
[32m+[m	[32mvar id = req.body.username;[m
[32m+[m	[32mvar pw = req.body.password;[m
[32m+[m	[32mres.redirect("/"); //Go to home page of student or admin or dhara[m[41m [m
[32m+[m[32m})[m
[32m+[m
[32m+[m[32m//admin routes[m
[32m+[m
[32m+[m[32mapp.get("/admin_home",function(req,res){[m
[32m+[m	[32mres.render("admin/admin_homepage");[m
[32m+[m[32m});[m
[32m+[m
[32m+[m[32m//dhara routes[m
[32m+[m
[32m+[m[32mapp.get("/dhara",function(req,res){[m
[32m+[m	[32mres.render("dhara/dhara_homepage");[m
[32m+[m[32m});[m
[32m+[m
[32m+[m[32mapp.get("/dhara/events",function(req,res){[m
[32m+[m	[32mres.render("dhara/currEvents");[m
[32m+[m[32m});[m
[32m+[m
[32m+[m[32mapp.get("/dhara/events/new",function(req,res){[m
[32m+[m	[32mres.render("dhara/eventForm");[m
[32m+[m[32m});[m
[32m+[m
[32m+[m
[32m+[m[32m//student routes[m
[32m+[m
[32m+[m[32mapp.get("/student",function(req,res){[m
[32m+[m	[32mres.render("students/student_homepage");[m
[32m+[m[32m});[m
[32m+[m
[32m+[m[32mapp.get("/student/all_clubs",function(req,res){[m
[32m+[m	[32mres.render("students/students_club");[m
[32m+[m[32m});[m
[32m+[m
[32m+[m[32mapp.get("/student/all_clubs/club",function(req,res){[m
[32m+[m	[32mres.render("students/club_page");[m
[32m+[m[32m});[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m[32m// app.listen(process.env.PORT, process.env.IP, function(){[m
[32m+[m[32m// 	console.log("Server started...");[m
[32m+[m[32m// })[m
[32m+[m
[32m+[m[32mapp.listen(3000,function(){[m
[32m+[m	[32mconsole.log("Server started at 3000...");[m
[32m+[m[32m});[m
\ No newline at end of file[m
[1mdiff --git a/node_modules/.bin/ejs b/node_modules/.bin/ejs[m
[1mnew file mode 100644[m
[1mindex 0000000..0b9c6b7[m
[1m--- /dev/null[m
[1m+++ b/node_modules/.bin/ejs[m
[36m@@ -0,0 +1,15 @@[m
[32m+[m[32m#!/bin/sh[m
[32m+[m[32mbasedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")[m
[32m+[m
[32m+[m[32mcase `uname` in[m
[32m+[m[32m    *CYGWIN*|*MINGW*|*MSYS*) basedir=`cygpath -w "$basedir"`;;[m
[32m+[m[32mesac[m
[32m+[m
[32m+[m[32mif [ -x "$basedir/node" ]; then[m
[32m+[m[32m  "$basedir/node"  "$basedir/../ejs/bin/cli.js" "$@"[m
[32m+[m[32m  ret=$?[m
[32m+[m[32melse[m[41m [m
[32m+[m[32m  node  "$basedir/../ejs/bin/cli.js" "$@"[m
[32m+[m[32m  ret=$?[m
[32m+[m[32mfi[m
[32m+[m[32mexit $ret[m
[1mdiff --git a/node_modules/.bin/ejs.cmd b/node_modules/.bin/ejs.cmd[m
[1mnew file mode 100644[m
[1mindex 0000000..3bb42ad[m
[1m--- /dev/null[m
[1m+++ b/node_modules/.bin/ejs.cmd[m
[36m@@ -0,0 +1,17 @@[m
[32m+[m[32m@ECHO off[m
[32m+[m[32mSETLOCAL[m
[32m+[m[32mCALL :find_dp0[m
[32m+[m
[32m+[m[32mIF EXIST "%dp0%\node.exe" ([m
[32m+[m[32m  SET "_prog=%dp0%\node.exe"[m
[32m+[m[32m) ELSE ([m
[32m+[m[32m  SET "_prog=node"[m
[32m+[m[32m  SET PATHEXT=%PATHEXT:;.JS;=;%[m
[32m+[m[32m)[m
[32m+[m
[32m+[m[32m"%_prog%"  "%dp0%\..\ejs\bin\cli.js" %*[m
[32m+[m[32mENDLOCAL[m
[32m+[m[32mEXIT /b %errorlevel%[m
[32m+[m[32m:find_dp0[m
[32m+[m[32mSET dp0=%~dp0[m
[32m+[m[32mEXIT /b[m
[1mdiff --git a/node_modules/.bin/ejs.ps1 b/node_modules/.bin/ejs.ps1[m
[1mnew file mode 100644[m
[1mindex 0000000..78e73c8[m
[1m--- /dev/null[m
[1m+++ b/node_modules/.bin/ejs.ps1[m
[36m@@ -0,0 +1,18 @@[m
[32m+[m[32m#!/usr/bin/env pwsh[m
[32m+[m[32m$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent[m
[32m+[m
[32m+[m[32m$exe=""[m
[32m+[m[32mif ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {[m
[32m+[m[32m  # Fix case when both the Windows and Linux builds of Node[m
[32m+[m[32m  # are installed in the same directory[m
[32m+[m[32m  $exe=".exe"[m
[32m+[m[32m}[m
[32m+[m[32m$ret=0[m
[32m+[m[32mif (Test-Path "$basedir/node$exe") {[m
[32m+[m[32m  & "$basedir/node$exe"  "$basedir/../ejs/bin/cli.js" $args[m
[32m+[m[32m  $ret=$LASTEXITCODE[m
[32m+[m[32m} else {[m
[32m+[m[32m  & "node$exe"  "$basedir/../ejs/bin/cli.js" $args[m
[32m+[m[32m  $ret=$LASTEXITCODE[m
[32m+[m[32m}[m
[32m+[m[32mexit $ret[m
[1mdiff --git a/node_modules/.bin/jake b/node_modules/.bin/jake[m
[1mnew file mode 100644[m
[1mindex 0000000..df203c1[m
[1m--- /dev/null[m
[1m+++ b/node_modules/.bin/jake[m
[36m@@ -0,0 +1,15 @@[m
[32m+[m[32m#!/bin/sh[m
[32m+[m[32mbasedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")[m
[32m+[m
[32m+[m[32mcase `uname` in[m
[32m+[m[32m    *CYGWIN*|*MINGW*|*MSYS*) basedir=`cygpath -w "$basedir"`;;[m
[32m+[m[32mesac[m
[32m+[m
[32m+[m[32mif [ -x "$basedir/node" ]; then[m
[32m+[m[32m  "$basedir/node"  "$basedir/../jake/bin/cli.js" "$@"[m
[32m+[m[32m  ret=$?[m
[32m+[m[32melse[m[41m [m
[32m+[m[32m  node  "$basedir/../jake/bin/cli.js" "$@"[m
[32m+[m[32m  ret=$?[m
[32m+[m[32mfi[m
[32m+[m[32mexit $ret[m
[1mdiff --git a/node_modules/.bin/jake.cmd b/node_modules/.bin/jake.cmd[m
[1mnew file mode 100644[m
[1mindex 0000000..5b09dcb[m
[1m--- /dev/null[m
[1m+++ b/node_modules/.bin/jake.cmd[m
[36m@@ -0,0 +1,17 @@[m
[32m+[m[32m@ECHO off[m
[32m+[m[32mSETLOCAL[m
[32m+[m[32mCALL :find_dp0[m
[32m+[m
[32m+[m[32mIF EXIST "%dp0%\node.exe" ([m
[32m+[m[32m  SET "_prog=%dp0%\node.exe"[m
[32m+[m[32m) ELSE ([m
[32m+[m[32m  SET "_prog=node"[m
[32m+[m[32m  SET PATHEXT=%PATHEXT:;.JS;=;%[m
[32m+[m[32m)[m
[32m+[m
[32m+[m[32m"%_prog%"  "%dp0%\..\jake\bin\cli.js" %*[m
[32m+[m[32mENDLOCAL[m
[32m+[m[32mEXIT /b %errorlevel%[m
[32m+[m[32m:find_dp0[m
[32m+[m[32mSET dp0=%~dp0[m
[32m+[m[32mEXIT /b[m
[1mdiff --git a/node_modules/.bin/jake.ps1 b/node_modules/.bin/jake.ps1[m
[1mnew file mode 100644[m
[1mindex 0000000..bbe80ea[m
[1m--- /dev/null[m
[1m+++ b/node_modules/.bin/jake.ps1[m
[36m@@ -0,0 +1,18 @@[m
[32m+[m[32m#!/usr/bin/env pwsh[m
[32m+[m[32m$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent[m
[32m+[m
[32m+[m[32m$exe=""[m
[32m+[m[32mif ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {[m
[32m+[m[32m  # Fix case when both the Windows and Linux builds of Node[m
[32m+[m[32m  # are installed in the same directory[m
[32m+[m[32m  $exe=".exe"[m
[32m+[m[32m}[m
[32m+[m[32m$ret=0[m
[32m+[m[32mif (Test-Path "$basedir/node$exe") {[m
[32m+[m[32m  & "$basedir/node$exe"  "$basedir/../jake/bin/cli.js" $args[m
[32m+[m[32m  $ret=$LASTEXITCODE[m
[32m+[m[32m} else {[m
[32m+[m[32m  & "node$exe"  "$basedir/../jake/bin/cli.js" $args[m
[32m+[m[32m  $ret=$LASTEXITCODE[m
[32m+[m[32m}[m
[32m+[m[32mexit $ret[m
[1mdiff --git a/node_modules/.bin/mime b/node_modules/.bin/mime[m
[1mnew file mode 100644[m
[1mindex 0000000..91e5e16[m
[1m--- /dev/null[m
[1m+++ b/node_modules/.bin/mime[m
[36m@@ -0,0 +1,15 @@[m
[32m+[m[32m#!/bin/sh[m
[32m+[m[32mbasedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")[m
[32m+[m
[32m+[m[32mcase `uname` in[m
[32m+[m[32m    *CYGWIN*|*MINGW*|*MSYS*) basedir=`cygpath -w "$basedir"`;;[m
[32m+[m[32mesac[m
[32m+[m
[32m+[m[32mif [ -x "$basedir/node" ]; then[m
[32m+[m[32m  "$basedir/node"  "$basedir/../mime/cli.js" "$@"[m
[32m+[m[32m  ret=$?[m
[32m+[m[32melse[m[41m [m
[32m+[m[32m  node  "$basedir/../mime/cli.js" "$@"[m
[32m+[m[32m  ret=$?[m
[32m+[m[32mfi[m
[32m+[m[32mexit $ret[m
[1mdiff --git a/node_modules/.bin/mime.cmd b/node_modules/.bin/mime.cmd[m
[1mnew file mode 100644[m
[1mindex 0000000..746a279[m
[1m--- /dev/null[m
[1m+++ b/node_modules/.bin/mime.cmd[m
[36m@@ -0,0 +1,17 @@[m
[32m+[m[32m@ECHO off[m
[32m+[m[32mSETLOCAL[m
[32m+[m[32mCALL :find_dp0[m
[32m+[m
[32m+[m[32mIF EXIST "%dp0%\node.exe" ([m
[32m+[m[32m  SET "_prog=%dp0%\node.exe"[m
[32m+[m[32m) ELSE ([m
[32m+[m[32m  SET "_prog=node"[m
[32m+[m[32m  SET PATHEXT=%PATHEXT:;.JS;=;%[m
[32m+[m[32m)[m
[32m+[m
[32m+[m[32m"%_prog%"  "%dp0%\..\mime\cli.js" %*[m
[32m+[m[32mENDLOCAL[m
[32m+[m[32mEXIT /b %errorlevel%[m
[32m+[m[32m:find_dp0[m
[32m+[m[32mSET dp0=%~dp0[m
[32m+[m[32mEXIT /b[m
[1mdiff --git a/node_modules/.bin/mime.ps1 b/node_modules/.bin/mime.ps1[m
[1mnew file mode 100644[m
[1mindex 0000000..a6f6f47[m
[1m--- /dev/null[m
[1m+++ b/node_modules/.bin/mime.ps1[m
[36m@@ -0,0 +1,18 @@[m
[32m+[m[32m#!/usr/bin/env pwsh[m
[32m+[m[32m$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent[m
[32m+[m
[32m+[m[32m$exe=""[m
[32m+[m[32mif ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {[m
[32m+[m[32m  # Fix case when both the Windows and Linux builds of Node[m
[32m+[m[32m  # are installed in the same directory[m
[32m+[m[32m  $exe=".exe"[m
[32m+[m[32m}[m
[32m+[m[32m$ret=0[m
[32m+[m[32mif (Test-Path "$basedir/node$exe") {[m
[32m+[m[32m  & "$basedir/node$exe"  "$basedir/../mime/cli.js" $args[m
[32m+[m[32m  $ret=$LASTEXITCODE[m
[32m+[m[32m} else {[m
[32m+[m[32m  & "node$exe"  "$basedir/../mime/cli.js" $args[m
[32m+[m[32m  $ret=$LASTEXITCODE[m
[32m+[m[32m}[m
[32m+[m[32mexit $ret[m
[1mdiff --git a/node_modules/accepts/HISTORY.md b/node_modules/accepts/HISTORY.md[m
[1mnew file mode 100644[m
[1mindex 0000000..0bf0417[m
[1m--- /dev/null[m
[1m+++ b/node_modules/accepts/HISTORY.md[m
[36m@@ -0,0 +1,236 @@[m
[32m+[m[32m1.3.7 / 2019-04-29[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: negotiator@0.6.2[m
[32m+[m[32m    - Fix sorting charset, encoding, and language with extra parameters[m
[32m+[m
[32m+[m[32m1.3.6 / 2019-04-28[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.1.24[m
[32m+[m[32m    - deps: mime-db@~1.40.0[m
[32m+[m
[32m+[m[32m1.3.5 / 2018-02-28[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.1.18[m
[32m+[m[32m    - deps: mime-db@~1.33.0[m
[32m+[m
[32m+[m[32m1.3.4 / 2017-08-22[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.1.16[m
[32m+[m[32m    - deps: mime-db@~1.29.0[m
[32m+[m
[32m+[m[32m1.3.3 / 2016-05-02[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.1.11[m
[32m+[m[32m    - deps: mime-db@~1.23.0[m
[32m+[m[32m  * deps: negotiator@0.6.1[m
[32m+[m[32m    - perf: improve `Accept` parsing speed[m
[32m+[m[32m    - perf: improve `Accept-Charset` parsing speed[m
[32m+[m[32m    - perf: improve `Accept-Encoding` parsing speed[m
[32m+[m[32m    - perf: improve `Accept-Language` parsing speed[m
[32m+[m
[32m+[m[32m1.3.2 / 2016-03-08[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.1.10[m
[32m+[m[32m    - Fix extension of `application/dash+xml`[m
[32m+[m[32m    - Update primary extension for `audio/mp4`[m
[32m+[m[32m    - deps: mime-db@~1.22.0[m
[32m+[m
[32m+[m[32m1.3.1 / 2016-01-19[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.1.9[m
[32m+[m[32m    - deps: mime-db@~1.21.0[m
[32m+[m
[32m+[m[32m1.3.0 / 2015-09-29[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.1.7[m
[32m+[m[32m    - deps: mime-db@~1.19.0[m
[32m+[m[32m  * deps: negotiator@0.6.0[m
[32m+[m[32m    - Fix including type extensions in parameters in `Accept` parsing[m
[32m+[m[32m    - Fix parsing `Accept` parameters with quoted equals[m
[32m+[m[32m    - Fix parsing `Accept` parameters with quoted semicolons[m
[32m+[m[32m    - Lazy-load modules from main entry point[m
[32m+[m[32m    - perf: delay type concatenation until needed[m
[32m+[m[32m    - perf: enable strict mode[m
[32m+[m[32m    - perf: hoist regular expressions[m
[32m+[m[32m    - perf: remove closures getting spec properties[m
[32m+[m[32m    - perf: remove a closure from media type parsing[m
[32m+[m[32m    - perf: remove property delete from media type parsing[m
[32m+[m
[32m+[m[32m1.2.13 / 2015-09-06[m
[32m+[m[32m===================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.1.6[m
[32m+[m[32m    - deps: mime-db@~1.18.0[m
[32m+[m
[32m+[m[32m1.2.12 / 2015-07-30[m
[32m+[m[32m===================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.1.4[m
[32m+[m[32m    - deps: mime-db@~1.16.0[m
[32m+[m
[32m+[m[32m1.2.11 / 2015-07-16[m
[32m+[m[32m===================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.1.3[m
[32m+[m[32m    - deps: mime-db@~1.15.0[m
[32m+[m
[32m+[m[32m1.2.10 / 2015-07-01[m
[32m+[m[32m===================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.1.2[m
[32m+[m[32m    - deps: mime-db@~1.14.0[m
[32m+[m
[32m+[m[32m1.2.9 / 2015-06-08[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.1.1[m
[32m+[m[32m    - perf: fix deopt during mapping[m
[32m+[m
[32m+[m[32m1.2.8 / 2015-06-07[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.1.0[m
[32m+[m[32m    - deps: mime-db@~1.13.0[m
[32m+[m[32m  * perf: avoid argument reassignment & argument slice[m
[32m+[m[32m  * perf: avoid negotiator recursive construction[m
[32m+[m[32m  * perf: enable strict mode[m
[32m+[m[32m  * perf: remove unnecessary bitwise operator[m
[32m+[m
[32m+[m[32m1.2.7 / 2015-05-10[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: negotiator@0.5.3[m
[32m+[m[32m    - Fix media type parameter matching to be case-insensitive[m
[32m+[m
[32m+[m[32m1.2.6 / 2015-05-07[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.0.11[m
[32m+[m[32m    - deps: mime-db@~1.9.1[m
[32m+[m[32m  * deps: negotiator@0.5.2[m
[32m+[m[32m    - Fix comparing media types with quoted values[m
[32m+[m[32m    - Fix splitting media types with quoted commas[m
[32m+[m
[32m+[m[32m1.2.5 / 2015-03-13[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.0.10[m
[32m+[m[32m    - deps: mime-db@~1.8.0[m
[32m+[m
[32m+[m[32m1.2.4 / 2015-02-14[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * Support Node.js 0.6[m
[32m+[m[32m  * deps: mime-types@~2.0.9[m
[32m+[m[32m    - deps: mime-db@~1.7.0[m
[32m+[m[32m  * deps: negotiator@0.5.1[m
[32m+[m[32m    - Fix preference sorting to be stable for long acceptable lists[m
[32m+[m
[32m+[m[32m1.2.3 / 2015-01-31[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.0.8[m
[32m+[m[32m    - deps: mime-db@~1.6.0[m
[32m+[m
[32m+[m[32m1.2.2 / 2014-12-30[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.0.7[m
[32m+[m[32m    - deps: mime-db@~1.5.0[m
[32m+[m
[32m+[m[32m1.2.1 / 2014-12-30[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: mime-types@~2.0.5[m
[32m+[m[32m    - deps: mime-db@~1.3.1[m
[32m+[m
[32m+[m[32m1.2.0 / 2014-12-19[m
[32m+[m[32m==================[m
[32m+[m
[32m+[m[32m  * deps: negotiator@0.5.0[m
[32m+[m[32m    - Fix list return order when large accepted list[m
[32m+[m[32m    - Fix missing identity encodi