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
  "case4-stage5-node-stations": false,
  "case5-stage4-cxr-normal": false,
  "case6-stage1-cxr-effusion": false,
  "case6-stage2-light-approach": false,
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
  const altText = caption.replace(/<[^>]*>/g, "").replace(/\[[\d,\s]*\]/g, "").replace(/"/g, "&quot;").trim();
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
      <img src="${src}" alt="${altText}"
           onload="this.closest('.image-slot').classList.add('has-image')"
           onerror="this.onerror=null;">
      <p class="image-caption">${captionHtml}</p>
      ${creditHtml}
    </div>`;
}

// One shared glossary, so each abbreviation is always expanded the same way.
// abbrev(...keys) renders the key line under a table (R3-16). Drug letter codes:
// "P" is rifapentine (HP, HPZM) and "Pa" is pretomanid (BPaL, BPaLM).
const GLOSSARY = {
  "B": "bedaquiline",
  "C": "clofazimine",
  "D": "delamanid",
  "E": "ethambutol",
  "H": "isoniazid",
  "L": "linezolid",
  "Lfx": "levofloxacin",
  "M": "moxifloxacin",
  "P": "rifapentine (in HP/HPZM)",
  "Pa": "pretomanid (in BPaL/BPaLM)",
  "R": "rifampicin",
  "Z": "pyrazinamide",
  "#": "a number before drug letters gives months of treatment (e.g. 2HRZE/4HR)",
  "ADA": "adenosine deaminase",
  "AE": "adverse event",
  "AFB": "acid-fast bacilli",
  "AIDS": "acquired immunodeficiency syndrome",
  "aOR": "adjusted odds ratio",
  "ARR": "absolute risk reduction",
  "ART": "antiretroviral therapy",
  "BAL": "bronchoalveolar lavage",
  "BDLC": "bedaquiline, delamanid, linezolid, clofazimine",
  "CA-125": "cancer antigen 125",
  "CAP": "community-acquired pneumonia",
  "CD": "Crohn's disease",
  "CD4": "CD4 T-lymphocyte count",
  "CI": "confidence interval",
  "CNS": "central nervous system",
  "CrAg": "cryptococcal antigen",
  "CrI": "credible interval",
  "CRP": "C-reactive protein",
  "CSF": "cerebrospinal fluid",
  "CT": "computed tomography",
  "CXR": "chest radiograph",
  "DR-TB": "drug-resistant TB",
  "DST": "drug-susceptibility testing",
  "EBUS-TBNA": "endobronchial ultrasound-guided transbronchial needle aspiration",
  "ETN": "etanercept",
  "FEV1": "forced expiratory volume in 1 second",
  "FQ": "fluoroquinolone",
  "FVC": "forced vital capacity",
  "GCS": "Glasgow Coma Scale",
  "GI": "gastrointestinal",
  "HIV": "human immunodeficiency virus",
  "GRADE": "Grading of Recommendations Assessment, Development and Evaluation",
  "HR": "hazard ratio",
  "Hr-TB": "isoniazid-resistant, rifampicin-susceptible TB",
  "IFN-γ": "interferon-gamma",
  "IGRA": "interferon-gamma release assay",
  "IL": "interleukin",
  "INH": "isoniazid",
  "IPD": "individual patient data",
  "IRIS": "immune reconstitution inflammatory syndrome",
  "IRR": "incidence rate ratio",
  "ITB": "intestinal TB",
  "ITT": "intention to treat",
  "JAK": "Janus kinase",
  "KSA": "Kingdom of Saudi Arabia",
  "LAM": "lipoarabinomannan",
  "LDH": "lactate dehydrogenase",
  "LF-LAM": "lateral-flow urine lipoarabinomannan assay",
  "LP": "lumbar puncture",
  "LR": "likelihood ratio",
  "LTBI": "latent TB infection",
  "MDR-TB": "multidrug-resistant TB",
  "MGIT": "Mycobacteria Growth Indicator Tube",
  "mITT": "modified intention to treat",
  "MRC": "Medical Research Council (severity grade)",
  "NAAT": "nucleic acid amplification test",
  "NT-proBNP": "N-terminal pro-B-type natriuretic peptide",
  "NTP": "National Tuberculosis Programme",
  "OR": "odds ratio",
  "PCR": "polymerase chain reaction",
  "PE": "pulmonary embolism",
  "PLHIV": "people living with HIV",
  "pre-XDR-TB": "pre-extensively drug-resistant TB",
  "PY": "person-years",
  "RA": "rheumatoid arthritis",
  "RCT": "randomized controlled trial",
  "RD": "risk difference",
  "RIF": "rifampicin",
  "RR": "risk ratio",
  "RR-TB": "rifampicin-resistant TB",
  "RSV": "respiratory syncytial virus",
  "SIR": "standardized incidence ratio",
  "T2": "T2-weighted MRI",
  "TBM": "TB meningitis",
  "TNF": "tumour necrosis factor",
  "TPT": "TB preventive treatment",
  "TST": "tuberculin skin test",
  "XDR-TB": "extensively drug-resistant TB",
  "ZN": "Ziehl–Neelsen",
  "ATS": "American Thoracic Society",
  "CDC": "US Centers for Disease Control and Prevention",
  "ERS": "European Respiratory Society",
  "IDSA": "Infectious Diseases Society of America",
  "NTCA": "National Tuberculosis Controllers Association (now National Tuberculosis Coalition of America)",
  "NSTC": "National Society of Tuberculosis Clinicians",
};

function abbrev(...keys) {
  const order = (k) => (k === "#" ? "~" : k.toLowerCase());
  const items = [...new Set(keys)]
    .filter((k) => GLOSSARY[k])
    .sort((a, b) => (order(a) < order(b) ? -1 : 1))
    .map((k) => (k === "#" ? GLOSSARY[k] : `${k}, ${GLOSSARY[k]}`));
  return items.length ? `<p class="table-abbrev">Abbreviations: ${items.join("; ")}.</p>` : "";
}

const CASES = [
  // ============================================================
  // CASE 1
  // ============================================================
  {
    id: 1,
    section: "pulmonary",
    title: "34-year-old laborer with 6 weeks of productive cough and weight loss",
    hubDescription:
      "A subacute cough with a cavity on CXR: the differential and its tests, what a rifampin-susceptible rapid result does and doesn't tell you, and the WHO, ATS and Saudi guidance behind the regimen once the full picture is in.",
    vignette:
      "34-year-old Saudi man, a laborer who has lived in Saudi Arabia all his life with no travel abroad and no known TB contact. Six weeks of productive cough, low-grade fevers, night sweats, and 5 kg weight loss.",
    stages: [
      {
        title: "What do you send?",
        question: "Given this presentation, what do you send, specifically?",
        points: [
          "What is your differential, from most to least likely?",
          "Which test confirms or excludes each diagnosis?",
          "How many sputum samples, and which tests on each?",
          "Do the tests go out together or one after another?",
          "What else does everyone with presumptive TB need?",
        ],
        reveal: `
          <h4>Differential and tests</h4>
          <p><strong>Differential first</strong>, most to least likely, each paired with the test that confirms or excludes it:</p>
          <ol>
            <li><strong>Pulmonary TB</strong>
              <ul>
                <li>Sputum &times;3 for <strong>acid-fast bacilli (AFB) smear</strong>;</li>
                <li>a <strong>rapid nucleic acid amplification test (NAAT) (e.g. Xpert MTB/RIF Ultra) on the first specimen</strong>;</li>
                <li><strong>mycobacterial culture (liquid &plusmn; solid) with drug-susceptibility testing</strong> on every specimen;</li>
                <li><strong>Chest radiograph (CXR)</strong>.</li>
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
              <ul><li>Computed tomography (CT) chest if the CXR shows a mass or nodes, with tissue sampling as indicated.</li></ul>
            </li>
            <li><strong>Chronic pulmonary aspergillosis (CPA)</strong>
              <ul><li><strong>Aspergillus IgG</strong> <em>if imaging shows a cavity</em>. The ERS/ESCMID definition requires findings present for <strong>&ge;3 months</strong>, so CPA sits last at 6 weeks of symptoms. ${cite(2)}</li></ul>
            </li>
          </ol>
          <h4>Also send</h4>
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
        points: [
          "Does a negative first smear change isolation?",
          "What makes this patient more infectious?",
          "Start treatment now, or wait for culture?",
          "Which first-line regimen, and what do the guidelines offer?",
          "Why did the older 4-month fluoroquinolone regimens fail, and what changed?",
          "Who else needs to know today?",
          "How much does each extra smear add? Morning sample? Fluorescence vs ZN?",
        ],
        reveal: `
          <ul>
            <li><strong>Airborne isolation now.</strong> A negative first smear does not rule out infectious TB, and <strong>cavitation on CXR independently predicts greater infectiousness</strong>. ${cite(4, 5)}</li>
            <li><strong>Two more sputum specimens</strong> (three in total) for smear and mycobacterial culture. Culture is the gold standard and provides full phenotypic drug-susceptibility testing (DST). ${cite(1)}
              <ul>
                <li><strong>Each extra smear adds less:</strong> the first detects about 54% of culture-confirmed cases, a second adds about 11%, and a third only 2&ndash;5%. ${cite(1)}</li>
                <li><strong>Morning sputum:</strong> a first-morning specimen is about 12% more sensitive than a spot specimen. ${cite(1)} A later meta-analysis found no significant gain from morning collection; coaching the patient on how to produce sputum did help (odds ratio (OR) 1.6). ${cite(145)}</li>
                <li><strong>In the laboratory:</strong> concentrated specimens add about 18% sensitivity, and fluorescence microscopy is on average about 10% more sensitive than Ziehl&ndash;Neelsen (ZN) staining. ${cite(1)}</li>
              </ul>
            </li>
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
          ${abbrev("#", "ATS", "CDC", "E", "ERS", "H", "IDSA", "M", "NTP", "P", "R", "Z")}
          <p><strong>What this case uses:</strong> <strong>2HRZE/4HR (RIPE)</strong>, the regimen most widely used in Saudi Arabia and the <strong>Saudi national recommendation</strong> (National Tuberculosis Programme (NTP) Manual 2021, &sect;5.5). ${cite(5)}</p>
          <ul>
            <li><em>Nuance:</em> the manual (2021) says "4-month fluoroquinolone-containing regimens should not be used". ${cite(5)} That wording <strong>carries over WHO's 2017 recommendation</strong>, which followed three phase III trials that failed to show non-inferiority of shorter regimens: RIFAQUIN, REMoxTB and OFLOTUB. ${cite(7)}
              <div class="table-scroll">
                <table class="data-table">
                  <thead><tr><th>Trial</th><th>Design</th><th>4-month regimen tested</th><th>Result (4-month vs standard)</th><th>Verdict</th></tr></thead>
                  <tbody>
                    <tr><td><strong>REMoxTB</strong>, NEJM 2014 ${cite(143)}</td><td>Double-blind RCT, 1,931 randomised</td><td>Moxifloxacin in place of ethambutol, or in place of isoniazid, for 17 weeks</td><td><strong>Favourable</strong> outcome 85% and 80% vs 92% (per protocol)</td><td>Not non-inferior</td></tr>
                    <tr><td><strong>OFLOTUB</strong>, NEJM 2014 ${cite(144)}</td><td>Open-label RCT, 1,836, 5 African countries</td><td>Gatifloxacin in place of ethambutol, continued with isoniazid and rifampicin for 4 months</td><td><strong>Unfavourable</strong> outcome 21.0% vs 17.2% (mITT; difference 3.5 points, 95% CI &minus;0.7 to 7.7; margin 6). Recurrence 14.6% vs 7.1%</td><td>Not non-inferior</td></tr>
                    <tr><td><strong>RIFAQUIN</strong>, NEJM 2014 ${cite(8)}</td><td>RCT, 827 enrolled</td><td>Moxifloxacin daily for 2 months, then twice-weekly rifapentine 900 mg + moxifloxacin for 2 months</td><td><strong>Unfavourable</strong> outcome 18.2% vs 4.9% (per protocol); 26.9% vs 14.4% (mITT)</td><td>Not non-inferior</td></tr>
                    <tr><td><em>For contrast:</em> <strong>Study 31/A5349</strong>, NEJM 2021 ${cite(9)}</td><td>RCT</td><td>Daily rifapentine 1,200 mg + moxifloxacin + isoniazid + pyrazinamide (2HPZM/2HPM)</td><td><strong>Unfavourable</strong> outcome 15.5% vs 14.6%; difference 1.0 point (95% CI &minus;2.6 to 4.5)</td><td><strong>Non-inferior</strong></td></tr>
                  </tbody>
                </table>
              </div>
              ${abbrev("CI", "H", "M", "P", "RCT", "Z", "mITT")}
              <p>The older fluoroquinolone regimens cleared sputum faster (REMoxTB), but at 4 months more patients relapsed. ${cite(143, 144)}</p>
              <ul>
                <li>These are <strong>different regimens</strong>: daily high-dose rifapentine, versus the older fluoroquinolone substitutions, some given intermittently. ${cite(8, 9)}</li>
                <li>WHO now conditionally recommends the 4-month isoniazid&ndash;rifapentine&ndash;moxifloxacin&ndash;pyrazinamide regimen for people aged &ge;12 (moderate certainty; first issued in 2022) ${cite(7)}, as does ATS/CDC/ERS/IDSA 2025 ${cite(6)}.</li>
                <li>Rifapentine is not available in Saudi Arabia, so HPZM isn't a practical option in Kingdom of Saudi Arabia (KSA) either.</li>
              </ul>
            </li>
            <li><strong>Pyridoxine 25&ndash;50 mg/day</strong> goes with isoniazid in anyone at risk of neuropathy (e.g. diabetes, HIV, alcohol use, malnutrition, chronic kidney disease, pregnancy). ${cite(3)}</li>
          </ul>`,
        pearl:
          "A cavity plus a positive NAAT means isolate and treat today. The negative first smear changes neither decision.",
      },
      {
        title: "How far can you trust \"rifampin resistance not detected\"?",
        question:
          "The rapid test says rifampin resistance not detected. How much should that reassure you, and what does it <em>not</em> tell you?",
        points: [
          "What exactly does Xpert test, and what does it not test?",
          "How accurate is the rifampicin result?",
          "What do those numbers mean in a new patient in a low-resistance setting?",
          "What if rifampicin resistance <em>is</em> detected? Does MDR-TB risk change what you do?",
        ],
        reveal: `
          <ul>
            <li><strong>What it looks at:</strong> Xpert checks only the rifampin-resistance region of one gene (<em>rpoB</em>). It does not test isoniazid at all.</li>
            <li><strong>How accurate it is:</strong> in a Cochrane review, <strong>Xpert Ultra detected rifampin resistance with 94.9% sensitivity and 99.1% specificity</strong> (Xpert MTB/RIF: 95.3% / 98.8%; high-certainty evidence). ${cite(10)}</li>
            <li><strong>What that means here:</strong> in a new patient in a low-resistance setting, where WHO estimates <strong>3.2% of new TB cases globally</strong> have MDR/RR-TB ${cite(11)}, the review's pooled Ultra estimates give, per 1,000 tested, about <strong>2 resistant cases missed</strong> and about <strong>9 false "detected" results</strong>. A "not detected" result is right about <strong>99.8%</strong> of the time; a "detected" result only about <strong>78%</strong> of the time. These figures are calculated from the review's pooled estimates; the review itself doesn't state them. ${cite(10)}</li>
            <li><strong>Rarely it misses resistance</strong>, and culture-based DST (or sequencing) confirms the final profile.</li>
            <li><strong>The real open question is isoniazid.</strong> Xpert MTB/RIF says nothing about it. You need <strong>culture-based DST</strong> or a <strong>rapid molecular test for isoniazid (line probe assay)</strong>. The Saudi manual indicates this especially after prior isoniazid treatment or where isoniazid resistance is common. ${cite(5)}</li>
          </ul>
          <h4>If Xpert detects rifampicin resistance</h4>
          <ul>
            <li><strong>High multidrug-resistant TB (MDR-TB) risk</strong> (previously treated, including lost to follow-up, relapse or failure; non-converters; contacts of MDR-TB patients): the rifampicin-resistance result is taken as <strong>definitive</strong>, and an RR/MDR-TB regimen is started. ${cite(5)}</li>
            <li><strong>Low MDR-TB risk:</strong> repeat <strong>Xpert MTB/RIF on a second, separate sputum specimen</strong>, not a retest of the first specimen. This is usually the second specimen collected at diagnosis. If that specimen is smear-positive and a first-line line probe assay (FL-LPA) is available, FL-LPA can confirm instead. ${cite(5)}
              <ul>
                <li>If the repeat <strong>confirms</strong> rifampicin resistance &rarr; start an MDR-TB regimen.</li>
                <li>If it <strong>does not</strong> &rarr; start first-line treatment. The second result is taken as correct: false-positive rifampicin-resistance results "are commonly due to laboratory or clerical errors and rarely to technical performance of the assay". ${cite(5)}</li>
              </ul>
            </li>
            <li><strong>Why:</strong> at 3.2% prevalence, about 1 in 5 "detected" results would be false (positive predictive value about 78%, calculated from the pooled estimates above). ${cite(10, 11)} A single "detected" result in a low-risk patient needs confirming.</li>
          </ul>
          <p style="color:var(--text-muted); font-size:0.9rem;">Saudi NTP Manual (2021), Algorithm 1, Step 3.</p>`,
        pearl:
          "In a new patient, \"rifampin resistance not detected\" is a result you can trust. What you still don't know is isoniazid susceptibility, and only DST will tell you.",
      },
      {
        title: "The mutation",
        context:
          "Culture positive at 3 weeks. DST: isoniazid resistant via a <em>katG</em> mutation; rifampin, pyrazinamide, ethambutol susceptible.",
        question:
          "What does a <em>katG</em> mutation tell you about the level of isoniazid resistance?",
        points: [
          "Which two genes carry isoniazid resistance?",
          "Which one matters more clinically, and why?",
          "Does high-dose isoniazid help?",
        ],
        reveal: `
          <p>Isoniazid resistance runs through two genes with different clinical weight:</p>
          <h4><em>katG</em> mutations</h4>
          <ul>
            <li><strong><em>katG</em>:</strong> mutations typically confer <strong>high-level resistance</strong>, so isoniazid contributes essentially nothing, even at high dose.</li>
          </ul>
          <h4><em>inhA</em> promoter mutations</h4>
          <ul>
            <li><strong><em>inhA</em> promoter:</strong> mutations typically confer <strong>low-level resistance</strong> that high-dose isoniazid may overcome, <strong>plus cross-resistance to ethionamide/prothionamide</strong>.</li>
          </ul>
          <p>${cite(12)}</p>`,
        pearl:
          "Know which gene you're dealing with. With <em>katG</em>, isoniazid is gone even at high dose. With <em>inhA</em>, high-dose isoniazid may still work, but ethionamide probably won't.",
      },
      {
        title: "Regimen and evidence",
        question:
          "What regimen and duration does current evidence support for rifampin-susceptible, isoniazid-resistant TB?",
        points: [
          "Which regimen and duration for rifampicin-susceptible, isoniazid-resistant TB?",
          "What evidence is it based on, and how strong is it?",
          "Where do the guidelines agree or differ?",
        ],
        reveal: `
          <p>Stop isoniazid. Give <strong>rifampin + ethambutol + pyrazinamide + levofloxacin for 6 months</strong>. ${cite(13, 5)}</p>
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Comparison</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td>Fregonese et al., IPD meta-analysis, Lancet Respir Med 2018 ${cite(14)}, comparison 1</td>
                  <td>&ge;6 months REZ <strong>+ a fluoroquinolone</strong> vs &ge;6 months REZ alone (33 cohort datasets)</td>
                  <td>Treatment success improved with a fluoroquinolone (aOR 2.8, 95% CI 1.1&ndash;7.3)</td>
                </tr>
                <tr>
                  <td>Same meta-analysis ${cite(14)}, comparison 2</td>
                  <td>Standardized retreatment regimen <strong>with streptomycin</strong> vs &ge;6 months REZ</td>
                  <td>Worse success with streptomycin (aOR 0.4, 95% CI 0.2&ndash;0.7). No benefit from adding an injectable.</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("CI", "E", "IPD", "R", "Z", "aOR")}
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>WHO Hr-TB (2018) ${cite(13)}</td>
                  <td>6 months rifampicin + ethambutol + pyrazinamide + <strong>levofloxacin</strong>, no isoniazid required, <strong>no injectable</strong></td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr>
                  <td>Saudi NTP Manual (2021) ${cite(5)}</td>
                  <td>Rifampicin + ethambutol + pyrazinamide + <strong>levofloxacin for 6 months</strong>; do <strong>not</strong> add streptomycin or other injectables (&sect;10.5.1)</td>
                  <td>Not graded in the manual</td>
                </tr>
                <tr>
                  <td>ATS/CDC/ERS/IDSA DR-TB (2019) ${cite(15)}</td>
                  <td><strong>Add a later-generation fluoroquinolone</strong> to 6 months daily rifampin + ethambutol + pyrazinamide</td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr>
                  <td>Same, second recommendation ${cite(15)}</td>
                  <td><strong>Pyrazinamide may be shortened to 2 months</strong> in selected patients (noncavitary, lower-burden disease, or pyrazinamide toxicity)</td>
                  <td>Conditional, very low certainty</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("ATS", "CDC", "DR-TB", "ERS", "Hr-TB", "IDSA", "NTP")}
          <p><strong>Practical note:</strong> rifampin lowers <strong>moxifloxacin</strong> exposure by roughly 30%, so some experts prefer <strong>levofloxacin</strong> alongside rifampin. ${cite(15)} This patient has cavitary disease, so the pyrazinamide-shortening option does not apply.</p>`,
        pearl:
          "Both the WHO and ATS isoniazid-resistant regimens rest on conditional, very-low-certainty evidence from observational patient data. There are no randomized trials behind them. Know that when you defend the regimen on rounds.",
      },
      {
        title: "The timing question",
        question:
          "What if isoniazid resistance is only confirmed after standard first-line therapy has already started — or what if it is strongly suspected before confirmation?",
        points: [
          "Isoniazid resistance found after first-line treatment has started: what now?",
          "What if it's found very late in treatment?",
          "When would you start the Hr-TB regimen before confirmation?",
          "What do you monitor on this regimen?",
          "When would you extend beyond 6 months?",
        ],
        reveal: `
          <h4>Resistance confirmed after first-line treatment has started</h4>
          <ul>
            <li><strong>Confirmed after 2HRZE/4HR has started:</strong> repeat rapid rifampin testing. <strong>Once rifampin resistance is excluded, give a full 6-month course of (H)REZ-Lfx.</strong> The 6 months are driven by levofloxacin, so the companion drugs often run longer than 6 months in total. If rifampin resistance is found, switch to an MDR-TB regimen. ${cite(13)}</li>
            <li><strong>Very late confirmation</strong> (e.g. 5 months into 2HRZE/4HR): whether to start 6 months of (H)REZ-Lfx at that point depends on the patient's clinical and microbiological status. ${cite(13)}</li>
          </ul>
          <h4>Before confirmation</h4>
          <ul>
            <li><strong>Strongly presumed isoniazid-resistant TB (Hr-TB)</strong> (e.g. a close contact of a confirmed Hr-TB source): the Hr-TB regimen may be started while DST is pending. If DST later shows isoniazid susceptibility, <strong>stop levofloxacin and complete 2HREZ/4HR</strong>. ${cite(13)}</li>
          </ul>
          <h4>Monitoring on this regimen</h4>
          <ul>
            <li><strong>Monitoring on this regimen:</strong>
              <ul>
                <li><strong>Liver:</strong> monthly aspartate aminotransferase (AST) where possible (prolonged pyrazinamide is hepatotoxic). If resources are limited, at least monthly for high-risk patients (viral hepatitis, heavy alcohol use). ${cite(13)}</li>
                <li><strong>QT:</strong> avoid levofloxacin with known or suspected QT prolongation. Baseline corrected QT interval (QTc); watch hypokalaemia and other QT-prolonging drugs. ${cite(13)}</li>
                <li><strong>Fluoroquinolone class warnings:</strong> tendinitis/tendon rupture, severe hypoglycaemia, mental-health effects, aortic rupture/dissection. ${cite(15)}</li>
                <li><strong>Absorption:</strong> don't co-administer levofloxacin with antacids or other divalent-cation products. Milk restriction is not needed. ${cite(13)}</li>
              </ul>
            </li>
          </ul>
          <h4>Extending treatment, and the alternative</h4>
          <ul>
            <li><strong>When to consider extending beyond 6 months:</strong> WHO says prolongation <strong>may be considered</strong> for <strong>extensive cavitary disease</strong> or <strong>slow smear/culture conversion</strong>. In slow converters, <strong>first rule out acquired rifampicin (and fluoroquinolone/pyrazinamide) resistance</strong>. ${cite(13)}
              <ul>
                <li>For comparison, in <em>drug-susceptible</em> TB, ATS/CDC/IDSA extend the continuation phase to 7 months (9 months total) when there is <strong>both</strong> cavitation <strong>and</strong> a positive 2-month culture. ${cite(3)}</li>
              </ul>
            </li>
            <li>If levofloxacin can't be used (toxicity/resistance), <strong>6(H)REZ</strong> is the alternative. <strong>Do not substitute an injectable.</strong> ${cite(13)}</li>
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
    section: "pulmonary",
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
        points: [
          "What is your differential, from most to least likely?",
          "What does prior treatment change about testing?",
          "Which test for each diagnosis?",
        ],
        reveal: `
          <h4>Differential and tests</h4>
          <p><strong>Differential first</strong>, most to least likely, each paired with its test:</p>
          <ol>
            <li><strong>Recurrent TB (relapse or reinfection), possibly with acquired drug resistance</strong>
              <ul>
                <li><strong>Rapid molecular test for TB + rifampicin resistance (Xpert MTB/RIF Ultra)</strong> on the first specimen;</li>
                <li>plus <strong>culture with full first- and second-line phenotypic drug-susceptibility testing (DST), sent at or before the start of treatment</strong>. WHO says culture and DST should be obtained from <em>all</em> previously treated patients, for at least isoniazid and rifampicin. ${cite(7)}</li>
                <li>Prior treatment is itself an indication for rapid molecular DST. ${cite(1)}</li>
              </ul>
            </li>
            <li><strong>Post-TB bronchiectasis with secondary bacterial infection</strong>
              <ul><li>Sputum Gram stain and routine bacterial culture.</li></ul>
            </li>
            <li><strong>Aspergilloma / chronic pulmonary aspergillosis in a residual cavity</strong>
              <ul><li><strong>Aspergillus IgG</strong> if imaging shows a cavity. Aspergillus antibody is elevated in &gt;90% of chronic pulmonary aspergillosis (CPA). ${cite(2)}</li></ul>
            </li>
            <li><strong>Non-tuberculous mycobacteria</strong>
              <ul><li>Mycobacterial culture with species identification (same specimens).</li></ul>
            </li>
            <li><strong>Malignancy</strong>
              <ul><li>Computed tomography (CT) chest, then tissue if a mass is seen.</li></ul>
            </li>
          </ol>
          <h4>Also send and document</h4>
          <p><strong>Also:</strong> HIV test ${cite(3)}; document the prior regimen, the length of interruptions, and any exposure to a resistant source case.</p>`,
        pearl: `<em>Bedside pitfall, specific to retreatment:</em> in someone treated for TB before, a positive Xpert can reflect leftover DNA from dead bacilli. In the Cochrane review, Xpert Ultra specificity fell to <strong>88.2%</strong> in people with a prior TB history, versus 95.6% overall. Always confirm with culture before calling it a new episode. ${cite(10)}`,
      },
      {
        title: "Rifampicin resistance detected: what do you do now?",
        context: "Result: MTB detected, rifampin resistance detected.",
        question: "Rifampicin resistance is detected. What do you do today?",
        points: [
          "What do you do today, before full DST?",
          "Treat as rifampicin-resistant only, or as MDR-TB? Why?",
          "How are monoresistance, RR, MDR, pre-XDR and XDR defined?",
          "What do you do before starting a bedaquiline/linezolid regimen (baseline tests, including pregnancy status)?",
          "What do you send now to choose the regimen?",
          "How much worse are outcomes with rifampicin-resistant TB?",
        ],
        reveal: `
          <ul>
            <li><strong>Treat as MDR/RR-TB.</strong> Do not start the standard first-line regimen. WHO manages rifampicin-resistant TB (RR-TB) and multidrug-resistant TB (MDR-TB) together as MDR/RR-TB. ${cite(7)}</li>
            <li><strong>Why "treat as MDR":</strong> the two usually travel together. Worldwide in 2024, <strong>16% of previously treated</strong> patients had MDR/RR-TB, versus <strong>3.2% of new</strong> patients. ${cite(11)}</li>
            <li><strong>Isolate, notify, start contact investigation.</strong> Contact management must account for the resistance pattern.</li>
            <li><strong>Send second-line DST now, especially fluoroquinolone susceptibility.</strong> It decides between BPaLM and BPaL (next stage). Globally, <strong>18%</strong> of MDR/RR-TB is pre-XDR (fluoroquinolone-resistant). ${cite(11)}</li>
            <li><strong>Baseline work-up before a bedaquiline/linezolid regimen:</strong>
              <ul>
                <li>HIV test;</li>
                <li><strong>Electrocardiogram (ECG)</strong> (QT) ${cite(15)};</li>
                <li>Complete blood count (CBC) (linezolid myelosuppression);</li>
                <li>Liver function tests (LFTs);</li>
                <li>visual acuity/colour vision (linezolid optic neuropathy);</li>
                <li>neuropathy screen: not on the Saudi manual's list, but good clinical practice given linezolid neuropathy rates in Nix-TB (81%) and ZeNix (13&ndash;38%) ${cite(16, 17)};</li>
                <li><strong>pregnancy test</strong> (BPaLM is not recommended in pregnancy or breastfeeding; see next stage) ${cite(7)}.</li>
              </ul>
              The Saudi National Tuberculosis Programme (NTP) Manual baseline (&sect;10.8) also includes smear, culture and DST (including second-line), chest radiograph (CXR), renal and hepatic profile, calcium/magnesium and a baseline ECG if on bedaquiline or delamanid, thyroid function, and CBC if anaemia is suspected. ${cite(5)}
            </li>
            <li><strong>Monitoring (Saudi NTP Manual, Table 10.7):</strong> CBC weekly for the first month, then monthly on linezolid; visual acuity if vision changes on linezolid; ECG at 2, 4, 8, 12 and 24 weeks on bedaquiline/delamanid, stopping them if corrected QT interval (QTc) &gt;500 ms; LFTs monthly on bedaquiline. ${cite(5)}</li>
          </ul>
          <h4>Definitions (WHO 2021)</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Term</th><th>Definition</th></tr></thead>
              <tbody>
                <tr><td>Hr-TB</td><td>Isoniazid-resistant, rifampicin-susceptible ${cite(13)}</td></tr>
                <tr><td>Monoresistance</td><td>Resistance to one first-line drug only ${cite(18)}</td></tr>
                <tr><td>RR-TB</td><td>Rifampicin resistance, with or without resistance to other drugs ${cite(18)}</td></tr>
                <tr><td>MDR-TB</td><td>Resistance to at least isoniazid and rifampicin ${cite(18)}</td></tr>
                <tr><td>Pre-XDR-TB</td><td>MDR/RR-TB + resistance to any fluoroquinolone ${cite(19)}</td></tr>
                <tr><td>XDR-TB</td><td>MDR/RR-TB + any fluoroquinolone + at least one of bedaquiline or linezolid ${cite(19)}</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("Hr-TB", "MDR-TB", "RR-TB", "XDR-TB", "pre-XDR-TB")}
          <p style="color:var(--text-muted); font-size:0.9rem;">The Saudi NTP Manual (2021) still uses the older extensively drug-resistant (XDR) definition (MDR + fluoroquinolone + second-line injectable) and has no pre-XDR category. It also defines RR-TB inconsistently (any rifampicin resistance on p.88; rifampicin-resistant and isoniazid-susceptible in the p.97 table). ${cite(5)}</p>`,
        pearl: `A prior TB course with adherence gaps is the single strongest predictor of resistance. In Saudi data it carried about 7-fold odds of MDR. ${cite(20)} Rapid rifampicin testing on day one exists for exactly this patient.`,
      },
      {
        title: "How far can you trust this result, and what if DST disagrees?",
        question:
          "Xpert says rifampicin-resistant. How reliable is that, and what do you do if culture-based DST disagrees, in either direction?",
        points: [
          "How reliable is a \"rifampicin resistance detected\" result?",
          "Xpert resistant but culture DST susceptible: why, and what do you do?",
          "The reverse: Xpert susceptible but DST resistant?",
          "How common is drug resistance, globally and in Saudi Arabia?",
        ],
        reveal: `
          <ul>
            <li><strong>Mechanism in one line:</strong> Xpert detects mutations in a short rifampicin-resistance region of <em>rpoB</em>. It reads DNA, not growth.</li>
            <li><strong>Reliability:</strong> specificity for rifampicin resistance is <strong>99.1% (Ultra) / 98.8% (MTB/RIF)</strong>. A "detected" result is rarely wrong, but not never. ${cite(10)}</li>
          </ul>
          <h4>When molecular and phenotypic results disagree</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Direction</th><th>Main causes</th><th>What to do</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>Xpert: RIF-resistant / DST: susceptible</strong></td>
                  <td><strong>"Disputed" (borderline) <em>rpoB</em> mutations</strong>: real, clinically relevant low-level resistance that growth-based DST at the standard critical concentration misses. In one series only <strong>16 of 61 isolates (26%) with such mutations tested resistant by MGIT</strong>. ${cite(21)} Patients infected with strains carrying these mutations often fail treatment with rifampicin-based first-line regimens. ${cite(5)} WHO has responded by lowering the critical concentration for rifampicin in MGIT. ${cite(22)}</td>
                  <td><strong>Do not de-escalate on the phenotype alone.</strong> Sequence the <em>rpoB</em> gene; treat as RR-TB if a resistance mutation is confirmed. ${cite(21)}</td>
                </tr>
                <tr>
                  <td><strong>Xpert: RIF not detected / DST or clinical course: resistant</strong></td>
                  <td><strong>Mutations outside the region Xpert reads</strong>, e.g. <em>rpoB</em> <strong>I491F</strong>. It was found in <strong>30% of MDR strains in an eSwatini study</strong>, and in <strong>15%</strong> of South African isolates labelled "isoniazid-monoresistant", which were actually MDR. <strong>Routine phenotypic DST can also call I491F susceptible.</strong></td>
                  <td>If the patient isn't responding, or epidemiology suggests it, <strong>request sequencing</strong>. Don't let two "susceptible" results end the discussion. ${cite(23, 24)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("DST", "MDR-TB", "MGIT", "RIF", "RR-TB")}
          <p>Supporting data: in Eswatini, Xpert MTB/RIF detected only <strong>62.5%</strong> of confirmed rifampicin resistance against a composite reference, largely because of I491F. ${cite(25)}</p>
          <h4>Resistance epidemiology: global vs Saudi</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Metric</th><th>Global</th><th>Saudi Arabia</th><th>Source</th></tr></thead>
              <tbody>
                <tr><td>MDR/RR-TB, new patients</td><td>3.2% (2024)</td><td>&mdash;</td><td>WHO Global TB Report 2025 ${cite(11)}</td></tr>
                <tr><td>MDR/RR-TB, previously treated</td><td>16% (2024)</td><td>&mdash;</td><td>WHO Global TB Report 2025 ${cite(11)}</td></tr>
                <tr><td>Rifampicin resistance, all tested</td><td>&mdash;</td><td>6% (95% CI 3&ndash;9), pooled</td><td>Alanazi 2026 meta-analysis ${cite(20)}</td></tr>
                <tr><td>Isoniazid resistance, all tested</td><td>~8% INH monoresistance (range 5&ndash;11%)</td><td>15% (7&ndash;28), pooled</td><td>ATS 2019 ${cite(15)}; Alanazi 2026 ${cite(20)}</td></tr>
                <tr><td>MDR-TB</td><td>&mdash;</td><td><strong>8%</strong> pooled (studies since 2000); <strong>national surveillance 4.4% &rarr; 2.4% (2015&rarr;2019)</strong></td><td>Alanazi 2026 ${cite(20)}; Alawi 2024 ${cite(26)}</td></tr>
                <tr><td>Prior treatment as a risk factor</td><td>&mdash;</td><td><strong>OR 7.34</strong> for MDR</td><td>Alanazi 2026 ${cite(20)}</td></tr>
                <tr><td>Estimated MDR/RR-TB cases and deaths</td><td>390,000 cases; 150,000 deaths (2024)</td><td>&mdash;</td><td>WHO Global TB Report 2025 ${cite(11)}</td></tr>
                <tr><td>Treatment success</td><td>MDR/RR-TB 71% (2022 cohort) vs drug-susceptible 88% (2023 cohort)</td><td>&mdash;</td><td>WHO Global TB Report 2025 ${cite(11)}</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("ATS", "CI", "INH", "MDR-TB", "OR", "RR-TB")}
          <p style="color:var(--text-muted); font-size:0.9rem;"><em>Caveat:</em> the Saudi meta-analysis pools heterogeneous, mostly hospital-based series, so the national surveillance figure is the better population estimate.</p>
          <p>Older, longer MDR regimens carried heavy toxicity. Grade &ge;3 or serious adverse events occurred in 59% on standard care in TB-PRACTECAL ${cite(27)}, and hearing loss in 9% with the injectable-containing control in STREAM stage 2 ${cite(28)}. This is part of why shorter all-oral regimens matter.</p>`,
        pearl:
          "Rifampicin resistance on Xpert is highly specific. When a test result disagrees with the sequencing or with how the patient is doing, trust the sequencing and the patient.",
      },
      {
        title: "Full susceptibility results: which regimen?",
        context:
          "Culture-based DST confirms resistance to both isoniazid and rifampin (MDR-TB). Fluoroquinolone susceptible, no further resistance identified.",
        question:
          "Given this susceptibility profile, what regimen and duration does current evidence support, and what studies is that based on?",
        points: [
          "Which regimen and duration for this susceptibility profile?",
          "Which trials support it, and what did each show?",
          "What do WHO, ATS and the Saudi manual recommend?",
          "What must you check before starting BPaLM in a woman of child-bearing age?",
          "If BPaLM isn't possible, what other short regimens are there, and which does WHO advise against?",
        ],
        reveal: `
          <ul>
            <li><strong>Answer: 6-month BPaLM.</strong> For eligible patients:
              <ul>
                <li><strong>age &ge;14</strong>;</li>
                <li><strong>&lt;1 month prior exposure</strong> to bedaquiline, pretomanid, linezolid or delamanid;</li>
                <li><strong>not pregnant or breastfeeding</strong> (pretomanid safety data are lacking).</li>
              </ul>
              <strong>Check her pregnancy status before prescribing.</strong> ${cite(7)}
            </li>
            <li><strong>Doses</strong> (ATS 2025 Table 1; consistent with WHO):
              <ul>
                <li><strong>bedaquiline 400 mg daily &times;2 wk, then 200 mg three times/wk &times;24 wk</strong>;</li>
                <li><strong>pretomanid 200 mg daily &times;26 wk</strong>;</li>
                <li><strong>linezolid 600 mg daily &times;26 wk</strong> (may drop to 300 mg daily for toxicity);</li>
                <li><strong>moxifloxacin 400 mg daily &times;26 wk</strong>. ${cite(6, 7)}</li>
                <li>WHO also accepts <strong>bedaquiline 200 mg daily &times;8 wk, then 100 mg daily</strong> as an alternative schedule. ${cite(7)}</li>
              </ul>
            </li>
          </ul>
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Trial</th><th>Population / design</th><th>Regimen &amp; doses</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>Nix-TB</strong>, NEJM 2020 ${cite(16)}</td>
                  <td>XDR or treatment-intolerant/non-responsive MDR; single arm, n=109</td>
                  <td><strong>BPaL</strong>: bedaquiline 400 mg &times;2 wk then 200 mg 3&times;/wk &times;24 wk; pretomanid 200 mg &times;26 wk; <strong>linezolid 1,200 mg daily</strong> &times;up to 26 wk</td>
                  <td><strong>Favorable 90%</strong> (ITT). Peripheral neuropathy 81%, myelosuppression 48%</td>
                </tr>
                <tr>
                  <td><strong>ZeNix</strong>, NEJM 2022 ${cite(17)}</td>
                  <td>XDR/pre-XDR or intolerant/non-responsive RR-TB; randomized, n=181</td>
                  <td>Bedaquiline <strong>200 mg daily &times;8 wk then 100 mg daily &times;18 wk</strong>; pretomanid 200 mg &times;26 wk; <strong>linezolid 1,200 &times;26 wk / 1,200 &times;9 wk / 600 &times;26 wk / 600 &times;9 wk</strong></td>
                  <td><strong>Favorable 93% / 89% / 91% / 84%</strong>. Neuropathy 38 / 24 / 24 / 13%. <strong>Best balance: 600 mg &times;26 wk</strong></td>
                </tr>
                <tr>
                  <td><strong>TB-PRACTECAL</strong> (stage 2), NEJM 2022 ${cite(27)}</td>
                  <td>RR-TB, age &ge;15; randomized vs 9&ndash;20-month standard care</td>
                  <td><strong>BPaLM 24 wk</strong>: bedaquiline 400 mg &times;2 wk then 200 mg 3&times;/wk &times;22 wk; pretomanid 200 mg; <strong>linezolid 600 mg &times;16 wk then 300 mg &times;8 wk</strong>; moxifloxacin 400 mg. Control: individualized, per national guidelines</td>
                  <td><strong>BPaLM was non-inferior to standard care</strong> (the upper confidence limit was well inside the 12-point margin). Unfavourable outcome at 72 weeks (death, failure, discontinuation, loss to follow-up, or recurrence; lower is better): <strong>11% vs 48%</strong> (mITT; difference &minus;37 points, 96.6% CI &minus;53 to &minus;22). Per-protocol: 4% vs 12% (&minus;9 points, CI &minus;22 to 4). Grade &ge;3 or serious adverse events: <strong>19% vs 59%</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("B", "CI", "ITT", "L", "M", "MDR-TB", "Pa", "RR-TB", "XDR-TB", "mITT", "pre-XDR-TB")}
          <p style="color:var(--text-muted); font-size:0.9rem;">TB-PRACTECAL doses are taken from WHO's description of the trial in Module 4 (2025). ${cite(7)} Pretomanid and moxifloxacin doses match the WHO/ATS BPaLM regimen.</p>
          <p>TB-PRACTECAL enrolment stopped early (March 2021) on the advice of the independent data and safety monitoring board: the interim analysis showed a difference between arms of at least three standard deviations in favour of BPaLM, with 5 deaths on standard care vs none on BPaLM, and more data were judged extremely unlikely to change the result. ${cite(29)}</p>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>WHO Module 4 (2025) ${cite(7)}</td>
                  <td><strong>BPaLM</strong> (6 months) rather than 9-month or longer (18-month) regimens in MDR/RR-TB</td>
                  <td>Conditional, very low certainty</td>
                </tr>
                <tr><td>WHO Module 4 (2025) ${cite(7)}</td><td>WHO <strong>suggests against</strong> the 9-month <strong>DCLLfxZ</strong> or <strong>DCMZ</strong> regimens, compared with longer (&gt;18 months) regimens, in fluoroquinolone-susceptible MDR/RR-TB</td><td>Conditional, very low certainty</td></tr>
                <tr>
                  <td>Saudi NTP Manual (2021) ${cite(5)}</td>
                  <td><strong>Does not include BPaLM</strong> (it predates it). Longer regimens (<strong>18 months or longer</strong>): all three Group A drugs (levofloxacin/moxifloxacin, bedaquiline, linezolid) + &ge;1 Group B; the "shorter MDR-TB regimen" (<strong>9&ndash;12 months</strong>) described is the <strong>older injectable-containing</strong> one (&sect;10.1, &sect;10.5.2, Algorithm 3)</td>
                  <td>Not graded in the manual</td>
                </tr>
                <tr>
                  <td>ATS/CDC/ERS/IDSA (2025) ${cite(6)}</td>
                  <td><strong>6-month (26-week) BPaLM</strong> for RR-TB, FQ-susceptible, age &ge;14</td>
                  <td>Strong, very low certainty</td>
                </tr>
                <tr>
                  <td>ATS/CDC/ERS/IDSA (2025) ${cite(6)}</td>
                  <td><strong>6-month (26-week) BPaL</strong> (no moxifloxacin) if FQ-resistant or FQ-intolerant</td>
                  <td>Strong, very low certainty</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("ATS", "B", "C", "CDC", "D", "ERS", "FQ", "IDSA", "L", "Lfx", "M", "MDR-TB", "NTP", "Pa", "RR-TB", "Z")}
          <h4>If BPaLM isn't possible: other short regimens</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Trial</th><th>Design</th><th>Regimens</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>endTB</strong>, NEJM 2025 ${cite(31)}</td>
                  <td>Phase 3 RCT, FQ-susceptible RR-TB, age &ge;15, n=754 (699 mITT)</td>
                  <td>Five 9-month all-oral regimens vs standard care: <strong>BLMZ, BLLfxCZ, BDLLfxZ, DCMZ, DCLLfxZ</strong></td>
                  <td>Control 80.7% favorable (mITT). Risk differences: <strong>BLLfxCZ +9.8</strong> (0.9&ndash;18.7); <strong>BLMZ +8.3</strong> (&minus;0.8&ndash;17.4); <strong>BDLLfxZ +4.6</strong> (&minus;4.9&ndash;14.1); DCMZ +2.5 (&minus;7.5&ndash;12.5); DCLLfxZ <strong>not non-inferior</strong>. <strong>DCMZ failed non-inferiority in the per-protocol analysis</strong>, so the authors conclude <strong>three</strong> regimens are supported. Grade &ge;3 hepatotoxicity 11.7% overall vs 7.1% control</td>
                </tr>
                <tr>
                  <td><strong>STREAM stage 2</strong>, Lancet 2022 ${cite(28)}</td>
                  <td>RCT, 7 countries, age &ge;15, RR-TB without FQ/aminoglycoside resistance; <strong>n=588 randomised (517 mITT)</strong></td>
                  <td><strong>9-month all-oral bedaquiline regimen</strong> vs 9-month injectable-containing control; also a <strong>6-month bedaquiline regimen <em>with 8 weeks of second-line injectable</em></strong> (injectable-containing)</td>
                  <td><strong>9-month all-oral vs control:</strong> favourable <strong>162/196 (83%) vs 133/187 (71%)</strong>, adjusted difference 11.0% (95% CI 2.9&ndash;19.0); <strong>non-inferior, and superior on the prespecified test</strong>; grade 3&ndash;4 hearing loss 2% vs 9%. <strong>6-month injectable-containing regimen vs concurrent controls:</strong> <strong>122/134 (91%) vs 87/127 (69%)</strong>, adjusted difference 22.2% (13.1&ndash;31.2); grade 3&ndash;4 hearing loss 4%</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("B", "C", "CI", "D", "FQ", "L", "Lfx", "M", "RCT", "RR-TB", "Z", "mITT")}
          <p>WHO writes <strong>BLLfxCZ</strong>; the endTB paper writes BCLLfxZ. They are the same regimen.</p>
          <ul>
            <li>In endTB's linezolid arms, the linezolid dose was reduced at week 16 or earlier. ${cite(31)}</li>
            <li><strong>endTB vs endTB-Q:</strong> endTB-Q tested BDLC for <strong>FQ-resistant</strong> (pre-XDR) TB. <strong>Overall non-inferiority was not shown</strong>: favorable 87% vs 89% (modified intention to treat, mITT). ${cite(32)}</li>
            <li><strong>WHO's position on DCMZ, and why:</strong> endTB called DCMZ non-inferior in mITT, but it failed in the per-protocol analysis and had more culture-positive unfavorable outcomes (7.5%). ${cite(31, 7)}</li>
          </ul>
          <p><em>Local note:</em> the Saudi NTP Manual (2021) predates BPaLM and the newer short regimens. Check your programme's current MDR-TB protocol before prescribing. ${cite(5)}</p>`,
        pearl:
          "BPaLM earns its place through shorter duration and far fewer serious adverse events. The one box you must tick before prescribing it to a woman of child-bearing age is pregnancy status.",
      },
      {
        title: "Her pregnancy test is positive. Now what?",
        context: "Before BPaLM is started, her <strong>pregnancy test is positive</strong>.",
        question:
          "BPaLM is not recommended in pregnancy. What does current evidence support instead?",
        points: [
          "Why is BPaLM not used in pregnancy?",
          "Which short regimens have any data in pregnant women, and which trials excluded them?",
          "What does WHO say about each option in pregnancy?",
          "If a short regimen isn't possible, what is the fallback?",
        ],
        reveal: `
          <h4>Which short regimens have data in pregnancy?</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Trial (regimen)</th><th>Pregnant women</th><th>What the data show</th></tr></thead>
              <tbody>
                <tr><td><strong>BEAT Tuberculosis</strong> (BDLLfxC, 6 months) ${cite(30)}</td><td><strong>Enrolled</strong>, any trimester</td><td>10 pregnancies (9 at enrolment, 1 during the trial); <strong>4 received BDLLfxC</strong>; all singleton live births, one premature; one relapse in the strategy arm ${cite(30, 7)}</td></tr>
                <tr><td><strong>endTB</strong> (9-month BLMZ, BLLfxCZ, BDLLfxZ) ${cite(31)}</td><td><strong>Excluded</strong> at enrolment</td><td>10 (1.3%) became pregnant during the trial and were retained. WHO: "no data from the endTB trial" on these regimens in pregnancy ${cite(31, 7)}</td></tr>
                <tr><td><strong>endTB-Q</strong> (BDLC, fluoroquinolone-resistant) ${cite(32)}</td><td><strong>Excluded</strong> at enrolment</td><td>5 became pregnant during the trial ${cite(32)}</td></tr>
                <tr><td><strong>STREAM stage 2</strong> (9-month bedaquiline regimen) ${cite(28)}</td><td><strong>Not enrolled</strong>: contraception was required for women of child-bearing potential</td><td>&mdash;</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("B", "C", "D", "L", "Lfx", "M", "Z")}
          <h4>The 6-month option: BDLLfxC</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Trial</th><th>Design</th><th>Regimen</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>BEAT Tuberculosis</strong>, NEJM 2026 ${cite(30)}</td>
                  <td>Pragmatic RCT, South Africa, n=403, <strong>age &ge;6, pregnant/breastfeeding and FQ-resistant patients included</strong></td>
                  <td><strong>BDLLfxC</strong> 6 months: bedaquiline + delamanid + linezolid, <strong>plus levofloxacin (if FQ-susceptible) or clofazimine (if FQ-resistant)</strong>; both were given until the FQ result was available, then one was stopped. vs 9-month local standard</td>
                  <td><strong>Success 86.1% vs 86.0%</strong>; adjusted RD &minus;0.2 (95% CI &minus;6.9 to 6.5); <strong>non-inferior</strong> (margin 10). Grade &ge;3 AEs 31.2% vs 37.0%. 85 (21%) had FQ-resistant TB; the treatment effect didn't differ by FQ resistance. 9 pregnant at enrolment + 1 during the trial; all live births (one premature)</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("AE", "B", "C", "CI", "D", "FQ", "L", "Lfx", "RCT", "RD")}
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr><td>WHO Module 4 (2025) ${cite(7)}</td><td>WHO <strong>suggests</strong> the 6-month <strong>BDLLfxC</strong> regimen in MDR/RR-TB with or without fluoroquinolone resistance. WHO states it is <strong>recommended for use in pregnant and breastfeeding women</strong></td><td>Conditional, very low certainty</td></tr>
                <tr><td>WHO Module 4 (2025) ${cite(7)}</td><td>WHO <strong>suggests</strong> the 9-month <strong>BLMZ, BLLfxCZ or BDLLfxZ</strong> over longer (&gt;18 months) regimens when fluoroquinolone resistance has been excluded; BLMZ is preferred over BLLfxCZ, and BLLfxCZ over BDLLfxZ. WHO applies this to pregnant women, although endTB had no data in pregnancy</td><td>Conditional, very low certainty</td></tr>
                <tr><td>WHO Module 4 (2025) ${cite(7)}</td><td>WHO <strong>suggests</strong> the standardized <strong>9-month all-oral regimen</strong>: bedaquiline &times;6 months + levofloxacin/moxifloxacin, ethionamide, ethambutol, high-dose isoniazid, pyrazinamide, clofazimine &times;4 (&ndash;6) months, then levofloxacin/moxifloxacin, clofazimine, ethambutol, pyrazinamide &times;5 months; <strong>ethionamide may be replaced by 2 months of linezolid 600 mg</strong>. <strong>In pregnancy, use the version with linezolid instead of ethionamide</strong></td><td>Conditional, very low certainty</td></tr>
                <tr>
                  <td>WHO Module 4 (2025) ${cite(7)}</td>
                  <td><strong>Longer regimens:</strong> 18&ndash;20 months total for most patients</td>
                  <td>Conditional, very low certainty</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("B", "C", "D", "FQ", "L", "Lfx", "M", "MDR-TB", "RR-TB", "Z")}
          <p>WHO writes <strong>BLLfxCZ</strong>; the endTB paper writes BCLLfxZ. They are the same regimen.</p>
          <ul>
            <li><strong>Fallback: longer individualized regimen.</strong> Total <strong>18&ndash;20 months</strong> for most patients, adjusted to response. ${cite(7)}</li>
          </ul>`,
        pearl:
          "In pregnancy, BDLLfxC is the only short regimen with trial data in pregnant women. WHO extends the endTB regimens to pregnancy on drug-safety grounds, not trial data.",
      },
    ],
  },

  // ============================================================
  // CASE 3
  // ============================================================
  {
    id: 3,
    section: "pulmonary",
    title:
      "36-year-old man with new HIV diagnosis, fever, and progressive dyspnea",
    hubDescription:
      "A newly diagnosed HIV patient with fever, progressive dyspnea and travel across South and Southeast Asia: a travel-shaped differential, interpreting urine LAM, sputum vs BAL, when to treat despite negative microbiology, and ART timing with co-trimoxazole.",
    vignette:
      "36-year-old man, newly diagnosed HIV (CD4 38 cells/µL, not yet on antiretroviral therapy (ART)), admitted with 3 weeks of fever, weight loss, and progressive dyspnea. Exam notable for hepatosplenomegaly and diffuse fine crackles. Computed tomography (CT) chest shows a diffuse micronodular (\"miliary\") pattern. He has travelled through India, Vietnam, Thailand and Indonesia, where he worked on farms, including in rice paddies, and ate raw or pickled freshwater crab." +
      img(3, "stage1", "ct-miliary", 'Diffuse micronodular ("miliary") pattern on CT chest'),
    stages: [
      {
        title: "What do you send?",
        question: "Given this presentation, what do you send, specifically?",
        points: [
          "What is your differential, and how does the travel history shape it?",
          "Which test for each diagnosis?",
          "Which tests does advanced HIV (CD4 38) add?",
          "Which infections can't wait for results?",
        ],
        reveal: `
          <h4>Differential and tests</h4>
          <p><strong>Differential first</strong>, most to least likely, each paired with its test:</p>
          <ol>
            <li><strong>Miliary / disseminated TB</strong>
              <ul>
                <li><strong>Sputum</strong> (induced if he cannot expectorate) for smear, <strong>nucleic acid amplification test (NAAT)</strong>, and <strong>mycobacterial culture</strong>;</li>
                <li><strong>mycobacterial blood culture</strong>;</li>
                <li><strong>urine lateral-flow urine lipoarabinomannan assay (LF-LAM)</strong>. WHO conditionally recommends LAM in people with HIV and advanced disease (CD4 &le;100, WHO stage 3/4, or a danger sign). ${cite(33)}</li>
                <li>Cultures on specimens from any other involved site. ${cite(1)}</li>
              </ul>
            </li>
            <li><strong><em>Pneumocystis jirovecii</em> pneumonia (PCP)</strong> (CD4 38, progressive dyspnea)
              <ul><li>Induced sputum or bronchoalveolar lavage (BAL) for <em>Pneumocystis</em> testing. The Saudi National Tuberculosis Programme (NTP) algorithm for seriously ill people with HIV also advises considering PCP treatment alongside broad-spectrum antibiotics. ${cite(5)}</li></ul>
            </li>
            <li><strong>Disseminated cryptococcosis</strong>
              <ul><li><strong>Serum/plasma cryptococcal antigen (CrAg)</strong>. WHO <strong>strongly recommends CrAg screening before starting ART when CD4 &lt;100</strong>; a positive result &rarr; lumbar puncture. ${cite(34)}</li></ul>
            </li>
            <li><strong>Disseminated non-tuberculous mycobacteria (NTM)</strong> (typical at very low CD4)
              <ul><li>Mycobacterial blood culture with species identification.</li></ul>
            </li>
            <li><strong>Talaromycosis (<em>Talaromyces marneffei</em>)</strong>
              <ul>
                <li>An AIDS-defining invasive fungal infection of advanced HIV, endemic in <strong>tropical and subtropical Asia</strong>. Highest incidence in <strong>Southeast Asia, southern China and the Indian subcontinent</strong>. ${cite(35, 36)}</li>
                <li>Disseminated disease can cause <strong>skin lesions</strong>, and up to a third of diagnosed cases die. ${cite(35)}</li>
                <li>Test: <strong>fungal blood culture</strong> (the gold standard; growth takes up to 2&ndash;4 weeks), plus microscopy/culture of skin lesions, bone marrow or lymph node. Antigen tests are an alternative. ${cite(36)}</li>
                <li>Why it matters: amphotericin induction beat itraconazole on 24-week mortality (11.3% vs 21.0%, IVAP trial). ${cite(37)}</li>
              </ul>
            </li>
            <li><strong>Disseminated histoplasmosis</strong> (endemic in parts of India, e.g. the Gangetic plains ${cite(38)})
              <ul><li><strong>Circulating Histoplasma antigen</strong>, as WHO recommends for people with HIV. ${cite(34)}</li></ul>
            </li>
            <li><strong>Melioidosis (<em>Burkholderia pseudomallei</em>)</strong>
              <ul>
                <li>Endemic in tropical areas, <strong>especially Southeast Asia</strong>. <strong>Diabetes</strong> is the major risk factor. Most patients present with <strong>sepsis</strong>. Mortality can exceed <strong>40%</strong> in some regions. ${cite(39)}</li>
                <li>Test: <strong>blood culture, plus cultures of sputum and any pus or other sites</strong>, with the lab warned that melioidosis is suspected. Diagnosis rests on culture. ${cite(39)}</li>
              </ul>
            </li>
            <li><strong>Paragonimiasis (lung fluke)</strong>
              <ul>
                <li>Acquired by eating <strong>raw, pickled or undercooked freshwater crabs or crayfish</strong> (or raw wild-boar/deer meat). Causes subacute to chronic lung disease that <strong>mimics TB</strong> (cough, chest pain, haemoptysis). Test: <strong>serology</strong>; treatment: praziquantel. ${cite(40)}</li>
                <li>It is on this list only because of his raw-crab history, and it sits low: imaging usually shows <strong>nodules</strong> (often solitary) and <strong>pleural lesions/effusions</strong>, with <strong>eosinophilia</strong>. ${cite(41)} A <strong>diffuse miliary pattern with hepatosplenomegaly</strong> is not its typical picture.</li>
              </ul>
            </li>
            <li><strong>Lymphoma</strong>
              <ul><li>Tissue if nodes or masses are accessible.</li></ul>
            </li>
            <li><strong>Bacterial sepsis</strong>
              <ul><li>Routine blood cultures (less likely given the 3-week subacute course).</li></ul>
            </li>
          </ol>
          <h4>Also send</h4>
          <p><strong>Also:</strong> CD4 and HIV viral load if not already done.</p>`,
        pearl:
          "Put urine LAM in your first set of orders. In this population it can be your fastest positive result.",
      },
      {
        title: "Everything comes back negative. Does a negative LAM rule out TB?",
        context:
          "Spontaneous sputum smear x2: negative. Sputum NAAT: negative. Urine LAM: negative.",
        question: "Does a negative LAM rule out TB here?",
        points: [
          "How sensitive is urine LAM, and in whom?",
          "Who should get a LAM test at all?",
          "What does a negative result mean in this patient?",
        ],
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Source</th><th>Population</th><th>Sensitivity</th><th>Specificity</th><th>Key point</th></tr></thead>
              <tbody>
                <tr>
                  <td>Cochrane review, LF-LAM ${cite(42)}</td>
                  <td>Symptomatic HIV-positive adults</td>
                  <td>42% (95% CrI 31&ndash;55%)</td>
                  <td>91% (85&ndash;95%)</td>
                  <td>Sensitivity rises and specificity falls as CD4 declines</td>
                </tr>
                <tr>
                  <td>Same review, inpatients ${cite(42)}</td>
                  <td>Hospitalized HIV-positive adults</td>
                  <td>52% (40&ndash;64%)</td>
                  <td>87% (78&ndash;93%)</td>
                  <td>Better than outpatients (29% / 96%)</td>
                </tr>
                <tr>
                  <td>Same review, CD4 &le;100 ${cite(42)}</td>
                  <td>Advanced HIV</td>
                  <td>~56% (41&ndash;70%)</td>
                  <td>not separately reported</td>
                  <td>Best-performing subgroup, and still misses about half</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("CD4", "CrI", "LF-LAM")}
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>WHO LF-LAM policy update (2019) ${cite(33)}</td>
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
          ${abbrev("CD4", "CXR", "LAM", "LF-LAM", "NTP", "PLHIV")}
          <p><strong>Take-home:</strong> no. A negative LAM misses about half of TB even in the best subgroup. ${cite(42)} It must not delay further work-up, or empiric treatment in someone this sick.</p>`,
        pearl:
          "In advanced HIV, a positive LAM rules TB in; a negative one rules nothing out.",
      },
      {
        title: "What does a LAM result change clinically?",
        question: "Beyond accuracy, does LAM-guided care change outcomes?",
        points: [
          "Does LAM-guided care change outcomes, or only diagnosis?",
          "In which patients was the benefit shown?",
          "Is this patient one of them?",
        ],
        reveal: `
          <h4>Trials</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Population</th><th>Comparison</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td>Peter et al., Lancet 2016 ${cite(43)}</td>
                  <td>HIV-positive inpatients with suspected TB</td>
                  <td>LAM-guided treatment initiation vs standard care</td>
                  <td>Reduced 8-week mortality; greatest benefit in the sickest, most immunosuppressed, and those unable to expectorate</td>
                </tr>
                <tr>
                  <td>Gupta-Wright et al., STAMP, Lancet 2018 ${cite(44)}</td>
                  <td>Unselected HIV-positive inpatients</td>
                  <td>Urine LAM + urine Xpert added to sputum Xpert vs sputum Xpert alone</td>
                  <td>No reduction in overall 56-day mortality; benefit concentrated in high-risk subgroups</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("LAM")}
          <h4>What it means for this patient</h4>
          <p><strong>Take-home:</strong> this patient (CD4 38, hospitalized, unable to expectorate reliably) is exactly the phenotype where LAM-guided care showed benefit. ${cite(43)}</p>`,
        pearl:
          "Who gets tested changes what the evidence says as much as the test itself does. LAM's mortality benefit tracks with illness severity and CD4, not with HIV status alone.",
      },
      {
        title: "Initial tests negative, cultures pending: induced sputum or bronchoscopy?",
        context:
          "Initial smear, NAAT and LAM are negative; mycobacterial cultures are pending. The clinical and radiographic picture remains highly consistent with disseminated TB.",
        question:
          "What further respiratory sampling do you pursue, and how do you weigh sputum induction against bronchoscopy with BAL?",
        points: [
          "Induced sputum vs bronchoscopy: which comes first, and why?",
          "What do the comparison studies show, and why do they disagree?",
          "What changes if miliary TB is suspected?",
          "Is post-bronchoscopy sputum worth sending?",
          "Can the procedure itself lower culture yield?",
        ],
        reveal: `
          <h4>Studies</h4>
          <p>All are <strong>paired comparisons</strong> (both methods in the same patients), not randomized trials.</p>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Design</th><th>Comparison</th><th>Tests compared</th><th>Key result (induced sputum vs bronchoscopy)</th></tr></thead>
              <tbody>
                <tr><td>Anderson et al., AJRCCM 1995 ${cite(148)}</td><td>Prospective, 101 patients, Montreal; induced sputum 2&ndash;48 h before bronchoscopy</td><td>1 induced sputum vs 1 bronchoscopy</td><td>Fluorescent smear + culture</td><td>Smear 19% vs 12%; <strong>culture 77% vs 73%</strong>; cost C$22 vs C$188</td></tr>
                <tr><td>Conde et al., AJRCCM 2000 ${cite(149)}</td><td>Prospective, 251 patients, Rio de Janeiro (17% of TB cases HIV-positive)</td><td>1 induced sputum vs BAL, same day</td><td>ZN smear + culture</td><td>HIV-negative: smear 33.8% vs 38.1%, culture 66.9% vs 74.5%. HIV-positive: smear 36% vs 40%, culture 60% vs 60%. <strong>No significant difference</strong></td></tr>
                <tr><td>McWilliams et al., Thorax 2002 ${cite(45)}</td><td>Prospective, 129 subjects, smear-negative or unable to expectorate</td><td>3 induced sputum samples vs 1 bronchoscopy</td><td>Fluorescent smear + culture</td><td>Induced sputum detected 26/27 (96%) vs bronchoscopy 14/27 (52%) of smear-negative/culture-positive cases, p&lt;0.005; bronchoscopy smear yield zero; ~&#8531; of the cost</td></tr>
                <tr><td>Saglam et al., J Int Med Res 2005 ${cite(150)}</td><td>Prospective, 55 patients, Turkey, all HIV-negative</td><td>1 induced sputum vs bronchial lavage 18&ndash;24 h later</td><td>ZN smear + culture</td><td>Smear 47% vs 53%; culture 63% vs 67%; no significance test reported</td></tr>
                <tr><td>Brown et al., CID 2007 ${cite(151)}</td><td>Prospective, 140 inpatients unable to expectorate, London</td><td>Induced sputum (3&ndash;5 samples) vs BAL in 21 smear-negative patients</td><td>Auramine smear + culture</td><td>BAL added <strong>no cases</strong>: all 5 BAL-positive patients were already culture-positive on induced sputum, and BAL missed 2 induced-sputum-positive cases</td></tr>
                <tr><td>Musso et al., BMC Infect Dis 2025 ${cite(46)}</td><td>Retrospective, 215 patients, low-prevalence setting</td><td>2 induced sputum samples vs 1 BAL</td><td>Smear + PCR/Xpert + culture</td><td>Smear 1 vs 3 patients; <strong>PCR/Xpert 5 vs 20</strong>; culture 9 vs 15. Sensitivity 38.5% vs 84.6% (both 100% specificity)</td></tr>
                <tr><td>Luo et al., BMC Pulm Med 2020 ${cite(152)}</td><td>Meta-analysis, 5 paired studies, 586 patients</td><td>Induced sputum vs bronchoscopy</td><td>Smear + culture</td><td>Culture 72% vs 70%; smear 35% vs 38%; <strong>similar</strong></td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("BAL", "HIV", "PCR", "ZN")}
          <ul>
            <li>In Anderson 1995, induced-sputum culture sensitivity rose to <strong>87%</strong> when only patients with an adequate induced sample were counted. ${cite(148)}</li>
            <li><strong>Why Musso differs:</strong> the induction was mild (2% saline, stepped up from isotonic; quality judged by eye); patients were very paucibacillary (12% had TB, after two negative sputa and negative rapid tests); BAL's advantage came mostly from PCR/Xpert (20 vs 5) rather than culture (15 vs 9); and the reference standard was built from the two tests themselves. It is the only comparison that used PCR/Xpert. ${cite(46)}</li>
            <li><strong>Post-bronchoscopy sputum:</strong> ATS 2017 cites smear yields of 9&ndash;73% and culture yields of 35&ndash;71% (low confidence). ${cite(1)} In a London series, 4 of 57 smear-negative patients (7%) were culture-positive only on post-bronchoscopy sputum ${cite(153)}; in a prospective series of 495, adding it diagnosed 13 more patients and raised sensitivity from 77.9% to 81.9%. ${cite(154)}</li>
            <li><strong>The anaesthetic may lower culture yield.</strong> Topical anaesthetics inhibit <em>M. tuberculosis</em>. In 10 patients with consistently culture-positive sputum, sputum coughed up after tracheal lidocaine grew <em>M. tuberculosis</em> in only 5/10 (cultured within 1 h) and 3/10 (after 24 h); after tetracaine, in none. ${cite(155)} 1% lidocaine inhibited all 10 isolates tested in vitro. ${cite(156)} The effect on modern BAL culture or Xpert yield has not been measured.</li>
          </ul>
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
          </div>
          ${abbrev("ATS", "BAL", "CDC", "IDSA")}`,
        pearl:
          "The number of samples and the setting both change the answer. There is no universal winner, so know what is actually being compared before citing either study.",
      },
      {
        title: "Beyond respiratory samples: where else do you look?",
        question:
          "Given hepatosplenomegaly and a disseminated picture, which non-respiratory samples could give the diagnosis faster?",
        points: [
          "Which non-respiratory samples could give the diagnosis faster?",
          "In what order, least to most invasive?",
          "What tests go on each specimen?",
          "Does a granuloma prove TB here?",
        ],
        reveal: `
          <h4>Blood and accessible lesions</h4>
          <ul>
            <li><strong>Mycobacterial blood culture (plus fungal blood culture):</strong> non-invasive, and suited to a CD4 of 38. In a US series of disseminated TB, blood culture grew <em>M. tuberculosis</em> about as often as bone marrow (58% vs 54%). The series was small and retrospective, and these figures are likely overestimates. ${cite(146)}</li>
            <li><strong>Any reachable lymph node or skin lesion first:</strong> biopsies of localized disease gave the highest yield. ${cite(146)}</li>
          </ul>
          <h4>Bone marrow and liver</h4>
          <ul>
            <li><strong>Bone marrow aspirate and biopsy</strong> (smear, culture, histology), especially with cytopenias. In a Riyadh series of miliary TB, it was diagnostic in 8 of 11 patients (73%). ${cite(147)}</li>
            <li><strong>Liver biopsy</strong> if the liver is enlarged or the liver enzymes are abnormal: diagnostic in 14 of 16 patients (88%), and 13 of 14 when alkaline phosphatase was high. ${cite(147)}</li>
          </ul>
          <h4>At bronchoscopy</h4>
          <ul>
            <li><strong>If bronchoscopy is done:</strong> send BAL <strong>and</strong> transbronchial biopsy.</li>
          </ul>
          <h4>What to send on every specimen, and how to read it</h4>
          <ul>
            <li><strong>Granulomas are not specific to TB:</strong> talaromycosis and histoplasmosis, both on this patient's travel differential, can also involve the marrow, so send fungal culture too.</li>
          </ul>
          <p>For all extrapulmonary specimens: send <strong>acid-fast bacilli (AFB) smear, mycobacterial culture, NAAT, and histology</strong>. A positive result supports TB; a negative one never excludes it. ${cite(1)}</p>
          <p>Neither the ATS/IDSA/CDC nor the Saudi guideline specifically recommends marrow or liver biopsy. This is expert practice supported by case series. ${cite(1, 5)}</p>`,
        pearl:
          "In disseminated TB, the fastest diagnosis often comes from the organ that isn't the lung.",
      },
      {
        title: "When do you stop testing and just treat?",
        question:
          "Given ongoing negative microbiology despite reasonable escalation, how do you decide between further invasive testing and starting empiric treatment?",
        points: [
          "What is the cost of waiting in advanced HIV?",
          "Is a granuloma without a positive culture enough to treat?",
          "What does the Saudi algorithm say for a seriously ill patient with HIV?",
        ],
        reveal: `
          <h4>The cost of waiting</h4>
          <ul>
            <li>In disseminated TB with advanced HIV, delaying treatment carries a real mortality cost. Trial evidence ${cite(43)} supports acting on a strong clinical/radiographic picture.</li>
          </ul>
          <h4>Is histology enough?</h4>
          <ul>
            <li>Necrotizing (caseating) granulomas on histopathology, even with a negative culture, are generally accepted as sufficient to treat as TB in the right clinical context. Histology still has to be read in that context, "because neither false-positive nor false-negative results are rare". ${cite(1)}
              ${img(3, "stage6", "histopath", "Necrotizing (caseating) granulomas on biopsy histopathology")}
            </li>
          </ul>
          <h4>Saudi algorithm for seriously ill patients with HIV</h4>
          <ul>
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
        points: [
          "When do you start ART, and does CD4 change the timing?",
          "What does the trial evidence show?",
          "What is the exception to early ART?",
          "What must you watch for after starting ART?",
          "What else must be added (prophylaxis, interactions)?",
        ],
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Trial</th><th>Population</th><th>Comparison</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>CAMELIA</strong>, NEJM 2011 ${cite(47)}</td>
                  <td>CD4 &le;200 (median 25)</td>
                  <td>ART at <strong>2 wk vs 8 wk</strong> after TB treatment</td>
                  <td><strong>Deaths 18% vs 27%</strong> (HR 0.62); TB-IRIS HR 2.51</td>
                </tr>
                <tr>
                  <td><strong>STRIDE</strong>, NEJM 2011 ${cite(48)}</td>
                  <td>CD4 &lt;250 (median 77)</td>
                  <td>&le;2 wk vs 8&ndash;12 wk</td>
                  <td>Overall no difference; <strong>CD4 &lt;50: AIDS/death 15.5% vs 26.6%</strong> (P=0.02); IRIS 11% vs 5%</td>
                </tr>
                <tr>
                  <td><strong>SAPiT</strong>, NEJM 2011 ${cite(49)}</td>
                  <td>CD4 &lt;500, smear-positive</td>
                  <td>Within 4 wk vs continuation phase</td>
                  <td><strong>CD4 &lt;50: 8.5 vs 26.3 per 100 PY</strong>; IRIS 20.1 vs 7.7 per 100 PY</td>
                </tr>
                <tr>
                  <td><strong>PredART</strong>, NEJM 2018 ${cite(50)}</td>
                  <td>CD4 &le;100, starting ART</td>
                  <td><strong>Prednisone 40 mg/d &times;14 d, then 20 mg/d &times;14 d</strong> vs placebo</td>
                  <td><strong>TB-IRIS 32.5% vs 46.7%</strong> (RR 0.70); no excess severe infections or cancers</td>
                </tr>
                <tr>
                  <td><strong>T&ouml;r&ouml;k</strong>, CID 2011 ${cite(51)}</td>
                  <td>HIV-associated <strong>TB meningitis</strong></td>
                  <td>Immediate vs deferred (2 mo) ART</td>
                  <td>No survival benefit; <strong>more grade 4 adverse events</strong> with immediate ART</td>
                </tr>
                <tr>
                  <td><strong>INSPIRING</strong>, CID 2020 ${cite(52)}</td>
                  <td>On rifampicin-based TB treatment, <strong>CD4 &ge;50</strong></td>
                  <td><strong>Dolutegravir 50 mg twice daily</strong> (during TB treatment and for 2 wk after) vs efavirenz</td>
                  <td>Viral suppression 75% vs 82% (non-comparative); TB-IRIS uncommon</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("AIDS", "ART", "CD4", "HR", "IRIS", "PY", "RR")}
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>WHO (2021, reprinted in Module 4 2025) ${cite(7)}</td>
                  <td><strong>Start ART as soon as possible within 2 weeks of starting TB treatment, regardless of CD4</strong></td>
                  <td>Strong, low&ndash;moderate certainty (adults)</td>
                </tr>
                <tr>
                  <td>Saudi NTP Manual (2021) ${cite(5)}</td>
                  <td>ART for all PLHIV with TB regardless of CD4: <strong>within 2 weeks if CD4 &le;50, within 8 weeks if CD4 &gt;50</strong>; caution with early ART in <strong>TB meningitis</strong>; <strong>co-trimoxazole for all HIV-positive TB patients</strong>, started as soon as possible and given throughout TB treatment (&sect;8.5.4, &sect;8.5.6)</td>
                  <td>Not graded in the manual</td>
                </tr>
                <tr>
                  <td>WHO advanced HIV disease ${cite(34)}</td>
                  <td><strong>Defer ART when TB meningitis or cryptococcal meningitis is suspected</strong>, because of the risk of life-threatening paradoxical worsening</td>
                  <td>&mdash;</td>
                </tr>
                <tr>
                  <td>WHO HIV (2021) ${cite(53)}</td>
                  <td><strong>Co-trimoxazole prophylaxis for all people with HIV and active TB, regardless of CD4</strong></td>
                  <td>Strong, high certainty</td>
                </tr>
                <tr>
                  <td>WHO advanced HIV disease ${cite(34)}</td>
                  <td><strong>CrAg screening before ART if CD4 &lt;100</strong>; pre-emptive antifungal therapy if positive</td>
                  <td>Strong, moderate certainty</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("ART", "CD4", "CrAg", "NTP", "PLHIV")}
          <h4>What this means for this patient (CD4 38, no meningitis)</h4>
          <ul>
            <li>ART within 2 weeks ${cite(7, 5)};</li>
            <li><strong>co-trimoxazole now</strong> ${cite(5, 53)};</li>
            <li><strong>CrAg before ART</strong> (see Stage 1) ${cite(34)};</li>
            <li>consider <strong>prednisone</strong> to prevent immune reconstitution inflammatory syndrome (IRIS) (PredART eligibility met) ${cite(50)};</li>
            <li>if dolutegravir is used with rifampicin, give it <strong>twice daily</strong> ${cite(52)}.</li>
            <li><strong>Saudi vs WHO timing:</strong> for this patient (CD4 38) both say <strong>within 2 weeks</strong>. They differ <strong>above CD4 50</strong>: the Saudi NTP Manual (2021) allows <strong>up to 8 weeks</strong>, while WHO 2021 says <strong>within 2 weeks regardless of CD4</strong>. ${cite(5, 7)}</li>
            <li>INSPIRING enrolled CD4 &ge;50, so the dolutegravir evidence at his CD4 is extrapolated. ${cite(52)} If talaromycosis were confirmed, its treatment and ART timing would need separate guidance, which this case does not cover.</li>
            <li><strong>If he had signs of meningitis:</strong> check for TB and cryptococcal meningitis first; ART is deferred in both. ${cite(34)}</li>
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
    section: "extrapulmonary",
    title: "29-year-old expatriate worker with fever, night sweats, and mediastinal lymphadenopathy",
    hubDescription:
      "Fever, night sweats and mediastinal lymphadenopathy with no lung findings: a broad differential, choosing how and where to biopsy, then treatment duration and paradoxical reactions.",
    vignette:
      "29-year-old expatriate construction worker from India, living in Saudi Arabia, no significant past medical history, presents with 6 weeks of low-grade fever and night sweats. No cough, no respiratory symptoms. Computed tomography (CT) chest shows bilateral hilar and mediastinal lymphadenopathy without any parenchymal lung lesion." +
      img(4, "stage1", "ct-lymphadenopathy", "Bilateral hilar and mediastinal lymphadenopathy without parenchymal lung lesion"),
    stages: [
      {
        title: "What do you pursue first, and why not sputum?",
        question:
          "Given this presentation, what do you pursue first, specifically — and why wouldn't a standard TB sputum workup be your starting point here?",
        points: [
          "How does his origin change the pre-test probability?",
          "What is your differential, from most to least likely?",
          "Why is sputum not the starting point?",
          "What do you send from a single node sample?",
        ],
        reveal: `
          <h4>Pre-test probability</h4>
          <p><em>Why his origin matters:</em> India has the largest TB burden of any country ${cite(11)}, which raises his pre-test probability for TB.</p>
          <h4>Differential and tests</h4>
          <p><strong>Differential first</strong>, most to least likely, each paired with its test:</p>
          <ol>
            <li><strong>TB lymphadenitis</strong>
              <ul><li><strong>Endobronchial ultrasound-guided transbronchial needle aspiration (EBUS-TBNA)</strong> of the largest accessible node for <strong>acid-fast bacilli (AFB) smear, mycobacterial culture, and nucleic acid amplification test (NAAT)</strong>, plus <strong>cytology/histology</strong> for granulomas. On extrapulmonary specimens, a positive culture or NAAT supports TB; a <strong>negative never excludes it</strong>. ${cite(1)}</li></ul>
            </li>
            <li><strong>Sarcoidosis</strong>
              <ul><li>The same EBUS-TBNA looking for <strong>non-necrotizing granulomas</strong>. EBUS finds granulomas far more often than conventional bronchoscopy. ${cite(54)}</li></ul>
            </li>
            <li><strong>Lymphoma</strong>
              <ul><li><strong>Flow cytometry</strong> on the same aspirate, with a low threshold for a core/tissue biopsy (see Stage 4). ${cite(55, 56, 57)}</li></ul>
            </li>
            <li><strong>Metastatic malignancy</strong>
              <ul><li>Cytology on the same aspirate.</li></ul>
            </li>
            <li><strong>Fungal lymphadenitis (histoplasmosis)</strong>
              <ul><li><strong>Fungal stain and culture</strong> on the same specimen. No extra procedure is needed. Histoplasmosis is reported from India, with most cases from the <strong>Gangetic plains</strong>. ${cite(38)}</li></ul>
            </li>
          </ol>
          <p><strong>Also:</strong> an <strong>HIV test</strong>. CDC and WHO recommend routine HIV testing for everyone with presumptive TB. ${cite(3)}</p>
          <h4>Why not sputum?</h4>
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
        points: [
          "Does a negative smear and NAAT rule out TB in a lymph node?",
          "What does necrosis tell you: TB or sarcoidosis?",
          "How can you raise the yield of the same sample?",
          "Treat now or wait for culture?",
        ],
        reveal: `
          <h4>Does a negative smear and NAAT rule out TB?</h4>
          <ul>
            <li><strong>No, this doesn't rule out TB.</strong> Lymph node TB is paucibacillary, and negative smear/NAAT results on extrapulmonary tissue are common. ${cite(1)}</li>
          </ul>
          <h4>Necrosis: TB or sarcoidosis?</h4>
          <ul>
            <li><strong>Necrotizing granulomas favor TB over sarcoidosis.</strong>
              <ul>
                <li>Sarcoidosis is defined by <strong>non-necrotizing</strong> granulomas, plus exclusion of other granulomatous causes. ${cite(58)}</li>
                <li>In 179 patients having EBUS-TBNA in India, necrosis was seen in <strong>56% of TB</strong> but only <strong>6% of sarcoidosis</strong>. In sarcoidosis it was always focal, never extensive. Cytology alone still misclassified about <strong>29%</strong> of cases. ${cite(59)}</li>
              </ul>
            </li>
          </ul>
          <h4>Raising the yield</h4>
          <ul>
            <li><strong>Adding TB-PCR to the EBUS specimen raises the yield.</strong> In 21 patients with TB lymphadenitis, EBUS-TBNA diagnostic accuracy was <strong>57.1%</strong> with histology plus conventional microbiology and <strong>71.4% once TB-PCR on the rinse fluid was added</strong> (p&lt;0.001). <strong>Nodes showing necrosis gave more positive microbiology.</strong> ${cite(60)}</li>
          </ul>
          <h4>Treat now, or wait for culture?</h4>
          <ul>
            <li><strong>In the right epidemiologic context</strong> (here, a young man from India), necrotizing granulomas with a pending culture are enough to <strong>start empiric treatment</strong>. ATS/CDC/IDSA guidance is that empiric multidrug treatment is started in almost all situations in which active TB is suspected, without waiting for culture. ${cite(3)}</li>
          </ul>`,
        pearl:
          "In lymph node TB, the absence of microbiologic proof is not the absence of disease. Histology and epidemiology are doing real diagnostic work.",
      },
      {
        title: "EBUS-TBNA performs very differently across the three diagnoses",
        question:
          "How does EBUS-TBNA's yield differ across TB, sarcoidosis, and lymphoma?",
        points: [
          "How well does EBUS-TBNA diagnose TB, sarcoidosis and lymphoma?",
          "Why is lymphoma the hardest?",
          "Can these numbers be compared directly?",
        ],
        reveal: `
          <h4>Yield by diagnosis</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Condition</th><th>EBUS-TBNA yield</th><th>Key limitation</th></tr></thead>
              <tbody>
                <tr>
                  <td>Sarcoidosis</td>
                  <td>Diagnostic yield <strong>80% vs 53%</strong> (endosonography vs bronchoscopy; GRANULOMA RCT). By stage (exploratory): <strong>stage I 84% vs 38%</strong>; stage II 77% vs 66% (not significant). Granuloma detection 74% vs 48%. ${cite(54)}</td>
                  <td>The advantage is largest in stage I</td>
                </tr>
                <tr>
                  <td>TB lymphadenitis</td>
                  <td>Sensitivity <strong>59%</strong> in an unselected London cohort (culture confirmed 35%, cytology 24%) ${cite(61)}; accuracy <strong>57% &rarr; 71%</strong> when TB-PCR was added on rinse fluid ${cite(60)}</td>
                  <td>Paucibacillary; cytology + culture alone under-detect</td>
                </tr>
                <tr>
                  <td>Lymphoma (new / de novo)</td>
                  <td>Pooled sensitivity <strong>67% for a new diagnosis</strong> (78% for recurrence) ${cite(55)}; about 15% in a small, selected multicentre cohort ${cite(57)}</td>
                  <td>Aspirate cytology rarely gives the architecture needed for subtyping ${cite(56)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("EBUS-TBNA", "PCR", "RCT")}
          <h4>How to read these figures</h4>
          <p style="color:var(--text-muted); font-size:0.9rem;">Figures come from different study designs and measures (granuloma detection or diagnostic yield in a randomized controlled trial (RCT), sensitivity or accuracy in cohorts, pooled sensitivity), so compare them with caution.</p>
          <p><em>Optional reference comparator:</em></p>
          ${img(4, "stage3", "histopath-non-necrotizing-granuloma", "Non-necrotizing granuloma (sarcoidosis comparator) — optional reference image")}`,
        pearl:
          "The same procedure is excellent for one diagnosis, moderate for the second, and unreliable for the third. Know which one worries you most.",
      },
      {
        title: "When standard EBUS-TBNA isn't enough",
        question:
          "If lymphoma is the concern and needle aspiration is non-diagnostic, what gets you tissue architecture?",
        points: [
          "What does a needle aspirate miss in lymphoma?",
          "Which techniques get tissue architecture, and at what cost?",
        ],
        reveal: `
          <h4>Getting tissue architecture</h4>
          <ul>
            <li>EBUS-guided <strong>forceps or cryoprobe biopsy</strong> through the same tract obtains tissue architecture rather than cytology alone.</li>
            <li>Across all diagnoses, forceps or cryoprobe biopsy gave a pooled diagnostic yield of <strong>86% vs 78%</strong> for aspiration (13 studies), at the cost of slightly more complications. ${cite(62)}</li>
          </ul>
          <h4>In lymphoma</h4>
          <ul>
            <li>In a small, selected multicentre cohort (40 patients with confirmed lymphoma, both techniques in the same node), cryobiopsy sensitivity was <strong>92% vs 15%</strong> for aspiration in new lymphoma, and <strong>100% vs 14%</strong> in recurrence. ${cite(57)}</li>
          </ul>`,
        pearl:
          "For lymphoma, the question isn't \"is it malignant?\" but \"which lymphoma?\". That needs architecture, not just cells.",
      },
      {
        title: "EBUS-accessible nodes are non-diagnostic, or the node is out of reach. What next?",
        question:
          "Say the EBUS-reachable nodes were non-diagnostic, or the most suspicious node sits somewhere EBUS can't reach — how do you choose between repeating EBUS, going to CT-guided (interventional radiology, IR) biopsy, or a surgical approach?",
        points: [
          "Which node stations can EBUS and EUS reach?",
          "When is CT-guided biopsy the better choice?",
          "How do the complication rates compare?",
          "When do you go to surgery?",
        ],
        reveal: `
          <h4>Where EBUS and EUS reach</h4>
          <ul>
            <li><strong>Where EBUS reaches:</strong>
              <div class="side-by-side">
                <div>
                  <ul>
                    <li><strong>EBUS</strong> samples nodes against the trachea and bronchi: <strong>stations 2R/2L, 4R/4L, 7, 10 and 11&ndash;12</strong>.</li>
                    <li><strong>Through the oesophagus (EUS/EUS-B)</strong>: <strong>2L, 4L, 7, 8 and 9</strong>.</li>
                    <li><strong>Stations 5 and 6</strong> (subaortic/para-aortic) can be seen by endoscopic ultrasound (EUS) but can <strong>rarely be sampled without traversing the pulmonary artery or aorta</strong>. <strong>Video-assisted thoracoscopic surgery (VATS) is the method of choice</strong> for them.</li>
                  </ul>
                  No single sampling method reaches every station. ${cite(63)}
                </div>
                ${img(4, "stage5", "node-stations", "Original schematic. Station numbering follows the IASLC lymph node map; which technique reaches each station follows the ESGE/ERS/ESTS 2015 guideline. " + cite(63))}
              </div>
            </li>
          </ul>
          <h4>CT-guided biopsy</h4>
          <ul>
            <li><strong>CT-guided (IR) core biopsy</strong> fills anatomic gaps and yields a true tissue core, which matters if lymphoma subtyping is needed.</li>
          </ul>
          <h4>Safety</h4>
          <ul>
            <li><strong>Safety trade-off:</strong>
              <ul>
                <li><strong>EBUS:</strong> in a systematic review of 16,181 endosonography procedures, serious adverse events occurred in <strong>0.14% overall and 0.05% with EBUS</strong>, with <strong>no deaths</strong>. ${cite(64)}</li>
                <li><strong>CT-guided biopsy:</strong> in one series of 155 procedures, complications occurred in <strong>13.5%</strong>, with <strong>chest-tube pneumothorax in 1.9%</strong>. ${cite(65)}</li>
              </ul>
            </li>
          </ul>
          <h4>If lymphoma is still suspected</h4>
          <ul>
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
        points: [
          "How long do you treat TB lymphadenitis?",
          "Do enlarging nodes mean treatment failure?",
          "How common is this, and how do you confirm it?",
          "What should you <em>not</em> do?",
        ],
        reveal: `
          <h4>Duration</h4>
          <ul>
            <li><strong>Duration:</strong> a <strong>6-month regimen</strong> is adequate for drug-susceptible TB lymphadenitis. ${cite(3)}</li>
          </ul>
          <h4>Enlarging nodes: what and how common?</h4>
          <ul>
            <li><strong>Enlarging or new nodes during or after treatment</strong> can occur <strong>without any bacteriological relapse</strong>. This is a <strong>paradoxical reaction</strong>. ${cite(3)}</li>
            <li><strong>How common:</strong>
              <ul>
                <li>In HIV-negative patients with extrapulmonary TB, paradoxical reactions occurred in <strong>25%</strong>, mostly in lymph nodes, at a <strong>median of 86 days</strong> into treatment. ${cite(66)}</li>
                <li>Reviews report <strong>13&ndash;35%</strong> in lymph node TB. ${cite(67)}</li>
              </ul>
            </li>
          </ul>
          <h4>What to do</h4>
          <ul>
            <li><strong>What to do:</strong>
              <ul>
                <li>Confirm <strong>adherence</strong> and <strong>drug susceptibility</strong>;</li>
                <li><strong>re-sample if in doubt</strong>. In paradoxical reactions, <strong>culture is negative</strong>, even if AFB smear or Xpert is positive (dead bacilli). ${cite(67)}</li>
                <li><strong>Do not change or extend the regimen</strong> for enlargement alone.</li>
                <li>Therapeutic excision is not indicated except in unusual circumstances; fluctuant nodes about to drain may be aspirated. ${cite(3)}</li>
                <li>Corticosteroids are used for severe cases. ${cite(66)}</li>
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
    section: "pulmonary",
    title: "32-year-old ICU nurse with an unmasked TB exposure",
    hubDescription:
      "A high-risk occupational TB exposure: who counts as exposed, the window period, a pneumonia that isn't TB, IGRA vs TST, and short-course preventive treatment.",
    vignette:
      "32-year-old Egyptian intensive care unit (ICU) nurse at a tertiary hospital in Riyadh. She received bacille Calmette-Guérin (BCG) in childhood. She had an unmasked, prolonged exposure to a ventilated patient who was later confirmed to have smear-positive, NAAT-positive, cavitary pulmonary TB. The exposure happened before the patient was placed in airborne isolation. She assisted with intubation and open suctioning.",
    stages: [
      {
        title: "Who counts as exposed, and what do you do now?",
        question:
          "A colleague reports the exposure. Who counts as exposed, and what do you do now?",
        points: [
          "When did the index patient become infectious, and when did that end?",
          "What was her exposure window?",
          "What raises her priority as a contact?",
          "How infectious was the source?",
          "What do you do now, and when do you test?",
          "When can people mix again (community, congregate settings, hospital)?",
        ],
        reveal: `
          <h4>1. Define the index patient's infectious period ${cite(4)}</h4>
          <ul>
            <li><strong>Start:</strong> 3 months <strong>before the TB diagnosis</strong>. Start earlier if the patient reports a longer illness. ${cite(4)}
              <ul>
                <li><strong>Saudi National Tuberculosis Programme (NTP) Manual:</strong> "3 months before symptom onset or first positive finding" (&sect;14.6.3). Its definitions section uses "3 months before initiation of treatment" and calls the 3-month period "somewhat arbitrary", a general guideline (&sect;14.1). ${cite(5)}</li>
                <li><strong>Teaching point:</strong> all sources use <strong>~3 months</strong>. They differ only on the anchor (diagnosis, symptom onset, or treatment start). When in doubt, take the <strong>earliest</strong> anchor.</li>
              </ul>
            </li>
            <li><strong>End of the infectious period (for contact tracing):</strong> only when <strong>all three</strong> apply:
              <ol>
                <li>more than 2 weeks of effective treatment (confirmed by susceptibility results);</li>
                <li>fewer symptoms;</li>
                <li>a microbiologic response, such as a falling smear grade.</li>
              </ol>
            </li>
          </ul>
          <h4>2. Her exposure window</h4>
          <p>Her exposure window is the time she spent with the patient <strong>inside that infectious period, before airborne isolation and N95 use began</strong>. Once those were in place, she was no longer exposed. ${cite(4)}</p>
          <h4>3. What raises her priority as a contact (ICU-specific) ${cite(68)}</h4>
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
                  <td>Lower but real: relative transmission <strong>~0.22&ndash;0.24</strong> vs smear-positive. These patients caused <strong>~13&ndash;17% of transmission</strong> in genotyping studies ${cite(69, 70)}</td>
                  <td>Contacts still need evaluation, with lower urgency</td>
                </tr>
                <tr>
                  <td><strong>Smear-negative, NAAT-positive</strong></td>
                  <td>NTCA 2024 groups <strong>smear and/or NAAT positivity</strong> and cavitation as markers of higher pre-treatment bacterial burden, and so of more infectiousness (Rec 3.1, <strong>strong, moderate certainty</strong>). A <strong>lower NAAT Ct value</strong> may indicate higher burden. No study gives a separate transmission rate for this group ${cite(71)}</td>
                  <td>Treat as potentially infectious; prioritize by exposure intensity</td>
                </tr>
                <tr>
                  <td><strong>Smear- and NAAT-negative</strong> (culture-positive or clinically diagnosed)</td>
                  <td>Lowest, but <strong>not zero</strong>: minimum transmission risk <strong>~5% (95% CI 0&ndash;11)</strong> vs ~35% with NAAT-positive patients (relative ~0.14). Based on an earlier-generation NAAT, not Xpert or Ultra; both patients who transmitted started treatment late ${cite(72)}</td>
                  <td>Lower priority, but not zero. <strong>Saudi NTP:</strong> still investigate if the CXR shows <strong>cavities</strong>, even with 3 negative smears (&sect;14.4) ${cite(5)}</td>
                </tr>
                <tr>
                  <td><strong>Already on effective treatment</strong></td>
                  <td>Infectiousness falls fast: most are low/non-infectious <strong>after &ge;5 days</strong> of effective therapy, regardless of sputum results (NTCA Rec 3.2 strong/moderate; Rec 3.3 conditional/moderate) ${cite(71)}. Saudi NTP: "less contagious within few days to two weeks" (&sect;14.5.4) ${cite(5)}</td>
                  <td>Exposure <strong>before</strong> treatment is what counts, which applies to this nurse</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("CI", "CXR", "NAAT", "NTCA", "NTP")}
          <p>Contact-side modifiers (these change <strong>urgency</strong>, not infectiousness):</p>
          <ul>
            <li>people with <strong>HIV</strong> progress faster than with any other known risk factor, <strong>35&ndash;162 per 1,000 person-years</strong>;</li>
            <li><strong>children &lt;5</strong> progress faster and get more disseminated disease. ${cite(4)}</li>
            <li>See Stage 2 for what this means in practice.</li>
          </ul>
          <h4>5. What to do now ${cite(73)}</h4>
          <ul>
            <li><strong>Symptom evaluation now</strong>, for everyone exposed.</li>
            <li><strong>Baseline interferon-gamma release assay (IGRA) or tuberculin skin test (TST)</strong> for those <strong>without</strong> documented prior latent TB infection (LTBI) or TB.</li>
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
                  <td>CDC healthcare-settings TB guideline (2005) ${cite(68)}</td>
                  <td>Aerosol-generating procedures, proximity/duration and ventilation drive healthcare-associated transmission</td>
                  <td>Not GRADE-rated</td>
                </tr>
                <tr>
                  <td>NTCA/CDC healthcare personnel (2019) ${cite(73)}</td>
                  <td>Symptom evaluation for all exposed staff. Test those without prior LTBI/TB. Retest at 8&ndash;10 weeks, same test. No retest if documented prior positive</td>
                  <td>Not GRADE-rated</td>
                </tr>
                <tr>
                  <td>Saudi NTP Manual (2021) ${cite(5)}</td>
                  <td>Start the contact investigation as soon as possible, generally <strong>within 1 week</strong> of diagnosis. Contacts get history, exam and a <strong>TST</strong>. If the TST is positive &rarr; CXR; if the CXR is abnormal or symptoms are present &rarr; sputum smear or Xpert (&sect;14.3, &sect;14.6.8). <strong>No 8&ndash;10-week retest is described</strong></td>
                  <td>Not graded</td>
                </tr>
                <tr>
                  <td>NTCA community isolation guideline (2024) ${cite(71)}</td>
                  <td>Most people with TB can stop <strong>community</strong> respiratory isolation after <strong>5 days of effective treatment</strong>, with exceptions: drug resistance, vulnerable contacts (children &lt;5, immunosuppressed), poor response or adherence. Extension beyond 14 days needs expert review</td>
                  <td>Rec 3.2 strong/moderate; Rec 3.3 and 4.2&ndash;4.3 conditional/moderate</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("CDC", "CXR", "GRADE", "LTBI", "NTCA", "NTP", "TST")}
          <p><strong>"5 days" vs "2 weeks": these answer different questions.</strong></p>
          <ul>
            <li><strong>NTCA 2024</strong> decides when a person on treatment can stop <strong>community</strong> restrictions. The guideline is explicitly for <strong>community settings</strong>. ${cite(71)}</li>
            <li><strong>CDC 2005</strong> defines the <strong>infectious period</strong> used to decide <strong>who counts as a contact</strong>. It ends only after &gt;2 weeks of effective treatment plus clinical and microbiologic response. ${cite(4)}</li>
            <li><strong>Hospital airborne isolation</strong> follows healthcare-setting rules: for example, three consecutive negative acid-fast bacilli (AFB) smears, 8&ndash;24 h apart, one early morning. ${cite(68)}</li>
            <li>For this ICU case, the nurse's exposure was <strong>before any treatment</strong>, so the 5-day rule doesn't shorten her exposure window.</li>
            <li><strong>Before returning to a congregate setting</strong> (e.g. shelter, prison, care facility), the bar is higher: &ge;3 consecutive negative sputum smears, collected &gt;8 h apart, one early morning. This is not the hospital isolation rule. ${cite(4)}</li>
          </ul>`,
        pearl:
          "Being \"exposed\" is a time window, not an event. It starts about 3 months before diagnosis and closes when isolation begins. Define it first, then list who was inside it.",
      },
      {
        title: "Baseline IGRA on day 3 is negative. Is she cleared?",
        context: "Baseline IGRA at day 3 post-exposure: negative. No symptoms.",
        question:
          "Does this rule out infection? What's next, and does the choice between TST and IGRA matter here?",
        points: [
          "What does a day-3 negative IGRA mean?",
          "When should you repeat it?",
          "IGRA or TST in a BCG-vaccinated workforce?",
          "Who gets treatment during the window before the repeat test?",
        ],
        reveal: `
          <ul>
            <li><strong>No.</strong> It takes up to <strong>8&ndash;10 weeks</strong> after exposure for the immune response to become detectable. A negative test before 8 weeks cannot exclude infection. ${cite(4)}</li>
            <li><strong>Repeat at 8&ndash;10 weeks after the last exposure</strong>, with the <strong>same test type</strong>. Switching tests makes "conversion" hard to interpret. ${cite(73)}</li>
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
            <li><strong>Saudi data</strong> from 1,595 healthcare workers at a Riyadh tertiary centre: <strong>90.6% were BCG-vaccinated</strong>; TST was positive in <strong>31.5%</strong> and QuantiFERON (QFT) in <strong>25%</strong>, with high discordance; BCG and South-East Asian origin were associated with TST positivity. ${cite(74)}</li>
            <li>A 2026 meta-analysis of healthcare workers found pooled positivity of <strong>22% by IGRA vs 38% by TST</strong>; <strong>TST positivity tracked BCG vaccination rates, but IGRA positivity did not</strong>. ${cite(75)}</li>
          </ul>
          <h4>Anyone to treat before the repeat test? ${cite(4)}</h4>
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
          "Ten days after the exposure she develops <strong>rhinorrhea, fever, cough and shortness of breath</strong>. SpO<sub>2</sub> is 96% on room air, she has no comorbidities, and she is managed as an outpatient. <strong>Chest radiograph (CXR) shows right lower lobe consolidation.</strong>",
        question: "Does this change your TB plan? How do you manage her?",
        points: [
          "How likely is TB 10 days after exposure?",
          "How do you manage her now?",
          "What do the guidelines say?",
        ],
        reveal: `
          <p><strong>Differential first</strong>, most to least likely:</p>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Diagnosis</th><th>Test</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>Bacterial CAP</strong> (e.g. <em>S. pneumoniae</em>)</td>
                  <td>Clinical diagnosis plus CXR (done). Blood and sputum cultures are not routine outside severe or hospitalized cases ${cite(76)}</td>
                </tr>
                <tr>
                  <td><strong>Viral pneumonia</strong> (influenza, SARS-CoV-2, RSV)</td>
                  <td><strong>Respiratory viral NAAT</strong>, especially influenza when it is circulating ${cite(77)}</td>
                </tr>
                <tr>
                  <td><strong>Atypical bacterial CAP</strong> (<em>Mycoplasma</em>, <em>Chlamydophila</em>)</td>
                  <td>Clinical; atypical testing when indicated ${cite(76)}</td>
                </tr>
                <tr>
                  <td><strong>Pulmonary TB</strong> (least likely at day 10)</td>
                  <td>Only if the course is atypical (see below): sputum AFB smear, culture, NAAT ${cite(1)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("AFB", "CAP", "CXR", "NAAT", "RSV")}
          <h4>How likely is TB now? ${cite(78)}</h4>
          <ul>
            <li>After infection, the TST converts within <strong>&lt;6 weeks</strong>.</li>
            <li>Active TB typically appears <strong>3&ndash;9 months</strong> later, and <strong>almost always within 2 years</strong>.</li>
            <li><strong>Disease 10 days after exposure would be biologically implausible.</strong></li>
          </ul>
          <h4>Management</h4>
          <ul>
            <li><strong>Treat as community-acquired pneumonia (CAP).</strong>
              <ul>
                <li><strong>ATS/IDSA 2019</strong> (healthy outpatient): <strong>amoxicillin 1 g three times daily</strong> (strong); doxycycline (conditional); a macrolide only where pneumococcal macrolide resistance is &lt;25%. ${cite(77)}</li>
                <li><strong>Saudi Thoracic Society 2025:</strong> <strong>beta-lactams first-line</strong>. In outpatients it suggests <strong>macrolides over fluoroquinolones</strong> (conditional, very low certainty). It reserves quinolones as second-line in children because TB is endemic in the region. ${cite(76)}</li>
              </ul>
            </li>
            <li><strong>Avoid an empiric fluoroquinolone here.</strong> In a meta-analysis, empiric fluoroquinolones for pneumonia <strong>delayed TB diagnosis and treatment by ~19 days</strong> and raised the odds of <strong>fluoroquinolone-resistant <em>M. tuberculosis</em></strong> (odds ratio (OR) <strong>2.70</strong>). ${cite(79)} This matters in anyone with a recent TB exposure.</li>
            <li><strong>No airborne isolation and no TB work-up</strong> unless the course is atypical: no response to appropriate CAP treatment, cavitation, or symptoms that persist.</li>
            <li><strong>Keep the scheduled 8&ndash;10-week repeat IGRA.</strong> The pneumonia doesn't change it.</li>
          </ul>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr>
                  <td>ATS/IDSA CAP (2019) ${cite(77)}</td>
                  <td>Healthy outpatient: amoxicillin, <strong>or</strong> doxycycline, <strong>or</strong> a macrolide if local resistance &lt;25%</td>
                  <td>Strong/moderate; conditional/low; conditional/moderate</td>
                </tr>
                <tr>
                  <td>ATS/IDSA CAP (2019) ${cite(77)}</td>
                  <td>Test for influenza with a rapid molecular assay when influenza is circulating</td>
                  <td>Strong, moderate</td>
                </tr>
                <tr>
                  <td>Saudi Thoracic Society CAP (2025) ${cite(76)}</td>
                  <td>Outpatient: macrolides over fluoroquinolones; beta-lactams first-line</td>
                  <td>Conditional, very low</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("ATS", "CAP", "IDSA")}`,
        pearl:
          "Don't anchor on the exposure. TB takes months, not days. A lobar pneumonia at day 10 is pneumonia, and the drug you choose for it (not a fluoroquinolone) protects the TB work-up you may need later.",
      },
      {
        title: "Nine weeks later, repeat IGRA positive. Now what?",
        context: "Nine weeks later, the repeat IGRA is positive. The CAP has resolved.",
        question:
          "What must you establish before treating, and why treat at all?",
        points: [
          "What must you exclude before treating infection?",
          "What is her risk of progressing to disease, and when is it highest?",
          "Which conditions raise that risk, and which of them mean you should test and treat?",
        ],
        reveal: `
          <h4>Before treating</h4>
          <ul>
            <li><strong>Symptom evaluation plus CXR</strong> for everyone with a new positive test, with sputum studies if either is abnormal. ${cite(73, 1)}</li>
            <li>IGRA and TST cannot tell latent from active TB, so disease must be excluded before starting LTBI treatment. ${cite(1)}</li>
            <li><strong>Why it matters:</strong> preventive treatment given for unrecognized active TB under-treats the disease. Trials have not shown a significant rise in drug resistance, but that risk cannot be excluded, so active TB must be ruled out first.
              <ul>
                <li><strong>Rifamycin regimens:</strong> a meta-analysis of 6 randomized controlled trials (RCTs) found <strong>no statistically significant increase</strong> in rifamycin resistance vs non-rifamycin regimens (risk ratio (RR) 3.45, 95% confidence interval (CI) 0.72&ndash;16.56). The wide confidence interval means a risk <strong>cannot be excluded</strong>. ${cite(80)}</li>
                <li><strong>Isoniazid preventive therapy:</strong> 13 studies; summary RR for isoniazid resistance <strong>1.45</strong> (95% CI 0.85&ndash;2.47). The findings "do not exclude an increased risk", and the authors conclude active TB <strong>should be excluded before isoniazid preventive therapy (IPT)</strong>. ${cite(81)}</li>
              </ul>
            </li>
          </ul>
          ${img(5, "stage4", "cxr-normal", "Normal CXR — shown here only to illustrate the active-disease-exclusion step, not a specific finding")}
          <h4>Her risk from here</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Question</th><th>Evidence</th></tr></thead>
              <tbody>
                <tr>
                  <td>How often do close contacts get infected?</td>
                  <td>Latent infection in <strong>28%</strong> of contacts in high-income settings and <strong>52%</strong> in low/middle-income settings. Active TB in <strong>1.4%</strong> and <strong>3.1%</strong>. <strong>Incidence is highest in the first year.</strong> ${cite(82)}</td>
                </tr>
                <tr>
                  <td>Healthcare workers specifically</td>
                  <td>Pooled <strong>IGRA conversion ~8%</strong> in serially tested healthcare workers ${cite(75)}</td>
                </tr>
                <tr>
                  <td>Lifetime risk of disease with LTBI (healthy adult)</td>
                  <td><strong>~5&ndash;10%</strong> (WHO estimate, as quoted by Behr 2018) ${cite(78)}</td>
                </tr>
                <tr>
                  <td><strong>When</strong> that risk falls</td>
                  <td>Of eventual cases: <strong>45% by 1 year, 62% by 2 years, 83% by 5 years</strong> (Borgdorff). Among Amsterdam contacts, <strong>75% within 1 year and 97% within 2 years</strong> (Sloot) ${cite(78)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("IGRA", "LTBI")}
          <p><strong>Takeaway:</strong> the risk is <strong>front-loaded</strong>, which is why TB preventive treatment (TPT) is offered promptly after a documented conversion. TPT is WHO's term ${cite(83)}; US guidance calls it treatment of LTBI ${cite(84)}.</p>
          <h4>Higher-risk groups (relative risk of progression)</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Group</th><th>Figure</th><th>Source</th></tr></thead>
              <tbody>
                <tr><td><strong>HIV</strong></td><td><strong>35&ndash;162 per 1,000 person-years</strong>, the highest of any known factor</td><td>${cite(4)}</td></tr>
                <tr><td><strong>TNF-&alpha; inhibitors (monoclonal antibodies)</strong></td><td>TB standardized incidence ratio: <strong>infliximab 18.6, adalimumab 29.3</strong></td><td>${cite(85)}</td></tr>
                <tr><td><strong>TNF-&alpha; inhibitor (etanercept)</strong></td><td>SIR <strong>1.8</strong>, much lower</td><td>${cite(85)}</td></tr>
                <tr><td><strong>JAK inhibitor (tofacitinib)</strong></td><td>TB was the most common opportunistic infection: <strong>0.21/100 PY</strong> overall and <strong>0.75/100 PY in high-incidence regions</strong></td><td>${cite(86)}</td></tr>
                <tr><td><strong>Diabetes</strong></td><td><strong>RR 3.11</strong> (95% CI 2.27&ndash;4.26). <em>Note:</em> don't test for latent TB because of diabetes alone (Saudi NTP Manual &sect;12.2, p.118; its TST chapter lists diabetes as a moderate-risk indication under 65, &sect;13.4.2, p.129) ${cite(5)}. If latent TB is found for another reason (e.g. a contact), diabetes strengthens the case to treat ${cite(87)}.</td><td>${cite(88, 5, 87)}</td></tr>
                <tr><td><strong>Corticosteroids</strong></td><td><strong>&ge;15 mg/day prednisone-equivalent for &ge;1 month</strong> is listed as an immunosuppression risk factor. CDC calls the benefit of a full course "less clear"</td><td>${cite(73, 4)}</td></tr>
                <tr><td><strong>Transplant, dialysis, silicosis</strong></td><td>WHO <strong>strongly recommends</strong> systematic testing and treatment in these groups</td><td>${cite(89)}</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("CDC", "CI", "JAK", "NTP", "PY", "RR", "SIR", "TNF", "TST")}`,
        pearl:
          "A conversion is a recent infection, and recent infection is when TB happens. Most of the lifetime risk arrives in the first two years, which is the window TPT is meant to close.",
      },
      {
        title: "Active disease excluded. Which regimen, and what's the evidence?",
        question:
          "Active disease has been excluded. Which preventive regimen do you choose, and what evidence supports it?",
        points: [
          "Which preventive regimens are there, and how do they compare?",
          "6 or 9 months of isoniazid: what does the evidence show?",
          "What do WHO, CDC/NTCA and the Saudi manual recommend?",
          "Which regimen for her, and why?",
        ],
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Comparison</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td>Sterling 2011, PREVENT TB ${cite(90)}</td>
                  <td><strong>3HP</strong> (rifapentine 900 mg + isoniazid 900 mg weekly &times;12, observed) vs <strong>9H</strong></td>
                  <td>TB <strong>0.19% vs 0.43%</strong>; non-inferior; higher completion, less hepatotoxicity</td>
                </tr>
                <tr>
                  <td>Menzies 2018 ${cite(91)}</td>
                  <td><strong>4R</strong> (daily rifampin &times;4 months) vs <strong>9H</strong></td>
                  <td>Non-inferior; completion <strong>+15.1 points</strong>; fewer grade 3&ndash;5 adverse events</td>
                </tr>
                <tr>
                  <td>Swindells 2019, BRIEF-TB ${cite(92)}</td>
                  <td><strong>1HP</strong> (daily rifapentine + isoniazid &times;1 month) vs <strong>9H</strong>, in <strong>people with HIV</strong></td>
                  <td>TB/death <strong>0.65 vs 0.67 per 100 PY</strong>; non-inferior; completion <strong>97% vs 90%</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("#", "H", "P", "PY", "R")}
          <p style="color:var(--text-muted); font-size:0.9rem;">BRIEF-TB enrolled only people with HIV. That is why WHO's recommendation for 1HP is conditional. ${cite(92, 83)}</p>
          <h4>Studies: 6H vs 9H</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Design</th><th>Key result</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>IUAT 1982</strong> ${cite(93)}</td>
                  <td>RCT, ~28,000 adults with fibrotic lesions; isoniazid 12 / 24 / 52 weeks vs placebo; 5 years of follow-up. <strong>No 9-month arm</strong></td>
                  <td>TB reduction <strong>21% / 65% / 75%</strong> (all assigned) and <strong>31% / 69% / 93%</strong> (completed and took &ge;80% of doses). The 52- vs 24-week difference was not significant overall; the extra gain was in lesions &gt;2 cm&sup2; (89% vs 67%). Hepatitis 0.5% vs 0.1%</td>
                </tr>
                <tr>
                  <td><strong>Comstock 1999</strong> ${cite(94)}</td>
                  <td>Reanalysis of the controlled trials</td>
                  <td>6 months is not optimal; <strong>9&ndash;10 months appears optimal</strong>; more than 12 months is unnecessary</td>
                </tr>
                <tr>
                  <td><strong>Smieja 2000, Cochrane</strong> ${cite(95)}</td>
                  <td>11 RCTs, 73,375 people</td>
                  <td>6 vs 12 months not significantly different (RR 0.44 vs 0.38); hepatotoxicity 0.36% vs 0.52%</td>
                </tr>
              </tbody>
            </table>
          </div>
          ${abbrev("RCT", "RR")}
          <p><strong>Takeaway:</strong> no trial has compared 6H with 9H directly. A longer course may add protection, mostly with more extensive fibrotic disease, at the cost of more hepatotoxicity and lower completion. That is why NTCA/CDC rates 6H strong and 9H conditional, and the Saudi manual recommends 6H. ${cite(84, 5)}</p>
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Regimen</th><th>WHO 2024 ${cite(83)}</th><th>NTCA/CDC 2020 ${cite(84)}</th><th>Saudi NTP 2021 ${cite(5)}</th></tr></thead>
              <tbody>
                <tr><td>6H</td><td>Strong</td><td>Alternative; strong, moderate (HIV&minus;) / conditional, moderate (HIV+)</td><td><strong>Recommended</strong> (strong, high)</td></tr>
                <tr><td>9H</td><td>Strong</td><td>Alternative; conditional, moderate</td><td>Alternative</td></tr>
                <tr><td>3HP</td><td>Strong</td><td>Preferred; strong, moderate</td><td>Alternative (rifapentine unavailable in KSA)</td></tr>
                <tr><td>3HR</td><td>Strong</td><td>Preferred; conditional, very low (HIV&minus;) / low (HIV+)</td><td>Alternative (3&ndash;4HR)</td></tr>
                <tr><td>4R</td><td>Conditional</td><td>Preferred; strong, moderate (HIV&minus;)</td><td>Alternative (3&ndash;4R)</td></tr>
                <tr><td>1HP</td><td>Conditional</td><td>Not addressed</td><td>Not listed</td></tr>
                <tr><td>6Lfx (MDR/RR contacts)</td><td>Strong</td><td>Not addressed</td><td>Not as a fixed 6Lfx regimen. Preventive treatment "may be considered" for <strong>selected high-risk household contacts</strong> (e.g. children, immunosuppressed, people with HIV) after LTBI is confirmed. Drugs follow the source case's DST, with a later-generation fluoroquinolone as a key component unless the strain is resistant. Duration 6&ndash;12 months by clinical judgement; monitor for &ge;2 years (conditional, very low; &sect;12.6)</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("#", "CDC", "DST", "H", "KSA", "Lfx", "LTBI", "MDR-TB", "NTCA", "NTP", "P", "R", "RR-TB")}
          <p style="color:var(--text-muted); font-size:0.9rem;">WHO: strong = moderate-to-high certainty; conditional = low-to-moderate certainty; 6Lfx strong, moderate certainty. Saudi alternatives to 6H (low-incidence countries): strong recommendation, moderate&ndash;high-quality evidence. The 6Lfx row is not for this nurse: her source was drug-susceptible.</p>
          <h4>Her regimen</h4>
          <ul>
            <li><strong>Rifapentine is not available in Saudi Arabia.</strong> 3HP and 1HP are shown as options that exist internationally, <strong>but not what this nurse receives.</strong></li>
            <li><strong>This nurse: 4R</strong>, daily rifampin for 4 months. It is non-inferior to 9H, with higher completion and fewer serious adverse events ${cite(91)}, and is among the preferred short regimens ${cite(84)}.</li>
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
        points: [
          "Why test only if you would treat a positive result?",
          "Which groups do WHO and the Saudi manual say to test and treat?",
          "Where do they leave it optional, or advise against?",
        ],
        reveal: `
          <h4>The principle</h4>
          <ul>
            <li><strong>Test only if you would treat a positive result.</strong> Guidelines advise <strong>against testing people at low risk</strong> of infection and progression. ${cite(1)}</li>
          </ul>
          <h4>WHO and Saudi recommendations</h4>
          <ul>
            <li><strong>WHO</strong> (guideline for countries with incidence &lt;100/100,000, which includes Saudi Arabia) ${cite(89)}:
              <ul>
                <li><strong>strongly recommends</strong> systematic testing and treatment for people with HIV; adult and child contacts; patients <strong>starting anti-TNF treatment</strong>; patients on dialysis; patients preparing for transplant; and patients with silicosis;</li>
                <li><strong>conditionally recommends</strong> it for <strong>healthcare workers</strong>; <strong>immigrants from high-burden countries</strong>; and prisoners, homeless people and people who use drugs.</li>
              </ul>
            </li>
            <li><strong>Saudi policy</strong> ${cite(5)}:
              <ul>
                <li><strong>household contacts</strong> of bacteriologically confirmed pulmonary TB (PTB) "should be systematically tested and treated for LTBI" because Kingdom of Saudi Arabia (KSA) is low-incidence (strong, high&ndash;moderate);</li>
                <li><strong>anti-TNF, dialysis, pre-transplant and silicosis</strong> patients: systematic testing and treatment (strong, low&ndash;very low);</li>
                <li><strong>health workers and immigrants from high-burden countries:</strong> "may be considered" (conditional, low&ndash;very low);</li>
                <li><strong>not</strong> recommended for diabetes, harmful alcohol use, smokers or underweight people alone (conditional, very low) (&sect;12);</li>
                <li>its major policies also state that <strong>all healthcare professionals are screened for latent TB</strong> under infection-prevention protocols (&sect;2.3);</li>
                <li><strong>immigrants from high-burden regions</strong> seeking long residency undergo <strong>active case finding</strong>: a first assessment in the home country and re-examination on arrival. Note this is screening for <strong>active</strong> TB, not LTBI.</li>
              </ul>
            </li>
          </ul>
          <h4>Before a biologic or JAK inhibitor</h4>
          <ul>
            <li><strong>Before any biologic or Janus kinase (JAK) inhibitor:</strong>
              <ul>
                <li>International recommendations agree on <strong>screening before starting</strong>: IGRA/TST plus CXR, with many advising <strong>both tests in BCG-vaccinated patients</strong>. Patients with LTBI should <strong>receive TPT before the biologic</strong>. ${cite(96)}</li>
                <li>Why it matters: in the French RATIO registry, <strong>none</strong> of the anti-TNF-associated TB cases had received correct prophylaxis. ${cite(85)}</li>
                <li><strong>How long before?</strong> Start TPT before or with the biologic. The ideal lead-in time is not standardized. Observational data suggest a <strong>concurrent start</strong> can be safe: 263 patients took isoniazid alongside tofacitinib with <strong>no TB cases</strong> ${cite(86)}, and a small Nepal cohort started adalimumab on the same day as 3HR with <strong>no reactivation</strong> ${cite(97)}.</li>
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
      "31-year-old Saudi man, previously healthy, with 3 weeks of fever, dry cough and right-sided pleuritic chest pain, and increasing breathlessness over the last week. Chest radiograph (CXR): moderate right pleural effusion; no visible parenchymal lesion. HIV status unknown." +
      img(6, "stage1", "cxr-effusion", "Unilateral right pleural effusion on chest radiograph (reference image, not this patient)"),
    stages: [
      {
        title: "What do you send?",
        question: "Given this presentation, what do you send, specifically?",
        points: [
          "How common is TB as a cause of effusion here?",
          "What is your differential, from most to least likely?",
          "What do you send on the pleural fluid?",
          "Is sputum worth sending with a clear lung field?",
        ],
        reveal: `
          <h4>Pre-test probability</h4>
          <p><em>Why this patient:</em> in a 5-year prospective study in the Eastern Province, TB caused <strong>35.2%</strong> of all pleural effusions. Patients were young (mean age 33) and mostly men (82%). ${cite(98)}</p>
          <h4>Differential and tests</h4>
          <p><strong>Differential first</strong>, most to least likely, each paired with its test:</p>
          <ol>
            <li><strong>Tuberculous pleurisy</strong>
              <ul>
                <li><strong>Diagnostic thoracentesis:</strong> protein and lactate dehydrogenase (LDH) (to confirm an exudate by Light's criteria) ${cite(99)}; <strong>cell count and differential</strong> ${cite(1)}; <strong>adenosine deaminase (ADA)</strong>, &plusmn; free interferon-&gamma; ${cite(1)}; <strong>acid-fast bacilli (AFB) smear, mycobacterial culture and Xpert Ultra</strong> on the fluid ${cite(1)}.</li>
                <li><strong>Sputum as well, induced if he can't produce any, even with a clear lung field.</strong> In patients with suspected pleural TB who could not produce sputum, induced-sputum culture was positive in <strong>55%</strong> of those whose only CXR abnormality was the effusion. ${cite(100)} A normal CXR doesn't mean normal lungs: CT shows lung lesions in about three-quarters or more of patients. When the CT is also clear, respiratory samples rarely grow TB (bronchial aspirate 1/14 ${cite(101)}; sputum 0/5 ${cite(102)}). Bronchoscopy helps mainly when the CT shows a lesion, especially consolidation. ${cite(101)}</li>
              </ul>
            </li>
            <li><strong>Parapneumonic effusion or empyema</strong>
              <ul><li>Gram stain and bacterial culture on the same fluid.</li></ul>
            </li>
            <li><strong>Malignant effusion</strong> (lymphoma, metastatic disease)
              <ul><li>Pleural fluid cytology; pleural biopsy if the work-up stays non-diagnostic. Among undiagnosed exudates in a high-TB-incidence setting, 82% were TB and 10% malignancy. ${cite(103)}</li></ul>
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
        points: [
          "Transudate or exudate, and how do you decide?",
          "Does a negative smear and Xpert rule out TB?",
          "How much weight does the ADA carry?",
          "What do the guidelines say about ADA?",
        ],
        reveal: `
          <h4>First: is it a transudate or an exudate?</h4>
          <ul>
            <li><strong>Why the split matters.</strong> Transudates are common in heart failure, cirrhosis, hypoalbuminaemia and nephrotic syndrome, and are managed by treating the cause. Exudates point to malignancy, pleural infection, pulmonary embolism or autoimmune pleuritis, and need a diagnosis. ${cite(104)} TB is among the causes of a <strong>lymphocytic</strong> effusion, and BTS names it as a treatable cause to reconsider when no diagnosis is found. ${cite(104)}</li>
            <li><strong>Paired samples.</strong> Send blood (protein, LDH, albumin, C-reactive protein [CRP]) at the time of the tap: Light's criteria are ratios to serum values. ${cite(104)}</li>
            <li><strong>Sensitive by design.</strong> One criterion is enough. The rule picks up about <strong>98% of exudates</strong> but labels about <strong>25% of transudates</strong> as exudates. ${cite(105)} If <strong>none</strong> is met, an exudate is very unlikely (likelihood ratio [LR] 0.04). ${cite(106)}</li>
            <li><strong>Watch for a false exudate</strong> in heart failure (often on diuretics) and cirrhosis. Light's criteria mislabelled 29% of heart-failure and 18% of cirrhosis effusions as exudates. ${cite(107)} Serum N-terminal pro-B-type natriuretic peptide (NT-proBNP) can support heart failure (BTS, conditional). ${cite(104)}</li>
          </ul>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Test</th><th>Exudate if</th><th>Note</th></tr></thead>
              <tbody>
                <tr><td>Fluid protein &divide; serum protein</td><td>&gt; 0.5</td><td>Any <strong>one</strong> criterion is enough ${cite(99, 104)}</td></tr>
                <tr><td>Fluid LDH &divide; serum LDH</td><td>&gt; 0.6</td><td>${cite(99, 104)}</td></tr>
                <tr><td>Fluid LDH</td><td>&gt; &frac23; of the upper limit of normal for serum LDH</td><td>Uses your lab's reference range ${cite(104)}</td></tr>
                <tr><td><strong>Suspected heart failure:</strong> serum albumin &minus; fluid albumin</td><td>&gt; 1.2 g/dL = <strong>really a transudate</strong></td><td>Relabelled 83% of false heart-failure exudates; protein gradient &gt; 3.1 g/dL only 55% ${cite(107)}</td></tr>
                <tr><td><strong>Cirrhosis:</strong> fluid albumin &divide; serum albumin</td><td>&lt; 0.6 = <strong>really a transudate</strong></td><td>Relabelled 77% of false cirrhosis exudates ${cite(107)}</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("LDH")}
          ${img(6, "stage2", "light-approach", "Approach to a unilateral pleural effusion. Original schematic adapted from the BTS 2023 pathway (Appendix 1) and Light's criteria; false-exudate thresholds from Bielsa 2012. " + cite(99, 104, 107))}
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Test (pleural fluid)</th><th>Source</th><th>Sensitivity</th><th>Specificity</th><th>Note</th></tr></thead>
              <tbody>
                <tr><td><strong>ADA</strong></td><td>Meta-analysis, 174 studies, 27,009 patients ${cite(108)}</td><td><strong>92%</strong> (90&ndash;93)</td><td><strong>90%</strong> (88&ndash;91)</td><td>At the common 40 &plusmn; 4 IU/L threshold: 93% / 90%. All studies had a <strong>high risk of bias</strong></td></tr>
                <tr><td><strong>ADA</strong></td><td>5 earlier meta-analyses, summarised by ATS/IDSA/CDC ${cite(1)}</td><td>89&ndash;99%</td><td>88&ndash;97%</td><td>Thresholds ranged from 10 to 71 U/L</td></tr>
                <tr><td><strong>Free IFN-&gamma;</strong></td><td>Meta-analysis of 22 studies, summarised by ATS/IDSA/CDC ${cite(1)}</td><td>89%</td><td>97%</td><td>Thresholds varied widely</td></tr>
                <tr><td><strong>Xpert Ultra</strong></td><td>Cochrane 2025, 13 studies ${cite(109)}</td><td><strong>74.0%</strong> (60.8&ndash;83.9)</td><td>88.1% (78.8&ndash;93.6)</td><td>Against culture; low / very low certainty</td></tr>
                <tr><td><strong>NAAT (any)</strong></td><td>ATS/IDSA/CDC ${cite(1)}</td><td>56%</td><td>98%</td><td></td></tr>
                <tr><td><strong>AFB smear</strong></td><td>ATS/IDSA/CDC ${cite(1)}</td><td><strong>0&ndash;10%</strong></td><td>high</td><td></td></tr>
                <tr><td><strong>Mycobacterial culture</strong></td><td>ATS/IDSA/CDC ${cite(1)}</td><td>23&ndash;58%</td><td>&gt;97%</td><td>The only route to an isolate for DST</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("ADA", "AFB", "ATS", "CDC", "DST", "IDSA", "IFN-γ", "NAAT")}
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
          ${abbrev("ADA", "AFB", "ATS", "CDC", "IDSA", "IFN-γ", "NAAT", "NTP")}
          <p><strong>Take-home:</strong> <strong>no.</strong> In pleural fluid, a negative smear or nucleic acid amplification test (NAAT) never excludes TB. ${cite(1)} A lymphocytic exudate with a high ADA is strong <strong>supporting</strong> evidence. ATS/IDSA/CDC stress that neither ADA nor interferon-&gamma; (IFN-&gamma;) "provide a definitive diagnosis"; they "must be interpreted in the entire clinical context". ${cite(1)}</p>`,
        pearl:
          "In pleural TB, the fluid is full of the immune response and almost empty of bacilli. That's why ADA performs well and the smear fails.",
      },
      {
        title: "Treat now, or biopsy first?",
        question:
          "With a lymphocytic, high-ADA exudate and negative microbiology, do you start treatment now or get pleural tissue first?",
        points: [
          "What does each specimen add to the diagnosis?",
          "What do the guidelines say about tissue?",
          "Treat now or biopsy first, for this patient?",
        ],
        reveal: `
          <h4>Studies: diagnostic yield of each specimen</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Setting</th><th>Key result</th></tr></thead>
              <tbody>
                <tr><td>Diacon 2003 ${cite(103)}</td><td>Prospective, 51 undiagnosed exudates (82% TB), South Africa</td><td><strong>Closed needle biopsy:</strong> histology 66%, culture 48%, combined <strong>79%</strong>. <strong>Thoracoscopy:</strong> histology 100%, culture 76%, combined <strong>100%</strong>. Both 100% specific. <strong>ADA &ge;50 U/L:</strong> 95% sensitive, 89% specific. <strong>ADA + lymphocyte/neutrophil ratio &ge;0.75 + closed biopsy:</strong> 93% sensitive, 100% specific</td></tr>
                <tr><td>Conde 2003 ${cite(100)}</td><td>Prospective, 84 pleural TB, Brazil</td><td>Pleural biopsy histology <strong>78%</strong>. Culture yield: pleural tissue <strong>62%</strong>, pleural fluid <strong>12%</strong>, induced sputum <strong>52%</strong></td></tr>
                <tr><td>al-Quorain 1994 ${cite(98)}</td><td>Prospective, 89 pleural TB, Eastern Province, KSA</td><td>Culture or histology positive: pleural biopsy <strong>68.5%</strong>, pleural fluid <strong>10%</strong>, sputum <strong>2%</strong></td></tr>
                <tr><td>ATS/IDSA/CDC summary ${cite(1)}</td><td>Accuracy studies</td><td>Pleural <strong>tissue</strong>: histology 69&ndash;97%, culture 40&ndash;58%, smear 14&ndash;39%</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("ADA", "ATS", "CDC", "IDSA", "KSA")}
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
          ${abbrev("ATS", "CDC", "IDSA")}
          <h4>Reasoning for this patient</h4>
          <ul>
            <li>A young man in a high-prevalence setting, with a lymphocytic exudate and ADA 78, has a high probability of TB. <strong>Starting treatment now is reasonable.</strong> ${cite(3, 108)}</li>
            <li><strong>Tissue still earns its place.</strong> It is the best route to a positive <strong>culture</strong>, and so to <strong>drug-susceptibility testing</strong>; NAAT "does not produce an isolate, which is needed for DST". ${cite(1)} Tissue also excludes malignancy. Pleural biopsy was the single most useful test in the Saudi series. ${cite(98)}</li>
            <li><strong>If the ADA were low, the fluid neutrophilic, or the patient older:</strong> go to biopsy before treating. Thoracoscopy has the highest yield where it's available. ${cite(103)}</li>
          </ul>`,
        pearl:
          "High ADA is enough to start treatment; it isn't enough to get a susceptibility result. Culture of pleural tissue or induced sputum gives you both a diagnosis and a DST.",
      },
      {
        title: "Treatment: how long, drain it, and steroids?",
        context: "He starts treatment. The effusion is moderate and he is breathless.",
        question:
          "What regimen and duration? Should the effusion be drained? Do adjunctive corticosteroids help?",
        points: [
          "Which regimen and how long?",
          "Should the effusion be drained?",
          "Do steroids help?",
        ],
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Design</th><th>Key result</th></tr></thead>
              <tbody>
                <tr><td><strong>Ryan 2017, Cochrane</strong> ${cite(110)}</td><td>6 RCTs, 590 participants (1 trial in HIV-positive people)</td><td>Corticosteroids <strong>may speed resolution</strong>. Residual effusion reduced at 8 weeks (RR 0.54) and at 24 weeks (RR 0.35); residual pleural changes reduced (RR 0.72, ARR 16%). <strong>Low certainty.</strong> No long-term lung-function benefit shown (very low certainty). <strong>More adverse events leading to discontinuation</strong> (RR 2.78). <strong>Kaposi sarcoma 6/99 vs 0/98</strong> in the HIV trial</td></tr>
                <tr><td><strong>Bhuniya 2012</strong> ${cite(111)}</td><td>Randomized, open-label, 52 patients</td><td><strong>Therapeutic</strong> vs diagnostic-only thoracentesis. Better FEV1/FVC recovery and <strong>less pleural thickening</strong> with therapeutic drainage over 6 months</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("ARR", "FEV1", "FVC", "RCT", "RR")}
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
          ${abbrev("#", "ATS", "CDC", "E", "H", "IDSA", "NTP", "R", "RCT", "Z")}
          <h4>Answer for this patient</h4>
          <ul>
            <li><strong>2HRZE/4HR for 6 months.</strong> ${cite(3, 5)}</li>
            <li><strong>Therapeutic thoracentesis</strong> to relieve his breathlessness. ${cite(111)}</li>
            <li><strong>No routine steroids.</strong> ${cite(3)}</li>
          </ul>
          <p><strong>Why the two sources seem to disagree on steroids:</strong> the Cochrane review (6 trials) found a <em>possible</em> reduction in residual pleural changes, at low certainty ${cite(110)}, while ATS 2016 read 4 trials as showing no benefit ${cite(3)}. Both agree there is <strong>no proven long-term functional benefit</strong>, and there is a signal of <strong>harm</strong> (discontinuations; Kaposi sarcoma in HIV).</p>`,
        pearl:
          "Drain the fluid for breathlessness. Don't reach for steroids to prevent pleural thickening: the benefit is uncertain, and the harm in HIV isn't.",
      },
      {
        title: "Week 3: the induced-sputum culture grows <em>M. tuberculosis</em>",
        context:
          "Three weeks into treatment, the induced-sputum culture sent on day 1 grows <em>M. tuberculosis</em>, fully susceptible. Repeat CXR still shows no parenchymal lesion.",
        question: "Does this change how he is classified, and does it matter for his contacts?",
        points: [
          "Does this change how he is classified?",
          "Does it matter for his contacts?",
          "What do you update, and who do you notify?",
        ],
        reveal: `
          <h4>Classification, and why it matters</h4>
          <ul>
            <li><strong>Classification changes.</strong> Under the Saudi National Tuberculosis Programme (NTP) Manual, pleural effusion <strong>without</strong> lung abnormality is extrapulmonary TB, but a patient with <strong>both</strong> pulmonary and extrapulmonary TB is classified as <strong>pulmonary</strong> TB. ${cite(5)} A positive sputum culture shows airway involvement.</li>
            <li><strong>Why it matters:</strong> the manual describes pleural TB as "reputed to be noninfectious". ${cite(5)} A positive sputum culture moves him out of that category. Household contacts of bacteriologically confirmed pulmonary TB "should be systematically tested and treated for latent TB infection (LTBI)" (Saudi policy, strong). ${cite(5)}</li>
          </ul>
          <h4>How common, and what it adds</h4>
          <ul>
            <li><strong>This is common, not a curiosity.</strong> In patients with suspected pleural TB who could not produce sputum, induced-sputum culture was positive in 55% of those with an otherwise normal CXR. ${cite(100)} The "normal" CXR often hides lung disease that CT would show; when the CT is also clear, respiratory samples rarely grow TB. ${cite(101, 102)}</li>
            <li><strong>A bonus:</strong> the isolate gives a full DST. ${cite(1)}</li>
          </ul>
          <h4>What to do</h4>
          <ul>
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
        points: [
          "Is this treatment failure?",
          "How common is it?",
          "What do you do, and what don't you change?",
        ],
        reveal: `
          <p><strong>Most likely a paradoxical response, but that is a diagnosis of exclusion.</strong> It is made only after a thorough evaluation has excluded other causes, particularly <strong>treatment failure and drug resistance</strong>. New or enlarging pleural effusions are a recognised pattern. ${cite(3)} Here his isolate is fully susceptible and adherence is documented.</p>
          <h4>How common</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Setting</th><th>Key result</th></tr></thead>
              <tbody>
                <tr><td><strong>Al-Majed 1996</strong> ${cite(112)}</td><td>Riyadh, 3 hospitals, 61 proven pleural TB</td><td>Paradoxical enlargement in <strong>16% (10/61)</strong>. 6 became massive and needed therapeutic aspiration; 5 received corticosteroids. <strong>All resolved within 1&ndash;3 months</strong>; 3 left residual pleural thickening</td></tr>
                <tr><td><strong>Jeon 2012</strong> ${cite(113)}</td><td>Korea, multicentre, 458 HIV-negative isolated pleural TB</td><td><strong>16%</strong>, at a mean of <strong>8.8 weeks</strong>. 81% presented as enlargement of the existing effusion; <strong>68% had no symptoms</strong>. Linked to higher fluid eosinophils and lower fluid protein at diagnosis</td></tr>
              </tbody>
            </table>
          </div>
          <h4>What to do</h4>
          <ul>
            <li><strong>Continue the same regimen.</strong> ${cite(3)}</li>
            <li>Confirm adherence and susceptibility. ${cite(3)}</li>
            <li><strong>Therapeutic aspiration if breathless.</strong> ${cite(112)}</li>
            <li>Re-sample if the picture is atypical (fever returns, fluid turns purulent). ${cite(3)}</li>
            <li><strong>Steroids:</strong> used for massive paradoxical effusions in the Riyadh series. That is observational evidence only. ${cite(112)}</li>
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
                <li><strong>Magnetic resonance imaging (MRI) of the whole spine</strong> first.</li>
                <li>Then <strong>image-guided biopsy</strong> of the vertebra or paravertebral collection for <strong>histology</strong>, <strong>mycobacterial culture</strong> (strong recommendation), and <strong>acid-fast bacilli (AFB) smear and nucleic acid amplification test (NAAT)</strong> (Xpert). ${cite(1)}</li>
                <li><strong>Chest radiograph (CXR)</strong>, and sputum if the chest is abnormal.</li>
              </ul>
            </li>
            <li><strong>Brucellar spondylitis</strong>
              <ul>
                <li><strong>Brucella serology and blood cultures.</strong> In a Saudi series, 21 of 173 patients with backache and a history of raw-milk ingestion had brucellar spondylitis, and most had positive Brucella titres. ${cite(114)}</li>
                <li>The clinical pattern suggests one or the other, "but the definitive diagnosis depends upon bacteriological tests". ${cite(115)}</li>
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
                <tr><td>Level</td><td><strong>Mid-thoracic</strong> (73% of lesions)</td><td><strong>Lower lumbar</strong> (68%)</td><td>Sharif 1989, Riyadh ${cite(116)}</td></tr>
                <tr><td>Bone destruction</td><td>Vertebral destruction, <strong>gibbus in 60%</strong></td><td>Limited to the <strong>end-plates</strong></td><td>${cite(116)}</td></tr>
                <tr><td>Paraspinal abscess</td><td><strong>14 of 15</strong> patients</td><td>Granulation tissue / localized oedema</td><td>${cite(116)}</td></tr>
                <tr><td>Subligamentous spread &ge;3 levels</td><td><strong>54%</strong></td><td>8%</td><td>Gao 2017 ${cite(117)}</td></tr>
                <tr><td>Vertebral collapse</td><td><strong>42%</strong></td><td>2%</td><td>${cite(117)}</td></tr>
                <tr><td>Abnormal disc signal on T2</td><td>33%</td><td><strong>85%</strong></td><td>${cite(117)}</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("T2")}
          <p><strong>Caveat:</strong> "Lesions of tuberculous spondylitis affecting the lower lumbar spine were difficult to differentiate from those of brucellar spondylitis." ${cite(116)}</p>
          <p><strong>Take-home:</strong> a thoracic level, a large abscess, spread across several levels and collapse all point to TB. Imaging raises the probability; it doesn't replace microbiology. ${cite(115)}</p>`,
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
                <tr><td>Ravichandran 2023 ${cite(118)}</td><td>259 CT-guided spinal biopsies, suspected infective spondylodiscitis (India)</td><td>Confirmatory in <strong>57.5%</strong> overall: histology 36.6%, Xpert 27.8%, MGIT culture 19.9%. <strong>Rifampicin resistance in 16/72 (22%) of Xpert-positives.</strong> Complications 0.3%. <strong>Prior TB treatment reduced the yield</strong></td></tr>
                <tr><td>ATS/IDSA/CDC summary ${cite(1)}</td><td>Accuracy studies</td><td>For extrapulmonary specimens, positive smear, culture or NAAT support TB; <strong>negative results "may not be used to exclude TB"</strong></td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("ATS", "CDC", "CT", "IDSA", "MGIT", "NAAT")}
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
          ${abbrev("AFB", "ATS", "CDC", "IDSA", "NAAT")}
          <p><strong>Take-home:</strong></p>
          <ul>
            <li><strong>Get tissue before starting treatment.</strong> Prior treatment lowers the yield. ${cite(118)}</li>
            <li><strong>Only a culture gives full drug-susceptibility testing (DST).</strong> NAAT "does not produce an isolate, which is needed for DST". ${cite(1)}</li>
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
          ${abbrev("ATS", "CDC", "IDSA", "NTP")}
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
      "32-year-old Saudi man with 3 weeks of headache, fever and vomiting, and 2 days of confusion. Double vision (left sixth-nerve palsy). Glasgow Coma Scale (GCS) 13. Neck stiffness. No rash. HIV status unknown.",
    stages: [
      {
        title: "What do you send?",
        question: "Given this presentation, what do you send, specifically?",
        reveal: `
          <p><strong>Differential first</strong>, each paired with its test:</p>
          <ol>
            <li><strong>Tuberculous meningitis</strong>
              <ul>
                <li><strong>Lumbar puncture:</strong> cell count, protein and glucose (with a paired serum glucose); <strong>adenosine deaminase (ADA)</strong>; <strong>acid-fast bacilli (AFB) smear, mycobacterial culture and Xpert Ultra</strong> on the cerebrospinal fluid (CSF). ${cite(1, 109)}</li>
                <li><strong>Brain magnetic resonance imaging (MRI)</strong> (hydrocephalus, basal enhancement, tuberculomas).</li>
                <li><strong>Chest radiograph (CXR)</strong>, and sputum if abnormal.</li>
              </ul>
            </li>
            <li><strong>Partially treated bacterial meningitis</strong>
              <ul><li>CSF Gram stain and culture, plus blood cultures.</li></ul>
            </li>
            <li><strong>Neurobrucellosis</strong>
              <ul><li>Brucellosis is <strong>endemic in Saudi Arabia</strong>, and neurobrucellosis can be clinically obscure. ${cite(119)} Diagnosis rests on CSF analysis, <strong>Brucella serology or culture</strong>, and response to treatment. ${cite(120)}</li></ul>
            </li>
            <li><strong>Cryptococcal meningitis</strong> (especially if HIV-positive)
              <ul><li>CSF and serum cryptococcal antigen. ${cite(34)}</li></ul>
            </li>
            <li><strong>Viral meningoencephalitis</strong>
              <ul><li>CSF viral polymerase chain reaction (PCR).</li></ul>
            </li>
          </ol>
          <p><strong>Also:</strong> an <strong>HIV test</strong>, which is routine in anyone with presumptive TB. ${cite(3)}</p>`,
        pearl:
          "A subacute meningitis with a cranial-nerve palsy is TB until proven otherwise. In Saudi Arabia, send Brucella serology in the same draw.",
      },
      {
        title: "CSF back, Xpert Ultra negative. Treat now?",
        context:
          "CSF: 180 cells/µL, <strong>85% lymphocytes</strong>; protein 2.1 g/L; <strong>CSF:serum glucose 0.3</strong>; ADA 12 U/L. Gram stain negative. AFB smear negative. <strong>Xpert Ultra: MTB not detected.</strong> cryptococcal antigen (CrAg) negative. Brucella serology negative. HIV test negative.",
        question:
          "Does a negative Xpert Ultra rule out TB meningitis? Do you start treatment now or wait for culture?",
        reveal: `
          <h4>Studies</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Test (CSF)</th><th>Source</th><th>Sensitivity</th><th>Specificity</th><th>Note</th></tr></thead>
              <tbody>
                <tr><td><strong>Xpert Ultra</strong></td><td>Cochrane 2025, 16 studies ${cite(109)}</td><td><strong>88.2%</strong> (83.7&ndash;91.6)</td><td>96.0% (86.8&ndash;98.9)</td><td><strong>Against culture</strong>, which itself misses paucibacillary TBM. The authors flag this reference-standard concern</td></tr>
                <tr><td>NAAT (any)</td><td>ATS/IDSA/CDC summary ${cite(1)}</td><td>62%</td><td>98%</td><td>So a negative result misses about 4 in 10</td></tr>
                <tr><td><strong>ADA</strong></td><td>Two meta-analyses, summarised by ATS/IDSA/CDC ${cite(1)}</td><td>79%</td><td>91%</td><td>"Exquisitely sensitive" to threshold: at 4 U/L, sensitivity &gt;93% but specificity &lt;80%; at 8 U/L, sensitivity &lt;59% but specificity &gt;96%</td></tr>
                <tr><td>Mycobacterial culture</td><td>ATS/IDSA/CDC summary ${cite(1)}</td><td>45&ndash;70%</td><td>&gt;97%</td><td>Takes weeks</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("ADA", "ATS", "CDC", "CSF", "IDSA", "NAAT", "TBM")}
          <h4>What is at stake</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Study</th><th>Setting</th><th>Key result</th></tr></thead>
              <tbody>
                <tr><td>Thao 2018 ${cite(121)}</td><td>1,699 adults, Vietnam (4 trials + 1 cohort)</td><td>9-month mortality <strong>23.0%</strong> if HIV-negative and <strong>51.3%</strong> if HIV-positive. <strong>Higher MRC grade</strong> predicted death</td></tr>
                <tr><td>Alshehri 2024 ${cite(122)}</td><td>140 CNS-TB patients, 3 Saudi tertiary centres, 2009&ndash;2019</td><td><strong>35% poor outcome</strong> (modified Rankin). <strong>GCS &le;10</strong> at presentation and TBM/tuberculoma predicted poor outcome</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("CNS", "GCS", "MRC", "TBM")}
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
          ${abbrev("ADA", "ATS", "CDC", "CSF", "IDSA", "NAAT")}
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
                <tr><td><strong>Thwaites 2004</strong>, NEJM ${cite(123)}</td><td>RCT, 545 patients &gt;14 years, Vietnam, with or without HIV</td><td><strong>Dexamethasone reduced death</strong> (RR 0.69, 0.52&ndash;0.92). It did <strong>not</strong> significantly reduce severe disability among survivors, or death-or-severe-disability. <strong>Fewer serious adverse events</strong> (26 vs 45)</td></tr>
                <tr><td><strong>Heemskerk 2016</strong>, NEJM ${cite(124)}</td><td>RCT, 817 adults</td><td><strong>Intensified treatment</strong> (rifampin 15 mg/kg + levofloxacin 20 mg/kg for 8 weeks) vs standard: <strong>no survival benefit</strong> (HR 0.94, 0.73&ndash;1.22)</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("HR", "RCT", "RR")}
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
          ${abbrev("ATS", "CDC", "CSF", "E", "H", "IDSA", "NTP", "R", "Z")}
          <p><strong>For this patient:</strong> HRZE, then HR, for <strong>9&ndash;12 months in total</strong>, plus a <strong>dexamethasone taper over 6&ndash;8 weeks</strong>. ${cite(3, 5)}</p>`,
        pearl:
          "Dexamethasone in HIV-negative TB meningitis saves lives. Higher-dose rifampin plus levofloxacin did not. The two strongest levers are still starting early and adding the steroid.",
      },
      {
        title: "Day 10: drowsier",
        context:
          "On day 10 his GCS falls to 10. Computed tomography (CT): <strong>enlarging ventricles (hydrocephalus)</strong>." +
          img(8, "stage4", "ct-hydrocephalus", "Hydrocephalus on non-contrast CT (reference image; the cause in this example is not specified)"),
        question: "What do you do?",
        reveal: `
          <ul>
            <li><strong>Refer to neurosurgery now.</strong> Hydrocephalus, tuberculous brain abscess and paraparesis are the listed complications "warranting neurosurgical referral". ${cite(3)}</li>
            <li><strong>Continue the full regimen and the steroid.</strong> ${cite(3)}</li>
            <li><strong>Reassess the diagnosis:</strong> check adherence and drug susceptibility before calling it a paradoxical reaction. ${cite(3)}</li>
            <li><strong>If new or enlarging tuberculomas appear on treatment:</strong> the Saudi manual (in its paediatric section) describes paradoxical enlargement of tuberculomas. It advises continuing TB treatment and says adjuvant corticosteroids "might be useful". ${cite(5)}</li>
            <li><strong>Prognosis:</strong> a GCS &le;10 predicted poor outcome in the Saudi series. ${cite(122)}</li>
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
                <tr><td><strong>Donovan 2023, ACT HIV</strong>, NEJM ${cite(125)}</td><td>RCT, 520 HIV-positive adults with TBM (Vietnam, Indonesia)</td><td>Dexamethasone vs placebo: <strong>no survival benefit</strong> (deaths 44.1% vs 49.0%; HR 0.85, 0.66&ndash;1.10). No subgroup clearly benefited</td></tr>
                <tr><td><strong>T&ouml;r&ouml;k 2011</strong>, CID ${cite(51)}</td><td>RCT, HIV-associated TBM</td><td>Immediate vs deferred ART: <strong>no survival benefit, more grade 4 adverse events</strong> with immediate ART</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("ART", "HR", "RCT", "TBM")}
          <ul>
            <li><strong>Steroids:</strong> the best trial in HIV-positive adults showed no survival benefit. ${cite(125)} The ATS recommendation was written before that trial. ${cite(3)}</li>
            <li><strong>Antiretroviral therapy (ART):</strong> <strong>defer</strong> when TB meningitis is suspected. ${cite(34, 51)} The Saudi manual likewise advises caution with early ART in TB meningitis (as taught in Case 3). ${cite(5)}</li>
            <li><strong>Cryptococcus:</strong> check the CrAg if CD4 &lt;100. ${cite(34)}</li>
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
      "26-year-old Saudi man with 4 months of intermittent right lower abdominal pain, evening fevers, night sweats and 6 kg weight loss. Occasional loose stools, no blood. No perianal disease. C-reactive protein (CRP) raised; mild anaemia.",
    stages: [
      {
        title: "What do you send?",
        question: "Given this presentation, what do you send, specifically?",
        reveal: `
          <p><strong>Differential first</strong>, each paired with its test:</p>
          <ol>
            <li><strong>Intestinal (ileocaecal) TB</strong>
              <ul>
                <li><strong>Ileocolonoscopy with multiple biopsies</strong> for histology, acid-fast bacilli (AFB) smear, mycobacterial culture and TB PCR/Xpert. ${cite(1)}</li>
                <li><strong>Cross-sectional imaging</strong> (computed tomography (CT) enterography).</li>
                <li><strong>Chest radiograph (CXR).</strong></li>
              </ul>
            </li>
            <li><strong>Crohn's disease</strong>
              <ul><li>The same colonoscopy and biopsies, and the same CT enterography. The features that separate the two are covered in the next stage. ${cite(126)}</li></ul>
            </li>
            <li><strong>Intestinal lymphoma</strong>
              <ul><li>Histology and immunohistochemistry on the biopsies.</li></ul>
            </li>
          </ol>
          <p><strong>Also:</strong> an <strong>HIV test</strong> ${cite(3)}. An <strong>interferon-gamma release assay (IGRA)</strong> is supporting evidence only (see the next stage). ${cite(127)}</p>`,
        pearl:
          "In a TB-endemic setting, every \"Crohn's disease\" of the terminal ileum is intestinal TB until the biopsies and the CT say otherwise.",
      },
      {
        title: "Biopsies inconclusive. How do you tell TB from Crohn's?",
        context:
          "<strong>Colonoscopy:</strong> transverse ulcers in the caecum; a patulous ileocaecal valve. <strong>Biopsies:</strong> non-caseating granulomas; AFB smear negative; TB polymerase chain reaction (PCR) negative; culture pending. <strong>CT enterography:</strong> short-segment ileocaecal thickening; enlarged mesenteric nodes without necrosis; no comb sign. <strong>IGRA positive.</strong>",
        question: "Does anything here settle it?",
        reveal: `
          <h4>Studies: features that separate intestinal TB (ITB) from Crohn's disease (CD)</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Feature / test</th><th>Favours</th><th>Accuracy</th><th>Source</th></tr></thead>
              <tbody>
                <tr><td>Caseation necrosis on biopsy; AFB smear or culture positive; <strong>necrotic nodes on CT</strong></td><td><strong>ITB</strong>: the only <strong>exclusive</strong> features, but all have poor sensitivity</td><td>&mdash;</td><td>${cite(126)}</td></tr>
                <tr><td>Transverse ulcers; patulous ileocaecal valve; contiguous ileocaecal involvement</td><td>ITB</td><td>(descriptive)</td><td>${cite(126)}</td></tr>
                <tr><td>Longitudinal or aphthous ulcers; skip lesions; long segments; perianal disease</td><td>CD</td><td>(descriptive)</td><td>${cite(126)}</td></tr>
                <tr><td><strong>Necrotic lymph nodes on CT</strong></td><td>ITB</td><td>Sensitivity <strong>23%</strong>, specificity <strong>100%</strong></td><td>CT meta-analysis ${cite(128)}</td></tr>
                <tr><td><strong>Comb sign</strong></td><td>CD</td><td>Sensitivity 82%, specificity 81%</td><td>${cite(128)}</td></tr>
                <tr><td><strong>Skip lesions</strong></td><td>CD</td><td>Sensitivity 86%, specificity 74%</td><td>${cite(128)}</td></tr>
                <tr><td><strong>IGRA</strong> (ITB vs CD)</td><td>ITB if positive</td><td>Sensitivity <strong>74%</strong>, specificity <strong>87%</strong></td><td>${cite(127)}</td></tr>
                <tr><td><strong>TB PCR on biopsy</strong> (ITB vs CD)</td><td>ITB if positive</td><td>Sensitivity <strong>47%</strong>, specificity <strong>95%</strong>; "negative results cannot exclude ITB"</td><td>${cite(129)}</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("AFB", "CD", "CT", "IGRA", "ITB", "PCR")}
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
          ${abbrev("ATS", "CDC", "IDSA", "NAAT")}
          <p><strong>Take-home:</strong> the colonoscopy features and the positive IGRA lean towards TB, but <strong>none of the exclusive features is present</strong>. This is the classic unresolved case. ${cite(126)}</p>`,
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
                <tr><td><strong>Pratap Mouli 2017</strong> ${cite(130)}</td><td>Retrospective, 288 patients (131 eventual CD, 157 ITB), plus a prospective validation cohort of 55 with diagnostic confusion (India)</td><td><strong>Symptomatic response to TB treatment:</strong> 94% of ITB by 3 months, but also <strong>38%</strong> of eventual CD at 3 months (64% at 2 months in validation). <strong>Endoscopic mucosal healing: 100% of ITB vs 5% of CD</strong></td></tr>
                <tr><td><strong>Tubach 2009</strong> ${cite(85)}</td><td>French RATIO registry</td><td>TB risk with anti-TNF monoclonal antibodies is high (SIR 18.6&ndash;29.3), and none of the affected patients had received correct prophylaxis</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("CD", "ITB", "SIR", "TNF")}
          <h4>Answer</h4>
          <ul>
            <li><strong>Don't start immunosuppression while TB is unexcluded.</strong> A <strong>therapeutic trial of TB treatment</strong> is still needed "in a significant proportion of patients to establish the diagnosis", despite the cost of delaying a Crohn's diagnosis. ${cite(126)}</li>
            <li><strong>Screen before any biologic.</strong> Guidelines call for TB screening before biologics, with latent TB infection (LTBI) treatment first. ${cite(96)}</li>
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
                <tr><td><strong>Jullien 2016, Cochrane</strong> ${cite(131)}</td><td>3 RCTs, 328 adults with intestinal and peritoneal TB (Asia)</td><td><strong>6 vs 9 months:</strong> relapse 2/140 vs 0/129 (too few events to compare; very low certainty). Clinical cure <strong>no different</strong> (RR 1.02, 0.97&ndash;1.08; moderate certainty). No evidence that 6 months is inadequate</td></tr>
                <tr><td><strong>Tanoglu 2020</strong> ${cite(132)}</td><td>104 proven GI TB, 21 centres in 8 countries <strong>including Saudi Arabia</strong></td><td>Terminal ileum the commonest site (44%). Biopsy culture positive in 87% of those cultured; PCR positive in 95% of those tested. <strong>One-third immunosuppressed. 43% diagnosed from surgical specimens.</strong> Mortality 3.8%, relapse 1.9%</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("GI", "PCR", "RCT", "RR")}
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
          ${abbrev("#", "ATS", "CDC", "E", "H", "IDSA", "NTP", "R", "Z")}
          <p><strong>For this patient:</strong> <strong>2HRZE/4HR (6 months).</strong> ${cite(3, 131)}</p>`,
        pearl:
          "Gut TB doesn't need a longer course. Six months is as good as nine in the trials we have.",
      },
      {
        title: "Two months later, the pain is gone. Diagnosis confirmed?",
        context: "At 2 months he is pain-free and gaining weight.",
        question: "Does his clinical response confirm intestinal TB?",
        reveal: `
          <ul>
            <li><strong>Not on its own.</strong> Symptoms also improved in <strong>38&ndash;64%</strong> of patients who turned out to have Crohn's disease. ${cite(130)}</li>
            <li><strong>Mucosal healing is the discriminator:</strong> it occurred in <strong>100%</strong> of intestinal TB vs <strong>5%</strong> of Crohn's disease. <strong>Repeat colonoscopy</strong> is needed to confirm. ${cite(130)}</li>
            <li><strong>Symptoms that persist after 3 months</strong> of TB treatment suggest Crohn's disease. ${cite(130)}</li>
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
      "38-year-old Saudi woman with 2 months of abdominal distension, low-grade fevers, night sweats and weight loss. Ultrasound: moderate ascites. Computed tomography (CT): ascites with smooth peritoneal thickening and omental thickening; ovaries not clearly enlarged. <strong>Serum cancer antigen 125 (CA-125) raised.</strong> She has been referred to gynaecological oncology for suspected ovarian cancer." +
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
                <li><strong>Diagnostic paracentesis:</strong> cell count and differential; <strong>serum&ndash;ascites albumin gradient (SAAG)</strong>; <strong>adenosine deaminase (ADA)</strong> &plusmn; free interferon-&gamma; (IFN-&gamma;); <strong>acid-fast bacilli (AFB) smear, mycobacterial culture</strong> and nucleic acid amplification test (NAAT). ${cite(1)}</li>
                <li>Consider TB peritonitis in anyone with unexplained <strong>lymphocytic ascites</strong> and a <strong>SAAG &lt;11 g/L</strong>. ${cite(133)}</li>
                <li><strong>Chest radiograph (CXR).</strong></li>
              </ul>
            </li>
            <li><strong>Peritoneal carcinomatosis / advanced ovarian cancer</strong>
              <ul>
                <li><strong>Ascitic cytology</strong>, then tissue.</li>
                <li><strong>A raised CA-125 does not separate them:</strong> in 28 women with abdominopelvic TB, CA-125 was raised in <strong>all 28</strong>, and half were diagnosed only at laparotomy. ${cite(134)}</li>
              </ul>
            </li>
            <li><strong>Ascites from portal hypertension</strong> (cirrhosis, heart failure)
              <ul><li>A <strong>high SAAG</strong> points here. ${cite(133)}</li></ul>
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
                <tr><td><strong>ADA</strong></td><td>Meta-analysis, 20 studies, 2,291 participants ${cite(135)}</td><td><strong>90%</strong> (85&ndash;94)</td><td><strong>94%</strong> (92&ndash;95)</td><td>Very low certainty (GRADE); cut-off varied</td></tr>
                <tr><td>ADA</td><td>Meta-analysis of 4 studies, summarised by ATS/IDSA/CDC ${cite(1)}</td><td>100%</td><td>97%</td><td>Threshold 36&ndash;40 U/L</td></tr>
                <tr><td><strong>Free IFN-&gamma;</strong></td><td>Meta-analysis of 6 studies, summarised by ATS/IDSA/CDC ${cite(1)}</td><td>93%</td><td>99%</td><td>Thresholds varied</td></tr>
                <tr><td><strong>Mycobacterial culture</strong></td><td>ATS/IDSA/CDC summary ${cite(1)}</td><td>45&ndash;69%</td><td>&gt;97%</td><td>Takes weeks</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("ADA", "ATS", "CDC", "GRADE", "IDSA", "IFN-γ")}
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr><td>ATS/IDSA/CDC (2017) ${cite(1)}</td><td>Measure <strong>ADA</strong> and <strong>free IFN-&gamma;</strong> on fluid in suspected peritoneal TB</td><td>Conditional, low</td></tr>
                <tr><td>Same ${cite(1)}</td><td>Culture (strong); smear and NAAT (conditional). <strong>Negative results do not exclude TB</strong></td><td>Strong / conditional</td></tr>
                <tr><td>Sanai 2005, systematic review ${cite(133)}</td><td>Culture of ascitic fluid or peritoneal biopsy is the <strong>gold standard</strong>; <strong>low threshold for diagnostic laparoscopy</strong></td><td>(review recommendation)</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("ADA", "ATS", "CDC", "IDSA", "IFN-γ", "NAAT")}
          <p><strong>Take-home:</strong> lymphocytic, low-SAAG ascites with a high ADA and negative cytology makes peritoneal TB very likely. A negative smear and NAAT don't count against it. ${cite(1, 135)}</p>`,
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
                <tr><td><strong>Hossain 1992</strong> ${cite(136)}</td><td>82 laparoscopies, Riyadh</td><td><strong>22</strong> found peritoneal TB. Direct visualization plus peritoneal biopsy "provide the definitive tissue diagnosis". The tuberculin test was <strong>not always positive</strong></td></tr>
                <tr><td>ATS/IDSA/CDC summary ${cite(1)}</td><td>Accuracy studies</td><td><strong>Peritoneal biopsy histology: 79&ndash;100%</strong> sensitive</td></tr>
                <tr><td><strong>Liu 2014</strong> ${cite(134)}</td><td>28 women with abdominopelvic TB and raised CA-125</td><td>Diagnosis came from <strong>laparotomy in 50%</strong> and laparoscopy in 32%. "Treatment &hellip; is totally based on medical therapy other than surgery except biopsy"</td></tr>
                <tr><td><strong>Tanoglu 2020</strong> ${cite(132)}</td><td>104 GI TB, 8 countries including Saudi Arabia</td><td>Ascitic culture positive in <strong>11 of 19</strong> (57.9%). <strong>43%</strong> were diagnosed from surgical specimens</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("ATS", "CA-125", "CDC", "GI", "IDSA")}
          <h4>Answer</h4>
          <ul>
            <li>If <strong>malignancy remains a real possibility</strong> (as the gynaecologists fear), <strong>laparoscopy with peritoneal biopsy</strong> is the right next step. It gives histology, culture and drug-susceptibility testing (DST) in one procedure, and <strong>avoids a laparotomy</strong>. ${cite(133, 136, 134)}</li>
            <li>If the picture were unequivocal (young, no mass, very high ADA), many would treat and follow closely. ${cite(3, 135)}</li>
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
                <tr><td><strong>Jullien 2016, Cochrane</strong> ${cite(131)}</td><td>3 RCTs, 328 adults with intestinal <strong>and peritoneal</strong> TB</td><td><strong>6 vs 9 months:</strong> no difference in clinical cure (moderate certainty). Relapse too rare to compare</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("RCT")}
          <h4>Guidelines</h4>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr><th>Guideline (year)</th><th>Recommendation</th><th>Strength / certainty</th></tr></thead>
              <tbody>
                <tr><td>ATS/CDC/IDSA (2016) ${cite(3)}</td><td><strong>6 months</strong> is adequate for peritoneal TB. Data on <strong>adjunctive corticosteroids</strong> for TB peritonitis are <strong>limited</strong>, so they should <strong>not</strong> be prescribed routinely</td><td>Expert opinion</td></tr>
                <tr><td>Sanai 2005 ${cite(133)}</td><td>6 months of first-line drugs in uncomplicated cases</td><td>(review recommendation)</td></tr>
                <tr><td>Saudi NTP Manual (2021) ${cite(5)}</td><td>No peritoneal-specific adult recommendation; 2HRZE/4HR standard</td><td>Not graded</td></tr>
              </tbody>
            </table>
          </div>
          ${abbrev("#", "ATS", "CDC", "E", "H", "IDSA", "NTP", "R", "Z")}
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
            <li>In a cross-sectional study, ADA activity and accuracy were <strong>significantly lower in cirrhotic patients</strong>, regardless of age. ADA also <strong>fell with increasing age</strong>. ${cite(137)}</li>
            <li>A "normal" ADA in a cirrhotic patient <strong>does not reassure</strong>: go to culture and peritoneal biopsy. ${cite(137, 133)}</li>
            <li>TB peritonitis frequently complicates end-stage liver or renal disease, which adds to the diagnostic difficulty. ${cite(133)}</li>
          </ul>
          <h4>(b) Peritoneal dialysis</h4>
          <ul>
            <li>A <strong>Jeddah</strong> cohort of 89 continuous ambulatory peritoneal dialysis (CAPD) patients over 12 years found <strong>4 cases</strong> of TB peritonitis among 103 peritonitis episodes. All presented insidiously with <strong>cloudy fluid</strong>. Diagnosis was by polymerase chain reaction (PCR) (1), culture (2) or clinical response (1). ${cite(138)}</li>
            <li><strong>All 4 needed catheter removal</strong>, and all were converted to haemodialysis; one later restarted CAPD. All survived. The authors recommend <strong>early TB treatment and catheter removal</strong>. ${cite(138)}</li>
          </ul>`,
        pearl:
          "In cirrhosis, a low ADA doesn't rule out TB. In a peritoneal dialysis (PD) patient, \"culture-negative\" cloudy dialysate that doesn't respond to antibiotics needs a TB work-up, and the catheter usually has to come out.",
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
    optionNotes: [
      `A smear-positive, NAAT-negative specimen points away from TB; starting four drugs risks treating NTM as TB. ${cite(1)}`,
      `Can't separate latent from active TB and doesn't identify the organism in the sputum. ${cite(1)}`,
      `The same pitfall as A. The negative NAAT on this smear-positive sample makes TB unlikely. ${cite(1)}`,
      `Correct. It separates <em>M. tuberculosis</em> from NTM. ${cite(1)}`,
      `Not needed. In a smear-positive patient a negative NAAT already makes TB unlikely, and the answer comes from culture with identification of the isolate. ${cite(1)}`,
    ],
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
    optionNotes: [
      `Cavitation marks bacillary burden and infectiousness, not resistance. ${cite(4, 71)}`,
      `Diabetes raises the risk of progressing to disease (RR 3.11), not of drug resistance. ${cite(88)}`,
      `Correct. MDR/RR-TB was 16% in previously treated vs 3.2% in new patients (2024), with a Saudi odds ratio of about 7. ${cite(11, 20)}`,
      `Smear grade reflects bacillary load, not resistance. ${cite(4, 71)}`,
      `Like cavitation and smear grade, extent of disease speaks to burden, not resistance. As a new patient, the baseline MDR/RR risk is about 3%. ${cite(11)}`,
    ],
    rationale: `
      <p>Previous treatment, especially with adherence gaps, is the strongest predictor of resistance. Worldwide in 2024, <strong>16%</strong> of previously treated patients had MDR/RR-TB, versus <strong>3.2%</strong> of new patients. ${cite(11)} In Saudi data, prior treatment carried an odds ratio of about <strong>7</strong> for MDR-TB. ${cite(20)}</p>
      <ul>
        <li><strong>Cavitation and a high smear grade</strong> mark bacillary burden and infectiousness, not resistance. ${cite(4, 71)}</li>
        <li><strong>Diabetes</strong> raises the risk of progressing to disease (RR 3.11), not of resistance. ${cite(88)}</li>
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
    optionNotes: [
      `Wrong direction. Rifampin <em>lowers</em> moxifloxacin exposure by about 30%. ${cite(15)}`,
      `Potency isn't the deciding issue here; the rifampin interaction is.`,
      `"Ofloxacin and ciprofloxacin are considered inferior quinolones" against TB; use a later-generation agent (levofloxacin or moxifloxacin). ${cite(15)}`,
      `Right drug, wrong reason. Levofloxacin can prolong QT; check baseline QTc and potassium. ${cite(13)}`,
      `Correct. ${cite(15)}`,
    ],
    rationale: `
      <p>Rifampin lowers moxifloxacin exposure by roughly 30%, so some experts prefer levofloxacin alongside rifampin. ${cite(15)}</p>
      <ul>
        <li><strong>"Levofloxacin, because it does not prolong the QT interval"</strong> (the most tempting option) has the right drug for the wrong reason. Levofloxacin should be avoided in known or suspected QT prolongation; baseline QTc and potassium still matter. ${cite(13)}</li>
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
    optionNotes: [
      `Not a listed neuropathy risk factor. ${cite(3)}`,
      `Correct. Diabetes is a neuropathy risk with isoniazid. ${cite(3)}`,
      `Reflects disease burden, not neuropathy risk.`,
      `Reflects bacillary load, not neuropathy risk.`,
      `Irrelevant to isoniazid toxicity.`,
    ],
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
    optionNotes: [
      `Correct. It predicts greater infectiousness even when smears are negative; the Saudi manual still calls for contact investigation. ${cite(4, 5)}`,
      `"With limited exceptions, only patients with pulmonary or laryngeal TB can transmit their infection." Node disease doesn't add to his infectiousness. ${cite(4)}`,
      `Reflects immune sensitisation, not how many bacilli he sheds. ${cite(1)}`,
      `Not a marker of infectiousness. Age matters only at the young end (transmission from children under 10 is unusual); smear, culture and cavitation are what count. ${cite(4)}`,
      `CDC groups pleural TB with pulmonary disease for contact investigation, but he already has culture-confirmed pulmonary TB. An effusion doesn't raise infectiousness the way cavitation does. ${cite(4)}`,
    ],
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
    optionNotes: [
      `No CD4 threshold applies in HIV-associated TB. ${cite(53)}`,
      `Start now; it isn't tied to ART timing. ${cite(5, 53)}`,
      `Start at the beginning and continue throughout TB treatment. ${cite(5)}`,
      `Correct (WHO strong, high certainty). ${cite(53, 5)}`,
      `Same as A; no threshold is used. ${cite(53)}`,
    ],
    rationale: `
      <p>WHO recommends co-trimoxazole prophylaxis for all people with HIV and active TB, <strong>regardless of CD4</strong> (strong recommendation, high certainty). ${cite(53)} The Saudi NTP Manual gives it to all HIV-positive TB patients, started as soon as possible and continued throughout TB treatment. ${cite(5)}</p>
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
    optionNotes: [
      `Correct. Recommended before ART when CD4 &lt;100. A negative serum CrAg nearly excludes cryptococcal meningitis (sensitivity 99.7%). ${cite(34, 139)}`,
      `A TB test, and his TB is already confirmed. ${cite(33)}`,
      `The step <em>after</em> a positive CrAg, not a routine test for everyone. ${cite(34)}`,
      `TB is already confirmed; this adds nothing before ART.`,
    ],
    rationale: `
      <p>WHO strongly recommends cryptococcal antigen (CrAg) screening before ART when CD4 is <strong>&lt;100</strong>. A positive result leads to a lumbar puncture and pre-emptive antifungal therapy. ${cite(34)}</p>
      <ul>
        <li><strong>Lumbar puncture</strong> (the most tempting option) is the step <em>after</em> a positive CrAg, not a routine test for everyone.</li>
        <li><strong>LF-LAM</strong> is a TB diagnostic for people with advanced HIV being evaluated for TB. ${cite(33)} His TB is already confirmed.</li>
      </ul>
      <h4>How accurate is CrAg?</h4>
      <div class="table-scroll">
        <table class="data-table">
          <thead><tr><th>Specimen</th><th>Sensitivity (95% CI)</th><th>Specificity (95% CI)</th><th>What it means</th></tr></thead>
          <tbody>
            <tr><td>Serum CrAg ${cite(139)}</td><td>99.7% (97.4&ndash;100)</td><td>94.1% (88.3&ndash;98.1)</td><td>A negative result nearly excludes cryptococcal meningitis; a positive one doesn't prove it (antigenaemia without CNS disease), so do an LP</td></tr>
            <tr><td>CSF CrAg ${cite(139)}</td><td>98.8% (96.2&ndash;99.6)</td><td>99.3% (96.7&ndash;99.9)</td><td>Confirms cryptococcal meningitis</td></tr>
          </tbody>
        </table>
      </div>
      ${abbrev("CI", "CNS", "CSF", "CrAg", "LP")}
      <p style="color:var(--text-muted); font-size:0.9rem;">Adults living with HIV with suspected cryptococcal meningitis; reference standard CSF culture (11 studies, 3,600 participants). ${cite(139)}</p>
      <p>In HIV-negative patients, serum CrAg is less sensitive (about 83&ndash;91% by lateral flow assay in one small single-centre study), so a negative result is less reliable for ruling out disease. ${cite(140)}</p>`,
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
    optionNotes: [
      `Reserved for when induced sputum can't be obtained. ${cite(1)}`,
      `Not the recommended first step in adults; ATS/IDSA/CDC suggest sputum induction first, then bronchoscopy if that fails. ${cite(1)}`,
      `Correct (ATS/IDSA/CDC, conditional). ${cite(1)}`,
      `A bronchoscopic step, used only after induced sputum fails, and mainly when a rapid diagnosis is essential. ${cite(1)}`,
      `Not a first-line specimen for pulmonary TB. Urine testing (LF-LAM) is for people with advanced HIV. ${cite(33)}`,
    ],
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
    optionNotes: [
      `The same histology again doesn't exclude other granulomatous causes. ${cite(58)}`,
      `Supports sarcoidosis but doesn't replace excluding other causes. ${cite(58)}`,
      `A test for TB infection; it can't rule TB in or out in the node. The cultures can. ${cite(1)}`,
      `Not required. Diagnosis rests on a compatible presentation, non-necrotizing granulomas "in one or more tissue samples", and exclusion of alternatives. ${cite(58)}`,
      `Correct. ${cite(58)}`,
    ],
    rationale: `
      <p>The ATS guideline defines sarcoidosis by non-necrotizing granulomas <strong>plus exclusion of other granulomatous causes</strong>. ${cite(58)} That is why the pending cultures matter: on extrapulmonary tissue, a negative smear or NAAT never excludes TB. ${cite(1)}</p>
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
    optionNotes: [
      `BCG can cause false-positive TSTs, and staff who will be retested risk a "boosted" result later. The Saudi manual uses two-step testing when a TST is used. ${cite(1, 5)}`,
      `Correct (ATS/IDSA/CDC, age &ge;5 with BCG). ${cite(1)}`,
      `An acceptable alternative (Saudi approach), not the preferred test here. ${cite(5, 1)}`,
      `Not routine. A second test is suggested only to confirm a <em>positive</em> first test in someone at low risk of infection. ${cite(1)}`,
      `Looks for disease, not infection.`,
    ],
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
    optionNotes: [
      `Biologically implausible; the TST alone takes up to 6 weeks to convert. ${cite(78)}`,
      `Correct. About 62% of eventual cases occur by 2 years (97% among Amsterdam contacts). ${cite(78)}`,
      `By 5 years about 83% of eventual cases have already occurred. ${cite(78)}`,
      `Late reactivation happens but is a small share of cases. ${cite(78)}`,
      `Risk is front-loaded, highest in the first year. ${cite(78, 82)}`,
    ],
    rationale: `
      <p>Most of the lifetime risk comes early. Of eventual cases, about <strong>45% occur by 1 year, 62% by 2 years and 83% by 5 years</strong>; among Amsterdam contacts, 97% occurred within 2 years. ${cite(78)} Contact studies show incidence is highest in the first year. ${cite(82)}</p>
      <ul>
        <li><strong>Within the first 2 weeks</strong> would be biologically implausible, since the TST itself takes up to 6 weeks to convert. ${cite(78)}</li>
      </ul>`,
  },
  {
    topic: "TB risk with anti-TNF agents",
    stem:
      "Across registry and cohort data, which anti-TNF agent carries the <strong>lowest</strong> TB risk?",
    options: [
      "Adalimumab",
      "Etanercept",
      "Infliximab",
      "The risk was similar across all three",
    ],
    answer: 1,
    optionNotes: [
      `Highest in RATIO (SIR 29.3), but not consistently across studies; always well above etanercept. ${cite(85, 141, 142)}`,
      `Correct, though still raised above baseline. ${cite(85, 141, 142, 87)}`,
      `Highest in the Korean data and earliest onset (median 5.5 months), but no consistent ranking vs adalimumab. ${cite(141, 142)}`,
      `No. The monoclonals ran about 3&ndash;7&times; the rate with etanercept. ${cite(85, 141, 142)}`,
    ],
    rationale: `
      <p><strong>Etanercept</strong> (the soluble TNF receptor) had the lowest TB risk in each dataset below, but its risk is <strong>still raised above baseline</strong>: in RATIO its standardized incidence ratio was 1.8, and NSTC/NTCA list it among the higher-risk agents. ${cite(85, 141, 142, 87)} Monoclonal anti-TNF antibodies carry a much higher risk.</p>
      <h4>Studies</h4>
      <div class="table-scroll">
        <table class="data-table">
          <thead><tr><th>Study</th><th>Infliximab</th><th>Adalimumab</th><th>Etanercept</th></tr></thead>
          <tbody>
            <tr><td>RATIO, France (Tubach 2009) ${cite(85)}</td><td>SIR 18.6</td><td>SIR 29.3</td><td>SIR 1.8</td></tr>
            <tr><td>BSRBR, UK RA (Dixon 2010) ${cite(141)}</td><td>136/100,000 PY; adj. IRR 3.1 vs ETN</td><td>144/100,000 PY; adj. IRR 4.2</td><td>39/100,000 PY</td></tr>
            <tr><td>South Korea claims (Jung 2015) ${cite(142)}</td><td>IRR 6.8 vs ETN</td><td>IRR 3.45</td><td>reference</td></tr>
          </tbody>
        </table>
      </div>
      ${abbrev("ETN", "IRR", "PY", "RA", "SIR")}
      <p>Infliximab vs adalimumab differs between studies; there is no consistent ranking. ${cite(85, 141, 142)} TB appears earliest with infliximab (BSRBR median 5.5 months vs 18.5 months with adalimumab). ${cite(141)}</p>
      <h4>Guidelines: select biologic and small-molecule agents and TB risk (NSTC/NTCA; as of June 2022)</h4>
      <div class="table-scroll">
        <table class="data-table">
          <thead><tr><th>Risk of TB</th><th>Class</th><th>Drugs</th></tr></thead>
          <tbody>
            <tr><td>Higher</td><td>TNF-&alpha; inhibitors</td><td>infliximab, adalimumab, certolizumab, golimumab, etanercept (lowest of the class, but still raised ${cite(87, 85, 141, 142)})</td></tr>
            <tr><td>Higher</td><td>JAK inhibitors</td><td>baricitinib, filgotinib, peficitinib, tofacitinib, upadacitinib</td></tr>
            <tr><td>Higher</td><td>IL-6 blockers</td><td>sarilumab, tocilizumab</td></tr>
            <tr><td>Potentially increased</td><td>IL-1 blockers</td><td>anakinra, canakinumab, rilonacept</td></tr>
            <tr><td>Potentially increased</td><td>IL-17 blockers</td><td>brodalumab, ixekizumab, secukinumab</td></tr>
            <tr><td>Potentially increased</td><td>IL-23 / IL-12-23 blockers</td><td>guselkumab, risankizumab, tildrakizumab, ustekinumab</td></tr>
            <tr><td>Potentially increased</td><td>B-cell agents</td><td>belimumab, rituximab</td></tr>
            <tr><td>Potentially increased</td><td>T-cell costimulation modulator</td><td>abatacept</td></tr>
          </tbody>
        </table>
      </div>
      ${abbrev("IL", "JAK", "TNF")}
      <p style="color:var(--text-muted); font-size:0.9rem;">NSTC/NTCA Clinical Guide, Table 4 ${cite(87)}.</p>
      <ul>
        <li><strong>Steroids:</strong> the risk is dose-dependent, highest with prolonged use (prednisone equivalent &ge;15 mg/day for &ge;1 month, or &ge;2 mg/kg/day). ${cite(87)}</li>
        <li><strong>PD-1/PD-L1 checkpoint inhibitors</strong> have been associated with progression to TB disease. ${cite(87)}</li>
        <li><strong>Screen and treat latent TB infection before starting</strong> any of these agents. ${cite(87)} None of the anti-TNF-associated cases in RATIO had received correct prophylaxis. ${cite(85, 96)}</li>
      </ul>`,
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
        { n: 7, text: "World Health Organization. WHO consolidated guidelines on tuberculosis. Module 4: treatment and care. Geneva: WHO; 2025.", tag: "Clinical practice guideline — 2025 edition; introduces the BDLLfxC regimen and a preference order among modified 9-month regimens" },
        { n: 8, text: "Jindani A, Harrison TS, Nunn AJ, Phillips PP, Churchyard GJ, Charalambous S, et al. High-dose rifapentine with moxifloxacin for pulmonary tuberculosis. N Engl J Med. 2014;371(17):1599-608.", doi: "10.1056/NEJMoa1314210", tag: "Randomized controlled non-inferiority trial — RIFAQUIN" },
        { n: 9, text: "Dorman SE, Nahid P, Kurbatova EV, Phillips PPJ, Bryant K, Dooley KE, et al. Four-Month Rifapentine Regimens with or without Moxifloxacin for Tuberculosis. N Engl J Med. 2021;384(18):1705-1718.", doi: "10.1056/NEJMoa2033400", tag: "Randomized controlled non-inferiority trial — Study 31/A5349" },
        { n: 10, text: "Zifodya JS, Kreniske JS, Schiller I, Kohli M, Dendukuri N, Schumacher SG, et al. Xpert Ultra versus Xpert MTB/RIF for pulmonary tuberculosis and rifampicin resistance in adults with presumptive pulmonary tuberculosis. Cochrane Database Syst Rev. 2021;2(2):CD009593.", doi: "10.1002/14651858.CD009593.pub5", tag: "Diagnostic test accuracy systematic review (Cochrane)" },
        { n: 11, text: "World Health Organization. Global tuberculosis report 2025. Geneva: World Health Organization; 2025.", url: "https://www.who.int/teams/global-programme-on-tuberculosis-and-lung-health/tb-reports/global-tuberculosis-report-2025", tag: "Global surveillance report" },
        { n: 12, text: "Warren RM, Streicher EM, Gey van Pittius NC, Marais BJ, van der Spuy GD, Victor TC, et al. The clinical relevance of Mycobacterial pharmacogenetics. Tuberculosis (Edinb). 2009;89(3):199-202.", doi: "10.1016/j.tube.2009.03.001", tag: "Narrative review" },
        { n: 13, text: "World Health Organization. WHO treatment guidelines for isoniazid-resistant tuberculosis: supplement to the WHO treatment guidelines for drug-resistant tuberculosis. Geneva: WHO; 2018.", tag: "Clinical practice guideline" },
        { n: 14, text: "Fregonese F, Ahuja SD, Akkerman OW, et al. Comparison of different treatments for isoniazid-resistant tuberculosis: an individual patient data meta-analysis. Lancet Respir Med. 2018;6(4):265-275.", tag: "Individual patient data meta-analysis" },
        { n: 15, text: "Nahid P, Mase SR, Migliori GB, Sotgiu G, Bothamley GH, Brozek JL, et al. Treatment of Drug-Resistant Tuberculosis. An Official ATS/CDC/ERS/IDSA Clinical Practice Guideline. Am J Respir Crit Care Med. 2019;200(10):e93-e142.", doi: "10.1164/rccm.201909-1874ST", tag: "Clinical practice guideline — ATS/CDC/ERS/IDSA drug-resistant TB" },
      ],
    },
    {
      title: "Case 2 — MDR-TB / BPaLM",
      items: [
        { n: 16, text: "Conradie F, Diacon AH, Ngubane N, et al. Treatment of highly drug-resistant pulmonary tuberculosis. N Engl J Med. 2020;382(10):893-902.", doi: "10.1056/NEJMoa1901814", tag: "Single-arm, open-label trial — Nix-TB" },
        { n: 17, text: "Conradie F, et al. Bedaquiline-pretomanid-linezolid regimens for drug-resistant tuberculosis. N Engl J Med. 2022;387(9):810-823.", doi: "10.1056/NEJMoa2119430", tag: "Randomized dose-finding trial — ZeNix" },
        { n: 18, text: "World Health Organization. Definitions and reporting framework for tuberculosis – 2013 revision (updated December 2014 and January 2020). Geneva: World Health Organization; 2013.", url: "https://www.who.int/publications/i/item/9789241505345", tag: "WHO definitions framework" },
        { n: 19, text: "World Health Organization. Meeting report of the WHO expert consultation on the definition of extensively drug-resistant tuberculosis, 27-29 October 2020. Geneva: World Health Organization; 2021.", url: "https://www.who.int/publications/i/item/9789240018662", tag: "WHO expert consultation report — pre-XDR and XDR definitions" },
        { n: 20, text: "Alanazi R, Alghamdi H, Alansari R, Albassam S, Alghamdi H, Altowairqi H, et al. Epidemiology and risk factors of multidrug-resistant tuberculosis in Saudi Arabia: a systematic review and meta-analysis. Front Public Health. 2026;14:1824576.", doi: "10.3389/fpubh.2026.1824576", tag: "Systematic review and meta-analysis (Saudi Arabia)" },
        { n: 21, text: "Wang W, Liu R, Yao C, Huo F, Shang Y, Zhang X, et al. Reevaluating Rifampicin Breakpoint Concentrations for Mycobacterium tuberculosis Isolates with Disputed rpoB Mutations and Discordant Susceptibility Phenotypes. Microbiol Spectr. 2022;10(1):e0208721.", doi: "10.1128/spectrum.02087-21", tag: "Laboratory study" },
        { n: 22, text: "World Health Organization. Technical report on critical concentrations for drug susceptibility testing of isoniazid and the rifamycins (rifampicin, rifabutin and rifapentine). Geneva: World Health Organization; 2021.", url: "https://www.who.int/publications/i/item/9789240017283", tag: "WHO technical report" },
        { n: 23, text: "Makhado NA, Matabane E, Faccin M, Pinçon C, Jouet A, Boutachkourt F, et al. Outbreak of multidrug-resistant tuberculosis in South Africa undetected by WHO-endorsed commercial tests: an observational study. Lancet Infect Dis. 2018;18(12):1350-1359.", doi: "10.1016/S1473-3099(18)30496-1", tag: "Observational study (outbreak genomic investigation)" },
        { n: 24, text: "Sanchez-Padilla E, Merker M, Beckert P, Jochims F, Dlamini T, Kahn P, et al. Detection of drug-resistant tuberculosis by Xpert MTB/RIF in Swaziland. N Engl J Med. 2015;372(12):1181-2.", doi: "10.1056/NEJMc1413930", tag: "Correspondence reporting observational genotypic data" },
        { n: 25, text: "Ardizzoni E, Ariza E, Mulengwa D, Mpala Q, de La Tour R, Maphalala G, et al. Thin-Layer-Agar-Based Direct Phenotypic Drug Susceptibility Testing on Sputum in Eswatini Rapidly Detects Mycobacterium tuberculosis Growth and Rifampicin Resistance Otherwise Missed by WHO-Endorsed Diagnostic Tests. Antimicrob Agents Chemother. 2021;65(6):e02263-20.", doi: "10.1128/AAC.02263-20", tag: "Diagnostic accuracy study" },
        { n: 26, text: "Alawi MM, Alserehi HA, Ali AO, Albalawi AM, Alanizi MK, Nabet FM, et al. Epidemiology of tuberculosis in Saudi Arabia following the implementation of end tuberculosis strategy: Analysis of the surveillance data 2015-2019. Saudi Med J. 2024;45(1):60-68.", doi: "10.15537/smj.2024.45.1.20230424", tag: "National surveillance data analysis (Saudi Arabia)" },
        { n: 27, text: "Nyang'wa BT, Berry C, Kazounis E, et al. A 24-week, all-oral regimen for rifampin-resistant tuberculosis. N Engl J Med. 2022;387(25):2331-2343.", doi: "10.1056/NEJMoa2117166", tag: "Randomized controlled trial — TB-PRACTECAL" },
        { n: 28, text: "Goodall RL, Meredith SK, Nunn AJ, Bayissa A, Bhatnagar AK, Bronson G, et al. Evaluation of two short standardised regimens for the treatment of rifampicin-resistant tuberculosis (STREAM stage 2): an open-label, multicentre, randomised, non-inferiority trial. Lancet. 2022;400(10366):1858-1868.", doi: "10.1016/S0140-6736(22)02078-5", tag: "Randomized controlled non-inferiority trial — STREAM stage 2" },
        { n: 29, text: "Médecins Sans Frontières. Drug-resistant tuberculosis trial ends enrolment after positive initial data. MSF; 24 March 2021.", url: "https://www.msf.org/drug-resistant-tuberculosis-trial-ends-enrolment-after-positive-initial-data", tag: "Trial-sponsor report (not peer-reviewed)" },
        { n: 30, text: "Conradie F, Badat T, Poswa A, Rajaram S, Kooverjee S, Maartens G, et al. A Pragmatic Trial of a 6-Month Strategy for Rifampicin-Resistant Tuberculosis. N Engl J Med. 2026;394(24):2429-2439.", doi: "10.1056/NEJMoa2503687", tag: "Pragmatic randomized controlled non-inferiority trial — BEAT Tuberculosis" },
        { n: 31, text: "Guglielmetti L, Khan U, Velásquez GE, et al. Oral Regimens for Rifampin-Resistant, Fluoroquinolone-Susceptible Tuberculosis. N Engl J Med. 2025;392(5):468-482.", doi: "10.1056/NEJMoa2400327", tag: "Randomized controlled non-inferiority trial — endTB" },
        { n: 32, text: "Guglielmetti L, Khan U, Velásquez GE, et al. Bedaquiline, delamanid, linezolid, and clofazimine for rifampicin-resistant and fluoroquinolone-resistant tuberculosis (endTB-Q). Lancet Respir Med. 2025;13(9):809-820.", doi: "10.1016/S2213-2600(25)00194-8", tag: "Randomized controlled non-inferiority trial — endTB-Q" },
      ],
    },
    {
      title: "Case 3 — Miliary TB / HIV / LAM",
      items: [
        { n: 33, text: "World Health Organization. Lateral flow urine lipoarabinomannan assay (LF-LAM) for the diagnosis of active tuberculosis in people living with HIV: policy update. Geneva: WHO; 2019.", tag: "Clinical practice guideline / policy update" },
        { n: 34, text: "World Health Organization. WHO guidelines on the management of advanced HIV disease. Geneva: World Health Organization; 2025. NCBI Bookshelf NBK620050.", url: "https://www.ncbi.nlm.nih.gov/books/NBK620050/", tag: "Clinical practice guideline (WHO)" },
        { n: 35, text: "Narayanasamy S, Dat VQ, Thanh NT, Ly VT, Chan JF, Yuen KY, et al. A global call for talaromycosis to be recognised as a neglected tropical disease. Lancet Glob Health. 2021;9(11):e1618-e1622.", doi: "10.1016/S2214-109X(21)00350-8", tag: "Viewpoint" },
        { n: 36, text: "Pruksaphon K, Intaramat A, Ratanabanangkoon K, Nosanchuk JD, Vanittanakom N, Youngchim S. Diagnostic laboratory immunology for talaromycosis (penicilliosis): review from the bench-top techniques to the point-of-care testing. Diagn Microbiol Infect Dis. 2020;96(3):114959.", doi: "10.1016/j.diagmicrobio.2019.114959", tag: "Narrative review" },
        { n: 37, text: "Le T, Kinh NV, Cuc NTK, Tung NLN, Lam NT, Thuy PTT, et al. A Trial of Itraconazole or Amphotericin B for HIV-Associated Talaromycosis. N Engl J Med. 2017;376(24):2329-2340.", doi: "10.1056/NEJMoa1613306", tag: "Randomized controlled trial — IVAP" },
        { n: 38, text: "Kathuria S, Capoor MR, Yadav S, Singh A, Ramesh V. Disseminated histoplasmosis in an apparently immunocompetent individual from north India: a case report and review. Med Mycol. 2013;51(7):774-8.", doi: "10.3109/13693786.2013.777166", tag: "Case report and literature review" },
        { n: 39, text: "Wiersinga WJ, Virk HS, Torres AG, Currie BJ, Peacock SJ, Dance DAB, et al. Melioidosis. Nat Rev Dis Primers. 2018;4:17107.", doi: "10.1038/nrdp.2017.107", tag: "Review (Primer)" },
        { n: 40, text: "Yoshida A, Doanh PN, Maruyama H. Paragonimus and paragonimiasis in Asia: An update. Acta Trop. 2019;199:105074.", doi: "10.1016/j.actatropica.2019.105074", tag: "Narrative review" },
        { n: 41, text: "Mukae H, Taniguchi H, Matsumoto N, Iiboshi H, Ashitani J, Matsukura S, et al. Clinicoradiologic features of pleuropulmonary Paragonimus westermani on Kyusyu Island, Japan. Chest. 2001;120(2):514-20.", doi: "10.1378/chest.120.2.514", tag: "Case series" },
        { n: 42, text: "Bjerrum S, Schiller I, Dendukuri N, Kohli M, Nathavitharana RR, Zwerling AA, Denkinger CM, Steingart KR, Shah M. Lateral flow urine lipoarabinomannan assay for detecting active tuberculosis in people living with HIV. Cochrane Database Syst Rev. 2019;10(10):CD011420.", doi: "10.1002/14651858.CD011420.pub3", tag: "Diagnostic test accuracy systematic review — also the source of the CD4≤100 subgroup sensitivity estimate" },
        { n: 43, text: "Peter JG, Zijenah LS, Chanda D, et al. Effect on mortality of point-of-care, urine-based lipoarabinomannan testing to guide tuberculosis treatment initiation in HIV-positive hospital inpatients: a pragmatic, parallel-group, multicountry, open-label, randomised controlled trial. Lancet. 2016;387(10024):1187-1197.", tag: "Randomized controlled trial" },
        { n: 44, text: "Gupta-Wright A, Corbett EL, van Oosterhout JJ, et al. Rapid urine-based screening for tuberculosis in HIV-positive patients admitted to hospital in Africa (STAMP): a pragmatic, multicentre, parallel-group, double-blind, randomised controlled trial. Lancet. 2018;392(10144):292-301.", tag: "Randomized controlled trial" },
        { n: 45, text: "McWilliams T, Wells AU, Harrison AC, Lindstrom S, Cameron RJ, Foskin E. Induced sputum and bronchoscopy in the diagnosis of pulmonary tuberculosis. Thorax. 2002;57(12):1010-1014.", tag: "Prospective comparative study" },
        { n: 46, text: "Musso M, Gualano G, Mencarini P, et al. Diagnostic yield of induced sputum and Bronchoalveolar lavage in suspected pulmonary tuberculosis. BMC Infect Dis. 2025;25:680.", doi: "10.1186/s12879-025-11020-3", tag: "Retrospective comparative study" },
        { n: 47, text: "Blanc FX, Sok T, Laureillard D, Borand L, Rekacewicz C, Nerrienet E, et al. Earlier versus later start of antiretroviral therapy in HIV-infected adults with tuberculosis. N Engl J Med. 2011;365(16):1471-81.", doi: "10.1056/NEJMoa1013911", tag: "Randomized controlled trial — CAMELIA" },
        { n: 48, text: "Havlir DV, Kendall MA, Ive P, Kumwenda J, Swindells S, Qasba SS, et al. Timing of antiretroviral therapy for HIV-1 infection and tuberculosis. N Engl J Med. 2011;365(16):1482-91.", doi: "10.1056/NEJMoa1013607", tag: "Randomized controlled trial — STRIDE" },
        { n: 49, text: "Abdool Karim SS, Naidoo K, Grobler A, Padayatchi N, Baxter C, Gray AL, et al. Integration of antiretroviral therapy with tuberculosis treatment. N Engl J Med. 2011;365(16):1492-501.", doi: "10.1056/NEJMoa1014181", tag: "Randomized controlled trial — SAPiT" },
        { n: 50, text: "Meintjes G, Stek C, Blumenthal L, Thienemann F, Schutz C, Buyze J, et al. Prednisone for the Prevention of Paradoxical Tuberculosis-Associated IRIS. N Engl J Med. 2018;379(20):1915-1925.", doi: "10.1056/NEJMoa1800762", tag: "Randomized placebo-controlled trial — PredART" },
        { n: 51, text: "Török ME, Yen NT, Chau TT, Mai NT, Phu NH, Mai PP, et al. Timing of initiation of antiretroviral therapy in human immunodeficiency virus (HIV)--associated tuberculous meningitis. Clin Infect Dis. 2011;52(11):1374-83.", doi: "10.1093/cid/cir230", tag: "Randomized controlled trial" },
        { n: 52, text: "Dooley KE, Kaplan R, Mwelase N, Grinsztejn B, Ticona E, Lacerda M, et al. Dolutegravir-based Antiretroviral Therapy for Patients Coinfected With Tuberculosis and Human Immunodeficiency Virus: A Multicenter, Noncomparative, Open-label, Randomized Trial. Clin Infect Dis. 2020;70(4):549-556.", doi: "10.1093/cid/ciz256", tag: "Randomized non-comparative trial — INSPIRING" },
        { n: 53, text: "World Health Organization. Consolidated guidelines on HIV prevention, testing, treatment, service delivery and monitoring: recommendations for a public health approach. Geneva: World Health Organization; 2021. NCBI Bookshelf NBK572729.", url: "https://www.ncbi.nlm.nih.gov/books/NBK572729/", tag: "Clinical practice guideline (WHO) — section 6.3, co-trimoxazole prophylaxis" },
      ],
    },
    {
      title: "Case 4 — Lymphadenopathy / EBUS",
      items: [
        { n: 54, text: "von Bartheld MB, Dekkers OM, Szlubowski A, et al. Endosonography vs conventional bronchoscopy for the diagnosis of sarcoidosis: the GRANULOMA randomized clinical trial. JAMA. 2013;309(23):2457-2464.", tag: "Randomized controlled trial" },
        { n: 55, text: "Labarca G, Sierra-Ruiz M, Kheir F, Folch E, Majid A, Mehta HJ, Jantz MA, Fernandez-Bussy S. Diagnostic Accuracy of Endobronchial Ultrasound Transbronchial Needle Aspiration in Lymphoma. A Systematic Review and Meta-Analysis. Ann Am Thorac Soc. 2019;16(11):1432-1439.", doi: "10.1513/AnnalsATS.201902-175OC", tag: "Systematic review and meta-analysis" },
        { n: 56, text: "Kennedy MP, McCarthy J. Is Endobronchial Ultrasound-guided Transbronchial Needle Aspiration Useful in the Workup of Patients with Lymphoma? Ann Am Thorac Soc. 2019;16(11):1373-1374.", doi: "10.1513/AnnalsATS.201907-567ED", tag: "Editorial, companion piece to Labarca et al. 2019" },
        { n: 57, text: "Ariza-Prota M, Pérez-Pallarés J, Barisione E, Cruz-Rueda JJ, Onyancha S, Usturoi D, et al. Enhancing diagnostic precision: a multicentric study of endobronchial ultrasound-guided transbronchial mediastinal cryobiopsy in lymphoproliferative disorders. ERJ Open Res. 2025;11(5):00775-2024.", doi: "10.1183/23120541.00775-2024", tag: "Multicentre retrospective study" },
        { n: 58, text: "Crouser ED, Maier LA, Wilson KC, Bonham CA, Morgenthau AS, Patterson KC, et al. Diagnosis and Detection of Sarcoidosis. An Official American Thoracic Society Clinical Practice Guideline. Am J Respir Crit Care Med. 2020;201(8):e26-e51.", doi: "10.1164/rccm.202002-0251ST", tag: "Clinical practice guideline — ATS sarcoidosis" },
        { n: 59, text: "Gupta N, Muthu V, Agarwal R, Dhooria S. Role of EBUS-TBNA in the Diagnosis of Tuberculosis and Sarcoidosis. J Cytol. 2019;36(2):128-130.", doi: "10.4103/JOC.JOC_150_18", tag: "Prospective single-centre study" },
        { n: 60, text: "Lin CK, Keng LT, Lim CK, Lin YT, Lin SY, Chen LY, Yao ZH, Chen YH, Ho CC. Diagnosis of mediastinal tuberculous lymphadenitis using endobronchial ultrasound-guided transbronchial needle aspiration with rinse fluid polymerase chain reaction. J Formos Med Assoc. 2020;119(1 Pt 3):509-515.", doi: "10.1016/j.jfma.2019.07.014", tag: "Retrospective study with prospective data collection" },
        { n: 61, text: "Lucey O, Potter J, Ricketts W, Castle L, Melzer M. Utility of EBUS-TBNA in diagnosing mediastinal tuberculous lymphadenitis in East London. J Infect. 2022;84(1):17-23.", doi: "10.1016/j.jinf.2021.10.015", tag: "Retrospective study" },
        { n: 62, text: "Yang W, Yang H, Zhang Q, Herth FJF, Zhang X. Comparison between Endobronchial Ultrasound-Guided Transbronchial Node Biopsy and Transbronchial Needle Aspiration: A Meta-Analysis. Respiration. 2024;103(12):752-764.", doi: "10.1159/000540859", tag: "Meta-analysis" },
        { n: 63, text: "Vilmann P, Clementsen PF, Colella S, Siemsen M, De Leyn P, Dumonceau JM, et al. Combined endobronchial and oesophageal endosonography for the diagnosis and staging of lung cancer. European Society of Gastrointestinal Endoscopy (ESGE) Guideline, in cooperation with the European Respiratory Society (ERS) and the European Society of Thoracic Surgeons (ESTS). Eur Respir J. 2015;46(1):40-60.", doi: "10.1183/09031936.00064515", tag: "Clinical practice guideline — ESGE/ERS/ESTS" },
        { n: 64, text: "von Bartheld MB, van Breda A, Annema JT. Complication rate of endosonography (endobronchial and endoscopic ultrasound): a systematic review. Respiration. 2014;87(4):343-51.", doi: "10.1159/000357066", tag: "Systematic review" },
        { n: 65, text: "Burgard C, Stahl R, de Figueiredo GN, Dinkel J, Liebig T, Cioni D, Neri E, Trumm CG. Percutaneous CT Fluoroscopy-Guided Core Needle Biopsy of Mediastinal Masses: Technical Outcome and Complications of 155 Procedures during a 10-Year Period. Diagnostics (Basel). 2021;11(5):781.", doi: "10.3390/diagnostics11050781", tag: "Retrospective study" },
        { n: 66, text: "Geri G, Passeron A, Heym B, Arlet JB, Pouchot J, Capron L, et al. Paradoxical reactions during treatment of tuberculosis with extrapulmonary manifestations in HIV-negative patients. Infection. 2013;41(2):537-43.", doi: "10.1007/s15010-012-0376-9", tag: "Retrospective cohort study" },
        { n: 67, text: "Rai DK, Kant S, Gupta VB. Paradoxical reaction in peripheral lymph node tuberculosis: a review of its prevalence, clinical characteristics, and possible treatment. Monaldi Arch Chest Dis. 2023;94(3).", doi: "10.4081/monaldi.2023.2625", tag: "Narrative review" },
      ],
    },
    {
      title: "Case 5 — Occupational exposure / LTBI",
      items: [
        { n: 68, text: "Jensen PA, Lambert LA, Iademarco MF, Ridzon R. Guidelines for preventing the transmission of Mycobacterium tuberculosis in health-care settings, 2005. MMWR Recomm Rep. 2005;54(RR-17):1-141.", url: "https://pubmed.ncbi.nlm.nih.gov/16382216/", tag: "Clinical practice guideline — CDC health-care settings" },
        { n: 69, text: "Behr MA, Warren SA, Salamon H, Hopewell PC, Ponce de Leon A, Daley CL, et al. Transmission of Mycobacterium tuberculosis from patients smear-negative for acid-fast bacilli. Lancet. 1999;353(9151):444-9.", doi: "10.1016/S0140-6736(98)03406-0", tag: "Molecular epidemiology study" },
        { n: 70, text: "Tostmann A, Kik SV, Kalisvaart NA, Sebek MM, Verver S, Boeree MJ, et al. Tuberculosis transmission by patients with smear-negative pulmonary tuberculosis in a large cohort in the Netherlands. Clin Infect Dis. 2008;47(9):1135-42.", doi: "10.1086/591974", tag: "Molecular epidemiology cohort study" },
        { n: 71, text: "Shah M, Dansky Z, Nathavitharana R, Behm H, Brown S, Dov L, et al. National Tuberculosis Coalition of America (NTCA) Guidelines for Respiratory Isolation and Restrictions to Reduce Transmission of Pulmonary Tuberculosis in Community Settings. Clin Infect Dis. 2024. Published online 18 Apr 2024.", doi: "10.1093/cid/ciae199", tag: "Clinical practice guideline — NTCA" },
        { n: 72, text: "Xie YL, Cronin WA, Proschan M, Oatis R, Cohn S, Curry SR, et al. Transmission of Mycobacterium tuberculosis from patients who are nucleic acid amplification test negative. Clin Infect Dis. 2018;67(11):1653-9.", doi: "10.1093/cid/ciy365", tag: "Molecular epidemiology study" },
        { n: 73, text: "Sosa LE, Njie GJ, Lobato MN, Bamrah Morris S, Buchta W, Casey ML, et al. Tuberculosis Screening, Testing, and Treatment of U.S. Health Care Personnel: Recommendations from the National Tuberculosis Controllers Association and CDC, 2019. MMWR Morb Mortal Wkly Rep. 2019;68(19):439-443.", doi: "10.15585/mmwr.mm6819a3", tag: "Clinical practice guideline — NTCA/CDC health care personnel" },
        { n: 74, text: "Al Hajoj S, Varghese B, Datijan A, Shoukri M, Alzahrani A, Alkhenizan A, et al. Interferon Gamma Release Assay versus Tuberculin Skin Testing among Healthcare Workers of Highly Diverse Origin in a Moderate Tuberculosis Burden Country. PLoS One. 2016;11(5):e0154803.", doi: "10.1371/journal.pone.0154803", tag: "Cross-sectional study (Riyadh)" },
        { n: 75, text: "Alahmari H, Hanson L, Kelley PG, Spong J, Milazzo A, Mnatzaganian G. Interferon-gamma release assays versus tuberculin skin test for latent tuberculosis infection positivity among healthcare workers and first responders: a systematic review and meta-analysis. Int J Infect Dis. 2026;170:108949.", doi: "10.1016/j.ijid.2026.108949", tag: "Systematic review and meta-analysis" },
        { n: 76, text: "Alyami SMA, Alzomor O, Hassan IS, AlShamrani M, Al-Jazairi AS, Algamdi M, et al. The Saudi Thoracic Society evidence-based guidelines for the diagnosis and management of community-acquired pneumonia in children and adults. Ann Thorac Med. 2025;20(4):195-212.", doi: "10.4103/atm.atm_293_25", tag: "Clinical practice guideline — Saudi Thoracic Society CAP" },
        { n: 77, text: "Metlay JP, Waterer GW, Long AC, Anzueto A, Brozek J, Crothers K, et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. An Official Clinical Practice Guideline of the American Thoracic Society and Infectious Diseases Society of America. Am J Respir Crit Care Med. 2019;200(7):e45-e67.", doi: "10.1164/rccm.201908-1581ST", tag: "Clinical practice guideline — ATS/IDSA CAP" },
        { n: 78, text: "Behr MA, Edelstein PH, Ramakrishnan L. Revisiting the timetable of tuberculosis. BMJ. 2018;362:k2738.", doi: "10.1136/bmj.k2738", tag: "Narrative review" },
        { n: 79, text: "Chen TC, Lu PL, Lin CY, Lin WR, Chen YH. Fluoroquinolones are associated with delayed treatment and resistance in tuberculosis: a systematic review and meta-analysis. Int J Infect Dis. 2011;15(3):e211-6.", doi: "10.1016/j.ijid.2010.11.008", tag: "Systematic review and meta-analysis" },
        { n: 80, text: "den Boon S, Matteelli A, Getahun H. Rifampicin resistance after treatment for latent tuberculous infection: a systematic review and meta-analysis. Int J Tuberc Lung Dis. 2016;20(8):1065-71.", doi: "10.5588/ijtld.15.0908", tag: "Systematic review and meta-analysis" },
        { n: 81, text: "Balcells ME, Thomas SL, Godfrey-Faussett P, Grant AD. Isoniazid preventive therapy and risk for resistant tuberculosis. Emerg Infect Dis. 2006;12(5):744-51.", doi: "10.3201/eid1205.050681", tag: "Systematic review and meta-analysis" },
        { n: 82, text: "Fox GJ, Barry SE, Britton WJ, Marks GB. Contact investigation for tuberculosis: a systematic review and meta-analysis. Eur Respir J. 2013;41(1):140-56.", doi: "10.1183/09031936.00070812", tag: "Systematic review and meta-analysis" },
        { n: 83, text: "World Health Organization. WHO consolidated guidelines on tuberculosis. Module 1: prevention — tuberculosis preventive treatment, second edition. Geneva: WHO; 2024.", tag: "Clinical practice guideline — second edition" },
        { n: 84, text: "Sterling TR, Njie G, Zenner D, et al. Guidelines for the Treatment of Latent Tuberculosis Infection: Recommendations from the National Tuberculosis Controllers Association and CDC, 2020. MMWR Recomm Rep. 2020;69(RR-1):1-11.", doi: "10.15585/mmwr.rr6901a1", tag: "Clinical practice guideline" },
        { n: 85, text: "Tubach F, Salmon D, Ravaud P, Allanore Y, Goupille P, Bréban M, et al. Risk of tuberculosis is higher with anti-tumor necrosis factor monoclonal antibody therapy than with soluble tumor necrosis factor receptor therapy: The three-year prospective French Research Axed on Tolerance of Biotherapies registry. Arthritis Rheum. 2009;60(7):1884-94.", doi: "10.1002/art.24632", tag: "Prospective registry study — RATIO" },
        { n: 86, text: "Winthrop KL, Park SH, Gul A, Cardiel MH, Gomez-Reino JJ, Tanaka Y, et al. Tuberculosis and other opportunistic infections in tofacitinib-treated patients with rheumatoid arthritis. Ann Rheum Dis. 2016;75(6):1133-8.", doi: "10.1136/annrheumdis-2015-207319", tag: "Pooled analysis of clinical trial data" },
        { n: 87, text: "National Society of Tuberculosis Clinicians; National Tuberculosis Controllers Association. Testing and Treatment of Latent Tuberculosis Infection in the United States: A Clinical Guide for Health Care Providers and Public Health Programs. 3rd ed. November 2023 (updated February 2025).", url: "https://www.tbcontrollers.org/docs/NSTC/LTBI_Clinical_Guide_Feb2025_FINAL.pdf", tag: "Clinical guide — NSTC/NTCA" },
        { n: 88, text: "Jeon CY, Murray MB. Diabetes mellitus increases the risk of active tuberculosis: a systematic review of 13 observational studies. PLoS Med. 2008;5(7):e152.", doi: "10.1371/journal.pmed.0050152", tag: "Systematic review of observational studies" },
        { n: 89, text: "Getahun H, Matteelli A, Abubakar I, Aziz MA, Baddeley A, Barreira D, et al. Management of latent Mycobacterium tuberculosis infection: WHO guidelines for low tuberculosis burden countries. Eur Respir J. 2015;46(6):1563-76.", doi: "10.1183/13993003.01245-2015", tag: "Clinical practice guideline (WHO) — low TB-burden countries" },
        { n: 90, text: "Sterling TR, Villarino ME, Borisov AS, Shang N, Gordin F, Bliven-Sizemore E, Hackman J, Hamilton CD, Menzies D, Kerrigan A, Weis SE, Weiner M, Wing D, Conde MB, Bozeman L, Horsburgh CR Jr, Chaisson RE; TB Trials Consortium PREVENT TB Study Team. Three months of rifapentine and isoniazid for latent tuberculosis infection. N Engl J Med. 2011;365(23):2155-2166.", doi: "10.1056/NEJMoa1104875", tag: "Randomized controlled non-inferiority trial" },
        { n: 91, text: "Menzies D, Adjobimey M, Ruslami R, Trajman A, Sow O, Kim H, Obeng Baah J, Marks GB, Long R, Hoeppner V, Elwood K, Al-Jahdali H, Gninafon M, Apriani L, Koesoemadinata RC, Kritski A, Rolla V, Bah B, Camara A, Boakye I, Cook VJ, Goldberg H, Valiquette C, Hornby K, Dion MJ, Li PZ, Hill PC, Schwartzman K, Benedetti A. Four Months of Rifampin or Nine Months of Isoniazid for Latent Tuberculosis in Adults. N Engl J Med. 2018;379(5):440-453.", doi: "10.1056/NEJMoa1714283", tag: "Randomized controlled non-inferiority trial" },
        { n: 92, text: "Swindells S, Ramchandani R, Gupta A, Benson CA, Leon-Cruz J, Mwelase N, et al. One Month of Rifapentine plus Isoniazid to Prevent HIV-Related Tuberculosis. N Engl J Med. 2019;380(11):1001-1011.", doi: "10.1056/NEJMoa1806808", tag: "Randomized controlled non-inferiority trial — BRIEF-TB" },
        { n: 93, text: "International Union Against Tuberculosis Committee on Prophylaxis. Efficacy of various durations of isoniazid preventive therapy for tuberculosis: five years of follow-up in the IUAT trial. Bull World Health Organ. 1982;60(4):555-64.", url: "https://pubmed.ncbi.nlm.nih.gov/6754120/", tag: "Randomized placebo-controlled trial — IUAT" },
        { n: 94, text: "Comstock GW. How much isoniazid is needed for prevention of tuberculosis among immunocompetent adults? Int J Tuberc Lung Dis. 1999;3(10):847-50.", url: "https://pubmed.ncbi.nlm.nih.gov/10524579/", tag: "Reanalysis of controlled trials" },
        { n: 95, text: "Smieja MJ, Marchetti CA, Cook DJ, Smaill FM. Isoniazid for preventing tuberculosis in non-HIV infected persons. Cochrane Database Syst Rev. 2000;(2):CD001363.", doi: "10.1002/14651858.CD001363", tag: "Systematic review of RCTs (Cochrane)" },
        { n: 96, text: "Iannone F, Cantini F, Lapadula G. Diagnosis of latent tuberculosis and prevention of reactivation in rheumatic patients receiving biologic therapy: international recommendations. J Rheumatol Suppl. 2014;91:41-6.", doi: "10.3899/jrheum.140101", tag: "Review of international recommendations" },
        { n: 97, text: "Vaidya B, Nakarmi S. Simultaneous Adalimumab and Antitubercular Treatment for Latent Tubercular Infection: An Experience from Nepal. Int J Rheumatol. 2019;2019:2034950.", doi: "10.1155/2019/2034950", tag: "Retrospective case series" },
      ],
    },
    {
      title: "Case 6 — Pleural TB",
      items: [
        { n: 98, text: "al-Quorain A, Larbi EB, Satti MB, al-Muhanna F, Baloush A. Tuberculous pleural effusion in the eastern province of Saudi Arabia. Trop Geogr Med. 1994;46(5):298-301.", url: "https://pubmed.ncbi.nlm.nih.gov/7855916/", tag: "Prospective study (Eastern Province, Saudi Arabia)" },
        { n: 99, text: "Light RW, Macgregor MI, Luchsinger PC, Ball WC Jr. Pleural effusions: the diagnostic separation of transudates and exudates. Ann Intern Med. 1972;77(4):507-13.", doi: "10.7326/0003-4819-77-4-507", tag: "Diagnostic study (origin of Light's criteria)" },
        { n: 100, text: "Conde MB, Loivos AC, Rezende VM, Soares SL, Mello FC, Reingold AL, et al. Yield of sputum induction in the diagnosis of pleural tuberculosis. Am J Respir Crit Care Med. 2003;167(5):723-5.", doi: "10.1164/rccm.2111019", tag: "Prospective diagnostic study" },
        { n: 101, text: "Lee J, Lee SY, Choi KJ, Lim JK, Yoo SS, Lee SY, et al. Clinical utility of CT-based bronchial aspirate TB-PCR for the rapid diagnosis of pleural tuberculosis. Tuberc Respir Dis (Seoul). 2013;75(4):150-6.", doi: "10.4046/trd.2013.75.4.150", tag: "Prospective diagnostic study" },
        { n: 102, text: "Young SL, Chua BLW, Tan QL, Leong CK, Wong JJY, Phua IGCS, et al. Pleural and parenchymal radiological characteristics of tuberculous pleuritis and correlation with microbiological and molecular diagnostic yield. BMC Pulm Med. 2025;25(1):525.", doi: "10.1186/s12890-025-03995-1", tag: "Retrospective cohort study" },
        { n: 103, text: "Diacon AH, Van de Wal BW, Wyser C, Smedema JP, Bezuidenhout J, Bolliger CT, et al. Diagnostic tools in tuberculous pleurisy: a direct comparative study. Eur Respir J. 2003;22(4):589-91.", doi: "10.1183/09031936.03.00017103a", tag: "Prospective comparative diagnostic study" },
        { n: 104, text: "Roberts ME, Rahman NM, Maskell NA, Bibby AC, Blyth KG, Corcoran JP, et al. British Thoracic Society Guideline for pleural disease. Thorax. 2023;78(Suppl 3):s1-s42.", doi: "10.1136/thorax-2022-219784", tag: "Guideline (BTS 2023)" },
        { n: 105, text: "Porcel JM. Identifying transudates misclassified by Light's criteria. Curr Opin Pulm Med. 2013;19(4):362-7.", doi: "10.1097/MCP.0b013e32836022dc", tag: "Review" },
        { n: 106, text: "Wilcox ME, Chong CA, Stanbrook MB, Tricco AC, Wong C, Straus SE. Does this patient have an exudative pleural effusion? The Rational Clinical Examination systematic review. JAMA. 2014;311(23):2422-31.", doi: "10.1001/jama.2014.5552", tag: "Systematic review" },
        { n: 107, text: "Bielsa S, Porcel JM, Castellote J, Mas E, Esquerda A, Light RW. Solving the Light's criteria misclassification rate of cardiac and hepatic transudates. Respirology. 2012;17(4):721-6.", doi: "10.1111/j.1440-1843.2012.02155.x", tag: "Retrospective diagnostic study" },
        { n: 108, text: "Aggarwal AN, Agarwal R, Sehgal IS, Dhooria S. Adenosine deaminase for diagnosis of tuberculous pleural effusion: A systematic review and meta-analysis. PLoS One. 2019;14(3):e0213728.", doi: "10.1371/journal.pone.0213728", tag: "Systematic review and meta-analysis" },
        { n: 109, text: "Kohli M, Inbaraj LR, Salomon A, Scandrett K, Korobitsyn A, Ismail N, et al. Low-complexity automated nucleic acid amplification tests for extrapulmonary tuberculosis and rifampicin resistance in adults and adolescents. Cochrane Database Syst Rev. 2025;8(8):CD012768.", doi: "10.1002/14651858.CD012768.pub4", tag: "Diagnostic test accuracy systematic review (Cochrane)" },
        { n: 110, text: "Ryan H, Yoo J, Darsini P. Corticosteroids for tuberculous pleurisy. Cochrane Database Syst Rev. 2017;3(3):CD001876.", doi: "10.1002/14651858.CD001876.pub3", tag: "Systematic review of RCTs (Cochrane)" },
        { n: 111, text: "Bhuniya S, Arunabha DC, Choudhury S, Saha I, Roy TS, Saha M. Role of therapeutic thoracentesis in tuberculous pleural effusion. Ann Thorac Med. 2012;7(4):215-9.", doi: "10.4103/1817-1737.102176", tag: "Randomized open-label trial" },
        { n: 112, text: "Al-Majed SA. Study of paradoxical response to chemotherapy in tuberculous pleural effusion. Respir Med. 1996;90(4):211-4.", doi: "10.1016/s0954-6111(96)90289-9", tag: "Retrospective study (Riyadh, Saudi Arabia)" },
        { n: 113, text: "Jeon K, Choi WI, An JS, Lim SY, Kim WJ, Park GM, et al. Paradoxical response in HIV-negative patients with pleural tuberculosis: a retrospective multicentre study. Int J Tuberc Lung Dis. 2012;16(6):846-51.", doi: "10.5588/ijtld.11.0642", tag: "Retrospective multicentre cohort study" },
      ],
    },
    {
      title: "Case 7 — Spinal TB",
      items: [
        { n: 114, text: "Sadat-Ali M, al-Mousa MS, al-Salem AH. Brucellosis as a cause of backache. Trop Geogr Med. 1991;43(1-2):148-51.", url: "https://pubmed.ncbi.nlm.nih.gov/1836289/", tag: "Prospective screening study (Al-Khobar, Saudi Arabia)" },
        { n: 115, text: "Cordero M, Sánchez I. Brucellar and tuberculous spondylitis. A comparative study of their clinical features. J Bone Joint Surg Br. 1991;73(1):100-3.", doi: "10.1302/0301-620X.73B1.1991738", tag: "Comparative clinical study" },
        { n: 116, text: "Sharif HS, Aideyan OA, Clark DC, Madkour MM, Aabed MY, Mattsson TA, et al. Brucellar and tuberculous spondylitis: comparative imaging features. Radiology. 1989;171(2):419-25.", doi: "10.1148/radiology.171.2.2704806", tag: "Comparative imaging study (Riyadh, Saudi Arabia)" },
        { n: 117, text: "Gao M, Sun J, Jiang Z, Cui X, Liu X, Wang G, et al. Comparison of Tuberculous and Brucellar Spondylitis on Magnetic Resonance Images. Spine (Phila Pa 1976). 2017;42(2):113-121.", doi: "10.1097/BRS.0000000000001697", tag: "Retrospective cross-sectional study" },
        { n: 118, text: "Ravichandran RCA, Amritanand R, Moses V, Kandagaddala M, Krishnan V, David KS, et al. Computed Tomography-Guided Spinal Biopsy in Suspected Infective Spondylodiscitis: An Institutional Review of Its Utility. Indian J Radiol Imaging. 2023;33(3):289-294.", doi: "10.1055/s-0043-1764491", tag: "Retrospective institutional review" },
      ],
    },
    {
      title: "Case 8 — TB meningitis",
      items: [
        { n: 119, text: "Gokul BN, Paul A, Hussein I. Neurobrucellosis. Saudi Med J. 2000;21(6):577-80.", url: "https://pubmed.ncbi.nlm.nih.gov/11500711/", tag: "Case report (Saudi Arabia)" },
        { n: 120, text: "Soares CN, da Silva MTT, Lima MA. Neurobrucellosis. Curr Opin Infect Dis. 2023;36(3):192-197.", doi: "10.1097/QCO.0000000000000920", tag: "Narrative review" },
        { n: 121, text: "Thao LTP, Heemskerk AD, Geskus RB, Mai NTH, Ha DTM, Chau TTH, et al. Prognostic Models for 9-Month Mortality in Tuberculous Meningitis. Clin Infect Dis. 2018;66(4):523-532.", doi: "10.1093/cid/cix849", tag: "Prognostic modelling study" },
        { n: 122, text: "Dhafer Alshehri F, Mahmood Okal F, Baeshen SK, Alharbi ZG, Khojah O, Alhawsawi WK, et al. Outcomes of central nervous system tuberculosis in Saudi Arabia: a multi-center study. Neurol Res. 2024;46(9):812-822.", doi: "10.1080/01616412.2024.2359262", tag: "Retrospective multicentre cohort (Saudi Arabia)" },
        { n: 123, text: "Thwaites GE, Nguyen DB, Nguyen HD, Hoang TQ, Do TT, Nguyen TC, et al. Dexamethasone for the treatment of tuberculous meningitis in adolescents and adults. N Engl J Med. 2004;351(17):1741-51.", doi: "10.1056/NEJMoa040573", tag: "Randomized placebo-controlled trial" },
        { n: 124, text: "Heemskerk AD, Bang ND, Mai NT, Chau TT, Phu NH, Loc PP, et al. Intensified Antituberculosis Therapy in Adults with Tuberculous Meningitis. N Engl J Med. 2016;374(2):124-34.", doi: "10.1056/NEJMoa1507062", tag: "Randomized placebo-controlled trial" },
        { n: 125, text: "Donovan J, Bang ND, Imran D, Nghia HDT, Burhan E, Huong DTT, et al. Adjunctive Dexamethasone for Tuberculous Meningitis in HIV-Positive Adults. N Engl J Med. 2023;389(15):1357-1367.", doi: "10.1056/NEJMoa2216218", tag: "Randomized placebo-controlled trial — ACT HIV" },
      ],
    },
    {
      title: "Case 9 — Intestinal TB",
      items: [
        { n: 126, text: "Kedia S, Das P, Madhusudhan KS, Dattagupta S, Sharma R, Sahni P, et al. Differentiating Crohn's disease from intestinal tuberculosis. World J Gastroenterol. 2019;25(4):418-432.", doi: "10.3748/wjg.v25.i4.418", tag: "Narrative review" },
        { n: 127, text: "Chen W, Fan JH, Luo W, Peng P, Su SB. Effectiveness of interferon-gamma release assays for differentiating intestinal tuberculosis from Crohn's disease: a meta-analysis. World J Gastroenterol. 2013;19(44):8133-40.", doi: "10.3748/wjg.v19.i44.8133", tag: "Meta-analysis" },
        { n: 128, text: "Kedia S, Sharma R, Sreenivas V, Madhusudhan KS, Sharma V, Bopanna S, et al. Accuracy of computed tomographic features in differentiating intestinal tuberculosis from Crohn's disease: a systematic review with meta-analysis. Intest Res. 2017;15(2):149-159.", doi: "10.5217/ir.2017.15.2.149", tag: "Systematic review and meta-analysis" },
        { n: 129, text: "Jin T, Fei B, Zhang Y, He X. The diagnostic value of polymerase chain reaction for Mycobacterium tuberculosis to distinguish intestinal tuberculosis from crohn's disease: A meta-analysis. Saudi J Gastroenterol. 2017;23(1):3-10.", doi: "10.4103/1319-3767.199135", tag: "Meta-analysis" },
        { n: 130, text: "Pratap Mouli V, Munot K, Ananthakrishnan A, Kedia S, Addagalla S, Garg SK, et al. Endoscopic and clinical responses to anti-tubercular therapy can differentiate intestinal tuberculosis from Crohn's disease. Aliment Pharmacol Ther. 2017;45(1):27-36.", doi: "10.1111/apt.13840", tag: "Retrospective study with prospective validation" },
        { n: 131, text: "Jullien S, Jain S, Ryan H, Ahuja V. Six-month therapy for abdominal tuberculosis. Cochrane Database Syst Rev. 2016;11(11):CD012163.", doi: "10.1002/14651858.CD012163.pub2", tag: "Systematic review of RCTs (Cochrane)" },
        { n: 132, text: "Tanoglu A, Erdem H, Friedland JS, Almajid FM, Batirel A, Kulzhanova S, et al. Clinicopathological profile of gastrointestinal tuberculosis: a multinational ID-IRI study. Eur J Clin Microbiol Infect Dis. 2020;39(3):493-500.", doi: "10.1007/s10096-019-03749-y", tag: "Multinational retrospective study (incl. Saudi Arabia)" },
      ],
    },
    {
      title: "Case 10 — Peritoneal TB",
      items: [
        { n: 133, text: "Sanai FM, Bzeizi KI. Systematic review: tuberculous peritonitis--presenting features, diagnostic strategies and treatment. Aliment Pharmacol Ther. 2005;22(8):685-700.", doi: "10.1111/j.1365-2036.2005.02645.x", tag: "Systematic review (Riyadh, Saudi Arabia)" },
        { n: 134, text: "Liu Q, Zhang Q, Guan Q, Xu JF, Shi QL. Abdominopelvic tuberculosis mimicking advanced ovarian cancer and pelvic inflammatory disease: a series of 28 female cases. Arch Gynecol Obstet. 2014;289(3):623-9.", doi: "10.1007/s00404-013-3034-2", tag: "Retrospective case series" },
        { n: 135, text: "Mahajan M, Prasad ML, Kumar P, Kumar A, Chatterjee N, Singh S, et al. An Updated Systematic Review and Meta-Analysis for the Diagnostic Test Accuracy of Ascitic Fluid Adenosine Deaminase in Tuberculous Peritonitis. Infect Chemother. 2023;55(2):264-277.", doi: "10.3947/ic.2023.0014", tag: "Systematic review and meta-analysis" },
        { n: 136, text: "Hossain J, al-Aska AK, al Mofleh I. Laparoscopy in tuberculous peritonitis. J R Soc Med. 1992;85(2):89-91.", doi: "10.1177/014107689208500212", tag: "Case series (Riyadh, Saudi Arabia)" },
        { n: 137, text: "Sun J, Zhang H, Song Z, Jin L, Yang J, Gu J, et al. The negative impact of increasing age and underlying cirrhosis on the sensitivity of adenosine deaminase in the diagnosis of tuberculous peritonitis: a cross-sectional study in eastern China. Int J Infect Dis. 2021;110:204-212.", doi: "10.1016/j.ijid.2021.07.061", tag: "Cross-sectional study" },
        { n: 138, text: "Waness A, Al Shohaib S. Tuberculous peritonitis associated with peritoneal dialysis. Saudi J Kidney Dis Transpl. 2012;23(1):44-7.", url: "https://pubmed.ncbi.nlm.nih.gov/22237217/", tag: "Retrospective cohort (Jeddah, Saudi Arabia)" },
      ],
    },
    {
      title: "Start here questions",
      items: [
        { n: 139, text: "Temfack E, Rim JJB, Spijker R, Loyse A, Chiller T, Pappas PG, et al. Cryptococcal Antigen in Serum and Cerebrospinal Fluid for Detecting Cryptococcal Meningitis in Adults Living With Human Immunodeficiency Virus: Systematic Review and Meta-Analysis of Diagnostic Test Accuracy Studies. Clin Infect Dis. 2021;72(7):1268-1278.", doi: "10.1093/cid/ciaa1243", tag: "Diagnostic test accuracy systematic review and meta-analysis" },
        { n: 140, text: "Hevey MA, George IA, Rauseo AM, Larson L, Powderly W, Spec A. Performance of the Lateral Flow Assay and the Latex Agglutination Serum Cryptococcal Antigen Test in Cryptococcal Disease in Patients with and without HIV. J Clin Microbiol. 2020;58(11):e01563-20.", doi: "10.1128/JCM.01563-20", tag: "Retrospective single-centre study" },
        { n: 141, text: "Dixon WG, Hyrich KL, Watson KD, Lunt M, Galloway J, Ustianowski A, et al. Drug-specific risk of tuberculosis in patients with rheumatoid arthritis treated with anti-TNF therapy: results from the British Society for Rheumatology Biologics Register (BSRBR). Ann Rheum Dis. 2010;69(3):522-8.", doi: "10.1136/ard.2009.118935", tag: "Prospective national registry study — BSRBR" },
        { n: 142, text: "Jung SM, Ju JH, Park MS, Kwok SK, Park KS, Kim HY, et al. Risk of tuberculosis in patients treated with anti-tumor necrosis factor therapy: a nationwide study in South Korea, a country with an intermediate tuberculosis burden. Int J Rheum Dis. 2015;18(3):323-30.", doi: "10.1111/1756-185X.12530", tag: "Nationwide claims-database cohort (South Korea)" },
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
