# Interactive Signup Form

A clean, responsive, and accessible Signup Form built using pure **HTML5**, **CSS3**, and **JavaScript** (ES6+). Zero external dependencies or build tools required.

---

## 📌 Features

- **Field Validation**:
  - **Full Name**: Requires at least 2 characters; allows only letters, spaces, hyphens, and apostrophes.
  - **Email Address**: Validated using an RFC-standard regular expression format (`name@domain.ext`).
  - **Password**: Requires a minimum of 8 characters with a mix of lowercase, uppercase, numbers, and special symbols.
- **Inline Error Feedback**: Error messages appear immediately under the problematic field without intrusive popups.
- **Password Strength Meter**: Dynamic 4-level progress bar (**Weak**, **Fair**, **Good**, **Strong**) with a real-time requirements checklist (`✓` / `✕`).
- **Show/Hide Password**: Single-click visibility toggle.
- **Form Submission Guard**: Prevents submission until all fields pass validation; automatically focuses the first invalid field.
- **Success State**: Displays a confirmation message upon successful submission.

---

## 🎯 Approach & Outcome

### Approach
1. **Clean Semantic Markup**: Used HTML5 semantic elements (`<form>`, `<label>`, `<input>`, `<button>`) with proper ARIA attributes (`aria-describedby`, `role="alert"`, `aria-live="polite"`).
2. **Minimal & Direct DOM Manipulation**: Avoided unnecessary element queries by using `input.closest('.form-group')` to dynamically manage validation states.
3. **Friendly User Experience (UX)**: Validates fields on `blur` to prevent premature nagging, then re-validates on `input` so errors clear as soon as the user corrects them.
4. **Compact CSS**: Designed a modern, compact card layout with CSS variables, smooth focus rings, and responsive typography.

### Outcome
- **Lightweight & Fast**: Loads in milliseconds with zero dependencies.
- **Accessible & Robust**: Provides immediate visual and screen-reader accessible feedback.
- **Maintainable**: Separated cleanly into three simple, readable files (`index.html`, `style.css`, `script.js`).

---

## 🚀 Deployment Configuration

Since this project consists of static files (`.html`, `.css`, `.js`), it can be deployed instantly anywhere with zero build configuration.

### Option 1: Local Setup
- **Direct Opening**: Double-click `index.html` to open it directly in any web browser.

### Option 2: GitHub Pages (Recommended Free Hosting)
1. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: signup form"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Source**, select `Deploy from a branch`.
   - Choose `main` branch and `/ (root)` folder.
   - Click **Save**. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### Option 3: Vercel / Netlify
- **Netlify**: Drag and drop the `Signup_Form` folder into [Netlify Drop](https://app.netlify.com/drop).
- **Vercel**: Run `npx vercel` in the project directory and follow the simple prompts.

---

## 🔄 Rollback Strategy & Evidence

If an issue is introduced in a new update, follow this simple rollback protocol:

### Rollback Procedure (Git)
1. **Check Git History**:
   ```bash
   git log --oneline -n 5
   ```
2. **Revert the Problematic Commit**:
   ```bash
   git revert <commit-hash>
   git push origin main
   ```
   *(Or reset to the previous stable state: `git reset --hard <previous-stable-commit>`)*

### Rollback Verification Checklist (Evidence of Health)
- [ ] Form displays properly without layout breaks.
- [ ] Submitting empty fields triggers all three inline errors.
- [ ] Entering invalid email (e.g., `test@invalid`) shows the format error message.
- [ ] Password meter correctly updates dynamically as characters are entered.
- [ ] No syntax or runtime errors appear in the browser Console (`F12` > Console tab).

---

## 💡 Interview Questions & Answers

### 1. How would you validate an email with a regular expression?
> **Answer:** By matching the input against a pattern that verifies the standard email structure:
> ```javascript
> const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
> const isValid = emailRegex.test(email);
> ```
> This ensures:
> - Valid username characters before the `@`.
> - Exactly one `@` symbol.
> - A valid domain name followed by a dot and a top-level domain (TLD) of at least 2 characters.

### 2. Why show inline errors instead of an `alert()`?
> **Answer:**
> - `alert()` creates a blocking modal dialog that interrupts the user flow and requires manual dismissal.
> - `alert()` does not visually highlight which input caused the error.
> - **Inline errors** are non-blocking, display contextual feedback right where the user is typing, and work smoothly with screen readers using `aria-live="polite"`.

### 3. How would you check password strength?
> **Answer:**
> Test the password against separate complexity criteria:
> 1. Length $\ge 8$ characters
> 2. Lowercase letter `/[a-z]/`
> 3. Uppercase letter `/[A-Z]/`
> 4. Number `/[0-9]/` and special character `/[^A-Za-z0-9]/`
>
> Score the number of passed checks from `0` to `4` and map the score to visual meter levels (Weak, Fair, Good, Strong) and checklist icons.
