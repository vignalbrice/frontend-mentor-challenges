import "./assets/styles/style.scss";
import imgDesktop from "./assets/images/image-product-desktop.jpg";
import imgMobile from "./assets/images/image-product-mobile.jpg";

// create app
const app = document.querySelector<HTMLDivElement>("#app")!;

const createCard = () => {
  // create card
  const card = document.createElement("div");
  card.classList.add("card");

  card.append(createCardImage());

  card.append(createCardContent());

  app.insertAdjacentElement("afterbegin", card);
};

const createCardImage = (): HTMLImageElement => {
  const cardImg = document.createElement("img");
  cardImg.classList.add("card-img");
  cardImg.setAttribute("src", imgDesktop);

  return cardImg;
};

const createCardContent = (): HTMLDivElement => {
  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  /*
  const elementsToString = ["h6", "h1", "p", "h2", "button", "small", "img"];
  elementsToString.forEach((el) => {
    document.createElement(el);
  }) */
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  const h6 = document.createElement("h6");
  const p = document.createElement("p");
  const small = document.createElement("small");
  const cardPrice = document.createElement("div");
  const button = document.createElement("button");
  const image = document.createElement("img");
  cardPrice.classList.add("card-price");
  h2.textContent = "$149.99";
  small.textContent = "$169.99";
  cardPrice.append(h2);
  cardPrice.append(small);
  button.setAttribute("type", "button");
  image.setAttribute("src", "./src/assets/images/icon-cart.svg");
  button.appendChild(image);
  button.insertAdjacentText("beforeend", "Add to Cart");
  h1.textContent = "Gabrielle Essence Eau De Parfum";
  h6.textContent = "Perfume";
  p.textContent =
    "A floral, solar and voluptuous interpretation composed by Olivier Polge, Perfumer-Creator for the House of CHANEL";
  const elements = [h6, h1, p, cardPrice, button];
  elements.forEach((el) => {
    cardContent.append(el);
  });

  return cardContent;
};

createCard();
window.addEventListener("resize", (ev: UIEvent) => {
  console.log(ev);
  const isMobile = window.matchMedia(
    "(min-width: 320px) and (max-width: 426px)"
  );
  document
    .querySelector<HTMLImageElement>(".card-img")
    ?.setAttribute("src", isMobile.matches ? imgMobile : imgDesktop);
});
