# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.4] - 2026-05-10

### Fixed
- Cold-cache logo flicker on hero pages
- Duplicate theme logos in header during CSS load

### Changed
- Moved critical visual fixes from JS to inline CSS

## [1.2.0] - 2026-05-01

### Added
- Boost button wired to Reown wallet modal
- GitHub link resolution from repos.json data
- @usegitscan X-pill on hero pages

### Fixed
- Category chip navigation on homepage
- Repos/Products/Markets tab active state

## [1.1.0] - 2026-04-15

### Added
- Repo detail pages with real GitHub API data
- Star history and momentum gauge charts
- Data analytics page with aggregate signals
- Blog page with initial posts

### Changed
- Upgraded Reown AppKit to v1.7.18
- Featured Phantom wallet in connect modal

## [1.0.0] - 2026-04-03

### Added
- Initial release
- Repository leaderboard with category filtering
- Wallet-based auth via Reown AppKit
- Hero canvas scroll animation (61 frames)
- Dark theme with brand design tokens
- Supabase integration for persistence
- GitHub Actions CI pipeline
- Full community files (CoC, Security, Contributing)

### Infrastructure
- Next.js 15 with App Router and Turbopack
- Tailwind CSS v4 with custom design tokens
- Vercel deployment with edge caching
