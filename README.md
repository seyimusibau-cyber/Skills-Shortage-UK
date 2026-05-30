# 🧠 North East UK Tech Skills Shortage Dashboard

> An interactive data analytics dashboard visualising the technology skills gap in the North East United Kingdom — built with **Next.js** and custom SVG charts.

[![Live Demo](https://img.shields.io/badge/Live-Vercel-black?logo=vercel)](https://skills-shortage-uk.vercel.app)

---

## 📌 Overview

This project analyses and visualises the current state of the technology skills shortage across major job roles in the North East UK (Newcastle, Sunderland & Durham). It provides:

- A real-time interactive **analytics dashboard** with custom SVG charts
- A **10-strategy guide** with actionable recommendations to bridge the talent gap
- Clean, responsive design with dark mode and micro-animations

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **Grouped Bar Chart** | Current vs Required workforce by tech role |
| 📉 **Horizontal Gap Chart** | Shortfall percentage with severity colour-coding |
| 🔵 **Bubble Scatter Chart** | Avg Salary vs Days-to-Hire, bubble = shortfall volume |
| 🔍 **Filterable Data Table** | Full telemetry data with search and sort |
| 📋 **Strategy Viewer** | 10 actionable strategies with icons |
| 📤 **CSV Export** | Download the full dataset as CSV |
| 📱 **Responsive Layout** | Mobile-friendly with collapsible sidebar |

---

## 🗂️ Project Structure

```
Skills Shortage UK/
├── app/
│   ├── page.js               # Main dashboard & strategy UI (Next.js Client Component)
│   ├── layout.js             # Root layout with metadata
│   ├── globals.css           # Global styles & CSS variables
│   └── dashboard.module.css  # Component-scoped CSS module
├── data/
│   ├── skills_data.json      # Primary dataset (10 tech roles)
│   └── northeast_tech_skills_data.csv  # CSV version of the dataset
├── next.config.mjs           # Next.js configuration
├── package.json
├── vercel.json               # Vercel deployment config
└── render.yaml               # Render deployment config
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation & Local Dev

```bash
# Clone the repo
git clone https://github.com/seyimusibau-cyber/Skills-Shortage-UK.git
cd "Skills Shortage UK"

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Data

The dataset (`data/skills_data.json`) is synthetically generated to reflect real-world trends in the North East UK tech labour market.

**Roles covered:**
- Software Engineer
- Data Scientist
- Cybersecurity Analyst
- Cloud Architect
- DevOps Engineer
- IT Support Specialist
- Network Engineer
- UX/UI Designer
- Project Manager (Tech)
- AI/Machine Learning Engineer

**Fields per role:** `Current_Workforce`, `Required_Workforce`, `Average_Days_to_Hire`, `Skill_Gap_Severity`, `Average_Salary_GBP`, `Remote_Work_Percentage`

---

## 🔟 10 Strategies to Manage the Skills Shortage

1. Invest in Internal Upskilling and Reskilling
2. Develop Strong Local Apprenticeship Programs
3. Collaborate with Regional Universities (Newcastle, Durham)
4. Embrace Flexible and Remote Working
5. Broaden Recruitment Criteria (skills-based hiring)
6. Utilize Regional Support Networks (North East Growth Hub)
7. Improve Employer Branding and Workplace Culture
8. Foster Diversity and Inclusion in Tech
9. Engage in Strategic Outsourcing and Partnerships
10. Implement AI and Automation Tools

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** CSS Modules + Vanilla CSS
- **Charts:** Custom SVG (no chart library dependencies)
- **Icons:** Lucide React
- **Deployment:** Vercel / Render

---

## 📄 Licence

MIT © Seyi Musibau
