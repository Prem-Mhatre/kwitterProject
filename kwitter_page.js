var firebaseConfig = {
    apiKey: "AIzaSyDQp5AmDCu6T6RM5XGEIZExEjay6Rql8zU",
    authDomain: "kwitter-20df5.firebaseapp.com",
    databaseURL: "https://kwitter-20df5-default-rtdb.firebaseio.com",
    projectId: "kwitter-20df5",
    storageBucket: "kwitter-20df5.appspot.com",
    messagingSenderId: "46770199928",
    appId: "1:46770199928:web:7ec01cc9fb27515b753c8d",
    measurementId: "G-1FKRK5FE1V"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  room_name = localStorage.getItem("room_name");
  user_name = localStorage.getItem("user_name_project");
  document.getElementById("room_name").innerHTML = "<b>Room Name: </b>" + room_name;
  
  function logout(){
    localStorage.removeItem("user_name_project");
    localStorage.removeItem("room_name");

    window.location = "index.html";
}

function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name : user_name,
        message : msg,
        like : 0 
    });

    document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;

    message = message_data['message'];
    name = message_data['name'];
    like = message_data['like'];

    name_with_tag = "<h4>"+name+"</h4>";
    message_with_tag = "<h4>" + message + "</h4>";
    like_button = "<button id="+firebase_message_id+" value="+like+" class='btn btn-warning' onclick='updateLike(this.id)'>";
    span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
    row = name_with_tag  + message_with_tag + like_button + span_with_tag;
    document.getElementById("output").innerHTML += row;
 } });  }); }
getData();

function updateLike(message_id){
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    update_likes = Number(likes) + 1;

    firebase.database().ref(room_name).child(message_id).update({
        like : update_likes
    });
}