// پیکربندی Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCLLxGoXKHON91hM4VlztO_Bme4L2UFxz4",
  authDomain: "heneza-6e5c4.firebaseapp.com",
  projectId: "heneza-6e5c4",
  storageBucket: "heneza-6e5c4.appspot.com",
  messagingSenderId: "1076999155269",
  appId: "1:1076999155269:web:e0b9faef9b0cecb3f97d2c"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// ورود به حساب مدیر
function login() {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("admin-login-box").style.display = "none";
      document.getElementById("admin-dashboard").style.display = "block";
    })
    .catch(() => {
      document.getElementById("loginError").textContent = "ایمیل یا رمز عبور اشتباه است.";
    });
}

// پس از بارگذاری کامل صفحه
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".product-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("productName").value.trim();
      const description = document.getElementById("productDescription").value.trim();
      const price = parseInt(document.getElementById("productPrice").value);
      const image = document.getElementById("productImage").value.trim();

      if (!name  !description  !price || !image) {
        alert("همه فیلدها باید پر شوند.");
        return;
      }

      try {
        await db.collection("products").add({ name, description, price, image });
        form.reset();
      } catch (err) {
        console.error("خطا در افزودن محصول:", err);
      }
    });
  }

  const productList = document.getElementById("product-list");
  if (productList) {
    db.collection("products").onSnapshot(snapshot => {
      productList.innerHTML = "";

      snapshot.forEach(doc => {
        const data = doc.data();
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = 
          <img src="${data.image}" alt="${data.name}">
          <h3>${data.name}</h3>
          <p>${data.description}</p>
          <p><strong>${data.price.toLocaleString()} تومان</strong></p>
          <button onclick="deleteProduct('${doc.id}')">حذف</button>
        ;
        productList.appendChild(card);
      });
    });
  }
});

// حذف محصول
function deleteProduct(id) {
  if (confirm("از حذف این محصول مطمئن هستید؟")) {
    db.collection("products").doc(id).delete().catch(err => {
      console.error("خطا در حذف:", err);
    });
  }
}
