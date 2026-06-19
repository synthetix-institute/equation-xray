const MIN_FORMULA_LENGTH = 8;

export const ROUTES = [
  {
    id: "transport_flow",
    label: "Transport / evolution",
    short: "transport",
    definition: "A state changes, flows, diffuses, propagates, or is transported.",
    cues: [
      /\\partial\s*[_^{]?\s*t/i,
      /\\dot\s*\{?[a-z]/i,
      /\\frac\s*\{\s*d\s*\}\s*\{\s*d\s*t\s*\}/i,
      /\\frac\s*\{\s*\\partial/i,
      /\\nabla\s*\\cdot/i,
      /\\nabla/i,
      /\bd_t\b/i,
      /\bflow\b/i,
      /\btransport\b/i,
      /\bdiffusion\b/i,
      /\bevolution\b/i,
      /\bvelocity\b/i,
      /\bcurrent\b/i
    ]
  },
  {
    id: "constraint_closure",
    label: "Closure / admissibility",
    short: "closure",
    definition: "A condition restricts which states, currents, or parameters are admissible.",
    cues: [
      /=\s*0/,
      /\\leq|\\geq|\\in\b|\\subset|\\forall/i,
      /\bconstraint\b/i,
      /\bclosure\b/i,
      /\badmissible\b/i,
      /\\lambda\b/,
      /\\delta\b/,
      /\\mathrm\s*\{\s*div\s*\}/i,
      /\\nabla\s*\\cdot\s*[A-Za-z_\\]+\s*=\s*0/,
      /\bC\s*\(/,
      /\\sum[\s\S]{0,80}=/
    ]
  },
  {
    id: "spectral_operator",
    label: "Operator / spectrum",
    short: "operator-spectrum",
    definition: "An operator, generator, eigenvalue, spectrum, or resolvent organizes prediction.",
    cues: [
      /\beigen/i,
      /\bspectrum|spectral/i,
      /\\hat\s*\{?\s*H/i,
      /\bH\s*\\psi\b|\bH\s*\(/,
      /\\mathcal\s*\{?\s*L\s*\}?/i,
      /\bL\s*[a-zA-Z\\]/,
      /\\Delta\b|\\nabla\s*\^?\s*2/i,
      /\\omega\b/,
      /\\operatorname\s*\{\s*spec\s*\}/i,
      /\bresolvent\b/i,
      /\(L\s*-\s*z\)\s*\^\s*\{-?1\}/i
    ]
  },
  {
    id: "boundary_weak_form",
    label: "Boundary / weak form",
    short: "boundary",
    definition: "A boundary, domain, test function, interface, or weak integral form changes the construction.",
    cues: [
      /\\partial\s*\\Omega/i,
      /\\Omega\b|\\Gamma\b/,
      /\\int|\\oint|\\iint|\\iiint/,
      /\\varphi/i,
      /\bB\s*[a-zA-Z\\]\s*=/,
      /\\partial\s*_\s*n/i,
      /\bboundary\b/i,
      /\bweak\b/i,
      /\binterface\b/i,
      /\bdomain\b/i
    ]
  },
  {
    id: "commutator_incompatibility",
    label: "Commutator / incompatibility",
    short: "incompatibility",
    definition: "Two operations fail to commute, conflict, or cannot be jointly resolved.",
    cues: [
      /\[[^\]]{1,80},[^\]]{1,80}\]/,
      /\\left\s*\[[\s\S]{1,120}\\right\s*\]/,
      /\\\{[^\}]{1,80},[^\}]{1,80}\\\}/,
      /\bcommutator\b/i,
      /\\neq|\\ne|not\s*=/i,
      /\bAB\s*-\s*BA\b/i,
      /\buncertainty\b/i,
      /\bincompatible|incompatibility\b/i
    ]
  },
  {
    id: "discrete_protocol",
    label: "Discrete protocol",
    short: "protocol",
    definition: "An ordered update, algorithm, probability protocol, or discrete step is part of the mechanism.",
    cues: [
      /[nkij]\s*\+\s*1/,
      /\\Delta\s*t/i,
      /\balgorithm|protocol|iteration|step\b/i,
      /\\arg\s*\\max|\\arg\s*\\min|argmax|argmin/i,
      /\\prod|\\sum/,
      /\bP\s*\(|\\Pr\b|\\mathbb\s*\{?\s*P\s*\}?/i,
      /\bBayes|posterior|prior|update\b/i
    ]
  }
];

export const SUBSTRATES = [
  {
    id: "inner_product_space",
    label: "Inner-product / Hilbert-like space",
    definition: "State vectors, bras/kets, adjoints, spinors, or density operators are present.",
    cues: [
      /\\psi|\\Psi/,
      /\\ket|\\bra|\\langle|\\rangle/,
      /\\dagger|\^\s*\\ast|\^\s*\*/,
      /\\hat\s*\{?[A-Za-z]/,
      /\bHilbert\b/i,
      /\bspinor\b/i,
      /density\s+operator/i,
      /\\rho\b/
    ]
  },
  {
    id: "coordinate_domain",
    label: "Coordinate domain",
    definition: "The formula is realized over coordinates, regions, or differential domains.",
    cues: [
      /\bx\b|\by\b|\bz\b|\br\b/,
      /\\Omega|\\mathbb\s*\{?\s*R\s*\}?/,
      /\bdx\b|\bdy\b|\bdz\b|d\s*\^/,
      /\\partial\s*[_^{]?\s*[xyzrt]/i
    ]
  },
  {
    id: "probability_space",
    label: "Probability space",
    definition: "Probabilities, densities, expectations, or random variables define the substrate.",
    cues: [
      /\bP\s*\(|\\Pr\b|\\mathbb\s*\{?\s*P\s*\}?/i,
      /\bprobability|random|stochastic|expectation\b/i,
      /\\rho\b/,
      /\\langle[\s\S]{0,80}\\rangle/
    ]
  },
  {
    id: "phase_space",
    label: "Phase / symplectic space",
    definition: "Conjugate variables, Poisson brackets, Hamiltonians, or phase coordinates are present.",
    cues: [
      /\bp\b[\s,;]*\bq\b|\bq\b[\s,;]*\bp\b/,
      /\\\{[^\}]{1,80},[^\}]{1,80}\\\}/,
      /\bHamiltonian|symplectic|Poisson|phase\s+space\b/i
    ]
  },
  {
    id: "graph_topology",
    label: "Graph / network topology",
    definition: "Nodes, edges, adjacency, graph Laplacians, or network structure are present.",
    cues: [
      /\bgraph|node|edge|network|adjacency\b/i,
      /\bA\s*_\s*\{?\s*i\s*j\s*\}?/,
      /\\mathcal\s*\{?\s*G\s*\}?/,
      /\bLaplacian\b/i
    ]
  },
  {
    id: "lattice_site_space",
    label: "Lattice / site space",
    definition: "Discrete sites, indexed fields, or lattice variables define the substrate.",
    cues: [
      /\blattice|site|spin\s+chain\b/i,
      /[a-zA-Z\\]\s*_\s*\{?\s*[ij]\s*\}?/,
      /\b[ij]\s*=\s*0\b/
    ]
  },
  {
    id: "metric_manifold",
    label: "Metric manifold",
    definition: "Metric tensors, curvature, Ricci terms, or line elements define the substrate.",
    cues: [
      /g\s*_\s*\{?\s*\\mu\s*\\nu\s*\}?/,
      /\bds\s*\^\s*2\b/i,
      /R\s*_\s*\{?\s*\\mu\s*\\nu\s*\}?/,
      /\bcurvature|manifold|Ricci|geodesic\b/i
    ]
  },
  {
    id: "bundle_gauge_space",
    label: "Bundle / gauge space",
    definition: "Gauge fields, connections, covariant derivatives, or curvature two-forms are present.",
    cues: [
      /\bgauge|connection|covariant|bundle\b/i,
      /F\s*_\s*\{?\s*\\mu\s*\\nu\s*\}?/,
      /A\s*_\s*\\mu/,
      /D\s*_\s*\\mu/
    ]
  },
  {
    id: "stoichiometric_space",
    label: "Stoichiometric / reaction space",
    definition: "Chemical species, reactions, or stoichiometric balance are present.",
    cues: [
      /\\rightleftharpoons|\\ce\s*\{/,
      /\bchemical|reaction|stoichiometric|species\b/i,
      /[A-Z][a-z]?\s*\+\s*[A-Z][a-z]?/
    ]
  },
  {
    id: "configuration_quotient",
    label: "Configuration / quotient space",
    definition: "Equivalence classes, quotients, moduli, or configuration spaces are present.",
    cues: [
      /\bmoduli|quotient|configuration|equivalence\b/i,
      /\\sim/,
      /\/\s*\\sim/,
      /\\mathcal\s*\{?\s*M\s*\}?/
    ]
  }
];

const GARBAGE_PATTERNS = [
  /\\bibitem|bibliography|references/i,
  /\\documentclass|\\usepackage|\\begin\s*\{document\}|\\end\s*\{document\}/i,
  /\\def\b|\\newcommand|\\renewcommand/i,
  /^\\label\s*\{[^}]*\}\s*$/i,
  /^\\(?:ref|eqref|autoref|cref|Cref)\s*\{[^}]*\}\s*$/i,
  /\\label\s*\{\s*fig:/i,
  /\\(?:ref|eqref|autoref|cref|Cref)\s*\{\s*fig:/i,
  /\\includegraphics|\\caption\b|\\begin\s*\{figure\}|\\end\s*\{figure\}/i,
  /__HYPERION_SEQ/i,
  /\b(eqno|notag|nonumber|endcases|rmitem)\b/i,
  /\bshould\s+(substitute|replace|set|use)\b/i,
  /\bmaps\s+from\b/i,
  /\bnow\s+[a-zA-Z\\_{}\^\s]+\s*=/i,
  /\bdenoting\b/i,
  /\bfinding\b[\s\S]{0,80}\berror\s+bars\b/i,
  /\bfields\s+are\b/i,
  /\bis\s+(an?|the)\s+[a-z][a-z\s-]{8,80}$/i,
  /\bbifurcation\s+at\b/i,
  /\bbox\b/i,
  /\bprocess\b[\s\S]{0,80}\\ref\s*\{/i,
  /\bsimulated\s+in\b/i,
  /\bshown\s+in\s+figure\b/i,
  /\bMD\s+steps\b/i,
  /\\cite\s*\{|~\\cite\s*\{|Equation~\\ref|Figure\s*\\ref/i,
  /\\multirow|\\newmoon|\\black(square|lozenge)|\\RHD/i,
  /&.*&|\\\\\s*$/,
  /^\([a-z]\)\s+/i,
  /\bresults\s+for\b/i,
  /\bwe\s+(adopt|define|include|calculate|use)\b/i,
  /\bthese\s+(include|showed|lines)\b/i,
  /\bthe\s+(reduced|cooling|temperature|values?)\b/i,
  /^\s*\+/,
  /,\s*,\s*$/,
  /\bquad\s*$/,
  /^on\s+/i,
  /^put\s+/i
];

const FORMULA_CUES = [
  /=|\\leq|\\geq|\\to|\\rightarrow|\\Rightarrow|\\implies/,
  /\\partial|\\nabla|\\int|\\sum|\\prod|\\lambda|\\psi|\\phi|\\rho|\\frac/,
  /[A-Za-z\\]\s*_\s*\{?[A-Za-z0-9\\]+\}?/,
  /\[[^\]]{1,80},[^\]]{1,80}\]/,
  /\\begin\s*\{(equation|align|gather|multline|cases|array|split)\*?\}/i
];

function clamp01(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function compactWhitespace(value) {
  return String(value || "")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function stripEquationWrapper(value) {
  return compactWhitespace(value)
    .replace(/^\\\[/, "")
    .replace(/\\\]$/, "")
    .replace(/^\$\$/, "")
    .replace(/\$\$$/, "")
    .replace(/^\\begin\s*\{[^}]+\*?\}/i, "")
    .replace(/\\end\s*\{[^}]+\*?\}$/i, "")
    .replace(/\\label\s*\{[^}]*\}/gi, "")
    .trim();
}

function stripInlineMath(value) {
  return String(value || "")
    .replace(/\$[^$]*\$/g, " ")
    .replace(/\\\([^)]*\\\)/g, " ")
    .replace(/\\\[[\s\S]*?\\\]/g, " ");
}

function isProseDominant(text) {
  const withoutMath = stripInlineMath(text);
  const words = withoutMath.match(/\b[A-Za-z]{3,}\b/g) || [];
  const sentencePunctuation = /[.!?]\s*$/.test(withoutMath.trim());
  const mathMarks = (text.match(/[=+\-*/^_{}\\()[\],.;:<>|]/g) || []).length;
  const relationMarks = (text.match(/=|\\leq|\\geq|\\to|\\rightarrow|\\Rightarrow|\\implies|\\approx|\\sim/g) || []).length;
  if (words.length >= 8 && relationMarks === 0) return true;
  if (sentencePunctuation && words.length >= 5 && mathMarks < 18) return true;
  if (words.length >= 10 && mathMarks / Math.max(1, words.length) < 1.8) return true;
  return false;
}

function beginsLikeEquation(text) {
  return /^\s*(?:\\?[A-Za-z][A-Za-z0-9_{}\\^]*|\\frac|\\partial|\\nabla|\\int|\\sum|\\prod|\[[^\]]|[({]?\s*[A-Za-z\\])/.test(text);
}

function isCleanLineEquation(value) {
  const text = compactWhitespace(value);
  if (!isCleanEquation(text)) return false;
  if (!beginsLikeEquation(text)) return false;
  const withoutMath = stripInlineMath(text);
  const words = withoutMath.match(/\b[A-Za-z]{3,}\b/g) || [];
  const relationMarks = (text.match(/=|\\leq|\\geq|\\to|\\rightarrow|\\Rightarrow|\\implies|\\approx|\\sim/g) || []).length;
  if (words.length >= 6 && relationMarks <= 1) return false;
  return true;
}

export function isFormulaLike(value) {
  const text = compactWhitespace(value);
  if (text.length < MIN_FORMULA_LENGTH) return false;
  if (isProseDominant(text)) return false;
  if (!FORMULA_CUES.some((pattern) => pattern.test(text))) return false;
  const alphaWords = (text.match(/\b[a-zA-Z]{4,}\b/g) || []).length;
  const operators = (text.match(/[=+\-*/^_{}\\()[\]]/g) || []).length;
  if (alphaWords > 18 && operators < 8) return false;
  return true;
}

export function isCleanEquation(value) {
  const text = compactWhitespace(value);
  if (!isFormulaLike(text)) return false;
  if (text.length > 2200) return false;
  if (GARBAGE_PATTERNS.some((pattern) => pattern.test(text))) return false;
  const letters = (text.match(/[A-Za-z]/g) || []).length;
  const mathMarks = (text.match(/[=+\-*/^_{}\\()[\],.;:]/g) || []).length;
  if (letters > 0 && mathMarks / letters < 0.08) return false;
  return true;
}

function matchScore(text, cues) {
  let hits = 0;
  for (const cue of cues) {
    if (cue.test(text)) hits += 1;
  }
  return hits;
}

function scoreSet(text, specs) {
  const raw = {};
  let maxHits = 0;
  for (const spec of specs) {
    const hits = matchScore(text, spec.cues);
    raw[spec.id] = hits;
    maxHits = Math.max(maxHits, hits);
  }
  const denom = Math.max(1, maxHits);
  const scores = {};
  for (const spec of specs) {
    scores[spec.id] = clamp01(raw[spec.id] / denom);
  }
  return scores;
}

function activeFromScores(scores, specs, threshold = 0.32) {
  return specs
    .filter((spec) => (scores[spec.id] || 0) >= threshold)
    .sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0));
}

function topFromScores(scores, specs) {
  return [...specs].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0))[0];
}

function entropy(scores) {
  const values = Object.values(scores).filter((x) => x > 0);
  const total = values.reduce((a, b) => a + b, 0);
  if (!total) return 0;
  const h = values.reduce((acc, value) => {
    const p = value / total;
    return acc - p * Math.log2(p);
  }, 0);
  return h / Math.log2(Math.max(2, values.length));
}

export function extractEquations(inputText) {
  const text = String(inputText || "");
  const candidates = [];
  const spans = [];

  const addMatch = (matchText, index) => {
    const cleaned = stripEquationWrapper(matchText);
    if (isCleanEquation(cleaned)) {
      candidates.push({ formula: cleaned, sourceOffset: index ?? -1 });
    }
  };

  const displayPatterns = [
    /\\begin\s*\{(?:equation|align|gather|multline|split|array|cases)\*?\}[\s\S]*?\\end\s*\{(?:equation|align|gather|multline|split|array|cases)\*?\}/gi,
    /\\\[[\s\S]*?\\\]/g,
    /\$\$[\s\S]*?\$\$/g
  ];

  for (const pattern of displayPatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      spans.push([match.index, match.index + match[0].length]);
      addMatch(match[0], match.index);
    }
  }

  const lineOffset = (lineIndex, lines) =>
    lines.slice(0, lineIndex).reduce((acc, line) => acc + line.length + 1, 0);
  const lines = text.split(/\n/);
  lines.forEach((line, index) => {
    const offset = lineOffset(index, lines);
    if (spans.some(([start, end]) => offset >= start && offset <= end)) return;
    const trimmed = line.trim();
    if (isCleanLineEquation(trimmed)) addMatch(trimmed, offset);
  });

  const seen = new Set();
  return candidates.filter((candidate) => {
    const key = candidate.formula.replace(/\s+/g, " ").toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function scoreEquation(formula, index = 0) {
  const routeScores = scoreSet(formula, ROUTES);
  const substrateScores = scoreSet(formula, SUBSTRATES);
  const activeRoutes = activeFromScores(routeScores, ROUTES);
  const activeSubstrates = activeFromScores(substrateScores, SUBSTRATES);
  const topRoute = topFromScores(routeScores, ROUTES);
  const topSubstrate = topFromScores(substrateScores, SUBSTRATES);
  const readoutScore = clamp01(matchScore(formula, [
    /\bJ\b|\\mathbf\s*\{?\s*J\s*\}?/,
    /\bcurrent|flux|readout|observable|measurement\b/i,
    /\bP\s*\(|\\Pr|\\langle[\s\S]{0,80}\\rangle/,
    /\by\s*\(|X\s*\(|U\s*\(/
  ]) / 2);
  return {
    id: `E${String(index + 1).padStart(3, "0")}`,
    formula,
    routeScores,
    substrateScores,
    activeRoutes: activeRoutes.map((route) => route.id),
    activeSubstrates: activeSubstrates.map((substrate) => substrate.id),
    topRoute: topRoute.id,
    topSubstrate: topSubstrate.id,
    routeEntropy: Number(entropy(routeScores).toFixed(3)),
    substrateEntropy: Number(entropy(substrateScores).toFixed(3)),
    readoutScore
  };
}

function scoreDelta(beforeScores, afterScores, id) {
  return (afterScores[id] || 0) - (beforeScores[id] || 0);
}

export function compareEquations(before, after) {
  const beforeActive = new Set(before.activeRoutes);
  const afterActive = new Set(after.activeRoutes);
  const preserved = [...afterActive].filter((id) => beforeActive.has(id));
  const added = [...afterActive].filter((id) => !beforeActive.has(id));
  const removed = [...beforeActive].filter((id) => !afterActive.has(id));
  const beforeTop = before.topRoute;
  const afterTop = after.topRoute;

  let action = "preserve";
  let route = afterTop;
  if (added.length && added.length >= removed.length) {
    action = "add";
    route = added.sort((a, b) => scoreDelta(before.routeScores, after.routeScores, b) - scoreDelta(before.routeScores, after.routeScores, a))[0];
  } else if (removed.length && preserved.length) {
    action = "project";
    route = preserved[0] || afterTop;
  } else if (beforeTop !== afterTop) {
    action = "convert";
    route = `${beforeTop}_to_${afterTop}`;
  }

  if (action === "preserve" && beforeTop !== afterTop && preserved.length) {
    action = "convert";
    route = `${beforeTop}_to_${afterTop}`;
  }

  const token = action === "convert" ? route : `${action}_${route}`;
  const substrateChanged = before.topSubstrate !== after.topSubstrate;
  return {
    from: before.id,
    to: after.id,
    action,
    route,
    token,
    preservedRoutes: preserved,
    addedRoutes: added,
    removedRoutes: removed,
    substrateChanged,
    substrateMove: substrateChanged ? `${before.topSubstrate}_to_${after.topSubstrate}` : `preserve_${after.topSubstrate}`
  };
}

function averageScores(nodes, key, specs) {
  const result = {};
  for (const spec of specs) {
    const value = nodes.reduce((acc, node) => acc + (node[key][spec.id] || 0), 0) / Math.max(1, nodes.length);
    result[spec.id] = Number(value.toFixed(3));
  }
  return result;
}

function roleCoverage(nodes) {
  const routes = new Set();
  const substrates = new Set();
  let readout = 0;
  for (const node of nodes) {
    node.activeRoutes.forEach((id) => routes.add(id));
    node.activeSubstrates.forEach((id) => substrates.add(id));
    readout = Math.max(readout, node.readoutScore);
  }
  return { routes, substrates, readout };
}

function missingRoles(nodes) {
  const coverage = roleCoverage(nodes);
  const missing = [];
  for (const route of ROUTES) {
    if (!coverage.routes.has(route.id)) {
      missing.push({
        id: route.id,
        label: route.label,
        why: `No strong ${route.short} equation was detected.`
      });
    }
  }
  if (coverage.readout < 0.35) {
    missing.push({
      id: "current_checkpoint",
      label: "Current / readout checkpoint",
      why: "The chain has weak evidence for a measured, predicted, or queried output."
    });
  }
  return missing;
}

function topScores(scores, specs, limit = 3) {
  return [...specs]
    .map((spec) => ({ id: spec.id, label: spec.label, score: scores[spec.id] || 0 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function inferAtlasState(nodes, chain, aggregateRoutes, aggregateSubstrates) {
  const routeH = entropy(aggregateRoutes);
  const substrateH = entropy(aggregateSubstrates);
  const conversions = chain.filter((move) => move.action === "convert").length;
  const boundaries = aggregateRoutes.boundary_weak_form || 0;
  const incompat = aggregateRoutes.commutator_incompatibility || 0;
  const spectral = aggregateRoutes.spectral_operator || 0;
  const closure = aggregateRoutes.constraint_closure || 0;
  const transport = aggregateRoutes.transport_flow || 0;

  if (!nodes.length) {
    return {
      label: "No equation core",
      meaning: "No clean equation sequence was detected.",
      tension: 0
    };
  }
  if (routeH > 0.82 && conversions >= 2) {
    return {
      label: "High-tension bridge",
      meaning: "Several roles compete across the chain; this is likely a mechanism junction rather than a single isolated formula.",
      tension: Number(routeH.toFixed(3))
    };
  }
  if (spectral > 0.45 && closure > 0.35 && transport > 0.25) {
    return {
      label: "Operator-core basin",
      meaning: "The chain is organized around operator, admissibility, and evolution roles.",
      tension: Number(routeH.toFixed(3))
    };
  }
  if (boundaries > 0.45 || incompat > 0.45) {
    return {
      label: "Boundary or incompatibility front",
      meaning: "The construction is controlled by domain, interface, or non-commuting operations.",
      tension: Number(routeH.toFixed(3))
    };
  }
  if (substrateH > 0.75 && routeH < 0.55) {
    return {
      label: "Substrate-switch candidate",
      meaning: "The operational role is relatively stable while the apparent substrate evidence changes.",
      tension: Number(substrateH.toFixed(3))
    };
  }
  return {
    label: "Local construction path",
    meaning: "The equations form a coherent local sequence with one or two dominant operational roles.",
    tension: Number(routeH.toFixed(3))
  };
}

function predictNextMoves(nodes, chain, missing) {
  if (!nodes.length) return [];
  const last = nodes[nodes.length - 1];
  const covered = roleCoverage(nodes);
  const routeSet = covered.routes;
  const moves = [];

  const push = (token, probability, reason) => {
    if (!moves.some((move) => move.token === token)) {
      moves.push({ token, probability, reason });
    }
  };

  if (routeSet.has("spectral_operator") && covered.readout < 0.35) {
    push("add_current_checkpoint", 0.84, "An operator/spectrum is present, but the readout rule is weak.");
  }
  if (routeSet.has("transport_flow") && !routeSet.has("constraint_closure")) {
    push("add_constraint_closure", 0.78, "Evolution is present without a strong admissibility or conservation closure.");
  }
  if (routeSet.has("constraint_closure") && !routeSet.has("boundary_weak_form")) {
    push("add_boundary_weak_form", 0.69, "A closure law is present; the next testable step is often a domain, interface, or weak-form realization.");
  }
  if (routeSet.has("spectral_operator") && routeSet.has("constraint_closure")) {
    push("preserve_spectral_operator", 0.66, "The trained morphism-chain grammar often preserves the operator role through later construction steps.");
    push("preserve_constraint_closure", 0.64, "Closure is a frequent conserved role in equation-chain continuations.");
  }
  if (last.topRoute === "constraint_closure") {
    push("constraint_closure_to_spectral_operator", 0.58, "A closed admissible space often leads to an operator or mode decomposition.");
  }
  if (last.topRoute === "spectral_operator") {
    push("spectral_operator_to_constraint_closure", 0.56, "A spectral object often needs a closure, normalization, or admissibility condition.");
  }
  if (missing.some((item) => item.id === "commutator_incompatibility") && routeSet.has("spectral_operator")) {
    push("test_commutator_incompatibility", 0.51, "If two operators are present, checking their operation order can expose the limitation of the construction.");
  }
  push("preserve_constraint_closure", 0.48, "Frequency baseline from strict equation-chain grammar.");
  push("preserve_spectral_operator", 0.45, "Frequency baseline from strict equation-chain grammar.");
  push("preserve_transport_flow", 0.42, "Frequency baseline from strict equation-chain grammar.");

  return moves.sort((a, b) => b.probability - a.probability).slice(0, 6);
}

function localEquationPrediction(node, incomingMove, outgoingMove) {
  const routeSet = new Set(node.activeRoutes.length ? node.activeRoutes : [node.topRoute]);
  const substrate = substrateLabel(node.topSubstrate);
  const observed = outgoingMove ? outgoingMove.token : null;
  let predictedToken = "preserve_constraint_closure";
  let rewrite = "Keep the formal role stable and make the next equation expose what changes, what is preserved, and what is measured.";
  let check = "Compare the role before and after the rewrite; reject the move if only notation changes.";

  if (routeSet.has("transport_flow")) {
    if (routeSet.has("spectral_operator")) {
      predictedToken = "project_spectral_operator";
      rewrite = "Project the evolution equation onto modes, eigenfunctions, rates, or a generator spectrum; keep the evolving state explicit.";
      check = "Verify that the projected modes still reproduce the original time or transport law.";
    } else {
      predictedToken = "add_constraint_closure";
      rewrite = "Add the conservation, constitutive, normalization, or source constraint that closes the transport equation.";
      check = "Check that the same state/current pair appears before and after closure.";
    }
  } else if (routeSet.has("constraint_closure")) {
    if (routeSet.has("boundary_weak_form")) {
      predictedToken = "preserve_boundary_weak_form";
      rewrite = "Carry the closure into the domain or interface statement; make the boundary term part of the equation, not a caption.";
      check = "Compute the residual with and without the boundary term.";
    } else {
      predictedToken = "constraint_closure_to_spectral_operator";
      rewrite = "Use the closed admissible space to derive an operator, mode decomposition, stability condition, or response spectrum.";
      check = "The next equation should change prediction, not only rename the constraint.";
    }
  } else if (routeSet.has("spectral_operator")) {
    if (node.readoutScore < 0.35) {
      predictedToken = "add_current_checkpoint";
      rewrite = "Add the observable, probability, flux, residual, or measured current that reads the operator output.";
      check = "State the operator domain and normalization before comparing spectra.";
    } else {
      predictedToken = "preserve_spectral_operator";
      rewrite = "Rewrite in another basis or realization while preserving the operator, generator, or spectrum.";
      check = "The eigenvalues, modes, rates, or projection rule should survive the rewrite.";
    }
  } else if (routeSet.has("boundary_weak_form")) {
    predictedToken = "boundary_weak_form_to_constraint_closure";
    rewrite = "Turn the domain, interface, or weak statement into the closure condition it imposes on admissible states.";
    check = "Test whether changing the boundary changes the residual or allowed solution set.";
  } else if (routeSet.has("commutator_incompatibility")) {
    predictedToken = "test_commutator_incompatibility";
    rewrite = "Evaluate the two operation orders explicitly and branch the derivation if the commutator or residual is nonzero.";
    check = "A valid next equation should state which joint readout is forbidden or approximate.";
  } else if (routeSet.has("discrete_protocol")) {
    predictedToken = "protocol_to_readout";
    rewrite = "Connect the ordered update, sampling rule, or protocol step to the measured probability, state, or residual.";
    check = "Changing the order of the protocol should change the predicted output if the protocol is causal.";
  }

  return {
    observedMove: observed,
    incomingMove: incomingMove ? incomingMove.token : null,
    predictedToken,
    substrate,
    rewrite,
    check
  };
}

function hasAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function equationsWith(nodes, patterns) {
  return nodes
    .filter((node) => hasAny(node.formula, patterns))
    .map((node) => node.id);
}

function buildOutcome(nodes, chain, aggregateRoutes, aggregateSubstrates, inputText) {
  const formulaText = nodes.map((node) => node.formula).join("\n");
  const allText = `${inputText || ""}\n${formulaText}`;
  const routeSet = new Set(
    topScores(aggregateRoutes, ROUTES, 6)
      .filter((item) => item.score > 0)
      .map((item) => item.id)
  );
  const substrateSet = new Set(
    topScores(aggregateSubstrates, SUBSTRATES, 5)
      .filter((item) => item.score > 0)
      .map((item) => item.id)
  );

  const polymerStress = hasAny(allText, [/\\sigma\s*_\s*\{?\s*true\s*\}?/i, /sigma_?\{?true\}?/i, /Mooney/i, /C_1|C_2/]);
  const stretch = hasAny(allText, [/\\lambda/i, /L_\s*\{?\s*x\s*\}?\/L_\s*\{?\s*x,?0\s*\}?/i]);
  const microstructure = hasAny(allText, [/S\s*=\s*\(3\\langle\\cos/i, /P\s*\(\s*l\s*\)/, /l_0/i, /stem|crystallinity|orientation/i]);

  if (polymerStress && stretch && microstructure) {
    const macroIds = equationsWith(nodes, [/\\sigma\s*_\s*\{?\s*true\s*\}?/i, /\\lambda/i, /C_1|C_2|G\s*=/]);
    const microIds = equationsWith(nodes, [/S\s*=/, /P\s*\(\s*l\s*\)/, /l_0|\\langle\\cos/i]);
    return {
      missingEquation: {
        title: "Missing equation: microstructure -> modulus",
        claim: "The chain defines stretch, true stress and modulus-like quantities, and it separately defines orientation or stem-length statistics. The missing formal step is the constitutive bridge that makes the modulus depend on those microscopic variables.",
        candidateLatex:
          "C_1(T,bpc,\\lambda)=C_{1,0}+a_S S(\\lambda,T)+a_l\\langle l\\rangle(\\lambda,T)\n" +
          "C_2(T,bpc,\\lambda)=C_{2,0}+b_S S(\\lambda,T)+b_l\\langle l\\rangle(\\lambda,T)\n" +
          "G(\\lambda,T,bpc)=2\\left(C_1+\\frac{C_2}{\\lambda}\\right)",
        why: `Macro equations ${macroIds.slice(0, 4).join(", ") || "detected"} and microstructure equations ${microIds.slice(0, 4).join(", ") || "detected"} are present, but the bridge between them is not explicit.`,
        falsifier: "Prepare samples with the same stretch, temperature and crosslink density but different orientation or stem-length distributions. If the fitted C1, C2 or G do not change, the proposed microscopic mechanism is descriptive rather than causal."
      },
      mechanismTransfer: {
        title: "Transfer: deformation-written material memory",
        sourceMechanism: "Stretch/cooling history writes a microstructural state; stress or modulus reads it later.",
        targetExperiment: "Treat the material as a memory device: write by stretch/cooling, erase by reheating or relaxation, and read by stress response at matched stretch.",
        targetLatex:
          "m(t)=(S(t),\\langle l\\rangle(t))\n" +
          "\\sigma_{true}(t)=2\\left(\\lambda^2-\\lambda^{-1}\\right)\\left[C_1(m)+\\frac{C_2(m)}{\\lambda}\\right]",
        control: "History-shuffled controls should destroy the memory term while preserving the ordinary elastic fit."
      },
      reviewer: {
        verdict: "Mechanism promising but not closed",
        severity: "medium",
        requiredFix: "Add the constitutive bridge from orientation/stem statistics to C1, C2 or G, and test it with matched-stretch controls.",
        passCondition: "The same microscopic state variables must predict modulus changes across held-out deformation and temperature histories."
      }
    };
  }

  if (routeSet.has("spectral_operator") && routeSet.has("transport_flow") && !routeSet.has("constraint_closure")) {
    return {
      missingEquation: {
        title: "Formal gap: admissible Hilbert space",
        claim: "For this Schrödinger-style chain, the missing item is not a new physical law. The displayed evolution and eigenvalue equations need the Hilbert space, normalization and operator domain conditions that make the spectrum and probability rule well defined.",
        candidateLatex: "\\|\\psi\\|_{\\mathcal H}=1,\\qquad \\psi\\in D(\\hat H),\\qquad \\hat H=\\hat H^\\dagger",
        why: "The same differential expression can define different spectra under different domains or boundary conditions. The admissible-space statement is therefore part of the mechanism, not formatting.",
        falsifier: "Use the same Hamiltonian notation with a different domain or boundary condition. If the spectrum or probabilities change, the admissible-space statement is causal; if they do not, it is decorative."
      },
      mechanismTransfer: {
        title: "Transfer: state -> generator -> readout",
        sourceMechanism: "A state evolves under a generator; admissible domains select the legal modes; a readout rule assigns measurable weights or outputs.",
        targetExperiment: "In another field, keep these roles separate: the evolving state, the generator, the admissible domain and the measured readout.",
        targetLatex: "\\dot q=Aq,\\qquad q\\in D(A),\\qquad A v_i=\\lambda_i v_i,\\qquad y_i=R_i(q)",
        control: "Change the admissible domain while holding the generator notation fixed. A real domain effect should change the modes or readout."
      },
      reviewer: {
        verdict: "Needs domain and normalization statement",
        severity: "medium",
        requiredFix: "State the Hilbert space, normalization and domain or boundary condition under which the Hamiltonian and readout are valid.",
        passCondition: "The added condition must determine the legal spectrum, modes or probabilities."
      }
    };
  }

  if (routeSet.has("transport_flow") && !routeSet.has("constraint_closure")) {
    return {
      missingEquation: {
        title: "Missing equation: closure for the transported quantity",
        claim: "The fragment contains an evolution or flux law, but it does not yet say what conservation, constitutive relation or admissibility condition closes the dynamics.",
        candidateLatex: "C(q,J,\\lambda)=0\\quad\\text{or}\\quad J=J(q,\\nabla q,B)",
        why: "Transport without closure usually leaves many trajectories compatible with the same equation.",
        falsifier: "Two different closures should make different predictions for the same initial and boundary data."
      },
      mechanismTransfer: {
        title: "Transfer: transport-memory experiment",
        sourceMechanism: "A state is transported or relaxed, but the law that selects admissible currents is missing.",
        targetExperiment: "Use the transported state as a written memory and test whether changing the closure changes the readout.",
        targetLatex: "\\partial_t q+\\nabla\\cdot J=0,\\qquad J=J(q,m,B)",
        control: "Hold the input fixed and change only the closure or boundary; the output should change if the mechanism is real."
      },
      reviewer: {
        verdict: "Mechanism underdetermined",
        severity: "high",
        requiredFix: "Specify the constitutive or conservation closure for the transported quantity.",
        passCondition: "The added closure must reduce residual error or eliminate an ambiguity in the predicted state."
      }
    };
  }

  if (routeSet.has("spectral_operator") && !routeSet.has("discrete_protocol")) {
    return {
      missingEquation: {
        title: "Missing equation: readout rule for the operator",
        claim: "An operator or spectrum is present, but the fragment does not yet specify the measured output, probability rule, residual or current checkpoint.",
        candidateLatex: "y_i=\\langle q,\\Pi_i q\\rangle\\quad\\text{or}\\quad R=\\|y_{model}-y_{data}\\|",
        why: "Operator structure becomes testable only after a readout rule maps it to observed quantities.",
        falsifier: "Two operators with the same fitted score but different readout predictions should be distinguishable by the proposed measurement."
      },
      mechanismTransfer: {
        title: "Transfer: operator-to-readout experiment",
        sourceMechanism: "A formal operator organizes possible modes, but a measurable readout is still needed.",
        targetExperiment: "Choose a field-specific readout: stress, flux, phenotype, group decision, probability or spectrum.",
        targetLatex: "\\mathcal L q=\\lambda q,\\qquad y=R(q,\\lambda,B)",
        control: "Change the operator while holding substrate and boundary fixed; the readout should change predictably."
      },
      reviewer: {
        verdict: "Prediction not yet observable",
        severity: "medium",
        requiredFix: "Add a readout equation that connects the operator to measured data.",
        passCondition: "The readout must distinguish at least two operator choices or modes."
      }
    };
  }

  if (routeSet.has("constraint_closure") && !routeSet.has("boundary_weak_form")) {
    return {
      missingEquation: {
        title: "Missing equation: realization boundary",
        claim: "The fragment has an admissibility or closure relation, but the domain, boundary or weak-form realization is not explicit.",
        candidateLatex: "\\int_\\Omega \\varphi\\,\\mathcal L q\\,dx=\\int_\\Omega \\varphi f\\,dx,\\qquad Bq=b",
        why: "A closure relation can change meaning when the boundary or test space changes.",
        falsifier: "Boundary swaps should alter the residual or allowed solution set if the boundary is part of the mechanism."
      },
      mechanismTransfer: {
        title: "Transfer: boundary-gated mechanism",
        sourceMechanism: "The same closure can be realized differently by changing the domain, interface or boundary rule.",
        targetExperiment: "Move the closure into a material, biological or collective boundary and test whether the admissible response changes.",
        targetLatex: "C(q,J,\\lambda;B)=0",
        control: "Hold the internal law fixed while changing B; the readout should change only if the boundary is causal."
      },
      reviewer: {
        verdict: "Needs realization layer",
        severity: "medium",
        requiredFix: "State the domain, boundary or weak form used by the closure.",
        passCondition: "The same closure must produce reproducible predictions under the stated realization conditions."
      }
    };
  }

  return {
    missingEquation: {
      title: "Missing equation: explicit falsifier",
      claim: "The detected chain has formal structure, but the public engine cannot yet identify a specific missing mechanism bridge.",
      candidateLatex: "R(\\theta)=\\|y_{model}(\\theta)-y_{data}\\|",
      why: "A residual or falsifier makes the mechanism operational even when the next algebraic move is ambiguous.",
      falsifier: "State one perturbation that should break the claimed mechanism while leaving a superficial fit intact."
    },
    mechanismTransfer: {
      title: "Transfer: role-preserving rewrite",
      sourceMechanism: "Preserve the strongest route while changing substrate or field terminology.",
      targetExperiment: "Choose a target field and rename only the carrier/readout, not the operator or closure role.",
      targetLatex: "source: A(q)=y\\quad\\longrightarrow\\quad target: A'(q')=y'",
      control: "If the predicted readout does not change under the target perturbation, the transfer is only analogy."
    },
    reviewer: {
      verdict: "Needs sharper mechanism target",
      severity: "review",
      requiredFix: "Add one explicit bridge equation or one falsifying residual.",
      passCondition: "The added equation must change a prediction, not only rephrase the same variables."
    }
  };
}

function mechanismStatement(nodes, aggregateRoutes, aggregateSubstrates) {
  if (!nodes.length) return "No clean equation mechanism was detected.";
  const routeNames = topScores(aggregateRoutes, ROUTES, 3).filter((item) => item.score > 0).map((item) => item.label);
  const substrateNames = topScores(aggregateSubstrates, SUBSTRATES, 2).filter((item) => item.score > 0).map((item) => item.label);
  const dominant = routeNames.length ? routeNames.join(", ") : "a weakly classified route mixture";
  const substrate = substrateNames.length ? substrateNames.join(" and ") : "an unspecified substrate";
  return `The equation sequence is organized primarily by ${dominant}. The apparent substrate is ${substrate}. Read as a construction, the chain asks which role is preserved across adjacent formulas, which role is newly added, and which missing role would make the mechanism testable.`;
}

export function analyzeText(inputText, options = {}) {
  const extracted = extractEquations(inputText);
  const equations = extracted.map((item, index) => scoreEquation(item.formula, index));
  const chain = [];
  for (let index = 1; index < equations.length; index += 1) {
    chain.push(compareEquations(equations[index - 1], equations[index]));
  }
  equations.forEach((node, index) => {
    node.localPrediction = localEquationPrediction(node, chain[index - 1] || null, chain[index] || null);
  });
  const aggregateRoutes = averageScores(equations, "routeScores", ROUTES);
  const aggregateSubstrates = averageScores(equations, "substrateScores", SUBSTRATES);
  const missing = missingRoles(equations);
  const nextMoves = predictNextMoves(equations, chain, missing);
  const atlasState = inferAtlasState(equations, chain, aggregateRoutes, aggregateSubstrates);
  const outcome = buildOutcome(equations, chain, aggregateRoutes, aggregateSubstrates, inputText);
  const shareCard = buildShareCard(equations, chain, aggregateRoutes, aggregateSubstrates, nextMoves, outcome);
  const analysis = {
    schema: "equation_xray_v1",
    sourceName: options.sourceName || "pasted input",
    equationCount: equations.length,
    equations,
    aggregateRoutes,
    aggregateSubstrates,
    chain,
    missingRoles: missing,
    nextMoves,
    atlasState,
    outcome,
    shareCard,
    mechanism: mechanismStatement(equations, aggregateRoutes, aggregateSubstrates)
  };
  analysis.markdown = renderMarkdown(analysis);
  return analysis;
}

function buildShareCard(nodes, chain, aggregateRoutes, aggregateSubstrates, nextMoves, outcome) {
  const topRouteLabels = topScores(aggregateRoutes, ROUTES, 3)
    .filter((item) => item.score > 0)
    .map((item) => item.label);
  const topSubstrateLabels = topScores(aggregateSubstrates, SUBSTRATES, 2)
    .filter((item) => item.score > 0)
    .map((item) => item.label);
  const topMove = nextMoves[0] || null;
  const present = topRouteLabels.length
    ? topRouteLabels.join(" + ")
    : "weakly classified equation chain";
  const substrate = topSubstrateLabels.length
    ? topSubstrateLabels.join(" / ")
    : "substrate not explicit";
  const missingTitle = outcome?.missingEquation?.title || "Missing equation";
  const obligation = outcome?.missingEquation?.candidateLatex || "";
  const evidence = outcome?.missingEquation?.why || "The equation chain has a detectable formal gap.";
  const grammarEvidence = topMove
    ? `Top grammar continuation: ${topMove.token} (${Math.round(topMove.probability * 100)}%).`
    : "No next grammar move was predicted.";
  const equationIds = nodes.map((node) => node.id).join(", ");
  const chainTokens = chain.slice(0, 4).map((move) => move.token).join(" -> ");
  return {
    headline: "Find the missing equation.",
    title: missingTitle,
    present,
    substrate,
    missing: missingTitle.replace(/^Missing equation:\s*/i, "").replace(/^Formal gap:\s*/i, ""),
    nextEquation: obligation,
    evidence,
    grammarEvidence,
    sourceTrace: equationIds ? `Detected equation nodes: ${equationIds}.` : "No clean equation nodes detected.",
    chainTrace: chainTokens ? `Observed moves: ${chainTokens}.` : "No adjacent morphism chain detected.",
    falsifier: outcome?.missingEquation?.falsifier || "",
    scope: "Formal completion candidate, not a claim of physical equivalence."
  };
}

export function renderMarkdown(analysis) {
  const routeLine = topScores(analysis.aggregateRoutes, ROUTES, 6)
    .map((item) => `${item.label}: ${item.score.toFixed(2)}`)
    .join("; ");
  const substrateLine = topScores(analysis.aggregateSubstrates, SUBSTRATES, 5)
    .map((item) => `${item.label}: ${item.score.toFixed(2)}`)
    .join("; ");
  const chainLines = analysis.chain.length
    ? analysis.chain.map((move) => `- ${move.from} -> ${move.to}: \`${move.token}\``).join("\n")
    : "- No adjacent equation move detected.";
  const nextLines = analysis.nextMoves.length
    ? analysis.nextMoves.map((move) => `- \`${move.token}\` (${move.probability.toFixed(2)}): ${move.reason}`).join("\n")
    : "- No next move predicted.";
  const missingLines = analysis.missingRoles.length
    ? analysis.missingRoles.map((role) => `- ${role.label}: ${role.why}`).join("\n")
    : "- No major route role is missing from the detected sequence.";
  const outcome = analysis.outcome;
  const share = analysis.shareCard;
  const outcomeLines = outcome
    ? `## Missing Equation

**${outcome.missingEquation.title}**

${outcome.missingEquation.claim}

\`\`\`latex
${outcome.missingEquation.candidateLatex}
\`\`\`

Why this is the missing link: ${outcome.missingEquation.why}

Falsifier: ${outcome.missingEquation.falsifier}

## Mechanism Transfer

**${outcome.mechanismTransfer.title}**

Source mechanism: ${outcome.mechanismTransfer.sourceMechanism}

Target experiment: ${outcome.mechanismTransfer.targetExperiment}

\`\`\`latex
${outcome.mechanismTransfer.targetLatex}
\`\`\`

Control: ${outcome.mechanismTransfer.control}

## Equation Reviewer

Verdict: **${outcome.reviewer.verdict}** (${outcome.reviewer.severity})

Required fix: ${outcome.reviewer.requiredFix}

Pass condition: ${outcome.reviewer.passCondition}`
    : "";
  const shareLines = share
    ? `## Share Card

**${share.headline}**

Present: ${share.present}

Missing: ${share.missing}

Required equation:

\`\`\`latex
${share.nextEquation}
\`\`\`

Evidence: ${share.evidence} ${share.grammarEvidence}

Scope: ${share.scope}`
    : "";
  const equationLines = analysis.equations.length
    ? analysis.equations.map((equation) => {
        const routes = equation.activeRoutes.join(", ") || equation.topRoute;
        const substrates = equation.activeSubstrates.join(", ") || equation.topSubstrate;
        const local = equation.localPrediction;
        const localLines = local
          ? `\n\nLocal move: \`${local.observedMove || local.predictedToken}\`\n\nRewrite/check: ${local.rewrite} ${local.check}`
          : "";
        return `### ${equation.id}\n\n\`\`\`latex\n${equation.formula}\n\`\`\`\n\nRoutes: ${routes}\n\nSubstrate evidence: ${substrates}${localLines}`;
      }).join("\n\n")
    : "No clean equation core was detected.";

  return `# Equation X-Ray Report

Source: ${analysis.sourceName}

## Mechanism

${analysis.mechanism}

Atlas state: **${analysis.atlasState.label}**. ${analysis.atlasState.meaning}

${outcomeLines}

${shareLines}

## Route Evidence

${routeLine || "No route evidence detected."}

## Substrate Evidence

${substrateLine || "No substrate evidence detected."}

## Morphism Chain

${chainLines}

## Predicted Next Moves

${nextLines}

## Missing Roles

${missingLines}

## Equations

${equationLines}
`;
}

export function routeLabel(id) {
  return ROUTES.find((route) => route.id === id)?.label || id;
}

export function substrateLabel(id) {
  return SUBSTRATES.find((substrate) => substrate.id === id)?.label || id;
}
