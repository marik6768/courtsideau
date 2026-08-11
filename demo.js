/**
 * COURTSIDE — Demo Data
 * Marked as DEMO. Replace with real / Supabase data later.
 */

const DEMO = {
  season: "2025-26",

  forecasts: [
    {
      category: "MVP",
      player: "Nikola Jokić",
      team: "DEN",
      confidence: 72,
      explanation: "Dominant all-around production, elite efficiency and consistent winning impact. Continues to set the standard for two-way value at center."
    },
    {
      category: "DPOY",
      player: "Victor Wembanyama",
      team: "SAS",
      confidence: 61,
      explanation: "Rim protection and perimeter versatility at an unprecedented level. Defensive gravity changes every possession."
    },
    {
      category: "ROY",
      player: "Cooper Flagg",
      team: "DAL",
      confidence: 58,
      explanation: "Early returns show high-floor two-way play and rapid adaptation to NBA pace and physicality."
    },
    {
      category: "MIP",
      player: "Amen Thompson",
      team: "HOU",
      confidence: 54,
      explanation: "Expanded offensive role and improved decision-making have elevated his overall impact significantly."
    },
    {
      category: "Champion",
      player: "Oklahoma City Thunder",
      team: "OKC",
      confidence: 38,
      explanation: "Depth, defense and star development form the strongest contender profile entering the season."
    }
  ],

  top100: [
    { rank: 1, player: "Nikola Jokić", team: "DEN", pos: "C", pts: 27.1, reb: 12.9, ast: 10.2, efficiency: 68.4, gi: 98.2, change: 0 },
    { rank: 2, player: "Shai Gilgeous-Alexander", team: "OKC", pos: "G", pts: 31.4, reb: 5.1, ast: 6.4, efficiency: 62.1, gi: 96.8, change: 1 },
    { rank: 3, player: "Giannis Antetokounmpo", team: "MIL", pos: "F", pts: 30.2, reb: 11.8, ast: 6.1, efficiency: 64.3, gi: 95.5, change: -1 },
    { rank: 4, player: "Luka Dončić", team: "LAL", pos: "G", pts: 28.9, reb: 8.4, ast: 9.1, efficiency: 58.7, gi: 94.1, change: 0 },
    { rank: 5, player: "Jayson Tatum", team: "BOS", pos: "F", pts: 27.3, reb: 8.2, ast: 5.4, efficiency: 59.2, gi: 91.7, change: 2 },
    { rank: 6, player: "Anthony Edwards", team: "MIN", pos: "G", pts: 26.8, reb: 5.6, ast: 5.1, efficiency: 57.9, gi: 90.4, change: 3 },
    { rank: 7, player: "Joel Embiid", team: "PHI", pos: "C", pts: 29.5, reb: 10.9, ast: 4.2, efficiency: 61.8, gi: 89.6, change: -2 },
    { rank: 8, player: "Kevin Durant", team: "PHX", pos: "F", pts: 27.8, reb: 6.4, ast: 4.8, efficiency: 62.5, gi: 88.9, change: 0 },
    { rank: 9, player: "Stephen Curry", team: "GSW", pos: "G", pts: 25.1, reb: 4.5, ast: 5.9, efficiency: 60.3, gi: 87.2, change: -1 },
    { rank: 10, player: "Victor Wembanyama", team: "SAS", pos: "C", pts: 22.4, reb: 11.2, ast: 3.8, efficiency: 58.1, gi: 86.5, change: 4 },
    { rank: 11, player: "Donovan Mitchell", team: "CLE", pos: "G", pts: 26.2, reb: 4.8, ast: 5.3, efficiency: 57.4, gi: 84.8, change: 1 },
    { rank: 12, player: "LeBron James", team: "LAL", pos: "F", pts: 24.3, reb: 7.5, ast: 8.1, efficiency: 58.9, gi: 84.1, change: -3 },
    { rank: 13, player: "Kawhi Leonard", team: "LAC", pos: "F", pts: 24.9, reb: 6.2, ast: 3.9, efficiency: 61.2, gi: 83.6, change: 0 },
    { rank: 14, player: "Jaylen Brown", team: "BOS", pos: "G-F", pts: 24.1, reb: 5.8, ast: 4.2, efficiency: 56.8, gi: 82.4, change: 2 },
    { rank: 15, player: "Tyrese Haliburton", team: "IND", pos: "G", pts: 20.8, reb: 4.1, ast: 10.9, efficiency: 59.7, gi: 81.9, change: -1 },

    { rank: 16, player: "Devin Booker", team: "PHX", pos: "G", pts: 26.1, reb: 4.6, ast: 7.2, efficiency: 58.3, gi: 81.2, change: 1 },
    { rank: 17, player: "Anthony Davis", team: "DAL", pos: "F-C", pts: 24.8, reb: 11.4, ast: 3.4, efficiency: 60.1, gi: 80.7, change: -2 },
    { rank: 18, player: "Jalen Brunson", team: "NYK", pos: "G", pts: 26.4, reb: 3.5, ast: 6.8, efficiency: 57.2, gi: 80.1, change: 2 },
    { rank: 19, player: "Karl-Anthony Towns", team: "NYK", pos: "C", pts: 23.9, reb: 12.1, ast: 2.9, efficiency: 61.4, gi: 79.4, change: 0 },
    { rank: 20, player: "Paolo Banchero", team: "ORL", pos: "F", pts: 23.5, reb: 7.4, ast: 5.1, efficiency: 54.8, gi: 78.6, change: 3 },
    { rank: 21, player: "Cade Cunningham", team: "DET", pos: "G", pts: 23.1, reb: 5.2, ast: 8.4, efficiency: 55.9, gi: 78.0, change: 4 },
    { rank: 22, player: "Tyrese Maxey", team: "PHI", pos: "G", pts: 25.2, reb: 3.4, ast: 5.8, efficiency: 56.6, gi: 77.3, change: 1 },
    { rank: 23, player: "Ja Morant", team: "MEM", pos: "G", pts: 24.6, reb: 5.1, ast: 7.9, efficiency: 55.1, gi: 76.8, change: -1 },
    { rank: 24, player: "Zion Williamson", team: "NOP", pos: "F", pts: 24.3, reb: 6.8, ast: 4.6, efficiency: 62.0, gi: 76.2, change: 0 },
    { rank: 25, player: "Bam Adebayo", team: "MIA", pos: "C", pts: 18.4, reb: 10.2, ast: 4.1, efficiency: 57.8, gi: 75.5, change: -2 },
  ],

  goat: [
    {
      rank: 1,
      player: "Michael Jordan",
      gi: 99.4,
      peak: 99,
      longevity: 92,
      winning: 98,
      playoff: 99,
      era: 97,
      explanation: "Highest peak combined with sustained dominance and six championships. The definitive standard for two-way excellence and winning."
    },
    {
      rank: 2,
      player: "LeBron James",
      gi: 97.8,
      peak: 96,
      longevity: 99,
      winning: 94,
      playoff: 96,
      era: 95,
      explanation: "Unmatched longevity at an elite level, four titles across three franchises, and all-time production. Closest challenger to the peak standard."
    },
    {
      rank: 3,
      player: "Kareem Abdul-Jabbar",
      gi: 96.1,
      peak: 94,
      longevity: 98,
      winning: 96,
      playoff: 93,
      era: 94,
      explanation: "Scoring champion across eras, six MVPs, six titles. Longevity and consistency at the highest level for nearly two decades."
    },
    {
      rank: 4,
      player: "Bill Russell",
      gi: 94.7,
      peak: 93,
      longevity: 88,
      winning: 100,
      playoff: 99,
      era: 92,
      explanation: "Eleven championships as the anchor of the greatest dynasty. Defensive and winning impact that redefined the sport."
    },
    {
      rank: 5,
      player: "Tim Duncan",
      gi: 93.2,
      peak: 91,
      longevity: 95,
      winning: 97,
      playoff: 95,
      era: 93,
      explanation: "Five titles, fundamental excellence, and sustained two-way dominance. The model of winning without spectacle."
    },
    {
      rank: 6,
      player: "Magic Johnson",
      gi: 92.4,
      peak: 95,
      longevity: 84,
      winning: 96,
      playoff: 96,
      era: 94,
      explanation: "Revolutionary playmaking and five championships. Peak value as the engine of Showtime remains unmatched for point guards."
    },
    {
      rank: 7,
      player: "Larry Bird",
      gi: 91.8,
      peak: 94,
      longevity: 82,
      winning: 93,
      playoff: 94,
      era: 93,
      explanation: "Three consecutive MVPs, three titles, and elite two-way impact. Peak competitiveness and skill in a stacked era."
    },
    {
      rank: 8,
      player: "Kobe Bryant",
      gi: 90.9,
      peak: 93,
      longevity: 91,
      winning: 94,
      playoff: 93,
      era: 92,
      explanation: "Five championships, transcendent scoring skill and competitiveness. Longevity at a high level with multiple peaks."
    },
    {
      rank: 9,
      player: "Shaquille O'Neal",
      gi: 89.6,
      peak: 96,
      longevity: 86,
      winning: 93,
      playoff: 94,
      era: 91,
      explanation: "Most dominant physical peak in modern history. Three-peat and Finals dominance defined an era of interior play."
    },
    {
      rank: 10,
      player: "Hakeem Olajuwon",
      gi: 88.7,
      peak: 94,
      longevity: 89,
      winning: 90,
      playoff: 95,
      era: 90,
      explanation: "Two titles, defensive player of the year, and unmatched footwork and skill for a center. Peak two-way value is elite."
    }
  ],

  giComponents: [
    { name: "Production", weight: "25%", desc: "Scoring, rebounding, playmaking and overall output." },
    { name: "Efficiency", weight: "20%", desc: "True shooting, turnover rate and shot selection quality." },
    { name: "Creation", weight: "15%", desc: "Ability to generate advantages for self and teammates." },
    { name: "Defense", weight: "15%", desc: "On-ball, help, rim protection and defensive impact metrics." },
    { name: "Consistency", weight: "10%", desc: "Stability of performance across games and months." },
    { name: "Winning", weight: "15%", desc: "Contribution to team success, win shares and on/off impact." }
  ],

  news: [
    {
      id: 1,
      category: "ANALYSIS",
      title: "Why Jokić’s Creation Numbers Still Set the Standard",
      excerpt: "A closer look at the passing gravity and second-side advantages that continue to separate the reigning MVP candidate.",
      date: "2026-08-05",
      image: null
    },
    {
      id: 2,
      category: "GI",
      title: "Understanding the GOAT Index: Context Over Counting Stats",
      excerpt: "How COURTSIDE weighs era, role and winning impact when building the historical ranking.",
      date: "2026-08-01",
      image: null
    },
    {
      id: 3,
      category: "FORECAST",
      title: "Early Season MVP Landscape: Three Clear Tiers",
      excerpt: "Separating the realistic contenders from the long shots before training camp narratives take over.",
      date: "2026-07-28",
      image: null
    }
  ],

  siteContent: {
    hero_title_1: "NBA.",
    hero_title_2: "Facts.",
    hero_title_3: "Context.",
    hero_desc: "COURTSIDE collects statistics, rankings, forecasts and player history in one place. Numbers first. Then conclusions.",
    gi_intro: "GI is COURTSIDE’s proprietary scale for comparing players across seasons and eras. It is not official NBA statistics."
  }
};

if (typeof window !== "undefined") {
  window.COURTSIDE_DEMO = DEMO;
}
