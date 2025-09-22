 HEAD
# 📦 Final Assignment: Build, Organize, and Deploy a Multipage Website

You're now ready to bring everything together—HTML, CSS, JavaScript, planning, structure, and deployment. This final project challenges you to **conceptualize, build, and deploy a multi-page website** that is responsive, interactive, and ready for the real world.

This assignment will guide you from planning your site all the way to deploying it online. Let’s make your project *production-worthy*! 🚀

---

## 🌐🎯 Part 1: Planning and Organizing a Multipage Website

Before you write any code, take time to plan:

* Define your website's purpose (portfolio, product showcase, blog, etc.)
* Outline 3–5 pages (e.g., Home, About, Services, Contact, Gallery)
* Sketch or describe the layout of each page
* Map out internal navigation (how pages link to one another)

**Goal:** Show intentional structure and user journey across the site.

---

## 🌍💻 Part 2: Build the Website Using HTML5, CSS, and JavaScript

Using your plan, begin building:

* Use HTML5 for semantic structure
* Apply CSS for responsive layout, styling, and animations
* Use JavaScript to add interactivity (menus, forms, toggles, dynamic content)

Each page should:

* Be mobile-responsive
* Share a consistent layout/header/footer
* Include at least one interactive element (e.g., form validation, toggle menu, animation on scroll)

**Goal:** Integrate everything you’ve learned in a cohesive, functioning project.

---

## 🛠️🚀 Part 3: Best Practices for Code Organization

Before deployment, refactor your project to follow production-friendly practices:

* Organize files in folders (`/css`, `/js`, `/images`, etc.)
* Write clean, modular, and commented code
* Use meaningful file names and relative paths
* Validate your HTML/CSS and test on different screen sizes

**Goal:** Prepare your codebase to be readable, maintainable, and scalable.

---

## 🌐🚀 Part 4: Introduction to Hosting and Deployment

Once your project is complete, choose a method to **host your site online**.

You can use:

* **GitHub Pages** (great for portfolios and static sites)
* **Netlify** (powerful CI/CD features and easy form support)
* **Vercel** (lightning-fast deployment for frontend projects)

Deploy your project and confirm that:

* All links and scripts work
* It loads properly on mobile and desktop
* It has a clear, shareable URL

**Goal:** Publish your work online and make it accessible to the world.



## Deliverables

1. A GitHub repository containing:

   * Your complete project code, properly organized
   * A `README.md` file explaining your project purpose, structure, and live URL
2. A live deployed website (hosted via GitHub Pages, Netlify, or Vercel)



## Outcome

* Clarity and thoroughness of planning documentation
* Proper use of HTML5, CSS, and JavaScript across multiple pages
* Responsive and accessible design
* Clean, well-organized, and commented code
* Successful live deployment with a working link
* Evidence of following best practices

# ScholarHub — Academic Journal Platform (Frontend Demo)

ScholarHub is a responsive, modern academic journal platform built with HTML5, CSS3, and vanilla JavaScript. It demonstrates key workflows for an academic publishing system: browsing articles, submission, and peer review — plus user authentication via localStorage.

This is a frontend-only demo. All data (users, sessions, submissions) is stored in your browser's localStorage.

## Features
- **Responsive UI** with a modern, accessible design
- **Pages**: Home, Browse, Submit, Review, About, Contact
- **Auth**: Register/Login/Logout, role selection (Author/Reviewer), session state in navbar
- **Browse**: Search, category and year filtering; seeded sample articles
- **Submit**: Create a submission (metadata stored in localStorage)
- **Review**: View the review queue and decide Accept/Reject/Pending with comments
- **Interactivity**: Image/feature slider, form validation, newsletter subscription stub

## Tech Stack
- **HTML5** for semantic structure
- **CSS3** for styling and responsive layouts
- **JavaScript (ES6)** for interactivity and client-side data management
- **Font Awesome** for icons (via CDN)

## Directory Structure
```
ScholarHub/
├─ index.html           # Home
├─ browse.html          # Browse articles with filters
├─ submit.html          # Submit research (requires login)
├─ review.html          # Review queue & decisions (requires login)
├─ about.html           # About + animated stats
├─ contact.html         # Contact form
├─ css/
│  └─ styles.css        # Global styles & responsive rules
└─ js/
   └─ main.js           # Auth, storage, UI logic, page scripts
```

## Getting Started
1. Open `index.html` directly in a modern browser, or serve the folder with a simple static server for best results.
   - Example (Python): `python -m http.server` then open `http://localhost:8000`
   - Example (VS Code): Use the Live Server extension
2. Navigate through the navbar to explore pages.

## Usage Guide
- **Register**
  - Open any page and click `Register`.
  - About/Browse/Submit/Review/Contact include a Role dropdown; Home’s register defaults to Author.
- **Login**
  - Use the registered credentials to sign in; the navbar shows your name and a `Logout` option.
- **Browse**
  - Use the search bar, category, and year filters. Seed data is preloaded on first run.
- **Submit**
  - You must be logged in. Fill in Title, Authors, Abstract, Category, Keywords.
  - Click `Submit` to save the submission to localStorage.
- **Review**
  - You must be logged in. Click `Review` to set `accept/reject/pending` and optionally add comments.

## Data & Persistence
- All data is stored in `localStorage` under these keys:
  - `sh_users` — registered users
  - `sh_session` — current session
  - `sh_articles` — seeded articles list
  - `sh_submissions` — created submissions
- To reset data, clear your browser site data or remove these keys via DevTools.

## Accessibility & Responsiveness
- Mobile-first layout with a collapsible navigation menu
- Semantic headings and labels on forms
- Sufficient color contrast and focusable controls

## Browser Support
- Latest versions of Chrome, Edge, Firefox, and Safari

## Limitations (Demo Only)
- No real backend; file uploads are disabled
- Passwords are stored in localStorage (not secure). Do not use real credentials.
- Review actions are not access-controlled beyond a basic login check in this demo.

## Customization
- Update colors, spacing, and components in `css/styles.css`
- Extend logic or integrate a backend in `js/main.js`
- Add pages (e.g., Dashboard, Article Detail) following the existing structure

## License
This demo is provided as-is for educational purposes.

# ScholarHub
This project was completed by Evelyne. (completed task)

