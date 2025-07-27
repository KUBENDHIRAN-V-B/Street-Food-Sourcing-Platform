@echo off
echo ========================================
echo   Fixing GitHub Secret Detection Issue
echo ========================================
echo.

echo Step 1: Removing sensitive file from Git history...
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch server/config/service-account-key.json" --prune-empty --tag-name-filter cat -- --all

echo.
echo Step 2: Adding service account key to .gitignore...
echo # Google Cloud Service Account (SENSITIVE - DO NOT COMMIT) >> .gitignore
echo server/config/service-account-key.json >> .gitignore
echo *.json >> .gitignore

echo.
echo Step 3: Force pushing cleaned history...
git push origin --force --all

echo.
echo ========================================
echo Secret file removed from Git history!
echo Repository should now accept pushes.
echo ========================================
pause