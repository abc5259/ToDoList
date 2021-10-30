const images = ["1.png", "2.png"];
const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgimage = document.createElement("img");
bgimage.src = `./img/${chosenImage}`;
document.body.appendChild(bgimage);
