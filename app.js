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

const HUB_SECTIONS = {
  pulmonary: {
    title: "Pulmonary TB",
    intro: "Four cases centred on the lung and on exposure: isoniazid-resistant TB, MDR-TB, HIV-associated miliary TB, and a health worker's exposure.",
  },
  extrapulmonary: {
    title: "Extrapulmonary TB",
    intro: "Six cases beyond the lung: mediastinal lymph node, pleural, spinal, meningeal, intestinal and peritoneal TB.",
  },
};

function renderHub() {
  const list = document.getElementById("case-list");
  if (!list) return;
  const card = (c) => `
    <a class="case-card" href="case.html?id=${c.id}">
      <span class="case-number">Case ${c.id}</span>
      <h2>${c.title}</h2>
      <p>${c.hubDescription}</p>
    </a>`;
  // Cases without a `section` come first; each named section gets its own heading.
  let html = CASES.filter((c) => !c.section).map(card).join("");
  Object.keys(HUB_SECTIONS).forEach((key) => {
    const cases = CASES.filter((c) => c.section === key);
    if (!cases.length) return;
    const s = HUB_SECTIONS[key];
    html += `<div class="hub-section"><h2 class="hub-section-title">${s.title}</h2><p>${s.intro}</p></div>`;
    html += cases.map(card).join("");
  });
  list.innerHTML = html;
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
          ${collapsibleSections(stage.reveal)}
          ${
            stage.pearl
              ? `<div class="pearl-box"><span class="pearl-icon">&#128161;</span><div class="pearl-content"><strong class="pearl-label">Pearl</strong>${stage.pearl}</div></div>`
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
    const toggleAllBtn = document.getElementById("toggle-sections-btn");
    if (toggleAllBtn) {
      const sections = [...document.querySelectorAll("details.reveal-section")];
      const syncLabel = () => {
        toggleAllBtn.textContent = sections.every((d) => d.open) ? "Collapse all" : "Expand all";
      };
      toggleAllBtn.addEventListener("click", () => {
        const open = !sections.every((d) => d.open);
        sections.forEach((d) => (d.open = open));
        syncLabel();
      });
      sections.forEach((d) => d.addEventListener("toggle", syncLabel));
      syncLabel();
    }
    // Citation links in a section heading navigate without toggling the section.
    document.querySelectorAll("details.reveal-section > summary a").forEach((a) => {
      a.addEventListener("click", (e) => e.stopPropagation());
    });
    document.querySelectorAll(".stage-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        state.current = parseInt(dot.getAttribute("data-stage-index"), 10);
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  window.addEventListener("beforeprint", () => {
    document.querySelectorAll("details.reveal-section").forEach((d) => (d.open = true));
  });

  render();
}

// Long reveals (3+ top-level <h4> headings) become collapsible sections: each
// <h4> and the content up to the next one go in a <details>, the first open.
// Content before the first <h4> stays visible above the sections.
function collapsibleSections(html) {
  const tpl = document.createElement("template");
  tpl.innerHTML = html;
  const root = tpl.content;
  const headings = [...root.children].filter((el) => el.tagName === "H4");
  if (headings.length < 3) return html;

  const toggle = document.createElement("div");
  toggle.className = "reveal-sections-toggle";
  toggle.innerHTML = `<button type="button" class="btn btn-secondary btn-small" id="toggle-sections-btn">Expand all</button>`;
  root.insertBefore(toggle, headings[0]);

  headings.forEach((h4, i) => {
    const details = document.createElement("details");
    details.className = "reveal-section";
    if (i === 0) details.open = true;
    const summary = document.createElement("summary");
    root.insertBefore(details, h4);
    summary.appendChild(h4);
    details.appendChild(summary);
    while (details.nextSibling && details.nextSibling.nodeName !== "H4") {
      details.appendChild(details.nextSibling);
    }
  });

  const wrap = document.createElement("div");
  wrap.appendChild(root);
  return wrap.innerHTML;
}

// ---------- start-here questions ----------

function renderStart() {
  const root = document.getElementById("start-root");
  if (!root || typeof MCQS === "undefined") return;

  const LETTERS = "ABCDE";
  const blankAnswers = () => MCQS.map(() => ({ selected: null, checked: false }));
  const state = {
    current: 0,
    answers: blankAnswers(), // per question, so moving around keeps each question's state
    results: MCQS.map(() => null), // true / false once checked
  };

  function gridHtml() {
    const chips = MCQS.map((q, i) => {
      const r = state.results[i];
      const status = r === true ? "right" : r === false ? "wrong" : "untried";
      const statusText = r === true ? "answered correctly" : r === false ? "answered incorrectly" : "not tried";
      return `<li><button type="button" class="mcq-chip ${status}${i === state.current ? " current" : ""}" data-goto="${i}"
        data-topic="${q.topic}" title="${q.topic}" aria-label="Question ${i + 1}: ${q.topic} (${statusText})"
        ${i === state.current ? 'aria-current="true"' : ""}>${i + 1}</button></li>`;
    }).join("");
    return `<nav class="mcq-grid" aria-label="Choose a question"><ol>${chips}</ol></nav>`;
  }

  function questionHtml() {
    const q = MCQS[state.current];
    const a = state.answers[state.current];
    const isLast = state.current === MCQS.length - 1;
    const notes = a.checked && Array.isArray(q.optionNotes) ? q.optionNotes : null;

    const options = q.options
      .map((text, i) => {
        let cls = "mcq-option";
        let noteCls = "neutral";
        if (a.checked) {
          if (i === q.answer) { cls += " correct"; noteCls = "right"; }
          else if (i === a.selected) { cls += " incorrect"; noteCls = "wrong"; }
        } else if (i === a.selected) {
          cls += " selected";
        }
        const note = notes && notes[i] ? `<div class="mcq-option-note ${noteCls}">${notes[i]}</div>` : "";
        return `<li><button type="button" class="${cls}" data-option="${i}" ${
          a.checked ? "disabled" : ""
        } aria-pressed="${i === a.selected}">
          <span class="mcq-letter">${LETTERS[i]}</span><span>${text}</span>
        </button>${note}</li>`;
      })
      .join("");

    let feedback = "";
    if (a.checked) {
      const right = a.selected === q.answer;
      feedback = `
        <div class="reveal-block">
          <p class="mcq-verdict ${right ? "right" : "wrong"}">${
            right ? "Correct" : `Not quite — the answer is ${LETTERS[q.answer]}`
          }</p>
          <div class="mcq-keypoint"><strong class="mcq-keypoint-label">Key point</strong>${q.rationale}</div>
        </div>`;
    }

    const prev = state.current > 0
      ? `<button type="button" class="btn btn-secondary" id="mcq-prev">&larr; Previous</button>`
      : "";
    const action = a.checked
      ? `<button type="button" class="btn" id="mcq-next">${isLast ? "See your score" : "Next question &rarr;"}</button>`
      : `<button type="button" class="btn" id="mcq-check" ${a.selected === null ? "disabled" : ""}>Check</button>`;

    return `
      ${gridHtml()}
      <div class="stage-card">
        <p class="stage-title">Question ${state.current + 1} of ${MCQS.length} &mdash; ${q.topic}</p>
        <p class="stage-question">${q.stem}</p>
        <ol class="mcq-options">${options}</ol>
        ${feedback}
        <div class="stage-actions">${prev}${action}</div>
      </div>`;
  }

  function scoreHtml() {
    const score = state.results.filter((r) => r === true).length;
    const missed = state.results
      .map((r, i) => (r ? null : `<li>Q${i + 1}. ${MCQS[i].topic}</li>`))
      .filter(Boolean)
      .join("");
    return `
      ${gridHtml()}
      <div class="stage-card case-complete">
        <h2>You scored ${score} of ${MCQS.length}</h2>
        ${missed ? `<p>Worth another look:</p><ul class="mcq-missed">${missed}</ul>` : "<p>Every question right.</p>"}
        <div class="case-complete-actions">
          <button type="button" class="btn btn-secondary" id="mcq-retake">&#8635; Retake</button>
          <a class="btn" href="case.html?id=1">Go to Case 1 &rarr;</a>
          <a class="btn btn-secondary" href="index.html">Back to hub</a>
        </div>
      </div>`;
  }

  function render() {
    const done = state.current >= MCQS.length;
    root.innerHTML = done ? scoreHtml() : questionHtml();
    attachHandlers();
  }

  function goTo(i) {
    state.current = i;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function attachHandlers() {
    root.querySelectorAll(".mcq-chip").forEach((chip) => {
      chip.addEventListener("click", () => goTo(parseInt(chip.getAttribute("data-goto"), 10)));
    });
    root.querySelectorAll(".mcq-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.answers[state.current].selected = parseInt(btn.getAttribute("data-option"), 10);
        render();
      });
    });
    const check = document.getElementById("mcq-check");
    if (check) {
      check.addEventListener("click", () => {
        const a = state.answers[state.current];
        if (a.selected === null) return;
        a.checked = true;
        state.results[state.current] = a.selected === MCQS[state.current].answer;
        render();
      });
    }
    const prev = document.getElementById("mcq-prev");
    if (prev) prev.addEventListener("click", () => goTo(state.current - 1));
    const next = document.getElementById("mcq-next");
    if (next) next.addEventListener("click", () => goTo(state.current + 1));
    const retake = document.getElementById("mcq-retake");
    if (retake) {
      retake.addEventListener("click", () => {
        state.answers = blankAnswers();
        state.results = MCQS.map(() => null);
        goTo(0);
      });
    }
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
    const urlLink = !item.doi && item.url
      ? ` <a class="doi" href="${item.url}" target="_blank" rel="noopener noreferrer">${item.url}</a>`
      : "";
    const tag = item.tag ? `<span class="ref-tag">[${item.tag}]</span>` : "";
    const note = item.note ? ` <span class="ref-tag">${item.note}</span>` : "";
    const idAttr = isNumbered ? ` id="ref${item.n}"` : "";
    const num = isNumbered ? `<span class="ref-num">${item.n}.</span>` : "";
    return `<li class="ref-item"${idAttr}>${num}${item.text}${doiLink}${urlLink}${tag}${note}</li>`;
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
  renderStart();
  renderReferences();
});
