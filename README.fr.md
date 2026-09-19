# Agent Motion · Vidéos face caméra avec Three.js

[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Français](README.fr.md)

> **Usage commercial soumis à une autorisation écrite préalable.** [Licence](LICENSE) · [Analyses de référence uniquement, sans vidéos originales](reference-library/analysis/README.md)

**Transformez une vidéo face caméra et ses sous-titres en un film animé avec un agent de programmation.** Les Skills locaux guident l’analyse, les ressources et la couche du présentateur, la typographie, la composition dans l’espace, l’animation continue, le son et la vérification. Vous obtenez un MP4 et un projet Three.js modifiable.

## Avant et après

Chaque GIF dure 60 secondes : source à gauche, résultat à droite, avec les visages masqués par des mosaïques opaques des deux côtés. L’entraînement et les espaces verts sont des extraits chronologiques dont les temps source sont affichés ; la communication scolaire est un passage continu. Les GIF sont muets.

![Entraînement : avant et après](docs/media/hybrid-opening.gif)

![Espaces verts : comparaison de 60 secondes, visages masqués](docs/media/greening.gif)

![Communication scolaire](docs/media/communication.gif)

Extraits de trois films approuvés par l’auteur. Ils ne valident pas toutes les règles de la version actuelle. [Versions et portée des essais](docs/demo-evidence.md).

## Installation

Prérequis : Node.js 22+, Python 3.10+, FFmpeg/ffprobe dans PATH et Chromium. Exécutez ces commandes dans le dossier du projet. setup télécharge le navigateur.

```sh
git clone https://github.com/erduo1998-cell/agent-motion.git
cd agent-motion
npm ci
npm run setup
npm run doctor
npm test
npm run smoke
```

Placez vos fichiers dans `inputs/`, puis demandez à l’agent :

> Lis AGENTS.md et les deux Skills locaux. Crée un film à partir de inputs/source.mp4 et inputs/source.srt sans modifier l’ordre ni les temps de la parole. Travaille dans work/my-first-film/. Termine l’analyse, les ressources, la couche du présentateur, la composition, l’animation, le son et la vérification réelle. Livre le MP4 et le projet modifiable. Réponds en français.

Lancez `npm run serve`, puis ouvrez la page créée par l’agent à `http://127.0.0.1:8793/work/my-first-film/`.

## Agents et systèmes

Aucune API propre à Codex n’est obligatoire. Les entrées pour Codex, Claude Code, Gemini CLI, Cursor et GitHub Copilot renvoient aux mêmes Skills. L’agent doit pouvoir gérer des fichiers, exécuter des commandes, utiliser un navigateur et inspecter l’image et le son. Les outils portables et la configuration CI couvrent Windows/macOS/Linux. Les adaptateurs ne prouvent pas une production complète sur toutes les combinaisons. Consultez les [vérifications effectuées](docs/compatibility.md).

L’agent assure le processus complet ; il ne s’agit pas d’un compilateur vidéo universel en une commande. Un auteur continu assure la cohérence du film. La génération de ressources et le détourage dépendent des outils et licences disponibles.

Cinq README sont traduits. Les Skills de référence restent en chinois, lisibles par les agents multilingues. Chaque langue exige des polices, glyphes, retours à la ligne et temps de lecture adaptés. Le doublage automatique n’est pas inclus.

[Architecture](docs/architecture.md) · [Contribuer](CONTRIBUTING.md) · [Préparation](docs/release-readiness.md)

Le code, les Skills, les documents et les analyses originaux utilisent [Motion Craft Community License 1.0](LICENSE), une licence personnalisée fondée sur les clauses Apache-2.0 avec des restrictions non commerciales. **Tout usage commercial exige une autorisation écrite préalable**. [Autorisation commerciale](COMMERCIAL-LICENSE.md). Ce n’est pas la licence Apache-2.0 standard. Polices et dépendances conservent leurs licences ; les démonstrations sont exclues. [Mentions tierces](THIRD_PARTY_NOTICES.md).
