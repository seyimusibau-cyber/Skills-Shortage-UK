"use client";

import { useState } from "react";
import { 
  LayoutDashboard, 
  BookOpen, 
  Menu, 
  X, 
  TrendingUp, 
  GraduationCap, 
  Award, 
  School, 
  Laptop, 
  UserCheck, 
  Users, 
  Heart, 
  HeartHandshake, 
  Handshake, 
  Cpu,
  Info,
  DollarSign,
  Clock,
  Briefcase,
  MapPin
} from "lucide-react";
import rawData from "@/data/skills_data.json";
import styles from "./dashboard.module.css";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard or strategies
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: null });

  // Calculate metrics
  const totalCurrent = rawData.reduce((sum, item) => sum + item.Current_Workforce, 0);
  const totalRequired = rawData.reduce((sum, item) => sum + item.Required_Workforce, 0);
  const totalShortfall = totalRequired - totalCurrent;
  const overallShortfallPercent = (totalShortfall / totalRequired) * 100;

  // Process data for charts
  const processedData = rawData.map(item => {
    const shortfall = item.Required_Workforce - item.Current_Workforce;
    const shortfallPercent = (shortfall / item.Required_Workforce) * 100;
    return {
      ...item,
      Shortfall: shortfall,
      ShortfallPercent: shortfallPercent
    };
  });

  // Sort by shortfall percentage for the horizontal chart
  const sortedByShortfall = [...processedData].sort((a, b) => a.ShortfallPercent - b.ShortfallPercent);

  // Strategy list with matching icons
  const strategies = [
    {
      title: "1. Invest in Internal Upskilling and Reskilling",
      desc: "Prioritize training programs for existing employees to learn high-demand skills like AI, cloud computing, and cybersecurity. This builds loyalty and fills gaps without external hiring.",
      icon: <GraduationCap size={20} />
    },
    {
      title: "2. Develop Strong Local Apprenticeship Programs",
      desc: "Partner with North East educational institutions to create tech apprenticeships, providing hands-on experience and a direct pipeline of junior talent tailored to your company's needs.",
      icon: <Award size={20} />
    },
    {
      title: "3. Collaborate with Regional Universities",
      desc: "Engage with Newcastle University, Durham University, and other local institutions through guest lectures, hackathons, and graduate placement programs to secure emerging talent early.",
      icon: <School size={20} />
    },
    {
      title: "4. Embrace Flexible and Remote Working",
      desc: "While focusing on the North East, offering hybrid or fully remote roles allows you to tap into talent pools beyond immediate commuting distances, increasing candidate volume.",
      icon: <Laptop size={20} />
    },
    {
      title: "5. Broaden Recruitment Criteria",
      desc: "Shift focus from strict degree requirements to skills-based hiring. Look for candidates with transferable skills and a strong aptitude for learning, expanding the available talent pool.",
      icon: <UserCheck size={20} />
    },
    {
      title: "6. Utilize Regional Support Networks",
      desc: "Tap into resources like the North East Growth Hub and Tech Talent Engine to connect with job seekers and leverage government-backed skills development initiatives.",
      icon: <Users size={20} />
    },
    {
      title: "7. Improve Employer Branding and Workplace Culture",
      desc: "In a competitive market, a strong culture, competitive benefits, and clear career progression pathways are essential to attract and retain top tech professionals.",
      icon: <Heart size={20} />
    },
    {
      title: "8. Foster Diversity and Inclusion in Tech",
      desc: "Actively recruit from underrepresented groups in the tech sector. Creating an inclusive environment not only widens the talent pool but also drives innovation.",
      icon: <HeartHandshake size={20} />
    },
    {
      title: "9. Engage in Strategic Outsourcing and Partnerships",
      desc: "For highly specialized or short-term projects, partner with specialized North East tech agencies or freelancers to manage workloads without the need for full-time hires.",
      icon: <Handshake size={20} />
    },
    {
      title: "10. Implement AI and Automation Tools",
      desc: "Adopt productivity-enhancing tools (like AI coding assistants) to increase the output of your existing team, effectively reducing the raw number of new hires needed.",
      icon: <Cpu size={20} />
    }
  ];

  // Tooltip handler for SVG charts
  const showTooltip = (e, content) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    
    // Position tooltip relative to SVG container
    const x = rect.left - parentRect.left + rect.width / 2;
    const y = rect.top - parentRect.top - 10;
    
    setTooltip({
      visible: true,
      x,
      y,
      content
    });
  };

  const hideTooltip = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div className={styles.appContainer}>
      {/* Mobile Topbar */}
      <div className={styles.mobileTopbar}>
        <div className={styles.logoHeader}>
          <span className={styles.logoTitle}>NE Tech Skills</span>
        </div>
        <button 
          className={styles.mobileMenuBtn} 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle navigation menu"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoIcon}>
            <TrendingUp size={28} />
          </div>
          <span className={styles.logoTitle}>NE Tech Skills</span>
        </div>

        <nav className={styles.navSection}>
          <button 
            className={`${styles.navButton} ${activeTab === "dashboard" ? styles.navButtonActive : ""}`}
            onClick={() => {
              setActiveTab("dashboard");
              setIsSidebarOpen(false);
            }}
          >
            <LayoutDashboard size={18} />
            Dashboard & Analytics
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === "strategies" ? styles.navButtonActive : ""}`}
            onClick={() => {
              setActiveTab("strategies");
              setIsSidebarOpen(false);
            }}
          >
            <BookOpen size={18} />
            10 Ways to Manage Gap
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.aboutTitle}>About Project</div>
          <p className={styles.aboutText}>
            An exploratory data analysis and strategy guide focusing on the technology skills shortage in the North East region of the United Kingdom.
          </p>
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.25rem", color: "var(--text-muted)", fontSize: "0.75rem", alignItems: "center" }}>
            <MapPin size={12} /> Newcastle, Sunderland & Durham
          </div>
        </div>
      </aside>

      {/* Main Page Area */}
      <main className={styles.mainContent}>
        {activeTab === "dashboard" ? (
          <div className="animate-fade-in">
            {/* Header */}
            <div className={styles.headerContainer}>
              <h1 className={styles.pageTitle}>North East UK Tech Skills Shortage</h1>
              <p className={styles.pageSubtitle}>
                Explore real-time simulated telemetry representing the current state and shortage of the tech workforce in the North East.
              </p>
            </div>

            {/* Metrics cards */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricIconContainer}>
                  <Users size={24} />
                </div>
                <div className={styles.metricDetails}>
                  <span className={styles.metricLabel}>Current Tech Workforce</span>
                  <span className={styles.metricVal}>{totalCurrent.toLocaleString()}</span>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIconContainer + " " + styles.metricIconContainerPurple}>
                  <Briefcase size={24} />
                </div>
                <div className={styles.metricDetails}>
                  <span className={styles.metricLabel}>Required Tech Workforce</span>
                  <span className={styles.metricVal}>{totalRequired.toLocaleString()}</span>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIconContainer + " " + styles.metricIconContainerRed}>
                  <TrendingUp size={24} />
                </div>
                <div className={styles.metricDetails}>
                  <span className={styles.metricLabel}>Total Regional Shortfall</span>
                  <span className={styles.metricVal}>
                    {totalShortfall.toLocaleString()}
                    <span className={styles.metricDelta} style={{ display: "inline-flex", marginLeft: "0.5rem" }}>
                      -{overallShortfallPercent.toFixed(1)}%
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className={styles.chartsGrid}>
              
              {/* Grouped Bar Chart (Custom SVG) */}
              <div className={styles.chartCard}>
                <h3 className={styles.chartTitle}>
                  Current vs Required Workforce by Role
                  <div className={styles.legend}>
                    <div className={styles.legendItem}>
                      <div className={styles.legendColor} style={{ backgroundColor: "#3b82f6" }}></div>
                      <span>Current</span>
                    </div>
                    <div className={styles.legendItem}>
                      <div className={styles.legendColor} style={{ backgroundColor: "#1e3a8a", border: "1px solid rgba(59, 130, 246, 0.4)" }}></div>
                      <span>Required</span>
                    </div>
                  </div>
                </h3>
                
                <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
                  <svg 
                    viewBox="0 0 800 350" 
                    className={styles.svgWorkspace}
                    style={{ width: "100%", height: "290px", overflow: "visible" }}
                  >
                    {/* Y-axis gridlines & labels */}
                    {[0, 600, 1200, 1800, 2400].map((val, idx) => {
                      const y = 280 - (val / 2400) * 250;
                      return (
                        <g key={val} opacity={0.85}>
                          <line 
                            x1="50" 
                            y1={y} 
                            x2="780" 
                            y2={y} 
                            stroke="rgba(255,255,255,0.06)" 
                            strokeWidth="1" 
                          />
                          <text 
                            x="40" 
                            y={y + 4} 
                            fill="var(--text-muted)" 
                            fontSize="11" 
                            textAnchor="end"
                          >
                            {val}
                          </text>
                        </g>
                      );
                    })}

                    {/* Bars */}
                    {processedData.map((item, idx) => {
                      const groupWidth = 60;
                      const groupGap = 12;
                      const xStart = 65 + idx * (groupWidth + groupGap);
                      
                      const barWidth = 22;
                      
                      // Max value on Y is 2400
                      const currHeight = (item.Current_Workforce / 2400) * 250;
                      const reqHeight = (item.Required_Workforce / 2400) * 250;
                      
                      const yCurr = 280 - currHeight;
                      const yReq = 280 - reqHeight;

                      return (
                        <g key={item.Role} className={styles.barGroup}>
                          {/* Current Workforce Bar */}
                          <rect
                            x={xStart}
                            y={yCurr}
                            width={barWidth}
                            height={currHeight}
                            rx="3"
                            fill="#3b82f6"
                            className={styles.bar}
                            onMouseEnter={(e) => showTooltip(e, (
                              <div>
                                <div className={styles.tooltipTitle}>{item.Role}</div>
                                <div className={styles.tooltipItem}>
                                  <span className={styles.tooltipItemLabel}>Workforce Type:</span>
                                  <span className={styles.tooltipItemValue} style={{ color: "#3b82f6" }}>Current</span>
                                </div>
                                <div className={styles.tooltipItem}>
                                  <span className={styles.tooltipItemLabel}>Staff Count:</span>
                                  <span className={styles.tooltipItemValue}>{item.Current_Workforce.toLocaleString()}</span>
                                </div>
                              </div>
                            ))}
                            onMouseLeave={hideTooltip}
                          />

                          {/* Required Workforce Bar */}
                          <rect
                            x={xStart + barWidth + 4}
                            y={yReq}
                            width={barWidth}
                            height={reqHeight}
                            rx="3"
                            fill="#1e3a8a"
                            stroke="rgba(59, 130, 246, 0.4)"
                            strokeWidth="1"
                            className={styles.bar}
                            onMouseEnter={(e) => showTooltip(e, (
                              <div>
                                <div className={styles.tooltipTitle}>{item.Role}</div>
                                <div className={styles.tooltipItem}>
                                  <span className={styles.tooltipItemLabel}>Workforce Type:</span>
                                  <span className={styles.tooltipItemValue} style={{ color: "#60a5fa" }}>Required</span>
                                </div>
                                <div className={styles.tooltipItem}>
                                  <span className={styles.tooltipItemLabel}>Staff Count:</span>
                                  <span className={styles.tooltipItemValue}>{item.Required_Workforce.toLocaleString()}</span>
                                </div>
                              </div>
                            ))}
                            onMouseLeave={hideTooltip}
                          />

                          {/* X-axis Label (Rotated) */}
                          <text
                            x={xStart + barWidth + 2}
                            y="300"
                            fill="var(--text-secondary)"
                            fontSize="10"
                            fontWeight="500"
                            textAnchor="end"
                            transform={`rotate(-25, ${xStart + barWidth + 2}, 300)`}
                          >
                            {item.Role.length > 15 ? item.Role.substring(0, 14) + "..." : item.Role}
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Baseline */}
                    <line x1="50" y1="280" x2="780" y2="280" stroke="var(--border-color)" strokeWidth="1.5" />
                  </svg>

                  {/* Absolute Tooltip Container */}
                  {tooltip.visible && (
                    <div 
                      className={`${styles.customTooltip} ${styles.customTooltipVisible}`}
                      style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px`, transform: "translate(-50%, -100%)" }}
                    >
                      {tooltip.content}
                    </div>
                  )}
                </div>
              </div>

              {/* Horizontal Bar Chart (Shortfall Percentage) */}
              <div className={styles.chartCard}>
                <h3 className={styles.chartTitle}>
                  Shortfall Percentage by Role
                  <div className={styles.legend}>
                    <div className={styles.legendItem}>
                      <div className={styles.legendColor} style={{ backgroundColor: "var(--status-high)" }}></div>
                      <span>High Gap</span>
                    </div>
                    <div className={styles.legendItem}>
                      <div className={styles.legendColor} style={{ backgroundColor: "var(--status-medium)" }}></div>
                      <span>Medium Gap</span>
                    </div>
                    <div className={styles.legendItem}>
                      <div className={styles.legendColor} style={{ backgroundColor: "var(--status-low)" }}></div>
                      <span>Low Gap</span>
                    </div>
                  </div>
                </h3>
                
                <div className={styles.horizontalBarChart}>
                  {sortedByShortfall.map((item) => {
                    const fillClass = 
                      item.Skill_Gap_Severity === "High" ? styles.fillHigh :
                      item.Skill_Gap_Severity === "Medium" ? styles.fillMedium : styles.fillLow;
                    
                    return (
                      <div key={item.Role} className={styles.horizontalRow}>
                        <div className={styles.rowMeta}>
                          <span className={styles.rowLabel}>{item.Role}</span>
                          <span className={styles.rowVal}>{item.ShortfallPercent.toFixed(1)}%</span>
                        </div>
                        <div className={styles.progressBarTrack}>
                          <div 
                            className={`${styles.progressBarFill} ${fillClass}`} 
                            style={{ width: `${item.ShortfallPercent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Scatter Plot Chart (Custom SVG Bubble Chart) */}
              <div className={styles.chartCard} style={{ gridColumn: "span 2" }}>
                <h3 className={styles.chartTitle}>
                  Average Days to Hire vs. Average Salary
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "normal" }}>
                    *Bubble size indicates regional workforce shortfall volume
                  </span>
                </h3>
                
                <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
                  <svg 
                    viewBox="0 0 1000 350" 
                    className={styles.svgWorkspace}
                    style={{ width: "100%", height: "290px", overflow: "visible" }}
                  >
                    {/* Y Axis Gridlines (Days to Hire, range 0 to 80) */}
                    {[0, 20, 40, 60, 80].map((days) => {
                      const y = 280 - (days / 80) * 240;
                      return (
                        <g key={days} opacity={0.85}>
                          <line 
                            x1="60" 
                            y1={y} 
                            x2="980" 
                            y2={y} 
                            stroke="rgba(255,255,255,0.06)" 
                            strokeWidth="1" 
                          />
                          <text 
                            x="50" 
                            y={y + 4} 
                            fill="var(--text-muted)" 
                            fontSize="11" 
                            textAnchor="end"
                          >
                            {days} days
                          </text>
                        </g>
                      );
                    })}

                    {/* X Axis Gridlines (Salary, range 20k to 70k) */}
                    {[20000, 30000, 40000, 50000, 60000, 70000].map((salary) => {
                      const x = 60 + ((salary - 20000) / 50000) * 900;
                      return (
                        <g key={salary} opacity={0.85}>
                          <line 
                            x1={x} 
                            y1="40" 
                            x2={x} 
                            y2="280" 
                            stroke="rgba(255,255,255,0.06)" 
                            strokeWidth="1" 
                          />
                          <text 
                            x={x} 
                            y="300" 
                            fill="var(--text-muted)" 
                            fontSize="11" 
                            textAnchor="middle"
                          >
                            £{(salary / 1000)}k
                          </text>
                        </g>
                      );
                    })}

                    {/* X & Y Axis Labels */}
                    <text x="520" y="325" fill="var(--text-secondary)" fontSize="12" fontWeight="600" textAnchor="middle">
                      Average Annual Salary (GBP)
                    </text>

                    {/* Scatter Points (Bubbles) */}
                    {processedData.map((item, idx) => {
                      // Map salary 20k-70k to X 60-960
                      const x = 60 + ((item.Average_Salary_GBP - 20000) / 50000) * 900;
                      
                      // Map Days to Hire 0-80 to Y 280-40
                      const y = 280 - (item.Average_Days_to_Hire / 80) * 240;
                      
                      // Map Shortfall 100-700 to Radius 6-22
                      const r = 6 + ((item.Shortfall - 100) / 600) * 16;
                      
                      // Color schemes per role
                      const colors = [
                        "#3b82f6", "#8b5cf6", "#ef4444", "#10b981", 
                        "#f59e0b", "#ec4899", "#06b6d4", "#84cc16", 
                        "#14b8a6", "#f43f5e"
                      ];
                      const dotColor = colors[idx % colors.length];

                      return (
                        <g key={item.Role}>
                          <circle
                            cx={x}
                            cy={y}
                            r={r}
                            fill={dotColor}
                            fillOpacity="0.4"
                            stroke={dotColor}
                            strokeWidth="2"
                            className={styles.scatterPoint}
                            onMouseEnter={(e) => showTooltip(e, (
                              <div>
                                <div className={styles.tooltipTitle} style={{ color: dotColor }}>{item.Role}</div>
                                <div className={styles.tooltipItem}>
                                  <span className={styles.tooltipItemLabel}>Avg Salary:</span>
                                  <span className={styles.tooltipItemValue}>£{item.Average_Salary_GBP.toLocaleString()}</span>
                                </div>
                                <div className={styles.tooltipItem}>
                                  <span className={styles.tooltipItemLabel}>Days to Hire:</span>
                                  <span className={styles.tooltipItemValue}>{item.Average_Days_to_Hire} days</span>
                                </div>
                                <div className={styles.tooltipItem}>
                                  <span className={styles.tooltipItemLabel}>Staff Shortfall:</span>
                                  <span className={styles.tooltipItemValue} style={{ color: "var(--status-high)" }}>{item.Shortfall}</span>
                                </div>
                                <div className={styles.tooltipItem}>
                                  <span className={styles.tooltipItemLabel}>Remote work:</span>
                                  <span className={styles.tooltipItemValue}>{item.Remote_Work_Percentage}%</span>
                                </div>
                              </div>
                            ))}
                            onMouseLeave={hideTooltip}
                          />
                        </g>
                      );
                    })}

                    {/* Axis lines */}
                    <line x1="60" y1="280" x2="980" y2="280" stroke="var(--border-color)" strokeWidth="1.5" />
                    <line x1="60" y1="40" x2="60" y2="280" stroke="var(--border-color)" strokeWidth="1.5" />
                  </svg>

                  {/* Absolute Tooltip Container */}
                  {tooltip.visible && (
                    <div 
                      className={`${styles.customTooltip} ${styles.customTooltipVisible}`}
                      style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px`, transform: "translate(-50%, -100%)" }}
                    >
                      {tooltip.content}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Raw Data Table */}
            <div className={styles.tableContainer}>
              <h3 className={styles.tableTitle}>Regional Telemetry Data (Full Detail)</h3>
              <table className={styles.styledTable}>
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Current workforce</th>
                    <th>Required workforce</th>
                    <th>Staff Shortfall</th>
                    <th>Severity Score</th>
                    <th>Avg Days to Hire</th>
                    <th>Avg Salary</th>
                    <th>Remote Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {processedData.map((item) => {
                    const badgeClass = 
                      item.Skill_Gap_Severity === "High" ? styles.badgeHigh :
                      item.Skill_Gap_Severity === "Medium" ? styles.badgeMedium : styles.badgeLow;
                    
                    return (
                      <tr key={item.Role}>
                        <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{item.Role}</td>
                        <td>{item.Current_Workforce.toLocaleString()}</td>
                        <td>{item.Required_Workforce.toLocaleString()}</td>
                        <td style={{ color: item.Shortfall > 0 ? "var(--status-high)" : "inherit", fontWeight: 600 }}>
                          {item.Shortfall > 0 ? `-${item.Shortfall.toLocaleString()}` : 0}
                        </td>
                        <td>
                          <span className={`${styles.badge} ${badgeClass}`}>
                            {item.Skill_Gap_Severity}
                          </span>
                        </td>
                        <td>
                          <span style={{ display: "inline-flex", gap: "0.25rem", alignItems: "center" }}>
                            <Clock size={13} style={{ color: "var(--text-muted)" }} />
                            {item.Average_Days_to_Hire} days
                          </span>
                        </td>
                        <td>
                          <span style={{ display: "inline-flex", gap: "0.25rem", alignItems: "center" }}>
                            <DollarSign size={13} style={{ color: "var(--text-muted)" }} />
                            £{item.Average_Salary_GBP.toLocaleString()}
                          </span>
                        </td>
                        <td>{item.Remote_Work_Percentage}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        ) : (
          /* Strategy Section */
          <div className="animate-fade-in">
            {/* Header */}
            <div className={styles.headerContainer}>
              <h1 className={styles.pageTitle}>10 Ways to Manage Shortage</h1>
              <p className={styles.pageSubtitle}>
                Actionable tactics and strategic solutions to bridge the tech talent deficit in the North East region.
              </p>
            </div>

            {/* Strategy Card List */}
            <div className={styles.strategyGrid}>
              {strategies.map((strat, idx) => (
                <div 
                  key={idx} 
                  className={styles.strategyCard}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div 
                      style={{ 
                        padding: "0.5rem", 
                        borderRadius: "8px", 
                        backgroundColor: "rgba(59, 130, 246, 0.1)", 
                        color: "var(--accent-blue)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      {strat.icon}
                    </div>
                    <div>
                      <h3 className={styles.strategyCardTitle}>{strat.title}</h3>
                      <p className={styles.strategyCardDesc}>{strat.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary callout */}
            <div 
              style={{ 
                marginTop: "2rem", 
                background: "linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
                border: "1px solid var(--border-color)",
                padding: "1.5rem",
                borderRadius: "12px",
                display: "flex",
                gap: "1rem",
                alignItems: "center"
              }}
            >
              <Info style={{ color: "var(--accent-blue)", flexShrink: 0 }} />
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                <strong>Key Takeaway:</strong> Resolving the regional skills shortage requires a unified blend of upskilling current staff, developing apprentice pipelines, collaborating with Newcastle & Durham universities, and embracing hybrid hiring practices.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
