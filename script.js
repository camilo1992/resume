const menuBar = document.querySelector(`.menu`);
const header = document.querySelector(`header`);

// sections
const secondSec = document.querySelector(`#second-section`);
const topSec = document.querySelector(`#top-section-container`);
const sec3 = document.querySelector(`.section3`);
const sec1 = document.querySelector(`.section1`);
const callTo = document.querySelector(`call-to-action`);
const signup = document.querySelector(`signup`);
const image1 = document.querySelector(`#pro1`);
const logo = document.querySelector(`.logo`);
const img7 = document.getElementById(`pro7`);

//  Creatting  array images project
const createImages = function () {
  let imagesAll = [];
  for (let i = 1; i < 8; i++) {
    imagesAll.push(document.getElementById(`pro` + `${i}`));
  }
  return imagesAll;
};

const imagesAll = createImages();

// Creatting images social
const imagesSocial = [];
for (let i = 8; i < 11; i++) {
  imagesSocial.push(
    document.getElementById(`image${i}`).parentElement.parentElement
  );
}

//  Scroll into sections smoothly ..................................

menuBar.addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.target.classList.contains(`menu-op`)) return;
  const sect = e.target.getAttribute("href");
  document.querySelector(`${sect}`).scrollIntoView({ behavior: "smooth" });
});

// Display contact div after click
const box = document.getElementById(`top-contact`);
const displayContact = () => {
  box.style.display = "grid";
  logo.style.display = "none";
};

const contactEl = document.querySelector(`.get-started-btn`);
contactEl.addEventListener("click", displayContact);

const revealContact = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  displayContact();
  observer.unobserve(entry.target);
};

const revOp3 = {
  root: null,
  threshold: 0.2,
};

const secObservert2 = new IntersectionObserver(revealContact, revOp3);
secObservert2.observe(img7);

//  Implementing sticky nav .................................
const navHeight = header.getBoundingClientRect().height;

const callbackObs = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting === true) header.classList.add(`sticky`);
  else {
    header.classList.remove(`sticky`);
  }
};

const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(callbackObs, options);
observer.observe(topSec);

//  Reacting to image events-------------------------------------------------

const openeTab = function (url) {
  console.log("clicked");
  window.open(url);
};

const urls = [
  "https://61d8794d803b610008dea258--inspiring-mirzakhani-0903bb.netlify.app/",
  "https://610050dcdab9e200083f6121--youthful-euler-f0d9b4.netlify.app/#5ed6604591c37cdc054bcd1f",
  "https://620fb70aa496573962b17b3e--upbeat-bassi-5c439a.netlify.app",
  "https://6111789277acf000085b0018--practical-mccarthy-be2f71.netlify.app/",
  "https://610d7b7d1ff82000081321b4--elastic-lichterman-761ac3.netlify.app/",
  "https://612043795607e800077437e2--awesome-kepler-192b24.netlify.app/",
  "https://621166cb16fb8c7092ac3327--wonderful-brown-dea1b2.netlify.app/",
];

imagesAll.forEach((ele, i) => {
  ele.addEventListener("click", function () {
    window.open(urls[i]);
  });
});

//  reveal sections-------------------------------------------------
const allSections = document.querySelectorAll(`.section`);

const revealCall = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const revOp = {
  root: null,
  threshold: 0.2,
};

const secObserver = new IntersectionObserver(revealCall, revOp);
allSections.forEach((section) => {
  section.classList.add(`section--hidden`);
  secObserver.observe(section);
});

// ------------------- sider ---------------------------------
const slider = function () {
  const slides = document.querySelectorAll(`.slide`);
  const slider = document.querySelector(`.slider`);
  const btnLeft = document.querySelector(`.slider__btn--left`);
  const btnRight = document.querySelector(`.slider__btn--right`);
  const dotContainer = document.querySelector(".dots");
  const maxSlides = slides.length - 1;
  let curSlide = 0;

  //  set up of dots .....
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Dot shadowing

  const actDotSh = function (slide) {
    const dots = document.querySelectorAll(`.dots__dot`);
    dots.forEach((dot) => {
      dot.classList.remove(`dots__dot--active`);
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add(`dots__dot--active`);
  };

  //  code functionality to change slides
  const changeSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  // code movement to left
  const moveLeft = function () {
    curSlide === 0 ? (curSlide = maxSlides) : curSlide--;
    changeSlide(curSlide);
    actDotSh(curSlide);
  };
  btnLeft.addEventListener(`click`, moveLeft);

  // code movement to right
  const moveRight = function () {
    curSlide === maxSlides ? (curSlide = 0) : curSlide++;
    changeSlide(curSlide);
    actDotSh(curSlide);
  };
  btnRight.addEventListener(`click`, moveRight);

  //  key movment of slides
  document.addEventListener(`keydown`, function (e) {
    e.key === `ArrowRight` && moveRight();
    e.key === `ArrowLeft` && moveLeft();
  });

  dotContainer.addEventListener(`click`, function (e) {
    if (!e.target.classList.contains(`dots__dot`)) return;
    const slide = e.target.dataset.slide;
    changeSlide(slide);
    actDotSh(slide);
  });

  // social media links ................................................

  const surl = [
    "https://github.com/camilo1992",
    "https://www.instagram.com/camilo_1108_/",
    "https://www.linkedin.com/in/cristian-g-12808039/",
  ];

  imagesSocial.forEach((ele, i) => {
    ele.addEventListener("click", function () {
      window.open(surl[i]);
    });
  });

  const init = function () {
    createDots();
    actDotSh(0);
    changeSlide(0);
  };
  init();
};
console.log("TEsting continuos deployment");

slider();
