# Contributing to Parametrik-Labor

Thank you for your interest in contributing to Parametrik-Labor! This is an open science project exploring quantum-inspired stigmergy models for biosemiotics research. We welcome contributions from developers, researchers, and enthusiasts.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Scientific Contributions](#scientific-contributions)
- [License](#license)

---

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) before contributing.

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

When filing a bug report, include:
- **Clear title** and description
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** or GIFs if applicable
- **Environment details:**
  - Browser and version
  - Operating system
  - Device (desktop/mobile)
  - Screen resolution
- **Console errors** (open DevTools → Console)

### ✨ Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide detailed description** of the proposed feature
- **Explain why** this enhancement would be useful
- **Include mockups** or examples if applicable
- **Note any scientific implications** if relevant to the research

### 🔬 Scientific Contributions

We especially welcome contributions that:
- Improve model accuracy or performance
- Add new validation experiments
- Enhance parameter presets based on empirical data
- Improve documentation of scientific methodology
- Add references to relevant literature
- Propose falsification tests for M1/M2/M3 models

### 📝 Documentation Improvements

Documentation is crucial for this project. You can help by:
- Fixing typos or clarifying unclear sections
- Adding examples or tutorials
- Translating documentation
- Improving API documentation
- Adding JSDoc comments to code

### 💻 Code Contributions

Areas where code contributions are welcome:
- Bug fixes
- Performance optimizations
- New visualization effects
- UI/UX improvements
- Accessibility enhancements
- Test coverage
- PWA features
- Export functionality

---

## Development Setup

### Prerequisites

- **Node.js** 18+ and npm
- **Git**
- Modern browser (Chrome/Firefox/Safari/Edge)

### Initial Setup

1. **Fork the repository** on GitHub

2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Parametrik-Labor.git
   cd Parametrik-Labor
   ```

3. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/v6t2b9/Parametrik-Labor.git
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Open in browser:**
   Navigate to `http://localhost:5173`

---

## Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `perf/description` - Performance improvements
- `refactor/description` - Code refactoring
- `test/description` - Adding tests

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Build the project
npm run build

# Test the production build
npm run preview
```

### 4. Commit Your Changes

Follow our [commit guidelines](#commit-guidelines) below.

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types (avoid `any`)
- Use interfaces for object shapes
- Export types that may be reused

### React

- Use functional components with hooks
- Keep components focused and small
- Use meaningful component names
- Avoid prop drilling (use Zustand store when needed)

### Formatting

- **Indentation:** 2 spaces
- **Quotes:** Single quotes for strings
- **Semicolons:** Yes
- **Trailing commas:** Yes (multiline)
- **Line length:** 100 characters (soft limit)

### File Organization

```
src/
├── components/          # React components
│   ├── ComponentName.tsx
│   └── ...
├── engine/             # Simulation engines
│   ├── QuantumStigmergyEngine.ts
│   └── ...
├── store/              # Zustand state management
├── presets/            # Parameter presets
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### Naming Conventions

- **Components:** PascalCase (`ModelOikosPanel.tsx`)
- **Files:** PascalCase for components, camelCase for utilities
- **Variables/Functions:** camelCase
- **Constants:** UPPER_SNAKE_CASE
- **Types/Interfaces:** PascalCase
- **CSS classes:** kebab-case

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear commit history.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Formatting, missing semicolons, etc.
- `refactor:` Code restructuring
- `perf:` Performance improvements
- `test:` Adding tests
- `chore:` Maintenance tasks
- `ci:` CI/CD changes
- `build:` Build system changes

### Scope (optional)

- `engine` - Simulation engine
- `ui` - User interface
- `pwa` - PWA features
- `export` - Export functionality
- `presets` - Parameter presets
- `docs` - Documentation

### Examples

```bash
feat(pwa): add offline support with service worker

fix(engine): correct phase rotation calculation in M3 model

docs: update installation instructions for PWA

perf(rendering): optimize trail rendering with WebGL

refactor(ui): consolidate parameter panel components
```

### Guidelines

- **Subject line:**
  - Use imperative mood ("add" not "added")
  - Don't capitalize first letter
  - No period at the end
  - Max 72 characters

- **Body (optional):**
  - Explain what and why, not how
  - Wrap at 72 characters

- **Footer (optional):**
  - Reference issues: `Closes #123`
  - Breaking changes: `BREAKING CHANGE: description`

---

## Pull Request Process

### Before Submitting

1. **Update documentation** if you changed functionality
2. **Add/update tests** if applicable
3. **Run linter:** `npm run lint`
4. **Test the build:** `npm run build`
5. **Self-review** your code
6. **Rebase** on latest main if needed:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### PR Template

When creating a PR, include:

**Description:**
- What does this PR do?
- Why is this change needed?

**Type of Change:**
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

**Testing:**
- How was this tested?
- Which browsers/devices were tested?

**Screenshots:**
- Include before/after screenshots if UI changed

**Checklist:**
- [ ] Code follows style guidelines
- [ ] Self-reviewed the code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tested in multiple browsers

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, a maintainer will merge

**Note:** PRs should focus on a single feature/fix for easier review.

---

## Scientific Contributions

### Validation Experiments

When adding validation experiments:

1. Follow the template in `docs/experiments/Template_Parameter_Experiment.md`
2. Include clear hypotheses and predictions
3. Document methodology
4. Provide reproducible results
5. Reference empirical benchmarks

### Model Modifications

Changes to M1/M2/M3 models must:

1. Maintain scientific validity
2. Preserve falsification criteria
3. Document theoretical justification
4. Include validation tests
5. Update relevant documentation

### Parameter Presets

New presets should:

1. Have descriptive names
2. Produce stable, interesting patterns
3. Include comments explaining purpose
4. Be organized by category
5. Be tested across devices

---

## License

By contributing, you agree that your contributions will be licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0-or-later)**.

This means:
- Your code will remain open source
- Derivatives must also be open source
- Network use requires source disclosure
- Attribution is required

See [LICENSE](./LICENSE) for full details.

---

## Questions?

- **GitHub Issues:** For bugs and feature requests
- **Discussions:** For questions and ideas
- **Email:** Contact the maintainers for private inquiries

---

## Recognition

All contributors will be recognized in the project. Significant contributions may be acknowledged in scientific publications derived from this work.

Thank you for helping advance open science in biosemiotics research! 🧬
