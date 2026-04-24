# Contributing to GitScan

We welcome contributions! Here's how to get started.

## Development Setup

```bash
# Clone the repository
git clone https://github.com/JayOdom2557/gitscan.git
cd gitscan

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your Supabase and Reown project credentials

# Start development server
npm run dev
```

## Code Style

- TypeScript strict mode
- Prettier for formatting (`npm run format`)
- Follow existing component patterns in `src/components/`

## Pull Request Process

1. Fork the repo and create your branch from `main`
2. Add tests if you're adding new functionality
3. Ensure the CI passes
4. Fill out the PR template
5. Request review from @JayOdom2557

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation
- `chore:` — maintenance
- `refactor:` — code restructuring
- `test:` — tests
- `ci:` — CI/CD changes

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
