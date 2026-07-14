import assert from "node:assert/strict";
import {
  analyzeText,
  compareEquations,
  extractEquations,
  isCleanEquation,
  routeLabel,
  scoreEquation
} from "../src/engine.mjs";
import { buildShareSvg, latexToShareFormula } from "../src/share-svg.mjs";

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
assert.equal(analysis.shareCard.headline, "This theory makes a hidden jump.");
assert.equal(analysis.hiddenConstruction.biasLabel, "domain invisibility");
assert.equal(analysis.hiddenConstruction.missingRole, "admissible space / operator domain");
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
const orderParameter = polymer.equations.find((node) => node.formula.includes("cos^2"));
assert.equal(orderParameter.topRoute, "unclassified");
assert.deepEqual(orderParameter.activeRoutes, []);
assert.equal(routeLabel(orderParameter.topRoute), "Unclassified equation core");
assert.equal(orderParameter.localPrediction.predictedToken, "needs_route_classification");
assert.equal(latexToShareFormula(String.raw`C_1(T,bpc,\lambda)=C_{1,0}+a_S S(\lambda,T)`), "C_1(T,bpc,λ)=C_1,0+a_S·S(λ,T)");
assert.equal(latexToShareFormula(String.raw`\lVert\psi\rVert_{\mathcal H}=1`), "∥ψ∥_ℋ=1");
assert.equal(latexToShareFormula(String.raw`a_l\langle l\rangle(\lambda,T)`), "a_l·l̄(λ,T)");
const shareSvg = buildShareSvg(polymer);
assert.ok(shareSvg.includes("This theory makes a hidden jump."));
assert.ok(shareSvg.includes("This theory makes a hidden jump."));
assert.ok(shareSvg.includes("EQUATION TO ADD"));
assert.ok(shareSvg.includes("baseline-shift=\"sub\""));
assert.ok(shareSvg.includes("C</tspan><tspan baseline-shift=\"sub\""));
assert.equal(shareSvg.includes("\\lambda"), false);
assert.equal(shareSvg.includes("⟨ l⟩"), false);
assert.ok(shareSvg.includes("Lstem"));
assert.ok(shareSvg.includes("microstructure"));
assert.ok(shareSvg.includes("response"));

const transport = analyzeText(String.raw`\[
\partial_t q+\nabla\cdot J=S
\]
\[
C(q,J,\lambda)=0
\]`);
assert.ok(transport.missingRoles.some((role) => role.id === "boundary_weak_form"));

const diffusionTransfer = analyzeText(String.raw`\[
\partial_t u=\kappa\nabla^2u,\qquad \nabla u\cdot n|_{\partial V}=0
\]
\[
\frac{d}{dt}\int_Vu\,dV=0
\]
\[
\dot{\mathbf u}=-\kappa L_G\mathbf u,\qquad L_G\mathbf 1=0
\]
\[
\frac{d}{dt}\left(\frac12\mathbf u^TL_G\mathbf u\right)
=-\kappa\mathbf u^TL_G^2\mathbf u\leq0
\]`);
assert.ok(diffusionTransfer.equations.some((node) => node.activeSubstrates.includes("graph_topology")));
assert.equal(diffusionTransfer.outcome.reviewer.verdict, "Operational transfer contract complete");
assert.ok(diffusionTransfer.outcome.mechanismTransfer.title.includes("continuum diffusion"));
assert.equal(diffusionTransfer.hiddenConstruction.biasLabel, "completed transfer contract");
assert.equal(diffusionTransfer.shareCard.headline, "This mechanism changes carrier.");

console.log("engine tests passed");
