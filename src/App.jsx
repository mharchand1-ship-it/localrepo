import { useState, useEffect } from 'react';
import './index.css';
import ParticleBackground from './ParticleBackground';

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [activeBlog, setActiveBlog] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [formSent, setFormSent] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const typingWords = ['Full Stack Developer', 'React.js Expert', 'WordPress Developer', 'Problem Solver'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  useEffect(() => {
    // Typing animation
    let timeout;
    const type = () => {
      const current = typingWords[wordIndex % typingWords.length];
      if (isDeleting) {
        setTypedText(current.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(current.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 60 : 100;

      if (!isDeleting && charIndex === current.length) {
        speed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex++;
        speed = 400;
      }
      timeout = setTimeout(type, speed);
    };
    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
        setShowTop(true);
      } else {
        header.classList.remove('scrolled');
        setShowTop(false);
      }
      const reveals = document.querySelectorAll('.reveal');
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          reveals[i].classList.add('active');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Apply dark/light class to body
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const skillsData = [
    { id: 'react', icon: 'fa-brands fa-react', title: 'React.js', short: 'Modern web applications.', level: 90, details: 'I build interactive and dynamic single-page applications using React.js. I am proficient in hooks, state management, and modern component-driven architecture to create fast and scalable user interfaces.' },
    { id: 'wordpress', icon: 'fa-brands fa-wordpress', title: 'WordPress', short: 'Custom CMS solutions.', level: 85, details: 'I create fully custom WordPress themes and plugins. I can build scalable, easy-to-manage content management systems tailored to your business needs, ensuring high performance and SEO readiness.' },
    { id: 'webdev', icon: 'fa-solid fa-code', title: 'Web Development', short: 'Building responsive websites.', level: 92, details: 'I build modern, responsive, and high-performance websites using HTML5, CSS3, and JavaScript. I focus on creating seamless user experiences that work beautifully across all devices.' },
    { id: 'problem', icon: 'fa-solid fa-lightbulb', title: 'Problem Solving', short: 'Efficient solutions.', level: 88, details: 'I excel at breaking down complex problems into manageable tasks. Whether it is debugging tricky code or optimizing algorithms, I find creative and efficient solutions.' },
    { id: 'backend', icon: 'fa-solid fa-server', title: 'Backend Dev', short: 'Node.js & Databases.', level: 75, details: 'I build robust and secure server-side applications using Node.js and Express. I design efficient databases, write RESTful APIs, and ensure seamless communication between the frontend and backend.' }
  ];

  const blogData = [
    { id: 1, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', date: 'July 14, 2026', title: 'The Future of Web Design', shortDesc: 'Exploring how glassmorphism and micro-animations are shaping new web experiences...', fullArticle: 'Web design is constantly evolving. In recent years, we have seen a massive shift towards more immersive and interactive experiences. Glassmorphism, which uses blurred, semi-transparent backgrounds, creates a sense of depth and hierarchy. Coupled with micro-animations that respond to user input, websites are feeling more alive than ever. In this article, we dive deep into how you can implement these techniques using modern CSS and React to create truly memorable user interfaces.' },
    { id: 2, image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', date: 'June 28, 2026', title: 'Mastering React Performance', shortDesc: 'Top tips for ensuring your React apps run flawlessly at 60fps across all devices...', fullArticle: 'Performance is a feature. In React, unnecessary re-renders can quickly degrade the user experience, especially on mobile devices. By mastering hooks like useMemo and useCallback, and understanding how the virtual DOM works, developers can ensure their applications remain buttery smooth. We also explore code-splitting with React.lazy and how to properly optimize images and assets in a Vite-based workflow.' },
    { id: 3, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', date: 'June 5, 2026', title: 'WordPress vs React: Which to Choose?', shortDesc: 'A comprehensive guide to choosing the right technology for your next project...', fullArticle: 'When starting a new web project, one of the most critical decisions is choosing the right technology. WordPress remains the king of content management, powering over 43% of all websites. However, React offers unparalleled flexibility and performance for complex, interactive applications. In this article, we break down the pros and cons of each approach to help you make the right decision for your specific use case and business goals.' }
  ];

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api/contact";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data._subject,
          message: data.message
        })
      });
      if (response.ok) {
        setFormSent(true);
        setTimeout(() => setFormSent(false), 4000);
        e.target.reset();
      } else {
        alert("Error saving message to database. Please check your inputs.");
      }
    } catch(err) {
      alert("Network error! Is the backend server running?");
    }
  };

  return (
    <>
      <ParticleBackground />

      {/* Back to Top Button */}
      {showTop && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}

      <header>
        <nav>
          <div className="logo-container">
            <i className="fa-brands fa-connectdevelop logo-icon"></i>
            <div className="logo">MC.</div>
          </div>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('#about'); }}>About</a></li>
            <li><a href="#qualifications" onClick={(e) => { e.preventDefault(); scrollTo('#qualifications'); }}>Qualifications</a></li>
            <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('#skills'); }}>Skills</a></li>
            <li><a href="#blog" onClick={(e) => { e.preventDefault(); scrollTo('#blog'); }}>Blog</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}>Contact</a></li>
            <li className="nav-auth">
              <button
                className="theme-toggle"
                onClick={() => setDarkMode(!darkMode)}
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? (
                  <><i className="fa-solid fa-sun"></i> Light</>
                ) : (
                  <><i className="fa-solid fa-moon"></i> Dark</>
                )}
              </button>
            </li>
          </ul>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="hero reveal active">
          <div className="hero-content">
            <h1>Hi, I'm <span className="highlight">Mahar Chand</span></h1>
            <p className="tagline">
              I'm a <span className="typed-text">{typedText}</span><span className="cursor">|</span>
            </p>
            <div className="cta-buttons">
              <a href="#contact" className="btn primary" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}>Hire Me <i className="fa-solid fa-paper-plane"></i></a>
              <a href="#skills" className="btn secondary" onClick={(e) => { e.preventDefault(); scrollTo('#skills'); }}>View Work <i className="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
          <div className="hero-image-container">
            <div className="hero-image">
              <img
                src="/profile.png"
                alt="Mahar Chand"
                id="profile-pic"
              />
              <div className="glow-wrap"></div>
              <div className="floating-badge badge-1"><i className="fa-brands fa-react"></i></div>
              <div className="floating-badge badge-2"><i className="fa-brands fa-wordpress"></i></div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="about reveal">
          <h2>About <span className="highlight">Me</span></h2>
          <div className="about-container">
            <div className="about-text">
              <h3>Passionate Innovator & Creator</h3>
              <p>I am a passionate professional dedicated to creating amazing digital experiences. I turn complex ideas into elegant, user-friendly realities.</p>
              <p>With a strong foundation in modern web technologies like React.js and WordPress, I build applications that are not only visually spectacular but also highly performant and scalable.</p>
              <div className="about-tags">
                <span className="tag"><i className="fa-brands fa-react"></i> React.js</span>
                <span className="tag"><i className="fa-brands fa-wordpress"></i> WordPress</span>
                <span className="tag"><i className="fa-brands fa-js"></i> JavaScript</span>
                <span className="tag"><i className="fa-brands fa-html5"></i> HTML5</span>
                <span className="tag"><i className="fa-brands fa-css3-alt"></i> CSS3</span>
              </div>
            </div>
            <div className="about-stats">
              <div className="stat-box">
                <h4>3+</h4>
                <p>Years Experience</p>
              </div>
              <div className="stat-box">
                <h4>50+</h4>
                <p>Projects Done</p>
              </div>
              <div className="stat-box">
                <h4>20+</h4>
                <p>Happy Clients</p>
              </div>
              <div className="stat-box">
                <h4>5★</h4>
                <p>Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* QUALIFICATIONS */}
        <section id="qualifications" className="qualifications reveal">
          <h2>My <span className="highlight">Qualifications</span></h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-badge">🎓 Education</span>
                <h3>Intermediate (ICS)</h3>
                <h4>Self-taught Frontend Web Developer</h4>
                <p>I have completed Intermediate (ICS) and am a self-taught Frontend Web Developer.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-badge">💻 Technical Skills</span>
                <h3>Web Technologies</h3>
                <h4>Frontend & CMS</h4>
                <p>HTML5, CSS3, JavaScript (ES6+), React.js, Redux Toolkit, Tailwind CSS, Git & GitHub, REST API Integration, and WordPress.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-badge">🌐 Professional Platforms</span>
                <h3>Freelance Profiles</h3>
                <h4>Active & Growing</h4>
                <p>Fiverr, Upwork, LinkedIn, and GitHub.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-badge">💼 Professional Summary</span>
                <h3>Career Overview</h3>
                <h4>Showcase & Connect</h4>
                <p>I actively maintain professional profiles on Fiverr, Upwork, LinkedIn, and GitHub to showcase my work, connect with clients, and continue growing my career.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="skills reveal">
          <h2>My <span className="highlight">Skills</span></h2>
          <p className="section-subtitle">Click on any skill card to open detailed view</p>
          <div className="skills-container">
            {skillsData.map(skill => (
              <div className="skill-card" key={skill.id} onClick={() => setActiveModal(skill)}>
                <i className={skill.icon}></i>
                <h3>{skill.title}</h3>
                <p>{skill.short}</p>
                <div className="skill-bar-wrap">
                  <div className="skill-bar" style={{ width: `${skill.level}%` }}></div>
                </div>
                <span className="skill-percent">{skill.level}%</span>
                <span className="read-more">Open Details <i className="fa-solid fa-arrow-right"></i></span>
              </div>
            ))}
          </div>
        </section>

        {/* BLOG */}
        <section id="blog" className="blog reveal">
          <h2>Latest <span className="highlight">Blog</span></h2>
          <p className="section-subtitle">Click on any article to read full text</p>
          <div className="blog-container">
            {blogData.map(blog => (
              <div className="blog-card" key={blog.id} onClick={() => setActiveBlog(blog)}>
                <div className="blog-img" style={{ backgroundImage: `url(${blog.image})` }}>
                  <span className="blog-tag">Article</span>
                </div>
                <div className="blog-content">
                  <span className="blog-date"><i className="fa-regular fa-calendar"></i> {blog.date}</span>
                  <h3>{blog.title}</h3>
                  <p>{blog.shortDesc}</p>
                  <span className="blog-link">Read Article <i className="fa-solid fa-chevron-right"></i></span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact reveal">
          <h2>Get In <span className="highlight">Touch</span></h2>
          <p className="section-subtitle">I'd love to hear from you. Send me a message!</p>

          <div className="social-links">
            <a href="https://facebook.com/search/top/?q=MAHAR%20CHAND" target="_blank" rel="noreferrer" className="social-icon facebook"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/alone881m/?hl=en" target="_blank" rel="noreferrer" className="social-icon instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.linkedin.com/in/mhar-chand-ab087b2bb/" target="_blank" rel="noreferrer" className="social-icon linkedin"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="https://github.com/mharchand1-ship-it/localrepo" target="_blank" rel="noreferrer" className="social-icon github"><i className="fa-brands fa-github"></i></a>
            <a href="https://wa.me/923312398310" target="_blank" rel="noreferrer" className="social-icon whatsapp"><i className="fa-brands fa-whatsapp"></i></a>
          </div>

          <div className="contact-grid">
            <div className="contact-info-side">
              <div className="contact-item">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:mharchand22@gmail.com">mharchand22@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+923312398310">+923312398310</a>
                </div>
              </div>
              <div className="contact-item">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h4>Location</h4>
                  <p>Pakistan 🇵🇰</p>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              {formSent && <div className="form-success" style={{ color: 'green', marginBottom: '1rem', fontWeight: 'bold' }}><i className="fa-solid fa-circle-check"></i> Message sent successfully!</div>}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" name="name" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label>Your Email</label>
                  <input type="email" name="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" name="_subject" placeholder="Project Inquiry..." required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" rows="5" placeholder="Tell me about your project..." required></textarea>
              </div>
              <button type="submit" className="btn primary" style={{ width: '100%', justifyContent: 'center' }}>
                Send Message <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <i className="fa-brands fa-connectdevelop logo-icon"></i>
            <span className="logo">MC.</span>
          </div>
          <p className="footer-tagline">Crafting digital experiences with passion & precision.</p>
          <div className="footer-socials">
            <a href="https://facebook.com/search/top/?q=MAHAR%20CHAND" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/alone881m/?hl=en" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.linkedin.com/in/mhar-chand-ab087b2bb/" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="https://github.com/mharchand1-ship-it/localrepo" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>
            <a href="https://wa.me/923312398310" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
          </div>
          <p className="footer-copy">&copy; 2026 Mahar Chand. All rights reserved. Built using React.js</p>
        </div>
      </footer>

      {/* Skill Modal */}
      <div className={`modal-overlay ${activeModal ? 'active' : ''}`} onClick={() => setActiveModal(null)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          {activeModal && (
            <>
              <button className="close-modal" onClick={() => setActiveModal(null)}><i className="fa-solid fa-xmark"></i></button>
              <i className={`${activeModal.icon} modal-icon`}></i>
              <h2>{activeModal.title}</h2>
              <div className="modal-divider"></div>
              <p className="modal-text">{activeModal.details}</p>
              <div className="modal-level">
                <span>Proficiency: {activeModal.level}%</span>
                <div className="skill-bar-wrap" style={{ marginTop: '0.5rem' }}>
                  <div className="skill-bar" style={{ width: `${activeModal.level}%` }}></div>
                </div>
              </div>
              <button className="btn primary" style={{ marginTop: '2rem', justifyContent: 'center' }} onClick={() => setActiveModal(null)}>Awesome!</button>
            </>
          )}
        </div>
      </div>

      {/* Blog Modal */}
      <div className={`modal-overlay ${activeBlog ? 'active' : ''}`} onClick={() => setActiveBlog(null)}>
        <div className="modal-content blog-modal-content" onClick={e => e.stopPropagation()}>
          {activeBlog && (
            <>
              <button className="close-modal" onClick={() => setActiveBlog(null)}><i className="fa-solid fa-xmark"></i></button>
              <div className="blog-modal-img" style={{ backgroundImage: `url(${activeBlog.image})` }}></div>
              <span className="blog-date" style={{ marginTop: '1.5rem', display: 'block' }}>{activeBlog.date}</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', marginTop: '0.5rem' }}>{activeBlog.title}</h2>
              <div className="modal-divider"></div>
              <p className="modal-text" style={{ textAlign: 'left' }}>{activeBlog.fullArticle}</p>
              <button className="btn secondary" style={{ marginTop: '2rem', justifyContent: 'center', width: '100%' }} onClick={() => setActiveBlog(null)}>Close Article</button>
            </>
          )}
        </div>
      </div>

    </>
  );
}

export default App;
