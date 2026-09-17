# ThreeUI · Ribbon Field

Registered source: https://threeui.com/source-code/ribbon-field.json

Requested revision: `fa86582fc870`. The three registered files under `src/shaders/` are preserved byte for byte, including the complete shared CSS and asset URLs. See `source-manifest.json` for SHA-256 values. MIT license from the official `@designcodeio/threeui@1.2.0` distribution is included.

This registered variant uses React and raw WebGL. It does not import Three.js or remote assets; the broader collection's Canvas 2D / Three.js r128 runtimes are not dependencies of this variant.

`index.tsx` is a narrow integration facade because the registered bundle does not include `PredictiveArcCanvas`. Astro aliases the requested package and stylesheet imports to this directory. The ribbon implementation is the original source, not a recreation from the preview. React is installed in the destination application.

The site wrapper owns compositing strength, reduced motion, pause control, pointer forwarding, and remounting after tab visibility changes. The ribbon repeats in overlapping, feathered tiles anchored to the document, above the color plane and below the content. IntersectionObserver mounts nearby tiles only; the wrapper releases unused WebGL contexts. The registered source is unchanged. The configured component props remain unchanged. Keep registered source untouched; add integration behavior outside it.

The source CSS references `./fonts/fragment-mono.woff2`, although the registered asset list is empty. The Latin WOFF2 was supplied from the official Google Fonts distribution (https://fonts.gstatic.com/s/fragmentmono/v6/4iCr6K5wfMRRjxp0DA6-2CLnB4NHhg.woff2); its OFL license is in `src/shaders/fonts/`. The CSS and its path remain unchanged.
