# Equation X-Ray

**Upload or paste equations. Find the missing equation.**

Equation X-Ray is a standalone public demo for mechanism-native scientific AI.
It does not rank papers by semantic similarity. It reads equations as ordered
construction moves: transport, closure, spectral/operator structure, boundary
realization, incompatibility, and discrete protocol.

Public demo URL after GitHub Pages is enabled:

```text
https://synthetix-institute.github.io/equation-xray/
```

The output is not a summary of a paper. It is a mechanism audit plus a concrete
construction target:

- which operational routes are active;
- which substrate the operators appear to act on;
- how adjacent equations change role;
- which role is preserved, added, projected, or converted;
- which equation is missing before the mechanism becomes testable;
- what candidate equation skeleton could close the gap;
- what mechanism transfer or experiment would test the claim;
- what a reviewer should ask the authors to add.

This repository intentionally ships a lightweight deterministic engine. It does
not include the private Hyperion fingerprint database, the trained autoencoder,
or the trained morphism-chain decoder. The public contract is stable: a full
Hyperion/FieldBridge backend can replace the browser scorer with trained
autoencoder neighborhoods, morphism-chain decoder probabilities, and source
witnesses without changing the UI.

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
https://synthetix-institute.github.io/equation-xray/
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
```

Example output:

```text
Missing equation: operator domain or normalization

The fragment evolves a state through an operator and then reads a spectrum or
probability, but the admissible state space is not explicit.

\langle\psi|\psi\rangle=1,\qquad
\hat H:D(\hat H)\subset\mathcal H\to\mathcal H

Reviewer verdict: Needs admissible-space statement.
```

## Scope

This first public version is deterministic and local. It is designed for
inspection and reproducibility, not for claiming physical equivalence between
theories.

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

It does not yet:

- parse arbitrary binary PDFs in the browser;
- ship the private full-archive fingerprints;
- include the trained autoencoder;
- include the trained morphism-chain decoder;
- prove that two theories are equivalent;
- synthesize final equations from scratch.

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
