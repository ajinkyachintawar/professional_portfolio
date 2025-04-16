// Portfolio.js
import { useState } from 'react';
import './portfolio.css';
import { Mail, Github, Linkedin, Menu, X } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Portfolio() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeProject, setActiveProject] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    emailjs.send(
      'service_gwpe2c7',
      'template_livfsle',
      formData,
      'NCM0gti6KCwI7kIex'
    ).then(() => {
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }).catch((error) => {
      alert('Oops, something went wrong: ' + error.text);
    });
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const projects = [
    {
      title: "Retail Sales Analytics Pipeline",
      description: "Built a robust data pipeline for retail analytics using Airflow for orchestration and BigQuery for data warehousing. Dashboards were created in Looker Studio to monitor daily sales KPIs.",
      tools: "Airflow, BigQuery, Looker Studio",
      github: "https://github.com/ajinkyachintawar/retail-sales-pipeline"
    },
    {
      title: "Lifestyle Classification using Biometrics & HEXACO",
      description: "Developed a machine learning model to classify lifestyle segments and personality traits based on biometric data (steps, heart rate, BMI) and HEXACO personality survey responses. The project involved data preprocessing, feature engineering, and deployment-ready modeling.",
      tools: "Python, Scikit-Learn, Pandas, Tableau",
      github: "https://github.com/ajinkyachintawar/Classifying-Activity-Levels-with-Biometric-and-Psychological-Insights"
    },
    {
      title: "Bitcoin Price Prediction",
      description: "Forecasted Bitcoin prices using LSTM deep learning models trained on historical market data. The model achieved a high R² score and was visualized using Matplotlib for trend analysis.",
      tools: "LSTM, Keras, Matplotlib",
      github: "https://github.com/ajinkyachintawar/bitcoin-prediction"
    },
    {
      title: "US Drug Overdose Analysis",
      description: "Conducted an exploratory data analysis on drug overdose statistics across US states using CDC datasets. Created interactive Power BI dashboards to highlight trends and at-risk demographics.",
      tools: "Python, Power BI, Excel",
      github: "https://github.com/ajinkyachintawar/DrugOverdose"
    },
    {
      title: "Employee Attrition Prediction",
      description: "Implemented a Random Forest model to predict employee attrition using structured HR data. Feature importance analysis helped HR identify key retention drivers.",
      tools: "Random Forest, Python, Seaborn",
      github: "https://github.com/ajinkyachintawar/Employee-Attrition-"
    },
    {
      title: "10-Minute Medicine Delivery Simulation in Dublin 8",
      description: "Simulated logistics for medicine delivery using SimPy, incorporating geographic coordinates, traffic data, and estimated delivery time constraints for urban healthcare planning.",
      tools: "SimPy, Python, QGIS",
      github: "https://github.com/ajinkyachintawar/10min_delivery"
    }
  ];

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
          <ToastContainer 
            position="top-right" 
            theme="dark" 
            autoClose={3000} 
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
        />
      <nav className="navbar">
        <img src="/logo.png" alt="Ajinkya Logo" className="logo-img" />
        <div className="nav-links">
          {['about', 'skills', 'projects', 'contact'].map((item) => (
            <button key={item} onClick={() => scrollToSection(item)}>{item.charAt(0).toUpperCase() + item.slice(1)}</button>
          ))}
          <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
        </div>
        <div className="mobile-toggle">
          <Menu onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {['about', 'skills', 'projects', 'contact'].map((item) => (
            <button key={item} onClick={() => scrollToSection(item)}>{item.charAt(0).toUpperCase() + item.slice(1)}</button>
          ))}
          <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
        </div>
      )}

      <div className="content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-wrapper">
            <div className="hero-image">
              <img src="/data-pack-hero.png" alt="Ajinkya" />
            </div>
            <div className="hero-text">
              <h1 className="hero-name">Ajinkya Chintawar</h1>
              <p className="hero-tagline">Data Analyst who turns raw data into real insights.</p>
              <p className="hero-roles">
                Open to: <Typewriter words={['Data Analyst', 'Data Engineer', 'BI Developer', 'Data Scientist']} loop cursor cursorStyle="|" typeSpeed={70} deleteSpeed={40} delaySpeed={1500} />
              </p>
              <div className="hero-buttons">
                <button className="resume-btn">Download Resume</button>
                <button className="projects-btn" onClick={() => scrollToSection('projects')}>View Projects</button>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
            <h2 className="about-title">About Me</h2>
            <div className="about-content">
                <p>
                I’m not just a data analyst — I’m the guy who gets excited by messy spreadsheets and weird outliers. 
                Whether it’s predicting behavior, optimizing a process, or just making dashboards look like art, 
                I love translating chaos into clarity. Give me a dataset, and I’ll probably turn it into a story 
                your CEO wants in the next meeting.
                </p>
                <p>
                Outside of data? I’m an adventure-seeking, gym-addicted, photography-loving tech nerd. 
                I’ve been known to climb hills for better Wi-Fi, and I genuinely believe a good scatterplot 
                can change minds. Coffee fuels my code, and curiosity drives my every query.
                </p>
            </div>
        </section>



        <section id="skills" className="section">
          <h2>Skills & Tools</h2>
          <div className="skills">
            {["Python", "SQL", "R", "JavaScript", "Power BI", "Tableau", "Excel", "Google Cloud Platform", "BigQuery", "Machine Learning", "Deep Learning", "Scikit-Learn", "TensorFlow", "React", "HTML", "CSS", "Apache Kafka", "Airflow", "ETL", "Git", "GitHub", "REST APIs", "Looker Studio", "Data Cleaning", "Statistics"].map((skill) => (
              <span key={skill} className="skill-bubble">{skill}</span>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <h2>Projects</h2>
          <div className="projects">
            {projects.map((project, idx) => (
              <div key={idx} className="project-card">
                <h3>{project.title}</h3>
                <button className="view-btn" onClick={() => setActiveProject(project)}>View Project</button>
              </div>
            ))}
          </div>

          {activeProject && (
            <div className="modal-overlay" onClick={() => setActiveProject(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setActiveProject(null)}>
                  <X size={20} />
                </button>
                <h2 className="modal-title">{activeProject.title}</h2>
                <p className="modal-description">{activeProject.description}</p>
                <div className="modal-section">
                  <h4>Tools & Algorithms:</h4>
                  <p>{activeProject.tools}</p>
                </div>
                <div className="modal-footer">
                  <a href={activeProject.github} target="_blank" className="modal-btn">
                    <Github size={20} /> View on GitHub
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>

        <section id="contact" className="section contact">
          <h2>Contact Me</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} />
            <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange}></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>

        <footer className="footer">
          <div className="icons">
            <a href="mailto:ajinkyachintawar12@email.com"><Mail /></a>
            <a href="https://github.com/ajinkyachintawar" target="_blank" rel="noopener noreferrer"><Github /></a>
            <a href="https://linkedin.com/in/ajinkya-chintawar" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
          </div>
          <p>© 2025 Ajinkya Chintawar. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}