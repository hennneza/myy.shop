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
document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-list");

  // نمایش محصولات از Firestore
  firebase.firestore().collection("products").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = 
        <img src="${data.image}" alt="${data.name}">
        <h3>${data.name}</h3>
        <p>${data.description}</p>
        <p><strong>${data.price.toLocaleString()} تومان</strong></p>
      ;
      productContainer.appendChild(card);
    });
  });
});
