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
// === Configuration de base ===
const scheduleGrid = document.getElementById('scheduleGrid');
const START_HOUR = 7;
const END_HOUR = 22;
const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

// === Génération dynamique de l’emploi du temps ===
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

// === Sélection des éléments ===
const form = document.getElementById('entryForm');
const chatWindow = document.getElementById('chatWindow');

// === Soumission du formulaire ===
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const mood = document.getElementById('moodSelec').value;
  const time = document.getElementById('timeInput').value;
  const day = document.getElementById('daySelect').value;
  const causeBefore = document.getElementById('causeBefore').value.trim();
  const causeAfter = document.getElementById('causeAfter').value.trim();

  if (!time) return alert('Choisis une heure.');

  // On récupère l'heure ET les minutes
const [hourStr, minuteStr] = time.split(':');
const hour = parseInt(hourStr, 10);

if (hour < START_HOUR || hour >= END_HOUR) return alert('Heure hors plage.');

// Calcul d'une clé unique pour le créneau horaire (ex : "7:30")

const moodEmojis = {
    joy: '😀',
  happy: '🙂',
  neutral: '😐',
  sad: '😞',
  angry: '😡'
  };

  // === Ajout du mood dans le calendrier ===
  const cell = document.querySelector(`.cell[data-day="${day}"][data-hour="${hour}"]`);
  if (cell) {
    const badge = document.createElement('div');
    badge.className = `mood-badge ${mood}`;
    badge.innerHTML = `
      ${moodEmojis[mood]} ${time}<br>
      <small>Avant : ${causeBefore || '—'}</small><br>
      <small>Après : ${causeAfter || '—'}</small>
    `;
    cell.appendChild(badge);

    // === Ajout dans le chat ===
    const msg = document.createElement('div');
    msg.className = 'message user';
    msg.innerHTML = `
      [${day} ${time}] ${moodEmojis[mood]}<br>
      <small>Avant : ${causeBefore || '—'}</small><br>
      <small>Après : ${causeAfter || '—'}</small>
    `;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // === Réinitialisation des champs ===
  document.getElementById('causeBefore').value = '';
  document.getElementById('causeAfter').value = '';
});



//bloomGPT



//task_tracker
/* ===========================
   To-Do List – Vanilla JS + localStorage
   =========================== */

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

  if (el.form) {
    el.form.addEventListener("submit", (e) => {
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
  }

  if (el.filter) {
    el.filter.addEventListener("change", () => {
      currentFilter = el.filter.value;
      render();
    });
  }

  if (el.clearDone) {
    el.clearDone.addEventListener("click", () => {
      tasks = tasks.filter((t) => !t.done);
      persist();
      render();
    });
  }

  if (el.list) {
    el.list.addEventListener("click", (e) => {
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
        const newText = prompt("Modifier la tâche :", t.text);
        if (newText === null) return;
        const text = newText.trim();
        if (text) {
          t.text = text;
          persist();
          render();
        }
      }
    });

    el.list.addEventListener("change", (e) => {
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
  }

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
