// Firebase Config
var firebaseConfig = {
	//Firebase config
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let postCollection = document.querySelector("#posts-collection");

const db = firebase.firestore();
const storage = firebase.storage().ref();

// Create Posts
function createPost(img_url, title, time, author, content) {
  let div = document.createElement("div");
  div.setAttribute("class", "col-md-4");

  let h2 = document.createElement("h2");
  let p = document.createElement("p");
  let small = document.createElement("small");
  let img = document.createElement("img");
  let writer = document.createElement("small");

  writer.textContent = ('  By ' + author);
  writer.setAttribute("id", "posted-content-main");
  small.setAttribute("style", 'font-weight:bold;');
  small.setAttribute("id", "posted-content-main");
  img.setAttribute("src", img_url);
  img.setAttribute("class", "posted-image");
  h2.textContent = title;
  h2.setAttribute("id", "posted-content-main");
  small.textContent = time;
  p.textContent = content;
  p.setAttribute("id", "posted-content-main");

  div.appendChild(img);
  div.appendChild(h2);
  div.appendChild(small);
  div.appendChild(writer);
  div.appendChild(p);

  postCollection.appendChild(div);
}

// Get Posts
function getPosts() {
  db.collection("posts")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(docs => {
        createPost(
		  docs.data().imageUrl,
		  docs.data().postName,
          docs.data().createdAt,
		  docs.data().author,
          docs.data().postContent
        );
      });
    })
    .catch(err => {
      console.log(err);
    });
}

getPosts();




//Part 2
var Logoutbtn = document.getElementById('logoutBtn');
var welcomeMessage = document.getElementById('welcome-text');
//Hide and Display Log In
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;

    if(user != null){
		
	Logoutbtn.style.display = "block";
	if(welcomeMessage != null){
		welcomeMessage.style.display = "block";
	}
	document.getElementById('signupbtn').style.display = "none";
	document.getElementById('loginsbtn').style.display = "none";
	if (window.matchMedia("(max-width: 768px)").matches) {
	document.getElementById('loginsbtnout').style.display = "block";
	}
    }

  } else {
    // No user is signed in.

	Logoutbtn.style.display = "none";
	if(welcomeMessage != null){
		welcomeMessage.style.display = "none";
	}
	document.getElementById('signupbtn').style.display = "block";
	document.getElementById('loginsbtn').style.display = "block";
	if (window.matchMedia("(max-width: 768px)").matches) {
	document.getElementById('loginsbtnout').style.display = "none";
	}
  }
});



//Log out
function logout(){
  firebase.auth().signOut();
}

