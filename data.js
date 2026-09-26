/* ============================================================
   TB Unfolding Cases — content data
   Content from the approved review-round-2 case drafts (Sept 2026).
   Reference numbers follow first citation; after editing citations
   run `node tools/renumber-refs.js` to renumber.
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
  "case3-stage6-histopath": false,
  "case4-stage1-ct-lymphadenopathy": false,
  "case4-stage2-histopath-necrotizing-granuloma": false,
  "case4-stage3-histopath-non-necrotizing-granuloma": false,
  "case5-stage4-cxr-normal": false,
  "case6-stage1-cxr-effusion": false,
  "case7-stage2-spine-pathology": false,
  "case8-stage4-ct-hydrocephalus": false,
  "case10-stage1-ct-peritonitis": false,
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
  "case3-stage6-histopath": {
    text: "Arif S. \"Caseating granuloma - Tuberculous lymph node.\" Wikimedia Commons. Central caseous necrosis within a granuloma (H&E).",
    license: "CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Caseating_granuloma_-_Tuberculous_lymph_node.jpg",
    note: "Licensed under CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/). Resized to 800 px wide; otherwise unmodified. Real histopathology, not AI-generated.",
  },
  "case5-stage4-cxr-normal": {
    text: "Häggström M. \"Normal posteroanterior (PA) chest radiograph (X-ray).\" Wikimedia Commons.",
    license: "CC0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Normal_posteroanterior_(PA)_chest_radiograph_(X-ray).jpg",
    note: "Public-domain dedication (CC0, https://creativecommons.org/publicdomain/zero/1.0/); credit given for consistency. Resized to 800 px wide. Not this patient's film.",
  },
  "case6-stage1-cxr-effusion": {
    text: "Nabih S. \"Unilateral Pleural Effusion.\" Wikimedia Commons (own work).",
    license: "CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Unilateral_Pleural_Effusion.jpg",
    note: "Licensed under CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/). Resized to 800 px wide; otherwise unmodified. Cause of the effusion not stated by the author; not this patient.",
  },
  "case7-stage2-spine-pathology": {
    text: "Rosen Y. \"Tuberculosis of spinal column.\" Atlas of Pulmonary Pathology, via Flickr / Wikimedia Commons.",
    license: "CC BY-SA 2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tuberculosis_of_spinal_column_(6539943165).jpg",
    note: "Licensed under CC BY-SA 2.0 (https://creativecommons.org/licenses/by-sa/2.0/). Resized to 800 px wide; otherwise unmodified. Autopsy specimen shown in place of an MRI (no suitably licensed spinal TB MRI was found).",
  },
  "case8-stage4-ct-hydrocephalus": {
    text: "Monfils L. \"Hydrocephalus.\" CT scan of the brain, Wikimedia Commons (own work).",
    license: "CC BY-SA 3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hydrocephalus.jpg",
    note: "Licensed under CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0/). Unmodified. The cause of the hydrocephalus is not stated; shown to illustrate ventricular enlargement only.",
  },
  "case10-stage1-ct-peritonitis": {
    text: "Singh S, Devi YS, Bhalothia S, Gunasekaran V. Peritoneal carcinomatosis: pictorial review of computed tomography findings. Int J Adv Res. 2016;4(7):735-748. Figure: \"CT of wet type of tuberculous peritonitis\", via Wikimedia Commons.",
    doi: "10.21474/IJAR01/936",
    license: "CC BY 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:CT_of_wet_type_of_tuberculous_peritonitis.jpg",
    note: "Licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Resized to 800 px wide; otherwise unmodified.",
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
    title: "34-year-old laborer with 6 weeks of productive cough and weight loss",
    hubDescription:
      "A subacute cough with a cavity on CXR: the differential and its tests, what a rifampin-susceptible rapid result does and doesn't tell you, and the WHO, ATS and Saudi guidance behind the regimen once the full picture is in.",
    vignette:
      "34-year-old Saudi man, a laborer who has lived in Saudi Arabia all his life with no travel abroad and no known TB contact. Six weeks of productive cough, low-grade fevers, night sweats, and 5 kg weight loss.",
    stages: [
      {
        title: "What do you send?",
        question: "Given this presentation, what do you send, specifically?",
        reveal: `
          <p><strong>Differential first</strong>, most to least likely, each paired with the test that confirms or excludes it:</p>
          <ol>
            <li><strong>Pulmonary TB</strong>
              <ul>
                <li>Sputum &times;3 for <strong>AFB smear</strong>;</li>
                <li>a <strong>rapid NAAT (e.g. Xpert MTB/RIF Ultra) on the first specimen</strong>;</li>
                <li><strong>mycobacterial culture (liquid &plusmn; solid) with drug-susceptibility testing</strong> on every specimen;</li>
                <li><strong>CXR</strong>.</li>
                <li>All of these go out on day 1, not in sequence. ${cite(1)}</li>
              </ul>
            </li>
            <li><strong>Subacute bacterial pneumonia / lung abscess</strong>
              <ul><li>Sputum Gram stain and routine bacterial culture, plus blood cultures if febrile.</li></ul>
            </li>
            <li><strong>Non-tuberculous mycobacteria (NTM)</strong>
              <ul><li>Covered by the same mycobacterial culture with species identification. A <strong>smear-positive, NAAT-negative</strong> result points away from TB. ${cite(1)}</li></ul>
            </li>
            <li><strong>Malignancy (e.g. lung cancer, lymphoma)</strong>
              <ul><li>CT chest if the CXR shows a mass or nodes, with tissue sampling as indicated.</li></ul>
            </li>
            <li><strong>Chronic pulmonary aspergillosis (CPA)</strong>
              <ul><li><strong>Aspergillus IgG</strong> <em>if imaging shows a cavity</em>. The ERS/ESCMID definition requires findings present for <strong>&ge;3 months</strong>, so CPA sits last at 6 weeks of symptoms. ${cite(2)}</li></ul>
            </li>
          </ol>
          <p><strong>Also send, whatever the differential:</strong> an <strong>HIV test</strong>. CDC and WHO recommend routine HIV testing for everyone with presumptive TB. ${cite(3)}</p>`,
        pearl: `<em>Bedside pitfall:</em> a positive AFB smear is not the same as TB. If the smear is positive but the NAAT is negative, TB becomes unlikely. Think NTM before you start four drugs and notify public health. ${cite(1)}`,
      },
      {
        title: "Initial results: isolate? treat?",
        context:
          "CXR: right upper lobe cavity. AFB smear x1: negative. Rapid molecular test: MTB detected, rifampin resistance not detected." +
          img(1, "stage2", "afb-smear", "Representative AFB smear (Ziehl-Neelsen stain) — reference image, not this patient's own (negative) result") +
          img(1, "stage2", "cxr", "Right upper lobe cavity"),
        question: "How do you manage isolation and treatment today?",
        reveal: `
          <ul>
            <li><strong>Airborne isolation now.</strong> A negative first smear does not rule out infectious TB, and <strong>cavitation on CXR independently predicts greater infectiousness</strong>. ${cite(4, 5)}</li>
            <li><strong>Two more sputum specimens</strong> (three in total) for smear and mycobacterial culture. Culture is the gold standard and provides full phenotypic DST. ${cite(1)}</li>
            <li><strong>Start treatment now</strong>, without waiting weeks for culture: cavitary disease plus a positive NAAT is enough. ${cite(3)}</li>
            <li><strong>Report</strong> to the public health authority, <strong>start the contact investigation</strong>, and <strong>test for HIV</strong> if not already done. ${cite(3)}</li>
          </ul>
          <h4>Guideline table: first-line regimen options for drug-susceptible pulmonary TB</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>ATS/CDC/IDSA (2016) ${cite(3)}</td>
                  <td>2 months isoniazid-rifampin-pyrazinamide-ethambutol, then 4 months isoniazid-rifampin (<strong>2HRZE/4HR</strong>)</td>
                  <td>Standard regimen</td>
                </tr>
                <tr>
                  <td>Saudi NTP Manual (2021) ${cite(5)}</td>
                  <td><strong>2HRZE/4HR</strong> "remains the recommended regimen"; fixed-dose combinations; <strong>daily</strong> dosing (thrice-weekly not recommended); 2HRZE/6HE to be phased out (&sect;5.5, &sect;5.7)</td>
                  <td>Not graded in the manual</td>
                </tr>
                <tr>
                  <td>ATS/CDC/ERS/IDSA (2025) ${cite(6)}</td>
                  <td><strong>4-month 2HPZM/2HPM</strong> (isoniazid 300 mg + rifapentine 1,200 mg + moxifloxacin 400 mg daily &times;17 wk; pyrazinamide weight-based &times;8 wk) for age &ge;12</td>
                  <td>Conditional, moderate certainty</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><strong>What this case uses:</strong> <strong>2HRZE/4HR (RIPE)</strong>, the regimen most widely used in Saudi Arabia and the <strong>Saudi national recommendation</strong> (NTP Manual 2021, &sect;5.5). ${cite(5)}</p>
          <ul>
            <li><em>Nuance:</em> the manual (2021) says "4-month fluoroquinolone-containing regimens should not be used". ${cite(5)} That wording predates the 4-month rifapentine&ndash;moxifloxacin regimen (HPZM) now endorsed by ATS 2025. ${cite(6)} Rifapentine is also not available in Saudi Arabia, so HPZM isn't a practical option in KSA either.</li>
            <li><strong>Pyridoxine 25&ndash;50 mg/day</strong> goes with isoniazid in anyone at risk of neuropathy (e.g. diabetes, HIV, alcohol use, malnutrition, chronic kidney disease, pregnancy). ${cite(3)}</li>
          </ul>`,
        pearl:
          "A cavity plus a positive NAAT means isolate and treat today. The negative first smear changes neither decision.",
      },
      {
        title: "How far can you trust \"rifampin resistance not detected\"?",
        question:
          "The rapid test says rifampin resistance not detected. How much should that reassure you, and what does it <em>not</em> tell you?",
        reveal: `
          <ul>
            <li><strong>What it looks at:</strong> Xpert checks only the rifampin-resistance region of one gene (<em>rpoB</em>). It does not test isoniazid at all.</li>
            <li><strong>How accurate it is:</strong> in a Cochrane review, <strong>Xpert Ultra detected rifampin resistance with 94.9% sensitivity and 99.1% specificity</strong> (Xpert MTB/RIF: 95.3% / 98.8%; high-certainty evidence). ${cite(7)}</li>
            <li><strong>What that means here:</strong> the same review estimates that when 10% of tested patients have rifampin resistance, Ultra <strong>misses about 5 per 1,000 tested</strong>. In a new patient in a low-resistance setting, where WHO estimates <strong>3.2% of new TB cases globally</strong> have MDR/RR-TB, a "not detected" result is <strong>highly reliable</strong>. ${cite(7, 8)}</li>
            <li><strong>Rarely it misses resistance</strong>, and culture-based DST (or sequencing) confirms the final profile.</li>
            <li><strong>The real open question is isoniazid.</strong> Xpert MTB/RIF says nothing about it. You need <strong>culture-based DST</strong> or a <strong>rapid molecular test for isoniazid (line probe assay)</strong>. The Saudi manual indicates this especially after prior isoniazid treatment or where isoniazid resistance is common. ${cite(5)}</li>
          </ul>`,
        pearl:
          "In a new patient, \"rifampin resistance not detected\" is a result you can trust. What you still don't know is isoniazid susceptibility, and only DST will tell you.",
      },
      {
        title: "The mutation",
        context:
          "Culture positive at 3 weeks. DST: isoniazid resistant via a <em>katG</em> mutation; rifampin, pyrazinamide, ethambutol susceptible.",
        question:
          "What does a <em>katG</em> mutation tell you about the level of isoniazid resistance?",
        reveal: `
          <p>Isoniazid resistance runs through two genes with different clinical weight:</p>
          <ul>
            <li><strong><em>katG</em>:</strong> mutations typically confer <strong>high-level resistance</strong>, so isoniazid contributes essentially nothing, even at high dose.</li>
            <li><strong><em>inhA</em> promoter:</strong> mutations typically confer <strong>low-level resistance</strong> that high-dose isoniazid may overcome, <strong>plus cross-resistance to ethionamide/prothionamide</strong>.</li>
          </ul>
          <p>${cite(9)}</p>`,
        pearl:
          "Know which gene you're dealing with. With <em>katG</em>, isoniazid is gone even at high dose. With <em>inhA</em>, high-dose isoniazid may still work, but ethionamide probably won't.",
      },
      {
        title: "Regimen and evidence",
        question:
          "What regimen and duration does current evidence support for rifampin-susceptible, isoniazid-resistant TB?",
        reveal: `
          <p>Stop isoniazid. Give <strong>rifampin + ethambutol + pyrazinamide + levofloxacin for 6 months</strong>. ${cite(10, 5)}</p>
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Comparison</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td>Fregonese et al., IPD meta-analysis, Lancet Respir Med 2018 ${cite(11)}, comparison 1</td>
                  <td>&ge;6 months REZ <strong>+ a fluoroquinolone</strong> vs &ge;6 months REZ alone (33 cohort datasets)</td>
                  <td>Treatment success improved with a fluoroquinolone (aOR 2.8, 95% CI 1.1&ndash;7.3)</td>
                </tr>
                <tr>
                  <td>Same meta-analysis ${cite(11)}, comparison 2</td>
                  <td>Standardized retreatment regimen <strong>with streptomycin</strong> vs &ge;6 months REZ</td>
                  <td>Worse success with streptomycin (aOR 0.4, 95% CI 0.2&ndash;0.7). No benefit from adding an injectable.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>WHO Hr-TB (2018) ${cite(10)}</td>
                  <td>6 months rifampicin + ethambutol + pyrazinamide + <strong>levofloxacin</strong>, no isoniazid required, <strong>no injectable</strong></td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr>
                  <td>Saudi NTP Manual (2021) ${cite(5)}</td>
                  <td>Rifampicin + ethambutol + pyrazinamide + <strong>levofloxacin for 6 months</strong>; do <strong>not</strong> add streptomycin or other injectables (&sect;10.5.1)</td>
                  <td>Not graded in the manual</td>
                </tr>
                <tr>
                  <td>ATS/CDC/ERS/IDSA DR-TB (2019) ${cite(12)}</td>
                  <td><strong>Add a later-generation fluoroquinolone</strong> to 6 months daily rifampin + ethambutol + pyrazinamide</td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr>
                  <td>Same, second recommendation ${cite(12)}</td>
                  <td><strong>Pyrazinamide may be shortened to 2 months</strong> in selected patients (noncavitary, lower-burden disease, or pyrazinamide toxicity)</td>
                  <td>Conditional, very low certainty</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><strong>Practical note:</strong> rifampin lowers <strong>moxifloxacin</strong> exposure by roughly 30%, so some experts prefer <strong>levofloxacin</strong> alongside rifampin. ${cite(12)} This patient has cavitary disease, so the pyrazinamide-shortening option does not apply.</p>`,
        pearl:
          "Both the WHO and ATS isoniazid-resistant regimens rest on conditional, very-low-certainty evidence from observational patient data. There are no randomized trials behind them. Know that when you defend the regimen on rounds.",
      },
      {
        title: "The timing question",
        question:
          "What if isoniazid resistance is only confirmed after standard first-line therapy has already started — or what if it is strongly suspected before confirmation?",
        reveal: `
          <ul>
            <li><strong>Confirmed after 2HRZE/4HR has started:</strong> repeat rapid rifampin testing. <strong>Once rifampin resistance is excluded, give a full 6-month course of (H)REZ-Lfx.</strong> The 6 months are driven by levofloxacin, so the companion drugs often run longer than 6 months in total. If rifampin resistance is found, switch to an MDR-TB regimen. ${cite(10)}</li>
            <li><strong>Very late confirmation</strong> (e.g. 5 months into 2HRZE/4HR): whether to start 6 months of (H)REZ-Lfx at that point depends on the patient's clinical and microbiological status. ${cite(10)}</li>
            <li><strong>Strongly presumed Hr-TB</strong> (e.g. a close contact of a confirmed Hr-TB source): the Hr-TB regimen may be started while DST is pending. If DST later shows isoniazid susceptibility, <strong>stop levofloxacin and complete 2HREZ/4HR</strong>. ${cite(10)}</li>
            <li><strong>Monitoring on this regimen:</strong>
              <ul>
                <li><strong>Liver:</strong> monthly AST where possible (prolonged pyrazinamide is hepatotoxic). If resources are limited, at least monthly for high-risk patients (viral hepatitis, heavy alcohol use). ${cite(10)}</li>
                <li><strong>QT:</strong> avoid levofloxacin with known or suspected QT prolongation. Baseline-corrected QTc; watch hypokalaemia and other QT-prolonging drugs. ${cite(10)}</li>
                <li><strong>Fluoroquinolone class warnings:</strong> tendinitis/tendon rupture, severe hypoglycaemia, mental-health effects, aortic rupture/dissection. ${cite(12)}</li>
                <li><strong>Absorption:</strong> don't co-administer levofloxacin with antacids or other divalent-cation products. Milk restriction is not needed. ${cite(10)}</li>
              </ul>
            </li>
            <li><strong>When to consider extending beyond 6 months:</strong> WHO says prolongation <strong>may be considered</strong> for <strong>extensive cavitary disease</strong> or <strong>slow smear/culture conversion</strong>. In slow converters, <strong>first rule out acquired rifampicin (and fluoroquinolone/pyrazinamide) resistance</strong>. ${cite(10)}
              <ul>
                <li>For comparison, in <em>drug-susceptible</em> TB, ATS/CDC/IDSA extend the continuation phase to 7 months (9 months total) when there is <strong>both</strong> cavitation <strong>and</strong> a positive 2-month culture. ${cite(3)}</li>
              </ul>
            </li>
            <li>If levofloxacin can't be used (toxicity/resistance), <strong>6(H)REZ</strong> is the alternative. <strong>Do not substitute an injectable.</strong> ${cite(10)}</li>
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
    title: "42-year-old woman with recurrent cough and hemoptysis after prior TB treatment",
    hubDescription:
      "A retreatment patient with adherence gaps returns with new respiratory symptoms: rapid resistance testing, what to do when molecular and phenotypic results disagree, global vs Saudi resistance data, current short regimens, and the alternative when pregnancy rules out the first choice.",
    vignette:
      "42-year-old Saudi woman. Completed a standard first-line TB treatment course 18 months ago, with reported adherence gaps during that course. Now presents with 2 months of recurrent cough, hemoptysis, and weight loss. No known contact with a resistant TB case on direct questioning.",
    stages: [
      {
        title: "What do you send?",
        question:
          "Given this retreatment history, what do you send, specifically?",
        reveal: `
          <p><strong>Differential first</strong>, most to least likely, each paired with its test:</p>
          <ol>
            <li><strong>Recurrent TB (relapse or reinfection), possibly with acquired drug resistance</strong>
              <ul>
                <li><strong>Rapid molecular test for TB + rifampicin resistance (Xpert MTB/RIF Ultra)</strong> on the first specimen;</li>
                <li>plus <strong>culture with full first- and second-line phenotypic DST, sent at or before the start of treatment</strong>. WHO says culture and DST should be obtained from <em>all</em> previously treated patients, for at least isoniazid and rifampicin. ${cite(13)}</li>
                <li>Prior treatment is itself an indication for rapid molecular DST. ${cite(1)}</li>
              </ul>
            </li>
            <li><strong>Post-TB bronchiectasis with secondary bacterial infection</strong>
              <ul><li>Sputum Gram stain and routine bacterial culture.</li></ul>
            </li>
            <li><strong>Aspergilloma / chronic pulmonary aspergillosis in a residual cavity</strong>
              <ul><li><strong>Aspergillus IgG</strong> if imaging shows a cavity. Aspergillus antibody is elevated in &gt;90% of CPA. ${cite(2)}</li></ul>
            </li>
            <li><strong>Non-tuberculous mycobacteria</strong>
              <ul><li>Mycobacterial culture with species identification (same specimens).</li></ul>
            </li>
            <li><strong>Malignancy</strong>
              <ul><li>CT chest, then tissue if a mass is seen.</li></ul>
            </li>
          </ol>
          <p><strong>Also:</strong> HIV test ${cite(3)}; document the prior regimen, the length of interruptions, and any exposure to a resistant source case.</p>`,
        pearl: `<em>Bedside pitfall, specific to retreatment:</em> in someone treated for TB before, a positive Xpert can reflect leftover DNA from dead bacilli. In the Cochrane review, Xpert Ultra specificity fell to <strong>88.2%</strong> in people with a prior TB history, versus 95.6% overall. Always confirm with culture before calling it a new episode. ${cite(7)}`,
      },
      {
        title: "Rifampicin resistance detected: what do you do now?",
        context: "Result: MTB detected, rifampin resistance detected.",
        question: "Rifampicin resistance is detected. What do you do today?",
        reveal: `
          <ul>
            <li><strong>Treat as MDR/RR-TB.</strong> Do not start the standard first-line regimen. WHO manages RR-TB and MDR-TB together as MDR/RR-TB. ${cite(13)}</li>
            <li><strong>Why "treat as MDR":</strong> the two usually travel together. Worldwide in 2024, <strong>16% of previously treated</strong> patients had MDR/RR-TB, versus <strong>3.2% of new</strong> patients. ${cite(8)}</li>
            <li><strong>Isolate, notify, start contact investigation.</strong> Contact management must account for the resistance pattern.</li>
            <li><strong>Send second-line DST now, especially fluoroquinolone susceptibility.</strong> It decides between BPaLM and BPaL (next stage). Globally, <strong>18%</strong> of MDR/RR-TB is pre-XDR (fluoroquinolone-resistant). ${cite(8)}</li>
            <li><strong>Baseline work-up before a bedaquiline/linezolid regimen:</strong>
              <ul>
                <li>HIV test;</li>
                <li><strong>ECG</strong> (QT) ${cite(12)};</li>
                <li>CBC (linezolid myelosuppression);</li>
                <li>LFTs;</li>
                <li>visual acuity/colour vision (linezolid optic neuropathy);</li>
                <li>neuropathy screen: not on the Saudi manual's list, but good clinical practice given linezolid neuropathy rates in Nix-TB (81%) and ZeNix (13&ndash;38%) ${cite(14, 15)};</li>
                <li><strong>pregnancy test</strong> (BPaLM is not recommended in pregnancy or breastfeeding; see next stage) ${cite(13)}.</li>
              </ul>
              The Saudi NTP Manual baseline (&sect;10.8) also includes smear, culture and DST (including second-line), CXR, renal and hepatic profile, calcium/magnesium and a baseline ECG if on bedaquiline or delamanid, thyroid function, and CBC if anaemia is suspected. ${cite(5)}
            </li>
            <li><strong>Monitoring (Saudi NTP Manual, Table 10.7):</strong> CBC weekly for the first month, then monthly on linezolid; visual acuity if vision changes on linezolid; ECG at 2, 4, 8, 12 and 24 weeks on bedaquiline/delamanid, stopping them if QTc &gt;500 ms; LFTs monthly on bedaquiline. ${cite(5)}</li>
          </ul>`,
        pearl: `A prior TB course with adherence gaps is the single strongest predictor of resistance. In Saudi data it carried about 7-fold odds of MDR. ${cite(16)} Rapid rifampicin testing on day one exists for exactly this patient.`,
      },
      {
        title: "How far can you trust this result, and what if DST disagrees?",
        question:
          "Xpert says rifampicin-resistant. How reliable is that, and what do you do if culture-based DST disagrees, in either direction?",
        reveal: `
          <ul>
            <li><strong>Mechanism in one line:</strong> Xpert detects mutations in a short rifampicin-resistance region of <em>rpoB</em>. It reads DNA, not growth.</li>
            <li><strong>Reliability:</strong> specificity for rifampicin resistance is <strong>99.1% (Ultra) / 98.8% (MTB/RIF)</strong>. A "detected" result is rarely wrong, but not never. ${cite(7)}</li>
          </ul>
          <h4>When molecular and phenotypic results disagree</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Direction</th><th>Main causes</th><th>What to do</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>Xpert: RIF-resistant / DST: susceptible</strong></td>
                  <td><strong>"Disputed" (borderline) <em>rpoB</em> mutations</strong>: real, clinically relevant low-level resistance that growth-based DST at the standard critical concentration misses. In one series only <strong>26% of isolates with such mutations tested resistant by MGIT</strong>. WHO has responded by lowering the critical concentration.</td>
                  <td><strong>Do not de-escalate on the phenotype alone.</strong> Sequence the <em>rpoB</em> gene; treat as RR-TB if a resistance mutation is confirmed. ${cite(17)}</td>
                </tr>
                <tr>
                  <td><strong>Xpert: RIF not detected / DST or clinical course: resistant</strong></td>
                  <td><strong>Mutations outside the region Xpert reads</strong>, e.g. <em>rpoB</em> <strong>I491F</strong>. It was found in <strong>30% of MDR strains in an eSwatini study</strong>, and in <strong>15%</strong> of South African isolates labelled "isoniazid-monoresistant", which were actually MDR. <strong>Routine phenotypic DST can also call I491F susceptible.</strong></td>
                  <td>If the patient isn't responding, or epidemiology suggests it, <strong>request sequencing</strong>. Don't let two "susceptible" results end the discussion. ${cite(18, 19)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Supporting data: in Eswatini, Xpert MTB/RIF detected only <strong>62.5%</strong> of confirmed rifampicin resistance against a composite reference, largely because of I491F. ${cite(20)}</p>
          <h4>Resistance epidemiology: global vs Saudi</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Metric</th><th>Global</th><th>Saudi Arabia</th><th>Source</th></tr></thead>
              <tbody>
                <tr><td>MDR/RR-TB, new patients</td><td>3.2% (2024)</td><td>&mdash;</td><td>WHO Global TB Report 2025 ${cite(8)}</td></tr>
                <tr><td>MDR/RR-TB, previously treated</td><td>16% (2024)</td><td>&mdash;</td><td>WHO Global TB Report 2025 ${cite(8)}</td></tr>
                <tr><td>Rifampicin resistance, all tested</td><td>&mdash;</td><td>6% (95% CI 3&ndash;9), pooled</td><td>Alanazi 2026 meta-analysis ${cite(16)}</td></tr>
                <tr><td>Isoniazid resistance, all tested</td><td>~8% INH monoresistance (range 5&ndash;11%)</td><td>15% (7&ndash;28), pooled</td><td>ATS 2019 ${cite(12)}; Alanazi 2026 ${cite(16)}</td></tr>
                <tr><td>MDR-TB</td><td>&mdash;</td><td><strong>8%</strong> pooled (studies since 2000); <strong>national surveillance 4.4% &rarr; 2.4% (2015&rarr;2019)</strong></td><td>Alanazi 2026 ${cite(16)}; Alawi 2024 ${cite(21)}</td></tr>
                <tr><td>Prior treatment as a risk factor</td><td>&mdash;</td><td><strong>OR 7.34</strong> for MDR</td><td>Alanazi 2026 ${cite(16)}</td></tr>
              </tbody>
            </table>
          </div>
          <p style="color:var(--text-muted); font-size:0.9rem;"><em>Caveat:</em> the Saudi meta-analysis pools heterogeneous, mostly hospital-based series, so the national surveillance figure is the better population estimate.</p>`,
        pearl:
          "Rifampicin resistance on Xpert is highly specific. When a test result disagrees with the sequencing or with how the patient is doing, trust the sequencing and the patient.",
      },
      {
        title: "Full susceptibility results: which regimen?",
        context:
          "Culture-based DST confirms resistance to both isoniazid and rifampin (MDR-TB). Fluoroquinolone susceptible, no further resistance identified.",
        question:
          "Given this susceptibility profile, what regimen and duration does current evidence support, and what studies is that based on?",
        reveal: `
          <ul>
            <li><strong>Answer: 6-month BPaLM.</strong> For eligible patients:
              <ul>
                <li><strong>age &ge;14</strong>;</li>
                <li><strong>&lt;1 month prior exposure</strong> to bedaquiline, pretomanid, linezolid or delamanid;</li>
                <li><strong>not pregnant or breastfeeding</strong> (pretomanid safety data are lacking).</li>
              </ul>
              <strong>Check her pregnancy status before prescribing.</strong> ${cite(13)}
            </li>
            <li><strong>Doses</strong> (ATS 2025 Table 1; consistent with WHO):
              <ul>
                <li><strong>bedaquiline 400 mg daily &times;2 wk, then 200 mg three times/wk &times;24 wk</strong>;</li>
                <li><strong>pretomanid 200 mg daily &times;26 wk</strong>;</li>
                <li><strong>linezolid 600 mg daily &times;26 wk</strong> (may drop to 300 mg daily for toxicity);</li>
                <li><strong>moxifloxacin 400 mg daily &times;26 wk</strong>. ${cite(6, 13)}</li>
                <li>WHO also accepts <strong>bedaquiline 200 mg daily &times;8 wk, then 100 mg daily</strong> as an alternative schedule. ${cite(13)}</li>
              </ul>
            </li>
          </ul>
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Trial</th><th>Population / design</th><th>Regimen &amp; doses</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>Nix-TB</strong>, NEJM 2020 ${cite(14)}</td>
                  <td>XDR or treatment-intolerant/non-responsive MDR; single arm, n=109</td>
                  <td><strong>BPaL</strong>: bedaquiline 400 mg &times;2 wk then 200 mg 3&times;/wk &times;24 wk; pretomanid 200 mg &times;26 wk; <strong>linezolid 1,200 mg daily</strong> &times;up to 26 wk</td>
                  <td><strong>Favorable 90%</strong> (ITT). Peripheral neuropathy 81%, myelosuppression 48%</td>
                </tr>
                <tr>
                  <td><strong>ZeNix</strong>, NEJM 2022 ${cite(15)}</td>
                  <td>XDR/pre-XDR or intolerant/non-responsive RR-TB; randomized, n=181</td>
                  <td>Bedaquiline <strong>200 mg daily &times;8 wk then 100 mg daily &times;18 wk</strong>; pretomanid 200 mg &times;26 wk; <strong>linezolid 1,200 &times;26 wk / 1,200 &times;9 wk / 600 &times;26 wk / 600 &times;9 wk</strong></td>
                  <td><strong>Favorable 93% / 89% / 91% / 84%</strong>. Neuropathy 38 / 24 / 24 / 13%. <strong>Best balance: 600 mg &times;26 wk</strong></td>
                </tr>
                <tr>
                  <td><strong>TB-PRACTECAL</strong> (stage 2), NEJM 2022 ${cite(22)}</td>
                  <td>RR-TB, age &ge;15; randomized vs 9&ndash;20-month standard care</td>
                  <td><strong>BPaLM 24 wk</strong>: bedaquiline 400 mg &times;2 wk then 200 mg 3&times;/wk &times;22 wk; pretomanid 200 mg; <strong>linezolid 600 mg &times;16 wk then 300 mg &times;8 wk</strong>; moxifloxacin 400 mg. Control: individualized, per national guidelines</td>
                  <td><strong>Unfavorable outcome (lower is better): 11% vs 48%</strong> (mITT; RD &minus;37 points). <strong>Non-inferior</strong> (margin 12 points). Grade &ge;3/serious AEs <strong>19% vs 59%</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style="color:var(--text-muted); font-size:0.9rem;">TB-PRACTECAL doses are taken from WHO's description of the trial in Module 4 (2025). ${cite(13)} Pretomanid and moxifloxacin doses match the WHO/ATS BPaLM regimen.</p>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>WHO Module 4 (2025) ${cite(13)}</td>
                  <td><strong>BPaLM</strong> (6 months) rather than 9-month or longer (18-month) regimens in MDR/RR-TB</td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr>
                  <td>Saudi NTP Manual (2021) ${cite(5)}</td>
                  <td><strong>Does not include BPaLM</strong> (it predates it). Longer regimens: all three Group A drugs (levofloxacin/moxifloxacin, bedaquiline, linezolid) + &ge;1 Group B; the "shorter MDR-TB regimen" described is the <strong>older injectable-containing</strong> one (&sect;10.5.2, Algorithm 3)</td>
                  <td>Not graded in the manual</td>
                </tr>
                <tr>
                  <td>ATS/CDC/ERS/IDSA (2025) ${cite(6)}</td>
                  <td><strong>BPaLM</strong> for RR-TB, FQ-susceptible, age &ge;14</td>
                  <td>Strong, very low certainty</td>
                </tr>
                <tr>
                  <td>ATS/CDC/ERS/IDSA (2025) ${cite(6)}</td>
                  <td><strong>BPaL</strong> (no moxifloxacin) if FQ-resistant or FQ-intolerant</td>
                  <td>Strong, very low certainty</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>If she weren't eligible for BPaLM, other shortened regimens exist (next stage).</p>
          <p><em>Local note:</em> the Saudi NTP Manual (2021) predates BPaLM and the newer short regimens. Check your programme's current MDR-TB protocol before prescribing. ${cite(5)}</p>`,
        pearl:
          "BPaLM earns its place through shorter duration and far fewer serious adverse events. The one box you must tick before prescribing it to a woman of child-bearing age is pregnancy status.",
      },
      {
        title: "Her pregnancy test is positive. Now what?",
        context: "Before BPaLM is started, her <strong>pregnancy test is positive</strong>.",
        question:
          "BPaLM is not recommended in pregnancy. What does current evidence support instead?",
        reveal: `
          <h4>6-month option</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Trial</th><th>Design</th><th>Regimen</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>BEAT Tuberculosis</strong>, NEJM 2026 ${cite(23)}</td>
                  <td>Pragmatic RCT, South Africa, n=403, <strong>age &ge;6, pregnant/breastfeeding and FQ-resistant patients included</strong></td>
                  <td><strong>BDLLfxC</strong> 6 months: bedaquiline + delamanid + linezolid + levofloxacin and/or clofazimine (levofloxacin dropped if FQ-resistant; clofazimine dropped if FQ-susceptible) vs 9-month local standard</td>
                  <td><strong>Success 86.1% vs 86.0%</strong>; adjusted RD &minus;0.2 (95% CI &minus;6.9 to 6.5); <strong>non-inferior</strong> (margin 10). Grade &ge;3 AEs 31.2% vs 37.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>9-month options</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Trial</th><th>Design</th><th>Regimens</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>endTB</strong>, NEJM 2025 ${cite(24)}</td>
                  <td>Phase 3 RCT, FQ-susceptible RR-TB, age &ge;15, n=754 (699 mITT)</td>
                  <td>Five 9-month all-oral regimens vs standard care: <strong>BLMZ, BCLLfxZ, BDLLfxZ, DCMZ, DCLLfxZ</strong></td>
                  <td>Control 80.7% favorable (mITT). Risk differences: <strong>BCLLfxZ +9.8</strong> (0.9&ndash;18.7); <strong>BLMZ +8.3</strong> (&minus;0.8&ndash;17.4); <strong>BDLLfxZ +4.6</strong> (&minus;4.9&ndash;14.1); DCMZ +2.5 (&minus;7.5&ndash;12.5); DCLLfxZ <strong>not non-inferior</strong>. <strong>DCMZ failed non-inferiority in the per-protocol analysis</strong>, so the authors conclude <strong>three</strong> regimens are supported. Grade &ge;3 hepatotoxicity 11.7% overall vs 7.1% control</td>
                </tr>
                <tr>
                  <td><strong>STREAM stage 2</strong>, Lancet 2022 ${cite(25)}</td>
                  <td>RCT, RR-TB without FQ/aminoglycoside resistance</td>
                  <td><strong>9-month all-oral bedaquiline regimen</strong> vs 9-month injectable-containing control</td>
                  <td><strong>Favorable 83% vs 71%</strong> (adjusted difference 11.0%, 2.9&ndash;19.0; non-inferior). Hearing loss 2% vs 9%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li>In endTB's linezolid arms, the linezolid dose was reduced at week 16 or earlier. ${cite(24)}</li>
            <li><strong>endTB vs endTB-Q:</strong> endTB-Q tested BDLC for <strong>FQ-resistant</strong> (pre-XDR) TB. <strong>Overall non-inferiority was not shown</strong>: favorable 87% vs 89% (mITT). ${cite(26)}</li>
            <li><strong>Why WHO recommends against DCMZ:</strong> endTB called DCMZ non-inferior in mITT, but it failed in the per-protocol analysis and had more culture-positive unfavorable outcomes (7.5%). ${cite(24, 13)}</li>
            <li><strong>Fallback: longer individualized regimen.</strong> Total <strong>18&ndash;20 months</strong> for most patients, adjusted to response. ${cite(13)}</li>
          </ul>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>WHO Module 4 (2025) ${cite(13)}</td>
                  <td><strong>BDLLfxC</strong> 6 months in MDR/RR-TB <strong>with or without FQ resistance</strong>; usable in pregnancy/breastfeeding and in children</td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr>
                  <td>WHO Module 4 (2025) ${cite(13)}</td>
                  <td><strong>9-month BLMZ, BCLLfxZ, BDLLfxZ</strong> over longer regimens when FQ resistance is excluded; <strong>preference order BLMZ &gt; BCLLfxZ &gt; BDLLfxZ</strong></td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr>
                  <td>WHO Module 4 (2025) ${cite(13)}</td>
                  <td><strong>Against</strong> 9-month DCLLfxZ or DCMZ</td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr>
                  <td>WHO Module 4 (2025) ${cite(13)}</td>
                  <td><strong>9-month all-oral regimen</strong>: bedaquiline &times;6 months + levofloxacin/moxifloxacin, ethionamide, ethambutol, high-dose isoniazid, pyrazinamide, clofazimine &times;4 (&ndash;6) months, then levofloxacin/moxifloxacin, clofazimine, ethambutol, pyrazinamide &times;5 months; <strong>ethionamide may be replaced by 2 months of linezolid 600 mg</strong></td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr>
                  <td>WHO Module 4 (2025) ${cite(13)}</td>
                  <td><strong>Longer regimens:</strong> 18&ndash;20 months total for most patients</td>
                  <td>Conditional, very low certainty</td>
                </tr>
              </tbody>
            </table>
          </div>`,
        pearl:
          "When BPaLM is off the table, first ask <em>why</em>. Pregnancy points you to BDLLfxC or an endTB regimen. Linezolid intolerance removes almost every short option. The reason for ineligibility picks the regimen.",
      },
    ],
  },

  // ============================================================
  // CASE 3
  // ============================================================
  {
    id: 3,
    title:
      "36-year-old man with new HIV diagnosis, fever, and progressive dyspnea",
    hubDescription:
      "A newly diagnosed HIV patient with fever, progressive dyspnea and travel across South and Southeast Asia: a travel-shaped differential, interpreting urine LAM, sputum vs BAL, when to treat despite negative microbiology, and ART timing with co-trimoxazole.",
    vignette:
      "36-year-old man, newly diagnosed HIV (CD4 38 cells/µL, not yet on ART), admitted with 3 weeks of fever, weight loss, and progressive dyspnea. Exam notable for hepatosplenomegaly and diffuse fine crackles. CT chest shows a diffuse micronodular (\"miliary\") pattern. He has travelled through India, Vietnam, Thailand and Indonesia, where he worked on farms, including in rice paddies, and ate raw or pickled freshwater crab." +
      img(3, "stage1", "ct-miliary", 'Diffuse micronodular ("miliary") pattern on CT chest'),
    stages: [
      {
        title: "What do you send?",
        question: "Given this presentation, what do you send, specifically?",
        reveal: `
          <p><strong>Differential first</strong>, most to least likely, each paired with its test:</p>
          <ol>
            <li><strong>Miliary / disseminated TB</strong>
              <ul>
                <li><strong>Sputum</strong> (induced if he cannot expectorate) for smear, <strong>NAAT</strong>, and <strong>mycobacterial culture</strong>;</li>
                <li><strong>mycobacterial blood culture</strong>;</li>
                <li><strong>urine LF-LAM</strong>. WHO conditionally recommends LAM in people with HIV and advanced disease (CD4 &le;100, WHO stage 3/4, or a danger sign). ${cite(27)}</li>
                <li>Cultures on specimens from any other involved site. ${cite(1)}</li>
              </ul>
            </li>
            <li><strong><em>Pneumocystis jirovecii</em> pneumonia (PCP)</strong> (CD4 38, progressive dyspnea)
              <ul><li>Induced sputum or BAL for <em>Pneumocystis</em> testing. The Saudi NTP algorithm for seriously ill people with HIV also advises considering PCP treatment alongside broad-spectrum antibiotics. ${cite(5)}</li></ul>
            </li>
            <li><strong>Disseminated cryptococcosis</strong>
              <ul><li><strong>Serum/plasma cryptococcal antigen (CrAg)</strong>. WHO <strong>strongly recommends CrAg screening before starting ART when CD4 &lt;100</strong>; a positive result &rarr; lumbar puncture. ${cite(28)}</li></ul>
            </li>
            <li><strong>Disseminated NTM</strong> (typical at very low CD4)
              <ul><li>Mycobacterial blood culture with species identification.</li></ul>
            </li>
            <li><strong>Talaromycosis (<em>Talaromyces marneffei</em>)</strong>
              <ul>
                <li>An AIDS-defining invasive fungal infection of advanced HIV, endemic in <strong>tropical and subtropical Asia</strong>. Highest incidence in <strong>Southeast Asia, southern China and the Indian subcontinent</strong>. ${cite(29, 30)}</li>
                <li>Disseminated disease can cause <strong>skin lesions</strong>, and up to a third of diagnosed cases die. ${cite(29)}</li>
                <li>Test: <strong>fungal blood culture</strong> (the gold standard; growth takes up to 2&ndash;4 weeks), plus microscopy/culture of skin lesions, bone marrow or lymph node. Antigen tests are an alternative. ${cite(30)}</li>
                <li>Why it matters: amphotericin induction beat itraconazole on 24-week mortality (11.3% vs 21.0%, IVAP trial). ${cite(31)}</li>
              </ul>
            </li>
            <li><strong>Disseminated histoplasmosis</strong> (endemic in parts of India, e.g. the Gangetic plains ${cite(32)})
              <ul><li><strong>Circulating Histoplasma antigen</strong>, as WHO recommends for people with HIV. ${cite(28)}</li></ul>
            </li>
            <li><strong>Melioidosis (<em>Burkholderia pseudomallei</em>)</strong>
              <ul>
                <li>Endemic in tropical areas, <strong>especially Southeast Asia</strong>. <strong>Diabetes</strong> is the major risk factor. Most patients present with <strong>sepsis</strong>. Mortality can exceed <strong>40%</strong> in some regions. ${cite(33)}</li>
                <li>Test: <strong>blood culture, plus cultures of sputum and any pus or other sites</strong>, with the lab warned that melioidosis is suspected. Diagnosis rests on culture. ${cite(33)}</li>
              </ul>
            </li>
            <li><strong>Paragonimiasis (lung fluke)</strong>
              <ul>
                <li>Acquired by eating <strong>raw, pickled or undercooked freshwater crabs or crayfish</strong> (or raw wild-boar/deer meat). Causes subacute to chronic lung disease that <strong>mimics TB</strong> (cough, chest pain, haemoptysis). Test: <strong>serology</strong>; treatment: praziquantel. ${cite(34)}</li>
                <li>It is on this list only because of his raw-crab history, and it sits low: imaging usually shows <strong>nodules</strong> (often solitary) and <strong>pleural lesions/effusions</strong>, with <strong>eosinophilia</strong>. ${cite(35)} A <strong>diffuse miliary pattern with hepatosplenomegaly</strong> is not its typical picture.</li>
              </ul>
            </li>
            <li><strong>Lymphoma</strong>
              <ul><li>Tissue if nodes or masses are accessible.</li></ul>
            </li>
            <li><strong>Bacterial sepsis</strong>
              <ul><li>Routine blood cultures (less likely given the 3-week subacute course).</li></ul>
            </li>
          </ol>
          <p><strong>Also:</strong> CD4 and HIV viral load if not already done.</p>`,
        pearl:
          "Put urine LAM in your first set of orders. In this population it can be your fastest positive result.",
      },
      {
        title: "Everything comes back negative. Does a negative LAM rule out TB?",
        context:
          "Spontaneous sputum smear x2: negative. Sputum NAAT: negative. Urine LAM: negative.",
        question: "Does a negative LAM rule out TB here?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Source</th><th>Population</th><th>Sensitivity</th><th>Specificity</th><th>Key point</th></tr></thead>
              <tbody>
                <tr>
                  <td>Cochrane review, LF-LAM ${cite(36)}</td>
                  <td>Symptomatic HIV-positive adults</td>
                  <td>42% (95% CrI 31&ndash;55%)</td>
                  <td>91% (85&ndash;95%)</td>
                  <td>Sensitivity rises and specificity falls as CD4 declines</td>
                </tr>
                <tr>
                  <td>Same review, inpatients ${cite(36)}</td>
                  <td>Hospitalized HIV-positive adults</td>
                  <td>52% (40&ndash;64%)</td>
                  <td>87% (78&ndash;93%)</td>
                  <td>Better than outpatients (29% / 96%)</td>
                </tr>
                <tr>
                  <td>Same review, CD4 &le;100 ${cite(36)}</td>
                  <td>Advanced HIV</td>
                  <td>~56% (41&ndash;70%)</td>
                  <td>not separately reported</td>
                  <td>Best-performing subgroup, and still misses about half</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>WHO LF-LAM policy update (2019) ${cite(27)}</td>
                  <td>Use LF-LAM in HIV-positive patients with advanced disease (CD4 &le;100, WHO stage 3/4, or a danger sign). <strong>Not</strong> as an unselected screening test</td>
                  <td>Conditional</td>
                </tr>
                <tr>
                  <td>Saudi NTP Manual (2021) ${cite(5)}</td>
                  <td>LF-LAM <strong>in parallel with Xpert</strong> for PLHIV who are seriously ill or have CD4 &le;100. A <strong>positive</strong> LAM: consider starting TB treatment immediately. A <strong>negative</strong> LAM: re-evaluate and do further testing (CXR, repeat Xpert, culture) (Algorithm 4)</td>
                  <td>Not graded in the manual</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><strong>Take-home:</strong> no. A negative LAM misses about half of TB even in the best subgroup. ${cite(36)} It must not delay further work-up, or empiric treatment in someone this sick.</p>`,
        pearl:
          "In advanced HIV, a positive LAM rules TB in; a negative one rules nothing out.",
      },
      {
        title: "What does a LAM result change clinically?",
        question: "Beyond accuracy, does LAM-guided care change outcomes?",
        reveal: `
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Population</th><th>Comparison</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td>Peter et al., Lancet 2016 ${cite(37)}</td>
                  <td>HIV-positive inpatients with suspected TB</td>
                  <td>LAM-guided treatment initiation vs standard care</td>
                  <td>Reduced 8-week mortality; greatest benefit in the sickest, most immunosuppressed, and those unable to expectorate</td>
                </tr>
                <tr>
                  <td>Gupta-Wright et al., STAMP, Lancet 2018 ${cite(38)}</td>
                  <td>Unselected HIV-positive inpatients</td>
                  <td>Urine LAM + urine Xpert added to sputum Xpert vs sputum Xpert alone</td>
                  <td>No reduction in overall 56-day mortality; benefit concentrated in high-risk subgroups</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><strong>Take-home:</strong> this patient (CD4 38, hospitalized, unable to expectorate reliably) is exactly the phenotype where LAM-guided care showed benefit. ${cite(37)}</p>`,
        pearl:
          "Who gets tested changes what the evidence says as much as the test itself does. LAM's mortality benefit tracks with illness severity and CD4, not with HIV status alone.",
      },
      {
        title: "Initial tests negative, cultures pending: induced sputum or bronchoscopy?",
        context:
          "Initial smear, NAAT and LAM are negative; mycobacterial cultures are pending. The clinical and radiographic picture remains highly consistent with disseminated TB.",
        question:
          "What further respiratory sampling do you pursue, and how do you weigh sputum induction against bronchoscopy with BAL?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Design</th><th>Comparison</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td>McWilliams et al., Thorax 2002 ${cite(39)}</td>
                  <td>Prospective, 129 subjects, smear-negative or unable to expectorate</td>
                  <td>3 induced sputum samples vs 1 bronchoscopy</td>
                  <td>Induced sputum detected 26/27 (96%) vs bronchoscopy 14/27 (52%) of smear-negative/culture-positive cases, p&lt;0.005; ~&#8531; of the cost</td>
                </tr>
                <tr>
                  <td>Musso et al., BMC Infect Dis 2025 ${cite(40)}</td>
                  <td>Retrospective, 215 patients, low-prevalence setting</td>
                  <td>1 induced sputum vs 1 BAL</td>
                  <td>BAL sensitivity 84.6% vs 38.5% (both 100% specificity)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>ATS/IDSA/CDC diagnosis (2017) ${cite(1)}</td>
                  <td><strong>Sputum induction rather than bronchoscopy</strong> as the first sampling method when a patient can't expectorate or is smear-negative. <strong>Bronchoscopy</strong> if induced sputum cannot be obtained</td>
                  <td>Conditional</td>
                </tr>
                <tr>
                  <td>Same ${cite(1)}</td>
                  <td><strong>Suspected miliary TB</strong> with negative induced sputum and no other accessible lesion: bronchoscopy with <strong>brushings and/or transbronchial biopsy</strong> (washings yield less; BAL yield unknown). <strong>Transbronchial biopsy</strong> when a rapid presumptive diagnosis is needed</td>
                  <td>Conditional</td>
                </tr>
                <tr>
                  <td>Same ${cite(1)}</td>
                  <td>Collect <strong>post-bronchoscopy sputum</strong></td>
                  <td>Conditional</td>
                </tr>
              </tbody>
            </table>
          </div>`,
        pearl:
          "The number of samples and the setting both change the answer. There is no universal winner, so know what is actually being compared before citing either study.",
      },
      {
        title: "Beyond respiratory samples: where else do you look?",
        question:
          "Given hepatosplenomegaly and a disseminated picture, which non-respiratory samples could give the diagnosis faster?",
        reveal: `
          <ul>
            <li><strong>Bone marrow aspirate/biopsy:</strong> smear, culture, histopathology; especially if cytopenias are present.</li>
            <li><strong>Liver biopsy</strong> if hepatomegaly or deranged LFTs.</li>
            <li><strong>If bronchoscopy is done:</strong> send BAL <strong>and</strong> transbronchial biopsy.</li>
          </ul>
          <p>For all extrapulmonary specimens: send <strong>AFB smear, mycobacterial culture, NAAT, and histology</strong>. A positive result supports TB; a negative one never excludes it. ${cite(1)}</p>`,
        pearl:
          "In disseminated TB, the fastest diagnosis often comes from the organ that isn't the lung.",
      },
      {
        title: "When do you stop testing and just treat?",
        question:
          "Given ongoing negative microbiology despite reasonable escalation, how do you decide between further invasive testing and starting empiric treatment?",
        reveal: `
          <ul>
            <li>In disseminated TB with advanced HIV, delaying treatment carries a real mortality cost. Trial evidence ${cite(37)} supports acting on a strong clinical/radiographic picture.</li>
            <li>Necrotizing (caseating) granulomas on histopathology, even with a negative culture, are generally accepted as sufficient to treat as TB in the right clinical context. Histology still has to be read in that context, "because neither false-positive nor false-negative results are rare". ${cite(1)}
              ${img(3, "stage6", "histopath", "Necrotizing (caseating) granulomas on biopsy histopathology")}
            </li>
            <li><strong>Saudi NTP Algorithm 4</strong> (people with HIV who are seriously ill or have CD4 &le;100): ${cite(5)}
              <ul>
                <li><strong>"Seriously ill"</strong> = any danger sign: respiratory rate &gt;30/min, temperature &gt;39&nbsp;&deg;C, heart rate &gt;120/min, or unable to walk unaided.</li>
                <li>Treat for bacterial infection with broad-spectrum antibiotics, <strong>not fluoroquinolones</strong>, and consider PCP treatment.</li>
                <li><strong>If worse or not improving after 3&ndash;5 days:</strong> further TB investigations and, if seriously ill, <strong>start presumptive TB treatment</strong>.</li>
                <li><strong>Improvement does not rule TB out.</strong> If clinical suspicion is high, use clinical judgement on starting TB treatment.</li>
              </ul>
            </li>
          </ul>`,
        pearl:
          "In a patient this sick, work-up and treatment run in parallel, not in sequence.",
      },
      {
        title: "TB treatment started. What about his HIV?",
        question:
          "He starts standard TB treatment. When do you start ART, what do you need to watch for, and what else must be added?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Trial</th><th>Population</th><th>Comparison</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>CAMELIA</strong>, NEJM 2011 ${cite(41)}</td>
                  <td>CD4 &le;200 (median 25)</td>
                  <td>ART at <strong>2 wk vs 8 wk</strong> after TB treatment</td>
                  <td><strong>Deaths 18% vs 27%</strong> (HR 0.62); TB-IRIS HR 2.51</td>
                </tr>
                <tr>
                  <td><strong>STRIDE</strong>, NEJM 2011 ${cite(42)}</td>
                  <td>CD4 &lt;250 (median 77)</td>
                  <td>&le;2 wk vs 8&ndash;12 wk</td>
                  <td>Overall no difference; <strong>CD4 &lt;50: AIDS/death 15.5% vs 26.6%</strong> (P=0.02); IRIS 11% vs 5%</td>
                </tr>
                <tr>
                  <td><strong>SAPiT</strong>, NEJM 2011 ${cite(43)}</td>
                  <td>CD4 &lt;500, smear-positive</td>
                  <td>Within 4 wk vs continuation phase</td>
                  <td><strong>CD4 &lt;50: 8.5 vs 26.3 per 100 PY</strong>; IRIS 20.1 vs 7.7 per 100 PY</td>
                </tr>
                <tr>
                  <td><strong>PredART</strong>, NEJM 2018 ${cite(44)}</td>
                  <td>CD4 &le;100, starting ART</td>
                  <td><strong>Prednisone 40 mg/d &times;14 d, then 20 mg/d &times;14 d</strong> vs placebo</td>
                  <td><strong>TB-IRIS 32.5% vs 46.7%</strong> (RR 0.70); no excess severe infections or cancers</td>
                </tr>
                <tr>
                  <td><strong>T&ouml;r&ouml;k</strong>, CID 2011 ${cite(45)}</td>
                  <td>HIV-associated <strong>TB meningitis</strong></td>
                  <td>Immediate vs deferred (2 mo) ART</td>
                  <td>No survival benefit; <strong>more grade 4 adverse events</strong> with immediate ART</td>
                </tr>
                <tr>
                  <td><strong>INSPIRING</strong>, CID 2020 ${cite(46)}</td>
                  <td>On rifampicin-based TB treatment, <strong>CD4 &ge;50</strong></td>
                  <td><strong>Dolutegravir 50 mg twice daily</strong> (during TB treatment and for 2 wk after) vs efavirenz</td>
                  <td>Viral suppression 75% vs 82% (non-comparative); TB-IRIS uncommon</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>WHO (2021, reprinted in Module 4 2025) ${cite(13)}</td>
                  <td><strong>Start ART as soon as possible within 2 weeks of starting TB treatment, regardless of CD4</strong></td>
                  <td>Strong, low&ndash;moderate certainty (adults)</td>
                </tr>
                <tr>
                  <td>Saudi NTP Manual (2021) ${cite(5)}</td>
                  <td>ART for all PLHIV with TB regardless of CD4: <strong>within 2 weeks if CD4 &le;50, within 8 weeks if CD4 &gt;50</strong>; caution with early ART in <strong>TB meningitis</strong>; <strong>co-trimoxazole for all HIV-positive TB patients</strong>, started as soon as possible and given throughout TB treatment (&sect;8.5.4, &sect;8.5.6)</td>
                  <td>Not graded in the manual</td>
                </tr>
                <tr>
                  <td>WHO advanced HIV disease ${cite(28)}</td>
                  <td><strong>Defer ART when TB meningitis or cryptococcal meningitis is suspected</strong>, because of the risk of life-threatening paradoxical worsening</td>
                  <td>&mdash;</td>
                </tr>
                <tr>
                  <td>WHO HIV (2021) ${cite(47)}</td>
                  <td><strong>Co-trimoxazole prophylaxis for all people with HIV and active TB, regardless of CD4</strong></td>
                  <td>Strong, high certainty</td>
                </tr>
                <tr>
                  <td>WHO advanced HIV disease ${cite(28)}</td>
                  <td><strong>CrAg screening before ART if CD4 &lt;100</strong>; pre-emptive antifungal therapy if positive</td>
                  <td>Strong, moderate certainty</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>What this means for this patient (CD4 38, no meningitis)</h4>
          <ul>
            <li>ART within 2 weeks ${cite(13, 5)};</li>
            <li><strong>co-trimoxazole now</strong> ${cite(5, 47)};</li>
            <li><strong>CrAg before ART</strong> (see Stage 1) ${cite(28)};</li>
            <li>consider <strong>prednisone</strong> to prevent IRIS (PredART eligibility met) ${cite(44)};</li>
            <li>if dolutegravir is used with rifampicin, give it <strong>twice daily</strong> ${cite(46)}.</li>
            <li><strong>Saudi vs WHO timing:</strong> for this patient (CD4 38) both say <strong>within 2 weeks</strong>. They differ <strong>above CD4 50</strong>: the Saudi NTP Manual (2021) allows <strong>up to 8 weeks</strong>, while WHO 2021 says <strong>within 2 weeks regardless of CD4</strong>. ${cite(5, 13)}</li>
            <li>INSPIRING enrolled CD4 &ge;50, so the dolutegravir evidence at his CD4 is extrapolated. ${cite(46)} If talaromycosis were confirmed, its treatment and ART timing would need separate guidance, which this case does not cover.</li>
            <li><strong>If he had signs of meningitis:</strong> check for TB and cryptococcal meningitis first; ART is deferred in both. ${cite(28)}</li>
          </ul>`,
        pearl:
          "At CD4 below 50, early ART saves lives despite more IRIS. The exception is meningitis, where early ART does harm.",
      },
    ],
  },

  // ============================================================
  // CASE 4
  // ============================================================
  {
    id: 4,
    title: "29-year-old expatriate worker with fever, night sweats, and mediastinal lymphadenopathy",
    hubDescription:
      "Fever, night sweats and mediastinal lymphadenopathy with no lung findings: a broad differential, choosing how and where to biopsy, then treatment duration and paradoxical reactions.",
    vignette:
      "29-year-old expatriate construction worker from India, living in Saudi Arabia, no significant past medical history, presents with 6 weeks of low-grade fever and night sweats. No cough, no respiratory symptoms. CT chest shows bilateral hilar and mediastinal lymphadenopathy without any parenchymal lung lesion." +
      img(4, "stage1", "ct-lymphadenopathy", "Bilateral hilar and mediastinal lymphadenopathy without parenchymal lung lesion"),
    stages: [
      {
        title: "What do you pursue first, and why not sputum?",
        question:
          "Given this presentation, what do you pursue first, specifically — and why wouldn't a standard TB sputum workup be your starting point here?",
        reveal: `
          <p><em>Why his origin matters:</em> India has the largest TB burden of any country ${cite(8)}, which raises his pre-test probability for TB.</p>
          <p><strong>Differential first</strong>, most to least likely, each paired with its test:</p>
          <ol>
            <li><strong>TB lymphadenitis</strong>
              <ul><li><strong>EBUS-TBNA</strong> of the largest accessible node for <strong>AFB smear, mycobacterial culture, and NAAT</strong>, plus <strong>cytology/histology</strong> for granulomas. On extrapulmonary specimens, a positive culture or NAAT supports TB; a <strong>negative never excludes it</strong>. ${cite(1)}</li></ul>
            </li>
            <li><strong>Sarcoidosis</strong>
              <ul><li>The same EBUS-TBNA looking for <strong>non-necrotizing granulomas</strong>. EBUS finds granulomas far more often than conventional bronchoscopy. ${cite(48)}</li></ul>
            </li>
            <li><strong>Lymphoma</strong>
              <ul><li><strong>Flow cytometry</strong> on the same aspirate, with a low threshold for a core/tissue biopsy (see Stage 4). ${cite(49, 50, 51)}</li></ul>
            </li>
            <li><strong>Metastatic malignancy</strong>
              <ul><li>Cytology on the same aspirate.</li></ul>
            </li>
            <li><strong>Fungal lymphadenitis (histoplasmosis)</strong>
              <ul><li><strong>Fungal stain and culture</strong> on the same specimen. No extra procedure is needed. Histoplasmosis is reported from India, with most cases from the <strong>Gangetic plains</strong>. ${cite(32)}</li></ul>
            </li>
          </ol>
          <p><strong>Also:</strong> an <strong>HIV test</strong>. CDC and WHO recommend routine HIV testing for everyone with presumptive TB. ${cite(3)}</p>
          <p><strong>Why not sputum?</strong> There is no parenchymal lesion and no cough, so a sputum sample has nothing to reflect. Tissue is the only way to separate the three leading diagnoses.</p>`,
        pearl:
          "When the disease lives in a lymph node and not in the airway, sputum has nothing to sample. Go straight to tissue.",
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
            <li><strong>No, this doesn't rule out TB.</strong> Lymph node TB is paucibacillary, and negative smear/NAAT results on extrapulmonary tissue are common. ${cite(1)}</li>
            <li><strong>Necrotizing granulomas favor TB over sarcoidosis.</strong>
              <ul>
                <li>Sarcoidosis is defined by <strong>non-necrotizing</strong> granulomas, plus exclusion of other granulomatous causes. ${cite(52)}</li>
                <li>In 179 patients having EBUS-TBNA in India, necrosis was seen in <strong>56% of TB</strong> but only <strong>6% of sarcoidosis</strong>. In sarcoidosis it was always focal, never extensive. Cytology alone still misclassified about <strong>29%</strong> of cases. ${cite(53)}</li>
              </ul>
            </li>
            <li><strong>Adding TB-PCR to the EBUS specimen raises the yield.</strong> In 21 patients with TB lymphadenitis, EBUS-TBNA diagnostic accuracy was <strong>57.1%</strong> with histology plus conventional microbiology and <strong>71.4% once TB-PCR on the rinse fluid was added</strong> (p&lt;0.001). <strong>Nodes showing necrosis gave more positive microbiology.</strong> ${cite(54)}</li>
            <li><strong>In the right epidemiologic context</strong> (here, a young man from India), necrotizing granulomas with a pending culture are enough to <strong>start empiric treatment</strong>. ATS/CDC/IDSA guidance is that empiric multidrug treatment is started in almost all situations in which active TB is suspected, without waiting for culture. ${cite(3)}</li>
          </ul>`,
        pearl:
          "In lymph node TB, the absence of microbiologic proof is not the absence of disease. Histology and epidemiology are doing real diagnostic work.",
      },
      {
        title: "EBUS-TBNA performs very differently across the three diagnoses",
        question:
          "How does EBUS-TBNA's yield differ across TB, sarcoidosis, and lymphoma?",
        reveal: `
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Condition</th><th>EBUS-TBNA yield</th><th>Key limitation</th></tr></thead>
              <tbody>
                <tr>
                  <td>Sarcoidosis</td>
                  <td>74% granuloma detection vs 48% for conventional bronchoscopy (GRANULOMA); 84% vs 38% in stage I ${cite(48)}</td>
                  <td>The advantage is largest in stage I</td>
                </tr>
                <tr>
                  <td>TB lymphadenitis</td>
                  <td>~53&ndash;82% across series; ~71% when NAAT/PCR is added ${cite(55, 54)}</td>
                  <td>Paucibacillary; cytology + culture alone under-detect</td>
                </tr>
                <tr>
                  <td>Lymphoma (new / de novo)</td>
                  <td>Pooled sensitivity ~66% ${cite(49)}; as low as 14&ndash;15% in one multicentre de novo cohort ${cite(51)} (the 41% figure is from that cohort's <strong>recurrent</strong> lymphoma subgroup)</td>
                  <td>Aspirate cytology rarely gives the architecture needed for subtyping ${cite(50)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><em>Optional reference comparator:</em></p>
          ${img(4, "stage3", "histopath-non-necrotizing-granuloma", "Non-necrotizing granuloma (sarcoidosis comparator) — optional reference image")}`,
        pearl:
          "The same procedure is excellent for one diagnosis, moderate for the second, and unreliable for the third. Know which one worries you most.",
      },
      {
        title: "When standard EBUS-TBNA isn't enough",
        question:
          "If lymphoma is the concern and needle aspiration is non-diagnostic, what gets you tissue architecture?",
        reveal: `
          <ul>
            <li>EBUS-guided <strong>forceps or cryoprobe biopsy</strong> through the same tract obtains tissue architecture rather than cytology alone.</li>
            <li>Pooled diagnostic yield <strong>86% vs 78%</strong> for TBNA. ${cite(56)}</li>
            <li>In a multicentre cohort, cryobiopsy sensitivity was <strong>92&ndash;100%</strong> vs <strong>14&ndash;15%</strong> for standard aspiration in new lymphoma. ${cite(51)}</li>
          </ul>`,
        pearl:
          "For lymphoma, the question isn't \"is it malignant?\" but \"which lymphoma?\". That needs architecture, not just cells.",
      },
      {
        title: "EBUS-accessible nodes are non-diagnostic, or the node is out of reach. What next?",
        question:
          "Say the EBUS-reachable nodes were non-diagnostic, or the most suspicious node sits somewhere EBUS can't reach — how do you choose between repeating EBUS, going to CT-guided (IR) biopsy, or a surgical approach?",
        reveal: `
          <ul>
            <li><strong>Where EBUS reaches:</strong>
              <ul>
                <li><strong>EBUS</strong> samples nodes against the trachea and bronchi: <strong>stations 2R/2L, 4R/4L, 7, 10 and 11&ndash;12</strong>.</li>
                <li><strong>Through the oesophagus (EUS/EUS-B)</strong>: <strong>2L, 4L, 7, 8 and 9</strong>.</li>
                <li><strong>Stations 5 and 6</strong> (subaortic/para-aortic) can be seen by EUS but can <strong>rarely be sampled without traversing the pulmonary artery or aorta</strong>. <strong>VATS is the method of choice</strong> for them.</li>
              </ul>
              No single sampling method reaches every station. ${cite(57)}
            </li>
            <li><strong>CT-guided (IR) core biopsy</strong> fills anatomic gaps and yields a true tissue core, which matters if lymphoma subtyping is needed.</li>
            <li><strong>Safety trade-off:</strong>
              <ul>
                <li><strong>EBUS:</strong> in a systematic review of 16,181 endosonography procedures, serious adverse events occurred in <strong>0.14% overall and 0.05% with EBUS</strong>, with <strong>no deaths</strong>. ${cite(58)}</li>
                <li><strong>CT-guided biopsy:</strong> in one series of 155 procedures, complications occurred in <strong>13.5%</strong>, with <strong>chest-tube pneumothorax in 1.9%</strong>. ${cite(59)}</li>
              </ul>
            </li>
            <li><strong>If lymphoma is still the leading concern:</strong> don't just repeat the aspirate. Escalate to whichever option provides architecture (EBUS forceps/cryobiopsy, CT-guided core, or mediastinoscopy/VATS).</li>
          </ul>`,
        pearl:
          "EBUS and IR biopsy are complementary, not competing. Where the node sits, and which diagnosis you fear most, decide the tool.",
      },
      {
        title: "Culture grows <em>M. tuberculosis</em>. How long, and what if the nodes get bigger?",
        context:
          "Culture from the EBUS specimen grows drug-susceptible <em>M. tuberculosis</em>. He starts treatment. At 10 weeks, a repeat CT shows one node has enlarged.",
        question:
          "How long do you treat TB lymphadenitis, and does an enlarging node mean treatment failure?",
        reveal: `
          <ul>
            <li><strong>Duration:</strong> a <strong>6-month regimen</strong> is adequate for drug-susceptible TB lymphadenitis. ${cite(3)}</li>
            <li><strong>Enlarging or new nodes during or after treatment</strong> can occur <strong>without any bacteriological relapse</strong>. This is a <strong>paradoxical reaction</strong>. ${cite(3)}</li>
            <li><strong>How common:</strong>
              <ul>
                <li>In HIV-negative patients with extrapulmonary TB, paradoxical reactions occurred in <strong>25%</strong>, mostly in lymph nodes, at a <strong>median of 86 days</strong> into treatment. ${cite(60)}</li>
                <li>Reviews report <strong>13&ndash;35%</strong> in lymph node TB. ${cite(61)}</li>
              </ul>
            </li>
            <li><strong>What to do:</strong>
              <ul>
                <li>Confirm <strong>adherence</strong> and <strong>drug susceptibility</strong>;</li>
                <li><strong>re-sample if in doubt</strong>. In paradoxical reactions, <strong>culture is negative</strong>, even if AFB smear or Xpert is positive (dead bacilli). ${cite(61)}</li>
                <li><strong>Do not change or extend the regimen</strong> for enlargement alone.</li>
                <li>Therapeutic excision is not indicated except in unusual circumstances; fluctuant nodes about to drain may be aspirated. ${cite(3)}</li>
                <li>Corticosteroids are used for severe cases. ${cite(60)}</li>
              </ul>
            </li>
          </ul>`,
        pearl:
          "A node that grows on treatment is usually the immune system catching up, not the drugs failing. Prove it with a negative culture before you touch the regimen.",
      },
    ],
  },

  // ============================================================
  // CASE 5
  // ============================================================
  {
    id: 5,
    title: "32-year-old ICU nurse with an unmasked TB exposure",
    hubDescription:
      "A high-risk occupational TB exposure: who counts as exposed, the window period, a pneumonia that isn't TB, IGRA vs TST, and short-course preventive treatment.",
    vignette:
      "32-year-old Egyptian ICU nurse at a tertiary hospital in Riyadh. She received BCG in childhood. She had an unmasked, prolonged exposure to a ventilated patient who was later confirmed to have smear-positive, NAAT-positive, cavitary pulmonary TB. The exposure happened before the patient was placed in airborne isolation. She assisted with intubation and open suctioning.",
    stages: [
      {
        title: "Who counts as exposed, and what do you do now?",
        question:
          "A colleague reports the exposure. Who counts as exposed, and what do you do now?",
        reveal: `
          <h4>1. Define the index patient's infectious period ${cite(4)}</h4>
          <ul>
            <li><strong>Start:</strong> 3 months <strong>before the TB diagnosis</strong>. Start earlier if the patient reports a longer illness. ${cite(4)}
              <ul>
                <li><strong>Saudi NTP Manual:</strong> "3 months before symptom onset or first positive finding" (&sect;14.6.3). Its definitions section uses "3 months before initiation of treatment" and calls the 3-month period "somewhat arbitrary", a general guideline (&sect;14.1). ${cite(5)}</li>
                <li><strong>Teaching point:</strong> all sources use <strong>~3 months</strong>. They differ only on the anchor (diagnosis, symptom onset, or treatment start). When in doubt, take the <strong>earliest</strong> anchor.</li>
              </ul>
            </li>
            <li><strong>End:</strong> only when <strong>all three</strong> apply:
              <ol>
                <li>more than 2 weeks of effective treatment (confirmed by susceptibility results);</li>
                <li>fewer symptoms;</li>
                <li>a microbiologic response, such as a falling smear grade.</li>
              </ol>
            </li>
            <li>Stricter criteria apply before returning to congregate settings: &ge;3 consecutive negative sputum smears, collected &gt;8 h apart, one of them early morning. ${cite(4)}</li>
          </ul>
          <h4>2. Her exposure window</h4>
          <p>Her exposure window is the time she spent with the patient <strong>inside that infectious period, before airborne isolation and N95 use began</strong>. Once those were in place, she was no longer exposed. ${cite(4)}</p>
          <h4>3. What raises her priority as a contact (ICU-specific) ${cite(62)}</h4>
          <ul>
            <li><strong>Aerosol-generating procedures:</strong> bronchoscopy, endotracheal intubation, suctioning, sputum induction, aerosol treatments.</li>
            <li><strong>Proximity and duration:</strong> "the closer the proximity and the longer the duration of exposure, the higher the risk".</li>
            <li><strong>Room ventilation:</strong> inadequate ventilation, recirculated air, small enclosed spaces.</li>
          </ul>
          <h4>4. How infectious was the source?</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Index-patient feature</th><th>Relative infectiousness</th><th>Implication for contacts</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>Smear-positive</strong></td>
                  <td>Highest (reference group)</td>
                  <td>Highest priority for contact testing ${cite(4)}</td>
                </tr>
                <tr>
                  <td><strong>Cavitary disease on CXR</strong></td>
                  <td>More infectious; an <strong>independent predictor</strong> even after smear results are accounted for ${cite(4)}</td>
                  <td>Raises priority further</td>
                </tr>
                <tr>
                  <td><strong>Smear-negative, culture-positive</strong></td>
                  <td>Lower but real: relative transmission <strong>~0.22&ndash;0.24</strong> vs smear-positive. These patients caused <strong>~13&ndash;17% of transmission</strong> in genotyping studies ${cite(63, 64)}</td>
                  <td>Contacts still need evaluation, with lower urgency</td>
                </tr>
                <tr>
                  <td><strong>Smear-negative, NAAT-positive</strong></td>
                  <td>NTCA 2024 groups <strong>smear and/or NAAT positivity</strong> and cavitation as markers of higher pre-treatment bacterial burden, and so of more infectiousness (Rec 3.1, <strong>strong, moderate certainty</strong>). A <strong>lower NAAT Ct value</strong> may indicate higher burden. No study gives a separate transmission rate for this group ${cite(65)}</td>
                  <td>Treat as potentially infectious; prioritize by exposure intensity</td>
                </tr>
                <tr>
                  <td><strong>Smear- and NAAT-negative</strong> (culture-positive or clinically diagnosed)</td>
                  <td>Lowest; data are limited</td>
                  <td>Lower priority, but not zero. <strong>Saudi NTP:</strong> still investigate if the CXR shows <strong>cavities</strong>, even with 3 negative smears (&sect;14.4) ${cite(5)}</td>
                </tr>
                <tr>
                  <td><strong>Already on effective treatment</strong></td>
                  <td>Infectiousness falls fast: most are low/non-infectious <strong>after &ge;5 days</strong> of effective therapy, regardless of sputum results (NTCA Rec 3.2 strong/moderate; Rec 3.3 conditional/moderate) ${cite(65)}. Saudi NTP: "less contagious within few days to two weeks" (&sect;14.5.4) ${cite(5)}</td>
                  <td>Exposure <strong>before</strong> treatment is what counts, which applies to this nurse</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Contact-side modifiers (these change <strong>urgency</strong>, not infectiousness):</p>
          <ul>
            <li>people with <strong>HIV</strong> progress faster than with any other known risk factor, <strong>35&ndash;162 per 1,000 person-years</strong>;</li>
            <li><strong>children &lt;5</strong> progress faster and get more disseminated disease. ${cite(4)}</li>
            <li>See Stage 2 for what this means in practice.</li>
          </ul>
          <h4>5. What to do now ${cite(66)}</h4>
          <ul>
            <li><strong>Symptom evaluation now</strong>, for everyone exposed.</li>
            <li><strong>Baseline IGRA or TST</strong> for those <strong>without</strong> documented prior LTBI or TB.</li>
            <li>A person with a <strong>documented prior positive</strong> test does <strong>not</strong> need another test for infection. They get a symptom evaluation, and further work-up only if there is concern for TB disease.</li>
            <li>If the baseline is negative, <strong>repeat 8&ndash;10 weeks after the last exposure</strong>, preferably with the <strong>same test type</strong>.</li>
          </ul>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>NTCA/CDC contact investigation (2005) ${cite(4)}</td>
                  <td>Infectious period starts 3 months before diagnosis. It ends only when all 3 criteria are met. Retest 8&ndash;10 weeks after exposure ends</td>
                  <td>Not GRADE-rated (expert guideline)</td>
                </tr>
                <tr>
                  <td>CDC healthcare-settings TB guideline (2005) ${cite(62)}</td>
                  <td>Aerosol-generating procedures, proximity/duration and ventilation drive healthcare-associated transmission</td>
                  <td>Not GRADE-rated</td>
                </tr>
                <tr>
                  <td>NTCA/CDC healthcare personnel (2019) ${cite(66)}</td>
                  <td>Symptom evaluation for all exposed staff. Test those without prior LTBI/TB. Retest at 8&ndash;10 weeks, same test. No retest if documented prior positive</td>
                  <td>Not GRADE-rated</td>
                </tr>
                <tr>
                  <td>Saudi NTP Manual (2021) ${cite(5)}</td>
                  <td>Start the contact investigation as soon as possible, generally <strong>within 1 week</strong> of diagnosis. Contacts get history, exam and a <strong>TST</strong>. If the TST is positive &rarr; CXR; if the CXR is abnormal or symptoms are present &rarr; sputum smear or Xpert (&sect;14.3, &sect;14.6.8). <strong>No 8&ndash;10-week retest is described</strong></td>
                  <td>Not graded</td>
                </tr>
                <tr>
                  <td>NTCA community isolation guideline (2024) ${cite(65)}</td>
                  <td>Most people with TB can stop <strong>community</strong> respiratory isolation after <strong>5 days of effective treatment</strong>, with exceptions: drug resistance, vulnerable contacts (children &lt;5, immunosuppressed), poor response or adherence. Extension beyond 14 days needs expert review</td>
                  <td>Rec 3.2 strong/moderate; Rec 3.3 and 4.2&ndash;4.3 conditional/moderate</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><strong>"5 days" vs "2 weeks": these answer different questions.</strong></p>
          <ul>
            <li><strong>NTCA 2024</strong> decides when a person on treatment can stop <strong>community</strong> restrictions. The guideline is explicitly for <strong>community settings</strong>. ${cite(65)}</li>
            <li><strong>CDC 2005</strong> defines the <strong>infectious period</strong> used to decide <strong>who counts as a contact</strong>. It ends only after &gt;2 weeks of effective treatment plus clinical and microbiologic response. ${cite(4)}</li>
            <li><strong>Hospital airborne isolation</strong> follows healthcare-setting rules: for example, three consecutive negative AFB smears, 8&ndash;24 h apart, one early morning. ${cite(62)}</li>
            <li>For this ICU case, the nurse's exposure was <strong>before any treatment</strong>, so the 5-day rule doesn't shorten her exposure window.</li>
          </ul>`,
        pearl:
          "Being \"exposed\" is a time window, not an event. It starts about 3 months before diagnosis and closes when isolation begins. Define it first, then list who was inside it.",
      },
      {
        title: "Baseline IGRA on day 3 is negative. Is she cleared?",
        context: "Baseline IGRA at day 3 post-exposure: negative. No symptoms.",
        question:
          "Does this rule out infection? What's next, and does the choice between TST and IGRA matter here?",
        reveal: `
          <ul>
            <li><strong>No.</strong> It takes up to <strong>8&ndash;10 weeks</strong> after exposure for the immune response to become detectable. A negative test before 8 weeks cannot exclude infection. ${cite(4)}</li>
            <li><strong>Repeat at 8&ndash;10 weeks after the last exposure</strong>, with the <strong>same test type</strong>. Switching tests makes "conversion" hard to interpret. ${cite(66)}</li>
          </ul>
          <h4>IGRA vs TST in a BCG-vaccinated workforce</h4>
          <ul>
            <li>ATS/IDSA/CDC <strong>recommend IGRA over TST</strong> in people &ge;5 years with a history of <strong>BCG vaccination</strong> (or who are unlikely to return for a TST reading). <strong>TST is an acceptable alternative</strong> when IGRA is unavailable or too costly. ${cite(1)}</li>
            <li><strong>For this nurse, BCG-vaccinated, IGRA is the right choice.</strong> This is why her baseline was an IGRA.</li>
            <li><strong>Saudi NTP Manual (2021)</strong> ${cite(5)}:
              <ul>
                <li>"Either a TST or IGRA can be used to test for LTBI" (strong, very low-quality evidence; &sect;12.4);</li>
                <li>contact investigation describes <strong>TST</strong> (&sect;14.6.8), read as positive at <strong>&ge;5 mm for recent contacts</strong> (&sect;13.8.1);</li>
                <li>the manual advises <strong>ignoring BCG</strong> when interpreting TST in people at increased risk (&sect;13.8.3);</li>
                <li>it recommends <strong>two-step TST</strong> for adults who will be retested periodically, such as healthcare staff, to avoid mistaking a "boosted" reaction for a new infection (&sect;13.9).</li>
                <li><strong>Teaching point:</strong> with TST, a BCG-vaccinated nurse needs two-step baseline testing and careful reading. IGRA avoids both problems.</li>
              </ul>
            </li>
            <li><strong>Saudi data</strong> from 1,595 healthcare workers at a Riyadh tertiary centre: <strong>90.6% were BCG-vaccinated</strong>; TST was positive in <strong>31.5%</strong> and QFT in <strong>25%</strong>, with high discordance; BCG and South-East Asian origin were associated with TST positivity. ${cite(67)}</li>
            <li>A 2026 meta-analysis of healthcare workers found pooled positivity of <strong>22% by IGRA vs 38% by TST</strong>; <strong>TST positivity tracked BCG vaccination rates, but IGRA positivity did not</strong>. ${cite(68)}</li>
          </ul>
          <h4>Exception: window prophylaxis ${cite(4)}</h4>
          <ul>
            <li><strong>Who:</strong> exposed contacts at risk of rapid progression:
              <ul>
                <li><strong>children &lt;5 years</strong>;</li>
                <li><strong>people with HIV</strong>;</li>
                <li><strong>other immunosuppression</strong>, specifically organ transplant and <strong>TNF-&alpha; antagonists</strong>. For <strong>prednisone &gt;15 mg/day</strong> the benefit is "less clear".</li>
              </ul>
            </li>
            <li><strong>Tests first (to exclude active disease):</strong>
              <ul>
                <li>symptom evaluation;</li>
                <li><strong>chest radiograph for all of them</strong>;</li>
                <li>sputum studies if either is abnormal;</li>
                <li>a <strong>baseline TST/IGRA</strong> at the same visit, so the repeat can be compared. In <strong>healthy children &lt;5</strong>, ATS/IDSA/CDC <strong>suggest TST over IGRA</strong>; some experts use IGRA above age 3. ${cite(1)}</li>
              </ul>
            </li>
            <li><strong>When to start:</strong> an LTBI regimen as soon as active TB is excluded. <strong>Don't wait</strong> for the 8&ndash;10-week result.</li>
            <li><strong>After the 8&ndash;10-week repeat:</strong>
              <ul>
                <li><strong>child, repeat negative</strong> &rarr; stop;</li>
                <li><strong>repeat positive</strong> &rarr; complete a full LTBI course;</li>
                <li><strong>HIV or other significant immunosuppression</strong> &rarr; a <strong>full LTBI course even if the repeat is negative</strong>, because a false-negative test is likely.</li>
              </ul>
            </li>
            <li><strong>Evidence level:</strong> CDC describes the evidence for window prophylaxis as <strong>"inferential"</strong>.</li>
            <li><strong>Relevance to this nurse:</strong> none. She is an immunocompetent adult, so she waits for the repeat test.</li>
          </ul>`,
        pearl:
          "The window period is the single most important concept in exposure management. A same-week negative test is a baseline, not a clearance.",
      },
      {
        title: "Day 10: fever, cough and a lobar consolidation. Is this TB?",
        context:
          "Ten days after the exposure she develops <strong>rhinorrhea, fever, cough and shortness of breath</strong>. SpO<sub>2</sub> is 96% on room air, she has no comorbidities, and she is managed as an outpatient. <strong>CXR shows right lower lobe consolidation.</strong>",
        question: "Does this change your TB plan? How do you manage her?",
        reveal: `
          <p><strong>Differential first</strong>, most to least likely:</p>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Diagnosis</th><th>Test</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>Bacterial CAP</strong> (e.g. <em>S. pneumoniae</em>)</td>
                  <td>Clinical diagnosis plus CXR (done). Blood and sputum cultures are not routine outside severe or hospitalized cases ${cite(69)}</td>
                </tr>
                <tr>
                  <td><strong>Viral pneumonia</strong> (influenza, SARS-CoV-2, RSV)</td>
                  <td><strong>Respiratory viral NAAT</strong>, especially influenza when it is circulating ${cite(70)}</td>
                </tr>
                <tr>
                  <td><strong>Atypical bacterial CAP</strong> (<em>Mycoplasma</em>, <em>Chlamydophila</em>)</td>
                  <td>Clinical; atypical testing when indicated ${cite(69)}</td>
                </tr>
                <tr>
                  <td><strong>Pulmonary TB</strong> (least likely at day 10)</td>
                  <td>Only if the course is atypical (see below): sputum AFB smear, culture, NAAT ${cite(1)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>Why TB is unlikely now ${cite(71)}</h4>
          <ul>
            <li>After infection, the TST converts within <strong>&lt;6 weeks</strong>.</li>
            <li>Active TB typically appears <strong>3&ndash;9 months</strong> later, and <strong>almost always within 2 years</strong>.</li>
            <li><strong>Disease 10 days after exposure would be biologically implausible.</strong></li>
          </ul>
          <h4>Management</h4>
          <ul>
            <li><strong>Treat as CAP.</strong>
              <ul>
                <li><strong>ATS/IDSA 2019</strong> (healthy outpatient): <strong>amoxicillin 1 g three times daily</strong> (strong); doxycycline (conditional); a macrolide only where pneumococcal macrolide resistance is &lt;25%. ${cite(70)}</li>
                <li><strong>Saudi Thoracic Society 2025:</strong> <strong>beta-lactams first-line</strong>. In outpatients it suggests <strong>macrolides over fluoroquinolones</strong> (conditional, very low certainty). It reserves quinolones as second-line in children because TB is endemic in the region. ${cite(69)}</li>
              </ul>
            </li>
            <li><strong>Avoid an empiric fluoroquinolone here.</strong> In a meta-analysis, empiric fluoroquinolones for pneumonia <strong>delayed TB diagnosis and treatment by ~19 days</strong> and raised the odds of <strong>fluoroquinolone-resistant <em>M. tuberculosis</em></strong> (OR <strong>2.70</strong>). ${cite(72)} This matters in anyone with a recent TB exposure.</li>
            <li><strong>No airborne isolation and no TB work-up</strong> unless the course is atypical: no response to appropriate CAP treatment, cavitation, or symptoms that persist.</li>
            <li><strong>Keep the scheduled 8&ndash;10-week repeat IGRA.</strong> The pneumonia doesn't change it.</li>
          </ul>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>ATS/IDSA CAP (2019) ${cite(70)}</td>
                  <td>Healthy outpatient: amoxicillin, <strong>or</strong> doxycycline, <strong>or</strong> a macrolide if local resistance &lt;25%</td>
                  <td>Strong/moderate; conditional/low; conditional/moderate</td>
                </tr>
                <tr>
                  <td>ATS/IDSA CAP (2019) ${cite(70)}</td>
                  <td>Test for influenza with a rapid molecular assay when influenza is circulating</td>
                  <td>Strong, moderate</td>
                </tr>
                <tr>
                  <td>Saudi Thoracic Society CAP (2025) ${cite(69)}</td>
                  <td>Outpatient: macrolides over fluoroquinolones; beta-lactams first-line</td>
                  <td>Conditional, very low</td>
                </tr>
              </tbody>
            </table>
          </div>`,
        pearl:
          "Don't anchor on the exposure. TB takes months, not days. A lobar pneumonia at day 10 is pneumonia, and the drug you choose for it (not a fluoroquinolone) protects the TB work-up you may need later.",
      },
      {
        title: "Nine weeks later, repeat IGRA positive. Now what?",
        context: "Nine weeks later, the repeat IGRA is positive. The CAP has resolved.",
        question:
          "What must you establish before treating, and why treat at all?",
        reveal: `
          <h4>Rule out active disease first</h4>
          <ul>
            <li><strong>Symptom evaluation plus CXR</strong> for everyone with a new positive test, with sputum studies if either is abnormal. ${cite(66, 1)}</li>
            <li>IGRA and TST cannot tell latent from active TB, so disease must be excluded before starting LTBI treatment. ${cite(1)}</li>
            <li><strong>Why it matters:</strong> preventive treatment given for unrecognized active TB under-treats the disease. Trials have not shown a significant rise in drug resistance, but that risk cannot be excluded, so active TB must be ruled out first.
              <ul>
                <li><strong>Rifamycin regimens:</strong> a meta-analysis of 6 RCTs found <strong>no statistically significant increase</strong> in rifamycin resistance vs non-rifamycin regimens (RR 3.45, 95% CI 0.72&ndash;16.56). The wide confidence interval means a risk <strong>cannot be excluded</strong>. ${cite(73)}</li>
                <li><strong>Isoniazid preventive therapy:</strong> 13 studies; summary RR for isoniazid resistance <strong>1.45</strong> (95% CI 0.85&ndash;2.47). The findings "do not exclude an increased risk", and the authors conclude active TB <strong>should be excluded before IPT</strong>. ${cite(74)}</li>
              </ul>
            </li>
          </ul>
          ${img(5, "stage4", "cxr-normal", "Normal CXR — shown here only to illustrate the active-disease-exclusion step, not a specific finding")}
          <h4>Why treat? Her risk from here</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Question</th><th>Evidence</th></tr></thead>
              <tbody>
                <tr>
                  <td>How often do close contacts get infected?</td>
                  <td>Latent infection in <strong>28%</strong> of contacts in high-income settings and <strong>52%</strong> in low/middle-income settings. Active TB in <strong>1.4%</strong> and <strong>3.1%</strong>. <strong>Incidence is highest in the first year.</strong> ${cite(75)}</td>
                </tr>
                <tr>
                  <td>Healthcare workers specifically</td>
                  <td>Pooled <strong>IGRA conversion ~8%</strong> in serially tested healthcare workers ${cite(68)}</td>
                </tr>
                <tr>
                  <td>Lifetime risk of disease with LTBI (healthy adult)</td>
                  <td><strong>~5&ndash;10%</strong> (WHO estimate, as quoted by Behr 2018) ${cite(71)}</td>
                </tr>
                <tr>
                  <td><strong>When</strong> that risk falls</td>
                  <td>Of eventual cases: <strong>45% by 1 year, 62% by 2 years, 83% by 5 years</strong> (Borgdorff). Among Amsterdam contacts, <strong>75% within 1 year and 97% within 2 years</strong> (Sloot) ${cite(71)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><strong>Takeaway:</strong> the risk is <strong>front-loaded</strong>, which is why TPT is offered promptly after a documented conversion.</p>
          <h4>Higher-risk groups (relative risk of progression)</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Group</th><th>Figure</th><th>Source</th></tr></thead>
              <tbody>
                <tr><td><strong>HIV</strong></td><td><strong>35&ndash;162 per 1,000 person-years</strong>, the highest of any known factor</td><td>${cite(4)}</td></tr>
                <tr><td><strong>TNF-&alpha; inhibitors (monoclonal antibodies)</strong></td><td>TB standardized incidence ratio: <strong>infliximab 18.6, adalimumab 29.3</strong></td><td>${cite(76)}</td></tr>
                <tr><td><strong>TNF-&alpha; inhibitor (etanercept)</strong></td><td>SIR <strong>1.8</strong>, much lower</td><td>${cite(76)}</td></tr>
                <tr><td><strong>JAK inhibitor (tofacitinib)</strong></td><td>TB was the most common opportunistic infection: <strong>0.21/100 PY</strong> overall and <strong>0.75/100 PY in high-incidence regions</strong></td><td>${cite(77)}</td></tr>
                <tr><td><strong>Diabetes</strong></td><td><strong>RR 3.11</strong> (95% CI 2.27&ndash;4.26)</td><td>${cite(78)}</td></tr>
                <tr><td><strong>Corticosteroids</strong></td><td><strong>&ge;15 mg/day prednisone-equivalent for &ge;1 month</strong> is listed as an immunosuppression risk factor. CDC calls the benefit of a full course "less clear"</td><td>${cite(66, 4)}</td></tr>
                <tr><td><strong>Transplant, dialysis, silicosis</strong></td><td>WHO <strong>strongly recommends</strong> systematic testing and treatment in these groups</td><td>${cite(79)}</td></tr>
              </tbody>
            </table>
          </div>`,
        pearl:
          "A conversion is a recent infection, and recent infection is when TB happens. Most of the lifetime risk arrives in the first two years, which is the window TPT is meant to close.",
      },
      {
        title: "Active disease excluded. Which regimen, and what's the evidence?",
        question:
          "Active disease has been excluded. Which preventive regimen do you choose, and what evidence supports it?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Comparison</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td>Sterling 2011, PREVENT TB ${cite(80)}</td>
                  <td><strong>3HP</strong> (rifapentine 900 mg + isoniazid 900 mg weekly &times;12, observed) vs <strong>9H</strong></td>
                  <td>TB <strong>0.19% vs 0.43%</strong>; non-inferior; higher completion, less hepatotoxicity</td>
                </tr>
                <tr>
                  <td>Menzies 2018 ${cite(81)}</td>
                  <td><strong>4R</strong> (daily rifampin &times;4 months) vs <strong>9H</strong></td>
                  <td>Non-inferior; completion <strong>+15.1 points</strong>; fewer grade 3&ndash;5 adverse events</td>
                </tr>
                <tr>
                  <td>Swindells 2019, BRIEF-TB ${cite(82)}</td>
                  <td><strong>1HP</strong> (daily rifapentine + isoniazid &times;1 month) vs <strong>9H</strong>, in <strong>people with HIV</strong></td>
                  <td>TB/death <strong>0.65 vs 0.67 per 100 PY</strong>; non-inferior; completion <strong>97% vs 90%</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style="color:var(--text-muted); font-size:0.9rem;">BRIEF-TB enrolled only people with HIV. That is why WHO's recommendation for 1HP is conditional. ${cite(82, 83)}</p>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>NTCA/CDC LTBI treatment (2020) ${cite(84)}</td>
                  <td><strong>Preferred:</strong> short rifamycin regimens (3HP, 4R, 3HR) over 6&ndash;9 months of isoniazid</td>
                  <td>3HP: strong, moderate. 4R: strong, moderate (HIV-negative). 3HR: conditional, very low (HIV-negative) / conditional, low (HIV-positive)</td>
                </tr>
                <tr>
                  <td>WHO TPT, Module 1, 2nd ed. (2024) ${cite(83)}</td>
                  <td>6H/9H, 3HP, 3HR</td>
                  <td><strong>Strong</strong>, moderate&ndash;high</td>
                </tr>
                <tr>
                  <td>WHO (2024) ${cite(83)}</td>
                  <td>1HP, 4R</td>
                  <td>Conditional, low&ndash;moderate</td>
                </tr>
                <tr>
                  <td>WHO (2024) ${cite(83)}</td>
                  <td><strong>6 months of levofloxacin (6Lfx)</strong> for contacts of <strong>MDR/RR-TB</strong>. Not for this nurse: her source was drug-susceptible</td>
                  <td>Strong</td>
                </tr>
                <tr>
                  <td>Saudi NTP Manual (2021) ${cite(5)}</td>
                  <td><strong>6H</strong> recommended (&sect;12.5)</td>
                  <td>Strong, high</td>
                </tr>
                <tr>
                  <td>Saudi NTP Manual (2021) ${cite(5)}</td>
                  <td>For low-incidence countries (KSA): <strong>9H, 3HP, 3&ndash;4 months HR, or 3&ndash;4 months rifampicin alone</strong> as alternatives to 6H</td>
                  <td>Strong, moderate&ndash;high</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>Her regimen</h4>
          <ul>
            <li><strong>Rifapentine is not available in Saudi Arabia.</strong> 3HP and 1HP are shown as options that exist internationally, <strong>but not what this nurse receives.</strong></li>
            <li><strong>This nurse: 4R</strong>, daily rifampin for 4 months. It is non-inferior to 9H, with higher completion and fewer serious adverse events ${cite(81)}, and is among the preferred short regimens ${cite(84)}.</li>
            <li><strong>Alternative with no rifapentine: 3HR</strong>, daily isoniazid + rifampin for 3 months (WHO strong recommendation ${cite(83)}).</li>
            <li><strong>Dose (Saudi NTP Manual table, &sect;12.5):</strong> rifampicin <strong>10 mg/kg daily, max 600 mg</strong> (adults), for 3&ndash;4 months. For 3HR, add isoniazid 5 mg/kg, max 300 mg. ${cite(5)}</li>
            <li>Note: the Saudi manual still lists 3HP as an option ${cite(5)}, even though rifapentine is not available locally.</li>
          </ul>`,
        pearl:
          "Pick the best regimen you can actually get. Rifapentine isn't available here, so 4R or 3HR it is. Short rifamycin regimens are now preferred because they rest on large non-inferiority trials and are completed more often. A regimen that gets finished protects better than a longer one that doesn't.",
      },
      {
        title: "Zooming out: who should be tested for LTBI at all?",
        question:
          "Outside a documented exposure like this one, who should actually be tested for LTBI — and why does that question matter before you even pick a test?",
        reveal: `
          <ul>
            <li><strong>Test only if you would treat a positive result.</strong> Guidelines advise <strong>against testing people at low risk</strong> of infection and progression. ${cite(1)}</li>
            <li><strong>WHO</strong> (guideline for countries with incidence &lt;100/100,000, which includes Saudi Arabia) ${cite(79)}:
              <ul>
                <li><strong>strongly recommends</strong> systematic testing and treatment for people with HIV; adult and child contacts; patients <strong>starting anti-TNF treatment</strong>; patients on dialysis; patients preparing for transplant; and patients with silicosis;</li>
                <li><strong>conditionally recommends</strong> it for <strong>healthcare workers</strong>; <strong>immigrants from high-burden countries</strong>; and prisoners, homeless people and people who use drugs.</li>
              </ul>
            </li>
            <li><strong>Saudi policy</strong> ${cite(5)}:
              <ul>
                <li><strong>household contacts</strong> of bacteriologically confirmed PTB "should be systematically tested and treated for LTBI" because KSA is low-incidence (strong, high&ndash;moderate);</li>
                <li><strong>anti-TNF, dialysis, pre-transplant and silicosis</strong> patients: systematic testing and treatment (strong, low&ndash;very low);</li>
                <li><strong>health workers and immigrants from high-burden countries:</strong> "may be considered" (conditional, low&ndash;very low);</li>
                <li><strong>not</strong> recommended for diabetes, harmful alcohol use, smokers or underweight people alone (conditional, very low) (&sect;12);</li>
                <li>its major policies also state that <strong>all healthcare professionals are screened for latent TB</strong> under infection-prevention protocols (&sect;2.3);</li>
                <li><strong>immigrants from high-burden regions</strong> seeking long residency undergo <strong>active case finding</strong>: a first assessment in the home country and re-examination on arrival. Note this is screening for <strong>active</strong> TB, not LTBI.</li>
              </ul>
            </li>
            <li><strong>Before any biologic or JAK inhibitor:</strong>
              <ul>
                <li>International recommendations agree on <strong>screening before starting</strong>: IGRA/TST plus CXR, with many advising <strong>both tests in BCG-vaccinated patients</strong>. Patients with LTBI should <strong>receive TPT before the biologic</strong>. ${cite(85)}</li>
                <li>Why it matters: in the French RATIO registry, <strong>none</strong> of the anti-TNF-associated TB cases had received correct prophylaxis. ${cite(76)}</li>
                <li><strong>How long before?</strong> Start TPT before or with the biologic. The ideal lead-in time is not standardized. Observational data suggest a <strong>concurrent start</strong> can be safe: 263 patients took isoniazid alongside tofacitinib with <strong>no TB cases</strong> ${cite(77)}, and a small Nepal cohort started adalimumab on the same day as 3HR with <strong>no reactivation</strong> ${cite(86)}.</li>
              </ul>
            </li>
            <li><strong>Test choice</strong> (IGRA in BCG-vaccinated people; TST acceptable): see Stage 2. ${cite(1)}</li>
          </ul>`,
        pearl:
          "LTBI testing is a treatment decision dressed up as a diagnostic test. Decide you will treat a positive result before you order it, or don't order it.",
      },
    ],
  },

  // ============================================================
  // CASE 6
  // ============================================================
  {
    id: 6,
    section: "extrapulmonary",
    title: "31-year-old man with fever and a one-sided pleural effusion",
    hubDescription:
      "A young man with a lymphocytic pleural effusion: what the fluid can and can't tell you, when tissue is worth getting, drainage versus steroids, and why a clean lung field doesn't mean clean sputum.",
    vignette:
      "31-year-old Saudi man, previously healthy, with 3 weeks of fever, dry cough and right-sided pleuritic chest pain, and increasing breathlessness over the last week. CXR: moderate right pleural effusion; no visible parenchymal lesion. HIV status unknown." +
      img(6, "stage1", "cxr-effusion", "Unilateral right pleural effusion on chest radiograph (reference image, not this patient)"),
    stages: [
      {
        title: "What do you send?",
        question: "Given this presentation, what do you send, specifically?",
        reveal: `
          <p><em>Why this patient:</em> in a 5-year prospective study in the Eastern Province, TB caused <strong>35.2%</strong> of all pleural effusions. Patients were young (mean age 33) and mostly men (82%). ${cite(87)}</p>
          <p><strong>Differential first</strong>, most to least likely, each paired with its test:</p>
          <ol>
            <li><strong>Tuberculous pleurisy</strong>
              <ul>
                <li><strong>Diagnostic thoracentesis:</strong> protein and LDH (to confirm an exudate by Light's criteria) ${cite(88)}; <strong>cell count and differential</strong> ${cite(1)}; <strong>adenosine deaminase (ADA)</strong>, &plusmn; free interferon-&gamma; ${cite(1)}; <strong>AFB smear, mycobacterial culture and Xpert Ultra</strong> on the fluid ${cite(1)}.</li>
                <li><strong>Sputum as well, induced if he can't produce any, even with a clear lung field.</strong> In patients with suspected pleural TB who could not produce sputum, induced-sputum culture was positive in <strong>55%</strong> of those whose only CXR abnormality was the effusion. ${cite(89)}</li>
              </ul>
            </li>
            <li><strong>Parapneumonic effusion or empyema</strong>
              <ul><li>Gram stain and bacterial culture on the same fluid.</li></ul>
            </li>
            <li><strong>Malignant effusion</strong> (lymphoma, metastatic disease)
              <ul><li>Pleural fluid cytology; pleural biopsy if the work-up stays non-diagnostic. Among undiagnosed exudates in a high-TB-incidence setting, 82% were TB and 10% malignancy. ${cite(90)}</li></ul>
            </li>
          </ol>
          <p><strong>Also:</strong> an <strong>HIV test</strong>, which is routine for everyone with presumptive TB. ${cite(3)}</p>`,
        pearl:
          "A clean lung field doesn't mean clean sputum. Induce sputum in suspected pleural TB: it can give you a culture, and therefore drug susceptibility, without a biopsy.",
      },
      {
        title: "The fluid results",
        context:
          "Straw-coloured exudate, <strong>lymphocyte-predominant</strong>. <strong>ADA 78 U/L.</strong> AFB smear negative. <strong>Xpert Ultra: MTB not detected.</strong> Cultures pending.",
        question:
          "Does a negative smear and Xpert rule out TB here? How much weight does the ADA carry?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Test (pleural fluid)</th><th>Source</th><th>Sensitivity</th><th>Specificity</th><th>Note</th></tr></thead>
              <tbody>
                <tr><td><strong>ADA</strong></td><td>Meta-analysis, 174 studies, 27,009 patients ${cite(91)}</td><td><strong>92%</strong> (90&ndash;93)</td><td><strong>90%</strong> (88&ndash;91)</td><td>At the common 40 &plusmn; 4 IU/L threshold: 93% / 90%. All studies had a <strong>high risk of bias</strong></td></tr>
                <tr><td><strong>ADA</strong></td><td>5 earlier meta-analyses, summarised by ATS/IDSA/CDC ${cite(1)}</td><td>89&ndash;99%</td><td>88&ndash;97%</td><td>Thresholds ranged from 10 to 71 U/L</td></tr>
                <tr><td><strong>Free IFN-&gamma;</strong></td><td>Meta-analysis of 22 studies, summarised by ATS/IDSA/CDC ${cite(1)}</td><td>89%</td><td>97%</td><td>Thresholds varied widely</td></tr>
                <tr><td><strong>Xpert Ultra</strong></td><td>Cochrane 2025, 13 studies ${cite(92)}</td><td><strong>74.0%</strong> (60.8&ndash;83.9)</td><td>88.1% (78.8&ndash;93.6)</td><td>Against culture; low / very low certainty</td></tr>
                <tr><td><strong>NAAT (any)</strong></td><td>ATS/IDSA/CDC ${cite(1)}</td><td>56%</td><td>98%</td><td></td></tr>
                <tr><td><strong>AFB smear</strong></td><td>ATS/IDSA/CDC ${cite(1)}</td><td><strong>0&ndash;10%</strong></td><td>high</td><td></td></tr>
                <tr><td><strong>Mycobacterial culture</strong></td><td>ATS/IDSA/CDC ${cite(1)}</td><td>23&ndash;58%</td><td>&gt;97%</td><td>The only route to an isolate for DST</td></tr>
              </tbody>
            </table>
          </div>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr><td>ATS/IDSA/CDC (2017) ${cite(1)}</td><td>Measure <strong>ADA</strong> on fluid in suspected pleural TB</td><td>Conditional, low</td></tr>
                <tr><td>Same ${cite(1)}</td><td>Measure <strong>free IFN-&gamma;</strong> on fluid in suspected pleural TB</td><td>Conditional, low</td></tr>
                <tr><td>Same ${cite(1)}</td><td><strong>Mycobacterial culture</strong> on extrapulmonary specimens</td><td><strong>Strong</strong>, low</td></tr>
                <tr><td>Same ${cite(1)}</td><td><strong>AFB smear</strong> and <strong>NAAT</strong> on extrapulmonary specimens. A positive result supports TB; <strong>a negative result may not be used to exclude TB</strong></td><td>Conditional, very low</td></tr>
                <tr><td>Saudi NTP Manual (2021) ${cite(5)}</td><td>Xpert is recommended for extrapulmonary specimens, "however, the test has <strong>low sensitivity for pleural fluid</strong> specimens" (Chapter 3 algorithm)</td><td>Not graded</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>Take-home:</strong> <strong>no.</strong> In pleural fluid, a negative smear or NAAT never excludes TB. ${cite(1)} A lymphocytic exudate with a high ADA is strong <strong>supporting</strong> evidence. ATS/IDSA/CDC stress that neither ADA nor IFN-&gamma; "provide a definitive diagnosis"; they "must be interpreted in the entire clinical context". ${cite(1)}</p>`,
        pearl:
          "In pleural TB, the fluid is full of the immune response and almost empty of bacilli. That's why ADA performs well and the smear fails.",
      },
      {
        title: "Treat now, or biopsy first?",
        question:
          "With a lymphocytic, high-ADA exudate and negative microbiology, do you start treatment now or get pleural tissue first?",
        reveal: `
          <h4>Studies: diagnostic yield of each specimen</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Setting</th><th>Key result</th></tr></thead>
              <tbody>
                <tr><td>Diacon 2003 ${cite(90)}</td><td>Prospective, 51 undiagnosed exudates (82% TB), South Africa</td><td><strong>Closed needle biopsy:</strong> histology 66%, culture 48%, combined <strong>79%</strong>. <strong>Thoracoscopy:</strong> histology 100%, culture 76%, combined <strong>100%</strong>. Both 100% specific. <strong>ADA &ge;50 U/L:</strong> 95% sensitive, 89% specific. <strong>ADA + lymphocyte/neutrophil ratio &ge;0.75 + closed biopsy:</strong> 93% sensitive, 100% specific</td></tr>
                <tr><td>Conde 2003 ${cite(89)}</td><td>Prospective, 84 pleural TB, Brazil</td><td>Pleural biopsy histology <strong>78%</strong>. Culture yield: pleural tissue <strong>62%</strong>, pleural fluid <strong>12%</strong>, induced sputum <strong>52%</strong></td></tr>
                <tr><td>al-Quorain 1994 ${cite(87)}</td><td>Prospective, 89 pleural TB, Eastern Province, KSA</td><td>Culture or histology positive: pleural biopsy <strong>68.5%</strong>, pleural fluid <strong>10%</strong>, sputum <strong>2%</strong></td></tr>
                <tr><td>ATS/IDSA/CDC summary ${cite(1)}</td><td>Accuracy studies</td><td>Pleural <strong>tissue</strong>: histology 69&ndash;97%, culture 40&ndash;58%, smear 14&ndash;39%</td></tr>
              </tbody>
            </table>
          </div>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr><td>ATS/IDSA/CDC (2017) ${cite(1)}</td><td><strong>Histology</strong> on specimens from suspected extrapulmonary TB. Positive and negative results are read "in the context of the clinical scenario because neither false-positive nor false-negative results are rare"</td><td>Conditional, very low</td></tr>
                <tr><td>ATS/CDC/IDSA treatment (2016) ${cite(3)}</td><td>Empiric multidrug treatment is started in almost all situations in which active TB is suspected</td><td>(general principle)</td></tr>
              </tbody>
            </table>
          </div>
          <h4>Reasoning for this patient</h4>
          <ul>
            <li>A young man in a high-prevalence setting, with a lymphocytic exudate and ADA 78, has a high probability of TB. <strong>Starting treatment now is reasonable.</strong> ${cite(3, 91)}</li>
            <li><strong>Tissue still earns its place.</strong> It is the best route to a positive <strong>culture</strong>, and so to <strong>drug-susceptibility testing</strong>; NAAT "does not produce an isolate, which is needed for DST". ${cite(1)} Tissue also excludes malignancy. Pleural biopsy was the single most useful test in the Saudi series. ${cite(87)}</li>
            <li><strong>If the ADA were low, the fluid neutrophilic, or the patient older:</strong> go to biopsy before treating. Thoracoscopy has the highest yield where it's available. ${cite(90)}</li>
          </ul>`,
        pearl:
          "High ADA is enough to start treatment; it isn't enough to get a susceptibility result. Culture of pleural tissue or induced sputum gives you both a diagnosis and a DST.",
      },
      {
        title: "Treatment: how long, drain it, and steroids?",
        context: "He starts treatment. The effusion is moderate and he is breathless.",
        question:
          "What regimen and duration? Should the effusion be drained? Do adjunctive corticosteroids help?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Design</th><th>Key result</th></tr></thead>
              <tbody>
                <tr><td><strong>Ryan 2017, Cochrane</strong> ${cite(93)}</td><td>6 RCTs, 590 participants (1 trial in HIV-positive people)</td><td>Corticosteroids <strong>may speed resolution</strong>. Residual effusion reduced at 8 weeks (RR 0.54) and at 24 weeks (RR 0.35); residual pleural changes reduced (RR 0.72, ARR 16%). <strong>Low certainty.</strong> No long-term lung-function benefit shown (very low certainty). <strong>More adverse events leading to discontinuation</strong> (RR 2.78). <strong>Kaposi sarcoma 6/99 vs 0/98</strong> in the HIV trial</td></tr>
                <tr><td><strong>Bhuniya 2012</strong> ${cite(94)}</td><td>Randomized, open-label, 52 patients</td><td><strong>Therapeutic</strong> vs diagnostic-only thoracentesis. Better FEV1/FVC recovery and <strong>less pleural thickening</strong> with therapeutic drainage over 6 months</td></tr>
              </tbody>
            </table>
          </div>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr><td>ATS/CDC/IDSA (2016) ${cite(3)}</td><td><strong>A standard 6-month regimen is adequate</strong> for pleural TB</td><td>(narrative recommendation)</td></tr>
                <tr><td>Same ${cite(3)}</td><td><strong>No evidence to support routine adjunctive corticosteroids.</strong> In 4 RCTs, steroids did not reduce residual pleural thickening; in HIV-associated pleurisy they increased Kaposi sarcoma</td><td>(narrative recommendation)</td></tr>
                <tr><td>Same ${cite(3)}</td><td><strong>Tuberculous empyema</strong> (a cavity rupturing into the pleural space): drainage, often surgical, plus chemotherapy; optimal duration not established</td><td>(narrative)</td></tr>
                <tr><td>Saudi NTP Manual (2021) ${cite(5)}</td><td><strong>2HRZE/4HR</strong> is the stated regimen for drug-susceptible <strong>pulmonary</strong> TB (&sect;5.5.1). The extrapulmonary section (&sect;5.5.3) recommends steroids <strong>only for TB meningitis and pericarditis</strong>, and says nothing specific about pleural TB</td><td>Not graded</td></tr>
              </tbody>
            </table>
          </div>
          <h4>Answer for this patient</h4>
          <ul>
            <li><strong>2HRZE/4HR for 6 months.</strong> ${cite(3, 5)}</li>
            <li><strong>Therapeutic thoracentesis</strong> to relieve his breathlessness. ${cite(94)}</li>
            <li><strong>No routine steroids.</strong> ${cite(3)}</li>
          </ul>
          <p><strong>Why the two sources seem to disagree on steroids:</strong> the Cochrane review (6 trials) found a <em>possible</em> reduction in residual pleural changes, at low certainty ${cite(93)}, while ATS 2016 read 4 trials as showing no benefit ${cite(3)}. Both agree there is <strong>no proven long-term functional benefit</strong>, and there is a signal of <strong>harm</strong> (discontinuations; Kaposi sarcoma in HIV).</p>`,
        pearl:
          "Drain the fluid for breathlessness. Don't reach for steroids to prevent pleural thickening: the benefit is uncertain, and the harm in HIV isn't.",
      },
      {
        title: "Week 3: the induced-sputum culture grows <em>M. tuberculosis</em>",
        context:
          "Three weeks into treatment, the induced-sputum culture sent on day 1 grows <em>M. tuberculosis</em>, fully susceptible. Repeat CXR still shows no parenchymal lesion.",
        question: "Does this change how he is classified, and does it matter for his contacts?",
        reveal: `
          <ul>
            <li><strong>Classification changes.</strong> Under the Saudi NTP Manual, pleural effusion <strong>without</strong> lung abnormality is extrapulmonary TB, but a patient with <strong>both</strong> pulmonary and extrapulmonary TB is classified as <strong>pulmonary</strong> TB. ${cite(5)} A positive sputum culture shows airway involvement.</li>
            <li><strong>Why it matters:</strong> the manual describes pleural TB as "reputed to be noninfectious". ${cite(5)} A positive sputum culture moves him out of that category. Household contacts of bacteriologically confirmed pulmonary TB "should be systematically tested and treated for LTBI" (Saudi policy, strong). ${cite(5)}</li>
            <li><strong>This is common, not a curiosity.</strong> In patients with suspected pleural TB who could not produce sputum, induced-sputum culture was positive in 55% of those with an otherwise normal CXR. ${cite(89)}</li>
            <li><strong>A bonus:</strong> the isolate gives a full DST. ${cite(1)}</li>
            <li><strong>Action:</strong> update the notification to the TB programme and start the household contact investigation.</li>
          </ul>`,
        pearl:
          "\"Pleural TB is not infectious\" holds only until the sputum says otherwise. That is one more reason to induce sputum on day 1.",
      },
      {
        title: "Week 8: the effusion is bigger",
        context:
          "Eight weeks into fully supervised treatment, he feels well. The CXR shows the right effusion has <strong>enlarged</strong>.",
        question: "Is this treatment failure? What do you do?",
        reveal: `
          <p><strong>Most likely a paradoxical response, but that is a diagnosis of exclusion.</strong> It is made only after a thorough evaluation has excluded other causes, particularly <strong>treatment failure and drug resistance</strong>. New or enlarging pleural effusions are a recognised pattern. ${cite(3)} Here his isolate is fully susceptible and adherence is documented.</p>
          <h4>How common</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Setting</th><th>Key result</th></tr></thead>
              <tbody>
                <tr><td><strong>Al-Majed 1996</strong> ${cite(95)}</td><td>Riyadh, 3 hospitals, 61 proven pleural TB</td><td>Paradoxical enlargement in <strong>16% (10/61)</strong>. 6 became massive and needed therapeutic aspiration; 5 received corticosteroids. <strong>All resolved within 1&ndash;3 months</strong>; 3 left residual pleural thickening</td></tr>
                <tr><td><strong>Jeon 2012</strong> ${cite(96)}</td><td>Korea, multicentre, 458 HIV-negative isolated pleural TB</td><td><strong>16%</strong>, at a mean of <strong>8.8 weeks</strong>. 81% presented as enlargement of the existing effusion; <strong>68% had no symptoms</strong>. Linked to higher fluid eosinophils and lower fluid protein at diagnosis</td></tr>
              </tbody>
            </table>
          </div>
          <h4>What to do</h4>
          <ul>
            <li><strong>Continue the same regimen.</strong> ${cite(3)}</li>
            <li>Confirm adherence and susceptibility. ${cite(3)}</li>
            <li><strong>Therapeutic aspiration if breathless.</strong> ${cite(95)}</li>
            <li>Re-sample if the picture is atypical (fever returns, fluid turns purulent). ${cite(3)}</li>
            <li><strong>Steroids:</strong> used for massive paradoxical effusions in the Riyadh series. That is observational evidence only. ${cite(95)}</li>
          </ul>`,
        pearl:
          "At 2 months, a bigger effusion in a patient who feels well is usually the immune response catching up. Prove adherence and susceptibility, drain it if he's breathless, and don't change the drugs.",
      },
    ],
  },

  // ============================================================
  // CASE 7
  // ============================================================
  {
    id: 7,
    section: "extrapulmonary",
    title: "46-year-old man with three months of back pain and weight loss",
    hubDescription:
      "Back pain, night sweats and weight loss in a man who drinks unpasteurized milk: separating the two leading causes on imaging and microbiology, why tissue comes before treatment, and when a spine needs a surgeon.",
    vignette:
      "46-year-old Saudi man from a rural area who regularly drinks unpasteurized milk. Three months of worsening mid-back pain, night sweats and 7 kg weight loss. Tender over the lower thoracic spine. Neurologically intact. No prior TB.",
    stages: [
      {
        title: "What do you send?",
        question: "Given this presentation, what do you send, specifically?",
        reveal: `
          <p><strong>Differential first</strong>, each paired with its test:</p>
          <ol>
            <li><strong>Tuberculous spondylitis (Pott's disease)</strong>
              <ul>
                <li><strong>MRI of the whole spine</strong> first.</li>
                <li>Then <strong>image-guided biopsy</strong> of the vertebra or paravertebral collection for <strong>histology</strong>, <strong>mycobacterial culture</strong> (strong recommendation), and <strong>AFB smear and NAAT</strong> (Xpert). ${cite(1)}</li>
                <li><strong>CXR</strong>, and sputum if the chest is abnormal.</li>
              </ul>
            </li>
            <li><strong>Brucellar spondylitis</strong>
              <ul>
                <li><strong>Brucella serology and blood cultures.</strong> In a Saudi series, 21 of 173 patients with backache and a history of raw-milk ingestion had brucellar spondylitis, and most had positive Brucella titres. ${cite(97)}</li>
                <li>The clinical pattern suggests one or the other, "but the definitive diagnosis depends upon bacteriological tests". ${cite(98)}</li>
              </ul>
            </li>
            <li><strong>Pyogenic spondylodiscitis</strong>
              <ul><li>Blood cultures, plus bacterial culture of the biopsy.</li></ul>
            </li>
            <li><strong>Malignancy</strong> (metastasis, myeloma, lymphoma)
              <ul><li>Histology on the same biopsy.</li></ul>
            </li>
          </ol>
          <p><strong>Also:</strong> an HIV test. ${cite(3)}</p>`,
        pearl:
          "In Saudi Arabia, spinal infection with a raw-milk history has two leading causes, TB and brucella. Send for both before anyone reaches for a biopsy needle or a prescription.",
      },
      {
        title: "The MRI",
        context:
          "MRI: destruction of <strong>T8 and T9</strong>, with disc involvement, a <strong>large paravertebral abscess</strong>, and <strong>subligamentous spread over three levels</strong>. Early vertebral collapse. The lumbar spine is normal." +
          img(7, "stage2", "spine-pathology", "Tuberculosis of the spinal column, autopsy specimen (reference image, not this patient)"),
        question: "Does the imaging favour TB or brucella?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Feature</th><th>Tuberculous spondylitis</th><th>Brucellar spondylitis</th><th>Source</th></tr></thead>
              <tbody>
                <tr><td>Level</td><td><strong>Mid-thoracic</strong> (73% of lesions)</td><td><strong>Lower lumbar</strong> (68%)</td><td>Sharif 1989, Riyadh ${cite(99)}</td></tr>
                <tr><td>Bone destruction</td><td>Vertebral destruction, <strong>gibbus in 60%</strong></td><td>Limited to the <strong>end-plates</strong></td><td>${cite(99)}</td></tr>
                <tr><td>Paraspinal abscess</td><td><strong>14 of 15</strong> patients</td><td>Granulation tissue / localized oedema</td><td>${cite(99)}</td></tr>
                <tr><td>Subligamentous spread &ge;3 levels</td><td><strong>54%</strong></td><td>8%</td><td>Gao 2017 ${cite(100)}</td></tr>
                <tr><td>Vertebral collapse</td><td><strong>42%</strong></td><td>2%</td><td>${cite(100)}</td></tr>
                <tr><td>Abnormal disc signal on T2</td><td>33%</td><td><strong>85%</strong></td><td>${cite(100)}</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>Caveat:</strong> "Lesions of tuberculous spondylitis affecting the lower lumbar spine were difficult to differentiate from those of brucellar spondylitis." ${cite(99)}</p>
          <p><strong>Take-home:</strong> a thoracic level, a large abscess, spread across several levels and collapse all point to TB. Imaging raises the probability; it doesn't replace microbiology. ${cite(98)}</p>`,
        pearl:
          "Thoracic, abscess, collapse: think TB. Lumbar, end-plate, disc: think brucella. The final word still belongs to the lab.",
      },
      {
        title: "Brucella negative. Is the biopsy worth it?",
        context:
          "Brucella serology negative. Blood cultures negative. CT-guided biopsy of the paravertebral collection: granulomatous inflammation; <strong>Xpert MTB detected, rifampicin resistance not detected</strong>. Culture pending.",
        question: "Why biopsy at all, and what if the biopsy had been negative?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Design</th><th>Key result</th></tr></thead>
              <tbody>
                <tr><td>Ravichandran 2023 ${cite(101)}</td><td>259 CT-guided spinal biopsies, suspected infective spondylodiscitis (India)</td><td>Confirmatory in <strong>57.5%</strong> overall: histology 36.6%, Xpert 27.8%, MGIT culture 19.9%. <strong>Rifampicin resistance in 16/72 (22%) of Xpert-positives.</strong> Complications 0.3%. <strong>Prior TB treatment reduced the yield</strong></td></tr>
                <tr><td>ATS/IDSA/CDC summary ${cite(1)}</td><td>Accuracy studies</td><td>For extrapulmonary specimens, positive smear, culture or NAAT support TB; <strong>negative results "may not be used to exclude TB"</strong></td></tr>
              </tbody>
            </table>
          </div>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr><td>ATS/IDSA/CDC (2017) ${cite(1)}</td><td><strong>Mycobacterial culture</strong> on extrapulmonary specimens</td><td><strong>Strong</strong>, low</td></tr>
                <tr><td>Same ${cite(1)}</td><td>AFB smear, <strong>NAAT</strong> and <strong>histology</strong> on extrapulmonary specimens</td><td>Conditional, very low</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>Take-home:</strong></p>
          <ul>
            <li><strong>Get tissue before starting treatment.</strong> Prior treatment lowers the yield. ${cite(101)}</li>
            <li><strong>Only a culture gives a full DST.</strong> NAAT "does not produce an isolate, which is needed for DST". ${cite(1)}</li>
            <li>A negative biopsy doesn't exclude TB. ${cite(1)}</li>
          </ul>`,
        pearl:
          "Biopsy first, treat second. In one referral series, one in five Xpert-positive spinal biopsies was rifampicin-resistant, and you only find that out if you sample before you treat.",
      },
      {
        title: "Treatment: how long, and does he need surgery?",
        question: "What regimen and duration, and is surgery indicated?",
        reveal: `
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr><td>ATS/CDC/IDSA (2016) ${cite(3)}</td><td><strong>6&ndash;9 months</strong> of a rifampin-containing regimen is at least as effective as 18-month regimens without rifampin. Some experts favour <strong>9 months</strong> because response is hard to assess; <strong>12 months</strong> with extensive orthopaedic hardware</td><td>(narrative)</td></tr>
                <tr><td>Same ${cite(3)}</td><td>Several trials found <strong>no added benefit of surgical debridement</strong> over chemotherapy alone; <strong>uncomplicated spinal TB is managed medically</strong></td><td>(narrative)</td></tr>
                <tr><td>Same ${cite(3)}</td><td>Surgery considered for: <strong>(1)</strong> poor response with ongoing infection or deterioration; <strong>(2)</strong> cord compression with persistent or recurrent neurological deficit; <strong>(3)</strong> spinal instability</td><td>Expert opinion</td></tr>
                <tr><td>Same ${cite(3)}</td><td>Spinal TB with <strong>meningitis</strong> is managed as TB meningitis, including adjunctive corticosteroids</td><td>(narrative)</td></tr>
                <tr><td>Saudi NTP Manual (2021) ${cite(5)}</td><td>No spinal-specific adult recommendation; steroids are recommended only for TB meningitis and pericarditis (&sect;5.5.3)</td><td>Not graded</td></tr>
              </tbody>
            </table>
          </div>
          <h4>For this patient (neurologically intact, no instability)</h4>
          <ul>
            <li><strong>2HRZE, then HR, for 6&ndash;9 months in total</strong>; many would choose 9. ${cite(3)}</li>
            <li><strong>No surgery now.</strong> ${cite(3)}</li>
            <li>Continue a DST-guided regimen once the culture returns. ${cite(1)}</li>
          </ul>`,
        pearl:
          "For uncomplicated Pott's disease, the drugs do the work. Surgery is for deficits, instability or failure, not for the abscess alone.",
      },
      {
        title: "Week 6: new leg weakness",
        context:
          "At week 6 he reports leg weakness and difficulty walking. MRI: the paravertebral abscess is larger, with <strong>cord compression at T8</strong>. His culture has grown fully susceptible <em>M. tuberculosis</em>, and adherence is documented.",
        question: "Is this treatment failure, and what now?",
        reveal: `
          <ul>
            <li><strong>Paradoxical worsening is possible</strong>, but it is diagnosed only after a thorough evaluation has excluded <strong>treatment failure and drug resistance</strong>. Here the isolate is susceptible and adherence is documented. ${cite(3)}</li>
            <li><strong>Either way, the cord comes first.</strong> Cord compression with a new neurological deficit is one of the listed indications for surgery. <strong>Refer to spinal surgery urgently.</strong> ${cite(3)}</li>
            <li><strong>Continue the same drugs.</strong> ${cite(3)}</li>
            <li><strong>Duration:</strong> if hardware is placed, some experts extend treatment to 12 months. ${cite(3)}</li>
          </ul>`,
        pearl:
          "A new deficit on treatment is a surgical question first and a microbiology question second. Decompress, keep the drugs going, and prove it isn't resistance.",
      },
    ],
  },

  // ============================================================
  // CASE 8
  // ============================================================
  {
    id: 8,
    section: "extrapulmonary",
    title: "32-year-old man with three weeks of headache and new confusion",
    hubDescription:
      "A subacute meningitis with a cranial-nerve palsy: what to send in the first lumbar puncture, why a negative Xpert shouldn't delay treatment, the steroid and intensified-treatment trials, and what changes with HIV.",
    vignette:
      "32-year-old Saudi man with 3 weeks of headache, fever and vomiting, and 2 days of confusion. Double vision (left sixth-nerve palsy). GCS 13. Neck stiffness. No rash. HIV status unknown.",
    stages: [
      {
        title: "What do you send?",
        question: "Given this presentation, what do you send, specifically?",
        reveal: `
          <p><strong>Differential first</strong>, each paired with its test:</p>
          <ol>
            <li><strong>Tuberculous meningitis</strong>
              <ul>
                <li><strong>Lumbar puncture:</strong> cell count, protein and glucose (with a paired serum glucose); <strong>ADA</strong>; <strong>AFB smear, mycobacterial culture and Xpert Ultra</strong> on the CSF. ${cite(1, 92)}</li>
                <li><strong>Brain MRI</strong> (hydrocephalus, basal enhancement, tuberculomas).</li>
                <li><strong>CXR</strong>, and sputum if abnormal.</li>
              </ul>
            </li>
            <li><strong>Partially treated bacterial meningitis</strong>
              <ul><li>CSF Gram stain and culture, plus blood cultures.</li></ul>
            </li>
            <li><strong>Neurobrucellosis</strong>
              <ul><li>Brucellosis is <strong>endemic in Saudi Arabia</strong>, and neurobrucellosis can be clinically obscure. ${cite(102)} Diagnosis rests on CSF analysis, <strong>Brucella serology or culture</strong>, and response to treatment. ${cite(103)}</li></ul>
            </li>
            <li><strong>Cryptococcal meningitis</strong> (especially if HIV-positive)
              <ul><li>CSF and serum cryptococcal antigen. ${cite(28)}</li></ul>
            </li>
            <li><strong>Viral meningoencephalitis</strong>
              <ul><li>CSF viral PCR.</li></ul>
            </li>
          </ol>
          <p><strong>Also:</strong> an <strong>HIV test</strong>, which is routine in anyone with presumptive TB. ${cite(3)}</p>`,
        pearl:
          "A subacute meningitis with a cranial-nerve palsy is TB until proven otherwise. In Saudi Arabia, send Brucella serology in the same draw.",
      },
      {
        title: "CSF back, Xpert Ultra negative. Treat now?",
        context:
          "CSF: 180 cells/µL, <strong>85% lymphocytes</strong>; protein 2.1 g/L; <strong>CSF:serum glucose 0.3</strong>; ADA 12 U/L. Gram stain negative. AFB smear negative. <strong>Xpert Ultra: MTB not detected.</strong> CrAg negative. Brucella serology negative. HIV test negative.",
        question:
          "Does a negative Xpert Ultra rule out TB meningitis? Do you start treatment now or wait for culture?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Test (CSF)</th><th>Source</th><th>Sensitivity</th><th>Specificity</th><th>Note</th></tr></thead>
              <tbody>
                <tr><td><strong>Xpert Ultra</strong></td><td>Cochrane 2025, 16 studies ${cite(92)}</td><td><strong>88.2%</strong> (83.7&ndash;91.6)</td><td>96.0% (86.8&ndash;98.9)</td><td><strong>Against culture</strong>, which itself misses paucibacillary TBM. The authors flag this reference-standard concern</td></tr>
                <tr><td>NAAT (any)</td><td>ATS/IDSA/CDC summary ${cite(1)}</td><td>62%</td><td>98%</td><td>So a negative result misses about 4 in 10</td></tr>
                <tr><td><strong>ADA</strong></td><td>Two meta-analyses, summarised by ATS/IDSA/CDC ${cite(1)}</td><td>79%</td><td>91%</td><td>"Exquisitely sensitive" to threshold: at 4 U/L, sensitivity &gt;93% but specificity &lt;80%; at 8 U/L, sensitivity &lt;59% but specificity &gt;96%</td></tr>
                <tr><td>Mycobacterial culture</td><td>ATS/IDSA/CDC summary ${cite(1)}</td><td>45&ndash;70%</td><td>&gt;97%</td><td>Takes weeks</td></tr>
              </tbody>
            </table>
          </div>
          <h4>What is at stake</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Setting</th><th>Key result</th></tr></thead>
              <tbody>
                <tr><td>Thao 2018 ${cite(104)}</td><td>1,699 adults, Vietnam (4 trials + 1 cohort)</td><td>9-month mortality <strong>23.0%</strong> if HIV-negative and <strong>51.3%</strong> if HIV-positive. <strong>Higher MRC grade</strong> predicted death</td></tr>
                <tr><td>Alshehri 2024 ${cite(105)}</td><td>140 CNS-TB patients, 3 Saudi tertiary centres, 2009&ndash;2019</td><td><strong>35% poor outcome</strong> (modified Rankin). <strong>GCS &le;10</strong> at presentation and TBM/tuberculoma predicted poor outcome</td></tr>
              </tbody>
            </table>
          </div>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr><td>ATS/IDSA/CDC (2017) ${cite(1)}</td><td>ADA on CSF in suspected TB meningitis</td><td>Conditional, low</td></tr>
                <tr><td>Same ${cite(1)}</td><td>Culture (strong) and NAAT (conditional) on CSF. <strong>A negative NAAT "may not be used to exclude TB"</strong></td><td>Strong / conditional</td></tr>
                <tr><td>ATS/CDC/IDSA (2016) ${cite(3)}</td><td>Empiric multidrug treatment is started in almost all situations in which active TB is suspected</td><td>(general principle)</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>Take-home:</strong> <strong>no.</strong> A negative Xpert Ultra doesn't exclude TB meningitis. With this CSF, a cranial-nerve palsy and falling consciousness, <strong>start TB treatment and dexamethasone today</strong>. Don't wait weeks for a culture. ${cite(1, 3)}</p>`,
        pearl:
          "In TB meningitis, time is brain. A lymphocytic CSF with low glucose and a cranial-nerve palsy is enough to treat; a negative Xpert isn't enough to stop.",
      },
      {
        title: "Which regimen, how long, and steroids?",
        question:
          "What regimen and duration? Do adjunctive corticosteroids or intensified antibiotics help?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Trial</th><th>Design</th><th>Key result</th></tr></thead>
              <tbody>
                <tr><td><strong>Thwaites 2004</strong>, NEJM ${cite(106)}</td><td>RCT, 545 patients &gt;14 years, Vietnam, with or without HIV</td><td><strong>Dexamethasone reduced death</strong> (RR 0.69, 0.52&ndash;0.92). It did <strong>not</strong> significantly reduce severe disability among survivors, or death-or-severe-disability. <strong>Fewer serious adverse events</strong> (26 vs 45)</td></tr>
                <tr><td><strong>Heemskerk 2016</strong>, NEJM ${cite(107)}</td><td>RCT, 817 adults</td><td><strong>Intensified treatment</strong> (rifampin 15 mg/kg + levofloxacin 20 mg/kg for 8 weeks) vs standard: <strong>no survival benefit</strong> (HR 0.94, 0.73&ndash;1.22)</td></tr>
              </tbody>
            </table>
          </div>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr><td>ATS/CDC/IDSA (2016) ${cite(3)}</td><td><strong>Adjunctive dexamethasone or prednisolone, tapered over 6&ndash;8 weeks</strong>, for TB meningitis (Recommendation 8)</td><td><strong>Strong, moderate</strong></td></tr>
                <tr><td>Same ${cite(3)}</td><td><strong>2 months of HRZE, then HR for 7&ndash;10 more months</strong> (optimal duration not defined). Ethambutol preferred as the fourth drug in adults (expert opinion). Consider <strong>repeat lumbar punctures</strong> early to monitor the CSF</td><td>(narrative / expert opinion)</td></tr>
                <tr><td>Saudi NTP Manual (2021) ${cite(5)}</td><td>"An initial adjuvant corticosteroid therapy with dexamethasone or prednisolone tapered over 6&ndash;8 weeks <strong>should be used</strong>" (&sect;5.5.3)</td><td>Not graded</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>For this patient:</strong> HRZE, then HR, for <strong>9&ndash;12 months in total</strong>, plus a <strong>dexamethasone taper over 6&ndash;8 weeks</strong>. ${cite(3, 5)}</p>`,
        pearl:
          "Dexamethasone in HIV-negative TB meningitis saves lives. Higher-dose rifampin plus levofloxacin did not. The two strongest levers are still starting early and adding the steroid.",
      },
      {
        title: "Day 10: drowsier",
        context:
          "On day 10 his GCS falls to 10. CT: <strong>enlarging ventricles (hydrocephalus)</strong>." +
          img(8, "stage4", "ct-hydrocephalus", "Hydrocephalus on non-contrast CT (reference image; the cause in this example is not specified)"),
        question: "What do you do?",
        reveal: `
          <ul>
            <li><strong>Refer to neurosurgery now.</strong> Hydrocephalus, tuberculous brain abscess and paraparesis are the listed complications "warranting neurosurgical referral". ${cite(3)}</li>
            <li><strong>Continue the full regimen and the steroid.</strong> ${cite(3)}</li>
            <li><strong>Reassess the diagnosis:</strong> check adherence and drug susceptibility before calling it a paradoxical reaction. ${cite(3)}</li>
            <li><strong>If new or enlarging tuberculomas appear on treatment:</strong> the Saudi manual (in its paediatric section) describes paradoxical enlargement of tuberculomas. It advises continuing TB treatment and says adjuvant corticosteroids "might be useful". ${cite(5)}</li>
            <li><strong>Prognosis:</strong> a GCS &le;10 predicted poor outcome in the Saudi series. ${cite(105)}</li>
          </ul>`,
        pearl:
          "In TB meningitis, a falling GCS is hydrocephalus until the scan says otherwise. Call neurosurgery; don't change the drugs.",
      },
      {
        title: "What if he had been HIV-positive?",
        question: "If his HIV test had been positive, what would change?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Trial</th><th>Design</th><th>Key result</th></tr></thead>
              <tbody>
                <tr><td><strong>Donovan 2023, ACT HIV</strong>, NEJM ${cite(108)}</td><td>RCT, 520 HIV-positive adults with TBM (Vietnam, Indonesia)</td><td>Dexamethasone vs placebo: <strong>no survival benefit</strong> (deaths 44.1% vs 49.0%; HR 0.85, 0.66&ndash;1.10). No subgroup clearly benefited</td></tr>
                <tr><td><strong>T&ouml;r&ouml;k 2011</strong>, CID ${cite(45)}</td><td>RCT, HIV-associated TBM</td><td>Immediate vs deferred ART: <strong>no survival benefit, more grade 4 adverse events</strong> with immediate ART</td></tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li><strong>Steroids:</strong> the best trial in HIV-positive adults showed no survival benefit. ${cite(108)} The ATS recommendation was written before that trial. ${cite(3)}</li>
            <li><strong>ART:</strong> <strong>defer</strong> when TB meningitis is suspected. ${cite(28, 45)} The Saudi manual likewise advises caution with early ART in TB meningitis (as taught in Case 3). ${cite(5)}</li>
            <li><strong>Cryptococcus:</strong> check the CrAg if CD4 &lt;100. ${cite(28)}</li>
          </ul>`,
        pearl:
          "In HIV-associated TB meningitis, the usual reflexes reverse: don't rush the ART, and don't expect the steroid to save a life.",
      },
    ],
  },

  // ============================================================
  // CASE 9
  // ============================================================
  {
    id: 9,
    section: "extrapulmonary",
    title: "26-year-old man with right lower abdominal pain, fever and weight loss",
    hubDescription:
      "Terminal ileal disease in a TB-endemic setting: the few features that truly separate the two main diagnoses, why TB must be excluded before immunosuppression, how long to treat, and what a clinical response does and doesn't prove.",
    vignette:
      "26-year-old Saudi man with 4 months of intermittent right lower abdominal pain, evening fevers, night sweats and 6 kg weight loss. Occasional loose stools, no blood. No perianal disease. CRP raised; mild anaemia.",
    stages: [
      {
        title: "What do you send?",
        question: "Given this presentation, what do you send, specifically?",
        reveal: `
          <p><strong>Differential first</strong>, each paired with its test:</p>
          <ol>
            <li><strong>Intestinal (ileocaecal) TB</strong>
              <ul>
                <li><strong>Ileocolonoscopy with multiple biopsies</strong> for histology, AFB smear, mycobacterial culture and TB PCR/Xpert. ${cite(1)}</li>
                <li><strong>Cross-sectional imaging</strong> (CT enterography).</li>
                <li><strong>CXR.</strong></li>
              </ul>
            </li>
            <li><strong>Crohn's disease</strong>
              <ul><li>The same colonoscopy and biopsies, and the same CT enterography. The features that separate the two are covered in the next stage. ${cite(109)}</li></ul>
            </li>
            <li><strong>Intestinal lymphoma</strong>
              <ul><li>Histology and immunohistochemistry on the biopsies.</li></ul>
            </li>
          </ol>
          <p><strong>Also:</strong> an <strong>HIV test</strong> ${cite(3)}. An <strong>IGRA</strong> is supporting evidence only (see the next stage). ${cite(110)}</p>`,
        pearl:
          "In a TB-endemic setting, every \"Crohn's disease\" of the terminal ileum is intestinal TB until the biopsies and the CT say otherwise.",
      },
      {
        title: "Biopsies inconclusive. How do you tell TB from Crohn's?",
        context:
          "<strong>Colonoscopy:</strong> transverse ulcers in the caecum; a patulous ileocaecal valve. <strong>Biopsies:</strong> non-caseating granulomas; AFB smear negative; TB PCR negative; culture pending. <strong>CT enterography:</strong> short-segment ileocaecal thickening; enlarged mesenteric nodes without necrosis; no comb sign. <strong>IGRA positive.</strong>",
        question: "Does anything here settle it?",
        reveal: `
          <h4>Studies: features that separate intestinal TB (ITB) from Crohn's disease (CD)</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Feature / test</th><th>Favours</th><th>Accuracy</th><th>Source</th></tr></thead>
              <tbody>
                <tr><td>Caseation necrosis on biopsy; AFB smear or culture positive; <strong>necrotic nodes on CT</strong></td><td><strong>ITB</strong>: the only <strong>exclusive</strong> features, but all have poor sensitivity</td><td>&mdash;</td><td>${cite(109)}</td></tr>
                <tr><td>Transverse ulcers; patulous ileocaecal valve; contiguous ileocaecal involvement</td><td>ITB</td><td>(descriptive)</td><td>${cite(109)}</td></tr>
                <tr><td>Longitudinal or aphthous ulcers; skip lesions; long segments; perianal disease</td><td>CD</td><td>(descriptive)</td><td>${cite(109)}</td></tr>
                <tr><td><strong>Necrotic lymph nodes on CT</strong></td><td>ITB</td><td>Sensitivity <strong>23%</strong>, specificity <strong>100%</strong></td><td>CT meta-analysis ${cite(111)}</td></tr>
                <tr><td><strong>Comb sign</strong></td><td>CD</td><td>Sensitivity 82%, specificity 81%</td><td>${cite(111)}</td></tr>
                <tr><td><strong>Skip lesions</strong></td><td>CD</td><td>Sensitivity 86%, specificity 74%</td><td>${cite(111)}</td></tr>
                <tr><td><strong>IGRA</strong> (ITB vs CD)</td><td>ITB if positive</td><td>Sensitivity <strong>74%</strong>, specificity <strong>87%</strong></td><td>${cite(110)}</td></tr>
                <tr><td><strong>TB PCR on biopsy</strong> (ITB vs CD)</td><td>ITB if positive</td><td>Sensitivity <strong>47%</strong>, specificity <strong>95%</strong>; "negative results cannot exclude ITB"</td><td>${cite(112)}</td></tr>
              </tbody>
            </table>
          </div>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr><td>ATS/IDSA/CDC (2017) ${cite(1)}</td><td>Culture (strong), plus smear, NAAT and histology (conditional), on extrapulmonary specimens. Negative results do not exclude TB</td><td>Strong / conditional</td></tr>
                <tr><td>ATS/CDC/IDSA (2016) ${cite(3)}</td><td>The nonspecific presentation of abdominal TB means "a high index of suspicion is an important factor in early diagnosis"</td><td>(narrative)</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>Take-home:</strong> the colonoscopy features and the positive IGRA lean towards TB, but <strong>none of the exclusive features is present</strong>. This is the classic unresolved case. ${cite(109)}</p>`,
        pearl:
          "Only caseation, AFB and necrotic nodes are exclusive to TB, and each is usually absent. Most cases are decided by weighing the whole picture, not by a single test.",
      },
      {
        title: "Treat for TB, or treat for Crohn's?",
        question:
          "The gastroenterologist wants to start steroids for presumed Crohn's disease. What do you advise?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Design</th><th>Key result</th></tr></thead>
              <tbody>
                <tr><td><strong>Pratap Mouli 2017</strong> ${cite(113)}</td><td>Retrospective, 288 patients (131 eventual CD, 157 ITB), plus a prospective validation cohort of 55 with diagnostic confusion (India)</td><td><strong>Symptomatic response to TB treatment:</strong> 94% of ITB by 3 months, but also <strong>38%</strong> of eventual CD at 3 months (64% at 2 months in validation). <strong>Endoscopic mucosal healing: 100% of ITB vs 5% of CD</strong></td></tr>
                <tr><td><strong>Tubach 2009</strong> ${cite(76)}</td><td>French RATIO registry</td><td>TB risk with anti-TNF monoclonal antibodies is high (SIR 18.6&ndash;29.3), and none of the affected patients had received correct prophylaxis</td></tr>
              </tbody>
            </table>
          </div>
          <h4>Answer</h4>
          <ul>
            <li><strong>Don't start immunosuppression while TB is unexcluded.</strong> A <strong>therapeutic trial of TB treatment</strong> is still needed "in a significant proportion of patients to establish the diagnosis", despite the cost of delaying a Crohn's diagnosis. ${cite(109)}</li>
            <li><strong>Screen before any biologic.</strong> Guidelines call for TB screening before biologics, with LTBI treatment first. ${cite(85)}</li>
            <li>Wait for the biopsy culture while treatment runs. ${cite(1)}</li>
          </ul>`,
        pearl:
          "A trial of TB treatment is reversible. Starting anti-TNF therapy on an unrecognized intestinal TB can be catastrophic. When in doubt, treat the TB first.",
      },
      {
        title: "Regimen and duration",
        context:
          "He starts TB treatment. The biopsy culture later grows fully susceptible <em>M. tuberculosis</em>.",
        question: "How long do you treat?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Design</th><th>Key result</th></tr></thead>
              <tbody>
                <tr><td><strong>Jullien 2016, Cochrane</strong> ${cite(114)}</td><td>3 RCTs, 328 adults with intestinal and peritoneal TB (Asia)</td><td><strong>6 vs 9 months:</strong> relapse 2/140 vs 0/129 (too few events to compare; very low certainty). Clinical cure <strong>no different</strong> (RR 1.02, 0.97&ndash;1.08; moderate certainty). No evidence that 6 months is inadequate</td></tr>
                <tr><td><strong>Tanoglu 2020</strong> ${cite(115)}</td><td>104 proven GI TB, 21 centres in 8 countries <strong>including Saudi Arabia</strong></td><td>Terminal ileum the commonest site (44%). Biopsy culture positive in 87% of those cultured; PCR positive in 95% of those tested. <strong>One-third immunosuppressed. 43% diagnosed from surgical specimens.</strong> Mortality 3.8%, relapse 1.9%</td></tr>
              </tbody>
            </table>
          </div>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr><td>ATS/CDC/IDSA (2016) ${cite(3)}</td><td><strong>6 months is adequate</strong> for intestinal or peritoneal TB</td><td>Expert opinion</td></tr>
                <tr><td>Saudi NTP Manual (2021) ${cite(5)}</td><td>No intestinal-TB-specific recommendation; 2HRZE/4HR is the standard for drug-susceptible disease (&sect;5.5.1)</td><td>Not graded</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>For this patient:</strong> <strong>2HRZE/4HR (6 months).</strong> ${cite(3, 114)}</p>`,
        pearl:
          "Gut TB doesn't need a longer course. Six months is as good as nine in the trials we have.",
      },
      {
        title: "Two months later, the pain is gone. Diagnosis confirmed?",
        context: "At 2 months he is pain-free and gaining weight.",
        question: "Does his clinical response confirm intestinal TB?",
        reveal: `
          <ul>
            <li><strong>Not on its own.</strong> Symptoms also improved in <strong>38&ndash;64%</strong> of patients who turned out to have Crohn's disease. ${cite(113)}</li>
            <li><strong>Mucosal healing is the discriminator:</strong> it occurred in <strong>100%</strong> of intestinal TB vs <strong>5%</strong> of Crohn's disease. <strong>Repeat colonoscopy</strong> is needed to confirm. ${cite(113)}</li>
            <li><strong>Symptoms that persist after 3 months</strong> of TB treatment suggest Crohn's disease. ${cite(113)}</li>
            <li>In <strong>this</strong> patient, the positive biopsy culture has already settled it. ${cite(1)}</li>
          </ul>`,
        pearl:
          "In the ITB-vs-Crohn's trial of treatment, trust the mucosa, not the symptoms. A Crohn's patient can feel better on TB drugs; their ulcers rarely heal.",
      },
    ],
  },

  // ============================================================
  // CASE 10
  // ============================================================
  {
    id: 10,
    section: "extrapulmonary",
    title: "38-year-old woman with abdominal swelling and a raised CA-125",
    hubDescription:
      "Ascites, peritoneal thickening and a raised CA-125 in a young woman: what the fluid can settle, when laparoscopy beats laparotomy, six months of treatment, and two patients in whom the usual tests mislead.",
    vignette:
      "38-year-old Saudi woman with 2 months of abdominal distension, low-grade fevers, night sweats and weight loss. Ultrasound: moderate ascites. CT: ascites with smooth peritoneal thickening and omental thickening; ovaries not clearly enlarged. <strong>Serum CA-125 raised.</strong> She has been referred to gynaecological oncology for suspected ovarian cancer." +
      img(10, "stage1", "ct-peritonitis", "CT of wet-type tuberculous peritonitis with ascites (reference image, not this patient)"),
    stages: [
      {
        title: "What do you send?",
        question: "Given this presentation, what do you send, specifically?",
        reveal: `
          <p><strong>Differential first</strong>, each paired with its test:</p>
          <ol>
            <li><strong>Peritoneal TB</strong>
              <ul>
                <li><strong>Diagnostic paracentesis:</strong> cell count and differential; <strong>serum&ndash;ascites albumin gradient (SAAG)</strong>; <strong>ADA</strong> &plusmn; free IFN-&gamma;; <strong>AFB smear, mycobacterial culture</strong> and NAAT. ${cite(1)}</li>
                <li>Consider TB peritonitis in anyone with unexplained <strong>lymphocytic ascites</strong> and a <strong>SAAG &lt;11 g/L</strong>. ${cite(116)}</li>
                <li><strong>CXR.</strong></li>
              </ul>
            </li>
            <li><strong>Peritoneal carcinomatosis / advanced ovarian cancer</strong>
              <ul>
                <li><strong>Ascitic cytology</strong>, then tissue.</li>
                <li><strong>A raised CA-125 does not separate them:</strong> in 28 women with abdominopelvic TB, CA-125 was raised in <strong>all 28</strong>, and half were diagnosed only at laparotomy. ${cite(117)}</li>
              </ul>
            </li>
            <li><strong>Ascites from portal hypertension</strong> (cirrhosis, heart failure)
              <ul><li>A <strong>high SAAG</strong> points here. ${cite(116)}</li></ul>
            </li>
          </ol>
          <p><strong>Also:</strong> an HIV test. ${cite(3)}</p>`,
        pearl:
          "A raised CA-125 with ascites is not a diagnosis of ovarian cancer. Tap the fluid, and send an ADA, before anyone books a laparotomy.",
      },
      {
        title: "The ascitic fluid",
        context:
          "Exudative, <strong>lymphocyte-predominant</strong> ascites. <strong>SAAG 7 g/L.</strong> <strong>ADA 58 U/L.</strong> Cytology: no malignant cells. AFB smear negative; NAAT negative. Culture pending.",
        question: "How far does this take you?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Test (ascitic fluid)</th><th>Source</th><th>Sensitivity</th><th>Specificity</th><th>Note</th></tr></thead>
              <tbody>
                <tr><td><strong>ADA</strong></td><td>Meta-analysis, 20 studies, 2,291 participants ${cite(118)}</td><td><strong>90%</strong> (85&ndash;94)</td><td><strong>94%</strong> (92&ndash;95)</td><td>Very low certainty (GRADE); cut-off varied</td></tr>
                <tr><td>ADA</td><td>Meta-analysis of 4 studies, summarised by ATS/IDSA/CDC ${cite(1)}</td><td>100%</td><td>97%</td><td>Threshold 36&ndash;40 U/L</td></tr>
                <tr><td><strong>Free IFN-&gamma;</strong></td><td>Meta-analysis of 6 studies, summarised by ATS/IDSA/CDC ${cite(1)}</td><td>93%</td><td>99%</td><td>Thresholds varied</td></tr>
                <tr><td><strong>Mycobacterial culture</strong></td><td>ATS/IDSA/CDC summary ${cite(1)}</td><td>45&ndash;69%</td><td>&gt;97%</td><td>Takes weeks</td></tr>
              </tbody>
            </table>
          </div>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr><td>ATS/IDSA/CDC (2017) ${cite(1)}</td><td>Measure <strong>ADA</strong> and <strong>free IFN-&gamma;</strong> on fluid in suspected peritoneal TB</td><td>Conditional, low</td></tr>
                <tr><td>Same ${cite(1)}</td><td>Culture (strong); smear and NAAT (conditional). <strong>Negative results do not exclude TB</strong></td><td>Strong / conditional</td></tr>
                <tr><td>Sanai 2005, systematic review ${cite(116)}</td><td>Culture of ascitic fluid or peritoneal biopsy is the <strong>gold standard</strong>; <strong>low threshold for diagnostic laparoscopy</strong></td><td>(review recommendation)</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>Take-home:</strong> lymphocytic, low-SAAG ascites with a high ADA and negative cytology makes peritoneal TB very likely. A negative smear and NAAT don't count against it. ${cite(1, 118)}</p>`,
        pearl:
          "In a young woman without cirrhosis, a high ascitic ADA is one of the most accurate tests in extrapulmonary TB. It can save her from an unnecessary cancer operation.",
      },
      {
        title: "Laparoscopy, or treat now?",
        question:
          "Gynaecological oncology still wants tissue. Is laparoscopy needed, or can you treat on the fluid results?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Setting</th><th>Key result</th></tr></thead>
              <tbody>
                <tr><td><strong>Hossain 1992</strong> ${cite(119)}</td><td>82 laparoscopies, Riyadh</td><td><strong>22</strong> found peritoneal TB. Direct visualization plus peritoneal biopsy "provide the definitive tissue diagnosis". The tuberculin test was <strong>not always positive</strong></td></tr>
                <tr><td>ATS/IDSA/CDC summary ${cite(1)}</td><td>Accuracy studies</td><td><strong>Peritoneal biopsy histology: 79&ndash;100%</strong> sensitive</td></tr>
                <tr><td><strong>Liu 2014</strong> ${cite(117)}</td><td>28 women with abdominopelvic TB and raised CA-125</td><td>Diagnosis came from <strong>laparotomy in 50%</strong> and laparoscopy in 32%. "Treatment &hellip; is totally based on medical therapy other than surgery except biopsy"</td></tr>
                <tr><td><strong>Tanoglu 2020</strong> ${cite(115)}</td><td>104 GI TB, 8 countries including Saudi Arabia</td><td>Ascitic culture positive in <strong>11 of 19</strong> (57.9%). <strong>43%</strong> were diagnosed from surgical specimens</td></tr>
              </tbody>
            </table>
          </div>
          <h4>Answer</h4>
          <ul>
            <li>If <strong>malignancy remains a real possibility</strong> (as the gynaecologists fear), <strong>laparoscopy with peritoneal biopsy</strong> is the right next step. It gives histology, culture and DST in one procedure, and <strong>avoids a laparotomy</strong>. ${cite(116, 119, 117)}</li>
            <li>If the picture were unequivocal (young, no mass, very high ADA), many would treat and follow closely. ${cite(3, 118)}</li>
          </ul>`,
        pearl:
          "For peritoneal TB, the laparoscope beats the laparotomy: same tissue, far less surgery. The cure is medical.",
      },
      {
        title: "Treatment",
        context:
          "Laparoscopy: studding of the peritoneum with tubercles. Histology: caseating granulomas. Culture later grows fully susceptible <em>M. tuberculosis</em>.",
        question: "What regimen and duration? Are adjunctive steroids needed?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Design</th><th>Key result</th></tr></thead>
              <tbody>
                <tr><td><strong>Jullien 2016, Cochrane</strong> ${cite(114)}</td><td>3 RCTs, 328 adults with intestinal <strong>and peritoneal</strong> TB</td><td><strong>6 vs 9 months:</strong> no difference in clinical cure (moderate certainty). Relapse too rare to compare</td></tr>
              </tbody>
            </table>
          </div>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr><td>ATS/CDC/IDSA (2016) ${cite(3)}</td><td><strong>6 months</strong> is adequate for peritoneal TB. Data on <strong>adjunctive corticosteroids</strong> for TB peritonitis are <strong>limited</strong>, so they should <strong>not</strong> be prescribed routinely</td><td>Expert opinion</td></tr>
                <tr><td>Sanai 2005 ${cite(116)}</td><td>6 months of first-line drugs in uncomplicated cases</td><td>(review recommendation)</td></tr>
                <tr><td>Saudi NTP Manual (2021) ${cite(5)}</td><td>No peritoneal-specific adult recommendation; 2HRZE/4HR standard</td><td>Not graded</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>For this patient:</strong> <strong>2HRZE/4HR</strong>, with no routine steroids. ${cite(3)}</p>`,
        pearl:
          "Peritoneal TB is treated like pulmonary TB: six months, no steroids. The hard part is getting the diagnosis without a laparotomy.",
      },
      {
        title: "Two patients who don't fit the textbook",
        question:
          "How would your approach change if she had (a) <strong>cirrhosis</strong>, or (b) end-stage kidney disease on <strong>peritoneal dialysis</strong> with cloudy dialysate?",
        reveal: `
          <h4>(a) Cirrhosis: the ADA loses sensitivity</h4>
          <ul>
            <li>In a cross-sectional study, ADA activity and accuracy were <strong>significantly lower in cirrhotic patients</strong>, regardless of age. ADA also <strong>fell with increasing age</strong>. ${cite(120)}</li>
            <li>A "normal" ADA in a cirrhotic patient <strong>does not reassure</strong>: go to culture and peritoneal biopsy. ${cite(120, 116)}</li>
            <li>TB peritonitis frequently complicates end-stage liver or renal disease, which adds to the diagnostic difficulty. ${cite(116)}</li>
          </ul>
          <h4>(b) Peritoneal dialysis</h4>
          <ul>
            <li>A <strong>Jeddah</strong> cohort of 89 CAPD patients over 12 years found <strong>4 cases</strong> of TB peritonitis among 103 peritonitis episodes. All presented insidiously with <strong>cloudy fluid</strong>. Diagnosis was by PCR (1), culture (2) or clinical response (1). ${cite(121)}</li>
            <li><strong>All 4 needed catheter removal</strong>, and all were converted to haemodialysis; one later restarted CAPD. All survived. The authors recommend <strong>early TB treatment and catheter removal</strong>. ${cite(121)}</li>
          </ul>`,
        pearl:
          "In cirrhosis, a low ADA doesn't rule out TB. In a PD patient, \"culture-negative\" cloudy dialysate that doesn't respond to antibiotics needs a TB work-up, and the catheter usually has to come out.",
      },
    ],
  },
];

// ============================================================
// START HERE — introductory single-best-answer questions
// Foundations only; no case's headline answer is tested here.
// `answer` is the zero-based index of the correct option.
// ============================================================
const MCQS = [
  {
    topic: "Smear-positive, NAAT-negative",
    stem:
      "A 67-year-old woman with long-standing bronchiectasis has a chronic productive cough. Sputum AFB smear is <strong>positive</strong>; Xpert MTB/RIF Ultra on the same specimen is <strong>negative</strong>. CXR shows nodular bronchiectasis without cavitation. What is the most appropriate next step?",
    options: [
      "Start isoniazid, rifampin, pyrazinamide and ethambutol today",
      "Send an IGRA to decide whether the smear reflects TB",
      "Place her in airborne isolation and treat as smear-positive TB",
      "Await mycobacterial culture with species identification",
      "Arrange bronchoscopy to repeat the NAAT on lavage fluid",
    ],
    answer: 3,
    rationale: `
      <p>An AFB smear detects any acid-fast bacillus, not only <em>M. tuberculosis</em>. A smear-positive, NAAT-negative result points away from TB, and the leading alternative is non-tuberculous mycobacteria. Mycobacterial culture with species identification settles it. ${cite(1)}</p>
      <ul>
        <li><strong>Starting four drugs or isolating as smear-positive TB</strong> (the most tempting options) is exactly the bedside pitfall to avoid.</li>
        <li><strong>An IGRA</strong> cannot distinguish latent from active TB, and it does not identify the organism in the sputum. ${cite(1)}</li>
      </ul>`,
  },
  {
    topic: "Who is most likely to have drug-resistant TB?",
    stem:
      "Four patients have newly diagnosed pulmonary TB. Which one has the highest pre-test probability of MDR/RR-TB?",
    options: [
      "A 25-year-old new patient with a right upper lobe cavity",
      "A 40-year-old with diabetes and no previous TB treatment",
      "A 55-year-old treated for TB 3 years ago, with interruptions",
      "A 35-year-old new patient with a 3+ sputum smear grade",
      "A 30-year-old new patient with bilateral disease on CXR",
    ],
    answer: 2,
    rationale: `
      <p>Previous treatment, especially with adherence gaps, is the strongest predictor of resistance. Worldwide in 2024, <strong>16%</strong> of previously treated patients had MDR/RR-TB, versus <strong>3.2%</strong> of new patients. ${cite(8)} In Saudi data, prior treatment carried an odds ratio of about <strong>7</strong> for MDR-TB. ${cite(16)}</p>
      <ul>
        <li><strong>Cavitation and a high smear grade</strong> mark bacillary burden and infectiousness, not resistance. ${cite(4, 65)}</li>
        <li><strong>Diabetes</strong> raises the risk of progressing to disease (RR 3.11), not of resistance. ${cite(78)}</li>
      </ul>`,
  },
  {
    topic: "Which fluoroquinolone alongside rifampin?",
    stem:
      "A fluoroquinolone is being added to a TB regimen that will continue to include rifampin. Which choice is best supported, and why?",
    options: [
      "Moxifloxacin, because rifampin increases its exposure",
      "Moxifloxacin, because it has the lowest MIC against <em>M. tuberculosis</em>",
      "Ciprofloxacin, because it has the smallest effect on the QT interval",
      "Levofloxacin, because it does not prolong the QT interval",
      "Levofloxacin, because rifampin lowers moxifloxacin exposure by about 30%",
    ],
    answer: 4,
    rationale: `
      <p>Rifampin lowers moxifloxacin exposure by roughly 30%, so some experts prefer levofloxacin alongside rifampin. ${cite(12)}</p>
      <ul>
        <li><strong>"Levofloxacin, because it does not prolong the QT interval"</strong> (the most tempting option) has the right drug for the wrong reason. Levofloxacin should be avoided in known or suspected QT prolongation; baseline QTc and potassium still matter. ${cite(10)}</li>
        <li><strong>"Rifampin increases moxifloxacin exposure"</strong> has the interaction the wrong way round.</li>
      </ul>`,
  },
  {
    topic: "When to add pyridoxine",
    stem:
      "A 38-year-old is starting 2HRZE/4HR for drug-susceptible pulmonary TB. Which feature is the clearest indication to add pyridoxine 25–50 mg/day?",
    options: [
      "Age over 35 years",
      "Type 2 diabetes",
      "Cavitary disease on CXR",
      "A 3+ sputum smear grade",
      "A positive IGRA",
    ],
    answer: 1,
    rationale: `
      <p>Pyridoxine is given with isoniazid to anyone at risk of neuropathy, including people with diabetes, HIV, alcohol use, malnutrition, chronic kidney disease, or pregnancy. ${cite(3)}</p>
      <ul>
        <li><strong>Cavitation and smear grade</strong> reflect disease burden, not neuropathy risk.</li>
        <li><strong>An IGRA result</strong> has no bearing on isoniazid toxicity.</li>
      </ul>`,
  },
  {
    topic: "What makes a source patient more infectious?",
    stem:
      "A 50-year-old man has culture-confirmed pulmonary TB. <strong>Three sputum smears were negative.</strong> Which additional finding most raises the priority of his contacts for evaluation?",
    options: [
      "Cavitation on his chest radiograph",
      "Extrapulmonary involvement of cervical nodes",
      "A positive IGRA in the index patient",
      "His age over 50 years",
      "A lymphocytic pleural effusion",
    ],
    answer: 0,
    rationale: `
      <p>Cavitation on CXR independently predicts greater infectiousness, even after smear results are accounted for. ${cite(4)} The Saudi NTP Manual still calls for contact investigation when the CXR shows cavities, even with three negative smears. ${cite(5)}</p>
      <ul>
        <li><strong>A positive IGRA</strong> (the most tempting option) reflects immune sensitisation, not how many bacilli the patient is shedding. It cannot tell latent from active TB. ${cite(1)}</li>
      </ul>`,
  },
  {
    topic: "Co-trimoxazole in HIV-associated TB",
    stem:
      "A 29-year-old woman with HIV (CD4 <strong>420</strong> cells/µL, on no treatment) is starting treatment for pulmonary TB. What is recommended regarding co-trimoxazole?",
    options: [
      "Not needed while her CD4 count stays above 200",
      "Start only once antiretroviral therapy has begun",
      "Start after the intensive phase of TB treatment ends",
      "Start now and continue throughout TB treatment",
      "Start only if her CD4 count falls below 350",
    ],
    answer: 3,
    rationale: `
      <p>WHO recommends co-trimoxazole prophylaxis for all people with HIV and active TB, <strong>regardless of CD4</strong> (strong recommendation, high certainty). ${cite(47)} The Saudi NTP Manual gives it to all HIV-positive TB patients, started as soon as possible and continued throughout TB treatment. ${cite(5)}</p>
      <ul>
        <li><strong>The CD4-threshold options</strong> (the most tempting) do not apply: in HIV-associated TB, no CD4 threshold is used.</li>
      </ul>`,
  },
  {
    topic: "Before starting ART at a low CD4",
    stem:
      "A 34-year-old man has newly diagnosed HIV (CD4 <strong>62</strong> cells/µL) and confirmed pulmonary TB. He has no headache and a normal mental state. Before he starts ART, which test is recommended?",
    options: [
      "Serum or plasma cryptococcal antigen",
      "Urine lateral-flow LAM",
      "Lumbar puncture with CSF analysis",
      "Repeat sputum Xpert Ultra",
    ],
    answer: 0,
    rationale: `
      <p>WHO strongly recommends cryptococcal antigen (CrAg) screening before ART when CD4 is <strong>&lt;100</strong>. A positive result leads to a lumbar puncture and pre-emptive antifungal therapy. ${cite(28)}</p>
      <ul>
        <li><strong>Lumbar puncture</strong> (the most tempting option) is the step <em>after</em> a positive CrAg, not a routine test for everyone.</li>
        <li><strong>LF-LAM</strong> is a TB diagnostic for people with advanced HIV being evaluated for TB. ${cite(27)} His TB is already confirmed.</li>
      </ul>`,
  },
  {
    topic: "Can't expectorate",
    stem:
      "A 60-year-old man has suspected pulmonary TB but <strong>cannot produce sputum</strong>. According to ATS/IDSA/CDC, what is the recommended first sampling method?",
    options: [
      "Bronchoscopy with bronchoalveolar lavage",
      "Gastric aspirate",
      "Sputum induction",
      "Transbronchial lung biopsy",
      "Urine NAAT",
    ],
    answer: 2,
    rationale: `
      <p>ATS/IDSA/CDC suggest <strong>sputum induction rather than bronchoscopy</strong> as the first sampling method when a patient cannot expectorate. Bronchoscopy is used if induced sputum cannot be obtained, and post-bronchoscopy sputum should also be collected (conditional recommendations). ${cite(1)}</p>
      <ul>
        <li><strong>Bronchoscopy</strong> (the most tempting option) is reasonable later, but not first-line.</li>
      </ul>`,
  },
  {
    topic: "Diagnosing sarcoidosis",
    stem:
      "EBUS-TBNA of a subcarinal node in a 42-year-old woman shows <strong>non-necrotizing</strong> granulomas. AFB smear and NAAT on the aspirate are negative; mycobacterial and fungal cultures are pending. Under the ATS sarcoidosis guideline, what else is required before diagnosing sarcoidosis?",
    options: [
      "A second EBUS showing the same histology",
      "Bilateral hilar lymphadenopathy on CT",
      "A negative IGRA",
      "A tissue sample from a second organ",
      "Exclusion of other causes of granulomatous inflammation",
    ],
    answer: 4,
    rationale: `
      <p>The ATS guideline defines sarcoidosis by non-necrotizing granulomas <strong>plus exclusion of other granulomatous causes</strong>. ${cite(52)} That is why the pending cultures matter: on extrapulmonary tissue, a negative smear or NAAT never excludes TB. ${cite(1)}</p>
      <ul>
        <li><strong>A negative IGRA</strong> (the most tempting option) does not do this job. An IGRA is a test for TB <em>infection</em> and cannot tell latent from active TB, so it cannot diagnose TB in the node; the cultures can. ${cite(1)}</li>
      </ul>`,
  },
  {
    topic: "Baseline testing in a BCG-vaccinated health worker",
    stem:
      "A 26-year-old physician who <strong>received BCG</strong> in childhood needs baseline testing for TB infection before starting work. Which approach do ATS/IDSA/CDC recommend?",
    options: [
      "A single-step tuberculin skin test",
      "An interferon-gamma release assay",
      "A two-step tuberculin skin test",
      "Both a skin test and an IGRA",
      "A chest radiograph alone",
    ],
    answer: 1,
    rationale: `
      <p>ATS/IDSA/CDC recommend an IGRA over the TST in people aged &ge;5 years with a history of BCG vaccination. TST is an acceptable alternative when IGRA is unavailable or too costly. ${cite(1)}</p>
      <ul>
        <li><strong>A two-step TST</strong> (the most tempting option): if a TST <em>is</em> used for staff who will be retested periodically, the Saudi NTP Manual recommends two-step testing to avoid mistaking a boosted reaction for new infection. ${cite(5)} That is a workable alternative, not the preferred test.</li>
        <li><strong>A chest radiograph</strong> looks for disease, not infection.</li>
      </ul>`,
  },
  {
    topic: "When does TB happen after infection?",
    stem:
      "A household contact's IGRA converts from negative to positive. Without preventive treatment, when is her risk of developing active TB concentrated?",
    options: [
      "Within the first 2 weeks",
      "Within the first 2 years",
      "Between years 5 and 10",
      "Between years 10 and 20",
      "Evenly across her lifetime",
    ],
    answer: 1,
    rationale: `
      <p>Most of the lifetime risk comes early. Of eventual cases, about <strong>45% occur by 1 year, 62% by 2 years and 83% by 5 years</strong>; among Amsterdam contacts, 97% occurred within 2 years. ${cite(71)} Contact studies show incidence is highest in the first year. ${cite(75)}</p>
      <ul>
        <li><strong>Within the first 2 weeks</strong> would be biologically implausible, since the TST itself takes up to 6 weeks to convert. ${cite(71)}</li>
      </ul>`,
  },
  {
    topic: "TB risk with anti-TNF agents",
    stem:
      "In the French RATIO registry, which anti-TNF agent had the <strong>lowest</strong> standardized incidence ratio for TB?",
    options: [
      "Adalimumab",
      "Etanercept",
      "Infliximab",
      "The risk was similar across all three",
    ],
    answer: 1,
    rationale: `
      <p>In RATIO the standardized incidence ratios were infliximab 18.6, adalimumab 29.3 and etanercept 1.8. ${cite(76)} Monoclonal anti-TNF antibodies carry a much higher risk than the soluble receptor.</p>
      <p>None of the anti-TNF-associated cases in RATIO had received correct prophylaxis. That is why international recommendations call for screening and LTBI treatment before a biologic starts. ${cite(76, 85)}</p>`,
  },
];

const REFERENCES = {
  groups: [
    {
      title: "Case 1 — Hr-TB",
      items: [
        { n: 1, text: "Lewinsohn DM, Leonard MK, LoBue PA, Cohn DL, Daley CL, Desmond E, et al. Official American Thoracic Society/Infectious Diseases Society of America/Centers for Disease Control and Prevention Clinical Practice Guidelines: Diagnosis of Tuberculosis in Adults and Children. Clin Infect Dis. 2017;64(2):e1-e33.", doi: "10.1093/cid/ciw694", tag: "Clinical practice guideline — ATS/IDSA/CDC diagnosis of TB (full guideline)" },
        { n: 2, text: "Denning DW, Cadranel J, Beigelman-Aubry C, Ader F, Chakrabarti A, Blot S, et al. Chronic pulmonary aspergillosis: rationale and clinical guidelines for diagnosis and management. Eur Respir J. 2016;47(1):45-68.", doi: "10.1183/13993003.00583-2015", tag: "Clinical practice guideline — ESCMID/ERS" },
        { n: 3, text: "Nahid P, Dorman SE, Alipanah N, Barry PM, Brozek JL, Cattamanchi A, et al. Official American Thoracic Society/Centers for Disease Control and Prevention/Infectious Diseases Society of America Clinical Practice Guidelines: Treatment of Drug-Susceptible Tuberculosis. Clin Infect Dis. 2016;63(7):e147-e195.", doi: "10.1093/cid/ciw376", tag: "Clinical practice guideline — ATS/CDC/IDSA drug-susceptible TB" },
        { n: 4, text: "National Tuberculosis Controllers Association; Centers for Disease Control and Prevention. Guidelines for the investigation of contacts of persons with infectious tuberculosis. MMWR Recomm Rep. 2005;54(RR-15):1-47.", tag: "Clinical practice guideline — also the source of the 8–10 week window period recommendation used throughout Case 5" },
        { n: 5, text: "Ministry of Health, Saudi Arabia. National Tuberculosis Program Manual 2021. Ministry of Health; 2021. Available from: moh.gov.sa.", tag: "National programme manual (Saudi Arabia)" },
        { n: 6, text: "Saukkonen JJ, Duarte R, Munsiff SS, Winston CA, Mammen MJ, Abubakar I, et al. Updates on the Treatment of Drug-Susceptible and Drug-Resistant Tuberculosis: An Official ATS/CDC/ERS/IDSA Clinical Practice Guideline. Am J Respir Crit Care Med. 2025;211(1):15-33.", doi: "10.1164/rccm.202410-2096ST", tag: "Clinical practice guideline — ATS/CDC/ERS/IDSA 2025 update" },
        { n: 7, text: "Zifodya JS, Kreniske JS, Schiller I, Kohli M, Dendukuri N, Schumacher SG, et al. Xpert Ultra versus Xpert MTB/RIF for pulmonary tuberculosis and rifampicin resistance in adults with presumptive pulmonary tuberculosis. Cochrane Database Syst Rev. 2021;2(2):CD009593.", doi: "10.1002/14651858.CD009593.pub5", tag: "Diagnostic test accuracy systematic review (Cochrane)" },
        { n: 8, text: "World Health Organization. Global tuberculosis report 2025. Geneva: World Health Organization; 2025.", url: "https://www.who.int/teams/global-programme-on-tuberculosis-and-lung-health/tb-reports/global-tuberculosis-report-2025", tag: "Global surveillance report" },
        { n: 9, text: "Warren RM, Streicher EM, Gey van Pittius NC, Marais BJ, van der Spuy GD, Victor TC, et al. The clinical relevance of Mycobacterial pharmacogenetics. Tuberculosis (Edinb). 2009;89(3):199-202.", doi: "10.1016/j.tube.2009.03.001", tag: "Narrative review" },
        { n: 10, text: "World Health Organization. WHO treatment guidelines for isoniazid-resistant tuberculosis: supplement to the WHO treatment guidelines for drug-resistant tuberculosis. Geneva: WHO; 2018.", tag: "Clinical practice guideline" },
        { n: 11, text: "Fregonese F, Ahuja SD, Akkerman OW, et al. Comparison of different treatments for isoniazid-resistant tuberculosis: an individual patient data meta-analysis. Lancet Respir Med. 2018;6(4):265-275.", tag: "Individual patient data meta-analysis" },
        { n: 12, text: "Nahid P, Mase SR, Migliori GB, Sotgiu G, Bothamley GH, Brozek JL, et al. Treatment of Drug-Resistant Tuberculosis. An Official ATS/CDC/ERS/IDSA Clinical Practice Guideline. Am J Respir Crit Care Med. 2019;200(10):e93-e142.", doi: "10.1164/rccm.201909-1874ST", tag: "Clinical practice guideline — ATS/CDC/ERS/IDSA drug-resistant TB" },
      ],
    },
    {
      title: "Case 2 — MDR-TB / BPaLM",
      items: [
        { n: 13, text: "World Health Organization. WHO consolidated guidelines on tuberculosis. Module 4: treatment and care. Geneva: WHO; 2025.", tag: "Clinical practice guideline — 2025 edition; introduces the BDLLfxC regimen and a preference order among modified 9-month regimens" },
        { n: 14, text: "Conradie F, Diacon AH, Ngubane N, et al. Treatment of highly drug-resistant pulmonary tuberculosis. N Engl J Med. 2020;382(10):893-902.", doi: "10.1056/NEJMoa1901814", tag: "Single-arm, open-label trial — Nix-TB" },
        { n: 15, text: "Conradie F, et al. Bedaquiline-pretomanid-linezolid regimens for drug-resistant tuberculosis. N Engl J Med. 2022;387(9):810-823.", doi: "10.1056/NEJMoa2119430", tag: "Randomized dose-finding trial — ZeNix" },
        { n: 16, text: "Alanazi R, Alghamdi H, Alansari R, Albassam S, Alghamdi H, Altowairqi H, et al. Epidemiology and risk factors of multidrug-resistant tuberculosis in Saudi Arabia: a systematic review and meta-analysis. Front Public Health. 2026;14:1824576.", doi: "10.3389/fpubh.2026.1824576", tag: "Systematic review and meta-analysis (Saudi Arabia)" },
        { n: 17, text: "Wang W, Liu R, Yao C, Huo F, Shang Y, Zhang X, et al. Reevaluating Rifampicin Breakpoint Concentrations for Mycobacterium tuberculosis Isolates with Disputed rpoB Mutations and Discordant Susceptibility Phenotypes. Microbiol Spectr. 2022;10(1):e0208721.", doi: "10.1128/spectrum.02087-21", tag: "Laboratory study" },
        { n: 18, text: "Makhado NA, Matabane E, Faccin M, Pinçon C, Jouet A, Boutachkourt F, et al. Outbreak of multidrug-resistant tuberculosis in South Africa undetected by WHO-endorsed commercial tests: an observational study. Lancet Infect Dis. 2018;18(12):1350-1359.", doi: "10.1016/S1473-3099(18)30496-1", tag: "Observational study (outbreak genomic investigation)" },
        { n: 19, text: "Sanchez-Padilla E, Merker M, Beckert P, Jochims F, Dlamini T, Kahn P, et al. Detection of drug-resistant tuberculosis by Xpert MTB/RIF in Swaziland. N Engl J Med. 2015;372(12):1181-2.", doi: "10.1056/NEJMc1413930", tag: "Correspondence reporting observational genotypic data" },
        { n: 20, text: "Ardizzoni E, Ariza E, Mulengwa D, Mpala Q, de La Tour R, Maphalala G, et al. Thin-Layer-Agar-Based Direct Phenotypic Drug Susceptibility Testing on Sputum in Eswatini Rapidly Detects Mycobacterium tuberculosis Growth and Rifampicin Resistance Otherwise Missed by WHO-Endorsed Diagnostic Tests. Antimicrob Agents Chemother. 2021;65(6):e02263-20.", doi: "10.1128/AAC.02263-20", tag: "Diagnostic accuracy study" },
        { n: 21, text: "Alawi MM, Alserehi HA, Ali AO, Albalawi AM, Alanizi MK, Nabet FM, et al. Epidemiology of tuberculosis in Saudi Arabia following the implementation of end tuberculosis strategy: Analysis of the surveillance data 2015-2019. Saudi Med J. 2024;45(1):60-68.", doi: "10.15537/smj.2024.45.1.20230424", tag: "National surveillance data analysis (Saudi Arabia)" },
        { n: 22, text: "Nyang'wa BT, Berry C, Kazounis E, et al. A 24-week, all-oral regimen for rifampin-resistant tuberculosis. N Engl J Med. 2022;387(25):2331-2343.", doi: "10.1056/NEJMoa2117166", tag: "Randomized controlled trial — TB-PRACTECAL" },
        { n: 23, text: "Conradie F, Badat T, Poswa A, Rajaram S, Kooverjee S, Maartens G, et al. A Pragmatic Trial of a 6-Month Strategy for Rifampicin-Resistant Tuberculosis. N Engl J Med. 2026;394(24):2429-2439.", doi: "10.1056/NEJMoa2503687", tag: "Pragmatic randomized controlled non-inferiority trial — BEAT Tuberculosis" },
        { n: 24, text: "Guglielmetti L, Khan U, Velásquez GE, et al. Oral Regimens for Rifampin-Resistant, Fluoroquinolone-Susceptible Tuberculosis. N Engl J Med. 2025;392(5):468-482.", doi: "10.1056/NEJMoa2400327", tag: "Randomized controlled non-inferiority trial — endTB" },
        { n: 25, text: "Goodall RL, Meredith SK, Nunn AJ, Bayissa A, Bhatnagar AK, Bronson G, et al. Evaluation of two short standardised regimens for the treatment of rifampicin-resistant tuberculosis (STREAM stage 2): an open-label, multicentre, randomised, non-inferiority trial. Lancet. 2022;400(10366):1858-1868.", doi: "10.1016/S0140-6736(22)02078-5", tag: "Randomized controlled non-inferiority trial — STREAM stage 2" },
        { n: 26, text: "Guglielmetti L, Khan U, Velásquez GE, et al. Bedaquiline, delamanid, linezolid, and clofazimine for rifampicin-resistant and fluoroquinolone-resistant tuberculosis (endTB-Q). Lancet Respir Med. 2025;13(9):809-820.", doi: "10.1016/S2213-2600(25)00194-8", tag: "Randomized controlled non-inferiority trial — endTB-Q" },
      ],
    },
    {
      title: "Case 3 — Miliary TB / HIV / LAM",
      items: [
        { n: 27, text: "World Health Organization. Lateral flow urine lipoarabinomannan assay (LF-LAM) for the diagnosis of active tuberculosis in people living with HIV: policy update. Geneva: WHO; 2019.", tag: "Clinical practice guideline / policy update" },
        { n: 28, text: "World Health Organization. WHO guidelines on the management of advanced HIV disease. Geneva: World Health Organization; 2025. NCBI Bookshelf NBK620050.", url: "https://www.ncbi.nlm.nih.gov/books/NBK620050/", tag: "Clinical practice guideline (WHO)" },
        { n: 29, text: "Narayanasamy S, Dat VQ, Thanh NT, Ly VT, Chan JF, Yuen KY, et al. A global call for talaromycosis to be recognised as a neglected tropical disease. Lancet Glob Health. 2021;9(11):e1618-e1622.", doi: "10.1016/S2214-109X(21)00350-8", tag: "Viewpoint" },
        { n: 30, text: "Pruksaphon K, Intaramat A, Ratanabanangkoon K, Nosanchuk JD, Vanittanakom N, Youngchim S. Diagnostic laboratory immunology for talaromycosis (penicilliosis): review from the bench-top techniques to the point-of-care testing. Diagn Microbiol Infect Dis. 2020;96(3):114959.", doi: "10.1016/j.diagmicrobio.2019.114959", tag: "Narrative review" },
        { n: 31, text: "Le T, Kinh NV, Cuc NTK, Tung NLN, Lam NT, Thuy PTT, et al. A Trial of Itraconazole or Amphotericin B for HIV-Associated Talaromycosis. N Engl J Med. 2017;376(24):2329-2340.", doi: "10.1056/NEJMoa1613306", tag: "Randomized controlled trial — IVAP" },
        { n: 32, text: "Kathuria S, Capoor MR, Yadav S, Singh A, Ramesh V. Disseminated histoplasmosis in an apparently immunocompetent individual from north India: a case report and review. Med Mycol. 2013;51(7):774-8.", doi: "10.3109/13693786.2013.777166", tag: "Case report and literature review" },
        { n: 33, text: "Wiersinga WJ, Virk HS, Torres AG, Currie BJ, Peacock SJ, Dance DAB, et al. Melioidosis. Nat Rev Dis Primers. 2018;4:17107.", doi: "10.1038/nrdp.2017.107", tag: "Review (Primer)" },
        { n: 34, text: "Yoshida A, Doanh PN, Maruyama H. Paragonimus and paragonimiasis in Asia: An update. Acta Trop. 2019;199:105074.", doi: "10.1016/j.actatropica.2019.105074", tag: "Narrative review" },
        { n: 35, text: "Mukae H, Taniguchi H, Matsumoto N, Iiboshi H, Ashitani J, Matsukura S, et al. Clinicoradiologic features of pleuropulmonary Paragonimus westermani on Kyusyu Island, Japan. Chest. 2001;120(2):514-20.", doi: "10.1378/chest.120.2.514", tag: "Case series" },
        { n: 36, text: "Bjerrum S, Schiller I, Dendukuri N, Kohli M, Nathavitharana RR, Zwerling AA, Denkinger CM, Steingart KR, Shah M. Lateral flow urine lipoarabinomannan assay for detecting active tuberculosis in people living with HIV. Cochrane Database Syst Rev. 2019;10(10):CD011420.", doi: "10.1002/14651858.CD011420.pub3", tag: "Diagnostic test accuracy systematic review — also the source of the CD4≤100 subgroup sensitivity estimate" },
        { n: 37, text: "Peter JG, Zijenah LS, Chanda D, et al. Effect on mortality of point-of-care, urine-based lipoarabinomannan testing to guide tuberculosis treatment initiation in HIV-positive hospital inpatients: a pragmatic, parallel-group, multicountry, open-label, randomised controlled trial. Lancet. 2016;387(10024):1187-1197.", tag: "Randomized controlled trial" },
        { n: 38, text: "Gupta-Wright A, Corbett EL, van Oosterhout JJ, et al. Rapid urine-based screening for tuberculosis in HIV-positive patients admitted to hospital in Africa (STAMP): a pragmatic, multicentre, parallel-group, double-blind, randomised controlled trial. Lancet. 2018;392(10144):292-301.", tag: "Randomized controlled trial" },
        { n: 39, text: "McWilliams T, Wells AU, Harrison AC, Lindstrom S, Cameron RJ, Foskin E. Induced sputum and bronchoscopy in the diagnosis of pulmonary tuberculosis. Thorax. 2002;57(12):1010-1014.", tag: "Prospective comparative study" },
        { n: 40, text: "Musso M, Gualano G, Mencarini P, et al. Diagnostic yield of induced sputum and Bronchoalveolar lavage in suspected pulmonary tuberculosis. BMC Infect Dis. 2025;25:680.", doi: "10.1186/s12879-025-11020-3", tag: "Retrospective comparative study" },
        { n: 41, text: "Blanc FX, Sok T, Laureillard D, Borand L, Rekacewicz C, Nerrienet E, et al. Earlier versus later start of antiretroviral therapy in HIV-infected adults with tuberculosis. N Engl J Med. 2011;365(16):1471-81.", doi: "10.1056/NEJMoa1013911", tag: "Randomized controlled trial — CAMELIA" },
        { n: 42, text: "Havlir DV, Kendall MA, Ive P, Kumwenda J, Swindells S, Qasba SS, et al. Timing of antiretroviral therapy for HIV-1 infection and tuberculosis. N Engl J Med. 2011;365(16):1482-91.", doi: "10.1056/NEJMoa1013607", tag: "Randomized controlled trial — STRIDE" },
        { n: 43, text: "Abdool Karim SS, Naidoo K, Grobler A, Padayatchi N, Baxter C, Gray AL, et al. Integration of antiretroviral therapy with tuberculosis treatment. N Engl J Med. 2011;365(16):1492-501.", doi: "10.1056/NEJMoa1014181", tag: "Randomized controlled trial — SAPiT" },
        { n: 44, text: "Meintjes G, Stek C, Blumenthal L, Thienemann F, Schutz C, Buyze J, et al. Prednisone for the Prevention of Paradoxical Tuberculosis-Associated IRIS. N Engl J Med. 2018;379(20):1915-1925.", doi: "10.1056/NEJMoa1800762", tag: "Randomized placebo-controlled trial — PredART" },
        { n: 45, text: "Török ME, Yen NT, Chau TT, Mai NT, Phu NH, Mai PP, et al. Timing of initiation of antiretroviral therapy in human immunodeficiency virus (HIV)--associated tuberculous meningitis. Clin Infect Dis. 2011;52(11):1374-83.", doi: "10.1093/cid/cir230", tag: "Randomized controlled trial" },
        { n: 46, text: "Dooley KE, Kaplan R, Mwelase N, Grinsztejn B, Ticona E, Lacerda M, et al. Dolutegravir-based Antiretroviral Therapy for Patients Coinfected With Tuberculosis and Human Immunodeficiency Virus: A Multicenter, Noncomparative, Open-label, Randomized Trial. Clin Infect Dis. 2020;70(4):549-556.", doi: "10.1093/cid/ciz256", tag: "Randomized non-comparative trial — INSPIRING" },
        { n: 47, text: "World Health Organization. Consolidated guidelines on HIV prevention, testing, treatment, service delivery and monitoring: recommendations for a public health approach. Geneva: World Health Organization; 2021. NCBI Bookshelf NBK572729.", url: "https://www.ncbi.nlm.nih.gov/books/NBK572729/", tag: "Clinical practice guideline (WHO) — section 6.3, co-trimoxazole prophylaxis" },
      ],
    },
    {
      title: "Case 4 — Lymphadenopathy / EBUS",
      items: [
        { n: 48, text: "von Bartheld MB, Dekkers OM, Szlubowski A, et al. Endosonography vs conventional bronchoscopy for the diagnosis of sarcoidosis: the GRANULOMA randomized clinical trial. JAMA. 2013;309(23):2457-2464.", tag: "Randomized controlled trial" },
        { n: 49, text: "Labarca G, Sierra-Ruiz M, Kheir F, Folch E, Majid A, Mehta HJ, Jantz MA, Fernandez-Bussy S. Diagnostic Accuracy of Endobronchial Ultrasound Transbronchial Needle Aspiration in Lymphoma. A Systematic Review and Meta-Analysis. Ann Am Thorac Soc. 2019;16(11):1432-1439.", doi: "10.1513/AnnalsATS.201902-175OC", tag: "Systematic review and meta-analysis" },
        { n: 50, text: "Kennedy MP, McCarthy J. Is Endobronchial Ultrasound-guided Transbronchial Needle Aspiration Useful in the Workup of Patients with Lymphoma? Ann Am Thorac Soc. 2019;16(11):1373-1374.", doi: "10.1513/AnnalsATS.201907-567ED", tag: "Editorial, companion piece to Labarca et al. 2019" },
        { n: 51, text: "Ariza-Prota M, Pérez-Pallarés J, Barisione E, Cruz-Rueda JJ, Onyancha S, Usturoi D, et al. Enhancing diagnostic precision: a multicentric study of endobronchial ultrasound-guided transbronchial mediastinal cryobiopsy in lymphoproliferative disorders. ERJ Open Res. 2025;11(5):00775-2024.", doi: "10.1183/23120541.00775-2024", tag: "Multicentre retrospective study" },
        { n: 52, text: "Crouser ED, Maier LA, Wilson KC, Bonham CA, Morgenthau AS, Patterson KC, et al. Diagnosis and Detection of Sarcoidosis. An Official American Thoracic Society Clinical Practice Guideline. Am J Respir Crit Care Med. 2020;201(8):e26-e51.", doi: "10.1164/rccm.202002-0251ST", tag: "Clinical practice guideline — ATS sarcoidosis" },
        { n: 53, text: "Gupta N, Muthu V, Agarwal R, Dhooria S. Role of EBUS-TBNA in the Diagnosis of Tuberculosis and Sarcoidosis. J Cytol. 2019;36(2):128-130.", doi: "10.4103/JOC.JOC_150_18", tag: "Prospective single-centre study" },
        { n: 54, text: "Lin CK, Keng LT, Lim CK, Lin YT, Lin SY, Chen LY, Yao ZH, Chen YH, Ho CC. Diagnosis of mediastinal tuberculous lymphadenitis using endobronchial ultrasound-guided transbronchial needle aspiration with rinse fluid polymerase chain reaction. J Formos Med Assoc. 2020;119(1 Pt 3):509-515.", doi: "10.1016/j.jfma.2019.07.014", tag: "Retrospective study with prospective data collection" },
        { n: 55, text: "Lucey O, Potter J, Ricketts W, Castle L, Melzer M. Utility of EBUS-TBNA in diagnosing mediastinal tuberculous lymphadenitis in East London. J Infect. 2022;84(1):17-23.", doi: "10.1016/j.jinf.2021.10.015", tag: "Retrospective study" },
        { n: 56, text: "Yang W, Yang H, Zhang Q, Herth FJF, Zhang X. Comparison between Endobronchial Ultrasound-Guided Transbronchial Node Biopsy and Transbronchial Needle Aspiration: A Meta-Analysis. Respiration. 2024;103(12):752-764.", doi: "10.1159/000540859", tag: "Meta-analysis" },
        { n: 57, text: "Vilmann P, Clementsen PF, Colella S, Siemsen M, De Leyn P, Dumonceau JM, et al. Combined endobronchial and oesophageal endosonography for the diagnosis and staging of lung cancer. European Society of Gastrointestinal Endoscopy (ESGE) Guideline, in cooperation with the European Respiratory Society (ERS) and the European Society of Thoracic Surgeons (ESTS). Eur Respir J. 2015;46(1):40-60.", doi: "10.1183/09031936.00064515", tag: "Clinical practice guideline — ESGE/ERS/ESTS" },
        { n: 58, text: "von Bartheld MB, van Breda A, Annema JT. Complication rate of endosonography (endobronchial and endoscopic ultrasound): a systematic review. Respiration. 2014;87(4):343-51.", doi: "10.1159/000357066", tag: "Systematic review" },
        { n: 59, text: "Burgard C, Stahl R, de Figueiredo GN, Dinkel J, Liebig T, Cioni D, Neri E, Trumm CG. Percutaneous CT Fluoroscopy-Guided Core Needle Biopsy of Mediastinal Masses: Technical Outcome and Complications of 155 Procedures during a 10-Year Period. Diagnostics (Basel). 2021;11(5):781.", doi: "10.3390/diagnostics11050781", tag: "Retrospective study" },
        { n: 60, text: "Geri G, Passeron A, Heym B, Arlet JB, Pouchot J, Capron L, et al. Paradoxical reactions during treatment of tuberculosis with extrapulmonary manifestations in HIV-negative patients. Infection. 2013;41(2):537-43.", doi: "10.1007/s15010-012-0376-9", tag: "Retrospective cohort study" },
        { n: 61, text: "Rai DK, Kant S, Gupta VB. Paradoxical reaction in peripheral lymph node tuberculosis: a review of its prevalence, clinical characteristics, and possible treatment. Monaldi Arch Chest Dis. 2023;94(3).", doi: "10.4081/monaldi.2023.2625", tag: "Narrative review" },
      ],
    },
    {
      title: "Case 5 — Occupational exposure / LTBI",
      items: [
        { n: 62, text: "Jensen PA, Lambert LA, Iademarco MF, Ridzon R. Guidelines for preventing the transmission of Mycobacterium tuberculosis in health-care settings, 2005. MMWR Recomm Rep. 2005;54(RR-17):1-141.", url: "https://pubmed.ncbi.nlm.nih.gov/16382216/", tag: "Clinical practice guideline — CDC health-care settings" },
        { n: 63, text: "Behr MA, Warren SA, Salamon H, Hopewell PC, Ponce de Leon A, Daley CL, et al. Transmission of Mycobacterium tuberculosis from patients smear-negative for acid-fast bacilli. Lancet. 1999;353(9151):444-9.", doi: "10.1016/S0140-6736(98)03406-0", tag: "Molecular epidemiology study" },
        { n: 64, text: "Tostmann A, Kik SV, Kalisvaart NA, Sebek MM, Verver S, Boeree MJ, et al. Tuberculosis transmission by patients with smear-negative pulmonary tuberculosis in a large cohort in the Netherlands. Clin Infect Dis. 2008;47(9):1135-42.", doi: "10.1086/591974", tag: "Molecular epidemiology cohort study" },
        { n: 65, text: "Shah M, Dansky Z, Nathavitharana R, Behm H, Brown S, Dov L, et al. National Tuberculosis Coalition of America (NTCA) Guidelines for Respiratory Isolation and Restrictions to Reduce Transmission of Pulmonary Tuberculosis in Community Settings. Clin Infect Dis. 2024. Published online 18 Apr 2024.", doi: "10.1093/cid/ciae199", tag: "Clinical practice guideline — NTCA" },
        { n: 66, text: "Sosa LE, Njie GJ, Lobato MN, Bamrah Morris S, Buchta W, Casey ML, et al. Tuberculosis Screening, Testing, and Treatment of U.S. Health Care Personnel: Recommendations from the National Tuberculosis Controllers Association and CDC, 2019. MMWR Morb Mortal Wkly Rep. 2019;68(19):439-443.", doi: "10.15585/mmwr.mm6819a3", tag: "Clinical practice guideline — NTCA/CDC health care personnel" },
        { n: 67, text: "Al Hajoj S, Varghese B, Datijan A, Shoukri M, Alzahrani A, Alkhenizan A, et al. Interferon Gamma Release Assay versus Tuberculin Skin Testing among Healthcare Workers of Highly Diverse Origin in a Moderate Tuberculosis Burden Country. PLoS One. 2016;11(5):e0154803.", doi: "10.1371/journal.pone.0154803", tag: "Cross-sectional study (Riyadh)" },
        { n: 68, text: "Alahmari H, Hanson L, Kelley PG, Spong J, Milazzo A, Mnatzaganian G. Interferon-gamma release assays versus tuberculin skin test for latent tuberculosis infection positivity among healthcare workers and first responders: a systematic review and meta-analysis. Int J Infect Dis. 2026;170:108949.", doi: "10.1016/j.ijid.2026.108949", tag: "Systematic review and meta-analysis" },
        { n: 69, text: "Alyami SMA, Alzomor O, Hassan IS, AlShamrani M, Al-Jazairi AS, Algamdi M, et al. The Saudi Thoracic Society evidence-based guidelines for the diagnosis and management of community-acquired pneumonia in children and adults. Ann Thorac Med. 2025;20(4):195-212.", doi: "10.4103/atm.atm_293_25", tag: "Clinical practice guideline — Saudi Thoracic Society CAP" },
        { n: 70, text: "Metlay JP, Waterer GW, Long AC, Anzueto A, Brozek J, Crothers K, et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. An Official Clinical Practice Guideline of the American Thoracic Society and Infectious Diseases Society of America. Am J Respir Crit Care Med. 2019;200(7):e45-e67.", doi: "10.1164/rccm.201908-1581ST", tag: "Clinical practice guideline — ATS/IDSA CAP" },
        { n: 71, text: "Behr MA, Edelstein PH, Ramakrishnan L. Revisiting the timetable of tuberculosis. BMJ. 2018;362:k2738.", doi: "10.1136/bmj.k2738", tag: "Narrative review" },
        { n: 72, text: "Chen TC, Lu PL, Lin CY, Lin WR, Chen YH. Fluoroquinolones are associated with delayed treatment and resistance in tuberculosis: a systematic review and meta-analysis. Int J Infect Dis. 2011;15(3):e211-6.", doi: "10.1016/j.ijid.2010.11.008", tag: "Systematic review and meta-analysis" },
        { n: 73, text: "den Boon S, Matteelli A, Getahun H. Rifampicin resistance after treatment for latent tuberculous infection: a systematic review and meta-analysis. Int J Tuberc Lung Dis. 2016;20(8):1065-71.", doi: "10.5588/ijtld.15.0908", tag: "Systematic review and meta-analysis" },
        { n: 74, text: "Balcells ME, Thomas SL, Godfrey-Faussett P, Grant AD. Isoniazid preventive therapy and risk for resistant tuberculosis. Emerg Infect Dis. 2006;12(5):744-51.", doi: "10.3201/eid1205.050681", tag: "Systematic review and meta-analysis" },
        { n: 75, text: "Fox GJ, Barry SE, Britton WJ, Marks GB. Contact investigation for tuberculosis: a systematic review and meta-analysis. Eur Respir J. 2013;41(1):140-56.", doi: "10.1183/09031936.00070812", tag: "Systematic review and meta-analysis" },
        { n: 76, text: "Tubach F, Salmon D, Ravaud P, Allanore Y, Goupille P, Bréban M, et al. Risk of tuberculosis is higher with anti-tumor necrosis factor monoclonal antibody therapy than with soluble tumor necrosis factor receptor therapy: The three-year prospective French Research Axed on Tolerance of Biotherapies registry. Arthritis Rheum. 2009;60(7):1884-94.", doi: "10.1002/art.24632", tag: "Prospective registry study — RATIO" },
        { n: 77, text: "Winthrop KL, Park SH, Gul A, Cardiel MH, Gomez-Reino JJ, Tanaka Y, et al. Tuberculosis and other opportunistic infections in tofacitinib-treated patients with rheumatoid arthritis. Ann Rheum Dis. 2016;75(6):1133-8.", doi: "10.1136/annrheumdis-2015-207319", tag: "Pooled analysis of clinical trial data" },
        { n: 78, text: "Jeon CY, Murray MB. Diabetes mellitus increases the risk of active tuberculosis: a systematic review of 13 observational studies. PLoS Med. 2008;5(7):e152.", doi: "10.1371/journal.pmed.0050152", tag: "Systematic review of observational studies" },
        { n: 79, text: "Getahun H, Matteelli A, Abubakar I, Aziz MA, Baddeley A, Barreira D, et al. Management of latent Mycobacterium tuberculosis infection: WHO guidelines for low tuberculosis burden countries. Eur Respir J. 2015;46(6):1563-76.", doi: "10.1183/13993003.01245-2015", tag: "Clinical practice guideline (WHO) — low TB-burden countries" },
        { n: 80, text: "Sterling TR, Villarino ME, Borisov AS, Shang N, Gordin F, Bliven-Sizemore E, Hackman J, Hamilton CD, Menzies D, Kerrigan A, Weis SE, Weiner M, Wing D, Conde MB, Bozeman L, Horsburgh CR Jr, Chaisson RE; TB Trials Consortium PREVENT TB Study Team. Three months of rifapentine and isoniazid for latent tuberculosis infection. N Engl J Med. 2011;365(23):2155-2166.", doi: "10.1056/NEJMoa1104875", tag: "Randomized controlled non-inferiority trial" },
        { n: 81, text: "Menzies D, Adjobimey M, Ruslami R, Trajman A, Sow O, Kim H, Obeng Baah J, Marks GB, Long R, Hoeppner V, Elwood K, Al-Jahdali H, Gninafon M, Apriani L, Koesoemadinata RC, Kritski A, Rolla V, Bah B, Camara A, Boakye I, Cook VJ, Goldberg H, Valiquette C, Hornby K, Dion MJ, Li PZ, Hill PC, Schwartzman K, Benedetti A. Four Months of Rifampin or Nine Months of Isoniazid for Latent Tuberculosis in Adults. N Engl J Med. 2018;379(5):440-453.", doi: "10.1056/NEJMoa1714283", tag: "Randomized controlled non-inferiority trial" },
        { n: 82, text: "Swindells S, Ramchandani R, Gupta A, Benson CA, Leon-Cruz J, Mwelase N, et al. One Month of Rifapentine plus Isoniazid to Prevent HIV-Related Tuberculosis. N Engl J Med. 2019;380(11):1001-1011.", doi: "10.1056/NEJMoa1806808", tag: "Randomized controlled non-inferiority trial — BRIEF-TB" },
        { n: 83, text: "World Health Organization. WHO consolidated guidelines on tuberculosis. Module 1: prevention — tuberculosis preventive treatment, second edition. Geneva: WHO; 2024.", tag: "Clinical practice guideline — second edition" },
        { n: 84, text: "Sterling TR, Njie G, Zenner D, et al. Guidelines for the Treatment of Latent Tuberculosis Infection: Recommendations from the National Tuberculosis Controllers Association and CDC, 2020. MMWR Recomm Rep. 2020;69(RR-1):1-11.", doi: "10.15585/mmwr.rr6901a1", tag: "Clinical practice guideline" },
        { n: 85, text: "Iannone F, Cantini F, Lapadula G. Diagnosis of latent tuberculosis and prevention of reactivation in rheumatic patients receiving biologic therapy: international recommendations. J Rheumatol Suppl. 2014;91:41-6.", doi: "10.3899/jrheum.140101", tag: "Review of international recommendations" },
        { n: 86, text: "Vaidya B, Nakarmi S. Simultaneous Adalimumab and Antitubercular Treatment for Latent Tubercular Infection: An Experience from Nepal. Int J Rheumatol. 2019;2019:2034950.", doi: "10.1155/2019/2034950", tag: "Retrospective case series" },
      ],
    },
    {
      title: "Case 6 — Pleural TB",
      items: [
        { n: 87, text: "al-Quorain A, Larbi EB, Satti MB, al-Muhanna F, Baloush A. Tuberculous pleural effusion in the eastern province of Saudi Arabia. Trop Geogr Med. 1994;46(5):298-301.", url: "https://pubmed.ncbi.nlm.nih.gov/7855916/", tag: "Prospective study (Eastern Province, Saudi Arabia)" },
        { n: 88, text: "Light RW, Macgregor MI, Luchsinger PC, Ball WC Jr. Pleural effusions: the diagnostic separation of transudates and exudates. Ann Intern Med. 1972;77(4):507-13.", doi: "10.7326/0003-4819-77-4-507", tag: "Diagnostic study (origin of Light's criteria)" },
        { n: 89, text: "Conde MB, Loivos AC, Rezende VM, Soares SL, Mello FC, Reingold AL, et al. Yield of sputum induction in the diagnosis of pleural tuberculosis. Am J Respir Crit Care Med. 2003;167(5):723-5.", doi: "10.1164/rccm.2111019", tag: "Prospective diagnostic study" },
        { n: 90, text: "Diacon AH, Van de Wal BW, Wyser C, Smedema JP, Bezuidenhout J, Bolliger CT, et al. Diagnostic tools in tuberculous pleurisy: a direct comparative study. Eur Respir J. 2003;22(4):589-91.", doi: "10.1183/09031936.03.00017103a", tag: "Prospective comparative diagnostic study" },
        { n: 91, text: "Aggarwal AN, Agarwal R, Sehgal IS, Dhooria S. Adenosine deaminase for diagnosis of tuberculous pleural effusion: A systematic review and meta-analysis. PLoS One. 2019;14(3):e0213728.", doi: "10.1371/journal.pone.0213728", tag: "Systematic review and meta-analysis" },
        { n: 92, text: "Kohli M, Inbaraj LR, Salomon A, Scandrett K, Korobitsyn A, Ismail N, et al. Low-complexity automated nucleic acid amplification tests for extrapulmonary tuberculosis and rifampicin resistance in adults and adolescents. Cochrane Database Syst Rev. 2025;8(8):CD012768.", doi: "10.1002/14651858.CD012768.pub4", tag: "Diagnostic test accuracy systematic review (Cochrane)" },
        { n: 93, text: "Ryan H, Yoo J, Darsini P. Corticosteroids for tuberculous pleurisy. Cochrane Database Syst Rev. 2017;3(3):CD001876.", doi: "10.1002/14651858.CD001876.pub3", tag: "Systematic review of RCTs (Cochrane)" },
        { n: 94, text: "Bhuniya S, Arunabha DC, Choudhury S, Saha I, Roy TS, Saha M. Role of therapeutic thoracentesis in tuberculous pleural effusion. Ann Thorac Med. 2012;7(4):215-9.", doi: "10.4103/1817-1737.102176", tag: "Randomized open-label trial" },
        { n: 95, text: "Al-Majed SA. Study of paradoxical response to chemotherapy in tuberculous pleural effusion. Respir Med. 1996;90(4):211-4.", doi: "10.1016/s0954-6111(96)90289-9", tag: "Retrospective study (Riyadh, Saudi Arabia)" },
        { n: 96, text: "Jeon K, Choi WI, An JS, Lim SY, Kim WJ, Park GM, et al. Paradoxical response in HIV-negative patients with pleural tuberculosis: a retrospective multicentre study. Int J Tuberc Lung Dis. 2012;16(6):846-51.", doi: "10.5588/ijtld.11.0642", tag: "Retrospective multicentre cohort study" },
      ],
    },
    {
      title: "Case 7 — Spinal TB",
      items: [
        { n: 97, text: "Sadat-Ali M, al-Mousa MS, al-Salem AH. Brucellosis as a cause of backache. Trop Geogr Med. 1991;43(1-2):148-51.", url: "https://pubmed.ncbi.nlm.nih.gov/1836289/", tag: "Prospective screening study (Al-Khobar, Saudi Arabia)" },
        { n: 98, text: "Cordero M, Sánchez I. Brucellar and tuberculous spondylitis. A comparative study of their clinical features. J Bone Joint Surg Br. 1991;73(1):100-3.", doi: "10.1302/0301-620X.73B1.1991738", tag: "Comparative clinical study" },
        { n: 99, text: "Sharif HS, Aideyan OA, Clark DC, Madkour MM, Aabed MY, Mattsson TA, et al. Brucellar and tuberculous spondylitis: comparative imaging features. Radiology. 1989;171(2):419-25.", doi: "10.1148/radiology.171.2.2704806", tag: "Comparative imaging study (Riyadh, Saudi Arabia)" },
        { n: 100, text: "Gao M, Sun J, Jiang Z, Cui X, Liu X, Wang G, et al. Comparison of Tuberculous and Brucellar Spondylitis on Magnetic Resonance Images. Spine (Phila Pa 1976). 2017;42(2):113-121.", doi: "10.1097/BRS.0000000000001697", tag: "Retrospective cross-sectional study" },
        { n: 101, text: "Ravichandran RCA, Amritanand R, Moses V, Kandagaddala M, Krishnan V, David KS, et al. Computed Tomography-Guided Spinal Biopsy in Suspected Infective Spondylodiscitis: An Institutional Review of Its Utility. Indian J Radiol Imaging. 2023;33(3):289-294.", doi: "10.1055/s-0043-1764491", tag: "Retrospective institutional review" },
      ],
    },
    {
      title: "Case 8 — TB meningitis",
      items: [
        { n: 102, text: "Gokul BN, Paul A, Hussein I. Neurobrucellosis. Saudi Med J. 2000;21(6):577-80.", url: "https://pubmed.ncbi.nlm.nih.gov/11500711/", tag: "Case report (Saudi Arabia)" },
        { n: 103, text: "Soares CN, da Silva MTT, Lima MA. Neurobrucellosis. Curr Opin Infect Dis. 2023;36(3):192-197.", doi: "10.1097/QCO.0000000000000920", tag: "Narrative review" },
        { n: 104, text: "Thao LTP, Heemskerk AD, Geskus RB, Mai NTH, Ha DTM, Chau TTH, et al. Prognostic Models for 9-Month Mortality in Tuberculous Meningitis. Clin Infect Dis. 2018;66(4):523-532.", doi: "10.1093/cid/cix849", tag: "Prognostic modelling study" },
        { n: 105, text: "Dhafer Alshehri F, Mahmood Okal F, Baeshen SK, Alharbi ZG, Khojah O, Alhawsawi WK, et al. Outcomes of central nervous system tuberculosis in Saudi Arabia: a multi-center study. Neurol Res. 2024;46(9):812-822.", doi: "10.1080/01616412.2024.2359262", tag: "Retrospective multicentre cohort (Saudi Arabia)" },
        { n: 106, text: "Thwaites GE, Nguyen DB, Nguyen HD, Hoang TQ, Do TT, Nguyen TC, et al. Dexamethasone for the treatment of tuberculous meningitis in adolescents and adults. N Engl J Med. 2004;351(17):1741-51.", doi: "10.1056/NEJMoa040573", tag: "Randomized placebo-controlled trial" },
        { n: 107, text: "Heemskerk AD, Bang ND, Mai NT, Chau TT, Phu NH, Loc PP, et al. Intensified Antituberculosis Therapy in Adults with Tuberculous Meningitis. N Engl J Med. 2016;374(2):124-34.", doi: "10.1056/NEJMoa1507062", tag: "Randomized placebo-controlled trial" },
        { n: 108, text: "Donovan J, Bang ND, Imran D, Nghia HDT, Burhan E, Huong DTT, et al. Adjunctive Dexamethasone for Tuberculous Meningitis in HIV-Positive Adults. N Engl J Med. 2023;389(15):1357-1367.", doi: "10.1056/NEJMoa2216218", tag: "Randomized placebo-controlled trial — ACT HIV" },
      ],
    },
    {
      title: "Case 9 — Intestinal TB",
      items: [
        { n: 109, text: "Kedia S, Das P, Madhusudhan KS, Dattagupta S, Sharma R, Sahni P, et al. Differentiating Crohn's disease from intestinal tuberculosis. World J Gastroenterol. 2019;25(4):418-432.", doi: "10.3748/wjg.v25.i4.418", tag: "Narrative review" },
        { n: 110, text: "Chen W, Fan JH, Luo W, Peng P, Su SB. Effectiveness of interferon-gamma release assays for differentiating intestinal tuberculosis from Crohn's disease: a meta-analysis. World J Gastroenterol. 2013;19(44):8133-40.", doi: "10.3748/wjg.v19.i44.8133", tag: "Meta-analysis" },
        { n: 111, text: "Kedia S, Sharma R, Sreenivas V, Madhusudhan KS, Sharma V, Bopanna S, et al. Accuracy of computed tomographic features in differentiating intestinal tuberculosis from Crohn's disease: a systematic review with meta-analysis. Intest Res. 2017;15(2):149-159.", doi: "10.5217/ir.2017.15.2.149", tag: "Systematic review and meta-analysis" },
        { n: 112, text: "Jin T, Fei B, Zhang Y, He X. The diagnostic value of polymerase chain reaction for Mycobacterium tuberculosis to distinguish intestinal tuberculosis from crohn's disease: A meta-analysis. Saudi J Gastroenterol. 2017;23(1):3-10.", doi: "10.4103/1319-3767.199135", tag: "Meta-analysis" },
        { n: 113, text: "Pratap Mouli V, Munot K, Ananthakrishnan A, Kedia S, Addagalla S, Garg SK, et al. Endoscopic and clinical responses to anti-tubercular therapy can differentiate intestinal tuberculosis from Crohn's disease. Aliment Pharmacol Ther. 2017;45(1):27-36.", doi: "10.1111/apt.13840", tag: "Retrospective study with prospective validation" },
        { n: 114, text: "Jullien S, Jain S, Ryan H, Ahuja V. Six-month therapy for abdominal tuberculosis. Cochrane Database Syst Rev. 2016;11(11):CD012163.", doi: "10.1002/14651858.CD012163.pub2", tag: "Systematic review of RCTs (Cochrane)" },
        { n: 115, text: "Tanoglu A, Erdem H, Friedland JS, Almajid FM, Batirel A, Kulzhanova S, et al. Clinicopathological profile of gastrointestinal tuberculosis: a multinational ID-IRI study. Eur J Clin Microbiol Infect Dis. 2020;39(3):493-500.", doi: "10.1007/s10096-019-03749-y", tag: "Multinational retrospective study (incl. Saudi Arabia)" },
      ],
    },
    {
      title: "Case 10 — Peritoneal TB",
      items: [
        { n: 116, text: "Sanai FM, Bzeizi KI. Systematic review: tuberculous peritonitis--presenting features, diagnostic strategies and treatment. Aliment Pharmacol Ther. 2005;22(8):685-700.", doi: "10.1111/j.1365-2036.2005.02645.x", tag: "Systematic review (Riyadh, Saudi Arabia)" },
        { n: 117, text: "Liu Q, Zhang Q, Guan Q, Xu JF, Shi QL. Abdominopelvic tuberculosis mimicking advanced ovarian cancer and pelvic inflammatory disease: a series of 28 female cases. Arch Gynecol Obstet. 2014;289(3):623-9.", doi: "10.1007/s00404-013-3034-2", tag: "Retrospective case series" },
        { n: 118, text: "Mahajan M, Prasad ML, Kumar P, Kumar A, Chatterjee N, Singh S, et al. An Updated Systematic Review and Meta-Analysis for the Diagnostic Test Accuracy of Ascitic Fluid Adenosine Deaminase in Tuberculous Peritonitis. Infect Chemother. 2023;55(2):264-277.", doi: "10.3947/ic.2023.0014", tag: "Systematic review and meta-analysis" },
        { n: 119, text: "Hossain J, al-Aska AK, al Mofleh I. Laparoscopy in tuberculous peritonitis. J R Soc Med. 1992;85(2):89-91.", doi: "10.1177/014107689208500212", tag: "Case series (Riyadh, Saudi Arabia)" },
        { n: 120, text: "Sun J, Zhang H, Song Z, Jin L, Yang J, Gu J, et al. The negative impact of increasing age and underlying cirrhosis on the sensitivity of adenosine deaminase in the diagnosis of tuberculous peritonitis: a cross-sectional study in eastern China. Int J Infect Dis. 2021;110:204-212.", doi: "10.1016/j.ijid.2021.07.061", tag: "Cross-sectional study" },
        { n: 121, text: "Waness A, Al Shohaib S. Tuberculous peritonitis associated with peritoneal dialysis. Saudi J Kidney Dis Transpl. 2012;23(1):44-7.", url: "https://pubmed.ncbi.nlm.nih.gov/22237217/", tag: "Retrospective cohort (Jeddah, Saudi Arabia)" },
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
