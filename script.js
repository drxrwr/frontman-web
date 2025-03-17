// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AlzaSyBVa1QWvdIDaKdQVUU...",
    authDomain: "frontman-web.firebaseapp.com",
    projectId: "frontman-web",
    storageBucket: "frontman-web.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Email yang diizinkan masuk
const allowedEmails = ["iimabdur29@gmail.com", "drxkreatif@gmail.com"];

// Fungsi Login
function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        var user = result.user;
        if (allowedEmails.includes(user.email)) {
            document.getElementById("login-container").style.display = "none";
            document.getElementById("main-container").style.display = "block";
            document.getElementById("user-email").innerText = "Login sebagai: " + user.email;
        } else {
            alert("Akses ditolak! Hanya email terdaftar yang bisa masuk.");
            firebase.auth().signOut();
        }
    })
    .catch((error) => {
        console.error("Login gagal:", error);
    });
}

// Fungsi Logout
function logout() {
    firebase.auth().signOut().then(() => {
        document.getElementById("login-container").style.display = "block";
        document.getElementById("main-container").style.display = "none";
    });
}

// Fungsi Membuka Web Tujuan dalam Iframe
function openWebsite() {
    var selectedURL = document.getElementById("web-select").value;
    document.getElementById("web-frame").src = selectedURL;
}

// Cek Status Login Saat Reload
firebase.auth().onAuthStateChanged((user) => {
    if (user && allowedEmails.includes(user.email)) {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("main-container").style.display = "block";
        document.getElementById("user-email").innerText = "Login sebagai: " + user.email;
    }
});
