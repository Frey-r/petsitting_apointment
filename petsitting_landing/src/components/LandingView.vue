<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['next'])

const startBooking = () => {
  emit('next')
}
</script>

<template>
  <div class="landing-page">
    <header class="header">
      <div class="header-content">
        <div class="brand">
          <div class="logo">
            <span class="material-symbols-outlined icon">pets</span>
          </div>
          <h1>VetHome Care</h1>
        </div>
        <button class="login-btn">Log in</button>
      </div>
    </header>

    <main class="main-content">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-image" data-alt="A happy golden retriever dog receiving a checkup from a vet">
          <div class="hero-overlay">
            <div class="hero-text">
              <div class="badge">
                <span class="material-symbols-outlined badge-icon">verified</span>
                <span class="badge-text">Certified Vets</span>
              </div>
              <h2>Expert Vet Care, Right at Your Doorstep</h2>
              <p>Professional home check-ups and loving petsitting services without the travel stress.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Choose Section -->
      <section class="why-choose">
        <div class="section-header">
          <h2>Why choose home care?</h2>
          <p>We bring the clinic to your living room, ensuring your pet stays comfortable and happy.</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <span class="material-symbols-outlined feature-icon">home</span>
            </div>
            <div>
              <h3>Stress-Free</h3>
              <p>No car rides or waiting rooms.</p>
            </div>
          </div>
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <span class="material-symbols-outlined feature-icon">verified_user</span>
            </div>
            <div>
              <h3>Certified Pros</h3>
              <p>Fully licensed vets & sitters.</p>
            </div>
          </div>
          <div class="feature-card wide">
            <div class="feature-icon-wrapper">
              <span class="material-symbols-outlined feature-icon">schedule</span>
            </div>
            <div>
              <h3>Flexible Time</h3>
              <p>Book appointments 7 days a week, 8am-8pm.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="how-it-works">
        <h2>How It Works</h2>
        <div class="steps text-[red]">
          <div class="step-line"></div>
          
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Create Profile</h3>
              <p>Sign up and tell us about your pet's needs and medical history.</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Select Service</h3>
              <p>Choose from check-ups, vaccinations, or pet sitting and pick a time.</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Vet Arrives</h3>
              <p>Our professional comes to your door. Relax while we care for your pet.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="services">
        <h2>Our Services</h2>
        <div class="services-scroll">
          
          <div class="service-card">
            <div class="service-header">
              <div class="service-icon-box">
                <span class="material-symbols-outlined service-icon">medical_services</span>
              </div>
              <h3>Wellness Check</h3>
              <p>Full body exam</p>
            </div>
            <div class="service-footer">
              <span class="price">$45+</span>
              <div class="duration">
                <span class="material-symbols-outlined duration-icon">timer</span>
                <span>30 mins</span>
              </div>
            </div>
          </div>

          <div class="service-card">
            <div class="service-header">
              <div class="service-icon-box">
                <span class="material-symbols-outlined service-icon">pets</span>
              </div>
              <h3>Pet Sitting</h3>
              <p>Companionship & feeding</p>
            </div>
            <div class="service-footer">
              <span class="price">$30+</span>
              <div class="duration">
                <span class="material-symbols-outlined duration-icon">timer</span>
                <span>60 mins</span>
              </div>
            </div>
          </div>

          <div class="service-card">
            <div class="service-header">
              <div class="service-icon-box">
                <span class="material-symbols-outlined service-icon">vaccines</span>
              </div>
              <h3>Vaccinations</h3>
              <p>Essential shots at home</p>
            </div>
            <div class="service-footer">
              <span class="price">$25+</span>
              <div class="duration">
                <span class="material-symbols-outlined duration-icon">timer</span>
                <span>15 mins</span>
              </div>
            </div>
          </div>

          <div class="service-card">
            <div class="service-header">
              <div class="service-icon-box">
                <span class="material-symbols-outlined service-icon">medication_liquid</span>
              </div>
              <h3>Medication</h3>
              <p>Prescription refills</p>
            </div>
            <div class="service-footer">
              <span class="price">$20+</span>
              <div class="duration">
                <span class="material-symbols-outlined duration-icon">timer</span>
                <span>10 mins</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>

    <div class="bottom-bar">
      <div class="bottom-bar-content">
        <button class="book-btn" @click="startBooking">
          <span>Book a Visit</span>
          <span class="material-symbols-outlined btn-icon">arrow_forward</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Mobile First Layout */
.landing-page {
  padding-bottom: 96px; /* Space for fixed bottom bar */
  max-width: 100%;
  overflow-x: hidden;
}

/* Header */
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  opacity: 0.95;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  max-width: 1200px; /* Limit width on desktop */
  margin: 0 auto;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo {
  color: var(--color-primary);
  background-color: rgba(251, 146, 60, 0.1); /* Access primary color with opacity hardcoded or needs util */
  /* Better to rely on variables. Let's assume some transparency for now or standard bg */
  background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon {
  font-size: 24px;
}

.brand h1 {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.015em;
  color: var(--color-text);
}

.login-btn {
  color: var(--color-primary);
  font-size: 0.875rem;
  font-weight: 700;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  transition: opacity 0.2s;
}

.login-btn:hover {
  opacity: 0.8;
}

/* Main Content */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Hero */
.hero {
  padding: 16px;
}

.hero-image {
  position: relative;
  min-height: 420px;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.1) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuC9uw4MlYreWJt6AR9AbS3qNWRzpJRRrVI5KzmEIY1Qcykl4hE5S7tWoXeVaYN8GHEka2C4h7Z7thiGRAcTDHEkdBhvm0zd1V1egepaEGK2FMpCYZ52uiDUbLCOVMYG38ovWccf4OEyD27SA36sYsuieZpUy1OXy_-0ci7Ig8Ct70X9PKC2Y_kz8AaK11ef7JGoRzvJjvU01WEDNrJPbAEV4HJtb10qwg8zc3PNsGxmzgr3pJ9a1TihJ8Q1FqJQ7hAL3q7hrbkz4wo");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: center;
  box-shadow: var(--shadow-soft);
}

.hero-overlay {
  padding: 24px;
  z-index: 10;
  width: 100%;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 4px 12px;
  border-radius: 9999px;
  color: white;
}

.badge-icon {
  font-size: 16px;
}

.badge-text {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-text h2 {
  color: white;
  font-size: 1.875rem; /* 30px */
  font-weight: 900;
  line-height: 1.2;
  margin: 0;
  letter-spacing: -0.02em;
}

.hero-text p {
  color: #e5e7eb; /* Gray-200 */
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.6;
  max-width: 300px;
  margin: 0 auto;
}

/* Why Choose Section */
.why-choose {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--color-text);
}

.section-header p {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.feature-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: var(--shadow-card);
}

.feature-card.wide {
  grid-column: span 2;
  flex-direction: row;
  text-align: left;
  justify-content: center;
  gap: 16px;
}

.feature-icon-wrapper {
  width: 48px;
  height: 48px;
  background-color: color-mix(in srgb, var(--color-accent) 10%, transparent); /* Using accent for icons */
  color: var(--color-accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-icon {
  font-size: 32px;
}

.feature-card h3 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  color: var(--color-text);
}

.feature-card p {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin: 4px 0 0;
  line-height: 1.4;
}

/* How It Works Section */
.how-it-works {
  background-color: var(--color-surface);
  padding: 32px 16px;
  margin: 0 8px;
  border-radius: 24px;
  box-shadow: var(--shadow-card);
}

.how-it-works h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 24px;
    color: var(--color-text);
}

.steps {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-left: 16px;
}

.step-line {
  position: absolute;
  left: 27px; /* Matches circle center */
  top: 16px;
  bottom: 16px;
  width: 2px;
  background-color: var(--color-border);
  z-index: 0;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  position: relative;
  z-index: 1;
}

.step-number {
  width: 24px;
  height: 24px;
  background-color: var(--color-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 0 0 4px var(--color-surface); /* Ring effect */
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.step-content h3 {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
  color: var(--color-text);
}

.step-content p {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.5;
}

/* Services Section */
.services {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.services h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--color-text);
}

.services-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px; /* For scrollbar space */
  margin: 0 -16px;
  padding: 0 16px 16px;
  scroll-snap-type: x mandatory;
}

/* Hide scrollbar */
.services-scroll::-webkit-scrollbar {
  display: none;
}
.services-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.service-card {
  min-width: 180px;
  width: calc(50% - 8px);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  scroll-snap-align: center;
  box-shadow: var(--shadow-card);
  transition: border-color 0.2s;
  cursor: pointer;
}

.service-card:hover {
  border-color: color-mix(in srgb, var(--color-primary) 50%, transparent);
}

.service-header {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  margin-bottom: 12px;
}

.service-icon-box {
  width: 56px;
  height: 56px;
  background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
  color: var(--color-primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-icon {
  font-size: 32px;
}

.service-header h3 {
  font-size: 1rem;
  font-weight: 700;
  margin: 8px 0 0;
  color: var(--color-text);
}

.service-header p {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-muted);
  margin: 0;
}

.service-footer {
  border-top: 1px solid var(--color-border);
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.price {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-primary);
}

.duration {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.duration-icon {
  font-size: 16px;
}

/* Bottom Bar */
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background-color: var(--color-background);
  border-top: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
  z-index: 50;
}

.bottom-bar-content {
  max-width: 480px; /* Constrain on desktop */
  margin: 0 auto;
}

.book-btn {
  width: 100%;
  height: 56px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(251, 146, 60, 0.3); /* Shadow primary */
  transition: transform 0.1s, background-color 0.2s;
}

.book-btn:hover {
  background-color: var(--color-primary-strong);
}

.book-btn:active {
  transform: scale(0.98);
}

.btn-icon {
  font-size: 24px;
}

/* Desktop Responsiveness */
@media (min-width: 768px) {
  .hero-image {
    min-height: 500px;
    background-position: center 30%;
  }

  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .feature-card.wide {
    grid-column: span 1;
    flex-direction: column;
    text-align: center;
    justify-content: flex-start;
  }
}

@media (min-width: 1024px) {
  .main-content {
     padding: 24px;
  }

  .hero-text h2 {
    font-size: 3rem;
  }
  
  .services-scroll {
    flex-wrap: wrap;
    justify-content: center;
    overflow-x: visible;
  }
  
  .service-card {
    width: 220px;
  }
  
  .how-it-works {
    padding: 48px;
  }
  
  .steps {
    flex-direction: row;
    justify-content: space-between;
    padding-left: 0;
    gap: 0;
  }
  
  .step-line {
    top: 27px; /* Align with number center vertically */
    left: 48px; 
    right: 48px;
    width: auto;
    height: 2px;
    bottom: auto;
  }
  
  .step {
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 300px;
  }
  
  .step-number {
    width: 32px;
    height: 32px;
    font-size: 1rem;
    margin-bottom: 12px;
  }
}
</style>
