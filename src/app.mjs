import {
  ROUTES,
  SUBSTRATES,
  analyzeText,
  routeLabel,
  substrateLabel
} from "./engine.mjs";

const samples = {
  schrodinger: String.raw`\[
i\hbar \partial_t \psi(x,t)=\hat H\psi(x,t)
\]

\[
\hat H\phi_n = E_n \phi_n
\]

\[
P(E_n)=|\langle \phi_n|\psi\rangle|^2
\]`,
  transport: String.raw`\[
\partial_t q+\nabla\cdot J=S
\]

\[
C(q,J,\lambda)=0
\]

\[
\int_\Omega \varphi\,\mathcal L q\,dx=\int_\Omega \varphi f\,dx,\qquad Bq=b
\]`,
  commutator: String.raw`\[
[A,B]=AB-BA
\]

\[
\Delta A\,\Delta B \geq \frac{1}{2}|\langle[A,B]\rangle|
\]

\[
P(a_i)=\langle\psi|\Pi_i|\psi\rangle
\]`,
  polymer: String.raw`\[
\lambda = L_x/L_{x,0}
\]

\[
\sigma_{true} = \sigma_{xx} - \frac{\sigma_{yy}+\sigma_{zz}}{2}
\]

\[
\frac{\sigma_{true}}{\lambda^2-\frac{1}{\lambda}} = 2\left(C_1+\frac{C_2}{\lambda}\right)
\]

\[
S=(3\langle \cos^2\theta\rangle-1)/2
\]

\[
P(l)=p_0(1-p_0)^l=p_0\exp(-l/l_0)
\]`
};

const state = {
  analysis: null,
  sourceName: "pasted input"
};

const $ = (id) => document.getElementById(id);

function setInitialInput() {
  const requestedSample = new URLSearchParams(window.location.search).get("sample");
  const sampleKey = samples[requestedSample] ? requestedSample : "schrodinger";
  state.sourceName = `${sampleKey} sample`;
  $("source-input").value = samples[sampleKey];
}

function pct(value) {
  return `${Math.round((value || 0) * 100)}%`;
}

function renderBars(target, scores, specs, className = "") {
  const rows = [...specs]
    .map((spec) => ({ ...spec, score: scores[spec.id] || 0 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
  target.innerHTML = rows
    .map((row) => `
      <div class="bar-row">
        <span>${row.label}</span>
        <span class="bar-track"><span class="bar-fill ${className}" style="width:${pct(row.score)}"></span></span>
        <span>${row.score.toFixed(2)}</span>
      </div>
    `)
    .join("");
}

function renderChain(chain) {
  const target = $("chain-list");
  if (!chain.length) {
    target.innerHTML = "<li>No adjacent equation move detected.</li>";
    return;
  }
  target.innerHTML = chain
    .map((move) => `
      <li>
        <span class="token">${move.from} -> ${move.to}</span>
        <span class="token">${move.token}</span>
        ${move.substrateChanged ? `<span class="tag">${move.substrateMove}</span>` : ""}
      </li>
    `)
    .join("");
}

function renderNextMoves(moves) {
  const target = $("next-moves");
  if (!moves.length) {
    target.innerHTML = "<li>No next move predicted.</li>";
    return;
  }
  target.innerHTML = moves
    .map((move) => `
      <li>
        <span class="token">${move.token}</span>
        <span class="probability">${Math.round(move.probability * 100)}%</span>
        <div>${move.reason}</div>
      </li>
    `)
    .join("");
}

function renderMissingRoles(roles) {
  const target = $("missing-roles");
  if (!roles.length) {
    target.innerHTML = "<li>No major role missing from the detected sequence.</li>";
    return;
  }
  target.innerHTML = roles
    .slice(0, 7)
    .map((role) => `
      <li>
        <strong>${role.label}</strong>
        <div>${role.why}</div>
      </li>
    `)
    .join("");
}

function renderVerdict(analysis) {
  const target = $("verdict-card");
  if (!analysis?.outcome) {
    target.innerHTML = "";
    return;
  }
  const routes = topLabels(analysis.aggregateRoutes, ROUTES, 3);
  const substrates = topLabels(analysis.aggregateSubstrates, SUBSTRATES, 2);
  const missing = analysis.outcome.missingEquation;
  const reviewer = analysis.outcome.reviewer;
  target.innerHTML = `
    <article class="verdict-card">
      <p class="outcome-label">X-Ray Verdict</p>
      <h3>${escapeHtml(missing.title)}</h3>
      <p>${escapeHtml(missing.claim)}</p>
      <div class="verdict-grid">
        <div>
          <span class="verdict-kicker">Detected mechanism</span>
          <strong>${escapeHtml(routes.join(" + ") || "weakly classified construction")}</strong>
          <p>${escapeHtml(substrates.join(" / ") || "substrate not explicit")}</p>
        </div>
        <div>
          <span class="verdict-kicker">Reviewer action</span>
          <strong>${escapeHtml(reviewer.verdict)}</strong>
          <p>${escapeHtml(reviewer.requiredFix)}</p>
        </div>
      </div>
      <p><strong>Why</strong> ${escapeHtml(missing.why)}</p>
      <p><strong>Falsifier</strong> ${escapeHtml(missing.falsifier)}</p>
    </article>
  `;
}

function renderShareCard(analysis) {
  const target = $("share-card");
  const share = analysis?.shareCard;
  if (!share) {
    target.innerHTML = "";
    return;
  }
  target.innerHTML = `
    <article class="discovery-card">
      <p class="outcome-label">Shareable result</p>
      <h3>${escapeHtml(share.headline)}</h3>
      <div class="card-field">
        <span>Present</span>
        <strong>${escapeHtml(share.present)}</strong>
        <p>${escapeHtml(share.substrate)}</p>
      </div>
      <div class="card-field missing-field">
        <span>Missing</span>
        <strong>${escapeHtml(share.missing)}</strong>
      </div>
      <div class="card-field">
        <span>Required equation</span>
        ${equationPreview(share.nextEquation)}
      </div>
      <div class="card-field evidence-field">
        <span>Evidence</span>
        <p>${escapeHtml(share.evidence)}</p>
        <p>${escapeHtml(share.grammarEvidence)}</p>
      </div>
      <p class="scope-note">${escapeHtml(share.scope)}</p>
    </article>
  `;
}

function equationPreview(value) {
  const text = String(value || "").trim();
  return latexStack(text, { compact: true });
}

function topLabels(scores, specs, limit) {
  return [...specs]
    .map((spec) => ({ ...spec, score: scores[spec.id] || 0 }))
    .filter((spec) => spec.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((spec) => spec.label);
}

function renderConstructionLane(analysis) {
  const target = $("construction-lane");
  if (!analysis?.equations?.length || !analysis.outcome) {
    target.innerHTML = "<div class=\"lane-empty\">No construction lane available.</div>";
    return;
  }
  const insertIndex = missingInsertionIndex(analysis);
  const cards = [];
  analysis.equations.forEach((node, index) => {
    if (index === insertIndex) cards.push(renderMissingInsert(analysis));
    cards.push(renderLaneNode(node));
  });
  if (insertIndex >= analysis.equations.length) cards.push(renderMissingInsert(analysis));
  target.innerHTML = cards.join("");
}

function missingInsertionIndex(analysis) {
  const title = analysis.outcome.missingEquation.title.toLowerCase();
  if (title.includes("hilbert") || title.includes("domain") || title.includes("normalization")) return 0;
  if (title.includes("microstructure")) {
    const firstMacro = analysis.equations.findIndex((node) => /C_1|C_2|G\s*\(|\\sigma/i.test(node.formula));
    return firstMacro >= 0 ? firstMacro : analysis.equations.length;
  }
  if (title.includes("closure")) {
    const firstTransport = analysis.equations.findIndex((node) => node.activeRoutes.includes("transport_flow"));
    return firstTransport >= 0 ? firstTransport + 1 : analysis.equations.length;
  }
  return analysis.equations.length;
}

function renderMissingInsert(analysis) {
  const missing = analysis.outcome.missingEquation;
  return `
    <article class="lane-card lane-missing">
      <span class="lane-id">Insert</span>
      <h4>${escapeHtml(missing.title)}</h4>
      ${latexStack(missing.candidateLatex, { compact: true })}
    </article>
  `;
}

function renderLaneNode(node) {
  const route = routeLabel(node.topRoute);
  return `
    <article class="lane-card">
      <span class="lane-id">${node.id}</span>
      ${latexBlock(node.formula, { compact: true })}
      <span class="tag">${escapeHtml(route)}</span>
    </article>
  `;
}

function renderEquationNodes(nodes) {
  const target = $("equation-nodes");
  if (!nodes.length) {
    target.innerHTML = "<div class=\"equation-node\">No clean equation core was detected.</div>";
    return;
  }
  target.innerHTML = nodes
    .map((node) => {
      const routes = (node.activeRoutes.length ? node.activeRoutes : [node.topRoute]).map(routeLabel);
      const substrates = (node.activeSubstrates.length ? node.activeSubstrates : [node.topSubstrate]).map(substrateLabel);
      const local = node.localPrediction;
      return `
        <article class="equation-node">
          <strong>${node.id}</strong>
          ${latexBlock(node.formula)}
          <div class="node-meta">
            ${routes.map((label) => `<span class="tag">${label}</span>`).join("")}
            ${substrates.map((label) => `<span class="tag">${label}</span>`).join("")}
          </div>
          ${local ? `
            <div class="local-prediction">
              <div><strong>Move</strong> <span class="token">${local.observedMove || local.predictedToken}</span></div>
              <div><strong>Rewrite</strong> ${escapeHtml(local.rewrite)}</div>
              <div><strong>Check</strong> ${escapeHtml(local.check)}</div>
            </div>
          ` : ""}
        </article>
      `;
    })
    .join("");
}

function renderOutcome(outcome) {
  const target = $("outcome-cards");
  if (!outcome) {
    target.innerHTML = "";
    return;
  }
  target.innerHTML = `
    <article class="outcome-card">
      <p class="outcome-label">Mechanism transfer</p>
      <h3>${escapeHtml(outcome.mechanismTransfer.title)}</h3>
      <p><strong>Source</strong> ${escapeHtml(outcome.mechanismTransfer.sourceMechanism)}</p>
      <p><strong>Target</strong> ${escapeHtml(outcome.mechanismTransfer.targetExperiment)}</p>
      ${latexStack(outcome.mechanismTransfer.targetLatex)}
      <p><strong>Control</strong> ${escapeHtml(outcome.mechanismTransfer.control)}</p>
    </article>
    <article class="outcome-card reviewer-card">
      <p class="outcome-label">Equation reviewer</p>
      <h3>${escapeHtml(outcome.reviewer.verdict)}</h3>
      <p><strong>Fix</strong> ${escapeHtml(outcome.reviewer.requiredFix)}</p>
      <p><strong>Pass</strong> ${escapeHtml(outcome.reviewer.passCondition)}</p>
    </article>
  `;
}

function latexStack(value, options = {}) {
  const lines = String(value || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (!lines.length) return "";
  return `<div class="latex-stack">${lines.map((line) => latexBlock(line, options)).join("")}</div>`;
}

function latexBlock(value, options = {}) {
  const source = String(value || "").trim();
  if (!source) return "";
  const fallback = `<pre class="math-fallback">${escapeHtml(source)}</pre>`;
  const katex = window.katex;
  if (!katex?.renderToString) return fallback;
  try {
    const compact = Boolean(options.compact);
    return `<div class="math-render ${compact ? "compact-math" : ""}" data-latex="${escapeHtml(source)}">${katex.renderToString(source, {
      displayMode: true,
      output: "html",
      throwOnError: false,
      strict: "ignore",
      trust: false
    })}</div>`;
  } catch {
    return fallback;
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderAnalysis(analysis) {
  $("mechanism-summary").textContent = analysis.mechanism;
  $("equation-count").textContent = String(analysis.equationCount);
  $("atlas-state").textContent = analysis.atlasState.label;
  $("status-pill").textContent = `${analysis.equationCount} equation nodes`;
  renderVerdict(analysis);
  renderShareCard(analysis);
  renderBars($("route-bars"), analysis.aggregateRoutes, ROUTES);
  renderBars($("substrate-bars"), analysis.aggregateSubstrates, SUBSTRATES, "substrate");
  renderChain(analysis.chain);
  renderOutcome(analysis.outcome);
  renderConstructionLane(analysis);
  renderNextMoves(analysis.nextMoves);
  renderMissingRoles(analysis.missingRoles);
  renderEquationNodes(analysis.equations);
}

function analyzeCurrentInput() {
  const input = $("source-input").value;
  state.analysis = analyzeText(input, { sourceName: state.sourceName });
  renderAnalysis(state.analysis);
}

async function copyMarkdown() {
  if (!state.analysis) analyzeCurrentInput();
  $("copy-md-button").textContent = "Copied";
  try {
    await copyText(state.analysis.markdown);
  } catch {
    $("copy-md-button").textContent = "Copy failed";
  } finally {
    setTimeout(() => {
      $("copy-md-button").textContent = "Copy MD";
    }, 3000);
  }
}

async function copyShareCard() {
  if (!state.analysis) analyzeCurrentInput();
  $("copy-card-button").textContent = "Copied";
  try {
    await copyText(shareCardText(state.analysis));
  } catch {
    $("copy-card-button").textContent = "Copy failed";
  } finally {
    setTimeout(() => {
      $("copy-card-button").textContent = "Copy Card";
    }, 3000);
  }
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall through to the selection-based copy path below.
    }
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function shareCardText(analysis) {
  const share = analysis.shareCard;
  if (!share) return "";
  return [
    share.headline,
    "",
    `Present: ${share.present}`,
    `Substrate evidence: ${share.substrate}`,
    `Missing: ${share.missing}`,
    "",
    "Required equation:",
    share.nextEquation,
    "",
    `Evidence: ${share.evidence}`,
    share.grammarEvidence,
    "",
    share.sourceTrace,
    share.chainTrace,
    `Scope: ${share.scope}`
  ].filter(Boolean).join("\n");
}

function downloadShareSvg() {
  if (!state.analysis) analyzeCurrentInput();
  const svg = buildShareSvg(state.analysis);
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "equation-xray-card.svg";
  link.click();
  URL.revokeObjectURL(link.href);
  $("download-card-button").textContent = "Saved";
  setTimeout(() => {
    $("download-card-button").textContent = "SVG";
  }, 3000);
}

function buildShareSvg(analysis) {
  const share = analysis.shareCard;
  const width = 1200;
  const height = 760;
  const rows = [
    ["Present", share.present],
    ["Substrate evidence", share.substrate],
    ["Missing", share.missing],
    ["Required equation", share.nextEquation],
    ["Evidence", `${share.evidence} ${share.grammarEvidence}`],
    ["Scope", share.scope]
  ];
  let y = 154;
  const body = rows.map(([label, value]) => {
    const labelY = y;
    y += 36;
    const lines = wrapText(value, label === "Required equation" ? 82 : 94).slice(0, label === "Evidence" ? 4 : 3);
    const text = lines.map((line, index) => {
      const family = label === "Required equation" ? "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" : "Inter, system-ui, sans-serif";
      const size = label === "Required equation" ? 25 : 27;
      return `<text x="82" y="${y + index * 34}" fill="#171717" font-family="${family}" font-size="${size}" font-weight="${index === 0 && label === "Missing" ? "800" : "500"}">${escapeXml(line)}</text>`;
    }).join("\n");
    y += lines.length * 34 + 28;
    return `
      <text x="82" y="${labelY}" fill="#666a70" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="800" letter-spacing="2.5">${escapeXml(label.toUpperCase())}</text>
      ${text}
    `;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="1200" height="760" fill="#f7f7f4"/>
  <rect x="42" y="42" width="1116" height="676" rx="22" fill="#ffffff" stroke="#d7d7d0"/>
  <rect x="42" y="42" width="12" height="676" rx="6" fill="#2457a6"/>
  <text x="82" y="92" fill="#666a70" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="800" letter-spacing="2.5">EQUATION X-RAY</text>
  <text x="82" y="128" fill="#171717" font-family="Inter, system-ui, sans-serif" font-size="42" font-weight="900">${escapeXml(share.headline)}</text>
  ${body}
  <text x="82" y="700" fill="#666a70" font-family="Inter, system-ui, sans-serif" font-size="18">Mechanism-native scientific AI · synthetix-institute.github.io/equation-xray</text>
</svg>`;
}

function wrapText(value, maxChars) {
  const words = String(value || "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function downloadJson() {
  if (!state.analysis) analyzeCurrentInput();
  const blob = new Blob([JSON.stringify(state.analysis, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "equation-xray-report.json";
  link.click();
  URL.revokeObjectURL(link.href);
}

function installHandlers() {
  $("analyze-button").addEventListener("click", analyzeCurrentInput);
  $("copy-md-button").addEventListener("click", copyMarkdown);
  $("copy-card-button").addEventListener("click", copyShareCard);
  $("download-card-button").addEventListener("click", downloadShareSvg);
  $("download-json-button").addEventListener("click", downloadJson);
  document.querySelectorAll("[data-sample]").forEach((button) => {
    button.addEventListener("click", () => {
      state.sourceName = `${button.dataset.sample} sample`;
      $("source-input").value = samples[button.dataset.sample];
      analyzeCurrentInput();
    });
  });
  $("file-input").addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    state.sourceName = file.name;
    $("source-input").value = await file.text();
    analyzeCurrentInput();
  });
  window.addEventListener("load", () => {
    if (state.analysis && window.katex?.renderToString) renderAnalysis(state.analysis);
  });
}

setInitialInput();
installHandlers();
analyzeCurrentInput();
