//home



//main



//mood_tracker



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
