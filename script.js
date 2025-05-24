// نمایش و مخفی کردن فرم ورود
function toggleLoginBox() {
  const box = document.getElementById("admin-login-box");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

// ورود به حساب مدیر
function login() {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "admin.html"; // هدایت به پنل مدیریت محصولات
    })
    .catch((error) => {
      document.getElementById("loginError").textContent = "ایمیل یا رمز اشتباه است.";
    });
}
