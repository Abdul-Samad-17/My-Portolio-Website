# Abdul Samad: real content brief

Source of truth for replacing the placeholder data. Sources: Abdul's CV, his public GitHub (Abdul-Samad-17) and its READMEs. Items marked **[CONFIRM]** use the default shown until Abdul answers.

## Rules for the agent
- Map this into the existing data shape (src/data/portfolio.ts, case-studies.ts, ai-config, cached answers, llms.txt, JSON-LD). Do not invent facts or numbers. If a required field has no source here, make the field optional instead of filling it.
- Never include: PUBG, PMPL, esports analyst work, SCAR, FAKeless, the phone number, or anything from the original author's site. Add PUBG, PMPL, esports, SCAR and FAKeless to the denylist test.
- The resume PDF contains a phone number. Do not link the phone anywhere on the site.

## Identity
- Name: Abdul Samad. Location: Islamabad, Pakistan.
- Email abdulsammadsardar17@gmail.com, LinkedIn https://www.linkedin.com/in/abdul-samad1706, GitHub https://github.com/Abdul-Samad-17
- Role line [CONFIRM]: "AI/ML Engineer" (CV title is "AI/ML Engineer Intern"; avoid "Applied AI Engineer", which overclaims).
- Hero pitch [CONFIRM]: "BS Artificial Intelligence student at FAST NUCES Islamabad, building ML pipelines, computer-vision robotics and full-stack AI products."
- Hero stats [CONFIRM] (each links to what backs it up):
  1. 15 / public repositories (verifiable on the GitHub profile; Abdul counts 21 including private)
  2. 10+ / AI projects completed
  3. 25+ / hackathon participants led
  4. 0.74 / precision@50, 3x over baseline

## About
- Education: B.S. Artificial Intelligence, FAST NUCES Islamabad, Aug 2024 to 2028. Courses: DSA, AI, OS, Linear Algebra, Probability and Statistics, SQL, ML, Analysis of Algorithms. CGPA 3.12 [CONFIRM: show or hide, default hide].
- Recognition card: AI Hackathon Organizing Officer, NASCON'25 (FAST NUCES), Apr to May 2025. Led a 25+ participant industry hackathon with 2+ partner companies; 200% growth in event reach.
- Highlight [CONFIRM]: Anthropic Academy certifications (AI Fluency, Claude Platform, Claude Code, Model Context Protocol, Claude Cowork).

## Experience
1. Machine Learning Engineering Intern, FlyRank (remote), Jul 2026 to Aug 2026 [CONFIRM dates, earlier notes said Sep]
   - Built and validated a content-refresh scoring pipeline (Python, scikit-learn, pandas, DuckDB): 0.74 precision@50 with Random Forest, a 3x improvement over baseline, validated by client-holdout testing [CONFIRM 0.74 vs 0.78].
   - Independently designed the feature engineering and leakage-audit process, and found and corrected a label-derived feature.
2. AI Hackathon Organizing Officer, NASCON'25, FAST NUCES, Apr to May 2025: the bullet from the recognition card.
3. Education entry as above.

## Case studies (4; the first 3 are featured)
Each needs problem, approach, result. Where decisions or trade-offs are not given here, leave them out.
1. **Content-refresh scoring pipeline (FlyRank).** Category: ML pipelines. Problem: rank content pages by decline risk. Approach: DuckDB over a warehouse of tens of millions of rows [CONFIRM exact size], feature engineering, leakage audit, client-holdout validation, Random Forest vs baseline. Result: 0.74 precision@50, 3x baseline. Links: repo github.com/Abdul-Samad-17/FlyRank-Internship, paper page https://abdul-samad-17.github.io/FlyRank-Internship/
2. **AI Assistive Navigation System.** Category: computer vision and robotics. Status: in progress since Oct 2025, no public repo. Stack: YOLOv8, DeepSORT, ROS2, sensor fusion, RPLIDAR, ESP32 + Raspberry Pi 4. For visually impaired users. Claims from the CV: 92% re-identification accuracy, 360-degree LiDAR-camera fusion cutting collision risk by 70%, under 200 ms audio feedback latency, 60% better independent mobility [CONFIRM he can explain how each was measured].
3. **Daftar (multi-agent workplace simulation).** Category: agent systems. Built at AICON'26 Build With AI by team nexora. A fresh graduate does a "first shift" with an AI-generated team (CEO, manager, senior, peer, client), each with private knowledge. Hidden tests run in the browser, a QA bot files bugs, and an AI reviewer grades six workplace skills quoting the graduate's own messages. Stack: Gemini, Next.js, Vercel. Live https://trydaftar.vercel.app, repo github.com/Abdul-Samad-17/daftar. Abdul's role: [CONFIRM, default "contributor on team nexora"].
4. **Capital Play (sports ground booking platform).** Category: full-stack products. React, Express, Node.js, MySQL, Socket.io; 3 role dashboards (Player, Owner, Admin); real-time slots, live messaging, a background "Ghost Engine" that generates and releases slots, a recursive promotion engine. CV claims: owners manage bookings 50% more efficiently, 3x ground utilization, bookings 5x faster. Live https://capital--play.vercel.app, repo github.com/Abdul-Samad-17/Capital_Play.

## Built and shipped (live demo + screenshots; Abdul supplies screenshots)
- Daftar, Capital Play, RideFlow (full-stack ride hailing, MySQL stored procedures, triggers, views, atomic wallet payments, Google Maps; DB systems lab project; live https://ride--flow.vercel.app, repo github.com/Abdul-Samad-17/Ride-Flow).
- DeskSide [CONFIRM: only if it has a live URL; repo is private, so no Source button].

## Also built (repo only)
AI-ML-Automation-Tools (5 AI projects: FAQ chatbot, email classifier, document QA, RAG chatbot, FastAPI workflow automation), CineGraphX (zero-STL C++ movie engine on 5,000 IMDb movies, AVL trees and graphs, 5x faster search than a linear scan), FlyRank-Internship, GridLock Rush (x86 Assembly game). "Explore more repositories" goes to github.com/Abdul-Samad-17.

## Skills (four cards)
- AI / ML: Python, PyTorch, scikit-learn, YOLOv8, OpenCV, NumPy, Pandas, Seaborn, CLIP
- Web: React, Node.js, Express, MongoDB, REST APIs, Socket.io, Tailwind CSS, Next.js
- Robotics and CV: ROS2, sensor fusion, DeepSORT, Gazebo, RPLIDAR, C++, Assembly
- Tools and databases: Git, GitHub, Postman, Vercel, MySQL, PostgreSQL, DuckDB
