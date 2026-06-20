export function buildShareSvg(analysis) {
  const share = analysis.shareCard;
  const width = 1600;
  const height = 900;
  const prediction = predictionType(analysis);
  const missing = share.missing || "missing equation";
  const present = share.present || "equation-chain mechanism";
  const formulaRows = share.nextEquation
    .split(/\n+/)
    .map((line) => latexToShareFormulaParts(line))
    .filter(Boolean)
    .slice(0, 5);
  const evidence = shareEvidence(share.evidence);
  const falsifier = shareFalsifier(share.falsifier || analysis.outcome?.missingEquation?.falsifier || "");
  const grammar = shareGrammar(share.grammarEvidence);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#f7f7f4"/>
  <rect x="44" y="44" width="1512" height="812" rx="30" fill="#ffffff" stroke="#d7d7d0" stroke-width="2"/>
  <rect x="44" y="44" width="18" height="812" rx="9" fill="#2457a6"/>

  <text x="94" y="96" fill="#666a70" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="900" letter-spacing="4">EQUATION X-RAY</text>
  <text x="94" y="148" fill="#171717" font-family="Inter, system-ui, sans-serif" font-size="56" font-weight="950">This paper has a missing formula.</text>
  <rect x="1040" y="78" width="390" height="48" rx="24" fill="#eef4ff" stroke="#b9cbea"/>
  <text x="1066" y="110" fill="#2457a6" font-family="Inter, system-ui, sans-serif" font-size="19" font-weight="900">NOT A SUMMARY: EQUATION-CHAIN TEST</text>

  <rect x="94" y="204" width="610" height="116" rx="18" fill="#fff8f6" stroke="#edc3c0"/>
  <text x="122" y="244" fill="#aa2e2e" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="900" letter-spacing="2">MISSING</text>
  ${svgWrappedText(missing, 122, 286, 34, 3, 530, "#171717", 42, 900)}

  <rect x="94" y="356" width="610" height="156" rx="18" fill="#f8fbff" stroke="#cfdbef"/>
  <text x="122" y="396" fill="#2457a6" font-family="Inter, system-ui, sans-serif" font-size="21" font-weight="900" letter-spacing="2">PRESENT MECHANISM</text>
  ${svgWrappedText(present, 122, 438, 28, 4, 530, "#171717", 30, 820)}

  <rect x="94" y="548" width="610" height="178" rx="18" fill="#fbfbf8" stroke="#d7d7d0"/>
  <text x="122" y="588" fill="#666a70" font-family="Inter, system-ui, sans-serif" font-size="21" font-weight="900" letter-spacing="2">WHY THIS IS A REAL TEST</text>
  ${svgWrappedText(evidence, 122, 630, 25, 3, 530, "#171717", 25, 650)}
  ${svgWrappedText(grammar, 122, 704, 23, 2, 530, "#666a70", 21, 700)}

  <rect x="760" y="204" width="702" height="402" rx="22" fill="#fffaf1" stroke="#d4b475" stroke-width="2"/>
  <text x="796" y="250" fill="#8a641b" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="900" letter-spacing="2">PREDICTED NEXT FORMULA</text>
  <rect x="1200" y="222" width="218" height="42" rx="21" fill="#ffffff" stroke="#d4b475"/>
  <text x="1222" y="249" fill="#8a641b" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="900">${escapeXml(prediction)}</text>
  ${formulaRows.map((parts, index) => `
    <rect x="796" y="${288 + index * 58}" width="630" height="42" rx="10" fill="#ffffff" stroke="#e3d4b0"/>
    <text x="818" y="${316 + index * 58}" fill="#171717" font-family="STIX Two Math, Cambria Math, Times New Roman, serif" font-size="26">${svgFormulaParts(parts)}</text>
  `).join("")}
  <text x="796" y="562" fill="#666a70" font-family="Inter, system-ui, sans-serif" font-size="20">Typed prediction, not free-form text generation.</text>

  <rect x="760" y="642" width="702" height="84" rx="18" fill="#f7faf8" stroke="#bfd6ca"/>
  <text x="796" y="678" fill="#276b51" font-family="Inter, system-ui, sans-serif" font-size="21" font-weight="900" letter-spacing="2">FALSIFIER</text>
  ${svgWrappedText(falsifier || "Change the missing condition; the predicted readout should change if the mechanism is real.", 796, 710, 24, 2, 620, "#171717", 21, 700)}

  <line x1="94" y1="780" x2="1462" y2="780" stroke="#d7d7d0"/>
  <text x="94" y="824" fill="#171717" font-family="Inter, system-ui, sans-serif" font-size="24" font-weight="800">Paste equations → reveal the typed next step in the mechanism.</text>
  <text x="1045" y="824" fill="#666a70" font-family="Inter, system-ui, sans-serif" font-size="21">synthetix-institute.github.io/equation-xray</text>
</svg>`;
}

function predictionType(analysis) {
  const title = `${analysis?.outcome?.missingEquation?.title || ""}`.toLowerCase();
  if (title.includes("formal gap") || title.includes("hilbert") || title.includes("domain") || title.includes("normalization")) {
    return "Formal obligation";
  }
  if (title.includes("bridge") || title.includes("closure") || title.includes("microstructure")) {
    return "Closure candidate";
  }
  return "Testable candidate";
}

function firstSentence(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) return "";
  const match = text.match(/^(.+?[.!?])\s/);
  return match ? match[1] : text;
}

function shareEvidence(value) {
  const text = firstSentence(value);
  if (/bridge between them is not explicit/i.test(text)) {
    return "Macro equations and microstructure equations are both present; the constitutive bridge is absent.";
  }
  return text;
}

function shareFalsifier(value) {
  const text = firstSentence(value);
  if (/same stretch/i.test(text) && /orientation/i.test(text)) {
    return "Hold λ,T,bpc fixed; change orientation or stem statistics. Modulus should change.";
  }
  return text;
}

function shareGrammar(value) {
  const text = String(value || "");
  const probability = text.match(/\((\d+)%\)/)?.[1];
  if (/add_boundary_weak_form/.test(text)) {
    return `Audit signal: add a boundary or realization bridge${probability ? ` (${probability}%)` : ""}.`;
  }
  if (/add_constraint_closure/.test(text)) {
    return `Audit signal: add a closure or admissibility condition${probability ? ` (${probability}%)` : ""}.`;
  }
  if (/add_current_checkpoint/.test(text)) {
    return `Audit signal: add a measurable readout${probability ? ` (${probability}%)` : ""}.`;
  }
  return text.replace(/Top grammar continuation:\s*/i, "Audit signal: ");
}

function latexToShareFormulaParts(value) {
  const marker = "\u0000";
  const text = preprocessLatexFormula(value)
    .replace(/\^\s*\{([^}]*)\}/g, (_, body) => `${marker}sup:${normalizeFormulaToken(body)}${marker}`)
    .replace(/_\s*\{([^}]*)\}/g, (_, body) => `${marker}sub:${normalizeFormulaToken(body)}${marker}`)
    .replace(/\^\s*([A-Za-z0-9+\-†])/g, (_, body) => `${marker}sup:${normalizeFormulaToken(body)}${marker}`)
    .replace(/_\s*([A-Za-z0-9+\-])/g, (_, body) => `${marker}sub:${normalizeFormulaToken(body)}${marker}`)
    .replace(/\\/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.split(marker).filter((part) => part.length).map((part) => {
    if (part.startsWith("sub:")) return { kind: "sub", text: part.slice(4) };
    if (part.startsWith("sup:")) return { kind: "sup", text: part.slice(4) };
    return { kind: "base", text: part };
  });
}

export function latexToShareFormula(value) {
  return latexToShareFormulaParts(value)
    .map((part) => {
      if (part.kind === "sub") return `_${part.text}`;
      if (part.kind === "sup") return `^${part.text}`;
      return part.text;
    })
    .join("")
    .replace(/⟨\s+/g, "⟨")
    .replace(/\s+⟩/g, "⟩")
    .replace(/·\s+/g, "·");
}

function preprocessLatexFormula(value) {
  return String(value || "")
    .trim()
    .replace(/([ab])_S\s+S/g, "$1_S\\cdot S")
    .replace(/([ab])_l\s*\\langle/g, "$1_l\\cdot\\langle")
    .replace(/\\left/g, "")
    .replace(/\\right/g, "")
    .replace(/\\qquad|\\quad/g, "   ")
    .replace(/\\,/g, " ")
    .replace(/\\text\s*\{([^}]*)\}/g, "$1")
    .replace(/\\mathrm\s*\{([^}]*)\}/g, "$1")
    .replace(/\\mathcal\s*\{H\}/g, "ℋ")
    .replace(/\\mathcal\s*\{([^}]*)\}/g, "$1")
    .replace(/\\lVert/g, "∥")
    .replace(/\\rVert/g, "∥")
    .replace(/\\langle/g, "⟨")
    .replace(/\\rangle/g, "⟩")
    .replace(/\\lambda/g, "λ")
    .replace(/\\psi/g, "ψ")
    .replace(/\\phi/g, "φ")
    .replace(/\\sigma/g, "σ")
    .replace(/\\partial/g, "∂")
    .replace(/\\nabla/g, "∇")
    .replace(/\\cdot/g, "·")
    .replace(/\\in/g, "∈")
    .replace(/\\dagger/g, "†")
    .replace(/\\hat\s*\{([^}]*)\}/g, "$1̂")
    .replace(/\\hat\s+([A-Za-z])/g, "$1̂")
    .replace(/\\hat([A-Za-z])/g, "$1̂")
    .replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, "$1/$2");
}

function normalizeFormulaToken(value) {
  return preprocessLatexFormula(value)
    .replace(/\\/g, "")
    .replace(/⟨\s+/g, "⟨")
    .replace(/\s+⟩/g, "⟩")
    .replace(/·\s+/g, "·")
    .replace(/\s+/g, " ")
    .trim();
}

function svgFormulaParts(parts) {
  return parts.map((part) => {
    if (part.kind === "sub") {
      return `<tspan baseline-shift="sub" font-size="17">${escapeXml(part.text)}</tspan>`;
    }
    if (part.kind === "sup") {
      return `<tspan baseline-shift="super" font-size="17">${escapeXml(part.text)}</tspan>`;
    }
    return `<tspan>${escapeXml(part.text)}</tspan>`;
  }).join("");
}

function svgWrappedText(value, x, y, lineHeight, maxLines, width, fill, fontSize, fontWeight = 500) {
  const maxChars = Math.max(16, Math.floor(width / (fontSize * 0.54)));
  const lines = wrapText(shareCleanText(value), maxChars).slice(0, maxLines);
  return lines.map((line, index) =>
    `<text x="${x}" y="${y + index * lineHeight}" fill="${fill}" font-family="Inter, system-ui, sans-serif" font-size="${fontSize}" font-weight="${fontWeight}">${escapeXml(line)}</text>`
  ).join("\n");
}

function shareCleanText(value) {
  return String(value || "").replace(/->/g, "→");
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
