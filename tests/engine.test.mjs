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
assert.ok(analysis.nextMoves.length > 0);
assert.ok(analysis.markdown.includes("Equation X-Ray Report"));

assert.equal(isCleanEquation(String.raw`\bibitem{bad} Astrophys. J.`), false);
assert.equal(isCleanEquation("should substitute om = 1 into the result"), false);
assert.equal(isCleanEquation(String.raw`\partial_t q+\nabla\cdot J=S`), true);

const transport = analyzeText(String.raw`\[
\partial_t q+\nabla\cdot J=S
\]
\[
C(q,J,\lambda)=0
\]`);
assert.ok(transport.missingRoles.some((role) => role.id === "boundary_weak_form"));

console.log("engine tests passed");
