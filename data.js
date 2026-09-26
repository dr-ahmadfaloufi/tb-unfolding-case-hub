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
  "case3-stage6-histopath": false,
  "case4-stage1-ct-lymphadenopathy": false,
  "case4-stage2-histopath-necrotizing-granuloma": false,
  "case4-stage3-histopath-non-necrotizing-granuloma": false,
  "case5-stage4-cxr-normal": false,
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
      "A subacute cough-and-weight-loss presentation worked up with a rapid molecular test and culture — what that first result does and doesn't rule out, and the evidence behind the regimen once the full picture is in.",
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
                <li>All of these go out on day 1, not in sequence. ${cite(34)}</li>
              </ul>
            </li>
            <li><strong>Subacute bacterial pneumonia / lung abscess</strong>
              <ul><li>Sputum Gram stain and routine bacterial culture, plus blood cultures if febrile.</li></ul>
            </li>
            <li><strong>Non-tuberculous mycobacteria (NTM)</strong>
              <ul><li>Covered by the same mycobacterial culture with species identification. A <strong>smear-positive, NAAT-negative</strong> result points away from TB. ${cite(34)}</li></ul>
            </li>
            <li><strong>Malignancy (e.g. lung cancer, lymphoma)</strong>
              <ul><li>CT chest if the CXR shows a mass or nodes, with tissue sampling as indicated.</li></ul>
            </li>
            <li><strong>Chronic pulmonary aspergillosis (CPA)</strong>
              <ul><li><strong>Aspergillus IgG</strong> <em>if imaging shows a cavity</em>. The ERS/ESCMID definition requires findings present for <strong>&ge;3 months</strong>, so CPA sits last at 6 weeks of symptoms. ${cite(38)}</li></ul>
            </li>
          </ol>
          <p><strong>Also send, whatever the differential:</strong> an <strong>HIV test</strong>. CDC and WHO recommend routine HIV testing for everyone with presumptive TB. ${cite(33)}</p>`,
        pearl: `<em>Bedside pitfall:</em> a positive AFB smear is not the same as TB. If the smear is positive but the NAAT is negative, TB becomes unlikely. Think NTM before you start four drugs and notify public health. ${cite(34)}`,
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
            <li><strong>Airborne isolation now.</strong> A negative first smear does not rule out infectious TB, and <strong>cavitation on CXR independently predicts greater infectiousness</strong>. ${cite(28, 37)}</li>
            <li><strong>Two more sputum specimens</strong> (three in total) for smear and mycobacterial culture. Culture is the gold standard and provides full phenotypic DST. ${cite(34)}</li>
            <li><strong>Start treatment now</strong>, without waiting weeks for culture: cavitary disease plus a positive NAAT is enough. ${cite(33)}</li>
            <li><strong>Report</strong> to the public health authority, <strong>start the contact investigation</strong>, and <strong>test for HIV</strong> if not already done. ${cite(33)}</li>
          </ul>
          <h4>Guideline table: first-line regimen options for drug-susceptible pulmonary TB</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>ATS/CDC/IDSA (2016) ${cite(33)}</td>
                  <td>2 months isoniazid-rifampin-pyrazinamide-ethambutol, then 4 months isoniazid-rifampin (<strong>2HRZE/4HR</strong>)</td>
                  <td>Standard regimen</td>
                </tr>
                <tr>
                  <td>Saudi NTP Manual (2021) ${cite(37)}</td>
                  <td><strong>2HRZE/4HR</strong> "remains the recommended regimen"; fixed-dose combinations; <strong>daily</strong> dosing (thrice-weekly not recommended); 2HRZE/6HE to be phased out (&sect;5.5, &sect;5.7)</td>
                  <td>Not graded in the manual</td>
                </tr>
                <tr>
                  <td>ATS/CDC/ERS/IDSA (2025) ${cite(31)}</td>
                  <td><strong>4-month 2HPZM/2HPM</strong> (isoniazid 300 mg + rifapentine 1,200 mg + moxifloxacin 400 mg daily &times;17 wk; pyrazinamide weight-based &times;8 wk) for age &ge;12</td>
                  <td>Conditional, moderate certainty</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><strong>What this case uses:</strong> <strong>2HRZE/4HR (RIPE)</strong>, the regimen most widely used in Saudi Arabia and the <strong>Saudi national recommendation</strong> (NTP Manual 2021, &sect;5.5). ${cite(37)}</p>
          <ul>
            <li><em>Nuance:</em> the manual (2021) says "4-month fluoroquinolone-containing regimens should not be used". ${cite(37)} That wording predates the 4-month rifapentine&ndash;moxifloxacin regimen (HPZM) now endorsed by ATS 2025. ${cite(31)} Rifapentine is also not available in Saudi Arabia, so HPZM isn't a practical option in KSA either.</li>
            <li><strong>Pyridoxine 25&ndash;50 mg/day</strong> goes with isoniazid in anyone at risk of neuropathy (e.g. diabetes, HIV, alcohol use, malnutrition, chronic kidney disease, pregnancy). ${cite(33)}</li>
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
            <li><strong>How accurate it is:</strong> in a Cochrane review, <strong>Xpert Ultra detected rifampin resistance with 94.9% sensitivity and 99.1% specificity</strong> (Xpert MTB/RIF: 95.3% / 98.8%; high-certainty evidence). ${cite(35)}</li>
            <li><strong>What that means here:</strong> the same review estimates that when 10% of tested patients have rifampin resistance, Ultra <strong>misses about 5 per 1,000 tested</strong>. In a new patient in a low-resistance setting, where WHO estimates <strong>3.2% of new TB cases globally</strong> have MDR/RR-TB, a "not detected" result is <strong>highly reliable</strong>. ${cite(35, 36)}</li>
            <li><strong>Rarely it misses resistance</strong>, and culture-based DST (or sequencing) confirms the final profile.</li>
            <li><strong>The real open question is isoniazid.</strong> Xpert MTB/RIF says nothing about it. You need <strong>culture-based DST</strong> or a <strong>rapid molecular test for isoniazid (line probe assay)</strong>. The Saudi manual indicates this especially after prior isoniazid treatment or where isoniazid resistance is common. ${cite(37)}</li>
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
          <p>${cite(39)}</p>`,
        pearl:
          "Know which gene you're dealing with. With <em>katG</em>, isoniazid is gone even at high dose. With <em>inhA</em>, high-dose isoniazid may still work, but ethionamide probably won't.",
      },
      {
        title: "Regimen and evidence",
        question:
          "What regimen and duration does current evidence support for rifampin-susceptible, isoniazid-resistant TB?",
        reveal: `
          <p>Stop isoniazid. Give <strong>rifampin + ethambutol + pyrazinamide + levofloxacin for 6 months</strong>. ${cite(2, 37)}</p>
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Comparison</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td>Fregonese et al., IPD meta-analysis, Lancet Respir Med 2018 ${cite(1)}, comparison 1</td>
                  <td>&ge;6 months REZ <strong>+ a fluoroquinolone</strong> vs &ge;6 months REZ alone (33 cohort datasets)</td>
                  <td>Treatment success improved with a fluoroquinolone (aOR 2.8, 95% CI 1.1&ndash;7.3)</td>
                </tr>
                <tr>
                  <td>Same meta-analysis ${cite(1)}, comparison 2</td>
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
                  <td>WHO Hr-TB (2018) ${cite(2)}</td>
                  <td>6 months rifampicin + ethambutol + pyrazinamide + <strong>levofloxacin</strong>, no isoniazid required, <strong>no injectable</strong></td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr>
                  <td>Saudi NTP Manual (2021) ${cite(37)}</td>
                  <td>Rifampicin + ethambutol + pyrazinamide + <strong>levofloxacin for 6 months</strong>; do <strong>not</strong> add streptomycin or other injectables (&sect;10.5.1)</td>
                  <td>Not graded in the manual</td>
                </tr>
                <tr>
                  <td>ATS/CDC/ERS/IDSA DR-TB (2019) ${cite(32)}</td>
                  <td><strong>Add a later-generation fluoroquinolone</strong> to 6 months daily rifampin + ethambutol + pyrazinamide</td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr>
                  <td>Same, second recommendation ${cite(32)}</td>
                  <td><strong>Pyrazinamide may be shortened to 2 months</strong> in selected patients (noncavitary, lower-burden disease, or pyrazinamide toxicity)</td>
                  <td>Conditional, very low certainty</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><strong>Practical note:</strong> rifampin lowers <strong>moxifloxacin</strong> exposure by roughly 30%, so some experts prefer <strong>levofloxacin</strong> alongside rifampin. ${cite(32)} This patient has cavitary disease, so the pyrazinamide-shortening option does not apply.</p>`,
        pearl:
          "Both the WHO and ATS isoniazid-resistant regimens rest on conditional, very-low-certainty evidence from observational patient data. There are no randomized trials behind them. Know that when you defend the regimen on rounds.",
      },
      {
        title: "The timing question",
        question:
          "What if isoniazid resistance is only confirmed after standard first-line therapy has already started — or what if it is strongly suspected before confirmation?",
        reveal: `
          <ul>
            <li><strong>Confirmed after 2HRZE/4HR has started:</strong> repeat rapid rifampin testing. <strong>Once rifampin resistance is excluded, give a full 6-month course of (H)REZ-Lfx.</strong> The 6 months are driven by levofloxacin, so the companion drugs often run longer than 6 months in total. If rifampin resistance is found, switch to an MDR-TB regimen. ${cite(2)}</li>
            <li><strong>Very late confirmation</strong> (e.g. 5 months into 2HRZE/4HR): whether to start 6 months of (H)REZ-Lfx at that point depends on the patient's clinical and microbiological status. ${cite(2)}</li>
            <li><strong>Strongly presumed Hr-TB</strong> (e.g. a close contact of a confirmed Hr-TB source): the Hr-TB regimen may be started while DST is pending. If DST later shows isoniazid susceptibility, <strong>stop levofloxacin and complete 2HREZ/4HR</strong>. ${cite(2)}</li>
            <li><strong>Monitoring on this regimen:</strong>
              <ul>
                <li><strong>Liver:</strong> monthly AST where possible (prolonged pyrazinamide is hepatotoxic). If resources are limited, at least monthly for high-risk patients (viral hepatitis, heavy alcohol use). ${cite(2)}</li>
                <li><strong>QT:</strong> avoid levofloxacin with known or suspected QT prolongation. Baseline-corrected QTc; watch hypokalaemia and other QT-prolonging drugs. ${cite(2)}</li>
                <li><strong>Fluoroquinolone class warnings:</strong> tendinitis/tendon rupture, severe hypoglycaemia, mental-health effects, aortic rupture/dissection. ${cite(32)}</li>
                <li><strong>Absorption:</strong> don't co-administer levofloxacin with antacids or other divalent-cation products. Milk restriction is not needed. ${cite(2)}</li>
              </ul>
            </li>
            <li><strong>When to consider extending beyond 6 months:</strong> WHO says prolongation <strong>may be considered</strong> for <strong>extensive cavitary disease</strong> or <strong>slow smear/culture conversion</strong>. In slow converters, <strong>first rule out acquired rifampicin (and fluoroquinolone/pyrazinamide) resistance</strong>. ${cite(2)}
              <ul>
                <li>For comparison, in <em>drug-susceptible</em> TB, ATS/CDC/IDSA extend the continuation phase to 7 months (9 months total) when there is <strong>both</strong> cavitation <strong>and</strong> a positive 2-month culture. ${cite(33)}</li>
              </ul>
            </li>
            <li>If levofloxacin can't be used (toxicity/resistance), <strong>6(H)REZ</strong> is the alternative. <strong>Do not substitute an injectable.</strong> ${cite(2)}</li>
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
      "A retreatment patient with adherence gaps returns with new respiratory symptoms — working through rapid resistance testing, its molecular basis and blind spots, and the trial evidence behind current regimen options.",
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
                <li>plus <strong>culture with full first- and second-line phenotypic DST, sent at or before the start of treatment</strong>. WHO says culture and DST should be obtained from <em>all</em> previously treated patients, for at least isoniazid and rifampicin. ${cite(29)}</li>
                <li>Prior treatment is itself an indication for rapid molecular DST. ${cite(34)}</li>
              </ul>
            </li>
            <li><strong>Post-TB bronchiectasis with secondary bacterial infection</strong>
              <ul><li>Sputum Gram stain and routine bacterial culture.</li></ul>
            </li>
            <li><strong>Aspergilloma / chronic pulmonary aspergillosis in a residual cavity</strong>
              <ul><li><strong>Aspergillus IgG</strong> if imaging shows a cavity. Aspergillus antibody is elevated in &gt;90% of CPA. ${cite(38)}</li></ul>
            </li>
            <li><strong>Non-tuberculous mycobacteria</strong>
              <ul><li>Mycobacterial culture with species identification (same specimens).</li></ul>
            </li>
            <li><strong>Malignancy</strong>
              <ul><li>CT chest, then tissue if a mass is seen.</li></ul>
            </li>
          </ol>
          <p><strong>Also:</strong> HIV test ${cite(33)}; document the prior regimen, the length of interruptions, and any exposure to a resistant source case.</p>`,
        pearl: `<em>Bedside pitfall, specific to retreatment:</em> in someone treated for TB before, a positive Xpert can reflect leftover DNA from dead bacilli. In the Cochrane review, Xpert Ultra specificity fell to <strong>88.2%</strong> in people with a prior TB history, versus 95.6% overall. Always confirm with culture before calling it a new episode. ${cite(35)}`,
      },
      {
        title: "Rifampicin resistance detected: what do you do now?",
        context: "Result: MTB detected, rifampin resistance detected.",
        question: "Rifampicin resistance is detected. What do you do today?",
        reveal: `
          <ul>
            <li><strong>Treat as MDR/RR-TB.</strong> Do not start the standard first-line regimen. WHO manages RR-TB and MDR-TB together as MDR/RR-TB. ${cite(29)}</li>
            <li><strong>Why "treat as MDR":</strong> the two usually travel together. Worldwide in 2024, <strong>16% of previously treated</strong> patients had MDR/RR-TB, versus <strong>3.2% of new</strong> patients. ${cite(36)}</li>
            <li><strong>Isolate, notify, start contact investigation.</strong> Contact management must account for the resistance pattern.</li>
            <li><strong>Send second-line DST now, especially fluoroquinolone susceptibility.</strong> It decides between BPaLM and BPaL (next stage). Globally, <strong>18%</strong> of MDR/RR-TB is pre-XDR (fluoroquinolone-resistant). ${cite(36)}</li>
            <li><strong>Baseline work-up before a bedaquiline/linezolid regimen:</strong>
              <ul>
                <li>HIV test;</li>
                <li><strong>ECG</strong> (QT) ${cite(32)};</li>
                <li>CBC (linezolid myelosuppression);</li>
                <li>LFTs;</li>
                <li>visual acuity/colour vision (linezolid optic neuropathy);</li>
                <li>neuropathy screen: not on the Saudi manual's list, but good clinical practice given linezolid neuropathy rates in Nix-TB (81%) and ZeNix (13&ndash;38%) ${cite(5, 6)};</li>
                <li><strong>pregnancy test</strong> (BPaLM is not recommended in pregnancy or breastfeeding; see next stage) ${cite(29)}.</li>
              </ul>
              The Saudi NTP Manual baseline (&sect;10.8) also includes smear, culture and DST (including second-line), CXR, renal and hepatic profile, calcium/magnesium and a baseline ECG if on bedaquiline or delamanid, thyroid function, and CBC if anaemia is suspected. ${cite(37)}
            </li>
            <li><strong>Monitoring (Saudi NTP Manual, Table 10.7):</strong> CBC weekly for the first month, then monthly on linezolid; visual acuity if vision changes on linezolid; ECG at 2, 4, 8, 12 and 24 weeks on bedaquiline/delamanid, stopping them if QTc &gt;500 ms; LFTs monthly on bedaquiline. ${cite(37)}</li>
          </ul>`,
        pearl: `A prior TB course with adherence gaps is the single strongest predictor of resistance. In Saudi data it carried about 7-fold odds of MDR. ${cite(46)} Rapid rifampicin testing on day one exists for exactly this patient.`,
      },
      {
        title: "How far can you trust this result, and what if DST disagrees?",
        question:
          "Xpert says rifampicin-resistant. How reliable is that, and what do you do if culture-based DST disagrees, in either direction?",
        reveal: `
          <ul>
            <li><strong>Mechanism in one line:</strong> Xpert detects mutations in a short rifampicin-resistance region of <em>rpoB</em>. It reads DNA, not growth.</li>
            <li><strong>Reliability:</strong> specificity for rifampicin resistance is <strong>99.1% (Ultra) / 98.8% (MTB/RIF)</strong>. A "detected" result is rarely wrong, but not never. ${cite(35)}</li>
          </ul>
          <h4>When molecular and phenotypic results disagree</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Direction</th><th>Main causes</th><th>What to do</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>Xpert: RIF-resistant / DST: susceptible</strong></td>
                  <td><strong>"Disputed" (borderline) <em>rpoB</em> mutations</strong>: real, clinically relevant low-level resistance that growth-based DST at the standard critical concentration misses. In one series only <strong>26% of isolates with such mutations tested resistant by MGIT</strong>. WHO has responded by lowering the critical concentration.</td>
                  <td><strong>Do not de-escalate on the phenotype alone.</strong> Sequence the <em>rpoB</em> gene; treat as RR-TB if a resistance mutation is confirmed. ${cite(45)}</td>
                </tr>
                <tr>
                  <td><strong>Xpert: RIF not detected / DST or clinical course: resistant</strong></td>
                  <td><strong>Mutations outside the region Xpert reads</strong>, e.g. <em>rpoB</em> <strong>I491F</strong>. It was found in <strong>30% of MDR strains in an eSwatini study</strong>, and in <strong>15%</strong> of South African isolates labelled "isoniazid-monoresistant", which were actually MDR. <strong>Routine phenotypic DST can also call I491F susceptible.</strong></td>
                  <td>If the patient isn't responding, or epidemiology suggests it, <strong>request sequencing</strong>. Don't let two "susceptible" results end the discussion. ${cite(42, 43)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Supporting data: in Eswatini, Xpert MTB/RIF detected only <strong>62.5%</strong> of confirmed rifampicin resistance against a composite reference, largely because of I491F. ${cite(44)}</p>
          <h4>Resistance epidemiology: global vs Saudi</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Metric</th><th>Global</th><th>Saudi Arabia</th><th>Source</th></tr></thead>
              <tbody>
                <tr><td>MDR/RR-TB, new patients</td><td>3.2% (2024)</td><td>&mdash;</td><td>WHO Global TB Report 2025 ${cite(36)}</td></tr>
                <tr><td>MDR/RR-TB, previously treated</td><td>16% (2024)</td><td>&mdash;</td><td>WHO Global TB Report 2025 ${cite(36)}</td></tr>
                <tr><td>Rifampicin resistance, all tested</td><td>&mdash;</td><td>6% (95% CI 3&ndash;9), pooled</td><td>Alanazi 2026 meta-analysis ${cite(46)}</td></tr>
                <tr><td>Isoniazid resistance, all tested</td><td>~8% INH monoresistance (range 5&ndash;11%)</td><td>15% (7&ndash;28), pooled</td><td>ATS 2019 ${cite(32)}; Alanazi 2026 ${cite(46)}</td></tr>
                <tr><td>MDR-TB</td><td>&mdash;</td><td><strong>8%</strong> pooled (studies since 2000); <strong>national surveillance 4.4% &rarr; 2.4% (2015&rarr;2019)</strong></td><td>Alanazi 2026 ${cite(46)}; Alawi 2024 ${cite(47)}</td></tr>
                <tr><td>Prior treatment as a risk factor</td><td>&mdash;</td><td><strong>OR 7.34</strong> for MDR</td><td>Alanazi 2026 ${cite(46)}</td></tr>
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
              <strong>Check her pregnancy status before prescribing.</strong> ${cite(29)}
            </li>
            <li><strong>Doses</strong> (ATS 2025 Table 1; consistent with WHO):
              <ul>
                <li><strong>bedaquiline 400 mg daily &times;2 wk, then 200 mg three times/wk &times;24 wk</strong>;</li>
                <li><strong>pretomanid 200 mg daily &times;26 wk</strong>;</li>
                <li><strong>linezolid 600 mg daily &times;26 wk</strong> (may drop to 300 mg daily for toxicity);</li>
                <li><strong>moxifloxacin 400 mg daily &times;26 wk</strong>. ${cite(31, 29)}</li>
                <li>WHO also accepts <strong>bedaquiline 200 mg daily &times;8 wk, then 100 mg daily</strong> as an alternative schedule. ${cite(29)}</li>
              </ul>
            </li>
          </ul>
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Trial</th><th>Population / design</th><th>Regimen &amp; doses</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>Nix-TB</strong>, NEJM 2020 ${cite(5)}</td>
                  <td>XDR or treatment-intolerant/non-responsive MDR; single arm, n=109</td>
                  <td><strong>BPaL</strong>: bedaquiline 400 mg &times;2 wk then 200 mg 3&times;/wk &times;24 wk; pretomanid 200 mg &times;26 wk; <strong>linezolid 1,200 mg daily</strong> &times;up to 26 wk</td>
                  <td><strong>Favorable 90%</strong> (ITT). Peripheral neuropathy 81%, myelosuppression 48%</td>
                </tr>
                <tr>
                  <td><strong>ZeNix</strong>, NEJM 2022 ${cite(6)}</td>
                  <td>XDR/pre-XDR or intolerant/non-responsive RR-TB; randomized, n=181</td>
                  <td>Bedaquiline <strong>200 mg daily &times;8 wk then 100 mg daily &times;18 wk</strong>; pretomanid 200 mg &times;26 wk; <strong>linezolid 1,200 &times;26 wk / 1,200 &times;9 wk / 600 &times;26 wk / 600 &times;9 wk</strong></td>
                  <td><strong>Favorable 93% / 89% / 91% / 84%</strong>. Neuropathy 38 / 24 / 24 / 13%. <strong>Best balance: 600 mg &times;26 wk</strong></td>
                </tr>
                <tr>
                  <td><strong>TB-PRACTECAL</strong> (stage 2), NEJM 2022 ${cite(7)}</td>
                  <td>RR-TB, age &ge;15; randomized vs 9&ndash;20-month standard care</td>
                  <td><strong>BPaLM 24 wk</strong>: bedaquiline 400 mg &times;2 wk then 200 mg 3&times;/wk &times;22 wk; pretomanid 200 mg; <strong>linezolid 600 mg &times;16 wk then 300 mg &times;8 wk</strong>; moxifloxacin 400 mg. Control: individualized, per national guidelines</td>
                  <td><strong>Unfavorable outcome (lower is better): 11% vs 48%</strong> (mITT; RD &minus;37 points). <strong>Non-inferior</strong> (margin 12 points). Grade &ge;3/serious AEs <strong>19% vs 59%</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style="color:var(--text-muted); font-size:0.9rem;">TB-PRACTECAL doses are taken from WHO's description of the trial in Module 4 (2025). ${cite(29)} Pretomanid and moxifloxacin doses match the WHO/ATS BPaLM regimen.</p>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>WHO Module 4 (2025) ${cite(29)}</td>
                  <td><strong>BPaLM</strong> (6 months) rather than 9-month or longer (18-month) regimens in MDR/RR-TB</td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr>
                  <td>Saudi NTP Manual (2021) ${cite(37)}</td>
                  <td><strong>Does not include BPaLM</strong> (it predates it). Longer regimens: all three Group A drugs (levofloxacin/moxifloxacin, bedaquiline, linezolid) + &ge;1 Group B; the "shorter MDR-TB regimen" described is the <strong>older injectable-containing</strong> one (&sect;10.5.2, Algorithm 3)</td>
                  <td>Not graded in the manual</td>
                </tr>
                <tr>
                  <td>ATS/CDC/ERS/IDSA (2025) ${cite(31)}</td>
                  <td><strong>BPaLM</strong> for RR-TB, FQ-susceptible, age &ge;14</td>
                  <td>Strong, very low certainty</td>
                </tr>
                <tr>
                  <td>ATS/CDC/ERS/IDSA (2025) ${cite(31)}</td>
                  <td><strong>BPaL</strong> (no moxifloxacin) if FQ-resistant or FQ-intolerant</td>
                  <td>Strong, very low certainty</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>If she weren't eligible for BPaLM, other shortened regimens exist (next stage).</p>
          <p><em>Local note:</em> the Saudi NTP Manual (2021) predates BPaLM and the newer short regimens. Check your programme's current MDR-TB protocol before prescribing. ${cite(37)}</p>`,
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
                  <td><strong>BEAT Tuberculosis</strong>, NEJM 2026 ${cite(40)}</td>
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
                  <td><strong>endTB</strong>, NEJM 2025 ${cite(9)}</td>
                  <td>Phase 3 RCT, FQ-susceptible RR-TB, age &ge;15, n=754 (699 mITT)</td>
                  <td>Five 9-month all-oral regimens vs standard care: <strong>BLMZ, BLLfxCZ, BDLLfxZ, DCMZ, DCLLfxZ</strong></td>
                  <td>Control 80.7% favorable (mITT). Risk differences: <strong>BCLLfxZ +9.8</strong> (0.9&ndash;18.7); <strong>BLMZ +8.3</strong> (&minus;0.8&ndash;17.4); <strong>BDLLfxZ +4.6</strong> (&minus;4.9&ndash;14.1); DCMZ +2.5 (&minus;7.5&ndash;12.5); DCLLfxZ <strong>not non-inferior</strong>. <strong>DCMZ failed non-inferiority in the per-protocol analysis</strong>, so the authors conclude <strong>three</strong> regimens are supported. Grade &ge;3 hepatotoxicity 11.7% overall vs 7.1% control</td>
                </tr>
                <tr>
                  <td><strong>STREAM stage 2</strong>, Lancet 2022 ${cite(41)}</td>
                  <td>RCT, RR-TB without FQ/aminoglycoside resistance</td>
                  <td><strong>9-month all-oral bedaquiline regimen</strong> vs 9-month injectable-containing control</td>
                  <td><strong>Favorable 83% vs 71%</strong> (adjusted difference 11.0%, 2.9&ndash;19.0; non-inferior). Hearing loss 2% vs 9%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li>In endTB's linezolid arms, the linezolid dose was reduced at week 16 or earlier. ${cite(9)}</li>
            <li><strong>endTB vs endTB-Q:</strong> endTB-Q tested BDLC for <strong>FQ-resistant</strong> (pre-XDR) TB. <strong>Overall non-inferiority was not shown</strong>: favorable 87% vs 89% (mITT). ${cite(10)}</li>
            <li><strong>Why WHO recommends against DCMZ:</strong> endTB called DCMZ non-inferior in mITT, but it failed in the per-protocol analysis and had more culture-positive unfavorable outcomes (7.5%). ${cite(9, 29)}</li>
            <li><strong>Fallback: longer individualized regimen.</strong> Total <strong>18&ndash;20 months</strong> for most patients, adjusted to response. ${cite(29)}</li>
          </ul>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>WHO Module 4 (2025) ${cite(29)}</td>
                  <td><strong>BDLLfxC</strong> 6 months in MDR/RR-TB <strong>with or without FQ resistance</strong>; usable in pregnancy/breastfeeding and in children</td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr>
                  <td>WHO Module 4 (2025) ${cite(29)}</td>
                  <td><strong>9-month BLMZ, BLLfxCZ, BDLLfxZ</strong> over longer regimens when FQ resistance is excluded; <strong>preference order BLMZ &gt; BLLfxCZ &gt; BDLLfxZ</strong></td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr>
                  <td>WHO Module 4 (2025) ${cite(29)}</td>
                  <td><strong>Against</strong> 9-month DCLLfxZ or DCMZ</td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr>
                  <td>WHO Module 4 (2025) ${cite(29)}</td>
                  <td><strong>9-month all-oral regimen</strong>: bedaquiline &times;6 months + levofloxacin/moxifloxacin, ethionamide, ethambutol, high-dose isoniazid, pyrazinamide, clofazimine &times;4 (&ndash;6) months, then levofloxacin/moxifloxacin, clofazimine, ethambutol, pyrazinamide &times;5 months; <strong>ethionamide may be replaced by 2 months of linezolid 600 mg</strong></td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr>
                  <td>WHO Module 4 (2025) ${cite(29)}</td>
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
      "A newly diagnosed HIV patient with fever and progressive dyspnea whose initial workup keeps coming back negative — interpreting urine LAM, sputum vs BAL, and when to treat despite negative microbiology.",
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
            <li>Test for that differential, not just the TB-directed panel: send routine bacterial blood cultures and a serum or urine fungal antigen test (e.g., Histoplasma antigen) up front — disseminated fungal disease can mimic this presentation closely in advanced HIV, especially in endemic regions.</li>
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
    title: "29-year-old expatriate worker with fever, night sweats, and mediastinal lymphadenopathy",
    hubDescription:
      "Fever, night sweats, and mediastinal lymphadenopathy with no lung findings — working through a broad differential and choosing how to biopsy.",
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
            <li>Send a fungal stain and culture from the same EBUS-TBNA specimen rather than leaving fungal lymphadenitis as an untested differential item — it adds no extra procedure, just an additional order on tissue you already have.</li>
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
                  <td>Pooled sensitivity ~66% in systematic review data ${cite(20)}, though a single-cohort study comparing directly against newer tissue-core techniques found standard EBUS-TBNA sensitivity as low as 14&ndash;15% in new/de novo cases ${cite(22)} — a 41% figure sometimes quoted alongside this comes from the same cohort's <em>recurrent</em>-lymphoma subgroup, not new cases, and should not be conflated with the de novo number</td>
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
    title: "32-year-old ICU nurse with an unmasked TB exposure",
    hubDescription:
      "A high-risk occupational TB exposure — the window period, IGRA vs TST, and short-course preventive-treatment regimens.",
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
            <li>If the symptom screen is positive at any point, don't assume it means TB disease by default — get a CXR (and sputum studies if abnormal) to actually rule active disease in or out, since an unrelated viral or bacterial respiratory illness is at least as likely as TB this early after exposure.</li>
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
                  <td>Confirmed TB in 0.19% (3HP) vs 0.43% (9H); noninferior; significantly higher treatment completion and fewer hepatotoxic events with 3HP</td>
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
          </div>
          <p style="color:var(--text-muted); font-size:0.9rem;"><em>Guideline update (WHO Module 1, TB preventive treatment, 2nd edition, Sept 2024)${cite(30)}:</em> the 3HP/4R/3HR/6H/9H content above is unchanged in substance — 6H/9H, 3HP, and 3HR remain strongly recommended (moderate-to-high certainty), while 1HP and 4R remain conditional alternatives (low-to-moderate certainty), the same classification as the 2020 edition. The one genuinely new option is a strong recommendation for 6 months of daily levofloxacin (6Lfx) specifically for contacts of multidrug- or rifampicin-resistant TB — not applicable to this patient, since the index case's isolate was drug-susceptible, but worth knowing as TPT options for resistant-TB contacts have expanded.</p>`,
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
        { n: 5, text: "Conradie F, Diacon AH, Ngubane N, et al. Treatment of highly drug-resistant pulmonary tuberculosis. N Engl J Med. 2020;382(10):893-902.", doi: "10.1056/NEJMoa1901814", tag: "Single-arm, open-label trial — Nix-TB" },
        { n: 6, text: "Conradie F, et al. Bedaquiline-pretomanid-linezolid regimens for drug-resistant tuberculosis. N Engl J Med. 2022;387(9):810-823.", doi: "10.1056/NEJMoa2119430", tag: "Randomized dose-finding trial — ZeNix" },
        { n: 7, text: "Nyang'wa BT, Berry C, Kazounis E, et al. A 24-week, all-oral regimen for rifampin-resistant tuberculosis. N Engl J Med. 2022;387(25):2331-2343.", doi: "10.1056/NEJMoa2117166", tag: "Randomized controlled trial — TB-PRACTECAL" },
        { n: 8, text: "World Health Organization. WHO issues rapid communication on key updates to the treatment of drug-resistant tuberculosis. Geneva: WHO; 2024 Aug 23.", tag: "Guideline update" },
        { n: 9, text: "Guglielmetti L, Khan U, Velásquez GE, et al. Oral Regimens for Rifampin-Resistant, Fluoroquinolone-Susceptible Tuberculosis. N Engl J Med. 2025;392(5):468-482.", doi: "10.1056/NEJMoa2400327", tag: "Randomized controlled non-inferiority trial — endTB" },
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
        { n: 21, text: "Kennedy MP, McCarthy J. Is Endobronchial Ultrasound-guided Transbronchial Needle Aspiration Useful in the Workup of Patients with Lymphoma? Ann Am Thorac Soc. 2019;16(11):1373-1374.", doi: "10.1513/AnnalsATS.201907-567ED", tag: "Editorial, companion piece to Labarca et al. 2019" },
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
        { n: 27, text: "Sterling TR, Njie G, Zenner D, et al. Guidelines for the Treatment of Latent Tuberculosis Infection: Recommendations from the National Tuberculosis Controllers Association and CDC, 2020. MMWR Recomm Rep. 2020;69(RR-1):1-11.", doi: "10.15585/mmwr.rr6901a1", tag: "Clinical practice guideline" },
        { n: 28, text: "National Tuberculosis Controllers Association; Centers for Disease Control and Prevention. Guidelines for the investigation of contacts of persons with infectious tuberculosis. MMWR Recomm Rep. 2005;54(RR-15):1-47.", tag: "Clinical practice guideline — also the source of the 8–10 week window period recommendation used throughout this case" },
      ],
    },
    {
      title: "Guideline updates (2024–2025)",
      items: [
        { n: 29, text: "World Health Organization. WHO consolidated guidelines on tuberculosis. Module 4: treatment and care. Geneva: WHO; 2025.", tag: "Clinical practice guideline — 2025 edition; introduces the BDLLfxC regimen and a preference order among modified 9-month regimens" },
        { n: 30, text: "World Health Organization. WHO consolidated guidelines on tuberculosis. Module 1: prevention — tuberculosis preventive treatment, second edition. Geneva: WHO; 2024.", tag: "Clinical practice guideline — second edition" },
      ],
    },
    {
      title: "Round 2 additions (renumbered by tools/renumber-refs.js)",
      items: [
        { n: 31, text: "Saukkonen JJ, Duarte R, Munsiff SS, Winston CA, Mammen MJ, Abubakar I, et al. Updates on the Treatment of Drug-Susceptible and Drug-Resistant Tuberculosis: An Official ATS/CDC/ERS/IDSA Clinical Practice Guideline. Am J Respir Crit Care Med. 2025;211(1):15-33.", doi: "10.1164/rccm.202410-2096ST", tag: "Clinical practice guideline — ATS/CDC/ERS/IDSA 2025 update" },
        { n: 32, text: "Nahid P, Mase SR, Migliori GB, Sotgiu G, Bothamley GH, Brozek JL, et al. Treatment of Drug-Resistant Tuberculosis. An Official ATS/CDC/ERS/IDSA Clinical Practice Guideline. Am J Respir Crit Care Med. 2019;200(10):e93-e142.", doi: "10.1164/rccm.201909-1874ST", tag: "Clinical practice guideline — ATS/CDC/ERS/IDSA drug-resistant TB" },
        { n: 33, text: "Nahid P, Dorman SE, Alipanah N, Barry PM, Brozek JL, Cattamanchi A, et al. Official American Thoracic Society/Centers for Disease Control and Prevention/Infectious Diseases Society of America Clinical Practice Guidelines: Treatment of Drug-Susceptible Tuberculosis. Clin Infect Dis. 2016;63(7):e147-e195.", doi: "10.1093/cid/ciw376", tag: "Clinical practice guideline — ATS/CDC/IDSA drug-susceptible TB" },
        { n: 34, text: "Lewinsohn DM, Leonard MK, LoBue PA, Cohn DL, Daley CL, Desmond E, et al. Official American Thoracic Society/Infectious Diseases Society of America/Centers for Disease Control and Prevention Clinical Practice Guidelines: Diagnosis of Tuberculosis in Adults and Children. Clin Infect Dis. 2017;64(2):e1-e33.", doi: "10.1093/cid/ciw694", tag: "Clinical practice guideline — ATS/IDSA/CDC diagnosis of TB (full guideline)" },
        { n: 35, text: "Zifodya JS, Kreniske JS, Schiller I, Kohli M, Dendukuri N, Schumacher SG, et al. Xpert Ultra versus Xpert MTB/RIF for pulmonary tuberculosis and rifampicin resistance in adults with presumptive pulmonary tuberculosis. Cochrane Database Syst Rev. 2021;2(2):CD009593.", doi: "10.1002/14651858.CD009593.pub5", tag: "Diagnostic test accuracy systematic review (Cochrane)" },
        { n: 36, text: "World Health Organization. Global tuberculosis report 2025. Geneva: World Health Organization; 2025.", url: "https://www.who.int/teams/global-programme-on-tuberculosis-and-lung-health/tb-reports/global-tuberculosis-report-2025", tag: "Global surveillance report" },
        { n: 37, text: "Ministry of Health, Saudi Arabia. National Tuberculosis Program Manual 2021. Ministry of Health; 2021. Available from: moh.gov.sa.", tag: "National programme manual (Saudi Arabia)" },
        { n: 38, text: "Denning DW, Cadranel J, Beigelman-Aubry C, Ader F, Chakrabarti A, Blot S, et al. Chronic pulmonary aspergillosis: rationale and clinical guidelines for diagnosis and management. Eur Respir J. 2016;47(1):45-68.", doi: "10.1183/13993003.00583-2015", tag: "Clinical practice guideline — ESCMID/ERS" },
        { n: 39, text: "Warren RM, Streicher EM, Gey van Pittius NC, Marais BJ, van der Spuy GD, Victor TC, et al. The clinical relevance of Mycobacterial pharmacogenetics. Tuberculosis (Edinb). 2009;89(3):199-202.", doi: "10.1016/j.tube.2009.03.001", tag: "Narrative review" },
        { n: 40, text: "Conradie F, Badat T, Poswa A, Rajaram S, Kooverjee S, Maartens G, et al. A Pragmatic Trial of a 6-Month Strategy for Rifampicin-Resistant Tuberculosis. N Engl J Med. 2026;394(24):2429-2439.", doi: "10.1056/NEJMoa2503687", tag: "Pragmatic randomized controlled non-inferiority trial — BEAT Tuberculosis" },
        { n: 41, text: "Goodall RL, Meredith SK, Nunn AJ, Bayissa A, Bhatnagar AK, Bronson G, et al. Evaluation of two short standardised regimens for the treatment of rifampicin-resistant tuberculosis (STREAM stage 2): an open-label, multicentre, randomised, non-inferiority trial. Lancet. 2022;400(10366):1858-1868.", doi: "10.1016/S0140-6736(22)02078-5", tag: "Randomized controlled non-inferiority trial — STREAM stage 2" },
        { n: 42, text: "Makhado NA, Matabane E, Faccin M, Pinçon C, Jouet A, Boutachkourt F, et al. Outbreak of multidrug-resistant tuberculosis in South Africa undetected by WHO-endorsed commercial tests: an observational study. Lancet Infect Dis. 2018;18(12):1350-1359.", doi: "10.1016/S1473-3099(18)30496-1", tag: "Observational study (outbreak genomic investigation)" },
        { n: 43, text: "Sanchez-Padilla E, Merker M, Beckert P, Jochims F, Dlamini T, Kahn P, et al. Detection of drug-resistant tuberculosis by Xpert MTB/RIF in Swaziland. N Engl J Med. 2015;372(12):1181-2.", doi: "10.1056/NEJMc1413930", tag: "Correspondence reporting observational genotypic data" },
        { n: 44, text: "Ardizzoni E, Ariza E, Mulengwa D, Mpala Q, de La Tour R, Maphalala G, et al. Thin-Layer-Agar-Based Direct Phenotypic Drug Susceptibility Testing on Sputum in Eswatini Rapidly Detects Mycobacterium tuberculosis Growth and Rifampicin Resistance Otherwise Missed by WHO-Endorsed Diagnostic Tests. Antimicrob Agents Chemother. 2021;65(6):e02263-20.", doi: "10.1128/AAC.02263-20", tag: "Diagnostic accuracy study" },
        { n: 45, text: "Wang W, Liu R, Yao C, Huo F, Shang Y, Zhang X, et al. Reevaluating Rifampicin Breakpoint Concentrations for Mycobacterium tuberculosis Isolates with Disputed rpoB Mutations and Discordant Susceptibility Phenotypes. Microbiol Spectr. 2022;10(1):e0208721.", doi: "10.1128/spectrum.02087-21", tag: "Laboratory study" },
        { n: 46, text: "Alanazi R, Alghamdi H, Alansari R, Albassam S, Alghamdi H, Altowairqi H, et al. Epidemiology and risk factors of multidrug-resistant tuberculosis in Saudi Arabia: a systematic review and meta-analysis. Front Public Health. 2026;14:1824576.", doi: "10.3389/fpubh.2026.1824576", tag: "Systematic review and meta-analysis (Saudi Arabia)" },
        { n: 47, text: "Alawi MM, Alserehi HA, Ali AO, Albalawi AM, Alanizi MK, Nabet FM, et al. Epidemiology of tuberculosis in Saudi Arabia following the implementation of end tuberculosis strategy: Analysis of the surveillance data 2015-2019. Saudi Med J. 2024;45(1):60-68.", doi: "10.15537/smj.2024.45.1.20230424", tag: "National surveillance data analysis (Saudi Arabia)" },
        { n: 48, text: "World Health Organization. WHO guidelines on the management of advanced HIV disease. Geneva: World Health Organization; 2025. NCBI Bookshelf NBK620050.", url: "https://www.ncbi.nlm.nih.gov/books/NBK620050/", tag: "Clinical practice guideline (WHO)" },
        { n: 49, text: "World Health Organization. Consolidated guidelines on HIV prevention, testing, treatment, service delivery and monitoring: recommendations for a public health approach. Geneva: World Health Organization; 2021. NCBI Bookshelf NBK572729.", url: "https://www.ncbi.nlm.nih.gov/books/NBK572729/", tag: "Clinical practice guideline (WHO) — section 6.3, co-trimoxazole prophylaxis" },
        { n: 50, text: "Blanc FX, Sok T, Laureillard D, Borand L, Rekacewicz C, Nerrienet E, et al. Earlier versus later start of antiretroviral therapy in HIV-infected adults with tuberculosis. N Engl J Med. 2011;365(16):1471-81.", doi: "10.1056/NEJMoa1013911", tag: "Randomized controlled trial — CAMELIA" },
        { n: 51, text: "Havlir DV, Kendall MA, Ive P, Kumwenda J, Swindells S, Qasba SS, et al. Timing of antiretroviral therapy for HIV-1 infection and tuberculosis. N Engl J Med. 2011;365(16):1482-91.", doi: "10.1056/NEJMoa1013607", tag: "Randomized controlled trial — STRIDE" },
        { n: 52, text: "Abdool Karim SS, Naidoo K, Grobler A, Padayatchi N, Baxter C, Gray AL, et al. Integration of antiretroviral therapy with tuberculosis treatment. N Engl J Med. 2011;365(16):1492-501.", doi: "10.1056/NEJMoa1014181", tag: "Randomized controlled trial — SAPiT" },
        { n: 53, text: "Meintjes G, Stek C, Blumenthal L, Thienemann F, Schutz C, Buyze J, et al. Prednisone for the Prevention of Paradoxical Tuberculosis-Associated IRIS. N Engl J Med. 2018;379(20):1915-1925.", doi: "10.1056/NEJMoa1800762", tag: "Randomized placebo-controlled trial — PredART" },
        { n: 54, text: "Török ME, Yen NT, Chau TT, Mai NT, Phu NH, Mai PP, et al. Timing of initiation of antiretroviral therapy in human immunodeficiency virus (HIV)--associated tuberculous meningitis. Clin Infect Dis. 2011;52(11):1374-83.", doi: "10.1093/cid/cir230", tag: "Randomized controlled trial" },
        { n: 55, text: "Dooley KE, Kaplan R, Mwelase N, Grinsztejn B, Ticona E, Lacerda M, et al. Dolutegravir-based Antiretroviral Therapy for Patients Coinfected With Tuberculosis and Human Immunodeficiency Virus: A Multicenter, Noncomparative, Open-label, Randomized Trial. Clin Infect Dis. 2020;70(4):549-556.", doi: "10.1093/cid/ciz256", tag: "Randomized non-comparative trial — INSPIRING" },
        { n: 56, text: "Narayanasamy S, Dat VQ, Thanh NT, Ly VT, Chan JF, Yuen KY, et al. A global call for talaromycosis to be recognised as a neglected tropical disease. Lancet Glob Health. 2021;9(11):e1618-e1622.", doi: "10.1016/S2214-109X(21)00350-8", tag: "Viewpoint" },
        { n: 57, text: "Pruksaphon K, Intaramat A, Ratanabanangkoon K, Nosanchuk JD, Vanittanakom N, Youngchim S. Diagnostic laboratory immunology for talaromycosis (penicilliosis): review from the bench-top techniques to the point-of-care testing. Diagn Microbiol Infect Dis. 2020;96(3):114959.", doi: "10.1016/j.diagmicrobio.2019.114959", tag: "Narrative review" },
        { n: 58, text: "Le T, Kinh NV, Cuc NTK, Tung NLN, Lam NT, Thuy PTT, et al. A Trial of Itraconazole or Amphotericin B for HIV-Associated Talaromycosis. N Engl J Med. 2017;376(24):2329-2340.", doi: "10.1056/NEJMoa1613306", tag: "Randomized controlled trial — IVAP" },
        { n: 59, text: "Wiersinga WJ, Virk HS, Torres AG, Currie BJ, Peacock SJ, Dance DAB, et al. Melioidosis. Nat Rev Dis Primers. 2018;4:17107.", doi: "10.1038/nrdp.2017.107", tag: "Review (Primer)" },
        { n: 60, text: "Yoshida A, Doanh PN, Maruyama H. Paragonimus and paragonimiasis in Asia: An update. Acta Trop. 2019;199:105074.", doi: "10.1016/j.actatropica.2019.105074", tag: "Narrative review" },
        { n: 61, text: "Mukae H, Taniguchi H, Matsumoto N, Iiboshi H, Ashitani J, Matsukura S, et al. Clinicoradiologic features of pleuropulmonary Paragonimus westermani on Kyusyu Island, Japan. Chest. 2001;120(2):514-20.", doi: "10.1378/chest.120.2.514", tag: "Case series" },
        { n: 62, text: "Kathuria S, Capoor MR, Yadav S, Singh A, Ramesh V. Disseminated histoplasmosis in an apparently immunocompetent individual from north India: a case report and review. Med Mycol. 2013;51(7):774-8.", doi: "10.3109/13693786.2013.777166", tag: "Case report and literature review" },
        { n: 63, text: "Vilmann P, Clementsen PF, Colella S, Siemsen M, De Leyn P, Dumonceau JM, et al. Combined endobronchial and oesophageal endosonography for the diagnosis and staging of lung cancer. European Society of Gastrointestinal Endoscopy (ESGE) Guideline, in cooperation with the European Respiratory Society (ERS) and the European Society of Thoracic Surgeons (ESTS). Eur Respir J. 2015;46(1):40-60.", doi: "10.1183/09031936.00064515", tag: "Clinical practice guideline — ESGE/ERS/ESTS" },
        { n: 64, text: "von Bartheld MB, van Breda A, Annema JT. Complication rate of endosonography (endobronchial and endoscopic ultrasound): a systematic review. Respiration. 2014;87(4):343-51.", doi: "10.1159/000357066", tag: "Systematic review" },
        { n: 65, text: "Geri G, Passeron A, Heym B, Arlet JB, Pouchot J, Capron L, et al. Paradoxical reactions during treatment of tuberculosis with extrapulmonary manifestations in HIV-negative patients. Infection. 2013;41(2):537-43.", doi: "10.1007/s15010-012-0376-9", tag: "Retrospective cohort study" },
        { n: 66, text: "Rai DK, Kant S, Gupta VB. Paradoxical reaction in peripheral lymph node tuberculosis: a review of its prevalence, clinical characteristics, and possible treatment. Monaldi Arch Chest Dis. 2023;94(3).", doi: "10.4081/monaldi.2023.2625", tag: "Narrative review" },
        { n: 67, text: "Crouser ED, Maier LA, Wilson KC, Bonham CA, Morgenthau AS, Patterson KC, et al. Diagnosis and Detection of Sarcoidosis. An Official American Thoracic Society Clinical Practice Guideline. Am J Respir Crit Care Med. 2020;201(8):e26-e51.", doi: "10.1164/rccm.202002-0251ST", tag: "Clinical practice guideline — ATS sarcoidosis" },
        { n: 68, text: "Gupta N, Muthu V, Agarwal R, Dhooria S. Role of EBUS-TBNA in the Diagnosis of Tuberculosis and Sarcoidosis. J Cytol. 2019;36(2):128-130.", doi: "10.4103/JOC.JOC_150_18", tag: "Prospective single-centre study" },
        { n: 69, text: "Jensen PA, Lambert LA, Iademarco MF, Ridzon R. Guidelines for preventing the transmission of Mycobacterium tuberculosis in health-care settings, 2005. MMWR Recomm Rep. 2005;54(RR-17):1-141.", url: "https://pubmed.ncbi.nlm.nih.gov/16382216/", tag: "Clinical practice guideline — CDC health-care settings" },
        { n: 70, text: "Sosa LE, Njie GJ, Lobato MN, Bamrah Morris S, Buchta W, Casey ML, et al. Tuberculosis Screening, Testing, and Treatment of U.S. Health Care Personnel: Recommendations from the National Tuberculosis Controllers Association and CDC, 2019. MMWR Morb Mortal Wkly Rep. 2019;68(19):439-443.", doi: "10.15585/mmwr.mm6819a3", tag: "Clinical practice guideline — NTCA/CDC health care personnel" },
        { n: 71, text: "Behr MA, Warren SA, Salamon H, Hopewell PC, Ponce de Leon A, Daley CL, et al. Transmission of Mycobacterium tuberculosis from patients smear-negative for acid-fast bacilli. Lancet. 1999;353(9151):444-9.", doi: "10.1016/S0140-6736(98)03406-0", tag: "Molecular epidemiology study" },
        { n: 72, text: "Tostmann A, Kik SV, Kalisvaart NA, Sebek MM, Verver S, Boeree MJ, et al. Tuberculosis transmission by patients with smear-negative pulmonary tuberculosis in a large cohort in the Netherlands. Clin Infect Dis. 2008;47(9):1135-42.", doi: "10.1086/591974", tag: "Molecular epidemiology cohort study" },
        { n: 73, text: "Al Hajoj S, Varghese B, Datijan A, Shoukri M, Alzahrani A, Alkhenizan A, et al. Interferon Gamma Release Assay versus Tuberculin Skin Testing among Healthcare Workers of Highly Diverse Origin in a Moderate Tuberculosis Burden Country. PLoS One. 2016;11(5):e0154803.", doi: "10.1371/journal.pone.0154803", tag: "Cross-sectional study (Riyadh)" },
        { n: 74, text: "Alahmari H, Hanson L, Kelley PG, Spong J, Milazzo A, Mnatzaganian G. Interferon-gamma release assays versus tuberculin skin test for latent tuberculosis infection positivity among healthcare workers and first responders: a systematic review and meta-analysis. Int J Infect Dis. 2026;170:108949.", doi: "10.1016/j.ijid.2026.108949", tag: "Systematic review and meta-analysis" },
        { n: 75, text: "Metlay JP, Waterer GW, Long AC, Anzueto A, Brozek J, Crothers K, et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. An Official Clinical Practice Guideline of the American Thoracic Society and Infectious Diseases Society of America. Am J Respir Crit Care Med. 2019;200(7):e45-e67.", doi: "10.1164/rccm.201908-1581ST", tag: "Clinical practice guideline — ATS/IDSA CAP" },
        { n: 76, text: "Alyami SMA, Alzomor O, Hassan IS, AlShamrani M, Al-Jazairi AS, Algamdi M, et al. The Saudi Thoracic Society evidence-based guidelines for the diagnosis and management of community-acquired pneumonia in children and adults. Ann Thorac Med. 2025;20(4):195-212.", doi: "10.4103/atm.atm_293_25", tag: "Clinical practice guideline — Saudi Thoracic Society CAP" },
        { n: 77, text: "Chen TC, Lu PL, Lin CY, Lin WR, Chen YH. Fluoroquinolones are associated with delayed treatment and resistance in tuberculosis: a systematic review and meta-analysis. Int J Infect Dis. 2011;15(3):e211-6.", doi: "10.1016/j.ijid.2010.11.008", tag: "Systematic review and meta-analysis" },
        { n: 78, text: "Behr MA, Edelstein PH, Ramakrishnan L. Revisiting the timetable of tuberculosis. BMJ. 2018;362:k2738.", doi: "10.1136/bmj.k2738", tag: "Narrative review" },
        { n: 79, text: "Fox GJ, Barry SE, Britton WJ, Marks GB. Contact investigation for tuberculosis: a systematic review and meta-analysis. Eur Respir J. 2013;41(1):140-56.", doi: "10.1183/09031936.00070812", tag: "Systematic review and meta-analysis" },
        { n: 80, text: "Tubach F, Salmon D, Ravaud P, Allanore Y, Goupille P, Bréban M, et al. Risk of tuberculosis is higher with anti-tumor necrosis factor monoclonal antibody therapy than with soluble tumor necrosis factor receptor therapy: The three-year prospective French Research Axed on Tolerance of Biotherapies registry. Arthritis Rheum. 2009;60(7):1884-94.", doi: "10.1002/art.24632", tag: "Prospective registry study — RATIO" },
        { n: 81, text: "Winthrop KL, Park SH, Gul A, Cardiel MH, Gomez-Reino JJ, Tanaka Y, et al. Tuberculosis and other opportunistic infections in tofacitinib-treated patients with rheumatoid arthritis. Ann Rheum Dis. 2016;75(6):1133-8.", doi: "10.1136/annrheumdis-2015-207319", tag: "Pooled analysis of clinical trial data" },
        { n: 82, text: "Jeon CY, Murray MB. Diabetes mellitus increases the risk of active tuberculosis: a systematic review of 13 observational studies. PLoS Med. 2008;5(7):e152.", doi: "10.1371/journal.pmed.0050152", tag: "Systematic review of observational studies" },
        { n: 83, text: "Getahun H, Matteelli A, Abubakar I, Aziz MA, Baddeley A, Barreira D, et al. Management of latent Mycobacterium tuberculosis infection: WHO guidelines for low tuberculosis burden countries. Eur Respir J. 2015;46(6):1563-76.", doi: "10.1183/13993003.01245-2015", tag: "Clinical practice guideline (WHO) — low TB-burden countries" },
        { n: 84, text: "Swindells S, Ramchandani R, Gupta A, Benson CA, Leon-Cruz J, Mwelase N, et al. One Month of Rifapentine plus Isoniazid to Prevent HIV-Related Tuberculosis. N Engl J Med. 2019;380(11):1001-1011.", doi: "10.1056/NEJMoa1806808", tag: "Randomized controlled non-inferiority trial — BRIEF-TB" },
        { n: 85, text: "Iannone F, Cantini F, Lapadula G. Diagnosis of latent tuberculosis and prevention of reactivation in rheumatic patients receiving biologic therapy: international recommendations. J Rheumatol Suppl. 2014;91:41-6.", doi: "10.3899/jrheum.140101", tag: "Review of international recommendations" },
        { n: 86, text: "Vaidya B, Nakarmi S. Simultaneous Adalimumab and Antitubercular Treatment for Latent Tubercular Infection: An Experience from Nepal. Int J Rheumatol. 2019;2019:2034950.", doi: "10.1155/2019/2034950", tag: "Retrospective case series" },
        { n: 87, text: "Shah M, Dansky Z, Nathavitharana R, Behm H, Brown S, Dov L, et al. National Tuberculosis Coalition of America (NTCA) Guidelines for Respiratory Isolation and Restrictions to Reduce Transmission of Pulmonary Tuberculosis in Community Settings. Clin Infect Dis. 2024. Published online 18 Apr 2024.", doi: "10.1093/cid/ciae199", tag: "Clinical practice guideline — NTCA" },
        { n: 88, text: "den Boon S, Matteelli A, Getahun H. Rifampicin resistance after treatment for latent tuberculous infection: a systematic review and meta-analysis. Int J Tuberc Lung Dis. 2016;20(8):1065-71.", doi: "10.5588/ijtld.15.0908", tag: "Systematic review and meta-analysis" },
        { n: 89, text: "Balcells ME, Thomas SL, Godfrey-Faussett P, Grant AD. Isoniazid preventive therapy and risk for resistant tuberculosis. Emerg Infect Dis. 2006;12(5):744-51.", doi: "10.3201/eid1205.050681", tag: "Systematic review and meta-analysis" },
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
