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
\]`
};

const state = {
  analysis: null,
  sourceName: "pasted input"
};

const $ = (id) => document.getElementById(id);

function setInitialInput() {
  $("source-input").value = samples.schrodinger;
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
      ${latexStack(missing.candidateLatex)}
    </article>
  `;
}

function renderLaneNode(node) {
  const route = routeLabel(node.topRoute);
  return `
    <article class="lane-card">
      <span class="lane-id">${node.id}</span>
      ${latexBlock(node.formula)}
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

function latexStack(value) {
  const lines = String(value || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (!lines.length) return "";
  return `<div class="latex-stack">${lines.map((line) => latexBlock(line)).join("")}</div>`;
}

function latexBlock(value) {
  const source = String(value || "").trim();
  if (!source) return "";
  const fallback = `<pre class="math-fallback">${escapeHtml(source)}</pre>`;
  const katex = window.katex;
  if (!katex?.renderToString) return fallback;
  try {
    return `<div class="math-render" data-latex="${escapeHtml(source)}">${katex.renderToString(source, {
      displayMode: true,
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
  await navigator.clipboard.writeText(state.analysis.markdown);
  $("copy-md-button").textContent = "Copied";
  setTimeout(() => {
    $("copy-md-button").textContent = "Copy MD";
  }, 1200);
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
