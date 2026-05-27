const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const closeMenu = document.querySelector(".close-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");
const addButtons = document.querySelectorAll(".add-to-cart");
const cartCounts = document.querySelectorAll(".cart-count");
const toast = document.querySelector(".toast");
const testimonialText = document.querySelector("#testimonialText");
const testimonialAuthor = document.querySelector("#testimonialAuthor");
const sliderButtons = document.querySelectorAll(".slider-button");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const ADMIN_PASSCODE = "cake123";
const API_BASE_URL = window.location.protocol === "file:" ? "http://127.0.0.1:5000" : "";

const defaultCakePricing = ["500g - Rs. 550", "1kg - Rs. 950", "1.5kg - Rs. 1,400", "2kg - Rs. 1,850"];
const defaultTreatPricing = ["Single piece - Rs. 120", "Box of 4 - Rs. 420", "Box of 6 - Rs. 620", "Party box - custom quote"];

const products = {
  "black-forest": {
    title: "Black Forest Cake",
    category: "Classic Cakes",
    price: "Rs. 550.00",
    image: "/static/assets/black-forest.png",
    description: "Soft chocolate sponge layered with whipped cream, cherry filling, and chocolate shavings.",
    pricing: defaultCakePricing,
    ingredients: ["Chocolate sponge", "Fresh whipped cream", "Cherry filling", "Chocolate shavings", "Red cherries"]
  },
  "white-forest": {
    title: "White Forest Cake",
    category: "Classic Cakes",
    price: "Rs. 1,250.00",
    image: "/static/assets/white-forest.jpg",
    description: "Vanilla sponge layered with whipped cream, cherry filling, and delicate white chocolate shavings.",
    pricing: defaultCakePricing,
    ingredients: ["Vanilla sponge", "Fresh whipped cream", "Cherry filling", "White chocolate shavings", "Red cherries"]
  },
  strawberry: {
    title: "Strawberry Cake",
    category: "Classic Cakes",
    price: "Rs. 1,250.00",
    image: "/static/assets/strawberry.jpg",
    description: "Soft sponge cake with strawberry cream and fruity layers.",
    pricing: defaultCakePricing,
    ingredients: ["Vanilla sponge", "Strawberry filling", "Whipped cream", "Fresh strawberry topping"]
  },
  blueberry: {
    title: "Blueberry Cake",
    category: "Classic Cakes",
    price: "Rs. 1,250.00",
    image: "/static/assets/Blue-berry.jpg",
    description: "A light cream cake filled with blueberry compote and smooth frosting.",
    pricing: defaultCakePricing,
    ingredients: ["Vanilla sponge", "Blueberry compote", "Whipped cream", "Blueberry glaze"]
  },
  blackcurrant: {
    title: "Blackcurrant Cake",
    category: "Classic Cakes",
    price: "Rs. 1,250.00",
    image: "/static/assets/blue-currant.jpeg",
    description: "Tangy blackcurrant filling paired with soft sponge and fresh cream.",
    pricing: defaultCakePricing,
    ingredients: ["Vanilla sponge", "Blackcurrant filling", "Fresh cream", "Fruit glaze"]
  },
  "fresh-mango-cake": {
    title: "Fresh Mango Cake",
    category: "Classic Cakes",
    price: "Rs. 1,350.00",
    image: "/static/assets/fresh-mango.jpg",
    description: "Seasonal mango cake with fresh mango filling and soft cream layers.",
    pricing: defaultCakePricing,
    ingredients: ["Vanilla sponge", "Fresh mango", "Mango cream", "Whipped cream"]
  },
  "fresh-pineapple": {
    title: "Fresh Pineapple Cake",
    category: "Classic Cakes",
    price: "Rs. 1,250.00",
    image: "/static/assets/Pineapple.jpg",
    description: "Fresh pineapple filling with light cream and airy vanilla sponge.",
    pricing: defaultCakePricing,
    ingredients: ["Vanilla sponge", "Pineapple filling", "Fresh cream", "Pineapple garnish"]
  },
  "seasonal-filling-cake": {
    title: "Seasonal Filling Cake",
    category: "Classic Cakes",
    price: "Rs. 1,350.00",
    image: "/static/assets/season.png",
    description: "A custom seasonal fruit filling cake based on fresh availability.",
    pricing: defaultCakePricing,
    ingredients: ["Vanilla sponge", "Seasonal fruit filling", "Fresh cream", "Fruit garnish"]
  },
  "chocolate-truffle": {
    title: "Chocolate Truffle Cake",
    category: "Chocolate Cakes",
    price: "Rs. 1,300.00",
    image: "/static/assets/truffle.png",
    description: "Rich chocolate sponge layered with smooth ganache and truffle cream.",
    pricing: defaultCakePricing,
    ingredients: ["Chocolate sponge", "Chocolate ganache", "Truffle cream", "Chocolate curls"]
  },
  "kitkat-cake": {
    title: "KitKat Cake",
    category: "Chocolate Cakes",
    price: "Rs. 1,450.00",
    image: "/static/assets/Kitkat.png",
    description: "Chocolate cream cake finished with KitKat bars and crunchy toppings.",
    pricing: defaultCakePricing,
    ingredients: ["Chocolate sponge", "Chocolate cream", "KitKat", "Chocolate drizzle"]
  },
  "ferrero-rocher": {
    title: "Ferrero Rocher Cake",
    category: "Chocolate Cakes",
    price: "Rs. 1,650.00",
    image: "/static/assets/Ferrero.jpg",
    description: "Hazelnut chocolate cake inspired by Ferrero Rocher flavours.",
    pricing: defaultCakePricing,
    ingredients: ["Chocolate sponge", "Hazelnut cream", "Chocolate ganache", "Roasted nuts"]
  },
  "caramel-chocolate": {
    title: "Caramel Chocolate Cake",
    category: "Chocolate Cakes",
    price: "Rs. 1,400.00",
    image: "/static/assets/caramel.jpg",
    description: "Chocolate sponge paired with caramel cream and a smooth caramel finish.",
    pricing: defaultCakePricing,
    ingredients: ["Chocolate sponge", "Caramel sauce", "Chocolate cream", "Caramel drizzle"]
  },
  "choco-vanilla": {
    title: "Choco Vanilla Cake",
    category: "Chocolate Cakes",
    price: "Rs. 1,250.00",
    image: "/static/assets/choco.jpg",
    description: "Balanced chocolate and vanilla layers with smooth cream frosting.",
    pricing: defaultCakePricing,
    ingredients: ["Chocolate sponge", "Vanilla sponge", "Whipped cream", "Chocolate garnish"]
  },
  "rasmalai-cake": {
    title: "Rasmalai Cake",
    category: "Fusion Flavors",
    price: "Rs. 1,450.00",
    image: "/static/assets/rasmalai.jpg",
    description: "Indian dessert-inspired cake with rasmalai flavours and saffron notes.",
    pricing: defaultCakePricing,
    ingredients: ["Vanilla sponge", "Rasmalai milk", "Saffron cream", "Pistachio garnish"]
  },
  "gulab-jamun-cake": {
    title: "Gulab Jamun Cake",
    category: "Fusion Flavors",
    price: "Rs. 1,450.00",
    image: "/static/assets/gulab.jpg",
    description: "Cream cake layered with gulab jamun pieces and cardamom flavour.",
    pricing: defaultCakePricing,
    ingredients: ["Vanilla sponge", "Gulab jamun", "Cardamom cream", "Rose syrup"]
  },
  "rosemilk-cake": {
    title: "Rosemilk Cake",
    category: "Fusion Flavors",
    price: "Rs. 1,350.00",
    image: "/static/assets/rosemilk.jpg",
    description: "Soft rose-flavoured cake with light cream and floral sweetness.",
    pricing: defaultCakePricing,
    ingredients: ["Vanilla sponge", "Rose milk", "Rose cream", "Petal garnish"]
  },
  "korean-cheese-bun": {
    title: "Korean Cheese Bun",
    category: "Daily Bakes & Pastries",
    price: "Rs. 100.00",
    image: "/static/assets/korean.jpg",
    description: "Soft bun filled with creamy cheese and savoury-sweet garlic notes.",
    pricing: ["1 nos - Rs. 100.00"],
    ingredients: ["Soft bun", "Cream cheese", "Garlic butter", "Herbs"]
  },
  "bomboloni-classic-vanilla": {
    title: "Bomboloni Classic Vanilla",
    category: "Daily Bakes & Pastries",
    price: "Rs. 100.00",
    image: "/static/assets/bombolini.jpg",
    description: "Fluffy filled doughnut with classic vanilla cream.",
    pricing: ["1 nos - Rs. 100.00"],
    ingredients: ["Doughnut dough", "Vanilla cream", "Sugar dusting"]
  },
  "bomboloni-chocolate-burst": {
    title: "Bomboloni Chocolate Burst",
    category: "Daily Bakes & Pastries",
    price: "Rs. 110.00",
    image: "/static/assets/bombolini.jpg",
    description: "Soft bomboloni filled with rich chocolate cream.",
    pricing: ["1 nos - Rs. 110.00"],
    ingredients: ["Doughnut dough", "Chocolate filling", "Cocoa dusting"]
  },
  "assorted-filled-cupcakes": {
    title: "Assorted Filled Cupcake",
    category: "Daily Bakes & Pastries",
    price: "Rs. 70.00",
    image: "/static/assets/cupcake.jpg",
    description: "A mixed cupcake box with creamy fillings and fresh toppings.",
    pricing: ["Starting from Rs. 70.00 each"],
    ingredients: ["Cupcake sponge", "Assorted fillings", "Buttercream", "Toppings"]
  },
  "nutella-cookie-tin": {
    title: "Nutella Cookie Tin",
    category: "Brownies & Cookies",
    price: "Rs. 420.00",
    image: "/static/assets/cookie.jpg",
    description: "Cookie tin packed with rich Nutella-filled cookies for gifting and snacking.",
    pricing: ["250 gm - Rs. 420.00", "500 gm - Rs. 750.00"],
    ingredients: ["Cookie dough", "Nutella", "Chocolate chips", "Butter"]
  },
  "assorted-brownie-box": {
    title: "Assorted Brownie",
    category: "Brownies & Cookies",
    price: "Rs. 800.00",
    image: "/static/assets/brown.jpg",
    description: "A box of fudgy brownies in assorted flavours.",
    pricing: ["9 pcs - Rs. 800.00", "16 pcs - Rs. 1,000.00"],
    ingredients: ["Dark chocolate", "Butter", "Cocoa", "Assorted toppings"]
  },
  "classic-tea-cake": {
    title: "Tea Cake",
    category: "Tea Cakes",
    price: "Rs. 300.00",
    image: "/static/assets/tea.jpg",
    description: "Simple, soft tea cake made for coffee breaks and evening snacks.",
    pricing: ["1/2 kg - Rs. 300.00", "1 kg - Rs. 600.00"],
    ingredients: ["Flour", "Butter", "Sugar", "Vanilla"]
  },
  "rainbow-cake": {
    title: "Rainbow Cake",
    category: "Tea Cakes",
    price: "Rs. 300.00",
    image: "/static/assets/Rainbow.jpg",
    description: "Colourful layered cake with a soft crumb and light cream.",
    pricing: ["1/2 kg - Rs. 300.00", "1 kg - Rs. 600.00"],
    ingredients: ["Vanilla sponge", "Food colours", "Whipped cream", "Sprinkles"]
  },
  "bento-cakes": {
    title: "Bento",
    category: "Mini Cakes",
    price: "Rs. 300.00",
    image: "/static/assets/bento.png",
    description: "Mini celebration cakes for small surprises and personal gifting.",
    pricing: ["Base price - Rs. 300.00", "Customisation charges extra"],
    ingredients: ["Soft sponge", "Whipped cream", "Custom filling", "Decorative frosting"]
  }
};

function getAdminData() {
  return JSON.parse(localStorage.getItem("cakeTheoryAdminData") || "{}");
}

function saveAdminData(data) {
  localStorage.setItem("cakeTheoryAdminData", JSON.stringify(data));
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getAllProducts() {
  const adminData = getAdminData();
  const overrides = adminData.products || {};
  const merged = {};

  Object.keys(products).forEach((slug) => {
    merged[slug] = { ...products[slug], ...(overrides[slug] || {}) };
  });

  Object.keys(overrides).forEach((slug) => {
    if (!merged[slug]) {
      merged[slug] = overrides[slug];
    }
  });

  return merged;
}

function getProductPageUrl(slug) {
  return `${slug}.html`;
}

function getProductSlugFromLocation() {
  const params = new URLSearchParams(window.location.search);
  const querySlug = params.get("item");
  if (querySlug) return querySlug;

  const fileName = window.location.pathname.split("/").pop() || "";
  const fileSlug = fileName.replace(/\.html$/i, "");
  return fileSlug && fileSlug !== "product" ? fileSlug : "black-forest";
}

const testimonials = [
  {
    text: "The cake looked beautiful and tasted even better. The finish was elegant, and delivery was right on time.",
    author: "Ananya R."
  },
  {
    text: "We ordered a custom birthday cake and The Cake Theory understood the design perfectly. Soft sponge, balanced sweetness, and lovely presentation.",
    author: "Rohit M."
  },
  {
    text: "Their cupcakes and cheesecakes are now our weekend dessert habit. Everything feels fresh and thoughtfully made.",
    author: "Meera S."
  }
];

let cartItems = 0;
let testimonialIndex = 0;
let toastTimer;
let activeProductSlug = "";
let activeProduct = null;

function getCart() {
  return JSON.parse(localStorage.getItem("cakeTheoryCart") || "[]");
}

function saveCart(items) {
  localStorage.setItem("cakeTheoryCart", JSON.stringify(items));
}

function parsePrice(price) {
  const text = String(price);
  const rupeeMatch = text.match(/(?:Rs\.?|₹)\s*(\d[\d,]*(?:\.\d+)?)/i);
  const fallbackMatch = text.match(/(\d[\d,]*(?:\.\d+)?)/);
  const match = rupeeMatch || fallbackMatch;
  return match ? Number(match[1].replace(/,/g, "")) : 0;
}

function getCartItemUnitPrice(item) {
  return parsePrice(item.size) || Number(item.unitPrice) || parsePrice(item.price);
}

function formatPrice(value) {
  return `Rs. ${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function getCartTotal(cart) {
  return cart.reduce((total, item) => {
    const unitPrice = getCartItemUnitPrice(item);
    return total + unitPrice * item.quantity;
  }, 0);
}

function getMinimumDisplayPrice(product) {
  const firstPricingOption = product.pricing?.[0] || product.price || "";
  return formatPrice(parsePrice(firstPricingOption || product.price));
}

function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = getCartTotal(cart);

  cartCounts.forEach((count) => {
    count.textContent = totalItems;
  });

  let stickyBar = document.querySelector("#stickyCartBar");
  if (!stickyBar) {
    stickyBar = document.createElement("div");
    stickyBar.id = "stickyCartBar";
    stickyBar.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 40px);
      max-width: 440px;
      background: var(--paper);
      color: var(--ink);
      border: 1px solid var(--line);
      padding: 16px 20px;
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
      z-index: 1000;
      cursor: pointer;
      font-weight: 800;
      font-size: 16px;
      transition: opacity 0.3s ease, transform 0.3s ease;
    `;
    stickyBar.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
    document.body.appendChild(stickyBar);
  }

  const isHiddenPage = window.location.pathname.includes("cart.html") || window.location.pathname.includes("admin");
  if (totalItems > 0 && !isHiddenPage) {
    stickyBar.innerHTML = `
      <span>${formatPrice(totalAmount)} <span style="font-weight: 500; opacity: 0.8; margin: 0 6px;">|</span> ${totalItems} item${totalItems > 1 ? "s" : ""}</span>
      <span style="display: flex; align-items: center; gap: 8px;">View Cart <span style="font-size: 20px; line-height: 1;">&rarr;</span></span>
    `;
    stickyBar.style.opacity = "1";
    stickyBar.style.transform = "translateX(-50%) translateY(0)";
    stickyBar.style.pointerEvents = "auto";
  } else {
    stickyBar.style.opacity = "0";
    stickyBar.style.transform = "translateX(-50%) translateY(20px)";
    stickyBar.style.pointerEvents = "none";
  }
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("visible");
  }, 2400);
}

function renderTestimonial() {
  if (!testimonialText || !testimonialAuthor) return;
  const current = testimonials[testimonialIndex];
  testimonialText.textContent = `"${current.text}"`;
  testimonialAuthor.textContent = current.author;
}

function renderList(target, items) {
  if (!target) return;
  target.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderSelectOptions(target, items) {
  if (!target) return;
  target.innerHTML = items.map((item) => `<option>${item}</option>`).join("");
}

function getPricingLines(value) {
  return String(value || "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function splitPricingLine(line) {
  const text = String(line || "").trim();
  const parts = text.split("-");

  if (parts.length < 2) {
    return { size: "", price: text };
  }

  return {
    size: parts.shift().trim(),
    price: parts.join("-").trim()
  };
}

function renderAdminPricingRow(line = "") {
  const pricing = splitPricingLine(line);

  return `
    <div class="admin-pricing-row">
      <input data-pricing-size value="${escapeHtml(pricing.size)}" placeholder="500g">
      <input data-pricing-price value="${escapeHtml(pricing.price)}" placeholder="Rs. 550">
      <button type="button" data-remove-pricing aria-label="Remove price">-</button>
    </div>
  `;
}

function renderAdminPricingField(pricing) {
  const rows = pricing && pricing.length ? pricing : [""];

  return `
    <div class="admin-pricing-field">
      <span>Size Prices</span>
      <div class="admin-pricing-rows">
        ${rows.map((line) => renderAdminPricingRow(line)).join("")}
      </div>
      <button type="button" class="admin-add-price" data-add-pricing>Add Size Price</button>
    </div>
  `;
}

function getPricingFromField(field) {
  if (!field) return [];

  return [...field.querySelectorAll(".admin-pricing-row")]
    .map((row) => {
      const size = row.querySelector("[data-pricing-size]")?.value.trim() || "";
      const price = row.querySelector("[data-pricing-price]")?.value.trim() || "";

      if (size && price) return `${size} - ${price}`;
      return price || size;
    })
    .filter(Boolean);
}

function renderSizeChoices(target, items) {
  if (!target) return;
  target.innerHTML = `
    <span>Sizes</span>
    ${items
      .map((item, index) => {
        const label = item.split("-")[0].trim();
        return `
          <label>
            <input type="radio" name="size" value="${item}" ${index === 0 ? "checked" : ""}>
            <span>${label}</span>
          </label>
        `;
      })
      .join("")}
  `;
}

function renderProductPage() {
  const title = document.querySelector("#productTitle");
  if (!title) return;

  const slug = getProductSlugFromLocation();
  const allProducts = getAllProducts();
  const product = allProducts[slug] || allProducts["black-forest"];
  activeProductSlug = slug;
  activeProduct = product;
  const imagePanel = document.querySelector(".product-image-panel");
  const image = document.querySelector("#productImage");
  const hint = document.querySelector("#imageFileHint");

  document.title = `${product.title} | The Cake Theory`;
  document.querySelector("#productCategory").textContent = product.category;
  title.textContent = product.title;
  document.querySelector("#productMainPrice").textContent = getMinimumDisplayPrice(product);
  renderSelectOptions(document.querySelector("#productSize"), product.pricing);
  renderSizeChoices(document.querySelector("#productSizeChoices"), product.pricing);
  renderList(document.querySelector("#productIngredients"), product.ingredients);
  const submitButton = document.querySelector(".sold-out-button");
  if (submitButton) {
    submitButton.textContent = product.status === "sold-out" ? "Sold Out" : "Add To Cart";
    submitButton.disabled = product.status === "sold-out";
  }

  if (hint) {
    hint.textContent = `Suggested file: static/assets/${slug}.jpg or static/assets/${slug}.png`;
  }

  if (image) {
    const jpgPath = `/static/assets/${slug}.jpg`;
    const pngPath = `/static/assets/${slug}.png`;
    let triedPng = false;

    image.alt = product.title;
    image.onload = () => {
      imagePanel.classList.add("has-image");
    };
    image.onerror = () => {
      if (!triedPng && image.src.endsWith(".jpg")) {
        triedPng = true;
        image.src = pngPath;
        return;
      }

      image.removeAttribute("src");
      imagePanel.classList.remove("has-image");
    };
    image.src = product.image || jpgPath;
  }
}

document.querySelectorAll("[data-quantity]").forEach((button) => {
  button.addEventListener("click", () => {
    const quantity = document.querySelector("#productQuantity");
    if (!quantity) return;

    const currentValue = Number(quantity.value);
    quantity.value =
      button.dataset.quantity === "increase"
        ? currentValue + 1
        : Math.max(1, currentValue - 1);
  });
});

const productOrderBox = document.querySelector(".product-order-box");
if (productOrderBox) {
  productOrderBox.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!activeProduct || activeProduct.status === "sold-out") return;

    const selectedSize = document.querySelector("input[name='size']:checked");
    const size = selectedSize ? selectedSize.value : document.querySelector("#productSize").value;
    const option = document.querySelector("#productOption")?.value || "Egg";
    const note = productOrderBox.querySelector(".note-label input").value.trim();
    const quantity = Number(document.querySelector("#productQuantity").value);
    const selectedPrice = parsePrice(size) || parsePrice(activeProduct.price);
    const cart = getCart();
    const cartItem = {
      id: `${activeProductSlug}-${Date.now()}`,
      slug: activeProductSlug,
      title: activeProduct.title,
      category: activeProduct.category,
      price: formatPrice(selectedPrice),
      unitPrice: selectedPrice,
      image: activeProduct.image || "",
      size,
      option,
      note,
      quantity
    };

    cart.push(cartItem);
    saveCart(cart);
    updateCartCount();
    showToast(`${activeProduct.title} added to your cart.`);
  });
}

const adminLoginForm = document.querySelector("#adminLoginForm");
if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.querySelector("#adminLoginStatus");
    const passcode = document.querySelector("#adminPassword").value;

    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem("cakeTheoryAdminLoggedIn", "true");
      renderAdminPage();
    } else {
      status.textContent = "Wrong passcode.";
    }
  });
}

const adminLogout = document.querySelector("#adminLogout");
if (adminLogout) {
  adminLogout.addEventListener("click", () => {
    sessionStorage.removeItem("cakeTheoryAdminLoggedIn");
    renderAdminPage();
  });
}

document.addEventListener("click", (event) => {
  const addPricingButton = event.target.closest("[data-add-pricing]");
  const removePricingButton = event.target.closest("[data-remove-pricing]");

  if (addPricingButton) {
    const field = addPricingButton.closest(".admin-pricing-field");
    field.querySelector(".admin-pricing-rows").insertAdjacentHTML("beforeend", renderAdminPricingRow());
  }

  if (removePricingButton) {
    const rows = removePricingButton.closest(".admin-pricing-rows");
    const row = removePricingButton.closest(".admin-pricing-row");

    if (rows.querySelectorAll(".admin-pricing-row").length > 1) {
      row.remove();
    } else {
      row.querySelectorAll("input").forEach((input) => {
        input.value = "";
      });
    }
  }
});

const homeTextForm = document.querySelector("#homeTextForm");
if (homeTextForm) {
  homeTextForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = getAdminData();
    data.homeTitle = document.querySelector("#adminHomeTitle").value.trim();
    data.homeBody = document.querySelector("#adminHomeBody").value.trim();
    saveAdminData(data);
    showToast("Homepage text saved.");
  });
}

const newProductForm = document.querySelector("#newProductForm");
if (newProductForm) {
  newProductForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#newProductName").value.trim();
    const category = document.querySelector("#newProductCategory").value.trim();
    const price = document.querySelector("#newProductPrice").value.trim();
    const pricing = getPricingFromField(document.querySelector("#newProductPricing"));
    const image = document.querySelector("#newProductImage").value.trim();
    const status = document.querySelector("#newProductStatus").value;
    const ingredients = document.querySelector("#newProductIngredients").value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const slug = slugify(name);
    const data = getAdminData();

    data.products = data.products || {};
    data.products[slug] = {
      title: name,
      category,
      price: pricing.length ? formatPrice(parsePrice(pricing[0])) : price,
      pricing: pricing.length ? pricing : [price],
      ingredients,
      image,
      description: `${name} from The Cake Theory.`,
      status
    };

    saveAdminData(data);
    newProductForm.reset();
    document.querySelector("#newProductPricing .admin-pricing-rows").innerHTML = renderAdminPricingRow();
    showToast("New product added.");
    renderAdminPage();
  });
}

function renderCartPage() {
  const cartItemsContainer = document.querySelector("#cartItems");
  if (!cartItemsContainer) return;

  const cart = getCart();
  const summaryItems = document.querySelector("#summaryItems");
  const summaryTotal = document.querySelector("#summaryTotal");
  const clearCart = document.querySelector("#clearCart");

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Choose a cake or baked treat from the menu to add it here.</p>
        <a class="checkout-button" href="index.html#cakes">Browse Menu</a>
      </div>
    `;
    summaryItems.textContent = "0";
    summaryTotal.textContent = "Rs. 0.00";
  } else {
    cartItemsContainer.innerHTML = cart
      .map((item) => {
        const fallback = `<div class="cart-thumb-placeholder">${item.title.charAt(0)}</div>`;
        const unitPrice = getCartItemUnitPrice(item);
        const lineTotal = unitPrice * item.quantity;
        const image = item.image
          ? `<img src="${item.image}" alt="${item.title}" onerror="this.replaceWith(this.nextElementSibling)">${fallback}`
          : fallback;

        return `
          <article class="cart-item">
            <div class="cart-thumb">${image}</div>
            <div class="cart-item-info">
              <h2>${item.title}</h2>
              <p>${item.category}</p>
              <span>${item.size} | ${item.option}</span>
              ${item.note ? `<small>Message: ${item.note}</small>` : ""}
            </div>
            <div class="cart-item-meta">
              <strong>${formatPrice(lineTotal)}</strong>
              <span>Unit: ${formatPrice(unitPrice)}</span>
              <span>Qty: ${item.quantity}</span>
              <button type="button" data-remove-cart="${item.id}">Remove</button>
            </div>
          </article>
        `;
      })
      .join("");

    const itemTotal = cart.reduce((total, item) => total + item.quantity, 0);
    const priceTotal = getCartTotal(cart);
    summaryItems.textContent = itemTotal;
    summaryTotal.textContent = formatPrice(priceTotal);
  }

  document.querySelectorAll("[data-remove-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      const updatedCart = getCart().filter((item) => item.id !== button.dataset.removeCart);
      saveCart(updatedCart);
      updateCartCount();
      renderCartPage();
    });
  });

  if (clearCart) {
    clearCart.addEventListener("click", () => {
      saveCart([]);
      updateCartCount();
      renderCartPage();
    });
  }
}

const checkoutForm = document.querySelector("#checkoutForm");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const checkoutStatus = document.querySelector("#checkoutStatus");
    const cart = getCart();
    if (!cart.length) {
      checkoutStatus.textContent = "Your cart is empty.";
      return;
    }

    const formData = new FormData(checkoutForm);
    const payload = {
      customer: {
        name: formData.get("customer_name"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        notes: formData.get("notes")
      },
      total: getCartTotal(cart),
      items: cart
    };

    checkoutStatus.textContent = "Placing your order...";

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (!result.ok) {
        throw new Error(result.error || "Could not place order.");
      }

      checkoutStatus.textContent = "Order created. Opening payment gateway...";

      const totalAmountRupees = Number(result.total);
      const options = {
        key: "rzp_test_Su2xzUKeu8wcw0", // User's active Razorpay Test Key ID
        amount: Math.round(totalAmountRupees * 100), // Amount in paise
        currency: "INR",
        name: "The Cake Theory",
        description: `Order #${result.order_id} Payment`,
        handler: async function (paymentResponse) {
          checkoutStatus.textContent = "Payment successful! Verifying...";
          try {
            const payResponse = await fetch(`${API_BASE_URL}/api/orders/pay`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                order_id: result.order_id,
                payment_id: paymentResponse.razorpay_payment_id
              })
            });
            const payResult = await payResponse.json();
            if (payResult.ok) {
              saveCart([]);
              updateCartCount();
              renderCartPage();
              checkoutForm.reset();
              checkoutStatus.innerHTML = `<span style="color: #2e7d32; font-weight: bold; display: block; margin-top: 10px;">Order Placed & Paid Successfully!<br>Order ID: #${result.order_id}<br>Payment ID: ${paymentResponse.razorpay_payment_id}</span>`;
              showToast("Payment successful!");
            } else {
              throw new Error(payResult.error || "Failed to update payment.");
            }
          } catch (payError) {
            checkoutStatus.textContent = `Order placed (ID: #${result.order_id}), but payment confirmation failed: ${payError.message}`;
          }
        },
        prefill: {
          name: payload.customer.name,
          contact: payload.customer.phone
        },
        theme: {
          color: "#e88f9a" // Branding pink color matching the style of the website
        },
        modal: {
          ondismiss: function () {
            checkoutStatus.textContent = `Order placed (Unpaid). Order ID: #${result.order_id}. You can manage this order under the admin dashboard.`;
          }
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();

    } catch (error) {
      checkoutStatus.textContent = `Order failed: ${error.message}. Make sure the Python server and MySQL are running.`;
    }
  });
}

function renderHomeText() {
  const block = document.querySelector("#homeTextBlock");
  if (!block) return;

  const adminData = getAdminData();
  const title = adminData.homeTitle || "";
  const bodyText = adminData.homeBody || "";

  if (!title && !bodyText) {
    block.hidden = false;
    return;
  }

  document.querySelector("#homeTextTitle").textContent = title;
  document.querySelector("#homeTextBody").textContent = bodyText;
  block.hidden = false;
}

function getStartingPriceLabel(product) {
  const firstPriceOption = product.pricing?.[0] || product.price || "";
  const parts = firstPriceOption.split("-");
  const unit = parts.length > 1 ? parts[0].trim() : "";
  const price = formatPrice(parsePrice(firstPriceOption || product.price));

  return unit ? `Starting @ ${price} / ${unit}` : `Starting @ ${price}`;
}

function renderHomeProductMenu() {
  const target = document.querySelector("#homeProductMenu");
  if (!target) return;

  const allProducts = getAllProducts();
  const categories = {};

  Object.entries(allProducts).forEach(([slug, product]) => {
    const category = product.category || "More Items";
    categories[category] = categories[category] || [];
    categories[category].push([slug, product]);
  });

  target.innerHTML = `
    <div class="mobile-order-menu">
      ${Object.entries(categories).map(([category, entries]) => `
        <section class="order-category">
          <div class="order-category-title">
            <h3>${category}</h3>
            <span>${entries.length} items</span>
          </div>
          <div class="order-item-list">
            ${entries.map(([slug, product]) => `
              <a class="order-item" href="${getProductPageUrl(slug)}">
                <span class="order-item-thumb">
                  <img src="${product.image || `/static/assets/${slug}.jpg`}" alt="${product.title}" loading="lazy" onerror="this.parentElement.classList.add('missing-image'); this.remove()">
                </span>
                <span>
                  <strong>${product.title}</strong>
                  <small>${getStartingPriceLabel(product)}</small>
                </span>
                <em>View</em>
              </a>
            `).join("")}
          </div>
        </section>
      `).join("")}
    </div>
  `;
}

function renderAdminAddedProducts() {
  const target = document.querySelector("#adminAddedProducts");
  if (!target) return;

  const adminProducts = getAdminData().products || {};
  const customEntries = Object.entries(adminProducts).filter(([slug]) => !products[slug]);

  if (!customEntries.length) {
    target.innerHTML = "";
    return;
  }

  target.innerHTML = `
    <div class="section-title admin-added-title">
      <p class="eyebrow">Added From Admin</p>
      <h2>New Items</h2>
    </div>
    <div class="cake-menu-grid">
      ${customEntries.map(([slug, product]) => `
        <article class="cake-menu-card">
          <h3>${product.title}</h3>
          <p>${product.category}</p>
          <p>${product.price}</p>
          <a class="primary-link" href="${getProductPageUrl(slug)}">View Item</a>
        </article>
      `).join("")}
    </div>
  `;
}

function renderAdminPage() {
  const dashboard = document.querySelector("#adminDashboard");
  const login = document.querySelector("#adminLogin");
  if (!dashboard || !login) return;

  const isLoggedIn = sessionStorage.getItem("cakeTheoryAdminLoggedIn") === "true";
  login.hidden = isLoggedIn;
  dashboard.hidden = !isLoggedIn;
  if (!isLoggedIn) return;

  const adminData = getAdminData();
  const allProducts = getAllProducts();
  const productList = document.querySelector("#adminProductList");
  const orders = getCart();

  const homeTitle = document.querySelector("#adminHomeTitle");
  if (homeTitle) homeTitle.value = adminData.homeTitle || "";
  
  const homeBody = document.querySelector("#adminHomeBody");
  if (homeBody) homeBody.value = adminData.homeBody || "";

  if (productList) {
    productList.innerHTML = Object.entries(allProducts)
      .map(([slug, product]) => `
        <form class="admin-product-row" data-admin-product="${slug}">
          <div>
            <h3>${product.title}</h3>
            <p>${product.category}</p>
          </div>
          <label>
            Price
            <input name="price" value="${escapeHtml(getMinimumDisplayPrice(product))}">
          </label>
          ${renderAdminPricingField(product.pricing || [product.price || ""])}
          <label>
            Image Path
            <input name="image" value="${escapeHtml(product.image || "")}" placeholder="/static/assets/${slug}.jpg">
          </label>
          <label>
            Status
            <select name="status">
              <option value="available" ${product.status !== "sold-out" ? "selected" : ""}>Available</option>
              <option value="sold-out" ${product.status === "sold-out" ? "selected" : ""}>Sold Out</option>
            </select>
          </label>
          <button class="sold-out-button" type="submit">Save</button>
        </form>
      `)
      .join("");
  }

  document.querySelectorAll("[data-admin-product]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const slug = form.dataset.adminProduct;
      const formData = new FormData(form);
      const data = getAdminData();
      const pricing = getPricingFromField(form.querySelector(".admin-pricing-field"));
      data.products = data.products || {};
      data.products[slug] = {
        ...(data.products[slug] || {}),
        price: pricing.length ? formatPrice(parsePrice(pricing[0])) : formData.get("price"),
        pricing: pricing.length
          ? pricing
          : [formData.get("price")],
        image: formData.get("image"),
        status: formData.get("status")
      };
      saveAdminData(data);
      showToast("Product saved.");
      renderAdminPage();
    });
  });

  const orderList = document.querySelector("#adminOrders");
  if (orderList) {
    orderList.innerHTML = orders.length
      ? orders.map((item) => `
        <div class="admin-order-row">
          <div>
            <h3>${item.title}</h3>
            <p>${item.size} | ${item.option}</p>
          </div>
          <p>Qty: ${item.quantity}</p>
          <p>${item.price}</p>
          <select data-order-status="${item.id}">
            <option>Pending</option>
            <option>Accepted</option>
            <option>Rejected</option>
            <option>Paid</option>
          </select>
        </div>
      `).join("")
      : `<p>No local cart orders yet.</p>`;

    loadBackendOrders(orderList);
  }
}

async function loadBackendOrders(orderList) {
  if (!orderList) return;

  try {
    const response = await fetch(`${API_BASE_URL}/api/orders`);
    const result = await response.json();
    if (!result.ok) return;

    if (!result.orders.length) {
      orderList.innerHTML = `<p>No MySQL orders yet.</p>`;
      return;
    }

    orderList.innerHTML = result.orders.map((order) => {
      const isPaid = order.payment_status === "paid";
      const statusColor = isPaid ? "color: #10B981;" : "color: #EF4444;";
      const statusBg = isPaid ? "background: #ecfdf5;" : "background: #fef2f2;";
      
      const itemsList = order.items.map(item => 
        `<li style="margin-bottom: 6px;"><strong>${item.quantity}x</strong> ${item.product_name} <span style="color: #666; font-size: 0.85rem;">(${item.size}, ${item.option_type})</span> &mdash; Rs. ${item.unit_price}</li>`
      ).join("");

      return `
      <div class="admin-order-row" style="display: flex; flex-direction: column; gap: 15px; padding: 20px; border: 1px solid #eee; border-radius: 12px; margin-bottom: 20px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
        
        <div style="width: 100%; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 10px; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px;">
          <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: #111;">Order #${order.id} <br><span style="color: #666; font-size: 0.95rem; font-weight: 600;">${order.customer_name}</span></h3>
          <div style="font-size: 1.1rem; background: #f8f9fa; padding: 6px 12px; border-radius: 8px; font-weight: 800; border: 1px solid #e9ecef;">Rs. ${order.total_amount}</div>
        </div>

        <div style="width: 100%; display: flex; flex-wrap: wrap; gap: 20px;">
          <div style="flex: 1 1 250px;">
            <p style="margin: 6px 0; font-size: 0.95rem; color: #333;"><strong>Phone:</strong> ${order.phone}</p>
            <p style="margin: 6px 0; font-size: 0.95rem; color: #333; line-height: 1.4;"><strong>Address:</strong> ${order.address}</p>
            <p style="margin: 6px 0; font-size: 0.85rem; color: #888;"><strong>Date:</strong> ${order.created_at}</p>
          </div>
          
          <div style="flex: 1 1 250px; background: #fafafa; padding: 15px; border: 1px solid #eee; border-radius: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; align-items: center;">
              <strong style="font-size: 0.95rem; color: #444;">Payment:</strong> 
              <span style="${statusColor} ${statusBg} padding: 4px 10px; border-radius: 20px; font-weight: 800; font-size: 0.85rem;">${order.payment_status.toUpperCase()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; align-items: center;">
              <strong style="font-size: 0.95rem; color: #444;">Status:</strong> 
              <span style="font-size: 0.9rem; font-weight: 700; color: #555;">${order.status.toUpperCase()}</span>
            </div>
            ${order.notes ? `<div style="font-size: 0.85rem; color: #666; margin-top: 12px; padding-top: 12px; border-top: 1px dashed #ddd; line-height: 1.5;">${order.notes.replace('Razorpay ID:', '<strong>Razorpay ID:</strong>')}</div>` : ''}
          </div>
        </div>

        <div style="width: 100%; background: #fefefe; padding: 15px; border-radius: 10px; border: 1px solid #f0f0f0;">
          <strong style="color: #111; display: block; margin-bottom: 10px; font-size: 0.95rem;">Order Items:</strong>
          <ul style="margin: 0; padding-left: 20px; font-size: 0.95rem; color: #444; list-style-type: disc;">
            ${itemsList}
          </ul>
        </div>
      </div>
      `;
    }).join("");
  } catch (error) {
    // Keep local cart-order preview visible when the backend is not running.
  }
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    body.classList.add("menu-open");
  });
}

if (closeMenu) {
  closeMenu.addEventListener("click", () => {
    body.classList.remove("menu-open");
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (link.getAttribute("href")) {
      body.classList.remove("menu-open");
    }
  });
});

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.closest(".product-card").dataset.name;
    cartItems += 1;
    cartCounts.forEach((count) => {
      count.textContent = cartItems;
    });
    showToast(`${product} added to your cart.`);
  });
});

sliderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.direction;
    testimonialIndex =
      direction === "next"
        ? (testimonialIndex + 1) % testimonials.length
        : (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name");

    formStatus.textContent = `Thank you, ${name}. Your enquiry is ready. Connect this form to email, WhatsApp, or your backend to receive orders.`;
    contactForm.reset();
  });
}

renderTestimonial();
renderProductPage();
renderCartPage();
renderHomeText();
renderHomeProductMenu();
renderAdminAddedProducts();
renderAdminPage();
updateCartCount();


