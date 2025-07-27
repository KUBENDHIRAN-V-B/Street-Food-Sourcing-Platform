@echo off
echo ========================================
echo   Cleaning Up GitHub Repository
echo ========================================
echo.

echo Removing setup and documentation files...

git rm --cached CLEANUP_SUMMARY.md 2>nul
git rm --cached GITHUB_FILE_STRUCTURE.md 2>nul
git rm --cached SIMPLE_GITHUB_UPLOAD.md 2>nul
git rm --cached QUICK_FIX_COMMANDS.md 2>nul
git rm --cached fix_branch_issue.bat 2>nul
git rm --cached fix_github_upload.bat 2>nul
git rm --cached upload_to_github.bat 2>nul
git rm --cached fix_secret_issue.bat 2>nul
git rm --cached cleanup_github_repo.bat 2>nul
git rm --cached remove_unwanted_files_github.md 2>nul

echo.
echo Committing changes...
git add .
git commit -m "Clean up: Remove setup scripts and documentation files"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo Repository cleaned! 
echo Check: https://github.com/KUBENDHIRAN-V-B/Street-Food-Sourcing-Platform
echo ========================================
pause