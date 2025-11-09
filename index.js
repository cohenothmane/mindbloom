// =========================
// Particules Header
// =========================
const headerCanvas = document.getElementById("particles");
const headerCtx = headerCanvas.getContext("2d");

let headerParticles = [];

function resizeHeaderCanvas() {
  headerCanvas.width = window.innerWidth;
  headerCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeHeaderCanvas);
resizeHeaderCanvas();

for (let i = 0; i < 70; i++) {
  headerParticles.push({
    x: Math.random() * headerCanvas.width,
    y: Math.random() * headerCanvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
  });
}

function drawHeaderParticles() {
  headerCtx.clearRect(0, 0, headerCanvas.width, headerCanvas.height);
  headerCtx.fillStyle = "rgba(230,122,163,0.5)";
  headerParticles.forEach(p => {
    headerCtx.beginPath();
    headerCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    headerCtx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > headerCanvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > headerCanvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawHeaderParticles);
}
drawHeaderParticles();

// =========================
// Bloom Particles
// =========================
const bloomCanvas = document.getElementById("bloomCanvas");
const bloomCtx = bloomCanvas.getContext("2d");

function resizeBloomCanvas() {
  bloomCanvas.width = window.innerWidth;
  bloomCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeBloomCanvas);
resizeBloomCanvas();

class Petal {
  constructor() {
    this.x = Math.random() * bloomCanvas.width;
    this.y = Math.random() * bloomCanvas.height;
    this.size = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.8 + 0.2;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 0.5 + 0.1;
    this.color = `rgba(255, ${150 + Math.random() * 50}, ${200 + Math.random() * 50}, ${this.opacity})`;
  }
  draw() {
    bloomCtx.save();
    bloomCtx.translate(this.x, this.y);
    bloomCtx.rotate(this.angle);
    bloomCtx.beginPath();
    bloomCtx.ellipse(0, 0, this.size * 2, this.size, 0, 0, Math.PI * 2);
    bloomCtx.fillStyle = this.color;
    bloomCtx.fill();
    bloomCtx.restore();
  }
  update() {
    this.angle += 0.002;
    this.y -= this.speed * 0.5;
    if (this.y < -10) {
      this.y = bloomCanvas.height + 10;
      this.x = Math.random() * bloomCanvas.width;
    }
    this.draw();
  }
}

let petals = [];
for (let i = 0; i < 60; i++) petals.push(new Petal());

function animateBloom() {
  bloomCtx.clearRect(0, 0, bloomCanvas.width, bloomCanvas.height);
  petals.forEach(p => p.update());
  requestAnimationFrame(animateBloom);
}
animateBloom();

// ========== Mood picker ==========


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

showMessage?.addEventListener("click", () => {
  const selectedMood = moodSelect?.value;
  if (selectedMood && moodMessages[selectedMood]) {
    const phrases = moodMessages[selectedMood];
    const randomIndex = Math.floor(Math.random() * phrases.length);
    message.textContent = phrases[randomIndex];
    message.classList.add("show");
  } else {
    message.textContent = "Choisis d'abord ton mood 🌿";
    message.classList.add("show");
  }
});

// ========== Mood scheduler with localStorage ==========
const scheduleGrid = document.getElementById('scheduleGrid');
const START_HOUR = 7;
const END_HOUR = 22;
const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

const LS_KEY_MOODS = "mood.entries.v1";
let moodEntries = loadMoods();

// Build grid
if (scheduleGrid) {
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
      cell.dataset.hour = String(hour);
      row.appendChild(cell);
    });

    scheduleGrid.appendChild(row);
  }
}

const form = document.getElementById('entryForm');
const chatWindow = document.getElementById('chatWindow');

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  const mood = document.getElementById('moodSelectt').value;
  const time = document.getElementById('timeInput').value;
  const day = document.getElementById('daySelect').value;
  const causeBefore = document.getElementById('causeBefore').value.trim();
  const causeAfter = document.getElementById('causeAfter').value.trim();

  if (!time) {
    alert('Choisis une heure.');
    return;
  }

  const [hourStr, minuteStr] = time.split(':');
  const hour = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr || '0', 10);

  if (Number.isNaN(hour) || hour < START_HOUR || hour >= END_HOUR) {
    alert('Heure hors plage.');
    return;
  }

  const entry = { mood, time, day, causeBefore, causeAfter };
  addMoodEntry(entry);
  moodEntries.push(entry);
  saveMoods();
  form.reset();
});

// Helpers
function addMoodEntry(entry) {
  const { mood, time, day, causeBefore, causeAfter } = entry;
  const [hourStr, minuteStr] = time.split(':');
  const hour = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr || '0', 10);

  const moodEmojis = {
    joy: '😀',
    happy: '🙂',
    neutral: '😐',
    sad: '😞',
    angry: '😡'
  };

  const cell = document.querySelector(`.cell[data-day="${day}"][data-hour="${hour}"]`);
  if (!cell) return;

  const badge = document.createElement('div');
  badge.className = `mood-badge ${mood}`;
  badge.dataset.time = time;
  badge.dataset.mood = mood;

  const topPercent = (minutes / 60) * 100;
  badge.style.top = `${Math.max(10, Math.min(90, topPercent))}%`;

  badge.innerHTML = `
    ${moodEmojis[mood] || ''} ${time}
    <button class="badge-del" title="Supprimer" aria-label="Supprimer ce mood">×</button><br>
    <small>Avant : ${causeBefore || '—'}</small><br>
    <small>Après : ${causeAfter || '—'}</small>
  `;
  cell.appendChild(badge);

  // Add to chat
  const msg = document.createElement('div');
  msg.className = 'message user';
  msg.innerHTML = `
    [${day} ${time}] ${moodEmojis[mood] || ''}<br>
    <small>Avant : ${causeBefore || '—'}</small><br>
    <small>Après : ${causeAfter || '—'}</small>
  `;
  chatWindow?.appendChild(msg);
  if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Delete badge
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.badge-del');
  if (!btn) return;
  const badge = btn.closest('.mood-badge');
  if (!badge) return;

  const { mood, time } = badge.dataset;
  const day = badge.closest('.cell')?.dataset.day;
  badge.remove();

  moodEntries = moodEntries.filter(
    (entry) => !(entry.mood === mood && entry.time === time && entry.day === day)
  );
  saveMoods();
});

// Persistence
function saveMoods() {
  localStorage.setItem(LS_KEY_MOODS, JSON.stringify(moodEntries));
}
function loadMoods() {
  try {
    const raw = localStorage.getItem(LS_KEY_MOODS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Render saved entries
moodEntries.forEach(addMoodEntry);

// ========== To-Do list with localStorage ==========
(function () {
  const el = {
    form: document.getElementById("todo-form"),
    input: document.getElementById("todo-input"),
    list: document.getElementById("todo-list"),
    filter: document.getElementById("todo-filter"),
    count: document.getElementById("todo-count"),
    clearDone: document.getElementById("todo-clear-done"),
    tmpl: document.getElementById("todo-item-template")
  };

  const LS_KEY = "todo.tasks.v1";
  let tasks = load();
  let currentFilter = el.filter ? el.filter.value : "all";

  render();

  el.form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = (el.input?.value || "").trim();
    if (!text) return;
    tasks.unshift({
      id: String(Date.now()),
      text,
      done: false,
      createdAt: Date.now()
    });
    el.input.value = "";
    persist();
    render();
  });

  el.filter?.addEventListener("change", () => {
    currentFilter = el.filter.value;
    render();
  });

  el.clearDone?.addEventListener("click", () => {
    tasks = tasks.filter((t) => !t.done);
    persist();
    render();
  });
    
  el.list?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".todo-item__delete")) {
      const li = target.closest(".todo-item");
      if (!li) return;
      const id = li.dataset.id;
      tasks = tasks.filter((t) => t.id !== id);
      persist();
      render();
      return;
    }
    if (target.closest(".todo-item__edit")) {
      const li = target.closest(".todo-item");
      if (!li) return;
      const id = li.dataset.id;
      const t = tasks.find((x) => x.id === id);
      if (!t) return;

      // Inline editing instead of prompt()
      const textSpan = li.querySelector(".todo-item__text");
      const input = document.createElement("input");
      input.type = "text";
      input.value = t.text;
      input.className = "todo-edit-input";
      textSpan.replaceWith(input);
      input.focus();

      input.addEventListener("blur", () => {
        const newText = input.value.trim();
        if (newText) {
          t.text = newText;
          persist();
        }
        render();
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") input.blur();
      });
    }
  });

  el.list?.addEventListener("change", (e) => {
    const target = e.target;
    if (target.classList.contains("todo-item__check")) {
      const li = target.closest(".todo-item");
      if (!li) return;
      const id = li.dataset.id;
      const t = tasks.find((x) => x.id === id);
      if (!t) return;
      t.done = target.checked;
      persist();
      updateItemVisual(li, t);
      updateCount();
    }
  });

  function load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function persist() {
    localStorage.setItem(LS_KEY, JSON.stringify(tasks));
  }

  function render() {
    if (!el.list) return;
    el.list.innerHTML = "";

    const filtered = tasks.filter((t) => {
      if (currentFilter === "active") return !t.done;
      if (currentFilter === "done") return t.done;
      return true;
    });

    for (const t of filtered) {
      const li = buildItem(t);
      el.list.appendChild(li);
    }

    updateCount();
  }

  function buildItem(task) {
    let li;
    if (el.tmpl && "content" in el.tmpl) {
      li = el.tmpl.content.firstElementChild.cloneNode(true);
    } else {
      li = document.createElement("li");
      li.className = "todo-item";
      li.innerHTML = `
        <label class="todo-item__label">
          <input type="checkbox" class="todo-item__check" />
          <span class="todo-item__text"></span>
        </label>
        <button type="button" class="todo-item__edit" aria-label="Modifier la tâche">✎</button>
        <button type="button" class="todo-item__delete" aria-label="Supprimer la tâche">🗑</button>
      `;
    }

    li.dataset.id = task.id;

    const checkbox = li.querySelector(".todo-item__check");
    const textSpan = li.querySelector(".todo-item__text");

    if (checkbox instanceof HTMLInputElement) checkbox.checked = task.done;
    if (textSpan) textSpan.textContent = task.text;

    updateItemVisual(li, task);
    return li;
  }

  function updateItemVisual(li, task) {
    const textSpan = li.querySelector(".todo-item__text");
    if (!textSpan) return;
    if (task.done) {
      textSpan.classList.add("done");
    } else {
      textSpan.classList.remove("done");
    }
  }

  function updateCount() {
    if (!el.count) return;
    const remaining = tasks.filter((t) => !t.done).length;
    el.count.textContent = `${remaining} tâche${remaining > 1 ? "s" : ""}`;
  }
})();

// Clear all moods button
const clearMoodsBtn = document.getElementById('clear-moods');
clearMoodsBtn?.addEventListener('click', () => {
  if (!confirm("Voulez-vous vraiment effacer tous les moods ?")) return;

  // Remove all badges
  document.querySelectorAll('.mood-badge').forEach(b => b.remove());

  // Clear chat window (keep system message)
  if (chatWindow) {
    chatWindow.innerHTML = '<div class="message system">Bienvenue — entrez votre mood et l\'heure pour l’ajouter à l’emploi du temps.</div>';
  }

  // Clear localStorage
  localStorage.removeItem("mood.entries.v1");
  moodEntries = [];
});