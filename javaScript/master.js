// This JavaScript code provides functionality for a dynamic web page with features like toggling settings, changing theme colors, randomizing background images, displaying skills progress on scroll, and creating a gallery with popup images.

// Toggle the spinning effect and open/close the settings box when the settings icon is clicked.
document.querySelector(".toggle-settings i").onclick = function () {
    this.classList.toggle('fa-spin'); // Toggle the spin class to start/stop spinning the icon.
    document.querySelector(".settings-Box").classList.toggle("open"); // Toggle the open class to show/hide the settings box.
};

// Change the main color of the page based on the selected color from a list.
const colorList = document.querySelectorAll(".colors-list li");
colorList.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main--color', e.target.dataset.color); // Set the main color to the selected color.
    });
});

// Variables for managing the random background feature.
let backgroundOption = true;
let backgroundInterval;

let landingPage = document.querySelector(".landing-page");
let arrayImages = ["images/01.jpg", "images/02.jpg", "images/03.jpg", "images/04.jpg", "images/05.jpg"];

// Function to randomize background images at intervals.
function randomizeImgs() {
    if (backgroundOption) {
        backgroundInterval = setInterval(() => {
            let randomNum = Math.floor(Math.random() * arrayImages.length);
            landingPage.style.backgroundImage = `url('${arrayImages[randomNum]}')`;
        }, 3000);
    }
}

// Toggle the random background feature on or off based on user selection.
const randomBgEl = document.querySelectorAll(".randomBG span");
randomBgEl.forEach(span => {
    span.addEventListener("click", (e) => {
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            clearInterval(backgroundInterval);
            randomizeImgs();
            document.querySelectorAll('.split-imgs img').forEach(img => {
                img.style.display = 'none';
            });
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            document.querySelectorAll('.split-imgs img').forEach(img => {
                img.style.display = 'block';
            });
        }
    });
});

// Set a static image as the background when clicked.
document.querySelectorAll('.split-imgs img').forEach(img => {
    img.addEventListener('click', function(e) {
        const imgUrl = e.target.src;
        landingPage.style.backgroundImage = `url('${imgUrl}')`;
    });
});

// Automatically start the background image randomization.
randomizeImgs();

// Display skill progress when the skills section is scrolled into view.
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.scrollY;
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

// Create a popup image when any image in the gallery is clicked.
let OurGallery = document.querySelectorAll(".gallery img");
OurGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        let overlay = document.createElement("div");
        overlay.className = 'popUp-overlay';
        document.body.appendChild(overlay);
        let popUpBox = document.createElement("div");
        popUpBox.className = "popup-Box";
        let Popimg = document.createElement("img");
        Popimg.src = img.src;
        popUpBox.appendChild(Popimg);
        document.body.appendChild(popUpBox);
        overlay.addEventListener("click", function() {
            overlay.remove();
            popUpBox.remove();
        });
        let CloseButton = document.createElement("button");
        let CloseButtonText = document.createTextNode("X");
        CloseButton.appendChild(CloseButtonText);
        CloseButton.className = "close-button";
        popUpBox.appendChild(CloseButton);
    });
});

// Close the popup when the close button is clicked.
document.addEventListener("click", function(e) {
    if (e.target.className === "close-button") {
        e.target.parentNode.remove();
        let overlay = document.querySelector(".popUp-overlay");
        if (overlay) overlay.remove();
    }
});
//nav bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".ulist a");
function scrollTo(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}
scrollTo(allBullets);
scrollTo(allLinks)



// Toggle Menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".ulist");

toggleBtn.onclick = function (e) {

  // Stop Propagation
  e.stopPropagation();

  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");

  // Toggle Class "open" On Links
  tLinks.classList.toggle("open");

};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {

  if (e.target !== toggleBtn && e.target !== tLinks) {

    // Check If Menu Is Open
    if (tLinks.classList.contains("open")) {

      // Toggle Class "menu-active" On Button
      toggleBtn.classList.toggle("menu-active");

      // Toggle Class "open" On Links
      tLinks.classList.toggle("open");

    }

  }

});

// Stop Propagation On Menu 
tLinks.onclick = function (e) {
  e.stopPropagation();
}
