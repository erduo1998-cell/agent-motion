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

**1. Préparer l’environnement**

Installez Node.js 22+, Python 3.10+ et FFmpeg / ffprobe, et rendez-les accessibles dans PATH. Ces commandes fonctionnent dans PowerShell et les shells POSIX ; setup télécharge Chromium.

```sh
git clone https://github.com/erduo1998-cell/agent-motion.git
cd agent-motion
npm ci
npm run setup
npm run doctor
```

**2. Transmettre les consignes à l’agent**

Placez votre vidéo et le SRT complet dans `inputs/`, ouvrez le dépôt dans votre agent de programmation et envoyez :

> Lis AGENTS.md et les deux Skills locaux du projet. Crée un film face caméra complet à partir de inputs/source.mp4 et inputs/source.srt. Préserve l’ordre et le minutage de la parole d’origine. Travaille dans work/my-first-film/. Termine toutes les étapes de production et inspecte le résultat réel. Livre le MP4 et le projet modifiable. Réponds en français.

**3. Voir le résultat**

Lancez `npm run serve`, puis ouvrez la page du film créée par votre agent à l’adresse [work/my-first-film/](http://127.0.0.1:8793/work/my-first-film/). La racine du serveur ne contient pas de film prédéfini.

<details>
<summary>Vérifier l’installation et le rendu</summary>

```sh
npm test
npm run smoke
```

Le test de bon fonctionnement réalise un véritable rendu Three.js → H.264. L’installation et la vérification ne font appel à aucun service de génération payant. La génération d’images et le détourage facultatifs dépendent des outils et licences dont vous disposez.

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

**Plateformes** : les six tâches CI de Windows, macOS et Ubuntu × Node 22/24 ont réussi l’installation, les tests et le rendu réel. La production de films complets est attestée avec Codex ; les autres clients n’ont pas encore chacun fait l’objet d’un test indépendant de production d’un film entier. [Compatibilité et preuves des tests](docs/compatibility.md)

## Pour aller plus loin

- [Architecture](docs/architecture.md) — les deux Skills, les outils et la structure du dépôt.
- [Bibliothèque d’analyses de références](reference-library/analysis/README.md) — 43 cas, 109 intervalles illustrant des mécanismes et cinq méthodes issues de tutoriels ; uniquement du texte / JSON, sans vidéos de référence, audio, images extraites ni transcriptions complètes.
- [Contribuer](CONTRIBUTING.md) — comment apporter et vérifier des modifications.

Les README sont disponibles en cinq langues ; les Skills de référence sont maintenus en chinois. Les agents peuvent travailler dans votre langue. Vérifiez les polices, les glyphes, les retours à la ligne et le temps de lecture pour chaque film ; le doublage automatique n’est pas inclus.

## Licence

**Usage non commercial. Tout usage commercial nécessite une autorisation écrite préalable.**

Le code, les Skills, les documents et les analyses propres au projet utilisent **Motion Craft Community License 1.0**, une licence personnalisée fondée sur les termes d’Apache-2.0 avec des restrictions non commerciales. Les polices et dépendances conservent leurs licences ; les vidéos de démonstration sont exclues de l’autorisation accordée par le projet.

[Licence complète](LICENSE) · [Autorisation commerciale](COMMERCIAL-LICENSE.md) · [Mentions relatives aux tiers](THIRD_PARTY_NOTICES.md)
