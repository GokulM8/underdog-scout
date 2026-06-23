# 🌍 Underdog Scout — FIFA World Cup 2026

> AI-powered companion spotlighting the 6 debut & underdog nations at FIFA World Cup 2026 that mainstream media ignores.

**Live Demo:** https://underdog-scout.vercel.app
**GitHub:** https://github.com/GokulM8/underdog-scout
**Built for:** IBM SkillsBuild AI Builders Challenge — June 2026 (FIFA World Cup Theme)

---

## 🏆 The Problem

48 teams. 6 debut nations. Zero mainstream coverage.

When FIFA World Cup 2026 expanded to 48 teams for the first time in history, six nations qualified that the world had never seen at a World Cup before — Curaçao (population 156,000), Cape Verde, Jordan, Uzbekistan, Haiti (returning after 52 years), and Scotland (returning after 28 years). Every sports network, every AI tool, every fan app focuses on Brazil, France, and Argentina.

**Underdog Scout exists for the nations nobody covers.**

---

## 💡 Solution

A full-stack AI-powered web application that gives debut and underdog nations the spotlight they deserve — with live scores, AI match predictions, tactical briefs, hidden player discovery, upset detection, and downloadable PDF scout reports powered by IBM Docling.

---

## 🔧 IBM Tool Integration — IBM Docling

**IBM Docling** is used to generate downloadable **PDF Scout Reports** for each underdog nation.

When a user clicks "Download Scout Report" on any team page, IBM Docling converts the structured match prediction and nation data into a professionally formatted PDF document containing:
- Nation overview and group information
- Road to 2026 qualification timeline
- Squad summary
- AI-generated match insights
- Underdog Power Index score

```bash
pip install docling
```

Flow:
```
User clicks Download Scout Report
→ /api/generate-report
→ IBM Docling formats nation data + prediction + timeline
→ Returns downloadable PDF file
```

Label in UI: **"Scout Report · IBM Docling"**

---

## 🤖 AI & Tech Stack

| Layer | Technology |
|---|---|
| Match Predictions | Groq API — llama-3.3-70b-versatile |
| Nation Briefs | Groq API — llama-3.3-70b-versatile |
| Hidden Hero Finder | Groq API — llama-3.3-70b-versatile |
| PDF Scout Reports | IBM Docling |
| Live Scores | football-data.org API |
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + Bebas Neue + Inter |
| Database | Supabase |
| Deployment | Vercel |

---

## 🎯 Features

### 1. Underdog Power Index
A custom metric we invented — ranks all 6 underdog nations on a 0-100 scale based on:
- Population size (smaller = higher score)
- FIFA ranking
- Qualification difficulty
- Squad average age

No other platform has this metric.

### 2. AI Match Predictor
Select any two teams → Groq's Llama 3.3 70B analyzes historical records, squad quality, tactical style, and World Cup 2026 form to generate:
- Predicted scoreline
- Win / Draw / Loss probabilities with animated bars
- 3-sentence match narrative
- Head-to-head historical record

### 3. Hidden Hero Finder
Groq surfaces 3 unknown players from each nation that most fans have never heard of:
- Rising stars
- Domestic league gems
- Breakout World Cup candidates

Each player gets a badge (MVP / Rising Star / Breakout Pick), stats, and a 2-sentence AI description.

### 4. AI Nation Brief
Full tactical breakdown for any underdog nation powered by Groq:
- Team overview and playing style
- 4 key strengths
- 4 key weaknesses
- Qualification journey summary
- Chances of advancing from the group stage

### 5. Upset Alarm
Live feed automatically detects when an underdog is leading or drawing against a stronger nation and fires a red UPSET ALERT banner with slide-in animation and pulsing effects.

### 6. Match Atmosphere Meter
A dynamic crowd energy gauge (0-100) calculated from match situation in real time:
- Underdog leading in 89th minute = 🚨 CHAOS (pulsing red bar)
- Underdog drawing = 🔥 Electric
- Normal match = 👏 Building

### 7. Nation Story Cards + IBM Docling PDF
Each nation gets a cinematic "Road to 2026" qualification timeline with key historical moments, downloadable as a formatted PDF via IBM Docling.

### 8. Live Animated Scoreboard
- Scrolling live ticker with real match data
- 30-second auto-refresh countdown bar
- Score flip animations on update
- DEBUT and RETURN badges on underdog matches
- Filter by: All, Live Now, Underdogs, Completed, Upcoming

---

## 📱 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | 6 nation cards + player collages + Power Index |
| Predictor | `/predictor` | AI match prediction + head-to-head |
| Live Feed | `/live` | Animated live scores + upset detection |
| Scoreboard | `/scoreboard` | Full tournament scoreboard |
| Nation Brief | `/brief` | AI tactical brief for any underdog nation |
| Team Detail | `/team/[slug]` | Squad, fixtures, Hidden Heroes, Scout Report PDF |

---

## 🌍 The 6 Nations We Cover

| Nation | Confederation | Status | Population |
|---|---|---|---|
| 🇨🇼 Curaçao | CONCACAF | World Cup Debut | 156,000 |
| 🇨🇻 Cape Verde | CAF | World Cup Debut | 600,000 |
| 🇯🇴 Jordan | AFC | World Cup Debut | 11.3M |
| 🇺🇿 Uzbekistan | AFC | World Cup Debut | 35.2M |
| 🇭🇹 Haiti | CONCACAF | Return after 52 years | 11.7M |
| 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland | UEFA | Return after 28 years | 5.5M |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+ (for IBM Docling)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/GokulM8/underdog-scout.git
cd underdog-scout

# Install Node dependencies
npm install

# Install IBM Docling
pip install docling

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

```env
GROQ_API_KEY=your_groq_api_key
FOOTBALL_DATA_API_KEY=your_football_data_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📊 Why This Matters

Curaçao is the smallest nation by population ever to qualify for a FIFA World Cup. That story deserves to be told. Underdog Scout uses AI not just as a feature, but as a storytelling tool — surfacing the human narratives, tactical insights, and historical context that turns a scoreline into a moment.

The 2026 World Cup is the first with 48 teams. Six of those teams are making history just by being there. Underdog Scout makes sure the world notices.

---

## 🏅 Challenge Alignment

**IBM Tool Used:** IBM Docling — PDF scout report generation
**Challenge Theme:** FIFA World Cup 2026
**Problem Solved:** Zero AI coverage for debut and underdog nations at the most expanded World Cup in history
**Real-world relevance:** Sports media, fan engagement, AI storytelling

---

## 👥 Team

**Gokul Mallabathula** — VIT-AP University, India
GitHub: [@GokulM8](https://github.com/GokulM8)
LinkedIn: [linkedin.com/in/gokul-mallabathula-693a74118](https://linkedin.com/in/gokul-mallabathula-693a74118)

---

## 📄 Disclaimer

Squad and player data shown is illustrative sample data. Live match scores are sourced from football-data.org. AI predictions and insights are generated by Groq and are for entertainment purposes only.

---

*Built with ❤️ for the IBM SkillsBuild AI Builders Challenge — June 2026*
