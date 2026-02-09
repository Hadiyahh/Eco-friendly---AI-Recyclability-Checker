let model = null;

// Grab necessary HTML elements
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const analyzeBtn = document.getElementById("analyzeBtn");
const resultDiv = document.getElementById("result");

let selectedFile = null;


// TASK 1 — Load the AI model (MobileNet)
// ===================================================
async function loadModel() {
model = await mobilenet.load();

}
loadModel();

// Image Preview — runs automatically when user uploads a file
// ===================================================
imageInput.onchange = () => {
    const file = imageInput.files(0); // This array stores the images, even though we have one itll choose the first one
    selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
        preview.src = reader.result;
        preview.style.display = "block"; // Displayed as a picture not text
    };
    reader.readAsDataURL(file);

    analyzeBtn.disabled = false; // Disabling the disable function
};



// TASK 2 — Run the AI model on the image
// ===================================================
analyzeBtn.onclick = async () => {
    const prediction = await model.classify(preview);
    // TODO: Show result
    showResults(prediction)
};



// TASK 3 — Add recycling keywords
// ===================================================
const recyclableWords = [
    "water bottle",
    "bottle",
    "paper",
    // The longer the list the more accurate it'll be
];

const nonRecyclableWords = [
    "banana peel",
    "banana",
    "meat",
    "food",
];

// Have the words in lowercase so its easy for us to match later

// TASK 4 — Write the recycling decision function
// ===================================================
function getAdvice(Label) {
Label = Label.toLowerCase();
if (recyclableWords.some( w => Label.includes(w)))
    return "Recyclable"
if (nonRecyclableWordsrecyclableWords.some( w => Label.includes(w)))
    return "NOT Recyclable"
return "Take a better photo";
}



// TASK 5 — Display the final result on the page
// ===================================================
    function showResult(p) {
    const t = p[0];
    resultDiv.innerHTML = `
      <div>
        <p>${t.className}</p>
        <p>${(t.probability * 100).toFixed(2)}%</p>
        <p>${getAdvice(t)}</p>
      </div>
    `;
}

function showResults(prediction) {
    showResult(prediction);
}
