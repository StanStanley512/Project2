$(document).ready(function () {
  // Execute some code here

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCMYpMAbjntYhCyxjGlGlbEezOYhxP6HQQ",
    authDomain: "project2-b70da.firebaseapp.com",
    databaseURL: "https://project2-b70da.firebaseio.com",
    projectId: "project2-b70da",
    storageBucket: "project2-b70da.appspot.com",
    messagingSenderId: "494117517998",
    appId: "1:494117517998:web:0da2a85b81a6a310134b3f",
    measurementId: "G-SJ6H5B10ER"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log("start")
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        console.log("in callback")
        var user = authResult.user;
        localStorage.setItem('user', JSON.stringify(user))


        // $.post("/api/newr", user)
        // // On success, run the following code
        // .then(function(data) {
        //   // Log the data we found
        //   console.log(data);
        // });

        return true;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        // document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'default',
    signInSuccessUrl: "/portfolio",
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],

    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  ui.start('#firebaseui-auth-container', uiConfig);

})
