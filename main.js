const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx",
  projectId: "xxx"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 登録
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("登録成功"))
    .catch(err => alert(err.message));
}

// ログイン
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("ログイン成功"))
    .catch(err => alert(err.message));
}

// ログアウト
function logout() {
  auth.signOut();
}

// 状態監視
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("ログイン中:", user.uid);
  } else {
    console.log("ログアウト中");
  }
});
