/** @format */

// Function handle load html file
const loadHtml = (elementId, path, callback) => {
  fetch(path)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .then(() => {
      if (callback) callback();
    })
    .catch((error) => console.error("Error loading " + path, error));
};

// Function handle route change /index.html -> /index.html?id=1 -> ....
const handleRouteChange = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    loadHtml("content", "Template/home.html", () => {
      onLoadDiscountItems();
      onLoadMenu();
      navigateToHash();
    });
    return;
  }

  loadHtml("content", "Template/food-info.html", () => onLoadSingleItem(id));
};

// Function handle scroll to element by hash /index.html#menu -> scroll to menu
const navigateToHash = () => {
  const hash = window.location.hash;
  if (hash) {
    const id = hash.substring(1);
    const element = document.getElementById(id);
    element && element.scrollIntoView({ behavior: "smooth" });
  }
};

// Function handle load single item when view item info
const onLoadSingleItem = (id) => {
  const menuItem = menuItems.find((item) => item.id == id);

  if (!menuItem) return;
  const imgEle = document.getElementById("food-info-img");
  const nameEle = document.getElementById("food-info-name");
  const descriptionEle = document.getElementById("food-info-description");

  imgEle.src = menuItem.image;
  nameEle.innerText = menuItem.name;
  descriptionEle.innerText = menuItem.description;
};

// Load Menu
const onLoadMenu = () => {
  const menuElement = document.getElementById("menu");

  if (!menuElement) return;
  menuItems.forEach((item) => {
    menuElement.innerHTML += `
      <a
      href="/index.html?id=${item.id}"
      class="menuitem col-12 col-sm-4 col-lg-3 d-flex flex-column align-items-center justify-content-center"
      style="text-decoration: none"
    >
      <img
        src="${item.image}"
        alt=""
        class="rounded-circle"
        style="height: 154px; width: 154px"
      />
      <buttton
        class="d-flex justify-content-center align-items-center rounded-pill mt-4"
        style="
          color: #edead6;
          background-color: #251313;
          font-size: 24px;
          height: 60px;
          width: 210px;
        "
        >${item.name}</buttton
      >
    </a> 
      `;
  });
};

// Load Discount Items
const onLoadDiscountItems = () => {
  const promotionElement = document.getElementById("promotion-items");

  if (!promotionElement) return;

  for (let i = 0; i < Math.min(3 || menuItems.length - 1); i++) {
    promotionElement.innerHTML += `
    <div class="row sales col-6 col-lg-4 d-flex flex-column">
    <div class="d-flex flex-column align-items-center">
      <div
        class="sales rounded-pill d-flex flex-column align-items-center"
        style="height: 511px; width: 317px; background-color: #edead6"
      >
        <div
          class="img d-flex justify-content-center align-items-center position-relative rounded-circle mt-3"
        >
          <img
            src="${menuItems[i].image}"
            alt=""
            class="rounded-circle"
          />
          <div
            class="position-absolute top-100 start-50 translate-middle rounded-circle d-flex justify-content-center justify-content-center align-items-center"
            style="background-color: #d35343; height: 82px; width: 82px"
          >
            <h5
              class="position-absolute top-50 start-50 translate-middle"
              style="font-weight: 800; font-size: 24px; color: #edead6"
            >
              -15%
            </h5>
          </div>
        </div>

        <h5
          class="mt-5 pt-2 mb-4"
          style="color: #251313"
        >
        ${menuItems[i].name}
        </h5>
        <p class="orgprice mb-0 fst-italic text-decoration-line-through">
        ${menuItems[i].price} VND
        </p>
        <h5
          class="mt-0 pt-0"
          style="color: #d35343; font-size: 20px; font-weight: 800"
        >
        ${(menuItems[i].price * 0.85).toLocaleString()} VND
        </h5>
      </div>
      <button class="mt-4 rounded-4">
        <i
          class="fa-solid fa-cart-shopping"
          style="transform: translateY(-2px)"
        ></i>
        Thêm
      </button>
    </div>
  </div>
    `;
  }
};

// Load Elements
loadHtml("navbar", "Template/navbar.html");
handleRouteChange();
loadHtml("footer", "Template/footer.html");

// Listen to route change
window.addEventListener("popstate", (event) => handleRouteChange());

// Foods
const menuItems = [
  {
    id: 1,
    name: "Cơm tấm",
    description:
      "Cơm tấm Sài Gòn với sườn nướng thơm ngon và nước mắm chua ngọt.",
    price: 50000,
    image: "../images/comtam.jpeg",
  },
  {
    id: 2,
    name: "Phở",
    description:
      "Phở bò truyền thống với nước dùng đậm đà, thịt bò mềm và bánh phở dai ngon.",
    price: 60000,
    image: "../images/pho.jpg",
  },
  {
    id: 3,
    name: "Bún đậu",
    description:
      "Bún đậu mắm tôm với đậu hũ giòn rụm, thịt luộc và mắm tôm đậm đà.",
    price: 45000,
    image: "../images/bundau.jpeg",
  },
  {
    id: 4,
    name: "Sủi cảo",
    description:
      "Sủi cảo nhân tôm thịt thơm ngon, hấp hoặc chiên giòn tùy sở thích.",
    price: 55000,
    image: "../images/suicao.jpg",
  },
  {
    id: 5,
    name: "Gỏi cuốn",
    description:
      "Gỏi cuốn tươi mát với tôm, thịt, rau thơm và nước chấm chua ngọt.",
    price: 40000,
    image: "../images/goicuon.jpg",
  },
  {
    id: 6,
    name: "Bánh căn",
    description:
      "Bánh căn giòn rụm với nhân tôm, mực hoặc trứng, ăn kèm nước mắm chấm đặc biệt.",
    price: 45000,
    image: "../images/banhcan.jpeg",
  },
  {
    id: 7,
    name: "Bún chả",
    description:
      "Bún chả Hà Nội với thịt nướng thơm lừng, ăn kèm nước chấm đặc trưng.",
    price: 55000,
    image: "../images/buncha.jpg",
  },
];
