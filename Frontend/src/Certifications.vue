<template>
  <div class="cert-page">
    <!-- Navigation back to Home -->
    <nav class="nav-menu">
      <div class="container">
        <div class="nav-items">
          <router-link to="/" class="nav-link">[ &larr; HOME ]</router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main">
      <div class="container">
        <section id="certifications" class="section">
          <h2 class="section-title">
            <span class="title-brackets">[</span>
            <span class="title-text">CERTIFICATIONS</span>
            <span class="title-brackets">]</span>
          </h2>
          <div class="content-box">
            <div class="terminal-header">
              <div class="terminal-buttons">
                <span class="terminal-btn close"></span>
                <span class="terminal-btn minimize"></span>
                <span class="terminal-btn maximize"></span>
              </div>
              <span class="terminal-title">certifications.list</span>
            </div>
            <div class="terminal-content">
              <div class="cert-list">
                <div class="cert-item" v-for="cert in certifications" :key="cert.name">
                  <div class="cert-header">
                    <span class="cert-icon">{{ cert.icon }}</span>
                    <h3 class="cert-name">{{ cert.name }}</h3>
                  </div>
                  <p class="cert-issuer">Issued by: {{ cert.issuer }}</p>
                  <p class="cert-date">Date: {{ cert.date }}</p>
                  <a :href="cert.url" class="cert-link" target="_blank" rel="noopener">VERIFY &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const certifications = [
  {
    name: 'Vue.js Certified Developer',
    issuer: 'Vue Mastery',
    date: 'Dec 2023',
    icon: '📜',
    url: '#'
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Jun 2023',
    icon: '📜',
    url: '#'
  },
  {
    name: 'Full-Stack Web Development',
    issuer: 'CodeAcademy',
    date: 'Jan 2022',
    icon: '📜',
    url: '#'
  },
  {
    name: 'Advanced TypeScript',
    issuer: 'Udemy',
    date: 'May 2022',
    icon: '📜',
    url: '#'
  }
];
</script>

<style scoped>
/* Base styling to match the theme */
.cert-page {
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
}

/* Certifications List */
.cert-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.cert-item {
  border: 2px solid #000000;
  background: #f9f9f9;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.cert-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.cert-icon {
  font-size: 1.5rem;
}

.cert-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
}

.cert-issuer {
  font-style: italic;
  color: #555;
  margin-bottom: 5px;
}

.cert-date {
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 15px;
}

.cert-link {
  margin-top: auto;
  align-self: flex-start;
  color: #000000;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 15px;
  border: 2px solid #000000;
  background: #ffffff;
  transition: all 0.3s ease;
}

.cert-link:hover {
  background: #000000;
  color: #ffffff;
}
</style> 