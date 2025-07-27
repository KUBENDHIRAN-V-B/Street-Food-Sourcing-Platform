@echo off
echo ========================================
echo   Adding Project to GitHub Repository
echo ========================================
echo.

echo Step 1: Initializing Git repository...
git init

echo.
echo Step 2: Adding all files...
git add .

echo.
echo Step 3: Creating initial commit...
git commit -m "Initial commit: Street Food Sourcing Platform"

echo.
echo Step 4: Adding GitHub remote...
echo IMPORTANT: Replace 'yourusername' and 'your-repo-name' with your actual GitHub username and repository name
echo Example: git remote add origin https://github.com/kuben/street-food-platform.git
echo.
echo Please run this command manually with your repository URL:
echo git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
echo.

echo Step 5: After adding remote, push to GitHub:
echo git push -u origin main
echo.

echo ========================================
echo Git repository initialized and files committed!
echo Now manually add your GitHub remote URL and push.
echo ========================================
pause