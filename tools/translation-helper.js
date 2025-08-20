const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const TRANSLATION_STATUS_FILE = path.join(ROOT_DIR, 'translation_status.json');
const IGNORED_DIRS = new Set(['.git', 'node_modules', 'dist', '.husky', '.vscode']);
const IGNORED_EXTS = new Set(['.js', '.json', '.lock', '.npmrc', '.gitignore', '.ts']);
const ALLOWED_EXTS = new Set(['.md', '.yaml']);

function getFiles(dir, allFiles = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (IGNORED_DIRS.has(file)) {
            return;
        }

        if (stat.isDirectory()) {
            getFiles(filePath, allFiles);
        } else {
            const ext = path.extname(file);
            if (ALLOWED_EXTS.has(ext) && !file.endsWith('.zh-CN.md')) { // Exclude already translated files from the scan
                allFiles.push(path.relative(ROOT_DIR, filePath).replace(/\\/g, '/'));
            }
        }
    });

    return allFiles;
}

function hasChinese(text) {
    return /[\u4e00-\u9fa5]/.test(text);
}

function main() {
    console.log('Starting translation status scan...');

    const allFiles = getFiles(ROOT_DIR);
    const newTranslationStatus = {};
    let translatedCount = 0;
    let untranslatedCount = 0;

    allFiles.forEach(file => {
        const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf-8');
        const isTranslated = hasChinese(content);
        newTranslationStatus[`./${file}`] = isTranslated;

        if (isTranslated) {
            translatedCount++;
        } else {
            untranslatedCount++;
        }
    });

    console.log(`Scan complete.`);
    console.log(`- Found ${translatedCount} translated files.`);
    console.log(`- Found ${untranslatedCount} untranslated files.`);

    // Overwrite the translation status file with the new, accurate status
    fs.writeFileSync(TRANSLATION_STATUS_FILE, JSON.stringify(newTranslationStatus, null, 2));
    console.log(`Successfully updated ${TRANSLATION_STATUS_FILE}.`);
}

main();
