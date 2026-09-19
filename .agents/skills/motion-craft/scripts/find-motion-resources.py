#!/usr/bin/env python3
"""Read-only discovery of installed motion references; no imports from those files."""
import argparse
import json
import os
from pathlib import Path

MOTION = ('hyperframes-animation', 'hyperframes-motion')
DESIGN = ('hyperframes-creative', 'hyperframes-design')
CATALOG = {
    'ui': [
        ('contact', 'Input and target react to the same contact', MOTION, ('rules/physics-press-reaction.md',)),
        ('click', 'Cursor arrival and visible click feedback', MOTION, ('rules/cursor-click-ripple.md',)),
        ('morph', 'Content identity across a container change', MOTION, ('rules/card-morph-anchor.md',)),
        ('camera', 'Coordinate relationship between camera and focal point', MOTION, ('rules/camera-cursor-tracking.md',)),
        ('scene', 'Optional scene-level orchestration', MOTION, ('blueprints/cursor-ui-demo.md', 'blueprints/workflow-approve-press.md')),
        ('example', 'Runnable example; style and copy are not defaults', MOTION, ('examples/workflow-approve-press.html',)),
    ],
    'type': [
        ('sequence', 'Allocate text states from content', MOTION, ('rules/dynamic-content-sequencing.md',)),
        ('rhythm', 'Phrase changes and emphasis', MOTION, ('rules/kinetic-beat-slam.md', 'rules/discrete-text-sequence.md')),
        ('type', 'Font implementation and visual roles; adapt to the language', DESIGN, ('references/typography.md',)),
        ('scene', 'Optional kinetic typography orchestration', MOTION, ('blueprints/kinetic-type-beats.md', 'blueprints/messaging-multi-phrase.md')),
        ('example', 'Runnable text-state example; not a universal fast-cut rhythm', MOTION, ('examples/messaging-multi-phrase.html',)),
    ],
    'transition': [
        ('morph', 'Identity and geometry at a handoff', MOTION, ('rules/card-morph-anchor.md',)),
        ('displacement', 'An entering object causes another to move', MOTION, ('rules/reactive-displacement.md',)),
        ('catalog', 'Select a transition by its purpose', MOTION, ('transitions/catalog.md',)),
        ('scene', 'Optional spatial connection between phases', MOTION, ('blueprints/spatial-pan-stations.md', 'blueprints/concept-demo-decode-pan.md')),
        ('example', 'Runnable connected-phase example', MOTION, ('examples/concept-demo-decode-pan.html',)),
    ],
    'layout': [
        ('construction', 'Key-state layout before animation', ('general-video',), ('SKILL.md',)),
        ('type', 'Actual fonts, weights, and readable text', DESIGN, ('references/typography.md',)),
        ('composition', 'Composition relationships for current content', DESIGN, ('references/composition-patterns.md',)),
        ('identity', 'Preserve an existing project identity', DESIGN, ('references/design-spec.md',)),
    ],
}


def locate(roots, packages, alternatives):
    for root in roots:
        for package in packages:
            for relative in alternatives:
                candidate = root / package / relative
                if candidate.is_file():
                    return {'path': str(candidate.resolve()), 'package': package, 'relative': relative}
    return None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--intent', required=True, choices=CATALOG)
    parser.add_argument('--skills-root', action='append', help='Search only these skill roots when supplied; may repeat')
    args = parser.parse_args()
    if args.skills_root:
        roots = [Path(p).expanduser().resolve() for p in args.skills_root]
    else:
        codex_root = Path(os.environ.get('CODEX_HOME', str(Path.home() / '.codex'))).expanduser()
        project = Path(__file__).resolve().parents[4]
        roots = [project / '.agents/skills', project / '.claude/skills', project / '.gemini/skills',
                 Path.home() / '.agents/skills', Path.home() / '.claude/skills', Path.home() / '.gemini/skills', codex_root / 'skills']
    roots = list(dict.fromkeys(roots))
    found, missing = [], []
    for key, purpose, packages, alternatives in CATALOG[args.intent]:
        match = locate(roots, packages, alternatives)
        if match:
            found.append({'id': key, 'purpose': purpose, **match})
        else:
            missing.append({'id': key, 'purpose': purpose, 'packages': packages, 'alternatives': alternatives})
    print(json.dumps({
        'intent': args.intent,
        'status': 'available' if not missing else 'partial' if found else 'unavailable',
        'searched_roots': [str(p) for p in roots],
        'resources': found,
        'missing': missing,
        'scope': 'Files were located, not executed or aesthetically validated. Select only relevant resources. Adapt examples to the content, language and host; do not inherit style quotas or overwrite user instructions.'
    }, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
