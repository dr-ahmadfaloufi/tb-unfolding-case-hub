/* ============================================================
   TB Unfolding Cases — application logic
   Vanilla JS, no dependencies, works from file:// or any static host.
   ============================================================ */

// ---------- presentation mode (persists across pages) ----------

function initPresentationToggle() {
  const KEY = "tbhub-presentation-mode";
  const body = document.body;
  const saved = localStorage.getItem(KEY) === "1";
  if (saved) body.classList.add("presentation-mode");

  const wrap = document.getElementById("presentation-toggle-wrap");
  if (!wrap) return;
  wrap.innerHTML = `
    <label class="presentation-toggle ${saved ? "active" : ""}" id="presentation-toggle">
      <input type="checkbox" id="presentation-checkbox" ${saved ? "checked" : ""} />
      Presentation mode
    </label>`;
  const checkbox = document.getElementById("presentation-checkbox");
  const label = document.getElementById("presentation-toggle");
  checkbox.addEventListener("change", () => {
    const on = checkbox.checked;
    body.classList.toggle("presentation-mode", on);
    label.classList.toggle("active", on);
    localStorage.setItem(KEY, on ? "1" : "0");
  });
}

// ---------- hub page ----------

function renderHub() {
  const list = document.getElementById("case-list");
  if (!list) return;
  list.innerHTML = CASES.map(
    (c) => `
    <a class="case-card" href="case.html?id=${c.id}">
      <span class="case-number">Case ${c.id}</span>
      <h2>${c.title}</h2>
      <p>${c.hubDescription}</p>
    </a>`
  ).join("");
}

// ---------- case page ----------

function getCaseIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);
  return Number.isFinite(id) ? id : 1;
}

function renderCase() {
  const root = document.getElementById("case-root");
  if (!root) return;

  const caseId = getCaseIdFromUrl();
  const caseData = CASES.find((c) => c.id === caseId);

  if (!caseData) {
    root.innerHTML = `<p>Case not found. <a href="index.html">Return to hub</a>.</p>`;
    return;
  }

  document.title = `Case ${caseData.id} — ${caseData.title}`;

  const state = {
    current: 0,
    revealed: caseData.stages.map(() => false),
  };

  function stageNavHtml() {
    const dots = caseData.stages
      .map((s, i) => {
        const isCurrent = i === state.current;
        const isRevealed = state.revealed[i];
        return `<button type="button" class="stage-dot ${isCurrent ? "current" : ""} ${
          isRevealed ? "revealed" : ""
        }" data-stage-index="${i}">
          <span class="dot"></span> Stage ${i + 1}
        </button>`;
      })
      .join("");
    return `
      <nav class="stage-nav" aria-label="Stage navigator">
        ${dots}
        <button type="button" class="restart-btn" id="restart-btn">&#8635; Restart case</button>
      </nav>`;
  }

  function stageCardHtml() {
    const stage = caseData.stages[state.current];
    const isRevealed = state.revealed[state.current];
    const isLast = state.current === caseData.stages.length - 1;

    const contextHtml = stage.context
      ? `<div class="stage-context">${stage.context}</div>`
      : "";

    const revealHtml = isRevealed
      ? `
        <div class="reveal-block">
          ${stage.reveal}
          ${
            stage.pearl
              ? `<div class="pearl-box"><span class="pearl-icon">&#128161;</span><div class="pearl-content"><strong>Pearl</strong>${stage.pearl}</div></div>`
              : ""
          }
          ${stage.revealExtra || ""}
        </div>`
      : "";

    const actionsHtml = isRevealed
      ? isLast
        ? ""
        : `<div class="stage-actions"><button type="button" class="btn" id="next-stage-btn">Next stage &rarr;</button></div>`
      : `<div class="stage-actions"><button type="button" class="btn" id="reveal-btn">Reveal</button></div>`;

    return `
      <div class="stage-card">
        <p class="stage-title">Stage ${state.current + 1} of ${caseData.stages.length} &mdash; ${stage.title}</p>
        ${contextHtml}
        <p class="stage-question">${stage.question}</p>
        ${revealHtml}
        ${actionsHtml}
      </div>
      ${isRevealed && isLast ? caseCompleteHtml() : ""}
    `;
  }

  function caseCompleteHtml() {
    return `
      <div class="stage-card case-complete">
        <h2>Case complete</h2>
        <p>You've worked through all ${caseData.stages.length} stages of this case.</p>
        <div class="case-complete-actions">
          <button type="button" class="btn btn-secondary" id="restart-complete-btn">&#8635; Restart this case</button>
          <a class="btn btn-secondary" href="index.html">Back to hub</a>
          <a class="btn btn-secondary" href="references.html">View references</a>
        </div>
      </div>`;
  }

  function render() {
    root.innerHTML = `
      <div class="case-header">
        <a class="back-link" href="index.html">&larr; Back to hub</a>
        <h1>Case ${caseData.id} &mdash; ${caseData.title}</h1>
        <div class="vignette">
          <div class="vignette-label">Patient</div>
          <p>${caseData.vignette}</p>
        </div>
      </div>
      ${stageNavHtml()}
      ${stageCardHtml()}
    `;
    attachHandlers();
  }

  function attachHandlers() {
    const revealBtn = document.getElementById("reveal-btn");
    if (revealBtn) {
      revealBtn.addEventListener("click", () => {
        state.revealed[state.current] = true;
        render();
      });
    }
    const nextBtn = document.getElementById("next-stage-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (state.current < caseData.stages.length - 1) {
          state.current += 1;
          render();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }
    const restartBtn = document.getElementById("restart-btn");
    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        state.current = 0;
        state.revealed = caseData.stages.map(() => false);
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
    const restartCompleteBtn = document.getElementById("restart-complete-btn");
    if (restartCompleteBtn) {
      restartCompleteBtn.addEventListener("click", () => {
        state.current = 0;
        state.revealed = caseData.stages.map(() => false);
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
    document.querySelectorAll(".stage-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        state.current = parseInt(dot.getAttribute("data-stage-index"), 10);
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  render();
}

// ---------- references page ----------

function renderReferences() {
  const root = document.getElementById("references-root");
  if (!root) return;

  function refItemHtml(item, isNumbered) {
    const doiLink = item.doi
      ? ` <a class="doi" href="https://doi.org/${item.doi}" target="_blank" rel="noopener noreferrer">https://doi.org/${item.doi}</a>`
      : "";
    const tag = item.tag ? `<span class="ref-tag">[${item.tag}]</span>` : "";
    const note = item.note ? ` <span class="ref-tag">${item.note}</span>` : "";
    const idAttr = isNumbered ? ` id="ref${item.n}"` : "";
    const num = isNumbered ? `<span class="ref-num">${item.n}.</span>` : "";
    return `<li class="ref-item"${idAttr}>${num}${item.text}${doiLink}${tag}${note}</li>`;
  }

  let html = "";
  REFERENCES.groups.forEach((group) => {
    html += `<h2 class="ref-section-title">${group.title}</h2>`;
    html += `<ul class="ref-list">${group.items
      .map((it) => refItemHtml(it, true))
      .join("")}</ul>`;
  });

  html += `<h2 class="ref-section-title">${REFERENCES.background.title}</h2>`;
  html += `<ul class="ref-list">${REFERENCES.background.items
    .map((it) => refItemHtml(it, false))
    .join("")}</ul>`;

  const creditKeys = Object.keys(IMAGE_CREDITS);
  if (creditKeys.length) {
    html += `<h2 class="ref-section-title">Image credits</h2>`;
    html += `<p style="color:var(--text-muted); font-size:0.9rem; max-width:65ch;">Published, licensed figures used as reference images within case stages. Not part of the case's own teaching citations above.</p>`;
    html += `<ul class="ref-list">${creditKeys
      .map((key) => {
        const c = IMAGE_CREDITS[key];
        const doiLink = c.doi
          ? ` <a class="doi" href="https://doi.org/${c.doi}" target="_blank" rel="noopener noreferrer">https://doi.org/${c.doi}</a>`
          : "";
        const sourceLink = c.sourceUrl
          ? ` <a class="doi" href="${c.sourceUrl}" target="_blank" rel="noopener noreferrer">${c.sourceUrl}</a>`
          : "";
        return `<li class="ref-item" id="imgcredit-${key}"><span class="ref-tag">[${c.license}]</span> ${c.text}${doiLink}${sourceLink}<br><span class="ref-tag">${c.note}</span></li>`;
      })
      .join("")}</ul>`;
  }

  root.innerHTML = html;

  // Highlight and scroll to a targeted reference if arriving via #refN
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      target.classList.add("targeted");
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    }
  }
}

// ---------- init ----------

document.addEventListener("DOMContentLoaded", () => {
  initPresentationToggle();
  renderHub();
  renderCase();
  renderReferences();
});
