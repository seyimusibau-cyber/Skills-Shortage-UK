import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import os

# Set page configuration
st.set_page_config(
    page_title="UK North East Tech Skills Shortage",
    page_icon="💻",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better aesthetics
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        color: #1E3A8A;
        font-weight: bold;
        text-align: center;
        margin-bottom: 1rem;
    }
    .sub-header {
        font-size: 1.5rem;
        color: #2563EB;
        font-weight: bold;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
    .strategy-card {
        background-color: #F3F4F6;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        margin-bottom: 1rem;
        border-left: 5px solid #3B82F6;
    }
    .strategy-title {
        font-weight: bold;
        font-size: 1.2rem;
        color: #1F2937;
        margin-bottom: 0.5rem;
    }
    .metric-container {
        display: flex;
        justify-content: center;
        gap: 2rem;
    }
</style>
""", unsafe_allow_html=True)

# Load data
@st.cache_data
def load_data():
    # Attempt to load the CSV, fallback if running in a different dir
    data_path = os.path.join(os.path.dirname(__file__), "data", "northeast_tech_skills_data.csv")
    if os.path.exists(data_path):
        df = pd.read_csv(data_path)
    else:
        # Fallback empty dataframe if not found
        st.error(f"Data file not found at {data_path}")
        df = pd.DataFrame()
    return df

df = load_data()

# Calculate derived columns
if not df.empty:
    df['Shortfall'] = df['Required_Workforce'] - df['Current_Workforce']
    df['Shortfall_Percentage'] = (df['Shortfall'] / df['Required_Workforce']) * 100

# Sidebar
st.sidebar.title("Navigation")
page = st.sidebar.radio("Select a view:", ["Dashboard & Analytics", "10 Ways to Manage Shortage"])

st.sidebar.markdown("---")
st.sidebar.info(
    "**About this project:**\n\n"
    "An exploratory data analysis and strategy guide focusing on the technology skills shortage "
    "in the North East of the United Kingdom."
)

if page == "Dashboard & Analytics":
    st.markdown('<p class="main-header">North East UK Tech Skills Shortage Dashboard</p>', unsafe_allow_html=True)
    st.markdown("Explore the simulated data representing the current state of the tech workforce in the North East.")
    
    if df.empty:
        st.stop()

    # Top level metrics
    total_current = df['Current_Workforce'].sum()
    total_required = df['Required_Workforce'].sum()
    total_shortfall = total_required - total_current
    
    col1, col2, col3 = st.columns(3)
    col1.metric("Current Tech Workforce", f"{total_current:,}")
    col2.metric("Required Tech Workforce", f"{total_required:,}")
    col3.metric("Total Regional Shortfall", f"{total_shortfall:,}", f"-{(total_shortfall/total_required)*100:.1f}%", delta_color="inverse")

    st.markdown("---")

    # Layout for charts
    c1, c2 = st.columns(2)

    with c1:
        st.markdown('<p class="sub-header">Current vs Required Workforce by Role</p>', unsafe_allow_html=True)
        # Bar chart for workforce gap
        fig_workforce = go.Figure()
        fig_workforce.add_trace(go.Bar(
            x=df['Role'],
            y=df['Current_Workforce'],
            name='Current Workforce',
            marker_color='#60A5FA'
        ))
        fig_workforce.add_trace(go.Bar(
            x=df['Role'],
            y=df['Required_Workforce'],
            name='Required Workforce',
            marker_color='#1E3A8A'
        ))
        fig_workforce.update_layout(barmode='group', xaxis_tickangle=-45, height=400)
        st.plotly_chart(fig_workforce, use_container_width=True)

    with c2:
        st.markdown('<p class="sub-header">Shortfall Percentage by Role</p>', unsafe_allow_html=True)
        # Sort by shortfall
        df_sorted = df.sort_values('Shortfall_Percentage', ascending=True)
        fig_shortfall = px.bar(
            df_sorted, 
            x='Shortfall_Percentage', 
            y='Role', 
            orientation='h',
            color='Skill_Gap_Severity',
            color_discrete_map={'High': '#EF4444', 'Medium': '#F59E0B', 'Low': '#10B981'},
            labels={'Shortfall_Percentage': 'Shortfall (%)', 'Role': ''}
        )
        fig_shortfall.update_layout(height=400)
        st.plotly_chart(fig_shortfall, use_container_width=True)

    c3, c4 = st.columns(2)
    
    with c3:
        st.markdown('<p class="sub-header">Average Days to Hire</p>', unsafe_allow_html=True)
        fig_days = px.scatter(
            df, 
            x='Average_Salary_GBP', 
            y='Average_Days_to_Hire', 
            size='Shortfall', 
            color='Role',
            hover_name='Role',
            labels={'Average_Salary_GBP': 'Avg Salary (£)', 'Average_Days_to_Hire': 'Days to Hire'}
        )
        fig_days.update_layout(height=400)
        st.plotly_chart(fig_days, use_container_width=True)

    with c4:
        st.markdown('<p class="sub-header">Raw Data</p>', unsafe_allow_html=True)
        st.dataframe(
            df[['Role', 'Current_Workforce', 'Required_Workforce', 'Shortfall', 'Skill_Gap_Severity']],
            hide_index=True,
            use_container_width=True,
            height=400
        )

elif page == "10 Ways to Manage Shortage":
    st.markdown('<p class="main-header">10 Ways to Manage Skills Shortage in the North East</p>', unsafe_allow_html=True)
    st.markdown("Based on industry trends and regional initiatives, here are 10 strategic approaches to bridging the tech talent gap.")

    strategies = [
        {
            "title": "1. Invest in Internal Upskilling and Reskilling",
            "desc": "Prioritize training programs for existing employees to learn high-demand skills like AI, cloud computing, and cybersecurity. This builds loyalty and fills gaps without external hiring."
        },
        {
            "title": "2. Develop Strong Local Apprenticeship Programs",
            "desc": "Partner with North East educational institutions to create tech apprenticeships, providing hands-on experience and a direct pipeline of junior talent tailored to your company's needs."
        },
        {
            "title": "3. Collaborate with Regional Universities",
            "desc": "Engage with Newcastle University, Durham University, and other local institutions through guest lectures, hackathons, and graduate placement programs to secure emerging talent early."
        },
        {
            "title": "4. Embrace Flexible and Remote Working",
            "desc": "While focusing on the North East, offering hybrid or fully remote roles allows you to tap into talent pools beyond immediate commuting distances, increasing candidate volume."
        },
        {
            "title": "5. Broaden Recruitment Criteria",
            "desc": "Shift focus from strict degree requirements to skills-based hiring. Look for candidates with transferable skills and a strong aptitude for learning, expanding the available talent pool."
        },
        {
            "title": "6. Utilize Regional Support Networks",
            "desc": "Tap into resources like the North East Growth Hub and Tech Talent Engine to connect with job seekers and leverage government-backed skills development initiatives."
        },
        {
            "title": "7. Improve Employer Branding and Workplace Culture",
            "desc": "In a competitive market, a strong culture, competitive benefits, and clear career progression pathways are essential to attract and retain top tech professionals."
        },
        {
            "title": "8. Foster Diversity and Inclusion in Tech",
            "desc": "Actively recruit from underrepresented groups in the tech sector. Creating an inclusive environment not only widens the talent pool but also drives innovation."
        },
        {
            "title": "9. Engage in Strategic Outsourcing and Partnerships",
            "desc": "For highly specialized or short-term projects, partner with specialized North East tech agencies or freelancers to manage workloads without the need for full-time hires."
        },
        {
            "title": "10. Implement AI and Automation Tools",
            "desc": "Adopt productivity-enhancing tools (like AI coding assistants) to increase the output of your existing team, effectively reducing the raw number of new hires needed."
        }
    ]

    for s in strategies:
        st.markdown(f"""
        <div class="strategy-card">
            <div class="strategy-title">{s['title']}</div>
            <div>{s['desc']}</div>
        </div>
        """, unsafe_allow_html=True)

    st.info("💡 **Takeaway:** Managing the skills shortage requires a blend of nurturing local talent, optimizing existing resources, and adopting flexible working practices.")
