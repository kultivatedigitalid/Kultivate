from pathlib import Path
import hashlib,json
root = Path('website')
report=json.loads(Path('tmp/experiments/qa-document-ribbon.json').read_text())
assert report.get('passed'), 'Browser QA must pass before recording validation'
replacements={
 'docs/BRAND_IMPLEMENTATION.md': [('Ribbon Field fixed between background colors and foreground content', 'Ribbon Field anchored to the document and repeated down the page between background colors and foreground content')],
 'src/vendor/threeui/README.md': [('The ribbon is fixed above the shared background color plane and below all main content.', 'The ribbon repeats in overlapping, feathered tiles anchored to the document, above the color plane and below the content. IntersectionObserver mounts nearby tiles only; the wrapper releases unused WebGL contexts. The registered source is unchanged.')],
 'docs/QA_CHECKLIST.md': [('ribbon is fixed and foreground panel interiors remain unaffected.', 'ribbon repeats at fixed document coordinates while foreground content stays above it.'),('# QA Checklist\n', '# QA Checklist\n\n- [x] Latest scroll revision: Home and Learn at 1440/390 px retain absolute document coordinates from top to bottom, render at most three canvases, preserve pause/reduced motion, and report no runtime errors, failed local requests, or WebGL context warnings.\n')],
 'docs/EXPERIMENTS_2026-09-15.md': [('composites the fixed field', 'composites the document-anchored repeated field'),('It scrolls with the document; the authored ribbon stays fixed to the viewport.', 'It scrolls with the document. The latest client clarification anchors the authored ribbon to the document as well, repeating it down the full page with overlapping feathered edges. Nearby repeats alone mount, and inactive WebGL contexts are released by the wrapper.')],
 'README.md': [('Use icy white/blue gradients that fade into the surrounding navy, plus the exact ThreeUI Ribbon Field as an additional motion layer.', 'Use muted blue-grey gradients with long fades into the surrounding navy. The exact ThreeUI Ribbon Field repeats down the document behind content, moving with the page during scroll.')],
}
for file,pairs in replacements.items():
 p=root/file
 text=p.read_text(encoding='utf-8')
 for old,new in pairs:
  assert old in text,file
  text=text.replace(old,new,1)
 p.write_text(text,encoding='utf-8',newline='\n')
p=root/'CHANGELOG.md'
text=p.read_text(encoding='utf-8').replace('# Changelog\n', '''# Changelog

## 2026-09-16 · document background clarification

- Changed ThreeUI from viewport-fixed to document-anchored repeats down the full page. Overlapping masks soften repeat boundaries; content remains above the ribbon.
- Mount only nearby repeats and release inactive WebGL contexts. Original registered source and configured props remain unchanged.
- Rebuilt 52 pages; desktop/mobile Home and Learn scroll checks pass with at most three simultaneous canvases, working pause/reduced motion, and no runtime, local asset, or context-limit errors.
''',1)
p.write_text(text,encoding='utf-8',newline='\n')
p=root/'docs/DECISION_LOG.md'
text=p.read_text(encoding='utf-8')+'| 2026-09-16 | D-033 | Replace viewport-fixed ribbon with document-anchored repeating tiles; supersedes the fixed positioning in D-032 | Client clarified background should scroll with page and continue to the bottom | Client request and scroll QA | SiteAtmosphere, atmosphere.css | IMPLEMENTED |\n'
p.write_text(text,encoding='utf-8',newline='\n')
expected={'ribbon-field/RibbonFieldBackground.tsx':'fab02cb57c44c7307afd29cd03d01141372ad90163632b9a6a77910a245a5996','ribbon-field/ribbonFieldShaders.ts':'ab578acab44bbff7f3cf67f1c82b3e2e1d03689de3fcbdc23681e8b5a0a3536c','threeui.css':'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf'}
for file,digest in expected.items(): assert hashlib.sha256((root/'src/vendor/threeui/src/shaders'/file).read_bytes()).hexdigest()==digest
print('Documentation updated; all original ThreeUI hashes match.')
