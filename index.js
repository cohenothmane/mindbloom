//home



//main



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
