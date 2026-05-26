# UK North East Tech Skills Shortage Dashboard

This repository contains a data analysis and strategy dashboard focusing on the technology skills shortage in the North East of the United Kingdom. It was built using Python and Streamlit to provide an interactive way to explore the data and read through strategic solutions.

## Features

- **Interactive Dashboard:** Explores simulated data of the current vs. required tech workforce across various roles.
- **Data Visualizations:** Utilizes Plotly to display workforce gaps, shortfall percentages, and days-to-hire metrics.
- **Strategy Guide:** Clearly outlines 10 actionable ways to manage the tech skills shortage in the North East based on regional initiatives and industry best practices.

## Project Structure

```
UK_NE_Tech_Skills_Dashboard/
│
├── app.py                   # Main Streamlit application
├── requirements.txt         # Python dependencies
├── README.md                # Project documentation
└── data/
    └── northeast_tech_skills_data.csv  # Simulated dataset
```

## How to Run Locally

1. **Clone this repository** (or navigate to the project directory).

2. **Install dependencies:**
   It is recommended to use a virtual environment.
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Streamlit app:**
   ```bash
   streamlit run app.py
   ```

4. **View the Dashboard:**
   Open your browser and navigate to `http://localhost:8501` to view the app.

## Data Source
The data used in this project is synthetically generated to reflect real-world trends regarding the tech skills gap (such as shortages in Software Engineering, AI, and Cybersecurity) in the North East UK context.

## 10 Ways to Manage Skills Shortage
1. Invest in Internal Upskilling and Reskilling
2. Develop Strong Local Apprenticeship Programs
3. Collaborate with Regional Universities
4. Embrace Flexible and Remote Working
5. Broaden Recruitment Criteria
6. Utilize Regional Support Networks
7. Improve Employer Branding and Workplace Culture
8. Foster Diversity and Inclusion in Tech
9. Engage in Strategic Outsourcing and Partnerships
10. Implement AI and Automation Tools
