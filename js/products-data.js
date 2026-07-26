/* ==========================================================================
   PRODUCT CATALOG — single source of truth for the whole store
   ========================================================================== */
const PRODUCTS = [
  {
    id: "physics-11",
    title: "Physics Class 11 — Short Notes",
    cat: "Physics",
    tag: "Class 11",
    page: "product-physics-11.html",
    price: 99,
    oldPrice: 299,
    rating: 4.7,
    reviews: 312,
    color: "#1656D9",
    initials: "P11",
    images: [
      "images/physics-11/cover.webp",
      "images/physics-11/page1.webp",
      "images/physics-11/page2.webp",
      "images/physics-11/page3.webp"
    ],
    short: "Mechanics, gravitation, thermodynamics & waves distilled into exam-first notes with derivations mapped to previous-year weightage.",
    description: "Our Class 11 Physics short notes compress the entire NCERT + NEET syllabus — Units & Measurements through Waves — into a crisp, exam-ready revision resource. Every derivation is simplified to the steps examiners actually test, every formula is boxed for instant recall, and every chapter opens with a high-yield summary so you know exactly what to revise first in your last 10 days.",
    included: ["16 chapters, 140+ pages of condensed notes", "Formula sheet (pull-out, printable)", "High-yield topic ranking by PYQ frequency", "150+ NCERT one-liners for prediction-based MCQs", "Diagram bank redrawn for quick memory recall"],
    who: ["First-time NEET aspirants", "Droppers revising in the final month", "Students who find NCERT too text-heavy"],
    faqs: [
      { q: "Is this based on the latest NCERT syllabus?", a: "Yes, fully aligned to the current NCERT Class 11 Physics syllabus and NTA NEET pattern." },
      { q: "Will I get a physical copy?", a: "No — this is an instant-download PDF you can read on any device or print at home." },
      { q: "Can I access it after my subscription period?", a: "Yes, once purchased the PDF is yours for lifetime access with unlimited downloads." }
    ]
  },
  {
    id: "physics-12",
    title: "Physics Class 12 — Short Notes",
    cat: "Physics",
    tag: "Class 12",
    page: "product-physics-12.html",
    price: 99,
    oldPrice: 299,
    rating: 4.8,
    reviews: 401,
    color: "#1656D9",
    initials: "P12",
    images: [
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596496181848-3091d4878b24?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=900&auto=format&fit=crop"
    ],
    short: "Electrostatics to Modern Physics — every high-weightage chapter mapped with quick-recall diagrams and solved numerical patterns.",
    description: "Class 12 Physics carries some of NEET's highest-weightage chapters — Electrostatics, Current Electricity, Optics, and Modern Physics. This note set turns dense derivations into structured, boxed takeaways and pairs every concept with the numerical pattern NEET repeats most often, so revision time is spent on recall, not re-reading textbooks.",
    included: ["14 chapters, 160+ pages of condensed notes", "Ray & wave optics diagram compendium", "Modern physics formula quick-sheet", "Common numerical traps highlighted", "Chapter-wise weightage chart from past 10 years"],
    who: ["Students targeting a physics score above 150/180", "Droppers who need a fast full-syllabus refresh", "Anyone weak in optics & modern physics numericals"],
    faqs: [
      { q: "Does this cover Semiconductor Electronics?", a: "Yes, all 14 chapters including Semiconductors and Communication Systems are covered in full." },
      { q: "Is it beginner friendly?", a: "It's built for revision, so basic concept clarity from NCERT is assumed, but every formula is re-derived in short form." }
    ]
  },
  {
    id: "physical-chemistry",
    title: "Physical Chemistry — Short Notes",
    cat: "Chemistry",
    tag: "Physical",
    page: "product-physical-chemistry.html",
    price: 99,
    oldPrice: 299,
    rating: 4.6,
    reviews: 268,
    color: "#16A34A",
    initials: "PC",
    images: [
      "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=900&auto=format&fit=crop"
    ],
    short: "Mole concept to electrochemistry — every formula-heavy topic reduced to solvable, exam-ready shortcuts.",
    description: "Physical Chemistry is where marks are won or lost on speed. This note set walks through Mole Concept, Thermodynamics, Equilibrium, Electrochemistry and Kinetics with shortcut derivations, unit traps, and the exact numerical patterns NEET repeats year after year — built to make problem-solving fast, not just theory revision.",
    included: ["12 chapters, 130+ pages of condensed notes", "Shortcut formula sheet for numericals", "Common unit-conversion traps flagged", "Graphical concept summaries", "Previous-year numerical pattern index"],
    who: ["Students who find numericals slower than theory", "Aspirants targeting chemistry above 150/180", "Anyone revising equilibrium & electrochemistry last-minute"],
    faqs: [
      { q: "Are numerical solving shortcuts included?", a: "Yes — every numerical-heavy chapter includes shortcut methods alongside the standard derivation." },
      { q: "Is thermodynamics from Class 11 covered?", a: "Yes, both Class 11 and 12 Physical Chemistry chapters are combined into one complete set." }
    ]
  },
  {
    id: "organic-chemistry",
    title: "Organic Chemistry — Short Notes",
    cat: "Chemistry",
    tag: "Organic",
    page: "product-organic-chemistry.html",
    price: 99,
    oldPrice: 299,
    rating: 4.9,
    reviews: 512,
    color: "#16A34A",
    initials: "OC",
    images: [
      "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616499452912-4ba3fbe66e34?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=900&auto=format&fit=crop"
    ],
    short: "Named reactions, mechanisms & IUPAC — the highest-scoring, most-loved subject made effortless to revise.",
    description: "Our best-selling note set. Organic Chemistry rewards pattern recognition over memorization, and this guide is built exactly for that — every named reaction is grouped by mechanism family, every reagent table is color-coded, and every high-frequency question type from the last decade of NEET papers is flagged for quick practice.",
    included: ["18 chapters, 170+ pages of condensed notes", "Named reactions master chart", "Reagent & conversion quick-reference table", "Mechanism family grouping for faster recall", "GOC shortcuts for stability & acidity ranking"],
    who: ["Students who love organic but need faster recall", "Aspirants confused between similar reagents", "Anyone targeting a near-perfect chemistry score"],
    faqs: [
      { q: "Is General Organic Chemistry (GOC) included?", a: "Yes, GOC fundamentals are covered first as the foundation for every reaction chapter that follows." },
      { q: "How are named reactions organized?", a: "By mechanism family (substitution, addition, elimination, etc.) so patterns are easier to remember than rote lists." }
    ]
  },
  {
    id: "inorganic-chemistry",
    title: "Inorganic Chemistry — Short Notes",
    cat: "Chemistry",
    tag: "Inorganic",
    page: "product-inorganic-chemistry.html",
    price: 99,
    oldPrice: 299,
    rating: 4.6,
    reviews: 289,
    color: "#16A34A",
    initials: "IC",
    images: [
      "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?q=80&w=900&auto=format&fit=crop"
    ],
    short: "Periodic table trends to coordination compounds — pure recall content condensed for rapid last-minute revision.",
    description: "Inorganic Chemistry is pure recall — and recall is fastest when information is structured, not scattered. This note set organizes Periodic Classification, Chemical Bonding, p/d/f-block elements and Coordination Compounds into tightly-grouped tables and trend charts designed to be re-read five times in the week before your exam.",
    included: ["15 chapters, 150+ pages of condensed notes", "Periodic trend master tables", "Coordination compound naming & isomerism guide", "p-block & d-block exception list", "One-page-per-chapter rapid revision summaries"],
    who: ["Students revising inorganic in the final week", "Aspirants who struggle with rote memorization", "Anyone wanting quick daily revision tables"],
    faqs: [
      { q: "Are exceptions to periodic trends covered?", a: "Yes, every major exception (anomalous pairs, irregular configurations) is flagged clearly." },
      { q: "Is coordination chemistry beginner friendly?", a: "Yes, nomenclature and isomerism are explained step-by-step before advanced bonding theories." }
    ]
  },
  {
    id: "complete-bundle",
    title: "Complete NEET Bundle — All Subjects",
    cat: "Bundle",
    tag: "Best Value",
    page: "product-complete-bundle.html",
    price: 249,
    oldPrice: 495,
    rating: 4.9,
    reviews: 874,
    bundle: true,
    color: "#FF7A1A",
    initials: "ALL",
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596496181848-3091d4878b24?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=900&auto=format&fit=crop"
    ],
    short: "All 5 subject note sets in one download — Physics 11 & 12, Physical, Organic & Inorganic Chemistry — at the lowest price per subject.",
    description: "Everything you need to revise NEET Physics and Chemistry in one bundle: Physics Class 11 & 12, Physical, Organic and Inorganic Chemistry — five complete short-note sets for less than the price of two individually. Built for students who want one clean download, one consistent format, and zero gaps in their revision plan before exam day.",
    included: ["All 5 subject note sets (750+ pages total)", "Combined master formula booklet", "Full high-yield topic index across subjects", "Lifetime access to future edition updates", "Priority email support for doubts"],
    who: ["Students who want complete syllabus coverage", "Droppers doing a full final revision", "Anyone who wants the best price per subject"],
    faqs: [
      { q: "Do I get all 5 PDFs immediately?", a: "Yes, all five subject notes unlock instantly on your download page after payment." },
      { q: "Is this cheaper than buying subjects separately?", a: "Yes — five subjects individually cost ₹495; the bundle is ₹249, a saving of ₹246." },
      { q: "Do I get future updates for free?", a: "Yes, lifetime access includes all future content revisions at no extra cost." }
    ]
  }
];

const getProduct = id => PRODUCTS.find(p => p.id === id);
const formatINR = n => "₹" + Number(n).toLocaleString("en-IN");
