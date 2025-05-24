// پیکربندی Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCLLxGoXKHON91hM4VlztO_Bme4L2UFxz4",
  authDomain: "heneza-6e5c4.firebaseapp.com",
  projectId: "heneza-6e5c4",
  storageBucket: "heneza-6e5c4.appspot.com",
  messagingSenderId: "1076999155269",
  appId: "1:1076999155269:web:e0b9faef9b0cecb3f97d2c"
};

// مقداردهی اولیه به Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// ورود به حساب مدیر
function login() {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "admin.html";
    })
    .catch(() => {
      document.getElementById("loginError").textContent = "ایمیل یا رمز عبور اشتباه است.";
    });
}

// افزودن محصول
document.addEventListener("DOMContentLoaded", () => {
  const addForm = document.getElementById("addProductForm");

  if (addForm) {
    addForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("productName").value;
      const description = document.getElementById("productDescription").value;
      const price = parseInt(document.getElementById("productPrice").value);
      const image = document.getElementById("productImage").value;

      if (!name  !description  !price || !image) {
        alert("لطفاً همه فیلدها را پر کنید");
        return;
      }

      await db.collection("products").add({ name, description, price, image });
      addForm.reset();
    });
  }

  // نمایش محصولات
  const productContainer = document.getElementById("product-list");

  if (productContainer) {
    db.collection("products").onSnapshot(snapshot => {
      productContainer.innerHTML = "";
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
        productContainer.appendChild(card);
      });
    });
  }
});

// حذف محصول
function deleteProduct(id) {
  if (confirm("آیا از حذف این محصول مطمئن هستید؟")) {
    firebase.firestore().collection("products").doc(id).delete();
  }
}
