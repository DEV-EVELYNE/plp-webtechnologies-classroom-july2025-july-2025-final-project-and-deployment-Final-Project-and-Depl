# Submission Summary
This submission demonstrates a focused front-end prototype for an academic journal platform. My goal was to present the core user journeys with clean, consistent UI and evaluator-friendly structure so you can open it and immediately understand what works, how to run it, and how it could evolve.

What I prioritized:
- Clear navigation and consistent layout across all pages
- Representative content blocks (hero, features, stats, footers) to communicate value
- Scaffolding for key flows: browse, submit, review, about, contact
- Simple paths to run locally without any backend setup

What you can expect to see:
- A cohesive set of static pages under `journal/` that load directly in the browser
- Reusable patterns (navbar, footer, modals) to keep the code consistent
- Obvious extension points for styling, interactivity, and data integration

## Feature Highlights
- Home landing with hero, features, stats, and newsletter sign-up (`journal/index.html`).
- Browse page placeholder for discovering publications (`journal/browse.html`).
- Submit page template for authors to start the submission process (`journal/submit.html`).
- Review page template for reviewer onboarding (`journal/review.html`).
- About page describing mission and value (`journal/about.html`).
- Contact page for support and inquiries (`journal/contact.html`).
- Auth modals (Login/Register) markup included and referenced across pages.

## Implementation Notes
- The project is intentionally static for quick review. You can open it directly in a browser.
- Common UI elements (navigation, footer, and modals) appear across pages to simulate a real product feel.
- File and section names are descriptive so it’s easy to find and extend specific areas.

## Project Structure
```
Journalhub/
├─ journal/
│  ├─ index.html       # Home page
│  ├─ browse.html      # Browse articles
│  ├─ submit.html      # Submit research
│  ├─ review.html      # Reviewer info
│  ├─ about.html       # About ScholarHub
│  └─ contact.html     # Contact page
└─ README.md
```

## How to Run
You can evaluate the prototype immediately without additional setup.

- Option 1: Open locally
  - Double-click `journal/index.html` to open it in your browser.
- Option 2: Serve with a local HTTP server (recommended for consistent relative paths)
  - Python 3
    - Run: `python -m http.server 8000` in the `Journalhub/` folder, then visit `http://localhost:8000/journal/index.html`.
  - VS Code Live Server
    - Install the Live Server extension and click "Go Live" from the `Journalhub/` folder.

## Customization
- **Branding**: Update the site title and brand name in the nav and `title` tags inside each HTML file (currently "ScholarHub").
- **Styles**: Create or edit `journal/css/styles.css` to style the site.
- **Scripts**: Create or edit `journal/js/main.js` to add interactivity (e.g., nav toggle, modal logic, loading articles dynamically).
- **Content**: Replace placeholder copy and numbers in stats with real data.

## Future Enhancements
- **Real data layer**: Fetch articles from an API or local JSON.
- **Search and filters**: Implement client-side filtering on `browse.html`.
- **Submission flow**: Add forms and validation for authors on `submit.html`.
- **Review workflow**: Add reviewer application and dashboard mocks on `review.html`.
- **Auth**: Wire login/register forms to a backend or auth provider.
- **Accessibility**: Improve ARIA labels, contrast, focus states, and keyboard navigation.

## Contributing
- Keep HTML semantic and components reusable.
- If you add assets, place them under `journal/css/` and `journal/js/` (and `journal/assets/` for images if needed) and update references accordingly.
- Open a pull request with a clear description of changes.

## License
Add your preferred license here (e.g., MIT). If unsure, consider starting with MIT so others can use and contribute easily.

## Credits
- Built as a front-end prototype for an academic publishing concept.
