var socket = io.connect("http://localhost:3000");

firebase.auth().onAuthStateChanged(user => {

    const userId = user.uid;
    const player = { userId, nivel }

});