const moodSelect = document.getElementById("moodSelect");
const showMessage = document.getElementById("showMessage");
const message = document.getElementById("message");

const moodMessages = {
  joyeux: [
    "Garde ce sourire, il éclaire plus que tu ne le crois 🌞",
    "Savoure ce moment, c’est la vie qui te fait un clin d’œil ✨",
    "Tu rayonnes aujourd’hui, continue comme ça 🌼",
    "Ton énergie positive est contagieuse 💛"
  ],
  fatigue: [
    "Ferme les yeux un instant, le monde peut attendre 🌙",
    "Même les étoiles se reposent parfois 🌌",
    "Un peu de repos, et tu reviendras encore plus fort 💤",
    "Écoute ton corps, il te dit de ralentir 🍵"
  ],
  colere: [
    "Respire profondément... la paix revient 🍃",
    "Laisse partir ce qui te pèse, et garde la légèreté 🌸",
    "Ne laisse pas la colère voler ta sérénité 🌿",
    "Ferme les yeux, inspire, et tout ira mieux 🪷"
  ],
  enerve: [
    "Un peu de calme et tout ira mieux 🌸",
    "Tu es plus fort(e) que ton énervement 💫",
    "Laisse couler comme l’eau d’une rivière 🍃",
    "Respire… et souris à nouveau 🌤️"
  ],
  calme: [
    "Reste dans cette belle énergie paisible 🕊️",
    "Tu es exactement là où tu dois être 🍀",
    "Le calme est ta super-puissance 🪷",
    "Continue de briller en douceur ☁️"
  ],
  triste: [
    "Laisse-toi aller, demain sera plus doux 🌦️",
    "Chaque larme prépare un sourire à venir 🌷",
    "Même la pluie nourrit les fleurs 🌧️",
    "Tu es plus fort(e) que ce que tu ressens en ce moment 💗"
  ]
};

showMessage.addEventListener("click", () => {
  const selectedMood = moodSelect.value;

  if (selectedMood && moodMessages[selectedMood]) {
    const phrases = moodMessages[selectedMood];
    const randomIndex = Math.floor(Math.random() * phrases.length);
    message.textContent = phrases[randomIndex];
  } else {
    message.textContent = "Choisis d'abord ton mood 🌿";
  }
});