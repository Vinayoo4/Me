<template>
  <div class="app">
    <!-- Animated Header Section -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="name-container">
            <h1 class="name">{{ personalInfo.name }}</h1>
            <div class="blinking-cursor">_</div>
          </div>
          <p class="title">{{ personalInfo.title }}</p>
          <div class="ascii-art">
            <pre>{{ asciiArt }}</pre>
          </div>
          <div class="status-bar">
            <span class="status-item">● ONLINE</span>
            <span class="status-item">{{ currentTime }}</span>
            <span class="status-item">EST. 2025</span>
          </div>
        </div>
      </div>
      <div class="header-border"></div>
    </header>

    <!-- Navigation Menu -->
    <nav class="nav-menu">
      <div class="container">
        <div class="nav-items">
          <a href="#about" class="nav-link" @click="scrollToSection('about')">[ ABOUT ]</a>
          <a href="#skills" class="nav-link" @click="scrollToSection('skills')">[ SKILLS ]</a>
          <a href="#projects" class="nav-link" @click="scrollToSection('projects')">[ PROJECTS ]</a>
          <router-link to="/certifications" class="nav-link">[ CERTIFICATIONS ]</router-link>
          <a href="#contact" class="nav-link" @click="scrollToSection('contact')">[ CONTACT ]</a>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main">
      <div class="container">
        <!-- About Section -->
        <section id="about" class="section">
          <h2 class="section-title">
            <span class="title-brackets">[</span>
            <span class="title-text">ABOUT</span>
            <span class="title-brackets">]</span>
          </h2>
          <div class="content-box">
            <div class="terminal-header">
              <div class="terminal-buttons">
                <span class="terminal-btn close"></span>
                <span class="terminal-btn minimize"></span>
                <span class="terminal-btn maximize"></span>
              </div>
              <span class="terminal-title">about.txt</span>
            </div>
            <div class="terminal-content">
              <p class="intro">{{ personalInfo.intro }}</p>
              <div class="stats-grid">
                <div class="stat-item" v-for="(stat, index) in personalStats" :key="index">
                  <span class="stat-icon">{{ stat.icon }}</span>
                  <div class="stat-info">
                    <span class="stat-label">{{ stat.label }}</span>
                    <span class="stat-value">{{ stat.value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Skills Section -->
        <section id="skills" class="section">
          <h2 class="section-title">
            <span class="title-brackets">[</span>
            <span class="title-text">SKILLS</span>
            <span class="title-brackets">]</span>
          </h2>
          <div class="content-box">
            <div class="terminal-header">
              <div class="terminal-buttons">
                <span class="terminal-btn close"></span>
                <span class="terminal-btn minimize"></span>
                <span class="terminal-btn maximize"></span>
              </div>
              <span class="terminal-title">skills.exe</span>
            </div>
            <div class="terminal-content">
              <div class="skills-container">
                <div class="skill-category" v-for="category in skills" :key="category.name">
                  <h3 class="category-header">
                    <span class="folder-icon">📁</span>
                    {{ category.name }}
                  </h3>
                  <div class="skill-items">
                    <div class="skill-item" v-for="skill in category.items" :key="skill.name">
                      <span class="skill-name">{{ skill.name }}</span>
                      <div class="skill-bar">
                        <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
                      </div>
                      <span class="skill-percentage">{{ skill.level }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Projects Section -->
        <section id="projects" class="section">
          <h2 class="section-title">
            <span class="title-brackets">[</span>
            <span class="title-text">PROJECTS</span>
            <span class="title-brackets">]</span>
          </h2>
          <div class="content-box">
            <div class="terminal-header">
              <div class="terminal-buttons">
                <span class="terminal-btn close"></span>
                <span class="terminal-btn minimize"></span>
                <span class="terminal-btn maximize"></span>
              </div>
              <span class="terminal-title">projects.dir</span>
            </div>
            <div class="terminal-content">
              <div class="projects-grid">
                <div class="project-item" v-for="project in projects" :key="project.name">
                  <div class="project-header">
                    <span class="project-icon">💾</span>
                    <h4 class="project-name">{{ project.name }}</h4>
                  </div>
                  <p class="project-description">{{ project.description }}</p>
                  <div class="project-tech">
                    <span class="tech-tag" v-for="tech in project.technologies" :key="tech">{{ tech }}</span>
                  </div>
                  <div class="project-links">
                    <a href="#" class="project-link">VIEW</a>
                    <a href="#" class="project-link">CODE</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="section">
          <h2 class="section-title">
            <span class="title-brackets">[</span>
            <span class="title-text">CONTACT</span>
            <span class="title-brackets">]</span>
          </h2>
          <div class="content-box">
            <div class="terminal-header">
              <div class="terminal-buttons">
                <span class="terminal-btn close"></span>
                <span class="terminal-btn minimize"></span>
                <span class="terminal-btn maximize"></span>
              </div>
              <span class="terminal-title">contact.exe</span>
            </div>
            <div class="terminal-content">
              <div class="contact-layout">
                <div class="contact-info">
                  <h3 class="contact-header">📞 GET IN TOUCH</h3>
                  <div class="contact-methods">
                    <div class="contact-method" v-for="contact in contactInfo" :key="contact.type">
                      <span class="contact-icon">{{ contact.icon }}</span>
                      <div class="contact-details">
                        <span class="contact-label">{{ contact.label }}</span>
                        <span class="contact-value">{{ contact.value }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="social-links">
                    <h4 class="social-header">🌐 FIND ME ONLINE</h4>
                    <div class="social-grid">
                      <a :href="social.url" class="social-link" v-for="social in socialLinks" :key="social.name" target="_blank" rel="noopener">
                        <span class="social-icon">{{ social.icon }}</span>
                        <span class="social-name">{{ social.name }}</span>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div class="contact-form-container">
                  <h3 class="form-header">📧 SEND MESSAGE</h3>
                  <form @submit.prevent="submitForm" class="contact-form">
                    <div class="form-row">
                      <div class="form-group">
                        <label class="form-label">NAME:</label>
                        <input 
                          type="text" 
                          v-model="form.name" 
                          :class="['form-input', { error: errors.name }]"
                          placeholder="Enter your name..."
                          required 
                        />
                        <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
                      </div>
                      
                      <div class="form-group">
                        <label class="form-label">EMAIL:</label>
                        <input 
                          type="email" 
                          v-model="form.email" 
                          :class="['form-input', { error: errors.email }]"
                          placeholder="your@email.com"
                          required 
                        />
                        <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
                      </div>
                    </div>
                    
                    <div class="form-group">
                      <label class="form-label">MESSAGE:</label>
                      <textarea 
                        v-model="form.message" 
                        :class="['form-textarea', { error: errors.message }]"
                        rows="5" 
                        placeholder="Type your message here..."
                        required
                      ></textarea>
                      <span v-if="errors.message" class="error-text">{{ errors.message }}</span>
                    </div>
                    
                    <button type="submit" :disabled="isSubmitting" class="submit-btn">
                      <span v-if="isSubmitting" class="loading-spinner">⟳</span>
                      {{ isSubmitting ? 'SENDING...' : '► SEND MESSAGE' }}
                    </button>
                    
                    <div v-if="submitMessage" :class="['submit-message', submitStatus]">
                      <span class="message-icon">{{ submitStatus === 'success' ? '✓' : '✗' }}</span>
                      {{ submitMessage }}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Enhanced Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-left">
            <p class="copyright">&copy; {{ currentYear }} {{ personalInfo.name }}</p>
            <p class="tech-stack">Built with Vue.js & Express.js</p>
          </div>
          <div class="footer-center">
            <div class="visitor-counter">
              <span class="counter-label">VISITORS:</span>
              <span class="counter-value">{{ String(visitorCount).padStart(6, '0') }}</span>
            </div>
          </div>
          <div class="footer-right">
            <div class="last-updated">
              <span class="update-label">LAST UPDATED:</span>
              <span class="update-date">{{ lastUpdated }}</span>
            </div>
          </div>
        </div>
        <div class="footer-border"></div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// Personal Information
const personalInfo = {
  name: 'Vinay Yadav',
  title: 'Front Web Developer & Digital Craftsman',
  intro: 'Welcome to my corner of the digital universe! I\'m a passionate Student, developer , Digital Marketer ,  who believes in writing clean, efficient code and creating meaningful digital experiences. This website is a tribute to the golden age of the web - when simplicity met functionality and every pixel had purpose.'
}

// ASCII Art
const asciiArt = `
    ╔══════════════════════════════╗
    ║     WELCOME TO MY WORLD!     ║
    ║                              ║
    ║  ┌─┐┌─┐┌┬┐┌─┐  ┌─┐┌┐┌┌┬┐    ║
    ║  │  │ │ ││├┤   ├─┤│││ ││    ║
    ║  └─┘└─┘─┴┘└─┘  ┴ ┴┘└┘─┴┘    ║
    ║        ┌─┐┬─┐┌─┐┌─┐┌┬┐┌─┐    ║
    ║        │  ├┬┘├┤ ├─┤ │ ├┤     ║
    ║        └─┘┴└─└─┘┴ ┴ ┴ └─┘    ║
    ╚══════════════════════════════╝
`

// Personal Stats
const personalStats = [
  { icon: '💼', label: 'Experience', value: '2+ Years' },
  { icon: '📍', label: 'Location', value: 'Haryana, IN' },
  { icon: '🚀', label: 'Status', value: 'Available for Work' },
  { icon: '☕', label: 'Coffee Consumed', value: '∞ Cups' }
]

// Enhanced Skills Data with levels
const skills = [
  {
    name: 'Frontend Technologies',
    items: [
      { name: 'JavaScript/TypeScript', level: 95 },
      { name: 'Vue.js', level: 90 },
      { name: 'React', level: 85 },
      { name: 'HTML5/CSS3', level: 95 },
      { name: 'Responsive Design', level: 90 }
    ]
  },
  {
    name: 'Backend Technologies',
    items: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'REST APIs', level: 90 },
      { name: 'Database Design', level: 85 }
    ]
  },
  {
    name: 'Tools & DevOps',
    items: [
      { name: 'Git', level: 95 },
      { name: 'Docker', level: 80 },
      { name: 'VS Code', level: 95 },
      { name: 'Linux', level: 85 },
      { name: 'CI/CD', level: 75 }
    ]
  },
  {
    name: 'Personal Finance',
    items: [
      { name: 'Money Management', level: 95 },
      { name: 'Money Psychology', level: 75 },
      { name: 'Options and Futures', level: 95 },
      { name: 'Stock Market', level: 90 },
      { name: 'Mutual Funds', level: 97 },
      { name: 'Retirement Planning', level: 75 },
      { name: 'Tax Planning', level: 75 },
      { name: 'Insurance', level: 75 },
      { name: 'Real Estate', level: 40 },
      { name: 'Cryptocurrency', level: 89 },
      { name: 'Investment Strategies', level: 99 },
      { name: 'Financial Planning', level: 99 },
      { name: 'Risk Management', level: 90 },
      { name: 'Financial Literacy', level: 96 },
      { name: 'Financial Security', level: 99 },
      { name: 'Financial Freedom', level: 90 },
    ]
  }
]

// Projects Data
const projects = [
  {
    name: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe']
  },
  {
    name: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates and team features.',
    technologies: ['React', 'Express', 'Socket.io', 'PostgreSQL']
  },
  {
    name: 'Weather Dashboard',
    description: 'Interactive weather dashboard with data visualization and location services.',
    technologies: ['JavaScript', 'Chart.js', 'Weather API', 'CSS3']
  },
  {
    name: 'Portfolio Website',
    description: 'This very website! A 90s-inspired personal portfolio with modern functionality.',
    technologies: ['Vue.js', 'Express.js', 'CSS3', 'Node.js']
  }
]

// Enhanced Contact Information
const contactInfo = [
  { type: 'email', icon: '📧', label: 'Email', value: 'dev.webstylevinay9994@email.com' },
  { type: 'phone', icon: '📱', label: 'Phone', value: '+1 (555) 123-4567' },
  { type: 'location', icon: '📍', label: 'Location', value: 'Haryana, IN' }
]

// Social Links
const socialLinks = [
  { name: 'GitHub', icon: '🐙', url: 'https://github.com/Vinayoo4' },
  { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/in/vinayyadav36' },
  { name: 'Portfolio', icon: '🌐', url: 'https://github.com/Vinayoo4/me' }
]

// Form handling
const form = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('')
const visitorCount = ref(0)
const currentYear = new Date().getFullYear()
const lastUpdated = new Date().toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'short', 
  day: 'numeric' 
})

// Time display
const currentTime = ref('')
let timeInterval: number

// API Base URL
const API_BASE = (import.meta as any).env?.VITE_API_BASE || '/api'

// Update time
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Smooth scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Form validation
const validateForm = () => {
  errors.name = form.name.length < 2 ? 'Name must be at least 2 characters' : ''
  errors.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'Invalid email format' : ''
  errors.message = form.message.length < 10 ? 'Message must be at least 10 characters' : ''
  
  return !errors.name && !errors.email && !errors.message
}

// Submit form
const submitForm = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  submitMessage.value = ''
  
  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    
    const result = await response.json()
    
    if (response.ok) {
      submitMessage.value = 'Message sent successfully! I\'ll get back to you soon.'
      submitStatus.value = 'success'
      // Reset form
      form.name = ''
      form.email = ''
      form.message = ''
    } else {
      submitMessage.value = result.message || 'Failed to send message. Please try again.'
      submitStatus.value = 'error'
    }
  } catch (error) {
    submitMessage.value = 'Network error. Please check your connection and try again.'
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
    setTimeout(() => {
      submitMessage.value = ''
    }, 5000)
  }
}

// Get visitor count
const getVisitorCount = async () => {
  try {
    const response = await fetch(`${API_BASE}/visitors`)
    const data = await response.json()
    visitorCount.value = data.count
  } catch (error) {
    console.error('Failed to fetch visitor count:', error)
  }
}

// Track visitor
const trackVisitor = async () => {
  try {
    if (!localStorage.getItem('hasVisited')) {
      await fetch(`${API_BASE}/visitors`, { method: 'POST' });
      localStorage.setItem('hasVisited', 'true');
    }
  } catch (error) {
    console.error('Failed to track visitor:', error);
  }
};

onMounted(async () => {
  try {
    await trackVisitor();
  } catch (e) {
    console.error('Failed to track visitor:', e);
  }
  await getVisitorCount();
  updateTime();
  timeInterval = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
/* Enhanced 90s Styling */
.app {
  min-height: 100vh;
  background: #ffffff;
  color: #000000;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Enhanced Header */
.header {
  background: #000000;
  color: #ffffff;
  padding: 30px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  animation: scan 3s infinite;
}

@keyframes scan {
  0% { left: -100%; }
  100% { left: 100%; }
}

.name-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.name {
  font-size: 3.5rem;
  font-weight: bold;
  letter-spacing: 4px;
  margin: 0;
  text-shadow: 2px 2px 0px #333333;
}

.blinking-cursor {
  font-size: 3.5rem;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.title {
  font-size: 1.3rem;
  margin: 0 0 25px 0;
  opacity: 0.9;
  letter-spacing: 1px;
}

.ascii-art {
  font-size: 0.7rem;
  line-height: 1.1;
  opacity: 0.8;
  margin-bottom: 20px;
}

.status-bar {
  display: flex;
  justify-content: center;
  gap: 30px;
  font-size: 0.9rem;
  opacity: 0.8;
}

.status-item {
  padding: 5px 10px;
  border: 1px solid #ffffff;
  background: rgba(255,255,255,0.1);
}

.header-border {
  height: 6px;
  background: repeating-linear-gradient(
    90deg,
    #000000 0px,
    #000000 15px,
    #ffffff 15px,
    #ffffff 30px
  );
}

/* Navigation Menu */
.nav-menu {
  background: #f0f0f0;
  border-bottom: 2px solid #000000;
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-items {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.nav-link {
  color: #000000;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 8px 15px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.nav-link:hover {
  border-color: #000000;
  background: #000000;
  color: #ffffff;
}

/* Main Content */
.main {
  padding: 60px 0;
  background: #ffffff;
}

.section {
  margin-bottom: 80px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  letter-spacing: 3px;
}

.title-brackets {
  color: #666666;
}

.title-text {
  color: #000000;
  margin: 0 10px;
}

/* Terminal-style Content Boxes */
.content-box {
  border: 3px solid #000000;
  background: #ffffff;
  box-shadow: 5px 5px 0px #cccccc;
}

.terminal-header {
  background: #cccccc;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-bottom: 2px solid #000000;
}

.terminal-buttons {
  display: flex;
  gap: 8px;
}

.terminal-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #000000;
}

.terminal-btn.close { background: #ff0000; }
.terminal-btn.minimize { background: #ffff00; }
.terminal-btn.maximize { background: #00ff00; }

.terminal-title {
  font-weight: bold;
  font-size: 0.9rem;
}

.terminal-content {
  padding: 30px;
  background: #ffffff;
}

/* About Section */
.intro {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 30px;
  text-align: justify;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border: 2px solid #000000;
  background: #f9f9f9;
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-weight: bold;
  font-size: 0.9rem;
  color: #666666;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: bold;
}

/* Skills Section */
.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.skill-category {
  border: 2px solid #000000;
  background: #f9f9f9;
}

.category-header {
  background: #000000;
  color: #ffffff;
  padding: 15px;
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.folder-icon {
  font-size: 1rem;
}

.skill-items {
  padding: 20px;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.skill-name {
  min-width: 120px;
  font-size: 0.9rem;
  font-weight: bold;
}

.skill-bar {
  flex: 1;
  height: 20px;
  background: #ffffff;
  border: 2px solid #000000;
  position: relative;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: #000000;
  transition: width 2s ease-in-out;
  position: relative;
}

.skill-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    rgba(255,255,255,0.1) 2px,
    rgba(255,255,255,0.1) 4px
  );
}

.skill-percentage {
  min-width: 40px;
  text-align: right;
  font-weight: bold;
  font-size: 0.9rem;
}

/* Projects Section */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.project-item {
  border: 2px solid #000000;
  background: #f9f9f9;
  padding: 20px;
  transition: transform 0.3s ease;
}

.project-item:hover {
  transform: translateY(-5px);
  box-shadow: 5px 5px 0px #cccccc;
}

.project-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.project-icon {
  font-size: 1.2rem;
}

.project-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
}

.project-description {
  margin-bottom: 15px;
  line-height: 1.6;
  font-size: 0.95rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.tech-tag {
  background: #000000;
  color: #ffffff;
  padding: 4px 8px;
  font-size: 0.8rem;
  border: 1px solid #000000;
}

.project-links {
  display: flex;
  gap: 15px;
}

.project-link {
  color: #000000;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 15px;
  border: 2px solid #000000;
  background: #ffffff;
  transition: all 0.3s ease;
}

.project-link:hover {
  background: #000000;
  color: #ffffff;
}

/* Contact Section */
.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.contact-header,
.form-header {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-methods {
  margin-bottom: 30px;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #cccccc;
  background: #f9f9f9;
}

.contact-icon {
  font-size: 1.2rem;
  width: 25px;
  text-align: center;
}

.contact-details {
  display: flex;
  flex-direction: column;
}

.contact-label {
  font-weight: bold;
  font-size: 0.9rem;
  color: #666666;
}

.contact-value {
  font-size: 1rem;
}

.social-header {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.social-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 2px solid #000000;
  background: #ffffff;
  text-decoration: none;
  color: #000000;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #000000;
  color: #ffffff;
}

.social-icon {
  font-size: 1.1rem;
}

.social-name {
  font-weight: bold;
  font-size: 0.9rem;
}

/* Enhanced Form Styling */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-weight: bold;
  font-size: 0.9rem;
  color: #000000;
}

.form-input,
.form-textarea {
  padding: 12px;
  border: 2px solid #cccccc;
  background: #ffffff;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #000000;
}

.form-input.error,
.form-textarea.error {
  border-color: #ff0000;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #999999;
  font-style: italic;
}

.error-text {
  color: #ff0000;
  font-size: 0.8rem;
  font-weight: bold;
}

.submit-btn {
  padding: 15px 30px;
  background: #000000;
  color: #ffffff;
  border: 2px solid #000000;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.submit-btn:hover:not(:disabled) {
  background: #333333;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.submit-message {
  padding: 15px;
  text-align: center;
  font-size: 0.9rem;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.submit-message.success {
  background: #d4edda;
  border-color: #28a745;
  color: #155724;
}

.submit-message.error {
  background: #f8d7da;
  border-color: #dc3545;
  color: #721c24;
}

.message-icon {
  font-weight: bold;
  font-size: 1.1rem;
}

/* Enhanced Footer */
.footer {
  background: #000000;
  color: #ffffff;
  padding: 40px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.footer-left {
  text-align: left;
}

.footer-center {
  text-align: center;
}

.footer-right {
  text-align: right;
}

.copyright {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.tech-stack {
  font-size: 0.9rem;
  opacity: 0.8;
}

.visitor-counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 15px;
  border: 2px solid #ffffff;
  background: rgba(255,255,255,0.1);
}

.counter-label {
  font-size: 0.8rem;
  opacity: 0.8;
}

.counter-value {
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
}

.last-updated {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.update-label {
  font-size: 0.8rem;
  opacity: 0.8;
}

.update-date {
  font-size: 0.9rem;
  font-weight: bold;
}

.footer-border {
  height: 4px;
  background: repeating-linear-gradient(
    90deg,
    #ffffff 0px,
    #ffffff 10px,
    transparent 10px,
    transparent 20px
  );
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
  
  .name {
    font-size: 2.5rem;
  }
  
  .blinking-cursor {
    font-size: 2.5rem;
  }
  
  .nav-items {
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .nav-link {
    font-size: 1rem;
  }
  
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .skills-container {
    grid-template-columns: 1fr;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 20px;
  }
  
  .footer-left,
  .footer-right {
    text-align: center;
  }
  
  .status-bar {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .name {
    font-size: 2rem;
    letter-spacing: 2px;
  }
  
  .blinking-cursor {
    font-size: 2rem;
  }
  
  .ascii-art {
    font-size: 0.6rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .social-grid {
    grid-template-columns: 1fr;
  }
}
</style>