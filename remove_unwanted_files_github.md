# 🗑️ How to Remove Unwanted Files from GitHub

## Method 1: Remove Files via GitHub Web Interface (Easiest)

### For Individual Files:
1. **Go to your repository:** https://github.com/KUBENDHIRAN-V-B/Street-Food-Sourcing-Platform
2. **Navigate to the unwanted file**
3. **Click the file name** to open it
4. **Click the trash/delete icon** (🗑️) in the top right
5. **Add commit message:** "Remove unwanted file"
6. **Click "Commit changes"**

### For Multiple Files:
1. **Go to repository main page**
2. **Click each unwanted file**
3. **Delete one by one** using the trash icon
4. **Or create a new commit** removing multiple files

---

## Method 2: Remove Files via Command Line (Local + Push)

### Remove Single File:
```cmd
# Remove file from Git and local filesystem
git rm filename.ext

# Commit the removal
git commit -m "Remove unwanted file: filename.ext"

# Push to GitHub
git push origin main
```

### Remove Multiple Files:
```cmd
# Remove multiple files
git rm file1.txt file2.js file3.md

# Or remove all files matching a pattern
git rm *.log
git rm docs/*.pdf

# Commit and push
git commit -m "Remove unwanted files"
git push origin main
```

### Remove Entire Directory:
```cmd
# Remove directory and all contents
git rm -r unwanted-folder/

# Commit and push
git commit -m "Remove unwanted directory"
git push origin main
```

---

## Method 3: Remove Files but Keep Locally

If you want to remove files from GitHub but keep them on your computer:

```cmd
# Remove from Git tracking but keep local file
git rm --cached filename.ext

# For directories
git rm -r --cached unwanted-folder/

# Add to .gitignore to prevent future commits
echo filename.ext >> .gitignore

# Commit and push
git add .gitignore
git commit -m "Remove file from tracking, add to gitignore"
git push origin main
```

---

## Method 4: Remove Files from Git History (Sensitive Files)

For files that should never have been committed (like passwords, API keys):

### Using git filter-branch:
```cmd
# Remove file from entire Git history
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch path/to/sensitive-file.json" --prune-empty --tag-name-filter cat -- --all

# Clean up
git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push to update GitHub
git push origin --force --all
```

### Using BFG Repo-Cleaner (Alternative):
```cmd
# Download BFG from https://rtyley.github.io/bfg-repo-cleaner/
# Then run:
java -jar bfg.jar --delete-files sensitive-file.json
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push origin --force --all
```

---

## Method 5: Batch Remove Common Unwanted Files

### Create a cleanup script:
```cmd
# Remove common unwanted files
git rm -r --cached node_modules/ 2>nul
git rm -r --cached .vscode/ 2>nul
git rm -r --cached .idea/ 2>nul
git rm --cached *.log 2>nul
git rm --cached .env 2>nul
git rm --cached .DS_Store 2>nul

# Commit removal
git commit -m "Remove unwanted files and directories"
git push origin main
```

---

## 🎯 Common Files to Remove from GitHub

### Development Files:
- `node_modules/` - Dependencies
- `.vscode/` - VS Code settings
- `.idea/` - IntelliJ settings
- `*.log` - Log files
- `.DS_Store` - macOS system files
- `Thumbs.db` - Windows thumbnails

### Sensitive Files:
- `.env` - Environment variables
- `config/keys/` - API keys
- `*.pem` - Private keys
- `service-account-key.json` - Google Cloud keys
- `database.sqlite` - Local databases

### Build Files:
- `build/` - Production builds
- `dist/` - Distribution files
- `.cache/` - Cache directories
- `coverage/` - Test coverage

---

## 🛡️ Prevention: Update .gitignore

Add these to your `.gitignore` to prevent future issues:

```gitignore
# Dependencies
node_modules/

# Build outputs
build/
dist/

# Environment files
.env
.env.local
.env.production

# IDE files
.vscode/
.idea/

# System files
.DS_Store
Thumbs.db

# Logs
*.log

# Sensitive files
*.key
*.pem
service-account-key.json
```

---

## ✅ Quick Commands for Your Project

Based on your Street Food project, here are specific commands:

### Remove cleanup and documentation files:
```cmd
git rm CLEANUP_SUMMARY.md
git rm GITHUB_FILE_STRUCTURE.md
git rm SIMPLE_GITHUB_UPLOAD.md
git rm QUICK_FIX_COMMANDS.md
git rm fix_branch_issue.bat
git rm fix_github_upload.bat
git rm upload_to_github.bat
git rm fix_secret_issue.bat
git commit -m "Remove setup and documentation files"
git push origin main
```

### Remove any remaining unwanted files:
```cmd
# Check what files exist
git ls-files

# Remove any unwanted ones
git rm unwanted-file.ext
git commit -m "Remove unwanted file"
git push origin main
```

---

## 🔍 Verification

After removing files, verify by:
1. **Checking GitHub repository** - files should be gone
2. **Running `git status`** - should show clean working tree
3. **Running `git ls-files`** - lists all tracked files

Choose the method that best fits your needs!