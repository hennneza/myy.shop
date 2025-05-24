// نمونه کد ساده برای آینده
console.log("سایت هنزا مارکت بارگذاری شد");

// افزودن به سبد خرید
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("محصول به سبد خرید اضافه شد!");
  });
});
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    alert('محصول به سبد خرید اضافه شد!');
  });
});
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "اینجا apiKey خودت",
  authDomain: "اینجا authDomain خودت",
  projectId: "اینجا projectId خودت",
  storageBucket: "اینجا storageBucket خودت",
  messagingSenderId: "اینجا messagingSenderId خودت",
  appId: "اینجا appId خودت"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // ورود موفق
      window.location.href = "dashboard.html"; // صفحه پنل مدیر
    })
    .catch((error) => {
      document.getElementById("login-error").innerText = "ایمیل یا رمز نادرست است.";
    });
}
