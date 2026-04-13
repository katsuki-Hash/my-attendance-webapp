import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { 
  getFirestore, 
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 設定
const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx",
  projectId: "xxx"
};

// 初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 状態管理
let currentUser = null;

// ログイン状態監視
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    console.log("ログイン中:", user.uid);
  } else {
    currentUser = null;
    console.log("ログアウト中");
  }
});

// 登録
window.signup = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("登録成功");
  } catch (err) {
    alert(err.message);
  }
};

// ログイン
window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("ログイン成功");
  } catch (err) {
    alert(err.message);
  }
};

// ログアウト
window.logout = async () => {
  await signOut(auth);
};

// 出勤
window.checkIn = async () => {
  if (!currentUser) {
    alert("ログインしてください");
    return;
  }

  const today = new Date().toLocaleDateString("sv-SE");
  const docId = `${today}_${currentUser.uid}`;

  await setDoc(doc(db, "attendance", docId), {
    userId: currentUser.uid,
    checkIn: new Date(),
    status: "working"
  }, { merge: true });

  alert("出勤しました");
};

// 退勤
window.checkOut = async () => {
  if (!currentUser) {
    alert("ログインしてください");
    return;
  }

  const today = new Date().toLocaleDateString("sv-SE");
  const docId = `${today}_${currentUser.uid}`;

  await setDoc(doc(db, "attendance", docId), {
    userId: currentUser.uid,
    checkOut: new Date(),
    status: "done"
  }, { merge: true });

  alert("退勤しました");
};
