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
