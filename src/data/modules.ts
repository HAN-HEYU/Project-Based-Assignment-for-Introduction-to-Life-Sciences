import type { LearningModule } from "../types";
import { moduleQuizzes } from "./quizzes";

export const modules: LearningModule[] = [
  {
    id: "food-safety",
    title: "转基因食品的安全性",
    subtitle: "从标签判断走向证据评估",
    learningGoal:
      "理解转基因食品不能简单用“安全 / 不安全”判断，而要基于具体产品、具体性状、具体证据和监管评估进行个案分析。",
    coreQuestion: "面对一个转基因食品案例，我们到底应该评估什么证据？",
    estimatedMinutes: 22,
    prerequisite: "DNA、基因、蛋白质和性状之间存在联系，但环境和加工方式也会影响最终风险。",
    keywords: ["GMO", "食品安全", "过敏原", "毒性风险", "标签知情", "个案评估"],
    summary:
      "转基因是技术来源描述，不是安全结论。食品安全评价要回到具体产品、具体性状、证据完整性和监管透明度。",
    interactionType: "safety",
    quizIds: moduleQuizzes["food-safety"].map((question) => question.id),
    videoIds: ["dna-basics", "gmo-food-safety"],
    animationIds: ["dna-helix", "gene-expression", "safety-flow", "risk-balance"],
    nextModuleId: "plants",
    conceptCards: [
      {
        title: "转基因食品",
        definition: "由转基因生物作为原料，或通过相关基因工程技术生产的食品。",
        example: "虚构案例：抗虫玉米 A-01 被用于食品原料评估。",
        misconception: "不能只凭“转基因”三个字判断食品一定安全或一定危险。",
        icon: "corn",
      },
      {
        title: "个案评估",
        definition: "针对具体产品、具体性状和具体证据逐项判断风险与收益。",
        example: "抗虫性状与营养改良性状的评估重点不同。",
        misconception: "不是所有转基因食品都能用同一句结论概括。",
        icon: "microscope",
      },
      {
        title: "公众知情",
        definition: "通过标签、监管说明和公开沟通帮助消费者理解和选择。",
        example: "标签不是危险标志，而是透明治理的一部分。",
        misconception: "标签不能替代营养、过敏原或毒性等科学证据。",
        icon: "scale",
      },
    ],
    compareCards: [
      {
        title: "食品安全评估不是技术标签判断",
        leftTitle: "只看标签",
        rightTitle: "证据评估",
        leftPoints: ["容易把技术来源当成风险结论", "忽视不同产品和性状差异", "容易被情绪化信息左右"],
        rightPoints: ["比较营养成分与潜在过敏原", "评估毒性、稳定性和环境影响", "纳入标签、监管和长期监测"],
        takeaway: "更科学的判断是：先拆解证据，再形成有条件的结论。",
      },
      {
        title: "转基因食品 vs 普通食品安全评价",
        leftTitle: "共同问题",
        rightTitle: "额外关注",
        leftPoints: ["营养组成", "加工和食用方式", "剂量和暴露场景"],
        rightPoints: ["目标性状稳定性", "引入或改变的遗传信息", "生态和监管沟通"],
        takeaway: "转基因食品并不跳出食品安全评价框架，只是多了与遗传改造相关的证据问题。",
      },
    ],
    flowSteps: [
      { title: "确认产品", description: "明确原料、用途、目标性状和食用场景。", tag: "对象" },
      { title: "收集证据", description: "比较营养、过敏原、毒性、稳定性和环境影响。", tag: "证据" },
      { title: "判断充分性", description: "说明哪些证据充分，哪些仍需要补充或长期监测。", tag: "证据质量" },
      { title: "形成结论", description: "给出基于证据和监管的阶段性判断。", tag: "审查" },
      { title: "公众沟通", description: "通过标签和说明维护消费者知情与选择。", tag: "治理" },
    ],
    misconceptions: [
      {
        myth: "转基因食品一定有害。",
        clarification: "不能脱离具体产品和证据判断，风险评估要看性状、成分、暴露和监管。",
      },
      {
        myth: "转基因食品一定完全无风险。",
        clarification: "任何食品和农业技术都需要具体评估，科学结论通常带有适用范围。",
      },
      {
        myth: "天然食品一定更安全。",
        clarification: "天然不等于绝对安全，安全性还要看成分、剂量、加工和使用场景。",
      },
    ],
    sections: [
      {
        id: "lead",
        title: "先导问题",
        icon: "alert",
        points: [
          "如果标签写着“转基因”，我们应先问：改变了什么性状？证据在哪里？谁来监管？",
          "课堂讨论的目标不是制造恐惧或盲目信任，而是学习如何看证据。",
        ],
      },
      {
        id: "what",
        title: "是什么",
        icon: "corn",
        points: [
          "转基因食品通常来自转基因作物、动物或微生物来源原料。",
          "它和转基因作物有关，但食品评价还要考虑加工、食用方式和暴露场景。",
          "不同产品、不同性状和不同用途的评估重点并不相同。",
        ],
      },
      {
        id: "logic",
        title: "技术逻辑",
        icon: "dna",
        points: [
          "DNA 携带遗传信息，基因影响蛋白质，蛋白质参与性状形成。",
          "改变基因或表达结果，可能改变作物性状、食品组成或环境影响。",
          "本项目只讨论评估框架，不提供实验参数、真实操作流程或真实序列。",
        ],
      },
      {
        id: "use",
        title: "有什么用",
        icon: "leaf",
        points: [
          "可用于降低虫害损失、提升生产稳定性或改善特定营养品质。",
          "在粮食安全场景中，它可能成为作物改良工具箱的一种选择。",
          "它也训练我们用证据和监管框架参与公共科学议题。",
        ],
      },
      {
        id: "risk",
        title: "风险与争议",
        icon: "alert",
        points: [
          "评估包括营养成分、过敏原风险、毒性风险和目标性状稳定性。",
          "还需要讨论非目标生物影响、生态环境、标签制度和公众知情机制。",
          "公众担忧常来自长期风险、企业控制、信息不透明和监管信任不足。",
        ],
      },
      {
        id: "reality",
        title: "现实连接",
        icon: "map",
        points: [
          "食品安全讨论连接了生命科学、农业生产、监管制度和消费者选择权。",
          "课堂上可以把一个产品拆成“性状、证据、风险、监管、沟通”五个问题。",
        ],
      },
      {
        id: "summary",
        title: "本章总结",
        icon: "check",
        points: [
          "转基因食品不是天然等于安全，也不是天然等于危险。",
          "更可靠的判断是：具体产品、具体性状、具体证据和监管评估。",
        ],
      },
    ],
    quiz: moduleQuizzes["food-safety"],
  },
  {
    id: "plants",
    title: "转基因植物与智慧农业",
    subtitle: "把作物性状放进农业系统里理解",
    learningGoal:
      "理解转基因植物和智慧农业之间的联系，认识基因技术只是农业系统中的一种工具。",
    coreQuestion: "农业问题能不能只靠一个“神奇基因”解决？",
    estimatedMinutes: 24,
    prerequisite: "理解性状由基因、环境和管理共同影响，农业问题往往具有生态和经济背景。",
    keywords: ["抗虫", "抗病", "抗旱", "耐盐", "智慧农业", "精准管理"],
    summary:
      "智慧农业不是只靠转基因，而是数据监测、农业管理、遗传改良和风险评估的综合系统。",
    interactionType: "farm",
    quizIds: moduleQuizzes.plants.map((question) => question.id),
    videoIds: ["smart-farming", "gmo-crops"],
    animationIds: ["smart-farm-flow", "gmo-vs-editing", "risk-balance"],
    nextModuleId: "animals",
    conceptCards: [
      {
        title: "转基因植物",
        definition: "通过基因工程获得新性状或增强已有性状的植物。",
        example: "虚构场景：面向虫害压力设计的抗虫作物方案。",
        misconception: "它不是唯一育种方式，也不能替代田间管理。",
        icon: "leaf",
      },
      {
        title: "智慧农业",
        definition: "用传感器、遥感、图像识别、AI 判断和精准管理帮助农业决策的系统。",
        example: "土壤水分监测、病虫害预警、精准灌溉和精准施肥。",
        misconception: "智慧农业不等于转基因技术本身。",
        icon: "sensor",
      },
      {
        title: "综合防控",
        definition: "把品种、监测、农艺、生态防控和必要的化学防治组合起来。",
        example: "害虫严重时同时考虑抗虫品种、预警监测和抗性管理。",
        misconception: "单一技术通常难以长期解决复杂农业问题。",
        icon: "map",
      },
    ],
    compareCards: [
      {
        title: "传统育种 vs 转基因植物",
        leftTitle: "传统育种",
        rightTitle: "转基因植物",
        leftPoints: ["依赖杂交、选择和长期筛选", "社会接受度通常较高", "周期较长，目标不一定精确"],
        rightPoints: ["可针对较明确性状设计思路", "需要食品、生态和监管评估", "公众沟通与标签机制重要"],
        takeaway: "两者不是简单替代关系，而是作物改良工具箱中的不同工具。",
      },
      {
        title: "遗传改良 vs 智慧管理",
        leftTitle: "改变作物性状",
        rightTitle: "改变管理决策",
        leftPoints: ["抗虫、抗病、抗旱、耐盐", "改善营养品质或延长储存期", "需要长期性状稳定证据"],
        rightPoints: ["传感器、遥感和 AI 预警", "精准灌溉、施肥与病虫害管理", "需要数据质量和维护能力"],
        takeaway: "作物本身和农业管理系统要协同，才更接近可持续解决方案。",
      },
    ],
    flowSteps: [
      { title: "识别农场问题", description: "区分害虫、干旱、盐碱、病毒病或营养品质不足。", tag: "诊断" },
      { title: "选择工具组合", description: "比较传统育种、转基因、基因编辑、监测和农艺管理。", tag: "方案" },
      { title: "评估短期效果", description: "看能否降低损失、控制成本或稳定生产。", tag: "收益" },
      { title: "评估长期风险", description: "关注抗性演化、基因流动、生态影响和农民接受度。", tag: "风险" },
      { title: "持续监测调整", description: "利用数据反馈改进灌溉、施肥、病虫害预警和品种部署。", tag: "智慧农业" },
    ],
    misconceptions: [
      {
        myth: "一个抗虫基因可以永久解决所有虫害。",
        clarification: "害虫可能发生抗性演化，仍需监测、轮换和综合防控。",
      },
      {
        myth: "智慧农业就是转基因农业。",
        clarification: "智慧农业更像管理系统，转基因只是其中的遗传改良工具之一。",
      },
      {
        myth: "基因技术越先进，田间管理越不重要。",
        clarification: "环境、管理和市场因素会影响最终效果，田间管理仍是关键。",
      },
    ],
    sections: [
      {
        id: "lead",
        title: "先导问题",
        icon: "sensor",
        points: [
          "如果田里出现虫害、干旱或病毒病，应选择品种改良、田间监测还是农药防治？",
          "真实农业决策往往是组合题，不是单选题。",
        ],
      },
      {
        id: "what",
        title: "是什么",
        icon: "leaf",
        points: [
          "转基因植物通过基因工程获得某些新性状或增强已有性状。",
          "常见目标包括抗虫、抗病、抗除草剂、抗旱、耐盐、改善营养品质和延长储存期。",
          "它是现代育种工具之一，不等于替代传统育种。",
        ],
      },
      {
        id: "logic",
        title: "技术逻辑",
        icon: "testTube",
        points: [
          "先明确农业问题和目标性状，再评估候选遗传信息是否可能帮助作物表现更稳定。",
          "品种应用前要经历性状表现、食品或饲用安全、生态影响和监管审查。",
          "本页面不展示真实转化实验、参数或可复现实验方案。",
        ],
      },
      {
        id: "use",
        title: "有什么用",
        icon: "corn",
        points: [
          "抗虫和抗病性状可能降低产量损失。",
          "抗旱和耐盐性状可帮助作物适应环境压力。",
          "营养品质改良可以服务特定公共健康或食品加工需求。",
        ],
      },
      {
        id: "risk",
        title: "风险与限制",
        icon: "alert",
        points: [
          "需要关注抗性演化、非靶标生物、基因流动和生态影响。",
          "还要考虑农民成本、种子选择权、监管分类和公众接受度。",
          "智慧农业本身也有设备成本、数据解释责任和小农户可及性问题。",
        ],
      },
      {
        id: "reality",
        title: "现实连接",
        icon: "map",
        points: [
          "智慧农业把传感器监测、AI 风险判断、精准灌溉、病虫害预警和作物遗传改良连接起来。",
          "更稳妥的方案通常是“数据监测 + 农业管理 + 遗传改良 + 风险评估”。",
        ],
      },
      {
        id: "summary",
        title: "本章总结",
        icon: "check",
        points: [
          "基因技术可以帮助解决农业问题，但不是农业系统的全部。",
          "长期方案需要同时考虑产量、生态、成本、接受度和监管。",
        ],
      },
    ],
    quiz: moduleQuizzes.plants,
  },
  {
    id: "animals",
    title: "转基因动物",
    subtitle: "从疾病模型到伦理委员会",
    learningGoal:
      "理解转基因动物在科研、医学和农业中的价值，同时理解动物福利、生态逃逸和社会接受度等伦理争议。",
    coreQuestion: "一个转基因动物项目，能不能只看“有没有用”？",
    estimatedMinutes: 23,
    prerequisite: "理解基因改变可能影响蛋白质和性状，也理解动物研究需要伦理审查。",
    keywords: ["疾病模型", "基因功能", "药用蛋白", "动物福利", "生态逃逸", "替代方案"],
    summary:
      "转基因动物评价需要同时看科学必要性、替代方案、动物福利、生态风险和社会影响。",
    interactionType: "animalEthics",
    quizIds: moduleQuizzes.animals.map((question) => question.id),
    videoIds: ["animal-models", "bioethics"],
    animationIds: ["gene-expression", "risk-balance"],
    nextModuleId: "gene-therapy",
    conceptCards: [
      {
        title: "模型动物",
        definition: "用于模拟或研究某些生物过程、基因功能或疾病机制的动物。",
        example: "虚构案例：用于理解遗传病机制的转基因小鼠。",
        misconception: "模型动物能提供线索，但不能替代全部临床证据。",
        icon: "cell",
      },
      {
        title: "动物福利",
        definition: "关注动物痛苦、照护条件、生活质量和研究必要性的伦理原则。",
        example: "评估是否减少痛苦、是否有替代方法、是否经过伦理审查。",
        misconception: "科学价值高不代表可以忽视动物痛苦。",
        icon: "alert",
      },
      {
        title: "生态逃逸",
        definition: "经改造动物离开控制环境后，可能影响野外种群或生态关系。",
        example: "快速生长鱼类用于养殖时必须讨论隔离与监测。",
        misconception: "只在实验室出现的风险不会进入社会讨论。",
        icon: "map",
      },
    ],
    compareCards: [
      {
        title: "科学价值 vs 伦理边界",
        leftTitle: "科学价值",
        rightTitle: "伦理边界",
        leftPoints: ["帮助理解疾病机制", "验证基因功能", "探索药物生产或治疗思路"],
        rightPoints: ["动物痛苦是否最小化", "是否存在替代方法", "是否经过审查和监管"],
        takeaway: "伦理审查不是反科学，而是要求研究说明必要性、比例性和责任。",
      },
      {
        title: "医学研究 vs 农业应用",
        leftTitle: "医学研究",
        rightTitle: "农业应用",
        leftPoints: ["重点看疾病机制与治疗价值", "需要替代方案和福利审查", "模型外推存在边界"],
        rightPoints: ["重点看生产收益和生态隔离", "需要市场接受和监管", "逃逸风险更突出"],
        takeaway: "转基因动物项目必须按用途分案评估。",
      },
    ],
    flowSteps: [
      { title: "提出科学问题", description: "说明为什么需要动物模型或动物生产系统。", tag: "必要性" },
      { title: "寻找替代方案", description: "评估细胞模型、计算模型或已有数据是否可替代。", tag: "替代" },
      { title: "评估福利风险", description: "判断痛苦程度、照护条件和减轻伤害措施。", tag: "福利" },
      { title: "评估生态与社会影响", description: "考虑逃逸、基因扩散、市场接受度和公共沟通。", tag: "影响" },
      { title: "形成伦理意见", description: "给出继续、修改后继续或暂缓的建议。", tag: "审查" },
    ],
    misconceptions: [
      {
        myth: "只要项目有医学价值，就不需要讨论动物福利。",
        clarification: "医学价值越高，越需要清楚说明必要性、替代方案和痛苦最小化。",
      },
      {
        myth: "转基因动物研究一定能直接预测人体结果。",
        clarification: "模型动物提供机制线索，但仍需其他证据链支持。",
      },
      {
        myth: "生态风险只和植物有关。",
        clarification: "动物逃逸、繁殖和生态关系同样可能引发生态讨论。",
      },
    ],
    sections: [
      {
        id: "lead",
        title: "先导问题",
        icon: "alert",
        points: [
          "如果一个动物研究可能带来医学收益，但也可能增加动物痛苦，我们如何判断边界？",
          "伦理审查不是“阻止科学”，而是让科学说明必要性与责任。",
        ],
      },
      {
        id: "what",
        title: "是什么",
        icon: "cell",
        points: [
          "转基因动物是遗传信息被人为改造，从而表现特定研究或生产性状的动物。",
          "常见用途包括疾病模型、基因功能研究、药用蛋白生产、器官移植研究和农业性状改良。",
          "它们常出现在科研和医学场景，也可能进入农业讨论。",
        ],
      },
      {
        id: "logic",
        title: "技术逻辑",
        icon: "microscope",
        points: [
          "科普层面只需理解：改变遗传信息后，观察基因、蛋白、细胞和个体性状之间的关系。",
          "任何动物研究都应评估必要性、替代方案、痛苦最小化和审查机制。",
          "本项目不提供动物实验设计、操作步骤或真实实验参数。",
        ],
      },
      {
        id: "use",
        title: "有什么用",
        icon: "hospital",
        points: [
          "疾病模型能帮助理解遗传病、肿瘤、免疫或代谢疾病的机制。",
          "基因功能研究可帮助确认某个基因与性状之间的关系。",
          "药用蛋白生产和农业性状改良也可能带来实际或理论价值。",
        ],
      },
      {
        id: "risk",
        title: "风险与争议",
        icon: "alert",
        points: [
          "动物福利是核心问题：痛苦、照护、生活质量和实验必要性必须被审视。",
          "生态逃逸、基因扩散和社会接受度会影响项目能否推进。",
          "科研收益与伦理边界需要公开、可追责的评估。",
        ],
      },
      {
        id: "reality",
        title: "现实连接",
        icon: "map",
        points: [
          "医学科研常需要模型系统，但模型选择必须考虑替代方法和伦理成本。",
          "农业动物改良还会涉及生态隔离、市场接受和监管责任。",
        ],
      },
      {
        id: "summary",
        title: "本章总结",
        icon: "check",
        points: [
          "转基因动物不能只看“有没有用”。",
          "更完整的判断包括科学必要性、替代方案、动物痛苦程度、监管和社会影响。",
        ],
      },
    ],
    quiz: moduleQuizzes.animals,
  },
  {
    id: "gene-therapy",
    title: "基因治疗",
    subtitle: "把基因技术用于疾病治疗",
    learningGoal:
      "理解基因治疗是把基因技术用于疾病治疗，不是用于随意增强人类能力。",
    coreQuestion: "基因治疗为什么必须围绕疾病、递送、安全和伦理监管展开？",
    estimatedMinutes: 25,
    prerequisite: "理解基因异常可能影响蛋白质和细胞功能，并知道治疗研究需要严格证据。",
    keywords: ["致病基因", "递送", "体内治疗", "体外治疗", "免疫反应", "长期随访"],
    summary:
      "基因治疗的核心目标是治疗疾病，必须在安全性、有效性、伦理监管和社会公平框架下推进。",
    interactionType: "therapyPuzzle",
    quizIds: moduleQuizzes["gene-therapy"].map((question) => question.id),
    videoIds: ["gene-therapy", "bioethics"],
    animationIds: ["gene-expression", "gene-therapy-flow", "risk-balance"],
    nextModuleId: "gene-editing",
    conceptCards: [
      {
        title: "基因治疗",
        definition: "以疾病相关遗传信息为干预对象，尝试恢复或调控细胞功能的治疗策略。",
        example: "概念链条：致病基因异常 → 蛋白功能异常 → 细胞功能受损。",
        misconception: "基因治疗不是随意增强人的外貌、智力或运动能力。",
        icon: "hospital",
      },
      {
        title: "体内与体外治疗",
        definition: "体内治疗在体内递送；体外治疗先处理细胞，再用于患者相关治疗流程。",
        example: "in vivo 关注体内到达目标细胞，ex vivo 关注体外处理后再应用。",
        misconception: "二者都不是简单“改一下基因就治好”的过程。",
        icon: "virus",
      },
      {
        title: "长期随访",
        definition: "治疗后持续观察效果、安全性和可能延迟出现的风险。",
        example: "疗效、免疫反应和安全信号都需要持续记录。",
        misconception: "治疗后短期有效就等于长期安全。",
        icon: "check",
      },
    ],
    compareCards: [
      {
        title: "基因治疗 vs 人类增强",
        leftTitle: "治疗疾病",
        rightTitle: "能力增强",
        leftPoints: ["目标是缓解或治疗疾病", "受益者通常是患者", "需要临床证据和监管审查"],
        rightPoints: ["目标是提升非疾病能力", "涉及公平与社会压力", "伦理争议更强"],
        takeaway: "课程中的基因治疗讨论应始终围绕疾病和患者利益，而不是随意增强。",
      },
      {
        title: "体内治疗 vs 体外治疗",
        leftTitle: "in vivo",
        rightTitle: "ex vivo",
        leftPoints: ["在体内完成递送或调控", "难点是准确到达目标组织", "免疫反应和分布风险重要"],
        rightPoints: ["体外处理细胞后再用于治疗流程", "可在应用前进行部分检测", "流程复杂、成本和可及性需要关注"],
        takeaway: "路径不同，风险控制和证据要求也不同。",
      },
    ],
    flowSteps: [
      { title: "识别疾病与基因关系", description: "判断疾病是否与明确遗传异常有关。", tag: "病因" },
      { title: "明确目标细胞或组织", description: "弄清楚需要恢复功能的细胞类型。", tag: "目标" },
      { title: "选择治疗策略", description: "补充、替换、调控或概念性修正相关基因功能。", tag: "策略" },
      { title: "选择递送思路", description: "只讨论高层路径，不涉及真实载体构建或参数。", tag: "递送" },
      { title: "观察治疗效果", description: "评估细胞功能、组织功能和临床相关结果。", tag: "疗效" },
      { title: "监测长期安全", description: "安全监测贯穿全过程，而不是最后一步。", tag: "安全" },
      { title: "伦理审查与监管跟踪", description: "关注患者权益、可及性、知情同意和长期责任。", tag: "治理" },
    ],
    misconceptions: [
      {
        myth: "找到致病基因就等于治好了疾病。",
        clarification: "还要解决目标细胞、递送、表达、安全、免疫反应和长期效果等问题。",
      },
      {
        myth: "基因治疗可以随意用于增强人类能力。",
        clarification: "本课程强调疾病治疗边界，增强用途涉及更复杂的伦理和社会争议。",
      },
      {
        myth: "安全性只需治疗后检查一次。",
        clarification: "安全监测应贯穿研究、应用和长期随访全过程。",
      },
    ],
    sections: [
      {
        id: "lead",
        title: "先导问题",
        icon: "hospital",
        points: [
          "如果疾病来自基因异常，是否只要“修好基因”就完成治疗？",
          "真正的难点还包括递送、安全性、免疫反应、长期效果和伦理监管。",
        ],
      },
      {
        id: "what",
        title: "是什么",
        icon: "cell",
        points: [
          "基因治疗把疾病相关遗传信息作为干预对象。",
          "基本逻辑是：致病基因异常 → 蛋白功能异常 → 细胞功能受损 → 尝试补充、替换、调控或编辑相关基因。",
          "它面向疾病治疗，不是能力增强项目。",
        ],
      },
      {
        id: "logic",
        title: "技术逻辑",
        icon: "virus",
        points: [
          "体内治疗 in vivo：在患者体内递送治疗相关遗传物质或调控工具。",
          "体外治疗 ex vivo：先在体外处理患者细胞，再把处理后的细胞用于相关治疗流程。",
          "本页面只展示高层概念，不涉及真实载体选择、剂量、培养或临床操作。",
        ],
      },
      {
        id: "use",
        title: "有什么用",
        icon: "hospital",
        points: [
          "可用于探索某些遗传病、血液系统疾病、眼科疾病或免疫相关疾病的治疗路径。",
          "它把生命科学从理解机制推进到尝试干预机制。",
          "也帮助学生理解基因、蛋白、细胞功能和疾病之间的因果链。",
        ],
      },
      {
        id: "risk",
        title: "风险与争议",
        icon: "alert",
        points: [
          "主要难点包括准确递送、长期表达、安全性、免疫反应和伦理监管。",
          "还要讨论治疗可及性、公平性、疗效持续性和长期随访。",
          "疾病治疗与能力增强的边界必须清楚。",
        ],
      },
      {
        id: "reality",
        title: "现实连接",
        icon: "map",
        points: [
          "基因治疗连接基础生命科学、临床医学、监管制度和患者权益。",
          "它提醒我们：技术越接近人体治疗，越需要证据、审查和长期责任。",
        ],
      },
      {
        id: "summary",
        title: "本章总结",
        icon: "check",
        points: [
          "基因治疗关注疾病相关基因功能，不是随意增强人类能力。",
          "安全监测和伦理监管不是附加项，而是治疗设计的一部分。",
        ],
      },
    ],
    quiz: moduleQuizzes["gene-therapy"],
  },
  {
    id: "gene-editing",
    title: "基因编辑与 CRISPR",
    subtitle: "更精准不等于零风险",
    learningGoal: "理解基因编辑与传统转基因的区别，认识 CRISPR 的简化机制和伦理边界。",
    coreQuestion: "更精准的基因编辑，是否就意味着零风险？",
    estimatedMinutes: 26,
    prerequisite: "理解 DNA 是遗传信息载体，基因改变可能影响蛋白质、细胞功能和性状。",
    keywords: ["CRISPR", "guide RNA", "Cas 蛋白", "脱靶", "嵌合", "生殖系编辑"],
    summary:
      "基因编辑更精准，但不等于完全可控；技术能力越强，越需要明确风险证据、伦理边界和监管责任。",
    interactionType: "crispr",
    quizIds: moduleQuizzes["gene-editing"].map((question) => question.id),
    videoIds: ["crispr", "bioethics"],
    animationIds: ["gmo-vs-editing", "crispr-cut", "risk-balance"],
    conceptCards: [
      {
        title: "转基因与基因编辑",
        definition: "转基因通常引入外源基因；基因编辑通常对原有 DNA 定点修改、删除或替换。",
        example: "虚构片段 ATCG-AAGT-CCGA-TTAC 用于理解目标识别。",
        misconception: "基因编辑不一定引入外源基因，但仍需要风险评估。",
        icon: "dna",
      },
      {
        title: "CRISPR 简化模型",
        definition: "guide RNA 识别目标 DNA，Cas 蛋白到达目标位置，DNA 被切开或修改，细胞修复 DNA。",
        example: "点击虚构目标片段 CCGA，比较随机修复与模板修复。",
        misconception: "这不是 guide RNA 设计教程，也不是实验操作指南。",
        icon: "scissors",
      },
      {
        title: "伦理边界",
        definition: "根据治疗、增强、胚胎编辑和农业改良等不同用途分层讨论。",
        example: "治疗严重遗传病与增强身高智力的伦理评价并不相同。",
        misconception: "技术可行不等于社会上就应立即应用。",
        icon: "scale",
      },
    ],
    compareCards: [
      {
        title: "转基因 vs 基因编辑",
        leftTitle: "转基因",
        rightTitle: "基因编辑",
        leftPoints: ["常引入外源基因", "关注外源基因表达与稳定性", "需评估食品、生态和监管问题"],
        rightPoints: ["强调定点修改原有 DNA", "不一定引入外源基因", "需评估脱靶、嵌合和长期影响"],
        takeaway: "二者不同，但都不是自动安全或自动危险，都需要证据评估。",
      },
      {
        title: "治疗疾病 vs 增强能力",
        leftTitle: "治疗",
        rightTitle: "增强",
        leftPoints: ["以疾病负担和患者利益为核心", "可在严格证据和监管下讨论", "仍需长期安全性"],
        rightPoints: ["可能制造公平和社会压力问题", "受益边界更模糊", "公共伦理争议更强"],
        takeaway: "用途不同，伦理门槛不同。",
      },
    ],
    flowSteps: [
      { title: "识别目标片段", description: "使用虚构 DNA 片段理解“找到位置”的概念。", tag: "定位" },
      { title: "概念性切开或修改", description: "Cas 蛋白像工具到达目标位置，页面只做示意。", tag: "工具" },
      { title: "进入修复路径", description: "随机修复可能失活，模板修复理论上更精确。", tag: "修复" },
      { title: "评估非目标影响", description: "关注脱靶、嵌合和不确定长期影响。", tag: "风险" },
      { title: "讨论应用边界", description: "治疗、增强、胚胎和农业改良需要分层判断。", tag: "伦理" },
    ],
    misconceptions: [
      {
        myth: "基因编辑更精准，所以没有风险。",
        clarification: "精准并不等于完全可控，脱靶、嵌合和长期影响仍需验证。",
      },
      {
        myth: "基因编辑和转基因完全一样。",
        clarification: "两者都属于现代生命科学工具，但改造方式和评估重点有所不同。",
      },
      {
        myth: "只要能编辑，就应该编辑胚胎。",
        clarification: "胚胎和生殖系编辑涉及后代权益、社会公平和监管边界，争议极强。",
      },
    ],
    sections: [
      {
        id: "lead",
        title: "先导问题",
        icon: "scissors",
        points: [
          "如果能更准确地修改 DNA，我们是否就可以修改任何想改的性状？",
          "技术能力、风险证据和伦理边界必须同时讨论。",
        ],
      },
      {
        id: "what",
        title: "是什么",
        icon: "dna",
        points: [
          "转基因通常引入外源基因，使生物获得新性状。",
          "基因编辑对原有 DNA 进行定点修改、删除或替换，不一定引入外源基因。",
          "二者都属于现代生命科学工具，但风险评估重点有所不同。",
        ],
      },
      {
        id: "logic",
        title: "技术逻辑",
        icon: "scissors",
        points: [
          "CRISPR 的简化机制是：guide RNA 识别目标 DNA → Cas 蛋白到达目标位置 → DNA 被切开或修改 → 细胞修复 DNA。",
          "修复可能是随机修复，也可能在特定条件下更接近模板修复。",
          "本项目只使用虚构 DNA 片段做概念演示，不提供真实 guide RNA 设计或实验流程。",
        ],
      },
      {
        id: "use",
        title: "有什么用",
        icon: "leaf",
        points: [
          "农业中可用于研究抗病抗逆性、改良本地品种或改善品质。",
          "医学研究中可帮助理解致病变异和开发潜在治疗策略。",
          "基础研究中可帮助验证基因功能，但仍需严谨验证。",
        ],
      },
      {
        id: "risk",
        title: "风险与争议",
        icon: "alert",
        points: [
          "脱靶、嵌合、长期影响和生态扩散都需要评估。",
          "人类胚胎或生殖系编辑涉及后代权益和社会公平，争议尤其强烈。",
          "治疗疾病、增强能力和编辑胚胎应分层讨论。",
        ],
      },
      {
        id: "reality",
        title: "现实连接",
        icon: "map",
        points: [
          "基因编辑让农业和医学问题有了更精细的研究工具。",
          "它也迫使社会回答：哪些用途可接受，谁来决定边界，如何监管？",
        ],
      },
      {
        id: "summary",
        title: "本章总结",
        icon: "check",
        points: [
          "基因编辑与转基因不同，但都需要证据和监管。",
          "更强的技术能力意味着更清晰的伦理边界和风险控制责任。",
        ],
      },
    ],
    quiz: moduleQuizzes["gene-editing"],
  },
];
