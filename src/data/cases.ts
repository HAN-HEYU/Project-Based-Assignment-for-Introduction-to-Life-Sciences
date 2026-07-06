import type { ModuleId } from "../types";

export const knowledgePath: Array<{
  id: ModuleId | "basics" | "final";
  label: string;
  subtitle: string;
  icon: string;
  hint: string;
}> = [
  {
    id: "basics",
    label: "基因基础岛",
    subtitle: "DNA、基因、蛋白质、性状",
    icon: "dna",
    hint: "先理解遗传信息如何影响性状。",
  },
  {
    id: "food-safety",
    label: "转基因食品安全站",
    subtitle: "证据与监管",
    icon: "corn",
    hint: "用具体产品和证据判断食品安全。",
  },
  {
    id: "plants",
    label: "智慧农业植物园",
    subtitle: "作物性状与精准管理",
    icon: "sensor",
    hint: "把遗传改良放进农业系统中理解。",
  },
  {
    id: "animals",
    label: "动物模型研究所",
    subtitle: "科研价值与福利边界",
    icon: "cell",
    hint: "平衡科学价值、动物福利和生态风险。",
  },
  {
    id: "gene-therapy",
    label: "基因治疗医院",
    subtitle: "从异常基因到治疗思路",
    icon: "hospital",
    hint: "基因技术用于疾病治疗，而不是随意增强。",
  },
  {
    id: "gene-editing",
    label: "CRISPR 编辑实验室",
    subtitle: "定点修改与伦理边界",
    icon: "scissors",
    hint: "理解精准编辑与风险边界。",
  },
  {
    id: "final",
    label: "最终伦理决策大厅",
    subtitle: "综合评价农业案例",
    icon: "scale",
    hint: "用证据、风险、伦理和社会影响生成报告。",
  },
];

export const timelineEvents = [
  {
    title: "传统育种",
    era: "长期农业实践",
    icon: "leaf",
    description: "通过长期选择、杂交和筛选，让有利性状逐渐稳定下来。",
    keywords: ["选择", "杂交", "性状积累"],
    what: "依靠可观察性状和代际选择改良品种。",
    solves: "帮助人类逐步获得更高产、更适应环境或品质更好的生物材料。",
    risk: "周期长，结果受遗传背景和环境影响，难以快速应对新问题。",
  },
  {
    title: "重组 DNA 技术",
    era: "分子生物学时代",
    icon: "dna",
    description: "人类开始在分子层面剪切、连接和转移遗传信息。",
    keywords: ["分子层面", "外源基因", "载体"],
    what: "在分子层面处理遗传信息，使基因工程成为可能。",
    solves: "让研究者能更直接地研究基因功能和性状来源。",
    risk: "外源基因表达、递送工具和生态影响需要被严格评估。",
  },
  {
    title: "转基因作物",
    era: "农业应用扩展",
    icon: "corn",
    description: "基因技术进入农业生产，用于抗虫、抗病、耐逆、改善品质等目标。",
    keywords: ["抗虫", "抗病", "农业应用"],
    what: "通过基因工程让作物获得或增强特定性状。",
    solves: "为虫害、病害、环境压力和品质改良提供新的育种路径。",
    risk: "需要关注食品安全、生态影响、抗性演化和农民接受度。",
  },
  {
    title: "转基因动物",
    era: "科研与医学模型",
    icon: "cell",
    description: "用于疾病模型、基因功能研究、药用蛋白生产和农业性状改良。",
    keywords: ["模型动物", "医学研究", "伦理"],
    what: "通过遗传改造让动物表现特定研究或生产性状。",
    solves: "帮助理解疾病机制、验证基因功能和探索药物生产方式。",
    risk: "动物福利、生态逃逸、社会接受度和伦理边界必须被审查。",
  },
  {
    title: "基因治疗",
    era: "医学转化探索",
    icon: "hospital",
    description: "把基因技术用于疾病治疗，目标是补充、替换、调控或修正与疾病有关的基因功能。",
    keywords: ["疾病治疗", "递送", "安全性"],
    what: "针对疾病相关遗传信息进行治疗探索。",
    solves: "为某些由基因功能异常引发的疾病提供新的治疗思路。",
    risk: "准确递送、安全性、免疫反应、长期效果和伦理监管是核心难题。",
  },
  {
    title: "CRISPR",
    era: "精准编辑工具",
    icon: "scissors",
    description: "更精准、更灵活的基因编辑工具，使定点修改 DNA 成为可能。",
    keywords: ["guide RNA", "Cas", "定点编辑"],
    what: "一种常用于基因编辑的工具体系，科普模型中包含识别目标和执行修改。",
    solves: "提高了定点研究和改良的灵活性。",
    risk: "脱靶、嵌合、生殖系编辑和治疗与增强边界引发争议。",
  },
];

export const safetyChecklist = [
  { id: "nutrition", label: "营养成分是否与普通玉米存在显著差异", required: true },
  { id: "allergen", label: "是否引入潜在过敏原", required: true },
  { id: "toxicity", label: "是否存在毒性风险", required: true },
  { id: "stability", label: "插入性状是否稳定表达", required: true },
  { id: "environment", label: "对非目标生物和生态环境是否有影响", required: true },
  { id: "label", label: "是否有标签和公众知情机制", required: true },
];

export const farmProblems = [
  {
    id: "pests",
    label: "害虫严重",
    context: "虫害使叶片受损、产量下降，农户希望减少损失并控制投入。",
  },
  {
    id: "drought",
    label: "干旱缺水",
    context: "降水不稳定，灌溉成本升高，需要同时考虑节水和稳定产量。",
  },
  {
    id: "salinity",
    label: "土壤盐碱化",
    context: "土壤盐分累积影响出苗和产量，需要品种、灌排和土壤管理协同。",
  },
  {
    id: "nutrition",
    label: "营养价值不足",
    context: "当地希望提升作物中的特定营养品质，同时保持可接受的口感和成本。",
  },
  {
    id: "virus",
    label: "病毒病传播",
    context: "病毒病在田间扩散，单纯补种无法解决长期风险。",
  },
];

export const farmSolutions = [
  {
    id: "traditional",
    label: "传统育种",
    shortTerm: "短期见效较慢，更适合做稳妥的长期改良。",
    advantage: "社会接受度高，可结合本地品种基础逐步改良。",
    limit: "周期较长，目标性状受遗传背景限制。",
    cost: "时间成本较高，技术和监管成本相对可控。",
    ecologyRisk: "生态风险通常较低，但仍需看新品种田间表现。",
    regulation: "常规品种审定和种植管理要求较多。",
    risk: "需要避免只看单一性状而忽略产量、品质和抗逆综合表现。",
    longTerm: "适合长期基础改良，但对突发问题响应较慢。",
    partner: "适合配合智慧农业监测和田间管理。",
    combinable: "适合与精准灌溉、病虫害监测和生态防控组合。",
  },
  {
    id: "transgenic",
    label: "转基因技术",
    shortTerm: "一旦完成审查和推广，目标性状可能较明确。",
    advantage: "可针对明确性状设计解决思路，如抗虫或营养品质改良。",
    limit: "需要严格食品安全、生态影响和监管评估。",
    cost: "研发和合规成本较高，农户端成本取决于种子和管理制度。",
    ecologyRisk: "需重点评估非目标生物、基因流动和抗性演化。",
    regulation: "需要食品安全、环境安全、标签和公众沟通等监管环节。",
    risk: "公众知情、标签、抗性管理和利益分配都需要提前设计。",
    longTerm: "可作为长期方案的一部分，但必须持续监测抗性和生态影响。",
    partner: "需要配合庇护区策略、监测预警和透明沟通。",
    combinable: "适合与智慧监测、抗性管理、生态防控和农艺调整组合。",
  },
  {
    id: "editing",
    label: "基因编辑",
    shortTerm: "从概念到品种仍需验证，不适合跳过风险评估。",
    advantage: "可对本地品种的原有 DNA 进行更目标化的改良探索。",
    limit: "仍需验证脱靶、长期表现和生态影响。",
    cost: "前期研发和验证成本较高，若保留本地品种背景可降低适应性成本。",
    ecologyRisk: "需评估目标性状、脱靶、基因流动和长期生态影响。",
    regulation: "监管分类因地区和用途而异，不能默认免审查。",
    risk: "监管分类、伦理边界和社会沟通不能缺位。",
    longTerm: "有潜力服务本地品种长期改良，但需要多季节、多环境证据。",
    partner: "需要配合传统育种、表型验证和监管评估。",
    combinable: "适合与本地育种、田间监测和消费者沟通组合。",
  },
  {
    id: "pesticide",
    label: "农药防治",
    shortTerm: "短期见效快，可用于应急压低虫害或病害压力。",
    advantage: "见效快，短期内可降低部分虫害或病害压力。",
    limit: "可能增加成本，并带来残留、抗药性和生态影响问题。",
    cost: "短期投入明确，但长期频繁使用会推高成本。",
    ecologyRisk: "需关注残留、非目标生物和抗药性演化。",
    regulation: "需要按规范使用并接受残留与环境管理。",
    risk: "需要精准施用和综合防控，不能无限增加使用量。",
    longTerm: "更适合作为短期应急，不宜成为单一长期方案。",
    partner: "需要配合病虫害监测、轮换策略和生态防控。",
    combinable: "适合与监测预警、生物防治和抗性管理组合。",
  },
  {
    id: "smart",
    label: "智慧农业监测",
    shortTerm: "能较快改善发现问题和精准决策能力。",
    advantage: "通过传感器和风险判断帮助精准灌溉、预警和田间管理。",
    limit: "本身不直接改变作物遗传性状，设备和数据能力有门槛。",
    cost: "设备、维护和数据解释有门槛，小农户可及性需考虑。",
    ecologyRisk: "生态风险较低，但错误解读数据可能导致管理失误。",
    regulation: "通常不涉及生物安全审查，但涉及数据质量和责任划分。",
    risk: "需要考虑小农户可及性、维护成本和数据解释责任。",
    longTerm: "适合长期提升管理质量，但不能独立改变遗传性状。",
    partner: "需要配合品种改良、农艺管理和风险评估。",
    combinable: "适合与几乎所有农业方案组合，作为监测和反馈系统。",
  },
  {
    id: "irrigation",
    label: "精准灌溉",
    shortTerm: "对干旱缺水问题有直接管理效果。",
    advantage: "根据土壤水分和作物需求调节用水，降低浪费。",
    limit: "对虫害、病毒病和营养品质问题不是直接解法。",
    cost: "设备和维护成本中等到较高，取决于田块条件。",
    ecologyRisk: "合理使用可降低水资源压力，管理不当仍可能造成盐分累积。",
    regulation: "通常属于农业水资源和设施管理。",
    risk: "需要稳定供水、维护能力和数据判断。",
    longTerm: "适合干旱地区长期节水和稳产。",
    partner: "适合配合耐旱品种、土壤监测和农艺调整。",
    combinable: "适合与智慧监测、传统育种和基因改良方案组合。",
  },
  {
    id: "biocontrol",
    label: "生物防治",
    shortTerm: "见效可能慢于化学防治，但生态压力较低。",
    advantage: "利用天敌、微生物或生态调控降低病虫害压力。",
    limit: "效果受生态环境影响，需要持续管理。",
    cost: "投入随方案不同变化较大，长期可能降低化学投入。",
    ecologyRisk: "需要评估非目标影响和生态平衡。",
    regulation: "涉及生物制剂或生态释放时需符合相应管理要求。",
    risk: "不应随意释放未经评估的生物材料。",
    longTerm: "适合作为综合防控的生态基础。",
    partner: "适合配合抗虫品种、监测预警和农艺调整。",
    combinable: "适合与农药轮换、智慧监测和品种改良组合。",
  },
  {
    id: "management",
    label: "农业管理调整",
    shortTerm: "可较快改变播期、轮作、隔离和田间卫生等管理。",
    advantage: "成本相对可控，能降低单一技术依赖。",
    limit: "对强烈遗传性状需求的帮助有限。",
    cost: "主要是组织、培训和劳动力成本。",
    ecologyRisk: "通常较低，若管理设计不当也可能影响土壤和生态。",
    regulation: "多属于农艺指导和地方管理规范。",
    risk: "需要农户协作和持续执行。",
    longTerm: "适合作为所有技术方案的基础。",
    partner: "适合配合遗传改良、精准灌溉和病虫害监测。",
    combinable: "几乎适合与所有方案组合。",
  },
];

export const farmProblemAdvice: Record<string, string> = {
  pests:
    "虫害问题通常需要把品种改良、田间监测、抗性管理和生态防控组合起来，避免单一方案长期失效。",
  drought:
    "干旱场景更适合把耐旱品种、土壤水分监测和精准灌溉共同考虑。",
  salinity:
    "盐碱化问题需要耐盐材料、灌排管理、土壤改良和长期监测共同推进。",
  nutrition:
    "营养改良不仅看目标成分，也要验证口感、产量、稳定性、成本和消费者接受度。",
  virus:
    "病毒病传播需要监测预警、抗病材料和种植管理协同，单次补救通常不够。",
};

export const animalProjects = [
  {
    id: "mouse",
    title: "用转基因小鼠研究遗传病",
    valueHint: "有助于理解疾病机制和候选治疗路径，但必须减少痛苦并说明替代方案。",
  },
  {
    id: "fish",
    title: "让鱼类生长更快用于养殖",
    valueHint: "可能提高产量，也需要重点评估生态逃逸、福利和社会接受度。",
  },
  {
    id: "protein",
    title: "让动物生产药用蛋白",
    valueHint: "可能降低药物生产难度，但要评估动物照护、产品安全和伦理边界。",
  },
];

export const ethicsDimensions = [
  { id: "science", label: "科学价值" },
  { id: "application", label: "医学或农业价值" },
  { id: "welfare", label: "动物福利风险" },
  { id: "ecology", label: "生态风险" },
  { id: "alternative", label: "替代方案可行性" },
  { id: "acceptance", label: "社会接受度" },
];

export const animalEvidenceNeeds = [
  "是否有替代实验方法",
  "是否降低动物痛苦",
  "是否有生态隔离措施",
  "是否经过伦理审查",
];

export const therapySteps = [
  "识别疾病与基因关系",
  "明确目标细胞或组织",
  "选择治疗策略",
  "选择递送思路",
  "观察治疗效果",
  "监测安全性和长期影响",
  "伦理审查和监管跟踪",
];

export const crisprCase = {
  sequence: ["ATCG", "AAGT", "CCGA", "TTAC"],
  target: "CCGA",
  warning:
    "这是虚构 DNA 片段，只用于理解“识别目标”和“修复路径”的科普概念。",
};

export const finalChallengeAngles = [
  "粮食安全",
  "生态影响",
  "食品安全",
  "经济成本",
  "农民接受度",
  "伦理与监管",
];

export const finalRatingOptions = [
  "优势明显",
  "需要证据",
  "风险较高",
];

export const finalEvidenceOptions = [
  "多年田间虫害与产量数据",
  "食品安全与营养成分比较证据",
  "非目标生物和生态影响评估",
  "农民成本、收益和接受度调查",
  "抗性演化与长期监测方案",
  "透明标签、监管审查和公众沟通记录",
];

export const finalChallengePlans = [
  {
    id: "A",
    title: "A. 加大农药使用",
    tone: "短期见效快，但生态、成本和抗药性压力较大。",
    reason: "我认为它适合作为短期应急方案，但不能成为长期唯一策略。",
  },
  {
    id: "B",
    title: "B. 培育转基因抗虫作物",
    tone: "可针对虫害性状，但需要食品安全、生态和监管证据。",
    reason: "我倾向于在证据充分、监管透明的前提下考虑抗虫作物。",
  },
  {
    id: "C",
    title: "C. 使用基因编辑改良本地品种",
    tone: "保留本地适应性并定点改良，但仍需验证脱靶、生态和社会接受度。",
    reason:
      "我倾向于优先评估基因编辑改良本地品种，因为它可能兼顾本地适应性和目标性状改良。",
  },
];

export const finalRiskControls = [
  "建立长期田间监测与抗性管理",
  "公开食品安全与生态评估证据",
  "保留农民选择权并做好标签沟通",
  "设置独立伦理与监管审查",
];

export const references = [
  "National Human Genome Research Institute, Talking Glossary of Genomic and Genetic Terms",
  "World Health Organization, Genetically Modified Food Q&A",
  "U.S. Food and Drug Administration, GMO and Food Safety",
  "课程《生命科学导论》相关章节",
];
