fbdb = null;

function SetupFirebase(){
    // Initialize Firebase
  var config = {
      apiKey: "AIzaSyD0KpBc9oyCzCk8vzuRKavnd-rwYiNOEoM",
      authDomain: "hackathon-313b8.firebaseapp.com",
      databaseURL: "https://hackathon-313b8.firebaseio.com",
      projectId: "hackathon-313b8",
      storageBucket: "hackathon-313b8.appspot.com",
      messagingSenderId: "24009483222"
  };

  conn = firebase.initializeApp(config);
  return conn;
}

function CreateFBObject(){

    init = SetupFirebase();
    connection = init.database();
    return connection;
}

fbdb = CreateFBObject();

