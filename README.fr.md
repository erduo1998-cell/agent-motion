# Agent Motion

**Transformez une vidéo face caméra en un film mis en scène avec un agent de programmation.** Vidéo + SRT complet + consignes → MP4 + projet Three.js modifiable.

[Démos](#demos) · [Démarrer](#start) · [Fonctionnement](#workflow) · [Compatibilité](#compatibility)

[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [Español](README.es.md) · **Français**

<p align="center">
  <img src="docs/images/agent-motion-cover.png" alt="Agent Motion — Des mots en mouvement" width="620">
</p>

<a id="demos"></a>

## Démos

**Comprendre les espaces verts** · 60 secondes · Original à gauche / résultat à droite

<p align="center">
  <img src="docs/media/greening.gif" alt="Espaces verts : original à gauche et film mis en scène à droite" width="620">
</p>

<p align="center"><a href="docs/media/greening.mp4">Voir le MP4 en meilleure qualité</a></p>

<details>
<summary><strong>Entraînement hybride</strong> · Ouvrir la comparaison de 60 secondes</summary>

<p align="center">
  <img src="docs/media/hybrid-opening.gif" alt="Entraînement hybride : original à gauche et film mis en scène à droite" width="620">
</p>

<p align="center"><a href="docs/media/hybrid-opening.mp4">Voir le MP4 en meilleure qualité</a></p>

</details>

<details>
<summary><strong>Communication entre enseignants et parents</strong> · Ouvrir la comparaison de 60 secondes</summary>

<p align="center">
  <img src="docs/media/communication.gif" alt="Communication scolaire : original à gauche et film mis en scène à droite" width="620">
</p>

<p align="center"><a href="docs/media/communication.mp4">Voir le MP4 en meilleure qualité</a></p>

</details>

Trois films approuvés par l’auteur, avec des timecodes source correspondants, un floutage à contours progressifs qui suit les visages, et des aperçus muets. [Versions, extraits et portée des vérifications](docs/demo-evidence.md)

<a id="start"></a>

## Démarrer

**1. Télécharger et installer**

Il vous faut seulement **Node.js 22+ et un agent de programmation**. Dans le dépôt, choisissez **Code → Download ZIP**, puis décompressez le fichier ; Git n’est pas nécessaire. Ouvrez le dossier extrait et double-cliquez sur **`start.command` sous macOS** ou **`start.bat` sous Windows**. Sous Linux ou dans le terminal de l’agent, lancez :

```sh
node scripts/bootstrap.mjs
```

`npm run onboard` lance le même programme d’installation. Il prépare les dépendances, un environnement Python dans le projet, Chromium, FFmpeg / ffprobe et le modèle de détourage, puis vérifie l’environnement et effectue un court essai de détourage. Le premier lancement nécessite une connexion internet : attendez sa fin. Vous n’avez pas à installer Python séparément ni à régler un modèle. [Guide détaillé et dépannage (anglais et chinois)](docs/getting-started.md#english)

**2. Confier les fichiers à l’agent**

Placez la vidéo et le SRT complet dans `inputs/`, ouvrez tout le dossier extrait dans votre agent et envoyez :

> Lis AGENTS.md, suis le guide d’installation si nécessaire, puis lis les deux Skills locaux du projet. Crée un film complet avec inputs/source.mp4 et inputs/source.srt. Avant la composition, prépare et vérifie un calque du présentateur détouré et synchronisé avec la vidéo d’origine. Préserve l’ordre et le minutage de la parole. Travaille dans work/my-first-film/, termine toutes les étapes et inspecte l’image et le son réels. Livre le MP4 et le projet modifiable. Réponds en français.

**Le détourage est obligatoire pour les vidéos face caméra.** L’installation fournit une méthode locale fonctionnant sur CPU ; un calque déjà préparé et adapté, ou un autre outil compatible, peut la remplacer. Une carte graphique dédiée n’est pas nécessaire. La génération d’images reste facultative.

**3. Voir le résultat**

Demandez à l’agent d’ouvrir le MP4 terminé et l’aperçu modifiable. Il peut lancer `npm run serve`, puis ouvrir la page qu’il a créée à [work/my-first-film/](http://127.0.0.1:8793/work/my-first-film/). La racine du serveur ne contient pas de film prédéfini.

<details>
<summary>Vérifications que l’agent peut effectuer</summary>

```sh
npm run doctor -- --matting
npm test
npm run smoke
```

Doctor vérifie l’environnement de détourage ; Smoke réalise un véritable rendu Three.js → H.264. Ces tests ne remplacent pas l’examen des contours de la personne et du film terminé. L’installation et ces vérifications locales n’appellent aucun service de génération payant.

</details>

<a id="workflow"></a>

## Fonctionnement

Analysez l’ensemble des sous-titres, préparez les ressources et le calque du présentateur, composez la typographie et l’espace, animez en continu, mixez le son et vérifiez le résultat.

<p align="center">
  <img src="docs/images/production-flow.png" alt="La vidéo, le SRT complet et les consignes passent par l’analyse et cinq étapes de production pour aboutir à un MP4 et un projet modifiable" width="940">
</p>

Un même auteur développe l’ouverture et le passage le plus difficile avant d’étendre le film. L’agent lit chaque étape, préserve le minutage de la parole et inspecte l’image et le son réels.

<details>
<summary>Principes de conception : sens, personnes, typographie et mouvement continu</summary>

<p align="center">
  <img src="docs/images/design-system.png" alt="Le sens d’abord, la personne dans le cadre, la typographie dans l’espace et un mouvement qui relie" width="940">
</p>

- **Le sens d’abord** : choisissez des actions qui expliquent l’idée exprimée ; préservez les éléments de preuve et leur minutage.
- **La personne dans l’espace** : conservez un calque du présentateur synchronisé, une profondeur visible et un cadrage intentionnel. Ajoutez un contour uniquement lorsque le fond d’origine est remplacé.
- **Une typographie qui a un rôle** : comparez les polices dans de vraies compositions ; établissez une hiérarchie, des points de lecture clairs et un temps de lecture suffisant.
- **Un mouvement continu** : reliez les objets et l’attention d’une idée à l’autre. Validez un extrait continu avant d’étendre le film.

</details>

<a id="compatibility"></a>

## Compatibilité

**Agents** : Codex, Claude Code, Gemini CLI, Cursor et GitHub Copilot disposent d’instructions d’entrée vers les mêmes Skills locaux. Les autres agents peuvent lire `AGENTS.md` directement. Aucune API propre à Codex n’est requise. L’environnement doit permettre l’accès aux fichiers, au terminal, au navigateur et l’inspection audiovisuelle.

**Plateformes** : les six tâches CI de Windows, macOS et Ubuntu × Node 22/24 ont validé l’installation automatique, le détourage réel sur CPU et le rendu vidéo le 20 septembre 2026. La production de films complets est attestée avec Codex ; les autres clients n’ont pas encore chacun fait l’objet d’un test indépendant de production d’un film entier. [Compatibilité et preuves des tests](docs/compatibility.md)

## Pour aller plus loin

- [Architecture](docs/architecture.md) — les deux Skills, les outils et la structure du dépôt.
- [Bibliothèque d’analyses de références](reference-library/analysis/README.md) — 43 cas, 109 intervalles illustrant des mécanismes et cinq méthodes issues de tutoriels ; uniquement du texte / JSON, sans vidéos de référence, audio, images extraites ni transcriptions complètes.
- [Contribuer](CONTRIBUTING.md) — comment apporter et vérifier des modifications.

Les README sont disponibles en cinq langues ; les Skills de référence sont maintenus en chinois. Les agents peuvent travailler dans votre langue. Vérifiez les polices, les glyphes, les retours à la ligne et le temps de lecture pour chaque film ; le doublage automatique n’est pas inclus.

## Licence

**Usage non commercial. Tout usage commercial nécessite une autorisation écrite préalable.**

Le code, les Skills, les documents et les analyses propres au projet utilisent **Motion Craft Community License 1.0**, une licence personnalisée fondée sur les termes d’Apache-2.0 avec des restrictions non commerciales. Les polices et dépendances conservent leurs licences ; les vidéos de démonstration sont exclues de l’autorisation accordée par le projet.

[Licence complète](LICENSE) · [Autorisation commerciale](COMMERCIAL-LICENSE.md) · [Mentions relatives aux tiers](THIRD_PARTY_NOTICES.md)
