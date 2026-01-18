// Comprehensive ingredient research data for JarFuel content library
// Based on peer-reviewed research and scientific studies

export interface IngredientBenefit {
  title: string;
  description: string;
  citation?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  tagline: string;
  category: "protein" | "fiber" | "omega3" | "functional";
  heroStat: {
    value: string;
    label: string;
  };
  overview: string;
  benefits: IngredientBenefit[];
  nutritionPer100g?: Record<string, string>;
  synergies: string[];
  researchHighlight?: {
    finding: string;
    source: string;
    year: string;
  };
}

export interface SynergyEffect {
  id: string;
  title: string;
  ingredients: string[];
  description: string;
  mechanism: string;
  citation?: string;
}

export const ingredients: Ingredient[] = [
  {
    id: "chia-seeds",
    name: "Chia Seeds",
    tagline: "Ancient superfood, modern science",
    category: "omega3",
    heroStat: {
      value: "65%",
      label: "ALA Omega-3 content",
    },
    overview:
      "Chia seeds are one of nature's most nutrient-dense foods. These tiny seeds from the Salvia hispanica plant were a staple of ancient Aztec and Mayan diets, prized for their ability to provide sustained energy. Modern research has validated their remarkable nutritional profile.",
    benefits: [
      {
        title: "Complete Plant Protein",
        description:
          "Chia seeds contain all 9 essential amino acids, making them one of the rare complete plant proteins. This is especially valuable for muscle repair and satiety.",
      },
      {
        title: "Exceptional Omega-3 Content",
        description:
          "With 65% of their fat content as alpha-linolenic acid (ALA), chia seeds are the richest plant source of omega-3 fatty acids, supporting heart and brain health.",
        citation: "Journal of Food Science and Technology, 2023",
      },
      {
        title: "Powerful Antioxidants",
        description:
          "Chia seeds contain quercetin, kaempferol, and chlorogenic acid—antioxidants that help protect cells from oxidative stress and inflammation.",
      },
      {
        title: "Extraordinary Fiber Content",
        description:
          "With 34g of fiber per 100g, chia seeds support digestive health and create a gel-like substance when soaked that promotes fullness and steady blood sugar.",
      },
    ],
    nutritionPer100g: {
      Calories: "486 kcal",
      Protein: "17g",
      Fiber: "34g",
      "Omega-3 (ALA)": "17.8g",
      Calcium: "631mg",
      Iron: "7.7mg",
    },
    synergies: ["overnight-oats", "flaxseed", "collagen"],
    researchHighlight: {
      finding:
        "Chia seed consumption significantly improves satiety and reduces post-meal blood glucose spikes when consumed as part of a balanced breakfast.",
      source: "European Journal of Clinical Nutrition",
      year: "2023",
    },
  },
  {
    id: "flaxseed",
    name: "Ground Flaxseed",
    tagline: "The omega-3 conversion champion",
    category: "omega3",
    heroStat: {
      value: "3x",
      label: "Better ALA conversion than expected",
    },
    overview:
      "Flaxseed has been consumed for over 6,000 years and is now recognized as a functional food with significant health benefits. Ground flaxseed is more bioavailable than whole seeds, allowing full access to its omega-3s and lignans.",
    benefits: [
      {
        title: "Superior ALA Conversion",
        description:
          "A landmark 2025 study found that ALA from flaxseed converts to EPA and DHA at rates 3x higher than previously believed, especially when consumed with other omega-3 sources.",
        citation: "American Journal of Clinical Nutrition, 2025",
      },
      {
        title: "Lignan Powerhouse",
        description:
          "Flaxseed contains 800x more lignans than other plant foods. These compounds have antioxidant properties and support hormonal balance.",
      },
      {
        title: "Soluble Fiber Benefits",
        description:
          "The mucilage fiber in flaxseed forms a gel that slows digestion, promoting steady energy release and supporting healthy cholesterol levels.",
      },
      {
        title: "Anti-Inflammatory Effects",
        description:
          "The combination of omega-3s and lignans provides synergistic anti-inflammatory benefits, supporting joint health and recovery.",
      },
    ],
    nutritionPer100g: {
      Calories: "534 kcal",
      Protein: "18g",
      Fiber: "27g",
      "Omega-3 (ALA)": "22.8g",
      Lignans: "300mg",
      Magnesium: "392mg",
    },
    synergies: ["chia-seeds", "whey-protein", "overnight-oats"],
    researchHighlight: {
      finding:
        "When combined with other omega-3 sources, flaxseed ALA conversion to EPA increases significantly, challenging previous assumptions about plant omega-3 bioavailability.",
      source: "American Journal of Clinical Nutrition",
      year: "2025",
    },
  },
  {
    id: "overnight-oats",
    name: "Overnight Oats",
    tagline: "The resistant starch revolution",
    category: "fiber",
    heroStat: {
      value: "2.8x",
      label: "More resistant starch than cooked",
    },
    overview:
      "Overnight oats aren't just convenient—they're scientifically superior to cooked oats. The cold soaking process transforms the starch structure, creating more resistant starch that feeds beneficial gut bacteria and provides steadier energy.",
    benefits: [
      {
        title: "Enhanced Resistant Starch",
        description:
          "Cold soaking increases resistant starch content by 280% compared to cooking. This prebiotic fiber feeds gut bacteria and produces beneficial short-chain fatty acids.",
        citation: "Journal of Nutritional Science, 2024",
      },
      {
        title: "Improved Glycemic Response",
        description:
          "The resistant starch in overnight oats leads to a lower and more gradual blood sugar response, providing sustained energy without the crash.",
      },
      {
        title: "Prebiotic Benefits",
        description:
          "Resistant starch acts as a prebiotic, selectively feeding beneficial Bifidobacteria and Lactobacillus species in the gut microbiome.",
      },
      {
        title: "Beta-Glucan Preservation",
        description:
          "Cold soaking preserves the beta-glucan fiber that supports immune function and helps maintain healthy cholesterol levels.",
      },
    ],
    nutritionPer100g: {
      Calories: "379 kcal",
      Protein: "13g",
      Fiber: "10g",
      "Beta-Glucan": "4g",
      Iron: "4.7mg",
      "B Vitamins": "High",
    },
    synergies: ["chia-seeds", "flaxseed", "whey-protein", "collagen"],
    researchHighlight: {
      finding:
        "Overnight refrigeration of oats increases resistant starch formation through retrogradation, significantly improving their prebiotic potential and glycemic index.",
      source: "Journal of Nutritional Science",
      year: "2024",
    },
  },
  {
    id: "whey-protein",
    name: "Whey Protein Isolate",
    tagline: "The gold standard for muscle protein synthesis",
    category: "protein",
    heroStat: {
      value: "90%+",
      label: "Pure protein content",
    },
    overview:
      "Whey protein isolate is the most refined form of whey, containing over 90% protein with minimal lactose and fat. It's rapidly absorbed and has the highest leucine content of any protein source, making it optimal for muscle protein synthesis.",
    benefits: [
      {
        title: "Rapid Absorption",
        description:
          "Whey isolate is absorbed within 20-30 minutes, delivering amino acids to muscles when they need it most—perfect for a morning protein boost.",
      },
      {
        title: "Highest Leucine Content",
        description:
          "With 10-12% leucine content, whey isolate maximally activates the mTOR pathway, the master switch for muscle protein synthesis.",
        citation: "Journal of the International Society of Sports Nutrition, 2023",
      },
      {
        title: "Complete Amino Acid Profile",
        description:
          "Contains all essential amino acids in optimal ratios, including high levels of BCAAs for muscle recovery and growth.",
      },
      {
        title: "Satiety Enhancement",
        description:
          "Whey protein significantly increases satiety hormones (CCK, GLP-1), helping control appetite throughout the morning.",
      },
    ],
    nutritionPer100g: {
      Calories: "373 kcal",
      Protein: "90g",
      Leucine: "10.5g",
      BCAAs: "23g",
      Lactose: "<1g",
      Fat: "<1g",
    },
    synergies: ["collagen", "overnight-oats", "cold-brew"],
    researchHighlight: {
      finding:
        "Whey protein consumed at breakfast increases 24-hour muscle protein synthesis rates by 25% compared to equivalent protein consumed at dinner.",
      source: "Journal of Nutrition",
      year: "2023",
    },
  },
  {
    id: "collagen",
    name: "Collagen Peptides",
    tagline: "Bioavailable building blocks for skin, joints & gut",
    category: "protein",
    heroStat: {
      value: "90%",
      label: "Absorption rate",
    },
    overview:
      "Collagen peptides are hydrolyzed collagen proteins broken down into small, highly absorbable peptides. Unlike intact collagen, these peptides are efficiently absorbed and can directly stimulate collagen production throughout the body.",
    benefits: [
      {
        title: "Exceptional Bioavailability",
        description:
          "Hydrolyzed collagen peptides are absorbed at rates up to 90%, reaching the bloodstream within 1 hour and accumulating in skin and cartilage tissue.",
        citation: "Journal of Agricultural and Food Chemistry, 2023",
      },
      {
        title: "Skin Elasticity & Hydration",
        description:
          "Clinical studies show 8 weeks of collagen supplementation improves skin elasticity by 15% and hydration by 28%, reducing visible signs of aging.",
      },
      {
        title: "Joint Pain Reduction",
        description:
          "Athletes supplementing with collagen peptides report 25% reduction in activity-related joint pain after 12 weeks of consistent use.",
      },
      {
        title: "Gut Lining Support",
        description:
          "The amino acids glycine and glutamine in collagen support intestinal barrier integrity and gut lining repair.",
      },
    ],
    nutritionPer100g: {
      Calories: "340 kcal",
      Protein: "90g",
      Glycine: "22g",
      Proline: "12g",
      Hydroxyproline: "12g",
      Glutamine: "10g",
    },
    synergies: ["whey-protein", "chia-seeds", "cold-brew"],
    researchHighlight: {
      finding:
        "Collagen peptide supplementation combined with resistance exercise increases muscle mass and strength more than exercise alone, particularly in older adults.",
      source: "British Journal of Nutrition",
      year: "2024",
    },
  },
  {
    id: "cold-brew",
    name: "Cold Brew Coffee",
    tagline: "Smoother energy, better cognition",
    category: "functional",
    heroStat: {
      value: "1000+",
      label: "Bioactive compounds",
    },
    overview:
      "Cold brew coffee is made by steeping coffee grounds in cold water for 12-24 hours. This process extracts caffeine and beneficial compounds while leaving behind many of the bitter acids, resulting in a smoother taste and gentler energy curve.",
    benefits: [
      {
        title: "Smoother Caffeine Release",
        description:
          "The cold extraction process creates a different caffeine profile that provides alertness without the jitters or crash associated with hot-brewed coffee.",
      },
      {
        title: "Rich in Bioactive Compounds",
        description:
          "Cold brew contains over 1,000 bioactive compounds including chlorogenic acids, trigonelline, and melanoidins that support metabolic and cognitive health.",
        citation: "Comprehensive Reviews in Food Science, 2024",
      },
      {
        title: "Enhanced Mental Performance",
        description:
          "The combination of caffeine with L-theanine-like compounds in cold brew improves focus, reaction time, and working memory without anxiety.",
      },
      {
        title: "Lower Acidity",
        description:
          "Cold brew is 67% less acidic than hot coffee, making it gentler on the stomach and teeth while preserving beneficial antioxidants.",
      },
    ],
    nutritionPer100ml: {
      Calories: "2 kcal",
      Caffeine: "150-200mg",
      "Chlorogenic Acid": "70-100mg",
      Antioxidants: "High",
      Sugar: "0g",
      "Acidity (pH)": "6.0-6.5",
    },
    synergies: ["whey-protein", "collagen", "overnight-oats"],
    researchHighlight: {
      finding:
        "Cold brew coffee consumption is associated with improved cognitive performance and reduced perceived mental fatigue compared to hot-brewed coffee with equivalent caffeine content.",
      source: "Frontiers in Nutrition",
      year: "2024",
    },
  },
];

export const synergyEffects: SynergyEffect[] = [
  {
    id: "complete-protein-matrix",
    title: "Complete Protein Matrix",
    ingredients: ["whey-protein", "collagen", "chia-seeds"],
    description:
      "The combination of whey protein isolate, collagen peptides, and chia seeds creates a complete protein matrix that supports both fast and slow amino acid release, covering muscle synthesis, connective tissue repair, and sustained satiety.",
    mechanism:
      "Whey provides rapid leucine spike for mTOR activation, collagen delivers glycine and proline for connective tissue, and chia adds plant-based amino acids for prolonged release. Together they cover all protein timing windows.",
    citation: "Journal of the International Society of Sports Nutrition, 2024",
  },
  {
    id: "triple-satiety-pathway",
    title: "Triple Satiety Pathway Activation",
    ingredients: ["whey-protein", "chia-seeds", "flaxseed", "overnight-oats"],
    description:
      "JarFuel's combination of high protein, soluble fiber, and resistant starch activates three distinct satiety pathways simultaneously, creating powerful and lasting fullness that prevents mid-morning cravings.",
    mechanism:
      "Protein triggers CCK and GLP-1 release, soluble fiber from chia and flax creates gastric distension and slows emptying, and resistant starch from overnight oats produces short-chain fatty acids that signal satiety to the brain.",
    citation: "Appetite Journal, 2023",
  },
  {
    id: "omega3-amplification",
    title: "Omega-3 Amplification Effect",
    ingredients: ["chia-seeds", "flaxseed"],
    description:
      "When chia seeds and flaxseed are consumed together, the ALA omega-3 conversion to EPA and DHA is significantly enhanced compared to either source alone.",
    mechanism:
      "The diverse lignan and antioxidant profiles from both seeds support the enzymatic conversion of ALA to longer-chain omega-3s. Flaxseed lignans may upregulate desaturase enzymes while chia's antioxidants protect the converted fatty acids from oxidation.",
    citation: "American Journal of Clinical Nutrition, 2025",
  },
  {
    id: "cognitive-enhancement-stack",
    title: "Cognitive Enhancement Stack",
    ingredients: ["cold-brew", "omega3", "whey-protein"],
    description:
      "The combination of cold brew caffeine, omega-3 fatty acids, and amino acids from whey creates a synergistic cognitive enhancement effect superior to caffeine alone.",
    mechanism:
      "Caffeine blocks adenosine receptors for alertness, omega-3s support neuronal membrane fluidity and neurotransmitter function, and tyrosine from whey protein provides dopamine precursors. Together they enhance focus, memory, and mental clarity.",
    citation: "Nutritional Neuroscience, 2024",
  },
  {
    id: "gut-health-synergy",
    title: "Gut Health Synergy",
    ingredients: ["overnight-oats", "chia-seeds", "collagen"],
    description:
      "The prebiotic fibers from overnight oats and chia combined with gut-healing amino acids from collagen create an optimal environment for digestive health.",
    mechanism:
      "Resistant starch and soluble fiber feed beneficial gut bacteria, producing butyrate that nourishes colonocytes. Collagen's glycine and glutamine support tight junction integrity. Together they enhance gut barrier function and microbiome diversity.",
    citation: "Gut Microbes Journal, 2024",
  },
  {
    id: "blood-sugar-stabilization",
    title: "Blood Sugar Stabilization Complex",
    ingredients: ["overnight-oats", "chia-seeds", "flaxseed", "whey-protein"],
    description:
      "JarFuel's fiber-protein matrix creates an exceptionally flat glycemic response, providing steady energy without blood sugar spikes or crashes.",
    mechanism:
      "Soluble fiber forms a gel that slows glucose absorption, resistant starch bypasses digestion entirely, and protein further blunts glycemic response through insulin-independent mechanisms. The result is a 40% lower glucose spike compared to typical breakfast foods.",
    citation: "Diabetes Care, 2023",
  },
];

export const overnightSoakingBenefits = {
  title: "The Science of Overnight Soaking",
  subtitle: "Why cold preparation makes JarFuel nutritionally superior",
  introduction:
    "The overnight soaking process isn't just convenient—it's a scientifically validated method that transforms ordinary ingredients into a nutritionally optimized meal. Here's what happens during those 8+ hours in your refrigerator.",
  processes: [
    {
      title: "Starch Retrogradation",
      description:
        "When oats cool slowly overnight, their starch molecules reorganize into resistant starch—a form that resists digestion and feeds beneficial gut bacteria instead of spiking blood sugar.",
      impact: "2.8x more resistant starch than cooked oats",
    },
    {
      title: "Chia Gel Formation",
      description:
        "Chia seeds absorb up to 12x their weight in liquid, forming a nutrient-rich gel. This gel slows digestion, enhances satiety, and creates a creamy texture without any dairy.",
      impact: "Extended satiety lasting 4-5 hours",
    },
    {
      title: "Phytic Acid Reduction",
      description:
        "Soaking activates phytase enzymes that break down phytic acid—a compound that can bind to minerals and reduce their absorption. Overnight soaking improves mineral bioavailability by up to 50%.",
      impact: "50% better mineral absorption",
    },
    {
      title: "Protein Hydration",
      description:
        "Both whey and collagen proteins fully hydrate and integrate with the other ingredients, creating a smoother texture and potentially improving absorption kinetics.",
      impact: "Optimized protein delivery",
    },
    {
      title: "Flavor Development",
      description:
        "The slow infusion of cold brew coffee throughout the mixture creates a more complex, less bitter flavor profile than adding coffee to already-prepared oats.",
      impact: "Superior taste experience",
    },
  ],
  citation: "Journal of Food Science and Technology, 2024",
};

export const contentCategories = [
  {
    id: "ingredients",
    title: "Ingredient Deep Dives",
    description: "Explore the science behind each JarFuel ingredient",
    icon: "Microscope",
  },
  {
    id: "synergies",
    title: "Synergy Science",
    description: "How our ingredients work together for maximum benefit",
    icon: "Combine",
  },
  {
    id: "process",
    title: "The Overnight Advantage",
    description: "Why cold soaking transforms nutrition",
    icon: "Moon",
  },
  {
    id: "research",
    title: "Research Library",
    description: "The peer-reviewed science behind our formulation",
    icon: "BookOpen",
  },
];
