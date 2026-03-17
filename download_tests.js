const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const https = require('https');

const dataDir = path.join(__dirname, 'data');
const testsDir = path.join(__dirname, 'minimal', 'public', 'tests');

if (!fs.existsSync(testsDir)) {
  fs.mkdirSync(testsDir, { recursive: true });
}

// Find all tmcnames
const grepCmd = `grep -r -o "tmcname=['\\"][^'\\"]*['\\"]" ${dataDir}`;
const output = execSync(grepCmd, { encoding: 'utf-8' });

const tmcnames = new Set();
const lines = output.split('\n');
for (const line of lines) {
  const match = line.match(/tmcname=['"]([^'"]+)['"]/);
  if (match) {
    tmcnames.add(match[1]);
  }
}

console.log(`Found ${tmcnames.size} exercises.`);

async function downloadExercise(tmcname) {
  const url = `https://tmc.mooc.fi/api/v8/org/mooc/courses/programming-23/exercises/${tmcname}/download`;
  const zipPath = path.join(__dirname, `${tmcname}.zip`);
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        https.get(res.headers.location, (res2) => {
          const file = fs.createWriteStream(zipPath);
          res2.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve(zipPath);
          });
        }).on('error', reject);
      } else if (res.statusCode === 200) {
        const file = fs.createWriteStream(zipPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(zipPath);
        });
      } else {
        reject(new Error(`Failed to download ${tmcname}: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function processAll() {
  const names = Array.from(tmcnames);
  for (let i = 0; i < names.length; i++) {
    const tmcname = names[i];
    const targetDir = path.join(testsDir, tmcname);
    
    if (fs.existsSync(targetDir)) {
      console.log(`[${i+1}/${names.length}] Skipping ${tmcname}, already exists.`);
      continue;
    }
    
    console.log(`[${i+1}/${names.length}] Downloading ${tmcname}...`);
    try {
      const zipPath = await downloadExercise(tmcname);
      
      // Extract test directory using unzip
      try {
        fs.mkdirSync(targetDir, { recursive: true });
        // Extract only the test directory, stripping the first two directory levels (e.g. part01/01_emoticon/)
        // Wait, different exercises might have different folder structures.
        // Let's just extract everything and then move the test folder.
        const tmpDir = path.join(__dirname, `tmp_${tmcname}`);
        fs.mkdirSync(tmpDir, { recursive: true });
        execSync(`unzip -q -o ${zipPath} -d ${tmpDir}`);
        
        // Find the test directory
        const findTestDir = (dir) => {
          const items = fs.readdirSync(dir);
          for (const item of items) {
            const fullPath = path.join(dir, item);
            if (fs.statSync(fullPath).isDirectory()) {
              if (item === 'test') return fullPath;
              const found = findTestDir(fullPath);
              if (found) return found;
            }
          }
          return null;
        };
        
        const testDir = findTestDir(tmpDir);
        if (testDir) {
          // Copy all files from testDir to targetDir
          execSync(`cp -r ${testDir}/* ${targetDir}/`);
        } else {
          console.log(`  No test directory found for ${tmcname}`);
        }
        
        // Find tmc directory
        const findTmcDir = (dir) => {
          const items = fs.readdirSync(dir);
          for (const item of items) {
            const fullPath = path.join(dir, item);
            if (fs.statSync(fullPath).isDirectory()) {
              if (item === 'tmc') return fullPath;
              const found = findTmcDir(fullPath);
              if (found) return found;
            }
          }
          return null;
        };
        
        const tmcDir = findTmcDir(tmpDir);
        if (tmcDir) {
           const targetTmcDir = path.join(targetDir, 'tmc');
           fs.mkdirSync(targetTmcDir, { recursive: true });
           execSync(`cp -r ${tmcDir}/* ${targetTmcDir}/`);
        }
        
        // Cleanup
        execSync(`rm -rf ${tmpDir}`);
        fs.unlinkSync(zipPath);
      } catch (e) {
        console.error(`  Error extracting ${tmcname}:`, e.message);
      }
    } catch (e) {
      console.error(`  Error downloading ${tmcname}:`, e.message);
    }
  }
  console.log('Done!');
}

processAll();
