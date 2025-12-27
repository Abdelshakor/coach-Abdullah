const WHATSAPP_NUMBER = "201146165846"; // بدون +

function setLang(lang){
  const ar = document.querySelectorAll(".lang-ar");
  const en = document.querySelectorAll(".lang-en");
  const btnAr = document.getElementById("btnAr");
  const btnEn = document.getElementById("btnEn");

  if(lang === "ar"){
    document.documentElement.lang = "ar";
    document.body.dir = "rtl";
    ar.forEach(x => x.classList.add("active"));
    en.forEach(x => x.classList.remove("active"));
    btnAr?.classList.add("primary");
    btnEn?.classList.remove("primary");
  }else{
    document.documentElement.lang = "en";
    document.body.dir = "ltr";
    en.forEach(x => x.classList.add("active"));
    ar.forEach(x => x.classList.remove("active"));
    btnEn?.classList.add("primary");
    btnAr?.classList.remove("primary");
  }
  localStorage.setItem("site_lang", lang);
}

function toggleMobileMenu(){
  document.getElementById("mobileMenu")?.classList.toggle("open");
}

function waLink(message){
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

function startOnWhatsApp(){
  const name = document.getElementById("fName")?.value?.trim() || "";
  const age = document.getElementById("fAge")?.value?.trim() || "";
  const goal = document.getElementById("fGoal")?.value || "";
  const level = document.getElementById("fLevel")?.value || "";
  const note = document.getElementById("fNote")?.value?.trim() || "";

  const lang = localStorage.getItem("site_lang") || "ar";
  const header = lang === "ar" ? "مرحبًا دكتور عبدالله، عايز أبدأ Online Coaching" : "Hi Dr. Abdallah, I'd like to start Online Coaching";
  const msg =
`${header}
---------------------
Name: ${name || "-"}
Age: ${age || "-"}
Goal: ${goal || "-"}
Level: ${level || "-"}
Note: ${note || "-"}`;

  window.open(waLink(msg), "_blank");
}

function packageOnWhatsApp(pkgName){
  const lang = localStorage.getItem("site_lang") || "ar";
  const msg = lang === "ar"
    ? `مرحبًا دكتور عبدالله، عايز أشترك في باقة ${pkgName} لمدة 3 شهور.`
    : `Hi Dr. Abdallah, I'd like to subscribe to the ${pkgName} package (3 months).`;
  window.open(waLink(msg), "_blank");
}

function bindFAQ(){
  document.querySelectorAll(".acc-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const item = btn.closest(".acc-item");
      item.classList.toggle("open");
    });
  });
}

function bindGallery(){
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const close = ()=> modal.classList.remove("open");

  document.querySelectorAll("[data-gallery]").forEach(card=>{
    card.addEventListener("click", ()=>{
      const src = card.getAttribute("data-src");
      const title = card.getAttribute("data-title") || "Transformation";
      modalImg.src = src;
      modalTitle.textContent = title;
      modal.classList.add("open");
    });
  });

  document.getElementById("modalClose")?.addEventListener("click", close);
  modal?.addEventListener("click", (e)=>{ if(e.target === modal) close(); });
  document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") close(); });
}

function bindStickyWhatsApp(){
  document.getElementById("waFloat")?.addEventListener("click", ()=>{
    const lang = localStorage.getItem("site_lang") || "ar";
    const msg = lang === "ar"
      ? "مرحبًا دكتور عبدالله، عايز أعرف تفاصيل الباقات وأبدأ." 
      : "Hi Dr. Abdallah, I’d like package details and to start.";
    window.open(waLink(msg), "_blank");
  });
}

(function init(){
  const saved = localStorage.getItem("site_lang");
  setLang(saved || "ar");
  bindFAQ();
  bindGallery();
  bindStickyWhatsApp();

  document.getElementById("btnAr")?.addEventListener("click", ()=>setLang("ar"));
  document.getElementById("btnEn")?.addEventListener("click", ()=>setLang("en"));
  document.getElementById("hamburger")?.addEventListener("click", toggleMobileMenu);

  document.querySelectorAll("[data-wa-start]").forEach(el=>{
    el.addEventListener("click", (e)=>{ e.preventDefault(); startOnWhatsApp(); });
  });

  document.querySelectorAll("[data-wa-package]").forEach(el=>{
    el.addEventListener("click", (e)=>{
      e.preventDefault();
      packageOnWhatsApp(el.getAttribute("data-wa-package"));
    });
  });
})();
