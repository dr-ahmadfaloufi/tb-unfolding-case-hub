# Adding your clinical images

The hub is already wired to look for images at specific paths. Drop a correctly
named file into the matching folder and it will appear automatically the next
time the page loads — no code changes needed. If a file isn't there yet, a
gray placeholder box with the caption is shown instead, and nothing breaks.

These filenames match `Image asset manifest — TB unfolding case hub`
(Ahmad's sourcing tracker) exactly, so whatever you finalize there drops in
here without renaming.

## Naming convention

```
images/case<N>/case<N>-<location>-<slug>.jpg
```

- `<N>` — case number, 1 through 5
- `<location>` — `stage1`, `stage2`, `stage3`, etc. (the slug is filed under
  the stage it's most naturally discussed in, even for images that describe
  something mentioned in the patient vignette)
- `<slug>` — short description of the image, already fixed per slot (see
  table below)

Files must be `.jpg`. If you only have `.png`, convert or re-save as `.jpg`
(or ask to have the placeholder's `<img>` `src` extension changed).

## Expected files

| Case | Stage | Filename | Caption shown | Required? |
|---|---|---|---|---|
| 1 | Stage 2 | `images/case1/case1-stage2-afb-smear.jpg` | Representative AFB smear (Ziehl-Neelsen stain) — reference image, not this patient's own (negative) result | optional |
| 1 | Stage 2 | `images/case1/case1-stage2-cxr.jpg` | Right upper lobe cavity | optional |
| 3 | Stage 1 | `images/case3/case3-stage1-ct-miliary.jpg` | Diffuse micronodular ("miliary") pattern on CT chest | optional |
| 4 | Stage 1 | `images/case4/case4-stage1-ct-lymphadenopathy.jpg` | Bilateral hilar and mediastinal lymphadenopathy without parenchymal lung lesion | optional |
| 4 | Stage 2 | `images/case4/case4-stage2-histopath-necrotizing-granuloma.jpg` | Necrotizing granulomatous inflammation on EBUS-TBNA cytology | optional |
| 4 | Stage 3 | `images/case4/case4-stage3-histopath-non-necrotizing-granuloma.jpg` | Non-necrotizing granuloma (sarcoidosis comparator) — optional reference image | optional |
| 5 | Stage 3 | `images/case5/case5-stage3-cxr-normal.jpg` | Normal CXR — shown here only to illustrate the active-disease-exclusion step, not a specific finding | optional |

Case 2 has no imaging findings described in the source text, so it has no
placeholder slot. All slots are optional — every one degrades gracefully to
an empty placeholder box if the file isn't present.

## Marking a slot as AI-generated

If a slot ends up filled with an AI-generated image (candidate B in your
manifest) rather than a real, licensed clinical image (candidate A), flip
that slot to `true` in the `IMAGE_AI_FLAGS` table near the top of `data.js`:

```js
const IMAGE_AI_FLAGS = {
  "case1-stage2-afb-smear": false,
  "case1-stage2-cxr": false,
  "case3-stage1-ct-miliary": false,
  "case4-stage1-ct-lymphadenopathy": false,
  "case4-stage2-histopath-necrotizing-granuloma": false,
  "case4-stage3-histopath-non-necrotizing-granuloma": false,
  "case5-stage3-cxr-normal": false,
};
```

Once flipped to `true`, the app automatically prepends a visible red
"AI-generated — not a real clinical photograph" badge to that image's
caption — no need to edit the caption text itself. This satisfies the
disclosure requirement from your manifest ("if any candidate-B image is
used, its caption... should disclose that it is AI-generated").

The two Case 4 granuloma slots (necrotizing vs. non-necrotizing) are the
highest-risk pair if filled with candidate B, per your manifest notes — a
pathologist should compare any AI-generated option against real reference
images before it goes in.

## Folder structure

```
images/
  case1/
  case2/
  case3/
  case4/
  case5/
```

Each folder is ready to receive files — just drop them in using the filenames
above.
