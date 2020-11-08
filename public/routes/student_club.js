db.collection('clubs').where('name','==','raaga').get().then((snapshot) => {
    var raaga = snapshot.docs[0].data()
    document.getElementById("raaga_desc").innerHTML = raaga.desc
})
db.collection('clubs').where('name','==','narthana').get().then((snapshot) => {
    var narthana = snapshot.docs[0].data()
    document.getElementById("narthana_desc").innerHTML = narthana.desc
})
db.collection('clubs').where('name','==','chaitanya').get().then((snapshot) => {
    var chaitanya = snapshot.docs[0].data()
    document.getElementById("chaitanya_desc").innerHTML = chaitanya.desc
})
db.collection('clubs').where('name','==','FACE').get().then((snapshot) => {
    var FACE = snapshot.docs[0].data()
    document.getElementById("FACE_desc").innerHTML = FACE.desc
})