

import { useState, useEffect } from "react"
import { Facebook, Twitter, Instagram, Youtube, Leaf, Sprout } from "lucide-react"

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const footerSections = [
    {
      title: "STORE HOURS",
      items: ["Mon - Fri: 8AM - 8PM", "Sat: 9AM-7PM", "Sun: 10AM-6PM", "We're Here for Your Plants!"],
    },
    {
      title: "PLANT CARE",
      items: ["Care Guides", "Plant Doctor", "Watering Tips", "Fertilizer Guide", "Pest Control", "Repotting Help"],
    },
    {
      title: "MY GARDEN",
      items: ["My Account", "Order History", "Plant Wishlist", "Care Reminders", "Plant Journal", "Rewards Program"],
    },
    {
      title: "CUSTOMER CARE",
      items: ["Contact Us", "Plant Guarantee", "Shipping Info", "Return Policy", "Plant Care Support", "FAQ"],
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ]

  return (
    <footer className={`footer-container ${isVisible ? "fade-in" : ""}`}>
      <div className="floating-leaves">
        <div className="leaf leaf-1">🌿</div>
        <div className="leaf leaf-2">🍃</div>
        <div className="leaf leaf-3">🌱</div>
        <div className="leaf leaf-4">🌿</div>
        <div className="leaf leaf-5">🍃</div>
      </div>

      <div className="footer-content">
        <div className="footer-grid">
          {/* Left sections */}
          <div className="footer-sections-left">
            {footerSections.slice(0, 2).map((section, index) => (
              <div key={section.title} className={`footer-section animate-grow-up delay-${index}`}>
                <h3 className="section-title">
                  <Sprout className="title-icon" size={16} />
                  {section.title}
                </h3>
                <div className="section-underline"></div>
                <ul className="section-links">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="link-item">
                      <a href="#" className="footer-link">
                        <span className="link-dot">•</span>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Center section */}
          <div className="footer-center animate-bloom delay-2">
            <div className="brand-section">
              <div className="brand-container">
                <Leaf className="brand-leaf" size={32} />
                <h2 className="brand-name">Plantify</h2>
                <Leaf className="brand-leaf brand-leaf-right" size={32} />
              </div>

              <p className="brand-tagline">Growing happiness, one plant at a time</p>

              <div className="center-links">
                <a href="#" className="center-link">
                  <span className="link-icon">🌱</span>
                  Shop Plants
                </a>
                <a href="#" className="center-link">
                  <span className="link-icon">🪴</span>
                  Plant Care
                </a>
                <a href="#" className="center-link">
                  <span className="link-icon">📞</span>
                  Contact
                </a>
                <a href="#" className="center-link">
                  <span className="link-icon">🚚</span>
                  Delivery
                </a>
              </div>

              <div className="social-icons">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`social-icon animate-sprout delay-${index + 3}`}
                      aria-label={social.label}
                    >
                      <IconComponent size={20} />
                    </a>
                  )
                })}
              </div>

              <div className="app-downloads">
                <div className="download-button apple-store">
                  <div className="download-icon">🌿</div>
                  <div className="download-text">
                    <span className="download-from">Get it from</span>
                    <span className="store-name">APP STORE</span>
                  </div>
                </div>
                <div className="download-button google-play">
                  <div className="download-icon">🌱</div>
                  <div className="download-text">
                    <span className="download-from">Get it from</span>
                    <span className="store-name">GOOGLE PLAY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right sections */}
          <div className="footer-sections-right">
            {footerSections.slice(2, 4).map((section, index) => (
              <div key={section.title} className={`footer-section animate-grow-up delay-${index + 4}`}>
                <h3 className="section-title">
                  <Sprout className="title-icon" size={16} />
                  {section.title}
                </h3>
                <div className="section-underline"></div>
                <ul className="section-links">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="link-item">
                      <a href="#" className="footer-link">
                        <span className="link-dot">•</span>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2024 Plantify. Growing dreams since 2020 🌱</p>
        </div>
      </div>

      <style jsx>{`
        .footer-container {
          background: black;
          color: #ffffff;
          padding: 80px 0 40px;
          position: relative;
          overflow: hidden;
        }

        .footer-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(76, 175, 80, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 195, 74, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(102, 187, 106, 0.05) 0%, transparent 50%);
        }

        .floating-leaves {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .leaf {
          position: absolute;
          font-size: 24px;
          opacity: 0.3;
          animation: float 6s ease-in-out infinite;
        }

        .leaf-1 {
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .leaf-2 {
          top: 20%;
          right: 15%;
          animation-delay: 1s;
        }

        .leaf-3 {
          top: 60%;
          left: 5%;
          animation-delay: 2s;
        }

        .leaf-4 {
          top: 70%;
          right: 10%;
          animation-delay: 3s;
        }

        .leaf-5 {
          top: 40%;
          left: 50%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(5deg);
          }
          66% {
            transform: translateY(-10px) rotate(-5deg);
          }
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 50px;
          align-items: start;
          margin-bottom: 40px;
        }

        .footer-sections-left,
        .footer-sections-right {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .footer-section {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
        }

        .section-title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #a5d6a7;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .title-icon {
          color: #66bb6a;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .section-underline {
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, #4caf50, #8bc34a, #66bb6a);
          margin-bottom: 20px;
          border-radius: 2px;
          animation: grow-width 1s ease-out forwards;
        }

        @keyframes grow-width {
          from { width: 0; }
          to { width: 50px; }
        }

        .section-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .link-item {
          margin-bottom: 12px;
        }

        .footer-link {
          color: #c8e6c9;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .link-dot {
          color: #66bb6a;
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          color: #ffffff;
          transform: translateX(8px);
        }

        .footer-link:hover .link-dot {
          color: #4caf50;
          transform: scale(1.5);
        }

        .footer-center {
          text-align: center;
          opacity: 0;
          transform: scale(0.8);
        }

        .brand-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .brand-leaf {
          color: #66bb6a;
          animation: sway 3s ease-in-out infinite;
        }

        .brand-leaf-right {
          animation-delay: 1.5s;
          transform: scaleX(-1);
        }

        @keyframes sway {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
        }

        .brand-name {
          font-size: 52px;
          font-weight: 900;
          margin: 0;
          background: linear-gradient(45deg, #4caf50, #8bc34a, #66bb6a, #a5d6a7);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-flow 4s ease infinite;
          text-shadow: 0 0 30px rgba(76, 175, 80, 0.3);
        }

        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .brand-tagline {
          color: #a5d6a7;
          font-style: italic;
          margin-bottom: 30px;
          font-size: 16px;
        }

        .center-links {
          display: flex;
          justify-content: center;
          gap: 25px;
          margin-bottom: 35px;
          flex-wrap: wrap;
        }

        .center-link {
          color: #c8e6c9;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 20px;
          background: rgba(76, 175, 80, 0.1);
          border: 1px solid rgba(76, 175, 80, 0.2);
        }

        .link-icon {
          font-size: 16px;
        }

        .center-link:hover {
          color: #ffffff;
          background: rgba(76, 175, 80, 0.2);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(76, 175, 80, 0.2);
        }

        .social-icons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 40px;
        }

        .social-icon {
          width: 50px;
          height: 50px;
          background: rgba(76, 175, 80, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a5d6a7;
          text-decoration: none;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(76, 175, 80, 0.2);
          opacity: 0;
          transform: translateY(30px) scale(0.8);
        }

        .social-icon:hover {
          background: linear-gradient(45deg, #4caf50, #66bb6a);
          color: #ffffff;
          transform: translateY(-8px) scale(1.15) rotate(5deg);
          box-shadow: 0 15px 35px rgba(76, 175, 80, 0.4);
          border-color: #4caf50;
        }

        .app-downloads {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .download-button {
          background: rgba(76, 175, 80, 0.1);
          border: 2px solid rgba(76, 175, 80, 0.3);
          border-radius: 12px;
          padding: 15px 25px;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .download-button:hover {
          background: rgba(76, 175, 80, 0.2);
          transform: translateY(-5px);
          box-shadow: 0 12px 35px rgba(76, 175, 80, 0.3);
          border-color: #4caf50;
        }

        .download-icon {
          font-size: 28px;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .download-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .download-from {
          font-size: 11px;
          color: #a5d6a7;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .store-name {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 30px;
          border-top: 1px solid rgba(76, 175, 80, 0.2);
        }

        .copyright {
          color: #a5d6a7;
          font-size: 14px;
          margin: 0;
        }

        /* Animation classes */
        .fade-in {
          animation: fadeIn 1.2s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-grow-up {
          animation: growUp 1s ease forwards;
        }

        @keyframes growUp {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-bloom {
          animation: bloom 1.2s ease forwards;
        }

        @keyframes bloom {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(-5deg);
          }
          60% {
            opacity: 1;
            transform: scale(1.05) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        .animate-sprout {
          animation: sprout 0.8s ease forwards;
        }

        @keyframes sprout {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.8) rotate(-10deg);
          }
          70% {
            opacity: 1;
            transform: translateY(-5px) scale(1.1) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
          }
        }

        /* Delay classes */
        .delay-0 { animation-delay: 0.1s; }
        .delay-1 { animation-delay: 0.3s; }
        .delay-2 { animation-delay: 0.5s; }
        .delay-3 { animation-delay: 0.7s; }
        .delay-4 { animation-delay: 0.9s; }
        .delay-5 { animation-delay: 1.1s; }

        /* Responsive design */
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .footer-sections-left,
          .footer-sections-right {
            flex-direction: row;
            justify-content: space-around;
          }

          .brand-name {
            font-size: 42px;
          }

          .center-links {
            gap: 15px;
          }

          .app-downloads {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .footer-sections-left,
          .footer-sections-right {
            flex-direction: column;
            gap: 25px;
          }

          .center-links {
            flex-direction: column;
            gap: 12px;
          }

          .social-icons {
            gap: 15px;
          }

          .brand-container {
            gap: 10px;
          }

          .brand-name {
            font-size: 36px;
          }
        }
      `}</style>
    </footer>
  )
}
