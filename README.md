# Equation X-Ray

**Upload or paste equations. Reveal the condition the text depends on.**

Equation X-Ray is a standalone public demo for mechanism-native scientific AI.
It reads equations as ordered construction moves: transport, closure, spectral/operator structure, boundary
realization, incompatibility, and discrete protocol. The public result is a
Book X-Ray: a compact visual diagnosis of what a paper, chapter or derivation
leaves implicit.

Public demo URL after GitHub Pages is enabled:

```text
https://equation-x.synthetix.institute/
```

The output is a mechanism audit plus a concrete construction target:

- which operational routes are active;
- which substrate the operators appear to act on;
- how adjacent equations change role;
- which role is preserved, added, projected, or converted;
- which hidden dependency is being used without being stated;
- which equation is missing before the mechanism becomes testable;
- what candidate equation skeleton could close the gap;
- what breaking test would make the dependency causal rather than decorative;
- what a reviewer should ask the authors to add.

The six route rows are fixed, overlapping evidence axes rather than six
mutually exclusive classes. Their values are deterministic cue strengths
averaged over the extracted equations; they are not probabilities. A zero
means that the public rule set found no supporting cue in the supplied
fragment.

This repository intentionally ships a lightweight deterministic engine. It does
not include the private Hyperion fingerprint database, the trained autoencoder,
or the trained morphism-chain decoder. The public contract is stable: a full
Hyperion/FieldBridge backend can replace the browser scorer with trained
autoencoder neighborhoods, morphism-chain decoder probabilities, and source
witnesses without changing the UI.


## Book X-Ray Mode

The main public artifact is a shareable X-Ray card:

```text
This theory has a hidden dependency.

Visible equations: operator / closure / transport roles
Hidden dependency: domain invisibility, closure debt, bridge invisibility,
                   boundary invisibility, readout debt or falsifier debt
Predicted formal step: the typed equation condition that should be added
Breaking test: the perturbation that should change the readout if the mechanism is real
```

The tool detects recurring formal presentation biases: places where scientific writing foregrounds names,
pictures or fitted curves while the equation chain depends on an unstated domain,
closure, bridge, boundary, readout or falsifier.

## Why This Is Different

Most scientific software starts from names: paper titles, topics, keywords,
citations, claims, or embeddings of natural language. Equation X-Ray starts from
the formal object itself. A paper may describe a droplet, a neuron, a quantum
state, or a collective protocol, but the same construction move may be present:
a state evolves, a constraint closes the allowed space, an operator exposes a
spectrum, a boundary changes admissibility, an incompatibility blocks joint
readout, or a protocol orders the operation.

The central idea is simple:

```text
equations -> operational roles -> morphism chain -> next construction move
          -> missing equation -> falsifying test
```

That makes it useful as a public, inspectable front end for mechanism transfer:
the interesting object is not the local noun, but the transformation that
survives when the noun changes.

## Launch

### Web Demo

The app is a static site. Once pushed to GitHub and GitHub Pages is enabled from
`main` / root, it launches directly at:

```text
https://equation-x.synthetix.institute/
```

### Local Launch

No install is required.

```bash
git clone https://github.com/synthetix-institute/equation-xray.git
cd equation-xray
npm run start
```

Open:

```text
http://127.0.0.1:5178
```

The browser UI uses native ES modules, so a static server is more reliable than
opening `index.html` with `file://`.

You can also run the command-line analyzer:

```bash
node bin/equation-xray.mjs examples/schrodinger.tex
node bin/equation-xray.mjs examples/transport_closure.tex --json
node bin/equation-xray.mjs examples/diffusion_transfer.tex --json
```

Example output:

```text
Formal gap: admissible Hilbert space

For this Schrödinger-style chain, the missing item is not a new physical law.
The displayed evolution and eigenvalue equations need the Hilbert space,
normalization and operator domain conditions that make the spectrum and
probability rule well defined.

\|\psi\|_{\mathcal H}=1,\qquad
\psi\in D(\hat H),\qquad
\hat H=\hat H^\dagger

Reviewer verdict: Needs domain and normalization statement.
```

## Scope

This first public version is deterministic and local. It is designed for
inspection and reproducibility: every public result is produced from visible
equation-chain rules.

It proposes formal completion targets. It does not prove that two theories are
physically equivalent, certify a generated equation, or replace source,
dimensional, residual and experimental checks.

It can already:

- parse LaTeX fragments and equation-heavy text;
- keep systems of equations together when they appear in display environments;
- reject common bibliography, prose, and instruction fragments;
- label six operational routes;
- label substrate evidence separately from route evidence;
- build ordered morphism-chain tokens;
- generate a missing-equation card;
- generate a mechanism-transfer card;
- generate an equation-reviewer card;
- predict next moves using a public approximation of the trained grammar
contract.

Planned backend extensions:

- browser-side PDF extraction for equation-heavy papers and book chapters;
- public fingerprint shards with source equation witnesses;
- trained autoencoder neighborhoods for recurrent mechanism basins;
- trained morphism-chain decoder probabilities;
- formula-level decoder for candidate equation realization.

## Public Engine Contract

The browser and CLI both return the same object:

```ts
{
  equations: EquationNode[],
  aggregateRoutes: Record<RouteId, number>,
  aggregateSubstrates: Record<SubstrateId, number>,
  chain: MorphismMove[],
  nextMoves: NextMove[],
  missingRoles: MissingRole[],
  atlasState: AtlasState,
  outcome: {
    missingEquation: MissingEquation,
    mechanismTransfer: MechanismTransfer,
    reviewer: ReviewerVerdict
  },
  markdown: string
}
```

A backend can replace `src/engine.mjs` with:

- Hyperion 192D operator-substrate fingerprints;
- trained morphism-chain decoder probabilities;
- GGAE recall basins and curvature/tension neighborhoods;
- arXiv equation witnesses;
- FieldBridge target-field receptor ranking.

The UI should not need to change.

See [docs/public-demo-scope.md](docs/public-demo-scope.md) for the boundary
between this public demo and the full Hyperion backend.

## Development

```bash
npm test
```

The tests use only Node built-ins.
