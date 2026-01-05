<script setup>
import { defineEmits, onMounted } from 'vue'
import { useThemeStore } from '../stores/theme'

const emit = defineEmits(['next'])
const themeStore = useThemeStore()

const startBooking = () => {
  emit('next')
}

const toggleTheme = () => {
  themeStore.toggle()
}

onMounted(() => {
  themeStore.init()
})
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
        
        <nav class="desktop-nav">
          <a href="#services" class="nav-link">Services</a>
          <a href="#how-it-works" class="nav-link">How it Works</a>
          <a href="#" class="nav-link">About Us</a>
          <button class="login-btn">Log in</button>
        </nav>

        <div class="header-actions">
          <button class="btn-theme" @click="toggleTheme" title="Cambiar tema">
            <span class="material-symbols-outlined">
              {{ themeStore.current === 'light' ? 'dark_mode' : 'light_mode' }}
            </span>
          </button>
          <button class="book-btn-nav desktop-only" @click="startBooking">
            <span>Book Now</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
          <button class="mobile-menu-btn md-hidden">
            <span class="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <!-- Hero Section -->
      <section class="hero-container">
        <div class="hero">
          <div class="hero-image" data-alt="A happy golden retriever dog receiving a checkup from a vet">
            <div class="hero-overlay">
              <div class="hero-text">
                <div class="badge">
                  <span class="material-symbols-outlined badge-icon">verified</span>
                  <span class="badge-text">Certified Vets</span>
                </div>
                <h2>Expert Vet Care, Right <br class="desktop-only"/>at Your Doorstep</h2>
                <p>Professional home check-ups and loving petsitting services without the travel stress.</p>
                <div class="hero-cta">
                  <button class="btn-primary-lg" @click="startBooking">
                    <span>Book a Visit</span>
                    <span class="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Choose Section -->
      <section class="why-choose section-padding">
        <div class="content-container">
          <div class="section-header centered">
            <h2>Why choose home care?</h2>
            <p>We bring the clinic to your living room, ensuring your pet stays comfortable and happy in their own environment.</p>
          </div>
          <div class="features-grid">
          <div class="feature-card group">
            <div class="feature-icon-wrapper accent-green">
              <span class="material-symbols-outlined feature-icon">home</span>
            </div>
            <div class="feature-info">
              <h3>Stress-Free</h3>
              <p>No car rides or waiting rooms. Keep your pet calm in their safe space.</p>
            </div>
          </div>
          <div class="feature-card group">
            <div class="feature-icon-wrapper accent-blue">
              <span class="material-symbols-outlined feature-icon">verified_user</span>
            </div>
            <div class="feature-info">
              <h3>Certified Pros</h3>
              <p>Fully licensed vets & sitters with years of experience and love for animals.</p>
            </div>
          </div>
          <div class="feature-card group">
            <div class="feature-icon-wrapper accent-gold">
              <span class="material-symbols-outlined feature-icon">schedule</span>
            </div>
            <div class="feature-info">
              <h3>Flexible Time</h3>
              <p>Book appointments 7 days a week, 8am-8pm. We work around your schedule.</p>
            </div>
          </div>
        </div>
        </div>
      </section>

      <!-- How It Works & Services Grid -->
      <div class="desktop-split-grid section-padding-bg">
        <!-- How It Works Section -->
        <section id="how-it-works" class="how-it-works-inline">
          <h2>How It Works</h2>
          <div class="steps-vertical">
            <div class="step-connector"></div>
            <div class="step">
              <div class="step-number-circle">1</div>
              <div class="step-content">
                <h3>Create Profile</h3>
                <p>Sign up and tell us about your pet's needs, behavior, and medical history so we can match you best.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number-circle secondary-70">2</div>
              <div class="step-content">
                <h3>Select Service</h3>
                <p>Choose from check-ups, vaccinations, or pet sitting and pick a time slot that works for you.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number-circle secondary-40">3</div>
              <div class="step-content">
                <h3>Vet Arrives</h3>
                <p>Our professional comes to your door fully equipped. Relax while we provide top-tier care.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Services Section -->
        <section id="services" class="services-inline">
          <h2>Our Services</h2>
          <div class="services-grid-compact">
            <div class="service-card-compact">
              <div class="service-icon-circle">
                <span class="material-symbols-outlined">medical_services</span>
              </div>
              <h3>Wellness Check</h3>
              <p>Full body exam</p>
              <div class="service-meta">
                <span class="price-txt">$45+</span>
                <span class="duration-txt">
                  <span class="material-symbols-outlined icon-xs">schedule</span>
                  30 mins
                </span>
              </div>
            </div>

            <div class="service-card-compact">
              <div class="service-icon-circle">
                <span class="material-symbols-outlined">pets</span>
              </div>
              <h3>Pet Sitting</h3>
              <p>Companionship & feeding</p>
              <div class="service-meta">
                <span class="price-txt">$30+</span>
                <span class="duration-txt">
                  <span class="material-symbols-outlined icon-xs">schedule</span>
                  60 mins
                </span>
              </div>
            </div>

            <div class="service-card-compact">
              <div class="service-icon-circle">
                <span class="material-symbols-outlined">vaccines</span>
              </div>
              <h3>Vaccinations</h3>
              <p>Core & non-core shots</p>
              <div class="service-meta">
                <span class="price-txt">$35+</span>
                <span class="duration-txt">
                  <span class="material-symbols-outlined icon-xs">schedule</span>
                  15 mins
                </span>
              </div>
            </div>

            <div class="service-card-compact">
              <div class="service-icon-circle">
                <span class="material-symbols-outlined">content_cut</span>
              </div>
              <h3>Grooming</h3>
              <p>Nail trimming & care</p>
              <div class="service-meta">
                <span class="price-txt">$25+</span>
                <span class="duration-txt">
                  <span class="material-symbols-outlined icon-xs">schedule</span>
                  20 mins
                </span>
              </div>
            </div>
          </div>
          <div class="view-all-link">
            <a href="#">View all services <span class="material-symbols-outlined">arrow_forward</span></a>
          </div>
        </section>
      </div>

      <!-- CTA Section -->
      <section class="final-cta">
        <div class="content-container">
          <div class="cta-banner">
            <div class="cta-decoration-1"></div>
            <div class="cta-decoration-2"></div>
            <div class="cta-content">
              <h2>Ready to skip the waiting room?</h2>
              <p>Join thousands of happy pets and owners who have switched to stress-free home care. First visit is 10% off!</p>
              <button class="btn-white" @click="startBooking">
                <span>Book Your First Visit</span>
              </button>
              <p class="cta-note">No credit card required for booking</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="brand">
              <div class="logo small">
                <span class="material-symbols-outlined icon">pets</span>
              </div>
              <h3>VetHome Care</h3>
            </div>
            <p>Reimagining veterinary care with comfort, convenience, and compassion right in your own home.</p>
            <div class="social-links">
              <a href="#" class="social-icon">F</a>
              <a href="#" class="social-icon">I</a>
              <a href="#" class="social-icon">T</a>
            </div>
          </div>
          
          <div class="footer-links">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Wellness Exams</a></li>
              <li><a href="#">Vaccinations</a></li>
              <li><a href="#">Sick Visits</a></li>
              <li><a href="#">Pet Sitting</a></li>
            </ul>
          </div>

          <div class="footer-links">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Vets</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div class="footer-contact">
            <h4>Contact</h4>
            <div class="contact-item">
              <span class="material-symbols-outlined">location_on</span>
              <span>123 Pet Lover Lane, SF</span>
            </div>
            <div class="contact-item">
              <span class="material-symbols-outlined">phone</span>
              <span>(555) 123-4567</span>
            </div>
            <div class="contact-item">
              <span class="material-symbols-outlined">email</span>
              <span>hello@vethomecare.com</span>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>© 2023 VetHome Care. All rights reserved.</p>
          <div class="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>

    <div class="bottom-bar mobile-only">
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
/* Base & Layout */
.landing-page {
  padding-bottom: 0;
  max-width: 100%;
  overflow-x: hidden;
  background: var(--color-background);
}

.section-padding { padding: 64px 16px; }
.section-padding-bg { 
  padding: 64px 16px;
  background: var(--color-surface-muted);
}

.max-w-7xl {
  max-width: 1280px;
  margin: 0 auto;
}

.content-container {
  max-width: 1280px;
  margin: 0 auto;
}

/* Header & Nav */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  background: color-mix(in srgb, var(--color-background) 95%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  transition: background 0.4s ease, border-color 0.4s ease;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 72px;
  max-width: 1280px;
  margin: 0 auto;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 40px;
  height: 40px;
  background: color-mix(in srgb, var(--color-primary) 15%, transparent);
  color: var(--color-primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo.small {
  width: 32px;
  height: 32px;
}

.brand h1, .brand h3 {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text);
  margin: 0;
}

.desktop-nav {
  display: none;
  gap: 32px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  font-weight: 600;
  transition: color 0.2s;
}

.nav-link:hover { color: var(--color-primary); }

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-theme {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
}

.book-btn-nav {
  display: none;
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 999px;
  font-weight: 1000;
  gap: 8px;
  cursor: pointer;
  align-items: center;
}

.login-btn {
  background: none;
  border: none;
  color: var(--color-primary);
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
}

/* Hero Section */
.hero-container {
  padding: 88px 16px 24px;
  max-width: 1280px;
  margin: 0 auto;
}

.hero {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  height: 500px;
  position: relative;
}

.hero-image {
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent), 
              url("https://lh3.googleusercontent.com/aida-public/AB6AXuBje74NdZ5MPfZiJMrfVZWO0mh1cL-eqZGmQbHPIQWB7zGGzrpx0fxXK1X1SiKEzOrwRBNoxGgEW7jYjak-nVHHNZtW6o9gaL5DH2hlX9nmRzXvV0ioC9g8sd7QgaS59gFu7vDDTTmmcqOEAycFqndovsaCQFfWeWRLsjyDV9jI2eHIVNur6Ykvv2DCQBiG8RpvZDeAwn9n0JIw9weBjHpiliyYQGiL12AScj8uJjdxazKX4ZRHUaHo121UzHm3QJ7m49vONULsIly5");
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
}

.hero-text {
  max-width: 800px;
  color: white;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(8px);
  padding: 4px 16px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.3);
  margin-bottom: 16px;
}

.badge-text { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }

.hero-text h2 {
  font-size: 2.5rem;
  line-height: 1.1;
  font-weight: 900;
  margin-bottom: 16px;
}

.hero-text p {
  font-size: 1.125rem;
  color: rgba(255,255,255,0.9);
  font-weight: 400;
  margin-bottom: 32px;
}

.btn-primary-lg {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 999px;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
}

/* Why Choose */
.why-choose {
  padding: 64px 16px 80px;
}

.section-header.centered { text-align: center; margin-bottom: 56px; }
.section-header h2 { font-size: 2rem; font-weight: 800; margin-bottom: 12px; }
.section-header p { color: var(--color-text-muted); max-width: 600px; margin: 0 auto; }

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

.feature-card {
  background: var(--color-surface);
  padding: 40px 32px;
  border-radius: 24px;
  border: 1px solid var(--color-border);
  text-align: center;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
}

.feature-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.feature-icon { font-size: 32px; }

.accent-green { background: color-mix(in srgb, #5B9FA1 15%, transparent); color: #5B9FA1; }
.accent-blue { background: color-mix(in srgb, #6DA7C0 15%, transparent); color: #6DA7C0; }
.accent-gold { background: color-mix(in srgb, var(--color-primary) 15%, transparent); color: var(--color-primary); }

body[data-theme="dark"] .accent-green { background: color-mix(in srgb, #88D1D3 20%, transparent); color: #88D1D3; }
body[data-theme="dark"] .accent-blue { background: color-mix(in srgb, #91C8E0 20%, transparent); color: #91C8E0; }
body[data-theme="dark"] .accent-gold { background: color-mix(in srgb, var(--color-primary) 20%, transparent); color: var(--color-primary); }

.feature-info h3 { font-size: 1.25rem; font-weight: 800; margin-bottom: 12px; }
.feature-info p { color: var(--color-text-muted); font-size: 0.875rem; line-height: 1.6; }

/* Desktop Split Grid */
.desktop-split-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 64px;
}

.how-it-works-inline h2, .services-inline h2 {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 40px;
}

/* Steps Vertical */
.steps-vertical {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.step-connector {
  position: absolute;
  left: 19px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: var(--color-border);
}

.step {
  display: flex;
  gap: 24px;
  position: relative;
  z-index: 1;
}

.step-number-circle {
  width: 40px;
  height: 40px;
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  flex-shrink: 0;
}

.secondary-70 { opacity: 0.7; }
.secondary-40 { opacity: 0.4; }

.step-content h3 { font-size: 1.125rem; font-weight: 800; margin-bottom: 8px; }
.step-content p { color: var(--color-text-muted); font-size: 0.875rem; line-height: 1.6; }

/* Services Grid Compact */
.services-grid-compact {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.service-card-compact {
  background: var(--color-surface);
  padding: 24px;
  border-radius: 24px;
  border: 1px solid var(--color-border);
  text-align: center;
  transition: transform 0.3s ease;
}

.service-card-compact:hover {
  transform: translateY(-4px);
}

.service-icon-circle {
  width: 56px;
  height: 56px;
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
  color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.service-card-compact h3 { font-size: 1.125rem; font-weight: 800; margin-bottom: 4px; }
.service-card-compact p { font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 16px; }

.service-meta {
  border-top: 1px solid var(--color-border);
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.price-txt { font-size: 1.25rem; font-weight: 800; color: var(--color-primary); }
.duration-txt { font-size: 0.75rem; color: var(--color-text-muted); display: flex; align-items: center; gap: 4px; }
.icon-xs { font-size: 14px; }

.view-all-link { margin-top: 24px; }
.view-all-link a {
  color: var(--color-primary);
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Final CTA */
.final-cta { 
  padding: 64px 16px 80px; 
}

.final-cta .content-container {
  max-width: 1280px;
  margin: 0 auto;
}

.cta-banner {
  background: var(--color-primary);
  border-radius: 24px;
  padding: 64px 32px;
  text-align: center;
  position: relative;
  overflow: hidden;
  color: white;
}

.cta-content { position: relative; z-index: 2; }
.cta-banner h2 { font-size: 2rem; font-weight: 900; margin-bottom: 16px; }
.cta-banner p { font-size: 1.125rem; margin-bottom: 32px; opacity: 0.9; }

.btn-white {
  background: white;
  color: var(--color-primary);
  border: none;
  padding: 16px 40px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 1.125rem;
  cursor: pointer;
}

.cta-note { margin-top: 24px; font-size: 0.875rem; opacity: 0.7; }

/* Footer */
.footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 64px 16px 32px;
}

.footer-container { max-width: 1280px; margin: 0 auto; }
.footer-top {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.footer-brand p { color: var(--color-text-muted); font-size: 0.875rem; line-height: 1.6; margin: 16px 0; }
.social-links { display: flex; gap: 12px; }
.social-icon {
  width: 36px;
  height: 36px;
  background: var(--color-surface-muted);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: bold;
  color: var(--color-text);
}

.footer-links h4, .footer-contact h4 { margin-bottom: 24px; font-weight: 800; }
.footer-links ul { list-style: none; padding: 0; }
.footer-links li { margin-bottom: 12px; }
.footer-links a { text-decoration: none; color: var(--color-text-muted); font-size: 0.875rem; }

.footer-contact { display: flex; flex-direction: column; gap: 16px; }
.contact-item { display: flex; gap: 12px; color: var(--color-text-muted); font-size: 0.875rem; }
.contact-item span:first-child { color: var(--color-primary); }

.footer-bottom {
  border-top: 1px solid var(--color-border);
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.legal-links { display: flex; gap: 24px; }
.legal-links a { text-decoration: none; color: inherit; }

/* Mobile Utilities */
.desktop-only { display: none !important; }
.mobile-only { display: block; }
.md-hidden { display: block; }

.bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: var(--color-background);
  border-top: 1px solid var(--color-border);
  padding: 16px;
  z-index: 90;
}

.book-btn {
  width: 100%;
  height: 56px;
  background: var(--color-primary);
  color: white;
  border-radius: 12px;
  border: none;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* Responsive Overrides */
@media (min-width: 768px) {
  .features-grid { 
    grid-template-columns: repeat(3, 1fr); 
    gap: 32px;
  }
  .services-grid-compact { grid-template-columns: repeat(2, 1fr); }
  .footer-top { grid-template-columns: repeat(2, 1fr); }
  
  .feature-card {
    padding: 48px 40px;
  }
}

@media (min-width: 1024px) {
  .desktop-only { display: flex !important; }
  .mobile-only { display: none !important; }
  .md-hidden { display: none !important; }
  
  .desktop-nav { display: flex; }
  .book-btn-nav { display: flex; }
  
  .hero { height: 600px; }
  .hero-text h2 { font-size: 4rem; }
  
  .why-choose {
    padding: 80px 16px 96px;
  }
  
  .section-header.centered { 
    margin-bottom: 64px; 
  }
  
  .features-grid { 
    gap: 40px;
  }
  
  .final-cta {
    padding: 80px 16px 96px;
  }
  
  .cta-banner {
    padding: 80px 48px;
  }
  
  .desktop-split-grid { 
    grid-template-columns: 1fr 1.2fr; 
    gap: 80px; 
    max-width: 100%;
    padding: 80px 64px 96px;
  }
  
  .footer-top { grid-template-columns: 1.5fr 1fr 1fr 1.2fr; }
  .footer-bottom { flex-direction: row; justify-content: space-between; }
}
</style>
