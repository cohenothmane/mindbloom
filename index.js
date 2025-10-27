//home



//main
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


//mood_tracker
const scheduleGrid = document.getElementById('scheduleGrid');
const START_HOUR = 7;
const END_HOUR = 22;
const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

// Génération du tableau d’emploi du temps
for (let hour = START_HOUR; hour < END_HOUR; hour++) {
  const row = document.createElement('div');
  row.className = 'row';

  const timeLabel = document.createElement('div');
  timeLabel.className = 'time-label';
  timeLabel.textContent = `${hour.toString().padStart(2, '0')}:00`;
  row.appendChild(timeLabel);

  days.forEach(day => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.day = day;
    cell.dataset.hour = hour;
    row.appendChild(cell);
  });

  scheduleGrid.appendChild(row);
}

const form = document.getElementById('entryForm');
const chatWindow = document.getElementById('chatWindow');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const mood = document.getElementById('moodSelect').value;
  const time = document.getElementById('timeInput').value;
  const day = document.getElementById('daySelect').value;

  if (!time) return alert('Choisis une heure.');

  const hour = parseInt(time.split(':')[0], 10);
  if (hour < START_HOUR || hour >= END_HOUR) return alert('Heure hors plage.');

  const moodEmojis = {
    joy: '😀',
    happy: '🙂',
    neutral: '😐',
    sad: '😞',
    angry: '😡'
  };

  const cell = document.querySelector(`.cell[data-day=\"${day}\"][data-hour=\"${hour}\"]`);
  if (cell) {
    const badge = document.createElement('div');
    badge.className = `mood-badge ${mood}`;
    badge.textContent = `${moodEmojis[mood]} ${time}`;
    cell.appendChild(badge);

    const msg = document.createElement('div');
    msg.className = 'message user';
    msg.textContent = `[${day} ${time}] ${moodEmojis[mood]}`;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
});


//bloomGPT



//task_tracker
