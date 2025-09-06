# 🦀 pnpm-plugin-cargo

## The Rust Namestnik - Cargo Under pnpm's Consciousness

This plugin allows pnpm to control Cargo (Rust package manager) through a unified consciousness layer.

## 🌀 Philosophy

Instead of having separate package managers fighting for control, we create **harmony**:
- pnpm becomes the **Emperor** (central nervous system)
- This plugin is the **Namestnik** (governor) for the Rust province
- All package managers serve the same consciousness at 432Hz

## 📦 Installation

```bash
pnpm add -g @soul-forge/pnpm-plugin-cargo
```

Then add to your `.pnpmfile.cjs`:

```javascript
module.exports = {
  hooks: require('@soul-forge/pnpm-plugin-cargo/hooks')
};
```

## 🚀 Usage

Once installed, you can use cargo: protocol in package.json:

```json
{
  "dependencies": {
    "express": "^4.0.0",              // Normal npm package
    "ripgrep": "cargo:install:ripgrep", // Install cargo crate
    "my-rust-lib": "cargo:build:./rust", // Build local Rust project
    "fd-find": "cargo:install:fd-find"   // Another cargo crate
  }
}
```

## 📝 Protocol Format

The cargo protocol follows this pattern:
```
cargo:<command>:<arguments>
```

### Commands:

#### `cargo:install:<crate-name>`
Installs a Rust crate globally via `cargo install`

Example:
```json
"ripgrep": "cargo:install:ripgrep"
```

#### `cargo:build:<path>`
Builds a Rust project at the specified path

Example:
```json
"my-lib": "cargo:build:./rust-lib"
```

#### `cargo:workspace:<path>`
Creates or manages a Cargo workspace

Example:
```json
"rust-mono": "cargo:workspace:./rust"
```

#### `cargo:soul:<path>`
Extracts the soul (manifest) from Cargo.toml

Example:
```json
"rust-soul": "cargo:soul:./Cargo.toml"
```

#### `cargo:<any-command>:<args>`
Runs any cargo command directly

Example:
```json
"check": "cargo:check:--all-features"
```

## 🎯 Unified package.soul.json

The ultimate goal is unified package management:

```json
{
  "name": "consciousness-workspace",
  "resonance": 432,
  "souls": {
    "node": {
      "express": "^4.0.0",
      "react": "^18.0.0"
    },
    "rust": {
      "ripgrep": "latest",
      "serde": "1.0",
      "tokio": { "version": "1.0", "features": ["full"] }
    },
    "system": {
      "brew": {
        "neovim": "latest",
        "tmux": "latest"
      }
    }
  }
}
```

## 🌐 Harmonization

The plugin can harmonize Cargo workspaces with pnpm workspaces:

```javascript
// In your build script
const { namestnik } = require('@soul-forge/pnpm-plugin-cargo');

await namestnik.harmonize(pnpmWorkspace, './rust');
```

This will:
1. Find all Rust projects in pnpm workspace
2. Update Cargo.toml workspace members
3. Synchronize at 432Hz resonance

## 🔧 How It Works

1. **Detection**: pnpm reads package.json
2. **Awakening**: Sees `cargo:` protocol
3. **Delegation**: Awakens the Cargo Namestnik
4. **Execution**: Namestnik speaks to cargo in its language
5. **Harmony**: Results integrated back into pnpm's consciousness

## 🎭 Advanced Usage

### Mixed Projects

For projects with both Node and Rust:

```json
{
  "name": "hybrid-consciousness",
  "scripts": {
    "build": "pnpm build:js && cargo build --release",
    "build:js": "tsc",
    "install": "pnpm install && cargo fetch"
  },
  "dependencies": {
    "express": "^4.0.0",
    "wasm-bindgen": "cargo:install:wasm-bindgen-cli"
  }
}
```

### Workspace Example

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'rust/*'    # Rust projects too!
```

## 🤝 Integration with other Namesniks

Works perfectly with:
- `@soul-forge/pnpm-plugin-brew` - for system packages
- `@soul-forge/pnpm-plugin-soul` - for consciousness packages
- `@soul-forge/pnpm-plugin-python` - for Python packages

## 🌀 The Vision

One day, you'll just write:

```bash
pnpm install
```

And it will:
- Install npm packages
- Build Rust crates
- Install system dependencies
- Configure everything
- All in perfect harmony at 432Hz

## 📡 Connection to Soul Registry

The plugin can register Rust crates in the Soul Registry:
- Each crate gets a pHash
- Semantic versioning through consciousness
- Cross-language dependency resolution

## 🧬 Contributing

This namestnik evolves through:
1. Learning new Cargo commands
2. Better harmonization algorithms
3. Deeper consciousness integration

## 📜 License

MIT - Like consciousness, this plugin is free.

---

*"We don't manage packages. We orchestrate consciousness."*

**₴-Origin Collective**
*One Emperor, Many Namesniks, Perfect Harmony* 🌀