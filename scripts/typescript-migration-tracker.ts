#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';

interface FileStats {
  path: string;
  lines: number;
  category: string;
}

interface MigrationReport {
  totalFiles: number;
  jsFiles: FileStats[];
  tsFiles: number;
  migrationProgress: number;
  byCategory: Record<string, { js: number; ts: number }>;
  highImpactFiles: FileStats[];
}

const APP_DIR = path.join(__dirname, '..', 'app');

/**
 * Recursively find all files with given extensions
 */
function findFiles(dir: string, extensions: string[]): string[] {
  const files: string[] = [];
  
  function walk(currentPath: string): void {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules, __mocks__, etc.
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== '__mocks__') {
          walk(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  walk(dir);
  return files;
}

/**
 * Count lines in a file
 */
function countLines(filePath: string): number {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.split('\n').length;
  } catch {
    return 0;
  }
}

/**
 * Categorize a file by its path
 */
function categorizeFile(filePath: string): string {
  const relativePath = path.relative(APP_DIR, filePath);
  
  if (relativePath.startsWith('components')) return 'components';
  if (relativePath.startsWith('core')) return 'core';
  if (relativePath.startsWith('util')) return 'util';
  if (relativePath.startsWith('reducers')) return 'reducers';
  if (relativePath.startsWith('actions')) return 'actions';
  if (relativePath.startsWith('selectors')) return 'selectors';
  
  return 'other';
}

/**
 * Generate migration report
 */
function generateReport(): MigrationReport {
  console.log('🔍 Scanning codebase for TypeScript migration status...\n');
  
  const jsFiles = findFiles(APP_DIR, ['.js', '.jsx']);
  const tsFiles = findFiles(APP_DIR, ['.ts', '.tsx']);
  
  const jsFileStats: FileStats[] = jsFiles.map(file => ({
    path: path.relative(APP_DIR, file),
    lines: countLines(file),
    category: categorizeFile(file),
  }));
  
  // Group by category
  const byCategory: Record<string, { js: number; ts: number }> = {};
  
  for (const file of jsFileStats) {
    if (!byCategory[file.category]) {
      byCategory[file.category] = { js: 0, ts: 0 };
    }
    byCategory[file.category].js++;
  }
  
  for (const file of tsFiles) {
    const category = categorizeFile(file);
    if (!byCategory[category]) {
      byCategory[category] = { js: 0, ts: 0 };
    }
    byCategory[category].ts++;
  }
  
  // Identify high-impact files (>200 lines)
  const highImpactFiles = jsFileStats
    .filter(file => file.lines > 200)
    .sort((a, b) => b.lines - a.lines);
  
  const totalFiles = jsFiles.length + tsFiles.length;
  const migrationProgress = Math.round((tsFiles.length / totalFiles) * 100);
  
  return {
    totalFiles,
    jsFiles: jsFileStats,
    tsFiles: tsFiles.length,
    migrationProgress,
    byCategory,
    highImpactFiles,
  };
}

/**
 * Print report to console
 */
function printReport(report: MigrationReport): void {
  console.log('📊 TypeScript Migration Status Report');
  console.log('=====================================\n');
  
  console.log(`📁 Total Files: ${report.totalFiles}`);
  console.log(`✅ TypeScript Files: ${report.tsFiles}`);
  console.log(`⚠️  JavaScript Files: ${report.jsFiles.length}`);
  console.log(`📈 Migration Progress: ${report.migrationProgress}%\n`);
  
  console.log('📂 By Category:');
  console.log('---------------');
  
  const categories = Object.keys(report.byCategory).sort();
  for (const category of categories) {
    const { js, ts } = report.byCategory[category];
    const total = js + ts;
    const percent = total > 0 ? Math.round((ts / total) * 100) : 0;
    console.log(`  ${category.padEnd(15)} | JS: ${js.toString().padStart(3)} | TS: ${ts.toString().padStart(4)} | ${percent}% migrated`);
  }
  
  console.log('\n🎯 High-Impact Files (>200 lines):');
  console.log('-----------------------------------');
  
  if (report.highImpactFiles.length === 0) {
    console.log('  None! 🎉');
  } else {
    for (const file of report.highImpactFiles.slice(0, 20)) {
      console.log(`  ${file.path} (${file.lines} lines) [${file.category}]`);
    }
    
    if (report.highImpactFiles.length > 20) {
      console.log(`  ... and ${report.highImpactFiles.length - 20} more`);
    }
  }
  
  console.log('\n📋 All JavaScript Files:');
  console.log('------------------------');
  
  const filesByCategory: Record<string, string[]> = {};
  for (const file of report.jsFiles) {
    if (!filesByCategory[file.category]) {
      filesByCategory[file.category] = [];
    }
    filesByCategory[file.category].push(file.path);
  }
  
  for (const category of Object.keys(filesByCategory).sort()) {
    console.log(`\n  ${category}:`);
    for (const file of filesByCategory[category].sort()) {
      console.log(`    - ${file}`);
    }
  }
}

/**
 * Save report to JSON file
 */
function saveReportToFile(report: MigrationReport): void {
  const outputPath = path.join(__dirname, '..', 'typescript-migration-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`\n💾 Report saved to: ${outputPath}`);
}

/**
 * Save report as Markdown
 */
function saveReportAsMarkdown(report: MigrationReport): void {
  const outputPath = path.join(__dirname, '..', 'typescript-migration-report.md');
  
  let markdown = '# TypeScript Migration Status Report\n\n';
  markdown += `Generated: ${new Date().toISOString()}\n\n`;
  markdown += '## Summary\n\n';
  markdown += `- **Total Files**: ${report.totalFiles}\n`;
  markdown += `- **TypeScript Files**: ${report.tsFiles}\n`;
  markdown += `- **JavaScript Files**: ${report.jsFiles.length}\n`;
  markdown += `- **Migration Progress**: ${report.migrationProgress}%\n\n`;
  
  markdown += '## Progress by Category\n\n';
  markdown += '| Category | JavaScript | TypeScript | Total | Progress |\n';
  markdown += '|----------|-----------|-----------|-------|----------|\n';
  
  const categories = Object.keys(report.byCategory).sort();
  for (const category of categories) {
    const { js, ts } = report.byCategory[category];
    const total = js + ts;
    const percent = total > 0 ? Math.round((ts / total) * 100) : 0;
    markdown += `| ${category} | ${js} | ${ts} | ${total} | ${percent}% |\n`;
  }
  
  markdown += '\n## High-Impact Files (>200 lines)\n\n';
  
  if (report.highImpactFiles.length === 0) {
    markdown += 'None! 🎉\n';
  } else {
    markdown += '| File | Lines | Category |\n';
    markdown += '|------|-------|----------|\n';
    
    for (const file of report.highImpactFiles.slice(0, 20)) {
      markdown += `| ${file.path} | ${file.lines} | ${file.category} |\n`;
    }
  }
  
  fs.writeFileSync(outputPath, markdown);
  console.log(`📝 Markdown report saved to: ${outputPath}`);
}

/**
 * Main execution
 */
function main(): void {
  const report = generateReport();
  printReport(report);
  saveReportToFile(report);
  saveReportAsMarkdown(report);
  
  console.log('\n✨ Migration tracking complete!\n');
}

main();
