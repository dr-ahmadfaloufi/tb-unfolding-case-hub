/* ============================================================
   TB Unfolding Cases — content data
   Transcribed verbatim from tb_unfolding_cases.md.
   cite(n) / cite(n,m) renders a footnote-style superscript
   linking to references.html.
   img(case, stage, slug, caption) renders an image placeholder
   that auto-displays once a matching file is dropped into
   /images/caseN/.
   ============================================================ */

function cite(...nums) {
  const links = nums
    .map((n) => `<a href="references.html#ref${n}">${n}</a>`)
    .join(",");
  return `<sup class="citation">[${links}]</sup>`;
}

// Flip a slot to `true` here if the file you drop into /images/ is
// AI-generated (candidate B in the image asset manifest) rather than a real,
// licensed clinical image (candidate A). The caption will then carry a
// visible "AI-generated" disclosure automatically — no need to touch the
// case content strings below when you make that call per slot.
const IMAGE_AI_FLAGS = {
  "case1-stage2-afb-smear": false,
  "case1-stage2-cxr": false,
  "case3-stage1-ct-miliary": false,
  "case4-stage1-ct-lymphadenopathy": false,
  "case4-stage2-histopath-necrotizing-granuloma": false,
  "case4-stage3-histopath-non-necrotizing-granuloma": false,
  "case5-stage3-cxr-normal": false,
};

// Attribution for images sourced from published, licensed figures (as opposed
// to your own unpublished clinical photos, which need no entry here). Keyed
// by the same basename used in IMAGE_AI_FLAGS. Rendered as an "Image credits"
// section on references.html, separate from the case teaching citations.
const IMAGE_CREDITS = {
  "case1-stage2-cxr": {
    text: "Gaillard F. Tuberculosis - Right upper lobe cavitation. Case study, Radiopaedia.org (case published 22 Jun 2019).",
    doi: "10.53347/rID-35747",
    license: "CC BY-NC-SA",
    sourceUrl: "https://radiopaedia.org/cases/35747",
    note: "rID 35747. Frontal (PA) view only. Non-commercial, internal educational use with attribution per Radiopaedia's license terms.",
  },
  "case4-stage1-ct-lymphadenopathy": {
    text: "Harvey J. Sarcoidosis - symmetrical lymphadenopathy. Case study, Radiopaedia.org.",
    license: "CC BY-NC-SA",
    sourceUrl: "https://radiopaedia.org/cases/sarcoidosis-symmetrical-lymphadenopathy",
    note: "Axial CT slice. Non-commercial, internal educational use with attribution per Radiopaedia's license terms.",
  },
  "case1-stage2-afb-smear": {
    text: "CDC Public Health Image Library, Image ID# 2187. Photomicrograph of a Ziehl-Neelsen acid-fast stained sputum smear revealing Mycobacterium tuberculosis bacteria. Photo credit: CDC / Ronald W. Smithwick, 1971.",
    license: "Public domain",
    sourceUrl: "https://wwwn.cdc.gov/phil/Details.aspx?pid=2187",
    note: "US CDC PHIL image — copyright restrictions: none. Crediting CDC/PHIL is good practice though not legally required.",
  },
  "case3-stage1-ct-miliary": {
    text: "Ko Y, Lee HY, Lee YS, Song J, Kim MY, Lee HK, Shin JH, Choi SJ, Lee YM. Multidrug-Resistant Tuberculosis Presenting as Miliary Tuberculosis without Immune Suppression: A Case Diagnosed Rapidly with the Genotypic Line Probe Assay Method. Tuberc Respir Dis (Seoul). 2014;76(5):245-248.",
    doi: "10.4046/trd.2014.76.5.245",
    license: "CC BY-NC 3.0",
    sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4050074/",
    note: "Figure 1 (panels A & B) from the open-access article, used here unmodified for internal, non-commercial educational purposes.",
  },
  "case4-stage2-histopath-necrotizing-granuloma": {
    text: "Department of Pathology, Government Medical College (Calicut Medical College), Kozhikode, India. \"Tuberculous lymph node with caseating granuloma\" (H&E, 40X). Caseating granulomatous lesion bordered by epithelioid cells, Langhans giant cells, and lymphocytes.",
    license: "CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tuberculous_lymph_node_with_caseating_granuloma_40X.jpg",
    note: "Real histopathology from an academic pathology department, not AI-generated — the higher-risk candidate B option was not used for this slot.",
  },
  "case4-stage3-histopath-non-necrotizing-granuloma": {
    text: "Rosen, Yale. \"Sarcoidosis - Lymph node - non-necrotizing granulomas.\" Atlas of Pulmonary Pathology, via Flickr.",
    license: "CC BY-SA 2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sarcoidosis_-_Lymph_node_-_non-necrotizing_granulomas_(6201135213).jpg",
    note: "Optional sarcoidosis comparator image, used here unmodified for internal, non-commercial educational purposes.",
  },
};

function img(caseId, stage, slug, caption) {
  const filename = `case${caseId}-${stage}-${slug}`;
  const src = `images/case${caseId}/${filename}.jpg`;
  const isAi = IMAGE_AI_FLAGS[filename] === true;
  const captionHtml = isAi
    ? `<span class="ai-flag">AI-generated — not a real clinical photograph</span> ${caption}`
    : caption;
  const credit = IMAGE_CREDITS[filename];
  const creditHtml = credit
    ? `<a class="image-credit-link" href="references.html#imgcredit-${filename}">Image source &amp; license</a>`
    : "";
  return `
    <div class="image-slot" data-basename="${filename}">
      <div class="placeholder-box">
        <span class="placeholder-icon">&#128247;</span>
        <span>Image not yet added<br><code>${filename}.jpg</code></span>
      </div>
      <img src="${src}" alt="${caption}"
           onload="this.closest('.image-slot').classList.add('has-image')"
           onerror="this.onerror=null;">
      <p class="image-caption">${captionHtml}</p>
      ${creditHtml}
    </div>`;
}

const CASES = [
  // ============================================================
  // CASE 1
  // ============================================================
  {
    id: 1,
    title: "Smear-negative pulmonary TB, evolving to isoniazid mono-resistance",
    hubDescription:
      "A smear-negative cavitary presentation that evolves into isoniazid mono-resistant TB — molecular test limits, katG vs inhA, and the evidence behind Hr-TB regimens.",
    vignette:
      "34-year-old male laborer, no known TB contact, 6 weeks productive cough, low-grade fevers, night sweats, 5 kg weight loss.",
    stages: [
      {
        title: "What do you send?",
        question: "Given this presentation, what do you send, specifically?",
        reveal: `
          <ol>
            <li><strong>The tests:</strong> sputum for AFB smear microscopy and a WHO-recommended rapid molecular test (e.g., Xpert MTB/RIF Ultra) sent together, plus a CXR.</li>
            <li>Differential to hold in mind while results pend: pulmonary TB, non-tuberculous mycobacteria, endemic fungal infection, subacute bacterial pneumonia, malignancy.</li>
            <li>Send the molecular test alongside the smear, not after it — it is faster and does not need to be gated behind microscopy.</li>
          </ol>`,
        pearl:
          'Name both tests explicitly and specify "sent together" — that combination is the single move that shapes everything downstream today.',
      },
      {
        title: "Initial results, and what the rapid test actually covers",
        context:
          "CXR: right upper lobe cavity. AFB smear x1: negative. Rapid molecular test: MTB detected, rifampin resistance not detected." +
          img(1, "stage2", "afb-smear", "Representative AFB smear (Ziehl-Neelsen stain) — reference image, not this patient's own (negative) result") +
          img(1, "stage2", "cxr", "Right upper lobe cavity"),
        question:
          'How do you manage isolation and treatment — and what does "rifampin resistance not detected" actually tell you?',
        reveal: `
          <h4>Reveal — management:</h4>
          <ul>
            <li>Smear-negative does not rule out active or infectious TB — a cavitary lesion implies a high bacillary burden regardless of smear result</li>
            <li>Place in airborne isolation now</li>
            <li>Collect two more sputum specimens for AFB smear and mycobacterial culture — culture remains the gold standard for diagnosis and full drug susceptibility testing (DST)</li>
            <li>Reasonable to start empiric four-drug therapy (rifampin, isoniazid, pyrazinamide, ethambutol) now rather than wait weeks for culture, given cavitary disease and a positive molecular result</li>
            <li>Report to public health, begin contact investigation, test for HIV</li>
          </ul>
          <h4>Reveal — what the test result actually means:</h4>
          <ul>
            <li>Xpert MTB/RIF and Ultra interrogate a single 81-bp region of the <em>rpoB</em> gene (the rifampin resistance-determining region, RRDR, spanning codons 507&ndash;533) — so "rifampin resistance not detected" is specifically about that one gene. It says nothing about isoniazid, which is governed by entirely different genes (<em>katG</em>, the <em>inhA</em> promoter).</li>
            <li>Isoniazid resistance is not part of this assay's design. Detecting it needs either phenotypic culture DST (slow but definitive) or a separate rapid molecular option — a line probe assay, or the newer Xpert MTB/XDR cartridge, which unlike the original Xpert MTB/RIF also covers isoniazid, fluoroquinolones, and second-line injectables from the same specimen.</li>
            <li>So this "reassuring" rifampin result is narrow reassurance only — isoniazid susceptibility is still genuinely unknown at this point.</li>
          </ul>`,
        pearl:
          "A rifampin-susceptible result on Xpert tells you about one gene, not the whole drug panel — isoniazid resistance stays silent until culture DST comes back.",
      },
      {
        title:
          "The DST result, the mutation, and the current evidence-based regimen",
        context:
          "Culture positive at 3 weeks. DST: isoniazid resistant via a katG mutation; rifampin, pyrazinamide, ethambutol susceptible.",
        question:
          "What does the mutation tell you about the level of resistance, and what regimen/duration does current evidence support?",
        reveal: `
          <h4>Reveal — the mutation:</h4>
          <p>Isoniazid resistance runs through two genes with different clinical weight: <em>katG</em> (activates isoniazid into its bactericidal form) — mutations here, especially at codon 315, typically confer high-level resistance — versus the <em>inhA</em> promoter, where mutations confer lower-level resistance but also cross-resistance to ethionamide/prothionamide. A <em>katG</em> mutation, as here, means isoniazid contributes essentially nothing to any future regimen; high-dose isoniazid strategies sometimes used for low-level <em>inhA</em>-mediated resistance do not apply in this case.</p>
          <h4>Reveal — regimen and evidence:</h4>
          <p>Discontinue isoniazid. Current WHO guidance for confirmed rifampin-susceptible, isoniazid-resistant TB (Hr-TB) recommends rifampin, ethambutol, pyrazinamide, and levofloxacin for 6 months.</p>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Control arm</th><th>Experimental arm</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td>Fregonese et al., IPD meta-analysis (Lancet Respir Med 2018) ${cite(1)} — comparison 1</td>
                  <td>&ge;6 months rifampicin + ethambutol + pyrazinamide (REZ), no fluoroquinolone (pooled across 33 heterogeneous cohort studies; individual dosing varied by site rather than one fixed protocol)</td>
                  <td>REZ + a fluoroquinolone, &ge;6 months</td>
                  <td>Adding a fluoroquinolone significantly improved treatment success (aOR 2.8, 95% CI 1.1&ndash;7.3)</td>
                </tr>
                <tr>
                  <td>Same meta-analysis ${cite(1)} — comparison 2</td>
                  <td>&ge;6 months REZ</td>
                  <td>Standardized retreatment regimen: 2 months streptomycin + 3 months pyrazinamide + 8 months isoniazid/rifampicin/ethambutol</td>
                  <td>Significantly worse treatment success with the streptomycin-containing regimen (aOR 0.4, 95% CI 0.2&ndash;0.7) — no benefit from adding an injectable</td>
                </tr>
                <tr>
                  <td>WHO Hr-TB guidelines, 2018 ${cite(2)}</td>
                  <td>&mdash; (guideline, not a trial)</td>
                  <td>Rifampicin (~10 mg/kg) + ethambutol (~15 mg/kg) + pyrazinamide (~25 mg/kg) + levofloxacin (weight-based, typically 750&ndash;1000 mg), 6 months, no isoniazid, no injectable</td>
                  <td>Conditional recommendation, very low certainty in the evidence</td>
                </tr>
              </tbody>
            </table>
          </div>`,
        pearl:
          'This regimen is real and WHO-endorsed, but notice the evidence tier — a retrospective IPD meta-analysis, not a randomized trial, and a conditional, very-low-certainty recommendation. Compare that to the RCT-driven evidence in <a href="case.html?id=2">Case 2</a>: same question, "what does the evidence say," very different strength of evidence.',
      },
      {
        title: "The timing question",
        question:
          "What if isoniazid resistance is only confirmed after standard first-line therapy has already started — or what if it is strongly suspected before confirmation?",
        reveal: `
          <ul>
            <li>If Hr-TB is confirmed after 2HRZE/4HR has already begun: continue rifampin, ethambutol, and pyrazinamide (reintroducing pyrazinamide/ethambutol if already stopped per the intensive-phase schedule), and add levofloxacin once rifampin resistance has been reliably excluded — levofloxacin needs a full 6 months, even if that means the companion drugs run longer than 6 months total.</li>
            <li>Empiric REZ plus levofloxacin can reasonably be started before lab confirmation when Hr-TB is strongly presumed — for example, a close contact of a known Hr-TB source — provided rifampin resistance has been reliably excluded first. If DST later shows isoniazid susceptibility after all, levofloxacin is stopped and the patient completes the standard 2HRZE/4HR course instead.</li>
            <li>Worth knowing: real-world programs do not always track the guideline exactly — one reported cohort used a 9-month regimen with an injectable in the first 3 months rather than the WHO 6-month recommendation, despite the evidence above not showing an added benefit from injectables.</li>
          </ul>`,
        pearl:
          "The timing rule is simple even though the regimen's evidence is not RCT-grade — exclude rifampin resistance first, always, then decide whether levofloxacin gets added now or once confirmation lands.",
      },
    ],
  },

  // ============================================================
  // CASE 2
  // ============================================================
  {
    id: 2,
    title: "Multidrug-resistant TB in a retreatment patient",
    hubDescription:
      "A retreatment patient with adherence gaps returns with rifampin-resistant TB — rpoB resistance-detection limits and the trial evidence behind BPaLM and its alternatives.",
    vignette:
      "42-year-old female. Completed a standard first-line TB treatment course 18 months ago, with reported adherence gaps during that course. Now presents with 2 months of recurrent cough, hemoptysis, and weight loss. No known contact with a resistant TB case on direct questioning.",
    stages: [
      {
        title: "What do you send?",
        question:
          "Given this retreatment history, what test do you send for, specifically?",
        reveal: `
          <ol>
            <li><strong>The test:</strong> a WHO-recommended rapid molecular assay for rifampin resistance (Xpert MTB/RIF Ultra or equivalent) — sent immediately, alongside routine sputum smear microscopy, not after it.</li>
            <li><strong>Why now, not later:</strong> it detects both <em>M. tuberculosis</em> and rifampin resistance within hours rather than the weeks culture takes — and a prior treatment course with adherence gaps is itself a major resistance risk factor, independent of a reported negative contact history.</li>
            <li>Also send culture with full first- and second-line phenotypic DST regardless of the rapid result — molecular assays only flag specific known mutations and can miss others.</li>
            <li>Document the exact prior regimen, duration of interruptions, and any known exposure to a resistant source case.</li>
          </ol>`,
        pearl:
          'Name the test explicitly — "a rapid molecular test for rifampin resistance" — not just "send more tests." It\'s the single most decision-changing order you make today.',
      },
      {
        title: "The result, and what it's actually detecting",
        context: "Result: MTB detected, rifampin resistance detected.",
        question:
          "What does this mean biologically, and what does it mean for immediate management?",
        reveal: `
          <h4>Reveal — management:</h4>
          <ul>
            <li>Treated as presumptive MDR-TB; do not start standard first-line therapy</li>
            <li>Isolate immediately, notify the TB program</li>
            <li>Start an empiric, guideline-based all-oral MDR regimen while awaiting full DST</li>
            <li>Baseline workup: HIV, ECG, CBC, LFTs, visual acuity</li>
          </ul>
          <h4>Reveal — the molecular basis (rpoB):</h4>
          <ul>
            <li>Rifampin resistance is overwhelmingly caused by mutations in an 81-base-pair stretch of the <em>rpoB</em> gene (the RNA polymerase beta subunit), spanning codons 507 to 533 — the rifampin resistance-determining region (RRDR). Xpert MTB/RIF uses five overlapping probes, A through E, each covering part of this region (roughly codons 507&ndash;511, 511&ndash;518, 518&ndash;523, 523&ndash;529, and 529&ndash;533) — a probe that fails to bind signals a mutation, and therefore resistance.</li>
            <li>Mutations at codons 531 and 533, detected by probe E, are the most common worldwide and typically confer high-level resistance; this is also why rifampin resistance is used programmatically as a surrogate marker for MDR-TB — the two usually travel together.</li>
            <li><strong>Limitation worth knowing:</strong> mutations outside the RRDR — notably at codons 170 and 491 — are not covered by these probes, so rpoB mutations located there are missed by Xpert and Xpert Ultra. One southern African (eSwatini) study found the Ile491Phe mutation in 30% of MDR strains, associated with poor rifampin-based treatment outcomes despite testing "susceptible." If clinical suspicion stays high despite a susceptible rapid test, phenotypic DST is still warranted.</li>
            <li>Contrast: isoniazid resistance runs through entirely different genes — <em>katG</em> for high-level resistance, the <em>inhA</em> promoter for low-level resistance with ethionamide cross-resistance — so a rifampin-resistance result tells you nothing definitive about isoniazid susceptibility on its own, even though they usually co-occur.</li>
          </ul>`,
        pearl:
          "Rifampin resistance is a proxy for MDR-TB, not a certainty — and the proxy has a known blind spot worth knowing by name.",
      },
      {
        title:
          "Full susceptibility results and the current evidence-based regimen",
        context:
          "Culture-based DST confirms resistance to both isoniazid and rifampin (MDR-TB). Fluoroquinolone susceptible, no further resistance identified.",
        question:
          "Given this susceptibility profile, what regimen and duration does current evidence support, and what studies is that based on?",
        reveal: `
          <p>With fluoroquinolone susceptibility confirmed, current WHO guidance supports the 6-month BPaLM regimen — bedaquiline, pretomanid, linezolid 600 mg, and moxifloxacin — usable programmatically in patients aged 15 and older who have not had more than one month of prior exposure to bedaquiline, pretomanid, or linezolid.</p>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Control arm</th><th>Experimental arm</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td>Nix-TB (N Engl J Med 2020) ${cite(5)}</td>
                  <td>None — open-label, single-group study, no control arm</td>
                  <td>BPaL: bedaquiline (standard loading/maintenance dosing) + pretomanid 200mg daily + linezolid 1200mg daily, 26 weeks</td>
                  <td>90% favorable outcome; linezolid 1200mg linked to high toxicity (peripheral neuropathy, myelosuppression)</td>
                </tr>
                <tr>
                  <td>ZeNix (N Engl J Med 2022) ${cite(6)}</td>
                  <td>Reference arm: BPaL with linezolid 1200mg daily x 26 weeks (matching Nix-TB's original dosing); bedaquiline and pretomanid dosing unchanged across all arms</td>
                  <td>Three reduced dose/duration arms: linezolid 1200mg x 9 weeks; 600mg x 26 weeks; 600mg x 9 weeks</td>
                  <td>Favorable outcomes of 93%, 89%, 91%, and 84% respectively across the four dose/duration arms; 600mg x 26 weeks gave the best risk-benefit balance, with fewer adverse events — the dosing basis for BPaLM's 600mg linezolid today</td>
                </tr>
                <tr>
                  <td>TB-PRACTECAL (N Engl J Med 2022) ${cite(7)}</td>
                  <td>Locally-adapted standard of care, 36&ndash;96 weeks, individualized per national programme guidelines</td>
                  <td>BPaLM: bedaquiline + pretomanid 200mg + linezolid 600mg + moxifloxacin 400mg, 24 weeks</td>
                  <td>Unfavorable outcome in 11% (BPaLM) vs 48% (standard care)</td>
                </tr>
                <tr>
                  <td>WHO consolidated guidelines, Dec 2022 ${cite(4)}</td>
                  <td>&mdash;</td>
                  <td>BPaLM (drop moxifloxacin to BPaL if fluoroquinolone-resistant), 6 months</td>
                  <td>Treatment success 89% vs 52% with prior standard-of-care regimens</td>
                </tr>
              </tbody>
            </table>
          </div>`,
        pearl:
          "The shorter duration and better safety margin over older regimens is exactly why BPaLM is now preferred whenever a patient qualifies — with confirmed fluoroquinolone susceptibility, this patient is a textbook candidate.",
      },
      {
        title: "What if she did not qualify for BPaLM?",
        question:
          "Suppose prior linezolid exposure or intolerance ruled out BPaLM. What does current evidence support as an alternative, and what studies back it?",
        reveal: `
          <p>BPaLM/BPaL remains the WHO-prioritized regimen for all eligible patients ${cite(8)}, but two more recent trials established evidence-based alternatives for patients who are not eligible.</p>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Regimen</th><th>Duration</th><th>Role</th></tr></thead>
              <tbody>
                <tr>
                  <td>BEAT-Tuberculosis (WHO update, Aug 2024) ${cite(8)}</td>
                  <td>Bedaquiline + delamanid + linezolid, combined with levofloxacin, clofazimine, or both — arm-level dosing/results not detailed in available sources</td>
                  <td>6 months</td>
                  <td>Alternative all-oral option for patients not eligible for BPaLM</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><strong>endTB regimen comparison</strong> — endTB tested five experimental 9-month all-oral regimens against a single standard-of-care control, in fluoroquinolone-susceptible RR-TB ${cite(9)}. This is distinct from the related endTB-Q trial, which tested one regimen (bedaquiline-delamanid-linezolid-clofazimine) against standard care specifically for fluoroquinolone-<em>resistant</em> pre-XDR-TB ${cite(10)} — worth keeping the two straight since they answer different clinical questions.</p>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Regimen</th><th>Composition</th><th>Duration</th><th>Risk difference vs control (95% CI)</th><th>Non-inferior?</th></tr></thead>
              <tbody>
                <tr>
                  <td>Control</td>
                  <td>Standard-of-care regimen reflecting WHO guidelines in effect during the trial (individualized, longer)</td>
                  <td>Per contemporary WHO guidance</td>
                  <td>80.7% favorable outcome (reference)</td>
                  <td>reference arm</td>
                </tr>
                <tr>
                  <td>9BCLLfxZ</td>
                  <td>Bedaquiline + clofazimine + linezolid + levofloxacin + pyrazinamide</td>
                  <td>9 months</td>
                  <td>+9.8% (0.9 to 18.7)</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>9BLMZ</td>
                  <td>Bedaquiline + linezolid + moxifloxacin + pyrazinamide</td>
                  <td>9 months</td>
                  <td>+8.3% (&minus;0.8 to 17.4)</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>9BDLLfxZ</td>
                  <td>Bedaquiline + delamanid + linezolid + levofloxacin + pyrazinamide</td>
                  <td>9 months</td>
                  <td>+4.6% (&minus;4.9 to 14.1)</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>9DCMZ</td>
                  <td>Delamanid + clofazimine + moxifloxacin + pyrazinamide</td>
                  <td>9 months</td>
                  <td>+2.5% (&minus;7.5 to 12.5)</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>9DCLLfxZ</td>
                  <td>Delamanid + clofazimine + linezolid + levofloxacin + pyrazinamide</td>
                  <td>9 months</td>
                  <td>78.8% favorable outcome — margin not met</td>
                  <td>No — the one regimen ruled out</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>In all linezolid-containing arms, the linezolid dose was reduced at week 16 (or sooner if needed) to limit toxicity — the same dose-tapering principle as BPaLM. Grade 3 or higher hepatotoxicity occurred in 11.7% of experimental participants overall vs 7.1% of controls.</p>`,
        pearl:
          "MDR-TB management does not stop at the regimen — contact investigation has to account for the resistance pattern too. Also worth naming for fellows: 4 of 5 endTB regimens performed about as well as standard care, but at 9 months versus 18&ndash;20+ months — that duration reduction is the real headline. The one regimen that failed (9DCLLfxZ) is a useful example of why testing multiple candidate combinations in a single trial matters, rather than assuming any bedaquiline/delamanid-based combination works equally well.",
      },
    ],
  },

  // ============================================================
  // CASE 3
  // ============================================================
  {
    id: 3,
    title:
      "Diagnostic dilemma: negative initial workup in miliary TB with advanced HIV",
    hubDescription:
      "Miliary TB with advanced HIV where every initial test comes back negative — interpreting LAM, sputum vs BAL, and when to treat empirically.",
    vignette:
      "36-year-old man, newly diagnosed HIV (CD4 38 cells/uL, not yet on ART), admitted with 3 weeks of fever, weight loss, and progressive dyspnea. Exam notable for hepatosplenomegaly and diffuse fine crackles. CT chest shows a diffuse micronodular (\"miliary\") pattern." +
      img(3, "stage1", "ct-miliary", 'Diffuse micronodular ("miliary") pattern on CT chest'),
    stages: [
      {
        title: "What do you send?",
        question: "Given this presentation, what do you send, specifically?",
        reveal: `
          <ol>
            <li><strong>The tests:</strong> sputum (spontaneous, or induced if the patient cannot expectorate) for AFB smear, NAAT, and culture — ideally multiple specimens; mycobacterial blood culture (lysis-centrifugation technique); a urine lateral-flow LAM assay; baseline CD4 and HIV viral load if not already known.</li>
            <li>Why the broader net: miliary TB in advanced HIV is disseminated disease, not a purely pulmonary process — sampling the lungs alone can under-diagnose it. Urine LAM specifically has its best performance in exactly this population: seriously ill, low CD4, disseminated disease.</li>
            <li>Differential to hold: miliary TB, disseminated histoplasmosis or other endemic fungal infection, disseminated non-tuberculous mycobacterial infection (especially at very low CD4), lymphoma, bacterial sepsis with an ARDS-type pattern (less likely given the subacute course).</li>
          </ol>`,
        pearl:
          'Name urine LAM explicitly in your initial orders — it is easy to leave off as an "extra" test, but in this population it can be your fastest positive result, sometimes same-day.',
      },
      {
        title: "Initial results: everything comes back negative",
        context:
          "Spontaneous sputum smear x2: negative. Sputum NAAT: negative. Urine LAM: negative.",
        question:
          "Does a negative LAM rule out TB here? How do you interpret this, and what does it change about your next steps?",
        reveal: `
          <h4>Reveal — LAM's real sensitivity:</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Source</th><th>Population</th><th>Sensitivity</th><th>Specificity</th><th>Key point</th></tr></thead>
              <tbody>
                <tr>
                  <td>Cochrane review, LF-LAM ${cite(11)}</td>
                  <td>Symptomatic HIV-positive adults</td>
                  <td>42% (95% CrI 31&ndash;55%)</td>
                  <td>91% (85&ndash;95%)</td>
                  <td>Sensitivity rises and specificity falls as CD4 declines</td>
                </tr>
                <tr>
                  <td>Same review, inpatient subgroup ${cite(11)}</td>
                  <td>Hospitalized HIV-positive adults</td>
                  <td>52% (40&ndash;64%)</td>
                  <td>87% (78&ndash;93%)</td>
                  <td>Notably better than outpatients (29% sensitivity, 96% specificity)</td>
                </tr>
                <tr>
                  <td>Same review, CD4 &lt;=100 subgroup ${cite(11)}</td>
                  <td>Advanced HIV disease</td>
                  <td>~56% (41&ndash;70%)</td>
                  <td>not separately reported</td>
                  <td>Best-performing subgroup — still misses roughly half</td>
                </tr>
                <tr>
                  <td>WHO policy guidance, 2019 ${cite(12)}</td>
                  <td>&mdash;</td>
                  <td>&mdash;</td>
                  <td>&mdash;</td>
                  <td>Conditional recommendation to use LF-LAM in HIV-positive patients with advanced disease (CD4&lt;=100, WHO clinical stage 3/4, or a danger sign); recommends against using it as a general unselected screening test</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>Reveal — what a positive or negative LAM actually buys you clinically:</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Population</th><th>Comparison</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td>Peter et al., Lancet 2016 ${cite(13)}</td>
                  <td>HIV-positive hospital inpatients with suspected TB</td>
                  <td>LAM-guided treatment initiation vs standard care</td>
                  <td>Reduced 8-week mortality; greatest benefit in patients with severe illness, advanced immunosuppression, and inability to self-expectorate sputum</td>
                </tr>
                <tr>
                  <td>Gupta-Wright et al., STAMP trial, Lancet 2018 ${cite(14)}</td>
                  <td>Unselected HIV-positive hospital inpatients</td>
                  <td>Urine LAM + urine Xpert added to sputum Xpert vs sputum Xpert alone</td>
                  <td>Did not reduce overall 56-day mortality across all patients; benefit appeared concentrated in high-risk subgroups only</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>For this patient specifically — severely immunosuppressed, hospitalized, unable to reliably expectorate — this is exactly the phenotype where LAM-guided practice showed its clearest benefit in trial data. A negative result here is not reassuring, and it should not delay further workup, or, depending on severity, empiric treatment (see Stage 4).</p>`,
        pearl:
          '"Who gets tested" changes what the evidence says as much as the test itself does — LAM\'s mortality benefit in trials tracks with illness severity and CD4, not with HIV status alone.',
      },
      {
        title: "Cultures return negative. Now what?",
        context:
          "Mycobacterial cultures (blood and sputum) return negative at 6 weeks. The clinical and radiographic picture remains highly consistent with disseminated TB.",
        question:
          "What further testing do you pursue, and how do you weigh sputum induction against bronchoscopy with BAL?",
        reveal: `
          <h4>Reveal — the induced sputum vs BAL evidence:</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Design</th><th>Comparison</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td>McWilliams et al., Thorax 2002 ${cite(15)}</td>
                  <td>Prospective, 129 subjects, smear-negative or unable to expectorate</td>
                  <td>Three induced sputum samples vs a single bronchoscopy</td>
                  <td>Induced sputum detected 26/27 (96%) of smear-negative/culture-positive cases vs bronchoscopy 14/27 (52%), p&lt;0.005; induced sputum cost roughly one-third of bronchoscopy</td>
                </tr>
                <tr>
                  <td>Musso et al., BMC Infect Dis 2025 ${cite(16)}</td>
                  <td>Retrospective, 215 patients, two negative spontaneous sputum samples required before enrollment, low TB-prevalence setting</td>
                  <td>Single induced sputum vs single BAL</td>
                  <td>BAL sensitivity 84.6% vs induced sputum sensitivity 38.5% (both 100% specificity) — BAL clearly superior in this setting</td>
                </tr>
              </tbody>
            </table>
          </div>`,
        pearl:
          "The number of samples taken and the population/prevalence context both change the answer — three induced sputum samples can outperform a single bronchoscopy, but comparing one sample of each found the opposite result in a different setting. There is no universal winner; know what is actually being compared before citing either study to a fellow.",
        revealExtra: `
          <h4>Reveal — beyond respiratory sampling:</h4>
          <p>given hepatosplenomegaly and a disseminated-disease phenotype, non-respiratory sampling can outperform repeat respiratory sampling here:</p>
          <ul>
            <li>Bone marrow aspirate/biopsy — smear, culture, and histopathology; especially valuable if cytopenias are present</li>
            <li>Liver biopsy if hepatomegaly or deranged LFTs</li>
            <li>Repeat urine LAM later in the illness course — antigenuria can become detectable as disease progresses</li>
            <li>If bronchoscopy is pursued, send BAL fluid <em>and</em> a transbronchial biopsy together — histopathology showing necrotizing granulomas can be diagnostic even when fluid AFB smear/culture is negative</li>
          </ul>`,
      },
      {
        title: "When do you stop testing and just treat?",
        question:
          "Given ongoing negative microbiology despite reasonable escalation, how do you decide between further invasive testing and starting empiric treatment?",
        reveal: `
          <ul>
            <li>In disseminated TB with advanced HIV, the mortality cost of diagnostic delay is real and well documented — this is exactly the population where trial evidence ${cite(13)} supports acting on a strong clinical/radiographic picture rather than waiting for microbiologic perfection.</li>
            <li>Histopathology showing necrotizing (caseating) granulomas, even with a negative culture, is generally accepted as sufficient to treat as TB in the right clinical context — paucibacillary disease can be culture-negative despite unmistakable granulomatous inflammation.
              ${img(3, "stage4", "histopath", "Necrotizing (caseating) granulomas on biopsy histopathology")}
            </li>
            <li>Clinical and radiographic response to empiric treatment is itself a diagnostic tool: substantial improvement over 2&ndash;4 weeks supports the diagnosis retrospectively; a lack of response should prompt reconsidering the differential (fungal infection, lymphoma, NTM) rather than simply extending TB treatment blindly.</li>
            <li>Practically: for a patient this sick, most experienced clinicians would not wait for a 6-week culture result before treating — empiric therapy typically starts back at Stage 2 or 3, in parallel with the diagnostic workup, not after it concludes.</li>
          </ul>`,
        pearl:
          "The diagnostic workup and the treatment decision do not have to be sequential in a patient this sick — they run in parallel, and the evidence specifically supports that approach in advanced HIV with disseminated TB.",
      },
    ],
  },

  // ============================================================
  // CASE 4
  // ============================================================
  {
    id: 4,
    title: "Lymphadenopathy: TB, lymphoma, or sarcoidosis, and choosing how to biopsy",
    hubDescription:
      "Mediastinal lymphadenopathy on the TB–lymphoma–sarcoidosis differential — choosing EBUS-TBNA vs IR-guided biopsy.",
    vignette:
      "29-year-old expatriate construction worker, no significant past medical history, presents with 6 weeks of low-grade fever and night sweats. No cough, no respiratory symptoms. CT chest shows bilateral hilar and mediastinal lymphadenopathy without any parenchymal lung lesion." +
      img(4, "stage1", "ct-lymphadenopathy", "Bilateral hilar and mediastinal lymphadenopathy without parenchymal lung lesion"),
    stages: [
      {
        title: "What do you pursue first, and why not sputum?",
        question:
          "Given this presentation, what do you pursue first, specifically — and why wouldn't a standard TB sputum workup be your starting point here?",
        reveal: `
          <ol>
            <li><strong>The procedure:</strong> EBUS-TBNA (endobronchial ultrasound-guided transbronchial needle aspiration) of the largest and most accessible node station, sending material for both microbiology (AFB smear, mycobacterial culture, NAAT/PCR) and cytopathology (looking specifically for granulomas — necrotizing vs non-necrotizing) — with flow cytometry sent as well, given lymphoma sits on the differential.</li>
            <li><strong>Why not sputum:</strong> there is no parenchymal lesion and no cough here — isolated nodal disease has nothing for a sputum sample to reflect. Tissue is the only way to actually distinguish the three leading possibilities.</li>
            <li>Differential to hold: TB lymphadenitis, sarcoidosis, lymphoma (Hodgkin or non-Hodgkin) — with metastatic malignancy and fungal lymphadenitis as less likely alternatives depending on epidemiologic context.</li>
          </ol>`,
        pearl:
          "When the disease lives in a lymph node and not in the airway or parenchyma, sputum-based testing has nothing to sample — go straight to tissue.",
      },
      {
        title: "Necrotizing granulomas, negative smear and NAAT. Now what?",
        context:
          "EBUS-TBNA cytology shows necrotizing granulomatous inflammation. AFB smear negative, NAAT negative, mycobacterial culture pending." +
          img(4, "stage2", "histopath-necrotizing-granuloma", "Necrotizing granulomatous inflammation on EBUS-TBNA cytology"),
        question:
          "Does this rule out TB? How do you interpret a negative smear/NAAT in this context?",
        reveal: `
          <ul>
            <li>No — TB lymphadenitis is paucibacillary compared with cavitary pulmonary disease, and the microbiologic yield from lymph node tissue is genuinely lower than what you'd expect from a pulmonary specimen. A negative smear and NAAT do not rule it out.</li>
            <li>Necrotizing granulomas favor TB over sarcoidosis (classically non-necrotizing, though overlap exists and necrosis is occasionally seen), but histology alone isn't fully specific either.</li>
            <li>Adding NAAT/PCR specifically to the EBUS specimen meaningfully improves yield over cytology and culture alone — in one series, diagnostic accuracy rose from 57.1% (histology plus conventional microbiology) to 71.4% once TB-PCR was added.</li>
            <li>In the right epidemiologic context (as here), necrotizing granulomas with a still-pending culture is often enough to start presumptive treatment rather than wait weeks for a culture result that may still come back negative given the paucibacillary yield issue above.</li>
          </ul>`,
        pearl:
          "In lymph node TB, absence of microbiologic proof is not the same as absence of disease — histology and epidemiology are doing real diagnostic work here, not just confirming what the microbiology already showed.",
      },
      {
        title:
          "The same test performs very differently across your three differentials",
        question:
          "If EBUS-TBNA doesn't secure a diagnosis, how does the evidence differ across TB, sarcoidosis, and lymphoma in deciding what to do next?",
        reveal: `
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Condition</th><th>EBUS-TBNA yield</th><th>Key limitation</th></tr></thead>
              <tbody>
                <tr>
                  <td>Sarcoidosis</td>
                  <td>74% overall granuloma detection vs 48% for conventional bronchoscopy (GRANULOMA trial); 84% vs 38% specifically in stage I disease ${cite(17)}</td>
                  <td>Advantage over bronchoscopy is largest in stage I; less pronounced in stage II</td>
                </tr>
                <tr>
                  <td>TB lymphadenitis</td>
                  <td>Roughly 53&ndash;82% across published series, improving to ~71% when NAAT/PCR is added to cytology and culture ${cite(18, 19)}</td>
                  <td>Paucibacillary disease — cytology and culture alone under-detect; necrotizing granulomas without positive microbiology are still often treated presumptively</td>
                </tr>
                <tr>
                  <td>Lymphoma (new/de novo cases)</td>
                  <td>Pooled sensitivity ~66% in systematic review data ${cite(20)}, though single-cohort studies comparing directly against newer tissue-core techniques found standard EBUS-TBNA sensitivity as low as 14&ndash;15% (41% with flow cytometry added) ${cite(22)}</td>
                  <td>Aspirate cytology alone usually cannot provide the architecture plus immunophenotype needed for WHO subtyping — a particular problem for follicular and marginal zone lymphoma, and part of why estimates vary so much across studies ${cite(21)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><em>Optional reference comparator:</em></p>
          ${img(4, "stage3", "histopath-non-necrotizing-granuloma", "Non-necrotizing granuloma (sarcoidosis comparator) — optional reference image")}`,
        pearl:
          "The same procedure is excellent for one item on your differential, moderate for the second, and frankly unreliable for the third — know which one you're actually most worried about before assuming EBUS-TBNA alone will settle it.",
        revealExtra: `
          <h4>Reveal — when standard EBUS-TBNA isn't enough:</h4>
          <p>newer EBUS-guided tissue-core techniques (forceps or cryoprobe biopsy through the same needle tract, sometimes called EBUS-TBNB or EBUS-TBMC) obtain actual tissue architecture rather than aspirate-only cytology, and meaningfully outperform standard EBUS-TBNA for benign disease and lymphoma specifically — one meta-analysis found a pooled yield of 86% vs 78% overall ${cite(23)}, and a multicentre cohort directly comparing techniques found cryobiopsy sensitivity of 92&ndash;100% against just 14&ndash;15% for standard needle aspiration in new lymphoma cases ${cite(22)}. Worth asking whether your center has access to this before defaulting straight to a surgical biopsy.</p>`,
      },
      {
        title: "EBUS-accessible nodes are non-diagnostic. EBUS or IR next?",
        question:
          "Say the EBUS-reachable nodes were non-diagnostic, or the most suspicious node sits somewhere EBUS can't reach — how do you choose between repeating EBUS, going to CT-guided (IR) biopsy, or a surgical approach?",
        reveal: `
          <ul>
            <li>EBUS's reach is anatomically limited to nodal stations adjacent to the airway — paratracheal, subcarinal, hilar. It generally cannot reach anterior or prevascular mediastinal nodes, partly because the air-filled trachea gets in the way of the ultrasound approach to some of those stations.</li>
            <li>CT-guided (IR) percutaneous core needle biopsy fills exactly that anatomic gap, and typically obtains a genuine tissue core rather than aspirate-only cytology — relevant if lymphoma subtyping is what you actually need.</li>
            <li>The trade-off is safety, not just yield: EBUS-TBNA has a very low complication rate (well under 5% in most series), while CT-guided percutaneous biopsy carries a meaningfully higher complication rate — one large single-center series of 155 procedures reported complications in 13.5% of cases overall, with major pneumothorax requiring chest tube placement in 1.9% ${cite(24)}. Choosing IR isn't simply "more tissue for free."</li>
            <li>If lymphoma remains the leading concern and EBUS-TBNA (even with flow cytometry added) is non-diagnostic: don't just repeat the same needle aspiration. Escalate to whichever option actually gets you architecture — EBUS-guided cryobiopsy/forceps biopsy where the node's location allows it, CT-guided core biopsy, or a surgical approach (mediastinoscopy or VATS lymph node biopsy) if image-guided options fail or aren't feasible.</li>
          </ul>`,
        pearl:
          "EBUS and IR-guided biopsy aren't really competing tools — they're complementary, and the choice is driven as much by where the concerning node physically sits as by which diagnosis on your differential worries you most.",
      },
    ],
  },

  // ============================================================
  // CASE 5
  // ============================================================
  {
    id: 5,
    title: "Latent TB: when to test and treat, and post-exposure management",
    hubDescription:
      "Latent TB after a high-risk occupational exposure — the window period, IGRA vs TST, and short-course LTBI regimens.",
    vignette:
      "32-year-old ICU nurse with an unmasked, prolonged exposure to a patient later confirmed to have smear-positive, NAAT-positive pulmonary TB, during a period before the index patient was isolated.",
    stages: [
      {
        title: "Post-exposure: what do you do, and when?",
        question: "A colleague reports this exposure. What do you do, and on what timeline?",
        reveal: `
          <ol>
            <li><strong>The actions:</strong> a baseline TST or IGRA as soon as possible (same day/this week), plus a symptom screen (cough, fever, night sweats, weight loss, hemoptysis) — regardless of any prior test result on file.</li>
            <li>This baseline result is a reference point, not a clearance — schedule the <em>same</em> test type again at 8&ndash;10 weeks after the last exposure. The immune response to <em>M. tuberculosis</em> takes 8&ndash;10 weeks to become detectable, so an early negative test cannot yet rule out infection.</li>
            <li>Contact prioritization matters at the program level: exposure intensity, duration, and the index case's smear status determine who gets tested first and how urgently — not every contact needs the same urgency.</li>
            <li>The index case's infectious period — relevant for defining who actually counts as exposed — runs until roughly 2 weeks of effective treatment or clinical/microbiologic improvement, not just until the diagnosis was made.</li>
          </ol>`,
        pearl:
          "Name both the baseline test and the scheduled 8&ndash;10 week repeat together as your plan — a baseline test without a scheduled repeat is an incomplete post-exposure workup.",
      },
      {
        title: "Baseline negative. Cleared?",
        context: "Baseline IGRA at day 3 post-exposure: negative. No symptoms.",
        question:
          "Does this rule out infection? What's next, and does the choice between TST and IGRA matter here?",
        reveal: `
          <ul>
            <li>No. Day 3 is well inside the 8&ndash;10 week window period — a negative result now cannot exclude infection.</li>
            <li>Repeat testing happens at 8&ndash;10 weeks post-exposure, using the <em>same</em> test type as baseline. Switching test types between baseline and repeat makes "conversion" uninterpretable.</li>
            <li>TST vs IGRA: IGRA is generally preferred where BCG vaccination is widespread, since BCG cross-reacts with TST but not with the RD1-region antigens IGRAs use — directly relevant here, given BCG is part of the national immunization program. TST remains a reasonable, lower-cost option, particularly for serial occupational screening, provided prior BCG is accounted for when interpreting it.</li>
            <li>Exception worth knowing: children under 5 and immunocompromised contacts generally start empiric "window prophylaxis" once active disease is excluded, without waiting for the 8&ndash;10 week result, given their risk of rapid progression to severe or disseminated disease.</li>
          </ul>`,
        pearl:
          "The window period is the single most important concept in exposure management — a same-day negative test is a baseline, not a clearance.",
      },
      {
        title: "Nine weeks later, repeat IGRA positive. Now what?",
        context:
          "Nine weeks later, repeat IGRA positive.",
        question:
          "Given a documented conversion, what has to be established before treating, and what does current evidence support for regimen and duration?",
        reveal: `
          <h4>Reveal — rule out active disease first:</h4>
          <p>before starting any LTBI regimen, active TB disease must be excluded — symptom screen plus CXR at minimum, with sputum studies if either is abnormal. Treating presumed LTBI with a rifamycin-containing regimen in someone with unrecognized active disease risks under-treatment and can select for rifamycin resistance.</p>
          ${img(5, "stage3", "cxr-normal", "Normal CXR — shown here only to illustrate the active-disease-exclusion step, not a specific finding")}
          <h4>Reveal — regimen and evidence, once active disease is excluded:</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Comparison</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td>Sterling et al., PREVENT TB study, N Engl J Med 2011 ${cite(25)}</td>
                  <td>3HP: rifapentine 900mg + isoniazid 900mg, weekly x3 months, directly observed, vs 9H: daily isoniazid x9 months, self-administered</td>
                  <td>Confirmed TB in 0.19% (3HP) vs 0.40% (9H); noninferior; significantly higher treatment completion and fewer hepatotoxic events with 3HP</td>
                </tr>
                <tr>
                  <td>Menzies et al., N Engl J Med 2018 ${cite(26)}</td>
                  <td>4R: daily rifampin x4 months, vs 9H</td>
                  <td>Noninferior for confirmed active TB prevention; completion rate 15.1 percentage points higher with 4R; fewer grade 3&ndash;5 adverse events, including hepatotoxicity, with 4R</td>
                </tr>
                <tr>
                  <td>CDC/National TB Controllers Association guidelines, 2020 ${cite(27)}</td>
                  <td>Guideline synthesis</td>
                  <td>Preferentially recommends short-course rifamycin-based 3&ndash;4 month regimens (3HP, 4R, 3HR) over 6&ndash;9 month isoniazid monotherapy, given comparable efficacy with meaningfully better completion and safety</td>
                </tr>
              </tbody>
            </table>
          </div>`,
        pearl:
          "This regimen decision has genuinely strong RCT evidence behind it — unlike some of the guideline-only recommendations in earlier cases, both 3HP and 4R rest on large noninferiority trials, which is exactly why short-course regimens have displaced 9H as preferred.",
      },
      {
        title: "Zooming out: who should be tested for LTBI at all?",
        question:
          "Outside a documented exposure like this one, who should actually be tested for LTBI — and why does that question matter before you even pick a test?",
        reveal: `
          <ul>
            <li>LTBI testing should be risk-based, not universal — reserved for those at meaningfully increased risk of progression to active disease: recent close contacts, people with HIV or other immunosuppression (biologics, transplant, dialysis), silicosis, recent immigrants from high-burden countries within a defined window, and children.</li>
            <li>The guiding principle: only test if a positive result will change management — meaning you're already prepared to treat. Testing someone you would not treat regardless of the result mainly generates anxiety and false-positive management problems, not benefit.</li>
            <li>Test choice still matters at the population level: IGRA is preferable where BCG vaccination is common, or when a contact is unlikely to return for the 48&ndash;72 hour TST reading; TST remains reasonable and cost-effective for serial testing programs, provided its BCG cross-reactivity is accounted for in interpretation ${cite(28)}.</li>
          </ul>`,
        pearl:
          "LTBI testing is a treatment decision dressed up as a diagnostic test — decide you will treat a positive result before you order it, or do not order it at all.",
      },
    ],
  },
];

const REFERENCES = {
  groups: [
    {
      title: "Case 1 — Hr-TB",
      items: [
        { n: 1, text: "Fregonese F, Ahuja SD, Akkerman OW, et al. Comparison of different treatments for isoniazid-resistant tuberculosis: an individual patient data meta-analysis. Lancet Respir Med. 2018;6(4):265-275.", tag: "Individual patient data meta-analysis" },
        { n: 2, text: "World Health Organization. WHO treatment guidelines for isoniazid-resistant tuberculosis: supplement to the WHO treatment guidelines for drug-resistant tuberculosis. Geneva: WHO; 2018.", tag: "Clinical practice guideline" },
        { n: 3, text: "World Health Organization. Rapid communication: key changes to the treatment of drug-resistant tuberculosis. Geneva: WHO; 2022.", tag: "Guideline update" },
      ],
    },
    {
      title: "Case 1 & 2 — MDR-TB / BPaLM",
      items: [
        { n: 4, text: "World Health Organization. WHO consolidated guidelines on tuberculosis. Module 4: treatment — drug-resistant tuberculosis treatment, 2022 update. Geneva: WHO; 2022.", tag: "Clinical practice guideline" },
        { n: 5, text: "Conradie F, Diacon AH, Ngubane N, et al. Treatment of highly drug-resistant pulmonary tuberculosis. N Engl J Med. 2020.", doi: "10.1056/NEJMoa1901814", tag: "Single-arm, open-label trial — Nix-TB" },
        { n: 6, text: "Conradie F, et al. Bedaquiline-pretomanid-linezolid regimens for drug-resistant tuberculosis. N Engl J Med. 2022.", doi: "10.1056/NEJMoa2119430", tag: "Randomized dose-finding trial — ZeNix" },
        { n: 7, text: "Nyang'wa BT, Berry C, Kazounis E, et al. A 24-week, all-oral regimen for rifampin-resistant tuberculosis. N Engl J Med. 2022.", doi: "10.1056/NEJMoa2117166", tag: "Randomized controlled trial — TB-PRACTECAL" },
        { n: 8, text: "World Health Organization. WHO issues rapid communication on key updates to the treatment of drug-resistant tuberculosis. Geneva: WHO; 2024 Aug 23.", tag: "Guideline update" },
        { n: 9, text: "Guglielmetti L, Khan U, Velásquez GE, et al. Nine-month, all-oral regimens for rifampin-resistant tuberculosis. N Engl J Med. 2025;392(5):468-482.", doi: "10.1056/NEJMoa2400327", tag: "Randomized controlled non-inferiority trial — endTB" },
        { n: 10, text: "Guglielmetti L, Khan U, Velásquez GE, et al. Bedaquiline, delamanid, linezolid, and clofazimine for rifampicin-resistant and fluoroquinolone-resistant tuberculosis (endTB-Q). Lancet Respir Med. 2025;13(9):809-820.", doi: "10.1016/S2213-2600(25)00194-8", tag: "Randomized controlled non-inferiority trial — endTB-Q" },
      ],
    },
    {
      title: "Case 3 — Miliary TB / HIV / LAM",
      items: [
        { n: 11, text: "Bjerrum S, Schiller I, Dendukuri N, Kohli M, Nathavitharana RR, Zwerling AA, Denkinger CM, Steingart KR, Shah M. Lateral flow urine lipoarabinomannan assay for detecting active tuberculosis in people living with HIV. Cochrane Database Syst Rev. 2019;10(10):CD011420.", doi: "10.1002/14651858.CD011420.pub3", tag: "Diagnostic test accuracy systematic review — also the source of the CD4≤100 subgroup sensitivity estimate" },
        { n: 12, text: "World Health Organization. Lateral flow urine lipoarabinomannan assay (LF-LAM) for the diagnosis of active tuberculosis in people living with HIV: policy update. Geneva: WHO; 2019.", tag: "Clinical practice guideline / policy update" },
        { n: 13, text: "Peter JG, Zijenah LS, Chanda D, et al. Effect on mortality of point-of-care, urine-based lipoarabinomannan testing to guide tuberculosis treatment initiation in HIV-positive hospital inpatients: a pragmatic, parallel-group, multicountry, open-label, randomised controlled trial. Lancet. 2016;387(10024):1187-1197.", tag: "Randomized controlled trial" },
        { n: 14, text: "Gupta-Wright A, Corbett EL, van Oosterhout JJ, et al. Rapid urine-based screening for tuberculosis in HIV-positive patients admitted to hospital in Africa (STAMP): a pragmatic, multicentre, parallel-group, double-blind, randomised controlled trial. Lancet. 2018;392(10144):292-301.", tag: "Randomized controlled trial" },
        { n: 15, text: "McWilliams T, Wells AU, Harrison AC, Lindstrom S, Cameron RJ, Foskin E. Induced sputum and bronchoscopy in the diagnosis of pulmonary tuberculosis. Thorax. 2002;57(12):1010-1014.", tag: "Prospective comparative study" },
        { n: 16, text: "Musso M, Gualano G, Mencarini P, et al. Diagnostic yield of induced sputum and Bronchoalveolar lavage in suspected pulmonary tuberculosis. BMC Infect Dis. 2025;25:680.", doi: "10.1186/s12879-025-11020-3", tag: "Retrospective comparative study" },
      ],
    },
    {
      title: "Case 4 — Lymphadenopathy / EBUS",
      items: [
        { n: 17, text: "von Bartheld MB, Dekkers OM, Szlubowski A, et al. Endosonography vs conventional bronchoscopy for the diagnosis of sarcoidosis: the GRANULOMA randomized clinical trial. JAMA. 2013;309(23):2457-2464.", tag: "Randomized controlled trial" },
        { n: 18, text: "Lucey O, Potter J, Ricketts W, Castle L, Melzer M. Utility of EBUS-TBNA in diagnosing mediastinal tuberculous lymphadenitis in East London. J Infect. 2022;84(1):17-23.", doi: "10.1016/j.jinf.2021.10.015", tag: "Retrospective study" },
        { n: 19, text: "Lin CK, Keng LT, Lim CK, Lin YT, Lin SY, Chen LY, Yao ZH, Chen YH, Ho CC. Diagnosis of mediastinal tuberculous lymphadenitis using endobronchial ultrasound-guided transbronchial needle aspiration with rinse fluid polymerase chain reaction. J Formos Med Assoc. 2020;119(1 Pt 3):509-515.", doi: "10.1016/j.jfma.2019.07.014", tag: "Retrospective study with prospective data collection" },
        { n: 20, text: "Labarca G, Sierra-Ruiz M, Kheir F, Folch E, Majid A, Mehta HJ, Jantz MA, Fernandez-Bussy S. Diagnostic Accuracy of Endobronchial Ultrasound Transbronchial Needle Aspiration in Lymphoma. A Systematic Review and Meta-Analysis. Ann Am Thorac Soc. 2019;16(11):1432-1439.", doi: "10.1513/AnnalsATS.201902-175OC", tag: "Systematic review and meta-analysis" },
        { n: 21, text: "Kennedy MP, McCarthy J. Is Endobronchial Ultrasound-guided Transbronchial Needle Aspiration Useful in the Workup of Patients with Lymphoma? Ann Am Thorac Soc. 2019;16(11):1373-1374.", doi: "10.1513/AnnalsATS.201907-567ED", tag: "Editorial, companion piece to ref 20" },
        { n: 22, text: "Ariza-Prota M, Pérez-Pallarés J, Barisione E, Cruz-Rueda JJ, Onyancha S, Usturoi D, et al. Enhancing diagnostic precision: a multicentric study of endobronchial ultrasound-guided transbronchial mediastinal cryobiopsy in lymphoproliferative disorders. ERJ Open Res. 2025;11(5):00775-2024.", doi: "10.1183/23120541.00775-2024", tag: "Multicentre retrospective study" },
        { n: 23, text: "Yang W, Yang H, Zhang Q, Herth FJF, Zhang X. Comparison between Endobronchial Ultrasound-Guided Transbronchial Node Biopsy and Transbronchial Needle Aspiration: A Meta-Analysis. Respiration. 2024;103(12):752-764.", doi: "10.1159/000540859", tag: "Meta-analysis" },
        { n: 24, text: "Burgard C, Stahl R, de Figueiredo GN, Dinkel J, Liebig T, Cioni D, Neri E, Trumm CG. Percutaneous CT Fluoroscopy-Guided Core Needle Biopsy of Mediastinal Masses: Technical Outcome and Complications of 155 Procedures during a 10-Year Period. Diagnostics (Basel). 2021;11(5):781.", doi: "10.3390/diagnostics11050781", tag: "Retrospective study" },
      ],
    },
    {
      title: "Case 5 — LTBI",
      items: [
        { n: 25, text: "Sterling TR, Villarino ME, Borisov AS, Shang N, Gordin F, Bliven-Sizemore E, Hackman J, Hamilton CD, Menzies D, Kerrigan A, Weis SE, Weiner M, Wing D, Conde MB, Bozeman L, Horsburgh CR Jr, Chaisson RE; TB Trials Consortium PREVENT TB Study Team. Three months of rifapentine and isoniazid for latent tuberculosis infection. N Engl J Med. 2011;365(23):2155-2166.", doi: "10.1056/NEJMoa1104875", tag: "Randomized controlled non-inferiority trial" },
        { n: 26, text: "Menzies D, Adjobimey M, Ruslami R, Trajman A, Sow O, Kim H, Obeng Baah J, Marks GB, Long R, Hoeppner V, Elwood K, Al-Jahdali H, Gninafon M, Apriani L, Koesoemadinata RC, Kritski A, Rolla V, Bah B, Camara A, Boakye I, Cook VJ, Goldberg H, Valiquette C, Hornby K, Dion MJ, Li PZ, Hill PC, Schwartzman K, Benedetti A. Four Months of Rifampin or Nine Months of Isoniazid for Latent Tuberculosis in Adults. N Engl J Med. 2018;379(5):440-453.", doi: "10.1056/NEJMoa1714283", tag: "Randomized controlled non-inferiority trial" },
        { n: 27, text: "Sterling TR, Njie G, Zenner D, et al. Guidelines for the Treatment of Latent Tuberculosis Infection: Recommendations from the National Tuberculosis Controllers Association and CDC, 2020. MMWR Recomm Rep. 2020;69(1):1-11.", doi: "10.15585/mmwr.rr6901a1", tag: "Clinical practice guideline" },
        { n: 28, text: "National Tuberculosis Controllers Association; Centers for Disease Control and Prevention. Guidelines for the investigation of contacts of persons with infectious tuberculosis. MMWR Recomm Rep. 2005;54(RR-15):1-47.", tag: "Clinical practice guideline — also the source of the 8–10 week window period recommendation used throughout this case" },
      ],
    },
  ],
  background: {
    title: "Background/technical references (rpoB and molecular diagnostics)",
    items: [
      { text: "Mboowa G, Namaganda C, Ssengooba W. Rifampicin resistance mutations in the 81 bp RRDR of rpoB gene in Mycobacterium tuberculosis clinical isolates using Xpert MTB/RIF in Kampala, Uganda: a retrospective study. BMC Infect Dis. 2014;14:481.", doi: "10.1186/1471-2334-14-481" },
      { text: "André E, Goeminne L, Cabibbe A, Beckert P, Kabamba Mukadi B, Mathys V, Gagneux S, Niemann S, Van Ingen J, Cambau E. Consensus numbering system for the rifampicin resistance-associated rpoB gene mutations in pathogenic mycobacteria. Clin Microbiol Infect. 2017;23(3):167-172.", doi: "10.1016/j.cmi.2016.09.006", note: "(rpoB codon numbering and RRDR-external mutations, including Ile491Phe.)" },
    ],
  },
};
