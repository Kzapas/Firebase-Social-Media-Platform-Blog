document.querySelector("#submitBtn").addEventListener("click", function(e) {
  let postAuthor = document.querySelector("#author").value;
  let postTitle = document.querySelector("#postTitle").value;
  let postContent = document.querySelector("#postContent").value;
  let postDate = document.querySelector("#postDate").value;
  let info8 = document.getElementById('info8');
  
  if (
    document.getElementById("postFile").files.length == 0 ||
	postAuthor === "" ||
    postTitle === "" ||
    postContent === "" ||
    postDate === ""
  ) {
    info8.className = '';
    info8.innerHTML = 'Please fill the form!';
    info8.style.color = '#e74c3c';
    info8.style.setProperty('display', 'block', 'important');
  } else {
	  
    db.collection("posts")
      .doc()
      .set({
        imageUrl: imageURL,
		author: postAuthor,
        createdAt: postDate,
        postName: postTitle,
        postContent: postContent
      });
	  
	window.setTimeout(function(){

        window.location.href = "home";

    }, 500);
  }
});

let random_name_int = Math.floor(100000000 + Math.random() * 900000000);
let random_name = random_name_int.toString();
let fileUpload = document.getElementById("postFile");
let storageRef = firebase.storage().ref(random_name);
let imageURL;

if(fileUpload){
	fileUpload.addEventListener('change', function(evt) {
      let firstFile = evt.target.files[0]; // upload the first file only
      let uploadTask = storageRef.put(firstFile).then(function(snapshot){
		storageRef.getDownloadURL().then(function(downloadURL) {
			console.log('success! your image has been uploaded!');
			imageURL = downloadURL;
			console.log('imageURL:', imageURL); 
		});
		});
	})
};



//Firebase auth
var txtPassword = document.getElementById('password');
var txtEmail = document.getElementById('email');
var info = document.getElementById('info');
var info2 = document.getElementById('info2');
var info3 = document.getElementById('info3');
var info4 = document.getElementById('info4');
var main_field_container = document.getElementById('container_main_fieldform');
var password_field = document.getElementById('password_container');
var btnLogin = document.getElementById('submitbtnpass');
var Logoutbtn = document.getElementById('logoutBtn');
var navbar = document.getElementById('navbar-nav mr-auto');
var btnRegister = document.getElementById('submitbtnregister');
var welcomeMessage = document.getElementById('welcome-text');

//Firebase Config
var firebaseRef = firebase.database().ref();
const auth = firebase.auth();

//Email Validation
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//Hide and Display Log In
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    main_field_container.style.display = "block";
	password_field.style.display = "none";

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

    main_field_container.style.display = "none";
	password_field.style.display = "block";
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

//Login Button Click Event
btnLogin.addEventListener('click', function(d){
	d.preventDefault();
	
	auth.signInWithEmailAndPassword(txtEmail.value, txtPassword.value).catch(function(error){
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
	var res = errorMessage.replace(error.message, "This account is not valid.");
	
	
	if(txtEmail.value == '' || txtPassword.value == ''){
    info.className = '';
    info.innerHTML = 'Please fill the form!';
    info.style.color = '#e74c3c';
    info.style.display = 'inline-block';
	if (window.matchMedia("(max-width: 768px)").matches) {
	info3.className = '';
    info3.innerHTML = 'Please fill the form!';
    info3.style.color = '#e74c3c';
    info3.style.setProperty('display', 'block', 'important');
	}else{
	info3.className = '';
    info3.innerHTML = 'Please fill the form!';
    info3.style.color = '#e74c3c';
    info3.style.setProperty('display', 'none', 'important');
	}
	
  }
  else{
	  info.className = '';
	  info.innerHTML = (res);
	  info.style.color = '#e74c3c';
	  info.style.display = 'inline-block';
	  if (window.matchMedia("(max-width: 768px)").matches) {
	  info3.className = '';
	  info3.innerHTML = (res);
	  info3.style.color = '#e74c3c';
	  info3.style.setProperty('display', 'block', 'important');
	  }else{
	  info3.className = '';
	  info3.innerHTML = 'Please fill the form!';
	  info3.style.color = '#e74c3c';
	  info3.style.setProperty('display', 'none', 'important');
	  }
	  
	}
});
});

//Register Button Click Event
btnRegister.addEventListener('click', function(e){
  e.preventDefault();

  auth.createUserWithEmailAndPassword(txtEmail.value, txtPassword.value);

  
  
  if(txtEmail.value == '' || txtPassword.value == ''){
    info2.className = '';
    info2.innerHTML = 'Please fill the form!';
    info2.style.color = '#e74c3c';
    info2.style.display = 'inline-block';
	if (window.matchMedia("(max-width: 768px)").matches) {
	info4.className = '';
    info4.innerHTML = 'Please fill the form!';
    info4.style.color = '#e74c3c';
    info4.style.setProperty('display', 'block', 'important');
	}
	}else{
      if(!validateEmail(txtEmail.value)){
          info2.className = '';
          info2.innerHTML = 'Invalid email!';
          info2.style.color = '#e74c3c';
          info2.style.display = 'inline-block';
		  if (window.matchMedia("(max-width: 768px)").matches) {
		  info4.className = '';
          info4.innerHTML = 'Invalid Email!';
          info4.style.color = '#e74c3c';
          info4.style.setProperty('display', 'block', 'important');
		  }
        }else{
          if(txtPassword.value.length < 6){
            info2.className = '';
            info2.innerHTML = 'Password must contain at least 6 characters!';
            info2.style.color = '#e74c3c';
            info2.style.display = 'inline-block';
			if (window.matchMedia("(max-width: 768px)").matches) {
			info4.className = '';
            info4.innerHTML = 'Password must contain at least 6 characters!';
            info4.style.color = '#e74c3c';
            info4.style.setProperty('display', 'block', 'important');
			}
          }
          else{
            info2.innerHTML = 'You"ve registered successfully!';
            info2.style.color = '#2ecc71';
            info2.style.display = 'inline-block';
			if (window.matchMedia("(max-width: 768px)").matches) {
			info4.innerHTML = 'You"ve registered successfully!';
            info4.style.color = '#2ecc71';
            info4.style.setProperty('display', 'block', 'important');
			}
            firebaseRef.child('Users').child('Email').push(txtEmail.value);
            firebaseRef.child('Users').child('Password').push(txtPassword.value);         
            txtEmail.value = '';
            txtPassword.value = '';
			window.setTimeout(function(){
			  window.location.href = "home";
			  }, 500);
          }
        }
      }
});