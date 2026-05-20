// AI-Native Checklist — renders data.json, manages scores, encodes state in URL hash.

const SCORES = ["yes", "partial", "no"];

let scores = {};
let data = null;

function loadFromHash() {
  const h = window.location.hash;
  if (!h.startsWith("#s=")) return {};
  try {
    const decoded = atob(decodeURIComponent(h.slice(3)));
    return JSON.parse(decoded);
  } catch (e) {
    return {};
  }
}

function writeToHash() {
  const compact = {};
  for (const k of Object.keys(scores)) if (scores[k]) compact[k] = scores[k];
  if (Object.keys(compact).length === 0) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
    return;
  }
  const encoded = btoa(JSON.stringify(compact));
  history.replaceState(null, "", "#s=" + encoded);
}

function tally() {
  const t = { yes: 0, partial: 0, no: 0, unscored: 0, total: data.items.length };
  for (const it of data.items) {
    const s = scores[it.id];
    if (s && t[s] !== undefined) t[s]++; else t.unscored++;
  }
  return t;
}

function renderTally() {
  const t = tally();
  document.getElementById("tally").innerHTML = `
    <span><span class="dot yes"></span><span class="count">${t.yes}</span> yes</span>
    <span><span class="dot partial"></span><span class="count">${t.partial}</span> partial</span>
    <span><span class="dot no"></span><span class="count">${t.no}</span> no</span>
    <span><span class="dot"></span><span class="count">${t.unscored}</span> unscored</span>
  `;
}

function itemEl(item) {
  const div = document.createElement("div");
  div.className = "item";
  div.dataset.id = item.id;
  if (scores[item.id]) div.dataset.score = scores[item.id];
  const src = item.source || {};
  const sourceMeta = data.sources[src.id] || {};
  const sourceTitle = sourceMeta.title || src.id;
  const sourceUrl = sourceMeta.url || "#";
  const pageBit = src.page ? `, p.${src.page}` : "";

  div.innerHTML = `
    <div class="item-bar"></div>
    <div class="item-body">
      <p class="item-id">${item.id} · ${item.category_title || ""}</p>
      <h3 class="item-title">${item.title}</h3>
      <div class="scores" role="group" aria-label="Score this item">
        ${SCORES.map(s => `
          <button class="score-btn" data-val="${s}" aria-pressed="${scores[item.id] === s}">${s}</button>
        `).join("")}
      </div>
      <span class="expand" role="button" tabindex="0">source &amp; how to score</span>
      <div class="details">
        <div class="source-block">
          <p class="source-label">source</p>
          <p class="source-quote">"${src.quote || ""}"</p>
          <p class="source-attr">— <a href="${sourceUrl}" target="_blank" rel="noopener">${sourceTitle}</a>, ${src.section || ""}${pageBit}</p>
        </div>
        <div class="howto">${mdToHtml(item.body || "")}</div>
      </div>
    </div>
  `;

  div.querySelectorAll(".score-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const val = btn.dataset.val;
      if (scores[item.id] === val) {
        delete scores[item.id];
        div.removeAttribute("data-score");
      } else {
        scores[item.id] = val;
        div.dataset.score = val;
      }
      div.querySelectorAll(".score-btn").forEach(b => {
        b.setAttribute("aria-pressed", scores[item.id] === b.dataset.val ? "true" : "false");
      });
      writeToHash();
      renderTally();
    });
  });

  const expand = div.querySelector(".expand");
  const toggle = () => div.classList.toggle("open");
  expand.addEventListener("click", toggle);
  expand.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
  });

  return div;
}

function mdToHtml(md) {
  // Minimal MD → HTML for item bodies. Headings, bold, lists.
  const lines = md.split("\n");
  const out = [];
  let inList = false;
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.startsWith("## ")) {
      if (inList) { out.push("</ul>"); inList = false; }
      out.push(`<h2>${escape(line.slice(3))}</h2>`);
    } else if (line.startsWith("- ")) {
      if (!inList) { out.push("<ul>"); inList = true; }
      out.push(`<li>${inlineMd(line.slice(2))}</li>`);
    } else if (line.trim() === "") {
      if (inList) { out.push("</ul>"); inList = false; }
    } else {
      if (inList) { out.push("</ul>"); inList = false; }
      out.push(`<p>${inlineMd(line)}</p>`);
    }
  }
  if (inList) out.push("</ul>");
  return out.join("");
}

function inlineMd(s) {
  return escape(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function escape(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderChecklist() {
  const root = document.getElementById("checklist");
  root.innerHTML = "";
  data.categories.forEach((cat, idx) => {
    const num = String(idx + 1).padStart(2, "0");
    const items = data.items.filter(i => i.category === cat.id);
    const section = document.createElement("section");
    section.className = "category";
    section.innerHTML = `
      <div class="category-head">
        <span class="category-num">${num}</span>
        <h2 class="category-title">${cat.title}</h2>
      </div>
    `;
    items.forEach(it => section.appendChild(itemEl(it)));
    root.appendChild(section);
  });
  renderTally();
}

function setupShare() {
  const btn = document.getElementById("share-btn");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      btn.textContent = "copied";
      btn.classList.add("copied");
      setTimeout(() => { btn.textContent = "copy share link"; btn.classList.remove("copied"); }, 1600);
    } catch (e) {
      window.prompt("Copy this link:", url);
    }
  });
}

async function init() {
  scores = loadFromHash();
  const res = await fetch("./data.json");
  data = await res.json();
  renderChecklist();
  setupShare();
}

init();
