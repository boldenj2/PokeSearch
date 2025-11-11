
# PokeSearch

PokeSearch is a small React application for searching and browsing Pokémon by type. It provides two main ways to explore the Pokédex:

- Type search: filter and view Pokémon by one or more types.
- Gallery view: browse Pokémon grouped by type in a gallery-style layout.

The app is intended to make it easy to find Pokémon that match particular type combinations and to quickly scan a visual gallery of Pokémon grouped by type.

## Features

- Search all Pokémon by type (single or combined types).
- Gallery view showing Pokémon grouped and filterable by type.
- Responsive UI built with React.

## Getting started

Prerequisites: Node.js (16+ recommended) and npm (or yarn).

1. Install dependencies

```bash
cd /Users/boldenjones/poke-search
npm install
```

2. Run the app in development

```bash
npm start
```

Open http://localhost:3000 in your browser.

3. Build for production

```bash
npm run build
```

## How to use

- Type search: use the type selector to pick one or more Pokémon types. The results will show Pokémon that match the selected type(s).
- Gallery view: switch to the gallery page to browse Pokémon grouped by type. Use the type filters to narrow the gallery.

## Project structure (selected)

- `src/api` – API service for fetching Pokémon data.
- `src/components` – UI components: `SearchBar`, `TypeSelector`, `PokemonCard`, `PokemonModal`, etc.
- `src/pages` – Page components for the gallery and search views.

