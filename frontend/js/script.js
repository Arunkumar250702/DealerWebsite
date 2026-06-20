
const API_BASE =
    window.location.protocol === "file:" ||
    !window.location.origin ||
    window.location.origin === "null"
        ? "http://localhost:5000"
        : window.location.origin;

const API_URL = `${API_BASE}/api/auth`;

const modal = document.getElementById("authModal");
const quoteBtn = document.getElementById("quoteBtn");

let isLoginMode = true;

/* OPEN LOGIN */

quoteBtn.addEventListener("click", () => {

    const token = localStorage.getItem("token");

    if (!token) {

        modal.style.display = "block";

    } else {

        document.getElementById(
                "quoteModal"
            ).style.display = "block";

    }

});

/* CLOSE */

document.querySelector(".close-btn")
.addEventListener("click", () => {

    modal.style.display = "none";

});

/* TOGGLE LOGIN REGISTER */

document
.getElementById("toggleAuthLink")
.addEventListener("click", (e) => {

    e.preventDefault();

    isLoginMode = !isLoginMode;

    document.getElementById("modalTitle")
    .innerText =
    isLoginMode ? "Login" : "Register";

    document.getElementById("submitBtn")
    .innerText =
    isLoginMode ? "Login" : "Register";

});

/* SUBMIT */

document
.getElementById("authForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {

        name:
        document.getElementById("name").value,

        companyName:
        document.getElementById("companyName").value,

        email:
        document.getElementById("email").value,

        phone:
        document.getElementById("phone").value,

        password:
        document.getElementById("password").value

    };

    const endpoint =
    isLoginMode
    ? "/login"
    : "/register";

    try {

        const response =
        await fetch(
            API_URL + endpoint,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const result =
        await response.json();

        if (!response.ok) {

            alert(
                result.message ||
                "Something went wrong"
            );

            return;
        }

        if (isLoginMode) {

            localStorage.setItem(
                "token",
                result.token
            );

            localStorage.setItem(
                "userName",
                result.user.name
            );

           alert("Login Successful");

modal.style.display = "none";

profileMenu.style.display =
"block";

document.getElementById(
"profileBtn"
).innerText =
result.user.name + " ▼";

        } else {

            alert(
                "Registration Successful. Please Login."
            );

            isLoginMode = true;

            document
            .getElementById("modalTitle")
            .innerText = "Login";

            document
            .getElementById("submitBtn")
            .innerText = "Login";

        }

    } catch (error) {

        console.error(error);

        alert(
            error.message === "Failed to fetch"
                ? "Cannot reach server. Check your internet connection."
                : "Server error. Please try again."
        );

    }

});
const profileMenu =
document.getElementById("profileMenu");

const dropdownMenu =
document.getElementById("dropdownMenu");

const profileBtn =
document.getElementById("profileBtn");

const logoutBtn =
document.getElementById("logoutBtn");

const profileModal =
document.getElementById("profileModal");

const purchaseModal =
document.getElementById("purchaseModal");
if(profileMenu){
    profileMenu.style.display = "none";
}

if(profileMenu){
    profileMenu.style.display = "none";
}

/* Restore Login After Refresh */

const token = localStorage.getItem("token");
const userName = localStorage.getItem("userName");

if(token && profileMenu && profileBtn){

    profileMenu.style.display = "block";
    profileBtn.innerText = (userName || "User") + " ▼";

}

/* Profile Dropdown */

if(profileBtn){

    profileBtn.addEventListener("click", () => {

        dropdownMenu.style.display =
        dropdownMenu.style.display === "block"
        ? "none"
        : "block";

    });

}

/* Profile Modal */

const profileLink =
document.getElementById("profileLink");

if(profileLink){

    profileLink.addEventListener("click", () => {

        profileModal.style.display = "block";

    });

}

/* Purchase Modal */

const purchaseLink =
document.getElementById("purchaseLink");

if(purchaseLink){

    purchaseLink.addEventListener("click", () => {

        purchaseModal.style.display = "block";

    });

}

/* Close Profile */

const closeProfile =
document.querySelector(".close-profile");

if(closeProfile){

    closeProfile.addEventListener("click", () => {

        profileModal.style.display = "none";

    });

}

/* Close Purchase */

const closePurchase =
document.querySelector(".close-purchase");

if(closePurchase){

    closePurchase.addEventListener("click", () => {

        purchaseModal.style.display = "none";

    });

}

/* Logout */

if(logoutBtn){

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userName");

        location.reload();

    });

}
const quoteModal =
document.getElementById("quoteModal");

const closeQuote =
document.querySelector(".close-quote");

if(closeQuote){

    closeQuote.addEventListener("click",()=>{

        quoteModal.style.display =
        "none";

    });

}

document
.getElementById("quoteForm")
.addEventListener("submit",(e)=>{

    e.preventDefault();

    const product =
    document.getElementById(
        "productName"
    ).value;

    const quantity =
    document.getElementById(
        "quantity"
    ).value;

    const partNumber =
document.getElementById(
    "partNumber"
).value;

const productCode =
document.getElementById(
    "productCode"
).value;

    const userName =
    localStorage.getItem(
        "userName"
    );

    const subject =
    encodeURIComponent(
        "Quote Request"
    );

    const body =
encodeURIComponent(

`Customer Name: ${userName}

Product Name: ${product}

Part Number: ${partNumber}

Product Code: ${productCode}

Quantity: ${quantity}`

);

    window.location.href =
    `mailto:sales@nanditech.com?subject=${subject}&body=${body}`;

});
const viewMoreBtn =
document.getElementById("viewMoreBtn");

if(viewMoreBtn){

    viewMoreBtn.addEventListener("click",()=>{

        const hiddenProducts =
        document.querySelectorAll(
            ".hidden-product"
        );

        hiddenProducts.forEach(product=>{

            product.style.display =
            "block";

        });

        viewMoreBtn.style.display =
        "none";

    });

}
const menuToggle =
document.getElementById("menuToggle");

const navLinks =
document.querySelector(".nav-links");

const navRight =
document.querySelector(".nav-right");

if(menuToggle){

    menuToggle.addEventListener("click",()=>{

    navLinks.classList.toggle("active");
    navRight.classList.toggle("active");

    if(navLinks.classList.contains("active")){
        menuToggle.innerHTML = "✖";
    }
    else{
        menuToggle.innerHTML = "☰";
    }

});

}

/* AUTO CLOSE MENU */

document
.querySelectorAll(".nav-links a")
.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");
        navRight.classList.remove("active");

        menuToggle.innerHTML = "☰";

    });

});
const viewButtons =
document.querySelectorAll(
    ".view-product-btn"
);

viewButtons.forEach(button => {

    button.addEventListener("click", () => {

        const token =
        localStorage.getItem("token");

        if(!token){

            modal.style.display =
            "block";

            return;

        }

        const card =
        button.closest(
            ".product-card"
        );

        const productName =
        card.querySelector(
            ".product-title"
        ).innerText;

        document.getElementById(
            "productName"
        ).value =
        productName;

        quoteModal.style.display =
        "block";

    });

});