import "./styles/style.css";

const apiKey = import.meta.env.VITE_clickNext_KEY;
const api_url = "https://api.pexels.com/v1/curated?per_page=1";

const imageElement = document.getElementById("image") as HTMLImageElement;
const prevButton = document.getElementById("back") as HTMLButtonElement;
const nextButton = document.getElementById("next") as HTMLButtonElement;

let images: string[] = [];
let currentIndex = 0;

// Function, um ein Bild von der API zu laden
async function fetchImages() {
  try {
    const randomPage = Math.floor(Math.random() * 100) + 1; // zufällige Seite zwischen 1 und 100
    const response = await fetch(`${api_url}&page=${randomPage}`, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    images = data.photos.map((photo: { src: { large: string } }) => photo.src.large);
    currentIndex = 0;
    displayImage();
  } catch (error) {
    console.error("Error loading the image:", error);
  }
}

function displayImage(): void {
  if (images.length > 0 && currentIndex >= 0 && currentIndex < images.length) {
    imageElement.src = images[currentIndex];
  }
}

// Event Listener für den "Zurück"-Button
if (prevButton) {
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      displayImage();
    }
  });
} else {
  console.error("Prev button element not found");
}

// Event Listener für den "Weiter"-Button
if (nextButton) {
  nextButton.addEventListener('click', () => {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      displayImage();
    } else {
      fetchImages(); // Neue Bilder laden, wenn das Ende erreicht ist
    }
  });
} else {
  console.error("Next button element not found");
}

// Erstes Bild beim Laden der Seite abrufen
fetchImages();
