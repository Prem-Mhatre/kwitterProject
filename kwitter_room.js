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

  
  function enter_room(){
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
          purpose : "room enter"
      });
      localStorage.setItem("room_name", room_name);
  }