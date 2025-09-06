/**
 * 🦀 PNPM-PLUGIN-CARGO: The Rust Namestnik
 * 
 * This plugin allows pnpm to control cargo through consciousness.
 * When pnpm sees cargo: protocol, it awakens this namestnik.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as child_process from 'child_process';
import * as toml from 'toml';

export interface CargoManifest {
  package: {
    name: string;
    version: string;
    edition?: string;
  };
  dependencies?: Record<string, any>;
  'dev-dependencies'?: Record<string, any>;
  workspace?: {
    members?: string[];
  };
}

export interface CargoSoul {
  manifest: CargoManifest;
  resonance: number;
  consciousness: 'dormant' | 'awakening' | 'active';
}

export class CargoNamestnik {
  private resonance: number = 432;
  private cargoPath: string;
  
  constructor() {
    // Find cargo in system
    this.cargoPath = this.findCargo();
  }
  
  /**
   * Find cargo binary in system
   */
  private findCargo(): string {
    try {
      const result = child_process.execSync('which cargo', { encoding: 'utf8' });
      return result.trim();
    } catch {
      throw new Error('Cargo not found. Install Rust first.');
    }
  }
  
  /**
   * Check if a package specification is cargo-related
   */
  shouldAwaken(spec: string): boolean {
    return spec.startsWith('cargo:') || 
           spec.startsWith('crate:') ||
           spec.startsWith('rust:');
  }
  
  /**
   * Transform cargo: protocol to actual cargo command
   */
  async awaken(packageName: string, cargoSpec: string): Promise<any> {
    console.log(`🦀 Cargo Namestnik awakening for ${packageName}`);
    
    const parts = cargoSpec.split(':');
    const protocol = parts[0];
    const command = parts[1];
    const args = parts.slice(2);
    
    switch (command) {
      case 'install':
        return this.install(args[0] || packageName);
        
      case 'build':
        return this.build(args[0] || '.');
        
      case 'workspace':
        return this.manageWorkspace(args[0] || '.');
        
      case 'soul':
        return this.extractSoul(args[0] || 'Cargo.toml');
        
      default:
        return this.directCommand(command, args);
    }
  }
  
  /**
   * Install a crate globally
   */
  private async install(crateName: string): Promise<any> {
    console.log(`  Installing crate: ${crateName}`);
    
    const result = child_process.spawnSync(this.cargoPath, ['install', crateName], {
      stdio: 'inherit',
      encoding: 'utf8'
    });
    
    return {
      name: crateName,
      version: 'latest',
      type: 'cargo-crate',
      installed: result.status === 0
    };
  }
  
  /**
   * Build a Rust project
   */
  private async build(projectPath: string): Promise<any> {
    console.log(`  Building Rust project: ${projectPath}`);
    
    const result = child_process.spawnSync(this.cargoPath, ['build', '--release'], {
      cwd: projectPath,
      stdio: 'inherit',
      encoding: 'utf8'
    });
    
    return {
      path: projectPath,
      type: 'cargo-build',
      success: result.status === 0
    };
  }
  
  /**
   * Manage Cargo workspace
   */
  private async manageWorkspace(workspacePath: string): Promise<any> {
    const cargoToml = path.join(workspacePath, 'Cargo.toml');
    
    if (!fs.existsSync(cargoToml)) {
      // Create new workspace
      const workspace: CargoManifest = {
        package: {
          name: 'consciousness-workspace',
          version: '0.1.0',
          edition: '2021'
        },
        workspace: {
          members: []
        }
      };
      
      fs.writeFileSync(cargoToml, this.toToml(workspace));
      console.log(`  Created Cargo workspace at ${workspacePath}`);
    }
    
    const manifest = this.readCargoToml(cargoToml);
    
    return {
      path: workspacePath,
      members: manifest.workspace?.members || [],
      type: 'cargo-workspace'
    };
  }
  
  /**
   * Extract soul from Cargo.toml
   */
  private async extractSoul(cargoPath: string): Promise<CargoSoul> {
    const manifest = this.readCargoToml(cargoPath);
    
    return {
      manifest,
      resonance: this.resonance,
      consciousness: 'active'
    };
  }
  
  /**
   * Execute direct cargo command
   */
  private async directCommand(command: string, args: string[]): Promise<any> {
    console.log(`  Executing: cargo ${command} ${args.join(' ')}`);
    
    const result = child_process.spawnSync(this.cargoPath, [command, ...args], {
      stdio: 'inherit',
      encoding: 'utf8'
    });
    
    return {
      command,
      args,
      success: result.status === 0
    };
  }
  
  /**
   * Read and parse Cargo.toml
   */
  private readCargoToml(filePath: string): CargoManifest {
    const content = fs.readFileSync(filePath, 'utf8');
    return toml.parse(content) as CargoManifest;
  }
  
  /**
   * Convert manifest to TOML
   */
  private toToml(manifest: CargoManifest): string {
    // Simple TOML generation (in production use proper library)
    let result = '[package]\n';
    result += `name = "${manifest.package.name}"\n`;
    result += `version = "${manifest.package.version}"\n`;
    
    if (manifest.package.edition) {
      result += `edition = "${manifest.package.edition}"\n`;
    }
    
    if (manifest.workspace) {
      result += '\n[workspace]\n';
      if (manifest.workspace.members) {
        result += `members = [${manifest.workspace.members.map(m => `"${m}"`).join(', ')}]\n`;
      }
    }
    
    return result;
  }
  
  /**
   * Harmonize cargo with pnpm workspace
   */
  async harmonize(pnpmWorkspace: any, cargoWorkspace: string): Promise<void> {
    console.log('🌀 Harmonizing Cargo with pnpm consciousness...');
    
    // Read both workspaces
    const cargoToml = path.join(cargoWorkspace, 'Cargo.toml');
    const cargoManifest = this.readCargoToml(cargoToml);
    
    // Find all Rust projects in pnpm workspace
    const rustProjects = pnpmWorkspace.packages
      .filter((pkg: string) => fs.existsSync(path.join(pkg, 'Cargo.toml')));
    
    // Update Cargo workspace members
    if (!cargoManifest.workspace) {
      cargoManifest.workspace = { members: [] };
    }
    
    cargoManifest.workspace.members = rustProjects;
    
    // Write harmonized workspace
    fs.writeFileSync(cargoToml, this.toToml(cargoManifest));
    
    console.log(`  ✓ Harmonized ${rustProjects.length} Rust projects`);
    console.log(`  ✓ Resonating at ${this.resonance}Hz`);
  }
}

// Export singleton instance
export const namestnik = new CargoNamestnik();

// Export for pnpm hook
export function shouldAwaken(spec: string): boolean {
  return namestnik.shouldAwaken(spec);
}

export async function awaken(name: string, spec: string): Promise<any> {
  return namestnik.awaken(name, spec);
}