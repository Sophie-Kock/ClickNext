import "./styles/style.css";

const apiKey = import.meta.env.VITE_clickNext_KEY;
const api_url = "https://api.pexels.com/v1/curated?per_page=1";

const imageElement = document.getElementById("image") as HTMLImageElement;
const nextButton = document.getElementById("next") as HTMLButtonElement;

// Function, um ein picture von der API zu laden
async function fetchImage() {
  try {
    const randomPage = Math.floor(Math.random() * 100) + 1; // random page between 1 and 100
    const response = await fetch(`${api_url}&page=${randomPage}`, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.photos[0].src.large; // take pic-url

    // Set the image in the <img> element
    imageElement.src = imageUrl;
  } catch (error) {
    console.error("Error loading the image:", error);
  }
}

// Event Listener für den Button
if (nextButton) {
  nextButton.addEventListener("click", fetchImage);
} else {
  console.error("Button element not found");
}

// Fetch the first image when the page loads
fetchImage();
