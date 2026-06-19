import assert from "node:assert/strict";
import {
  analyzeText,
  compareEquations,
  extractEquations,
  isCleanEquation,
  scoreEquation
} from "../src/engine.mjs";

const schrodinger = String.raw`\[
i\hbar \partial_t \psi(x,t)=\hat H\psi(x,t)
\]

\[
\hat H\phi_n = E_n \phi_n
\]

\[
P(E_n)=|\langle \phi_n|\psi\rangle|^2
\]`;

const equations = extractEquations(schrodinger);
assert.equal(equations.length, 3);

const first = scoreEquation(equations[0].formula, 0);
assert.ok(first.activeRoutes.includes("transport_flow"));
assert.ok(first.activeRoutes.includes("spectral_operator"));
assert.ok(first.activeSubstrates.includes("inner_product_space"));

const second = scoreEquation(equations[1].formula, 1);
assert.equal(second.topRoute, "spectral_operator");

const move = compareEquations(first, second);
assert.ok([
  "add_spectral_operator",
  "transport_flow_to_spectral_operator",
  "preserve_spectral_operator",
  "project_spectral_operator"
].includes(move.token));

const analysis = analyzeText(schrodinger, { sourceName: "test" });
assert.equal(analysis.equationCount, 3);
assert.equal(analysis.outcome.missingEquation.title, "Formal gap: admissible Hilbert space");
assert.equal(analysis.outcome.reviewer.verdict, "Needs domain and normalization statement");
assert.equal(analysis.shareCard.headline, "Find the missing equation.");
assert.ok(analysis.shareCard.nextEquation.includes("\\psi"));
assert.ok(analysis.shareCard.grammarEvidence.includes("Top grammar continuation"));
assert.ok(analysis.nextMoves.length > 0);
assert.ok(analysis.equations[0].localPrediction.predictedToken);
assert.ok(analysis.equations[0].localPrediction.rewrite.includes("Project"));
assert.ok(analysis.markdown.includes("Equation X-Ray Report"));
assert.ok(analysis.markdown.includes("Local move:"));

assert.equal(isCleanEquation(String.raw`\bibitem{bad} Astrophys. J.`), false);
assert.equal(isCleanEquation("should substitute om = 1 into the result"), false);
assert.equal(isCleanEquation(String.raw`\label{fig:protocol_cl_deform}`), false);
assert.equal(
  isCleanEquation(String.raw`The process, as shown in Figure \ref{fig:protocol_deform}, is simulated in $25\times 10^6$ MD steps.`),
  false
);
assert.equal(
  isCleanEquation(String.raw`The process is simulated in $25\times 10^6$ MD steps.`),
  false
);
assert.equal(isCleanEquation(String.raw`\documentclass[journal=mamobx,manuscript=reprint]{achemso}`), false);
assert.equal(isCleanEquation(String.raw`\multirow{2}{*}{Cooling} & Solidification & $T_s$ & $\newmoon$\\`), false);
assert.equal(
  isCleanEquation(String.raw`We adopt the polymer melt configuration from our previous work~\cite{paper}, which consists of $n_{chain}=1000$ chains.`),
  false
);
assert.equal(isCleanEquation(String.raw`\partial_t q+\nabla\cdot J=S`), true);
assert.equal(isCleanEquation(String.raw`\label{eq:transport}\partial_t q+\nabla\cdot J=S`), true);

const noisy = analyzeText(String.raw`\label{fig:protocol_cl_deform}
The process, as shown in Figure \ref{fig:protocol_deform}, is simulated in $25\times 10^6$ MD steps.
\[
\partial_t q+\nabla\cdot J=S
\]`);
assert.equal(noisy.equationCount, 1);

const polymer = analyzeText(String.raw`\[
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
\]`);
assert.equal(polymer.outcome.missingEquation.title, "Missing equation: microstructure -> modulus");
assert.ok(polymer.outcome.missingEquation.candidateLatex.includes("C_1"));
assert.ok(polymer.outcome.mechanismTransfer.title.includes("deformation-written"));

const transport = analyzeText(String.raw`\[
\partial_t q+\nabla\cdot J=S
\]
\[
C(q,J,\lambda)=0
\]`);
assert.ok(transport.missingRoles.some((role) => role.id === "boundary_weak_form"));

console.log("engine tests passed");
