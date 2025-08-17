import React, { useEffect } from "react";
import {
  CheckSquare,
  BarChart3,
  Clock,
  Target,
  TrendingUp,
  Filter,
  Timer,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loader from "../Loader";

function App() {
  const router = useRouter();
  const { isLoading, error, user } = useUser();
  const handleSignIn = () => {
    router.push("/api/auth/login");
  };
  useEffect(() => {
    if (!isLoading && user) {
      router.push("/pomo");
    }
  }, [isLoading, user, router]);

  return (
    <>
      {!user && !isLoading && (
        <div className="app">
          {/* Navigation */}
          <nav className="navbar">
            <div className="nav-container">
              <div className="nav-content">
                <div className="nav-brand">
                  <div className="brand-icon">
                    <Timer size={20} />
                  </div>
                  <span className="brand-text">Pomodoro</span>
                </div>
                <div className="nav-links">
                  <a href="#features" className="nav-link">
                    Features
                  </a>
                  <a href="#how-it-works" className="nav-link">
                    How it Works
                  </a>
                  <a href="#benefits" className="nav-link">
                    Benefits
                  </a>
                  <button className="cta-button" onClick={handleSignIn}>
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="hero">
            <div className="container">
              <div className="hero-content">
                <div className="hero-text">
                  <div className="hero-badge">
                    <Star size={16} />
                    #1 Productivity App
                  </div>
                  <h1 className="hero-title">
                    Master Your
                    <span className="gradient-text">Productivity</span>
                  </h1>
                  <p className="hero-description">
                    Combine the power of Pomodoro technique with intelligent
                    task management and detailed analytics. Transform the way
                    you work and achieve your goals with laser focus.
                  </p>
                  <div className="hero-buttons">
                    <button className="primary-button" onClick={handleSignIn}>
                      Sign In
                      <ArrowRight size={20} />
                    </button>
                    <div className="button-wrapper">
                      <button className="secondary-button" disabled>
                        Guest Mode
                      </button>
                      <span className="coming-soon">Coming Soon</span>
                    </div>
                  </div>
                </div>
                <div className="hero-visual">
                  <div className="timer-card">
                    <div className="card-header">
                      <h3>Current Focus</h3>
                      <div className="status-indicator">
                        <div className="status-dot"></div>
                        Active
                      </div>
                    </div>
                    <div className="timer-display">
                      <div className="timer-time">25:00</div>
                      <div className="timer-label">Work Session</div>
                      <div className="progress-bar">
                        <div className="progress-fill"></div>
                      </div>
                      <div className="current-task">Design Homepage Layout</div>
                    </div>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <div className="stat-number blue">12</div>
                        <div className="stat-label">Sessions</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number green">8</div>
                        <div className="stat-label">Completed</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number purple">4h</div>
                        <div className="stat-label">Focused</div>
                      </div>
                    </div>
                  </div>
                  <div className="floating-icon">
                    <Zap size={32} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="features">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">
                  Everything You Need to Stay Focused
                </h2>
                <p className="section-description">
                  Three powerful tools working together to maximize your
                  productivity and help you achieve your goals.
                </p>
              </div>

              <div className="features-grid">
                <div className="feature-card blue">
                  <div className="feature-icon blue">
                    <CheckSquare size={32} />
                  </div>
                  <h3 className="feature-title">Smart Task Management</h3>
                  <p className="feature-description">
                    Create, organize, and track your tasks with intelligent
                    sorting and filtering. Never lose sight of what matters
                    most.
                  </p>
                  <ul className="feature-list">
                    <li>Create and delete tasks effortlessly</li>
                    <li>Advanced sorting and filtering</li>
                    <li>Priority-based organization</li>
                  </ul>
                </div>

                <div className="feature-card purple">
                  <div className="feature-icon purple">
                    <Clock size={32} />
                  </div>
                  <h3 className="feature-title">Pomodoro Timer</h3>
                  <p className="feature-description">
                    Stay focused with customizable Pomodoro sessions. Each task
                    gets its own timer for maximum productivity.
                  </p>
                  <ul className="feature-list">
                    <li>Customizable timer durations</li>
                    <li>Task-specific timers</li>
                    <li>Auto break reminders</li>
                  </ul>
                </div>

                <div className="feature-card green">
                  <div className="feature-icon green">
                    <BarChart3 size={32} />
                  </div>
                  <h3 className="feature-title">Analytics Dashboard</h3>
                  <p className="feature-description">
                    Visualize your productivity patterns with detailed charts
                    and insights. Track progress and optimize your workflow.
                  </p>
                  <ul className="feature-list">
                    <li>Task completion tracking</li>
                    <li>Interactive charts & graphs</li>
                    <li>Productivity insights</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="how-it-works">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">Simple Yet Powerful Workflow</h2>
                <p className="section-description">
                  Get started in minutes and transform your productivity with
                  our intuitive three-step process.
                </p>
              </div>

              <div className="steps-grid">
                <div className="step-item">
                  <div className="step-number blue">1</div>
                  <h3 className="step-title">Create Your Tasks</h3>
                  <p className="step-description">
                    Add your tasks and organize them by priority, project, or
                    any criteria that works for you. Our smart filters help you
                    stay organized.
                  </p>
                </div>

                <div className="step-item">
                  <div className="step-number purple">2</div>
                  <h3 className="step-title">Start Your Timer</h3>
                  <p className="step-description">
                    Select a task and start your customized Pomodoro session.
                    Stay focused for 25 minutes, then take a well-deserved
                    break.
                  </p>
                </div>

                <div className="step-item">
                  <div className="step-number green">3</div>
                  <h3 className="step-title">Track Your Progress</h3>
                  <p className="step-description">
                    Review your productivity analytics, celebrate your
                    achievements, and identify patterns to continuously improve
                    your workflow.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section id="benefits" className="benefits">
            <div className="container">
              <div className="benefits-content">
                <div className="benefits-text">
                  <h2 className="section-title">Why Choose Pomodoro?</h2>
                  <p className="section-description">
                    Join thousands of professionals who have transformed their
                    productivity with our integrated approach to task management
                    and focus training.
                  </p>

                  <div className="benefits-list">
                    <div className="benefit-item">
                      <div className="benefit-icon blue">
                        <Target size={24} />
                      </div>
                      <div className="benefit-content">
                        <h3 className="benefit-title">Laser-Sharp Focus</h3>
                        <p className="benefit-description">
                          Eliminate distractions and maintain deep focus with
                          scientifically-proven Pomodoro technique.
                        </p>
                      </div>
                    </div>

                    <div className="benefit-item">
                      <div className="benefit-icon purple">
                        <TrendingUp size={24} />
                      </div>
                      <div className="benefit-content">
                        <h3 className="benefit-title">Measurable Results</h3>
                        <p className="benefit-description">
                          Track your progress with detailed analytics and see
                          real improvements in your productivity.
                        </p>
                      </div>
                    </div>

                    <div className="benefit-item">
                      <div className="benefit-icon green">
                        <Filter size={24} />
                      </div>
                      <div className="benefit-content">
                        <h3 className="benefit-title">Smart Organization</h3>
                        <p className="benefit-description">
                          Advanced filtering and sorting keeps your tasks
                          organized exactly how you need them.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="stats-showcase">
                  <div className="showcase-stat blue">
                    <div className="showcase-number">150%</div>
                    <div className="showcase-label">Productivity Increase</div>
                  </div>
                  <div className="showcase-stat purple">
                    <div className="showcase-number">89%</div>
                    <div className="showcase-label">Task Completion Rate</div>
                  </div>
                  <div className="showcase-stat green">
                    <div className="showcase-number">25k+</div>
                    <div className="showcase-label">Happy Users</div>
                  </div>
                  <div className="showcase-stat yellow">
                    <div className="showcase-number">4.9</div>
                    <div className="showcase-label">User Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta">
            <div className="container">
              <div className="cta-content">
                <h2 className="cta-title">
                  Ready to Transform Your Productivity?
                </h2>
                <p className="cta-description">
                  Thousands of professionals are mastering their workflow with
                  Pomodoro.
                  <br />
                  Get started for free—sign in or try Guest mode with no
                  commitment!
                </p>
                <div className="cta-buttons">
                  <button className="cta-primary" onClick={handleSignIn}>
                    Sign In
                    <ArrowRight size={20} />
                  </button>
                  <div className="button-wrapper">
                      <button className="secondary-button" disabled>
                        Guest Mode
                      </button>
                      <span className="coming-soon">Coming Soon</span>
                    </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <div className="container">
              <div className="footer-content">
                <div className="footer-brand">
                  <div className="footer-logo">
                    <div className="brand-icon">
                      <Timer size={20} />
                    </div>
                    <span className="brand-text">Pomodoro</span>
                  </div>
                  <p className="footer-description">
                    The ultimate productivity app that combines task management,
                    Pomodoro technique, and powerful analytics to help you
                    achieve your goals.
                  </p>
                </div>
                <div className="footer-links">
                  <div className="footer-column">
                    <h4 className="footer-title">Product</h4>
                    <ul className="footer-list">
                      <li>
                        <a href="#" className="footer-link">
                          Features
                        </a>
                      </li>
                      <li>
                        <a href="#" className="footer-link">
                          Pricing
                        </a>
                      </li>
                      <li>
                        <a href="#" className="footer-link">
                          Integrations
                        </a>
                      </li>
                      <li>
                        <a href="#" className="footer-link">
                          API
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-column">
                    <h4 className="footer-title">Support</h4>
                    <ul className="footer-list">
                      <li>
                        <a href="#" className="footer-link">
                          Help Center
                        </a>
                      </li>
                      <li>
                        <a href="#" className="footer-link">
                          Contact Us
                        </a>
                      </li>
                      <li>
                        <a href="#" className="footer-link">
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a href="#" className="footer-link">
                          Terms of Service
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <p>&copy; 2024 Pomodoro. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      )}
      {(user || isLoading) && <Loader />}
    </>
  );
}

export default App;
