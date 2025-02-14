import "./styles/style.css";

const apiKey = import.meta.env.VITE_clickNext_KEY;
const api_url = "https://api.pexels.com/v1/curated?per_page=1";

const imageElement = document.getElementById("image") as HTMLImageElement;
const nextButton = document.getElementById("next") as HTMLButtonElement;

// Funktion, um ein Bild von der API zu laden
async function fetchImage() {
  try {
    const randomPage = Math.floor(Math.random() * 100) + 1; // Zufällige Seite zwischen 1 und 100
    const response = await fetch(`${api_url}&page=${randomPage}`, {
      headers: {
        Authorization: apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`Fehler: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.photos[0].src.large; // Holt die Bild-URL

    // Setzt das Bild in das <img>-Element
    imageElement.src = imageUrl;
  } catch (error) {
    console.error("Fehler beim Laden des Bildes:", error);
  }
}

// Event Listener für den Button
if (nextButton) {
  nextButton.addEventListener("click", fetchImage);
} else {
  console.error("Button element not found");
}

// Erstes Bild beim Laden der Seite abrufen
fetchImage();

