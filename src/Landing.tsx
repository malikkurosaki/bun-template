import clientRoutes from "./clientRoutes";

export function LandingPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NexaFlow - Modern AI Solutions</title>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            overflow-x: hidden;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          /* Navbar */
          nav {
            padding: 20px 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo {
            font-size: 24px;
            font-weight: 700;
            background: linear-gradient(45deg, #fff, #e0e0e0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .nav-links {
            display: flex;
            gap: 30px;
            list-style: none;
          }

          .nav-links a {
            color: #fff;
            text-decoration: none;
            font-weight: 500;
            transition: opacity 0.3s ease;
          }

          .nav-links a:hover {
            opacity: 0.7;
          }

          .cta-nav {
            padding: 10px 24px;
            background: #260c668a;
            color: #667eea;
            border-radius: 25px;
            font-weight: 600;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .cta-nav:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }

          /* Hero Section */
          .hero {
            padding: 150px 0 100px;
            text-align: center;
            position: relative;
          }

          .hero h1 {
            font-size: 64px;
            font-weight: 800;
            margin-bottom: 20px;
            line-height: 1.2;
            animation: fadeInUp 1s ease;
          }

          .hero p {
            font-size: 20px;
            margin-bottom: 40px;
            opacity: 0.9;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            animation: fadeInUp 1s ease 0.2s backwards;
          }

          .hero-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            animation: fadeInUp 1s ease 0.4s backwards;
          }

          .btn {
            padding: 16px 40px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
          }

          .btn-primary {
            background: #fff;
            color: #667eea;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          }

          .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
          }

          .btn-secondary {
            background: transparent;
            color: #fff;
            border: 2px solid #fff;
          }

          .btn-secondary:hover {
            background: #fff;
            color: #667eea;
          }

          /* Features Section */
          .features {
            padding: 100px 0;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
          }

          .features h2 {
            text-align: center;
            font-size: 48px;
            margin-bottom: 60px;
            font-weight: 700;
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
          }

          .feature-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
          }

          .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          }

          .feature-icon {
            font-size: 48px;
            margin-bottom: 20px;
            display: inline-block;
            animation: float 3s ease-in-out infinite;
          }

          .feature-card:nth-child(2) .feature-icon {
            animation-delay: 0.5s;
          }

          .feature-card:nth-child(3) .feature-icon {
            animation-delay: 1s;
          }

          .feature-card h3 {
            font-size: 24px;
            margin-bottom: 15px;
          }

          .feature-card p {
            opacity: 0.9;
            line-height: 1.6;
          }

          /* Stats Section */
          .stats {
            padding: 80px 0;
            text-align: center;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
          }

          .stat-item h3 {
            font-size: 48px;
            font-weight: 800;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #fff, #f0f0f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .stat-item p {
            opacity: 0.9;
            font-size: 18px;
          }

          /* Footer */
          footer {
            padding: 60px 0;
            text-align: center;
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
          }

          footer p {
            opacity: 0.8;
            margin-bottom: 20px;
          }

          .social-links {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-top: 30px;
          }

          .social-links a {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            text-decoration: none;
            font-size: 20px;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .social-links a:hover {
            background: #fff;
            color: #667eea;
            transform: translateY(-5px);
          }

          /* Animations */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          /* Responsive */
          @media (max-width: 768px) {
            .nav-links {
              display: none;
            }

            .hero h1 {
              font-size: 40px;
            }

            .hero p {
              font-size: 18px;
            }

            .hero-buttons {
              flex-direction: column;
              align-items: center;
            }

            .features h2 {
              font-size: 36px;
            }
          }
        `}</style>
      </head>
      <body>
        <nav>
          <div className="container">
            <div className="nav-content">
              <div className="logo">NexaFlow</div>
              <ul className="nav-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href={clientRoutes["/dashboard"]} className="cta-nav">Get Started</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <section className="hero">
          <div className="container">
            <h1>Transform Your Workflow with AI</h1>
            <p>Powerful automation and intelligent insights to boost your productivity and streamline operations</p>
            <div className="hero-buttons">
              <a href="#" className="btn btn-primary">Start Free Trial</a>
              <a href="#" className="btn btn-secondary">Watch Demo</a>
            </div>
          </div>
        </section>

        <section className="features" id="features">
          <div className="container">
            <h2>Why Choose NexaFlow?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Lightning Fast</h3>
                <p>Experience blazing fast performance with our optimized infrastructure and cutting-edge technology</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure & Reliable</h3>
                <p>Enterprise-grade security with 99.9% uptime guarantee to keep your data safe and accessible</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Smart Analytics</h3>
                <p>Gain actionable insights with AI-powered analytics and make data-driven decisions effortlessly</p>
              </div>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <h3>50K+</h3>
                <p>Active Users</p>
              </div>
              <div className="stat-item">
                <h3>99.9%</h3>
                <p>Uptime</p>
              </div>
              <div className="stat-item">
                <h3>24/7</h3>
                <p>Support</p>
              </div>
              <div className="stat-item">
                <h3>150+</h3>
                <p>Integrations</p>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div className="container">
            <div className="logo">NexaFlow</div>
            <p>Empowering businesses with intelligent automation</p>
            <div className="social-links">
              <a href="#">𝕏</a>
              <a href="#">in</a>
              <a href="#">f</a>
            </div>
            <p style={{marginTop: '30px', fontSize: '14px'}}>© 2025 NexaFlow. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}