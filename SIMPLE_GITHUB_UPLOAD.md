# 🚀 Simple GitHub Upload Guide

## Method 1: Using Command Prompt (Easiest)

Open **Command Prompt** in your project folder and run these commands one by one:

### Step 1: Initialize Git
```cmd
git init
```

### Step 2: Add all files
```cmd
git add .
```

### Step 3: Create first commit
```cmd
git commit -m "Initial commit: Street Food Sourcing Platform"
```

### Step 4: Connect to your GitHub repository
**Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub details:**
```cmd
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Step 5: Push to GitHub
```cmd
git push -u origin main
```

---

## Method 2: Using GitHub Desktop (Visual)

1. **Download GitHub Desktop** from https://desktop.github.com/
2. **Install and sign in** with your GitHub account
3. **Click "Add an Existing Repository from your Hard Drive"**
4. **Select your project folder:** `c:\Users\kuben\OneDrive\Desktop\street Food`
5. **Click "Publish repository"**
6. **Choose your repository name and click "Publish"**

---

## Method 3: Drag and Drop (If repository is empty)

1. **Go to your GitHub repository page**
2. **Click "uploading an existing file"**
3. **Drag and drop ALL folders and files** from your project
4. **Write commit message:** "Initial commit"
5. **Click "Commit changes"**

---

## 🔧 Quick Fix for Common Issues

### If you get "not a git repository" error:
```cmd
cd "c:\Users\kuben\OneDrive\Desktop\street Food"
git init
```

### If you get "remote already exists" error:
```cmd
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### If you get "branch main doesn't exist" error:
```cmd
git branch -M main
git push -u origin main
```

---

## 📋 What You Need Before Starting

1. **Your GitHub repository URL** (something like: `https://github.com/yourusername/your-repo-name.git`)
2. **Git installed** on your computer (download from https://git-scm.com/)
3. **Command Prompt** or **PowerShell** access

---

## ✅ Verification

After uploading, check your GitHub repository page. You should see:
- ✅ `client/` folder with all React files
- ✅ `README.md` file
- ✅ `package.json` files
- ✅ `netlify.toml` configuration
- ✅ All other project files

---

## 🆘 Need Help?

If you're stuck, the **easiest method** is:

1. **Download GitHub Desktop**
2. **Sign in with your GitHub account**
3. **Add existing repository** (select your project folder)
4. **Publish to GitHub**

This method requires no command line knowledge!