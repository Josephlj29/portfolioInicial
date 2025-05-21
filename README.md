# Portfolio - Alex C. Developer

This is the source code for the personal portfolio website of Alex C. Developer, a Mid-Level Fullstack Developer with experience in .NET, Angular, Material Design, React, and AI integration.

The portfolio is built with [Astro](https://astro.build/).

## ✨ Features

*   Clean and modern design, inspired by current web development trends.
*   Sections: About Me, Skills, Experience, Projects, Education, and Contact.
*   Content driven by `cv.json` for easy updates.
*   Responsive design for optimal viewing on various devices.

## 🛠️ Technologies Used

*   **Framework**: Astro
*   **Frontend**:
    *   HTML, CSS, JavaScript
    *   (Conceptual experience reflected in portfolio content: Angular, React, Material Design)
*   **Backend**:
    *   (Conceptual experience reflected in portfolio content: .NET Core, C#, ASP.NET Web API)
*   **AI Integration**:
    *   (Conceptual experience reflected in portfolio content: Python, Scikit-learn, NLP API integration)
*   **Styling**: Component-specific CSS, global styles.
*   **Deployment**: Ready for deployment on platforms like Netlify, Vercel, or GitHub Pages.

## 🚀 Getting Started

### Prerequisites

*   Node.js (LTS version recommended)
*   pnpm (or npm/yarn if you prefer, but `pnpm-lock.yaml` is provided)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```

### Running in Development Mode

To start the development server:

```bash
pnpm dev
```

This will typically start the server on `http://localhost:4321`.

### Building for Production

To build the static site for production:

```bash
pnpm build
```

The output will be in the `dist/` directory.

## 📄 `cv.json`

The portfolio content (personal details, experience, projects, etc.) is primarily managed through the `cv.json` file located in the root directory. Modify this file to update the portfolio information.

## 🧪 Testing

Unit tests for JavaScript utility functions (e.g., date formatting, data sorting) are located in `src/utils/` and use a Vitest/Jest-like syntax (e.g., `*.test.js`).

To run tests (conceptual, requires test runner setup like Vitest):
```bash
# pnpm test # Or your configured test script
```

Currently, tests cover:
- `formatDateRange()`: Ensures correct formatting of date ranges for experience and education.
- `sortWorkExperiences()`: Ensures correct chronological sorting of work experiences.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Please feel free to check the [issues page](https://github.com/your-username/your-repo-name/issues).

## 📝 License

This project is currently unlicensed. You are free to add a license like MIT if you wish.
