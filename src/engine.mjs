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
      /\\lambda\b/,
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
      /\bincompatible|incompatibility\b/i,
      /\\sigma|\\gamma/
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
  /\\def\b|\\newcommand|\\renewcommand/i,
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
    .trim();
}

export function isFormulaLike(value) {
  const text = compactWhitespace(value);
  if (text.length < MIN_FORMULA_LENGTH) return false;
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
    if (isCleanEquation(trimmed)) addMatch(trimmed, offset);
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
        why: missingRoleText(route.id)
      });
    }
  }
  if (coverage.readout < 0.35) {
    missing.push({
      id: "current_checkpoint",
      label: "Current / readout checkpoint",
      why: "Name the output that would be compared with data: a flux, spectrum, probability, trajectory, residual, or response variable."
    });
  }
  return missing;
}

function missingRoleText(routeId) {
  const text = {
    transport_flow: "Add the evolution law: what quantity changes, flows, relaxes, or is transported?",
    constraint_closure: "Add the admissibility condition: what conservation, normalization, constitutive law, or constraint makes the evolution legal?",
    spectral_operator: "Add the operator or generator: what transformation exposes modes, rates, eigenvalues, or allowed outcomes?",
    boundary_weak_form: "Add the realization layer: what domain, interface, boundary condition, or test function makes the law physically applicable?",
    commutator_incompatibility: "Check compatibility: do two operations commute, or does their order change what can be jointly predicted?",
    discrete_protocol: "Add the ordered protocol: what update, sampling, measurement, or algorithmic step must happen first?"
  };
  return text[routeId] || "Add the missing role before treating the mechanism as testable.";
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
      moves.push({ token, probability, ...publicMoveText(token, reason) });
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

function publicMoveText(token, fallbackReason) {
  const moveText = {
    add_current_checkpoint: {
      title: "Name the measurable output",
      action: "Add the variable that the theory predicts or controls. Without it, the fragment has structure but no clear test."
    },
    add_constraint_closure: {
      title: "Add the normalization or closure condition",
      action: "State the conservation, normalization, constitutive relation, or admissibility condition that makes the prediction well-defined."
    },
    add_boundary_weak_form: {
      title: "Specify where the law acts",
      action: "Attach the equation to a domain, boundary, interface, or weak form. This turns a formal rule into a realizable physical model."
    },
    preserve_spectral_operator: {
      title: "Check whether the same operator survives",
      action: "Rewrite the fragment in another basis, domain, or field and test whether the generator, spectrum, or mode structure is preserved."
    },
    preserve_constraint_closure: {
      title: "Check whether admissibility survives",
      action: "Track the constraint through the rewrite. If the closure changes, the apparent analogy is probably only notation-level."
    },
    preserve_transport_flow: {
      title: "Check whether the same transported quantity survives",
      action: "Identify the state, current, or flux before and after the transformation. A real transfer preserves the transport role, not the variable name."
    },
    constraint_closure_to_spectral_operator: {
      title: "Turn the closed system into modes",
      action: "Once the admissible space is fixed, look for the operator or decomposition that reveals rates, modes, eigenvalues, or stable responses."
    },
    spectral_operator_to_constraint_closure: {
      title: "Normalize or constrain the spectral object",
      action: "If a spectrum or operator is present, specify the domain, normalization, boundary, or admissibility rule that makes its predictions legal."
    },
    test_commutator_incompatibility: {
      title: "Test whether operation order matters",
      action: "Apply the two transformations in both orders. If the result changes, the limitation is structural, not an experimental nuisance."
    }
  };
  return moveText[token] || {
    title: token.replaceAll("_", " "),
    action: fallbackReason
  };
}

function mechanismStatement(nodes, aggregateRoutes, aggregateSubstrates) {
  if (!nodes.length) return "No clean equation mechanism was detected.";
  const routeItems = topScores(aggregateRoutes, ROUTES, 4).filter((item) => item.score > 0);
  const substrateItems = topScores(aggregateSubstrates, SUBSTRATES, 2).filter((item) => item.score > 0);
  const routeSet = new Set(routeItems.map((item) => item.id));
  const substrate = substrateItems.length
    ? substrateItems.map((item) => item.label).join(" and ")
    : "an unspecified substrate";

  let core;
  if (routeSet.has("spectral_operator") && routeSet.has("constraint_closure") && routeSet.has("discrete_protocol")) {
    core = "This fragment builds a permitted-question machine: constraints select the admissible states, an operator exposes the allowed outcomes or modes, and a protocol assigns or updates the readout.";
  } else if (routeSet.has("spectral_operator") && routeSet.has("transport_flow")) {
    core = "This fragment turns change into modes: an evolving state is passed through an operator or generator so that rates, spectra, or stable responses become visible.";
  } else if (routeSet.has("transport_flow") && routeSet.has("constraint_closure")) {
    core = "This fragment builds a closed transport law: a quantity changes or flows, while a constraint decides which trajectories are physically admissible.";
  } else if (routeSet.has("boundary_weak_form") && routeSet.has("constraint_closure")) {
    core = "This fragment makes the boundary part of the law: admissibility is decided not only in the bulk equation, but also by the domain, interface, or weak form.";
  } else if (routeSet.has("commutator_incompatibility") && routeSet.has("spectral_operator")) {
    core = "This fragment is about incompatible questions: the order of operations changes the available spectral or measurement information.";
  } else if (routeSet.has("spectral_operator")) {
    core = "This fragment is organized around an operator: prediction depends on the modes, eigenvalues, generator, or spectrum it exposes.";
  } else if (routeSet.has("constraint_closure")) {
    core = "This fragment is organized around admissibility: it states which states or transformations are allowed before a prediction can be made.";
  } else {
    core = "This fragment contains equation structure, but the dominant mechanism is weakly resolved from the current public scorer.";
  }

  return `${core} The working substrate appears to be ${substrate}. The useful question is now concrete: which role is preserved through the equation chain, and which missing role would make the construction testable?`;
}

function routeInterpretation(analysis) {
  const routes = new Set(
    topScores(analysis.aggregateRoutes, ROUTES, 6)
      .filter((item) => item.score >= 0.15)
      .map((item) => item.id)
  );
  const statements = [];
  if (routes.has("constraint_closure")) {
    statements.push("Admissibility is active: some states or transformations are being ruled in or ruled out.");
  }
  if (routes.has("spectral_operator")) {
    statements.push("Operator structure is active: prediction is organized through modes, eigenvalues, generators, or spectra.");
  }
  if (routes.has("transport_flow")) {
    statements.push("Evolution is active: the fragment contains a changing, transported, or relaxing quantity.");
  }
  if (routes.has("boundary_weak_form")) {
    statements.push("Realization is active: the domain, interface, or weak form participates in the law.");
  }
  if (routes.has("commutator_incompatibility")) {
    statements.push("Compatibility is active: operation order may change what can be jointly predicted.");
  }
  if (routes.has("discrete_protocol")) {
    statements.push("Protocol is active: an ordered update, measurement, or probability assignment is part of the mechanism.");
  }
  return statements;
}

export function analyzeText(inputText, options = {}) {
  const extracted = extractEquations(inputText);
  const equations = extracted.map((item, index) => scoreEquation(item.formula, index));
  const chain = [];
  for (let index = 1; index < equations.length; index += 1) {
    chain.push(compareEquations(equations[index - 1], equations[index]));
  }
  const aggregateRoutes = averageScores(equations, "routeScores", ROUTES);
  const aggregateSubstrates = averageScores(equations, "substrateScores", SUBSTRATES);
  const missing = missingRoles(equations);
  const nextMoves = predictNextMoves(equations, chain, missing);
  const atlasState = inferAtlasState(equations, chain, aggregateRoutes, aggregateSubstrates);
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
    mechanism: mechanismStatement(equations, aggregateRoutes, aggregateSubstrates)
  };
  analysis.interpretation = routeInterpretation(analysis);
  analysis.markdown = renderMarkdown(analysis);
  return analysis;
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
    ? analysis.nextMoves.map((move) => `- **${move.title}** (${move.probability.toFixed(2)}): ${move.action}`).join("\n")
    : "- No next move predicted.";
  const missingLines = analysis.missingRoles.length
    ? analysis.missingRoles.map((role) => `- ${role.label}: ${role.why}`).join("\n")
    : "- No major route role is missing from the detected sequence.";
  const equationLines = analysis.equations.length
    ? analysis.equations.map((equation) => {
        const routes = equation.activeRoutes.join(", ") || equation.topRoute;
        const substrates = equation.activeSubstrates.join(", ") || equation.topSubstrate;
        return `### ${equation.id}\n\n\`\`\`latex\n${equation.formula}\n\`\`\`\n\nRoutes: ${routes}\n\nSubstrate evidence: ${substrates}`;
      }).join("\n\n")
    : "No clean equation core was detected.";

  return `# Equation X-Ray Report

Source: ${analysis.sourceName}

## What The Equations Do

${analysis.mechanism}

Atlas state: **${analysis.atlasState.label}**. ${analysis.atlasState.meaning}

## Mechanism Signals

${analysis.interpretation.length ? analysis.interpretation.map((item) => `- ${item}`).join("\n") : "- No strong mechanism signal was detected."}

## Technical Route Evidence

${routeLine || "No route evidence detected."}

## Substrate Evidence

${substrateLine || "No substrate evidence detected."}

## Morphism Chain

${chainLines}

## Suggested Checks

${nextLines}

## Missing Pieces

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
