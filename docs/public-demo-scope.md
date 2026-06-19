# Public Demo Scope

Equation X-Ray is the public, static version of the missing-equation workflow.
It is designed to launch directly from GitHub Pages and to run locally without a
private backend.

## Included

- LaTeX/equation-fragment extraction.
- Strict filtering for common prose, bibliography, figure, table and caption
  artifacts.
- Six-route operational labels:
  transport, closure, spectral/operator, boundary/weak form, commutator
  incompatibility and discrete protocol.
- Substrate evidence labels.
- Ordered morphism-chain tokens.
- Missing-equation card.
- Mechanism-transfer card.
- Equation-reviewer card.
- Markdown and JSON export.
- CLI using the same engine as the browser UI.

## Not Included

This repository does not include:

- the private Hyperion full-archive fingerprint database;
- the trained GGAE/autoencoder checkpoint;
- the trained morphism-chain decoder checkpoint;
- arXiv witness shards;
- FieldBridge target-field receptor databases;
- server-side PDF parsing;
- automatic physical-equivalence claims.

## How The Full Version Should Attach

The public demo uses `src/engine.mjs` as a deterministic stand-in. A full
backend can replace or augment that engine with:

```text
clean equation chain
-> operator/substrate fingerprints
-> autoencoder atlas basin and nearest mechanisms
-> decoder next-move probabilities
-> witness-backed missing equation
-> target-field transfer and falsifier
```

The browser contract should stay stable. The UI expects an analysis object with
equation nodes, route/substrate evidence, morphism-chain moves and an `outcome`
object containing:

- `missingEquation`
- `mechanismTransfer`
- `reviewer`

## Why Keep This Public Demo Separate

The public repo should remain small and auditable. It demonstrates the product
idea: a paper fragment can be transformed into a missing-equation hypothesis and
a falsifying check. The private backend can make the result stronger, but the
public demo should be understandable without Hyperion infrastructure.
