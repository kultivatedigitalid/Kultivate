# Symbol, banner and privacy visual revision · 25 September 2026

Implemented the latest reference images and all three confirmed choices. Service symbols remain native monochrome SVG shared by Home and Services: SEO now shows chart bars, an arrow and magnifier without text; Web is a monitor/gear with loading motion; Social faces forward within inclined orbits; gallery panels have wider upright fronts and visible thickness. Hover physically separates parts and continuous gear/orbit/loading motion retains its pause and reduced-motion handling.

Services uses `services-panels.webp`, with a centered static rightward perspective on the complete SVG and masks. Learn uses `learn-pages.webp`; the redundant old SVG reading-panel overlay is removed. Both retain the approved one-shot reveal and shared 1.5× timing. The source PNGs were optimized through Sharp; the raster edit tool failed on sandbox ACL access, so no generated image was used.

Privacy Policy uses dark navy, pale text and blue links. Its sticky left contents list scrolls independently; the mobile contents list also has a bounded height. Policy wording and consent behavior are unchanged by this visual revision.

## Cleanup

42 unused images and 11 obsolete components removed (2,929,683 bytes total). All candidates had zero references in the remaining entrypoint graph and complete static output: 78 pages, 20 JS bundles and 15 stylesheets. Dynamic collage filenames and current hero scene-map assets were reviewed and retained. The first broad deletion was rejected by automatic review; deletion succeeded after adding this built-output and dynamic-path proof.

67 tracked legacy screenshot/QA-script files plus local browser profiles were moved out of `website/tmp`. The codebase now ignores `/tmp/`. Git history was not rewritten. Exact removed-file recovery copies, the cleanup manifest, and the original tmp archive are kept in the task visualization directory under `revision10-removed`, `revision10-cleanup.json`, and `revision10-legacy-qa`.

## Validation

- `npm run build`: 78 pages.
- `node --test tests/*.test.mjs`: nine tests pass, including 1,024 quiz answer combinations and all compiled links/anchors/assets.
- `git diff --check`: passes.
- Browser: real hover transforms for four symbols, top/side clearance, motion rate boosts, desktop/390px/320px layout checks, hero asset/timing/completion checks, reduced motion, and independent privacy TOC scroll in EN/ID. No runtime exceptions or failed asset responses.
- Desktop/mobile screenshots reviewed. Test evidence remains outside the repository in the task visualization directory.

No deployment or commit was made.
