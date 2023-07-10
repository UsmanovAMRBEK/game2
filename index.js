
// create random array from main.js/data array
function selectRandomElements(arr, numElements) {
  const shuffled = arr.sort(() => 0.5 - Math.random()); // Shuffle the array
  return shuffled.slice(0, numElements); // Return the selected elements
}

// create random image function
function randomImages(data) {
  const images = [];
  for(let i = 0; i < data.length; i++){
    images.push(data[i]["textAnswerImage"]);
  }
  return selectRandomElements(images, images.length);
}


const randomElements = selectRandomElements(data, 10);
const randomImagesContent = randomImages(randomElements);
// console.log(randomElements);

let correct = 0;
let total = 0;

// create main text content
function createMain() {
  const main = document.getElementById("text-content");
  
  let inHtml = "";
  for (let i = 0; i < randomElements.length; i++) {
    inHtml += `
    <section id="number">${i+1}.</section>
      <section id="text" style="color: ${randomElements[i]['textColor']}">${randomElements[i]['text']}</section>
      <section id="answer-image" ondrop="drop(event)" ondragover="allowDrop(event)"></section>
    `
  }
  main.innerHTML = inHtml;
}


// create images content
function createImagesContent() {
  const imagesCont = document.getElementById("images-content");

  let contHtml = "";
  for (let i = 0; i < randomImagesContent.length; i++) {
    contHtml += `
      <img src="${randomImagesContent[i]}" alt="image${i + 1}" draggable="true" ondragstart="drag(event)">
    `;
  }

  imagesCont.innerHTML = contHtml;
}

// allow drop event
function allowDrop(event) {
  event.preventDefault();
}

// drag event
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

// drop event
// function drop(event) {
//   event.preventDefault();
//   const data = event.dataTransfer.getData("text");
//   const draggedImage = document.getElementById(data);
//   const answerImage = event.target.closest("#answer-image");

//   if (answerImage) {
//     answerImage.innerHTML = draggedImage.outerHTML;
//     draggedImage.parentNode.removeChild(draggedImage);
//   }
// }


// drop event
function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggedImage = document.getElementById(data);
  const answerImage = event.target.closest("#answer-image");

  if (answerImage) {
    const answerText = answerImage.previousElementSibling.textContent.trim().toLowerCase();
    const droppedImage = draggedImage.getAttribute("alt").toLowerCase();

    if (answerText === droppedImage) {
      answerImage.innerHTML = draggedImage.outerHTML;
      draggedImage.parentNode.removeChild(draggedImage);
      updateScore(true);
    } else {
      // Handle incorrect answer
      console.log("Incorrect answer");
    }
  }
}

// update score function
function updateScore(isCorrect) {
  total++;
  if (isCorrect) {
    correct++;
  }

  const correctScore = document.getElementById("correct");
  const totalScore = document.getElementById("total");
  correctScore.textContent = correct;
  totalScore.textContent = total;
}

createMain();
createImagesContent();