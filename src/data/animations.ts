import type { AnimationResource } from "../types";

export const animations: AnimationResource[] = [
  {
    id: "dna-helix",
    title: "DNA 双螺旋",
    description: "用缓慢旋转的双螺旋说明 DNA 是遗传信息的载体。",
    relatedModule: "food-safety",
    learningPoint: "食品、作物和治疗讨论最终都要回到遗传信息如何影响性状。",
  },
  {
    id: "gene-expression",
    title: "基因表达概念流",
    description: "展示 DNA 到 RNA、蛋白质再到性状的简化链条。",
    relatedModule: "gene-therapy",
    learningPoint: "基因改变可能通过蛋白质和细胞功能影响性状或疾病。",
  },
  {
    id: "gmo-vs-editing",
    title: "转基因 vs 基因编辑",
    description: "左侧展示引入外源基因概念，右侧展示定点修改原有 DNA 概念。",
    relatedModule: "gene-editing",
    learningPoint: "两种技术路径不同，但都需要证据和监管。",
  },
  {
    id: "safety-flow",
    title: "食品安全证据流",
    description: "展示营养、过敏原、毒性、稳定性、环境和知情权共同构成评估。",
    relatedModule: "food-safety",
    learningPoint: "食品安全不是一句话判断，而是多维证据综合。",
  },
  {
    id: "smart-farm-flow",
    title: "智慧农场决策流",
    description: "展示问题诊断、监测、品种改良、精准管理和长期反馈。",
    relatedModule: "plants",
    learningPoint: "智慧农业强调组合方案和持续监测。",
  },
  {
    id: "gene-therapy-flow",
    title: "基因治疗流程图",
    description: "展示从疾病基因关系到目标细胞、治疗策略、安全监测和监管跟踪。",
    relatedModule: "gene-therapy",
    learningPoint: "安全和伦理监管贯穿治疗思路全过程。",
  },
  {
    id: "crispr-cut",
    title: "CRISPR 概念剪切",
    description: "使用虚构 DNA 片段说明目标识别、概念性切开和修复路径。",
    relatedModule: "gene-editing",
    learningPoint: "这是科普示意，不是实验设计或操作指导。",
  },
  {
    id: "risk-balance",
    title: "风险收益天平",
    description: "把收益、证据、风险、伦理、监管和社会影响放在同一张评估图中。",
    learningPoint: "生命科学技术评估需要权衡，而不是简单赞成或反对。",
  },
];
