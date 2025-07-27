# 🔧 Quick Fix for GitHub Secret Detection

## 🚨 Problem
GitHub detected a Google Cloud service account key file and blocked the push.

## ✅ Solution (Run these commands in order)

### Method 1: Remove from Git History (Recommended)

```cmd
# Step 1: Remove the sensitive file from Git history
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch server/config/service-account-key.json" --prune-empty --tag-name-filter cat -- --all

# Step 2: Clean up the backup refs
git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin

# Step 3: Force garbage collection
git reflog expire --expire=now --all && git gc --prune=now --aggressive

# Step 4: Force push the cleaned history
git push origin --force --all
```

### Method 2: Simpler Alternative (If Method 1 doesn't work)

```cmd
# Step 1: Reset to remove the problematic commit
git reset --hard HEAD~1

# Step 2: Add files again (without the sensitive file)
git add .

# Step 3: Commit again
git commit -m "Initial commit: Street Food Sourcing Platform (cleaned)"

# Step 4: Force push
git push -f origin main
```

### Method 3: Start Fresh (Last Resort)

```cmd
# Step 1: Remove .git folder
rmdir /s .git

# Step 2: Initialize new repository
git init

# Step 3: Add all files
git add .

# Step 4: Commit
git commit -m "Initial commit: Street Food Sourcing Platform"

# Step 5: Add remote
git remote add origin https://github.com/KUBENDHIRAN-V-B/Street-Food-Sourcing-Platform.git

# Step 6: Push
git push -u origin main
```

## 🔒 Prevention

I've already updated your `.gitignore` file to prevent this in the future. It now includes:
- `service-account-key.json`
- `**/service-account-key.json`
- `server/config/service-account-key.json`

## ⚡ Quick Command (Try this first)

Run this single command to try the simplest fix:

```cmd
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch server/config/service-account-key.json" --prune-empty --tag-name-filter cat -- --all && git push origin --force --all
```

## ✅ Verification

After running the fix, you should see:
- ✅ Push successful
- ✅ All files uploaded to GitHub
- ✅ No sensitive files in the repository
- ✅ Repository accessible at: https://github.com/KUBENDHIRAN-V-B/Street-Food-Sourcing-Platform