#!/usr/bin/env bash
set -e

echo "=== Silex Packaging Dry-Run Verification ==="

echo "1. Checking Cargo workspace..."
cargo check --workspace
cargo test --workspace

echo "2. Packaging crates/silex-core (Cargo dry-run)..."
(cd crates/silex-core && cargo package --allow-dirty --no-verify)

echo "3. Building TypeScript npm package (packages/silex-ui)..."
(cd packages/silex-ui && npm run build)

echo "4. Packing npm package (npm dry-run)..."
(cd packages/silex-ui && npm pack --dry-run)

echo "=== All Packaging Verifications Passed! ==="
