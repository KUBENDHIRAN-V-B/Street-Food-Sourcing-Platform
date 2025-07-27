@echo off
echo ========================================
echo   Fixing Branch and Push Issues
echo ========================================
echo.

echo Step 1: Checking current status...
git status

echo.
echo Step 2: Checking current branch...
git branch

echo.
echo Step 3: Adding all files...
git add .

echo.
echo Step 4: Creating initial commit...
git commit -m "Initial commit: Street Food Sourcing Platform"

echo.
echo Step 5: Creating and switching to main branch...
git branch -M main

echo.
echo Step 6: Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo Upload should be completed now!
echo ========================================
pause