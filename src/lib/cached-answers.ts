import { normalizeText } from "@/lib/ai-twin";

export interface CachedAnswer {
  question: string;
  answer: string;
  suggestions: string[];
}

export const CACHED_ANSWERS: Record<string, CachedAnswer> = {
  built: {
    question: "What has he built?",
    answer:
      "Abdul Samad has built machine learning pipelines, edge computer-vision robotics, multi-agent systems, and production full-stack platforms:\n\n" +
      "### Production Systems & Case Studies\n" +
      "- **[Content-Refresh Scoring Pipeline (FlyRank)](/work/content-refresh-pipeline)**: Predictive ML pipeline ranking content pages by decline risk. Designed feature engineering, leakage audit, and client-holdout validation using DuckDB and Random Forest, achieving **0.74 precision@50 (3x improvement over baseline)**.\n" +
      "- **[AI Assistive Navigation System](/work/assistive-navigation)**: Assistive edge robotics architecture for visually impaired individuals using YOLOv8, DeepSORT, ROS2, and 360-degree LiDAR-camera sensor fusion on Raspberry Pi 4 (<200ms audio feedback latency, 70% collision risk reduction).\n" +
      "- **[Daftar](/work/daftar)**: Multi-agent workplace simulation built by Abdul Samad at AICON'26 with team nexora. Simulates a graduate's 'first shift' with AI colleagues (Gemini + Next.js), running hidden browser tests and grading 6 workplace skills quoting user transcripts ([trydaftar.vercel.app](https://trydaftar.vercel.app)).\n" +
      "- **[Capital Play](/work/capital-play)**: Sports venue booking platform with React, Node.js, MySQL, and Socket.io. Features 3 role dashboards, real-time slot locking, a background 'Ghost Engine' for slot lifecycles, and recursive pricing ([Source](https://github.com/Abdul-Samad-17/Capital_Play)).\n\n" +
      "### Web Platforms & Systems\n" +
      "- **[RideFlow](#work)**: Full-stack ride-hailing platform with MySQL stored procedures, triggers, views, ACID wallet transactions, and Google Maps routing ([Source](https://github.com/Abdul-Samad-17/Ride-Flow)).\n" +
      "- **[AI-ML-Automation-Tools](https://github.com/Abdul-Samad-17/AI-ML-Automation-Tools)**: Suite of 5 AI utilities (FAQ chatbot, email classifier, document QA, RAG chatbot, and FastAPI workflow automation).\n" +
      "- **[CineGraphX](https://github.com/Abdul-Samad-17/CineGraphX)**: Zero-STL C++ graph and tree database over 5,000 IMDb movies with custom AVL trees, achieving 5x faster search than linear scans.\n" +
      "- **[GridLock Rush](https://github.com/Abdul-Samad-17/GridLock-Rush)**: Bare-metal 2D arcade traffic game written in pure x86 Assembly.\n\n" +
      "Explore all projects in the [Work section](#work) or read the [Case Studies](/work).",
    suggestions: [
      "Tell me about the FlyRank content-refresh pipeline",
      "How does the AI Assistive Navigation System work?",
      "What is Abdul's background in AI/ML?",
      "What technologies does Abdul work with most?",
    ],
  },
  background: {
    question: "What is Abdul's background in AI/ML?",
    answer:
      "Abdul Samad is an **AI/ML Engineer** pursuing a **B.S. in Artificial Intelligence** at **FAST NUCES, Islamabad** (Aug 2024 – 2028).\n\n" +
      "His technical work spans:\n" +
      "- **ML Pipelines & Predictive Scoring**: Feature engineering, data leakage audits, warehouse analytics on DuckDB, and holdout-validated models at FlyRank (0.74 precision@50).\n" +
      "- **Computer Vision & Robotics**: Real-time object detection (YOLOv8), multi-object tracking (DeepSORT), and LiDAR sensor fusion on ROS2 for assistive navigation.\n" +
      "- **Agent Systems & LLMs**: Multi-agent persona simulations with private knowledge states and browser-based evaluation (Daftar).\n" +
      "- **Full-Stack AI Products**: Real-time web platforms with Socket.io, React, Node.js, and relational databases.\n\n" +
      "He also organized the **NASCON'25 AI Hackathon** at FAST NUCES (leading 25+ participants with 2+ partner companies) and holds **5 Anthropic Academy certifications**.\n\n" +
      "You can [browse his work](#work), [read the case studies](/work), or [download his resume](/resume.pdf).",
    suggestions: [
      "What has he built?",
      "Tell me about the FlyRank content-refresh pipeline",
      "How does the AI Assistive Navigation System work?",
      "What technologies does Abdul work with most?",
    ],
  },
  flyrank: {
    question: "Tell me about the FlyRank content-refresh pipeline",
    answer:
      "At **FlyRank** (remote, Jul 2026 – Aug 2026), Abdul built and validated a machine learning pipeline to rank warehouse content pages by decline risk:\n\n" +
      "- **Warehouse Analytics**: Executed high-throughput analytical queries over large-scale warehouse datasets using **DuckDB** and pandas.\n" +
      "- **Feature Leakage Prevention**: Independently audited the feature pipeline, identifying and eliminating a label-derived leakage feature before model training.\n" +
      "- **Model Performance**: Evaluated Random Forest models using strict client-holdout verification, achieving **0.74 precision@50 — a 3x gain over baseline**.\n\n" +
      "Read the complete breakdown in the [Content-Refresh Pipeline Case Study](/work/content-refresh-pipeline) or view the [GitHub repository](https://github.com/Abdul-Samad-17/FlyRank-Internship).",
    suggestions: [
      "How does the AI Assistive Navigation System work?",
      "What has he built?",
      "What technologies does Abdul work with most?",
      "Where can I find your resume?",
    ],
  },
  navigation: {
    question: "How does the AI Assistive Navigation System work?",
    answer:
      "The **AI Assistive Navigation System** is a real-time computer vision and edge robotics architecture built for visually impaired individuals:\n\n" +
      "- **Perception & Tracking**: Runs **YOLOv8** for real-time obstacle detection and **DeepSORT** for multi-object tracking, achieving 92% re-identification accuracy.\n" +
      "- **Sensor Fusion**: Fuses 360-degree **RPLIDAR** spatial scans with camera feeds to eliminate blind spots and reduce collision risk by 70%.\n" +
      "- **Edge Processing**: Integrates an **ESP32** microcontroller with a **Raspberry Pi 4** running **ROS2** to deliver low-latency (<200ms) directional audio feedback.\n\n" +
      "Check out the detailed technical breakdown in the [Assistive Navigation Case Study](/work/assistive-navigation).",
    suggestions: [
      "Tell me about the FlyRank content-refresh pipeline",
      "What has he built?",
      "What is Abdul's background in AI/ML?",
      "What technologies does Abdul work with most?",
    ],
  },
  technologies: {
    question: "What technologies does Abdul work with most?",
    answer:
      "Abdul's technical stack is organized across four core competencies:\n\n" +
      "- **AI / ML**: Python, PyTorch, scikit-learn, YOLOv8, OpenCV, NumPy, Pandas, Seaborn, CLIP.\n" +
      "- **Web Development**: React, Node.js, Express, MongoDB, REST APIs, Socket.io, Tailwind CSS, Next.js.\n" +
      "- **Robotics & Computer Vision**: ROS2, sensor fusion, DeepSORT, Gazebo, RPLIDAR, C++, Assembly.\n" +
      "- **Tools & Databases**: Git, GitHub, Postman, Vercel, MySQL, PostgreSQL, DuckDB.\n\n" +
      "Inspect full details in the [Skills section](#skills) or explore his [open-source repositories](https://github.com/Abdul-Samad-17).",
    suggestions: [
      "What has he built?",
      "Tell me about the FlyRank content-refresh pipeline",
      "What is Abdul's background in AI/ML?",
      "How can I contact Abdul Samad?",
    ],
  },
  projects: {
    question: "Which project should I open first?",
    answer:
      "Recommended projects showcasing Abdul's engineering versatility:\n\n" +
      "1. **[Daftar](/work/daftar)**: Multi-agent workplace simulation built by Abdul Samad with hidden browser tests and AI transcript evaluations ([Live Demo](https://trydaftar.vercel.app)).\n" +
      "2. **[Capital Play](/work/capital-play)**: Sports venue booking platform with an automated background 'Ghost Engine' and real-time Socket.io concurrency ([Source](https://github.com/Abdul-Samad-17/Capital_Play)).\n" +
      "3. **[RideFlow](#work)**: Ride-hailing system with atomic MySQL transactions, triggers, and live Google Maps tracking ([Source](https://github.com/Abdul-Samad-17/Ride-Flow)).\n" +
      "4. **[FlyRank Scoring Pipeline](/work/content-refresh-pipeline)**: Predictive ranking pipeline achieving 0.74 precision@50 on DuckDB.\n\n" +
      "Explore all projects in the [Work section](#work) or on [GitHub](https://github.com/Abdul-Samad-17).",
    suggestions: [
      "What has he built?",
      "What technologies does Abdul work with most?",
      "Tell me about the FlyRank content-refresh pipeline",
      "Where can I find your resume?",
    ],
  },
  education: {
    question: "What is your educational background?",
    answer:
      "Abdul Samad is pursuing a **B.S. in Artificial Intelligence** at **FAST NUCES, Islamabad** (Aug 2024 – 2028, CGPA: 3.12).\n\n" +
      "Relevant coursework includes:\n" +
      "- Data Structures & Algorithms, Analysis of Algorithms\n" +
      "- Artificial Intelligence, Machine Learning\n" +
      "- Operating Systems, SQL & Database Systems\n" +
      "- Linear Algebra, Probability & Statistics\n\n" +
      "Additionally, he completed 5 certifications with the Anthropic Academy (AI Fluency, Claude Platform, Claude Code, Model Context Protocol, and Claude Cowork).",
    suggestions: [
      "What is Abdul's background in AI/ML?",
      "What has he built?",
      "What technologies does Abdul work with most?",
      "Where can I find your resume?",
    ],
  },
  contact: {
    question: "How can I contact Abdul Samad?",
    answer:
      "You can reach Abdul Samad directly via:\n\n" +
      "- **Email**: [abdulsammadsardar17@gmail.com](mailto:abdulsammadsardar17@gmail.com)\n" +
      "- **LinkedIn**: [linkedin.com/in/abdul-samad1706](https://www.linkedin.com/in/abdul-samad1706)\n" +
      "- **GitHub**: [github.com/Abdul-Samad-17](https://github.com/Abdul-Samad-17)\n" +
      "- **Contact Form**: Send a direct message through the [Contact section](#contact).",
    suggestions: [
      "Could you share your LinkedIn?",
      "Can I see your GitHub?",
      "Where can I find your resume?",
      "What has he built?",
    ],
  },
  linkedin: {
    question: "Could you share your LinkedIn?",
    answer:
      "Abdul's LinkedIn profile is [linkedin.com/in/abdul-samad1706](https://www.linkedin.com/in/abdul-samad1706).\n\n" +
      "Feel free to connect regarding AI/ML engineering opportunities and technical collaborations.",
    suggestions: [
      "Can I see your GitHub?",
      "How can I contact Abdul Samad?",
      "Where can I find your resume?",
      "What has he built?",
    ],
  },
  github: {
    question: "Can I see your GitHub?",
    answer:
      "Abdul's open-source projects and code repositories are available at [github.com/Abdul-Samad-17](https://github.com/Abdul-Samad-17).\n\n" +
      "You can explore his ML pipelines, robotics code, full-stack applications, and systems repositories there.",
    suggestions: [
      "What has he built?",
      "Which project should I open first?",
      "What technologies does Abdul work with most?",
      "Where can I find your resume?",
    ],
  },
  resume: {
    question: "Where can I find your resume?",
    answer:
      "You can view and download Abdul Samad's resume directly at [/resume.pdf](/resume.pdf).\n\n" +
      "It covers his education at FAST NUCES, machine learning internship experience, engineering projects, and certifications.",
    suggestions: [
      "What is Abdul's background in AI/ML?",
      "What has he built?",
      "How can I contact Abdul Samad?",
      "Could you share your LinkedIn?",
    ],
  },
};

/**
 * Keyword-based lookup to match suggestion chips and common introductory inquiries
 * to pre-written cached answers.
 */
export function getCachedChipAnswer(message: string): CachedAnswer | null {
  const normalized = normalizeText(message);

  if (
    normalized.includes("what has he built") ||
    normalized.includes("what have you built") ||
    normalized.includes("what did he build") ||
    normalized.includes("built and shipped")
  ) {
    return CACHED_ANSWERS.built;
  }

  if (
    normalized.includes("background in ai ml") ||
    normalized.includes("background in applied ai") ||
    normalized.includes("ai ml background") ||
    normalized.includes("tell me about abdul") ||
    normalized.includes("who is abdul")
  ) {
    return CACHED_ANSWERS.background;
  }

  if (
    normalized.includes("flyrank") ||
    normalized.includes("content refresh") ||
    normalized.includes("scoring pipeline")
  ) {
    return CACHED_ANSWERS.flyrank;
  }

  if (
    normalized.includes("assistive navigation") ||
    normalized.includes("navigation system") ||
    normalized.includes("robotics") ||
    normalized.includes("visually impaired")
  ) {
    return CACHED_ANSWERS.navigation;
  }

  if (
    normalized.includes("technologies does abdul work with") ||
    normalized.includes("technologies do you work with") ||
    normalized.includes("what is your tech stack") ||
    normalized.includes("primary tech stack") ||
    normalized.includes("what technologies")
  ) {
    return CACHED_ANSWERS.technologies;
  }

  if (
    normalized.includes("project should i open first") ||
    normalized.includes("featured projects") ||
    normalized.includes("show me your projects")
  ) {
    return CACHED_ANSWERS.projects;
  }

  if (
    normalized.includes("educational background") ||
    normalized.includes("where did you study") ||
    normalized.includes("fast nuces")
  ) {
    return CACHED_ANSWERS.education;
  }

  if (
    normalized.includes("how can i contact") ||
    normalized.includes("best way to reach") ||
    normalized.includes("contact details")
  ) {
    return CACHED_ANSWERS.contact;
  }

  if (normalized.includes("linkedin") || normalized.includes("profile link")) {
    return CACHED_ANSWERS.linkedin;
  }

  if (normalized.includes("github") || normalized.includes("source code repo")) {
    return CACHED_ANSWERS.github;
  }

  if (normalized.includes("resume") || normalized.includes("download cv") || normalized.includes("curriculum vitae")) {
    return CACHED_ANSWERS.resume;
  }

  return null;
}
