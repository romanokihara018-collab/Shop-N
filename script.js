console.log("hello");

let savedEmail = "";
let savedPass = "";
let isLoggedIn = false;

// =======================================
// LOGIN SCREEN
// =======================================
const lockScreen = document.createElement("div");
lockScreen.id = "lockScreen";
lockScreen.style.position = "fixed";
lockScreen.style.top = "0";
lockScreen.style.left = "0";
lockScreen.style.width = "100%";
lockScreen.style.height = "100%";
lockScreen.style.background = "url('1.jpg') center/cover";
lockScreen.style.zIndex = "9999";
lockScreen.style.display = "flex";
lockScreen.style.flexDirection = "column";
lockScreen.style.justifyContent = "center";
lockScreen.style.alignItems = "center";
lockScreen.style.fontFamily = "Arial";
document.body.appendChild(lockScreen);

const loginBox = document.createElement("div");
loginBox.innerHTML = `
    <h2>Login</h2>
    <input id="login-email" placeholder="Email"><br><br>
    <input id="login-pass" type="password" placeholder="Password"><br><br>
    <button id="loginBtn">Login</button>
    <p id="openRegister" style="cursor:pointer;color:blue;">Register</p>
    <p id="openForgot" style="cursor:pointer;color:blue;">Forgot Password?</p>
`;
lockScreen.appendChild(loginBox);

const registerBox = document.createElement("div");
registerBox.style.display = "none";
registerBox.innerHTML = `
    <h2>Register</h2>
    <input id="reg-email" placeholder="Email"><br><br>
    <input id="reg-pass" type="password" placeholder="Password"><br><br>
    <button id="regBtn">Create Account</button>
    <p id="backLogin1" style="cursor:pointer;color:blue;">Back To Login</p>
`;
lockScreen.appendChild(registerBox);

const forgotBox = document.createElement("div");
forgotBox.style.display = "none";
forgotBox.innerHTML = `
    <h2>Forgot Password</h2>
    <input id="forgot-email" placeholder="Enter your email"><br><br>
    <button id="forgotBtn">Reset</button>
    <p id="backLogin2" style="cursor:pointer;color:blue;">Back To Login</p>
`;
lockScreen.appendChild(forgotBox);

// =======================================
// LOGIN / REGISTER / FORGOT LOGIC
// =======================================
document.addEventListener("click", (e) => {
    if (e.target.id === "openRegister") {
        loginBox.style.display = "none";
        registerBox.style.display = "block";
        forgotBox.style.display = "none";
    }
    if (e.target.id === "openForgot") {
        loginBox.style.display = "none";
        registerBox.style.display = "none";
        forgotBox.style.display = "block";
    }
    if (e.target.id === "backLogin1" || e.target.id === "backLogin2") {
        loginBox.style.display = "block";
        registerBox.style.display = "none";
        forgotBox.style.display = "none";
    }

    if (e.target.id === "regBtn") {
        savedEmail = document.getElementById("reg-email").value;
        savedPass = document.getElementById("reg-pass").value;
        if (!savedEmail || !savedPass) { alert("Fill all fields"); return; }
        alert("Account created!");
        loginBox.style.display = "block";
        registerBox.style.display = "none";
    }

    if (e.target.id === "loginBtn") {
        const email = document.getElementById("login-email").value;
        const pass = document.getElementById("login-pass").value;
        if (email === savedEmail && pass === savedPass) {
            alert("Login successful!");
            isLoggedIn = true;
            lockScreen.style.display = "none"; 
            document.querySelector(".top-menu").style.display = "flex"; 
            showPage("home"); // Directly go to Home page
        } else {
            alert("Wrong email or password!");
        }
    }

    if (e.target.id === "forgotBtn") {
        const email = document.getElementById("forgot-email").value;
        if (email === savedEmail) {
            alert("Password reset link sent!");
        } else {
            alert("Email not found!");
        }
    }
});

// =======================================
// NAVIGATION MENU
// =======================================
let cart = []; 

const menu = document.createElement("div");
menu.classList.add("top-menu");
menu.style.display = "none";  
menu.style.gap = "10px";

["Home","Services","About","Contact","Cart"].forEach(name=>{
    const btn = document.createElement("button");
    btn.classList.add("menu-btn");
    btn.textContent = name;

    if(name==="Cart"){
        const badge = document.createElement("span");
        badge.classList.add("cart-count");
        badge.textContent = 0;
        btn.appendChild(badge);
    }

    btn.addEventListener("click", ()=>{
        if(!isLoggedIn){
            alert("Please login first");
            return;
        }
        switch(name){
            case "Home": showPage("home"); break;
            case "Services": showPage("services"); break;
            case "About": showPage("about"); break;
            case "Contact": showPage("contact"); break;
            case "Cart": showPage("cart"); break;
        }
    });

    menu.appendChild(btn);
});
document.body.prepend(menu);

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

// =======================================
// PAGES
// =======================================
const pages = ["home","services","about","contact","cart"];
const pageElements = {};

pages.forEach(p=>{
    const div = document.createElement("div");
    div.id = p;
    div.style.display="none";
    div.style.padding="20px";
    div.style.minHeight = "100vh"; 
    pageElements[p] = div;
    root.appendChild(div);
});

// =======================================
// HOME PAGE
// =======================================
pageElements["home"].innerHTML = `
    <h1 id="home-title">Welcome to our shop</h1>
    <p id="home-desc">
        Discover amazing products and deals at unbeatable prices!
    </p>
    <div id="home-banner" style="
        background: url('home-banner.jpg') center/cover no-repeat;
        width: 90%;
        max-width: 1200px;
        height: 400px;
        border-radius: 15px;
        margin: 20px auto;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    "></div>
`;

const homeTitle = document.getElementById("home-title");
homeTitle.style.color = "#ff6600";
homeTitle.style.fontSize = "48px";
homeTitle.style.textAlign = "center";
homeTitle.style.fontWeight = "700";
homeTitle.style.marginTop = "50px";
homeTitle.style.textShadow = "2px 2px 8px rgba(0,0,0,0.3)";

const homeDesc = document.getElementById("home-desc");
homeDesc.style.color = "#fff";
homeDesc.style.fontSize = "20px";
homeDesc.style.textAlign = "center";
homeDesc.style.maxWidth = "700px";
homeDesc.style.margin = "10px auto 30px auto";
homeDesc.style.lineHeight = "1.6";
homeDesc.style.background = "rgba(0,0,0,0.5)";
homeDesc.style.padding = "15px 20px";
homeDesc.style.borderRadius = "10px";
homeDesc.style.boxShadow = "0 5px 10px rgba(0,0,0,0.3)";

// Other pages
pageElements["about"].innerHTML = "<h1 style='color:white;'>About Us</h1>";
pageElements["contact"].innerHTML = "<h1 style='color:white;'>Contact Us</h1>";
pageElements["cart"].innerHTML = "<h1 style='color:white;'>Cart</h1><div id='cart-items'>No items yet</div>";

// =======================================
// SHOW PAGE FUNCTION
// =======================================
function showPage(pageName){
    pages.forEach(p => {
        pageElements[p].style.display = "none";
        pageElements[p].style.background = ""; 
    });
    pageElements[pageName].style.display = "block";

    switch(pageName){
        case "home":
            pageElements[pageName].style.background = "url('banner.jpg') no-repeat center/cover";
            break;
        case "services":
            pageElements[pageName].style.background = "rgba(12,112,148,0.8)";
            break;
        case "about":
            pageElements[pageName].style.background = "rgba(192, 169, 134, 0.8)";
            break;
        case "contact":
            pageElements[pageName].style.background = "blueviolet";
            break;
        case "cart":
            pageElements[pageName].style.background = "rgba(12,112,148,0.8)";
            break;
    }
}

// =======================================
// PRODUCTS FOR SERVICES PAGE
// =======================================
const el = document.createElement("div");
el.id = "nav";
el.style.display="grid";
el.style.gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))";
el.style.gap="15px";
pageElements["services"].appendChild(el);

async function getProducts() {
    try {
        let response = await fetch("https://dummyjson.com/products");
        let data = await response.json();
        let products = data.products;

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");
            el.appendChild(card);

            const img = document.createElement("img");
            img.src = product.images[0];
            card.appendChild(img);

            const title = document.createElement("h2");
            title.textContent = product.title;
            card.appendChild(title);

            const description = document.createElement("p");
            description.textContent = product.description;
            card.appendChild(description);

            const pars = document.createElement("p");
            pars.textContent = "$" + product.price;
            card.appendChild(pars);

            const addBtn = document.createElement("button");
            addBtn.textContent = "Add to Cart";
            card.appendChild(addBtn);

            addBtn.addEventListener("click", () => {
                let existingItem = cart.find(item => item.id === product.id);

                if(existingItem){
                    existingItem.quantity++;
                } else {
                    cart.push({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        quantity: 1
                    });
                }
                updateCartDisplay();
            });
        });
    } catch (error) {
        console.log("Error:", error);
    }
}

getProducts();

// =======================================
// CART DISPLAY
// =======================================
function updateCartDisplay() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    if(cart.length === 0){
        cartItems.textContent = "No items yet";
        document.querySelector(".cart-count").textContent = 0;
        return;
    }

    let totalCount = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalCount += item.quantity;
        totalPrice += item.price * item.quantity;

        const itemElem = document.createElement("div");
        itemElem.classList.add("cart-item");

        const itemInfo = document.createElement("div");
        const title = document.createElement("h3");
        title.textContent = item.title;
        const price = document.createElement("p");
        price.textContent = `$${item.price}`;
        itemInfo.appendChild(title);
        itemInfo.appendChild(price);

        const qtyControls = document.createElement("div");
        qtyControls.classList.add("qty-controls");

        const minusBtn = document.createElement("button");
        minusBtn.textContent = "-";
        minusBtn.addEventListener("click", () => {
            item.quantity--;
            if(item.quantity <= 0){
                cart = cart.filter(i => i.id !== item.id);
            }
            updateCartDisplay();
        });

        const qtyDisplay = document.createElement("span");
        qtyDisplay.textContent = item.quantity;

        const plusBtn = document.createElement("button");
        plusBtn.textContent = "+";
        plusBtn.addEventListener("click", () => {
            item.quantity++;
            updateCartDisplay();
        });

        qtyControls.appendChild(minusBtn);
        qtyControls.appendChild(qtyDisplay);
        qtyControls.appendChild(plusBtn);

        itemElem.appendChild(itemInfo);
        itemElem.appendChild(qtyControls);

        cartItems.appendChild(itemElem);
    });

    document.querySelector(".cart-count").textContent = totalCount;

    let totalElem = document.getElementById("cart-total");
    if(!totalElem){
        totalElem = document.createElement("p");
        totalElem.id = "cart-total";
        cartItems.appendChild(totalElem);
    }
    totalElem.textContent = "Total: $" + totalPrice.toFixed(2);
}
