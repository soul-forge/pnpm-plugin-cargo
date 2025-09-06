/**
 * PNPM Hook - The moment Cargo Namestnik checks every package
 */

import { namestnik } from '../index';

/**
 * pnpm calls this for every package.json it reads
 * We check for cargo: protocol and awaken if needed
 */
export async function readPackage(pkg: any, context: any) {
  // Check regular dependencies
  if (pkg.dependencies) {
    for (const [name, spec] of Object.entries(pkg.dependencies)) {
      if (typeof spec === 'string' && namestnik.shouldAwaken(spec)) {
        console.log(`🦀 Cargo protocol detected: ${name} -> ${spec}`);
        
        const result = await namestnik.awaken(name, spec);
        
        // Transform cargo: to actual package or remove
        if (result.installed) {
          // Remove from npm dependencies (it's now in cargo)
          delete pkg.dependencies[name];
          
          // Store in metadata
          if (!pkg._cargo) {
            pkg._cargo = {};
          }
          pkg._cargo[name] = result;
        }
      }
    }
  }
  
  // Check devDependencies
  if (pkg.devDependencies) {
    for (const [name, spec] of Object.entries(pkg.devDependencies)) {
      if (typeof spec === 'string' && namestnik.shouldAwaken(spec)) {
        const result = await namestnik.awaken(name, spec);
        
        if (result.installed) {
          delete pkg.devDependencies[name];
          
          if (!pkg._cargo) {
            pkg._cargo = {};
          }
          pkg._cargo[name] = result;
        }
      }
    }
  }
  
  // Check for Cargo.toml in same directory
  const fs = require('fs');
  const path = require('path');
  
  if (pkg.name && context.dir) {
    const cargoToml = path.join(context.dir, 'Cargo.toml');
    
    if (fs.existsSync(cargoToml)) {
      // This is a Rust project!
      if (!pkg._cargo) {
        pkg._cargo = {};
      }
      
      pkg._cargo.manifest = cargoToml;
      pkg._cargo.type = 'rust-project';
      
      console.log(`🦀 Rust project detected: ${pkg.name}`);
    }
  }
  
  return pkg;
}

// Make it compatible with pnpm's hook system
module.exports = { readPackage };