# 💼 Professional Portfolio

A modern, responsive portfolio website showcasing DevSecOps expertise, cloud architecture projects, and professional certifications. Built with clean HTML5, CSS3, and vanilla JavaScript following Apple's minimalist design principles.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://snowjug.github.io/Portfoli)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Features

### 🎨 Design & UI
- **Apple-Inspired Aesthetic** - Clean, minimalist design with smooth animations
- **Glassmorphism Navigation** - Frosted glass navbar with backdrop filters
- **Dark Mode Support** - Seamless light/dark theme toggle with localStorage persistence
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Floating icons, scroll indicators, and hover effects

### 🔧 Technical Features
- **Pure Vanilla JavaScript** - No frameworks or dependencies
- **CSS Custom Properties** - Dynamic theming system
- **Intersection Observer API** - Scroll-triggered animations
- **Active Section Detection** - Auto-highlighting navigation based on scroll position
- **Optimized Performance** - Lightweight and fast-loading

### 📄 Sections
1. **Hero Section** - Profile image with floating tech icons (AWS, React, Docker, JavaScript, Python, Git)
2. **About Me** - Professional summary with quick links and skill cards, surrounded by floating DevOps/programming logos
3. **Certifications** - Display of professional certifications with download links and Credly integration
4. **Projects** - Horizontal card layout showcasing GitHub repositories
5. **Contact** - Multiple contact methods with interactive cards

## 🚀 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Design**: CSS Grid, Flexbox, Custom Properties
- **Icons**: Inline SVG icons
- **Fonts**: -apple-system, BlinkMacSystemFont, Segoe UI
- **Version Control**: Git, GitHub

## 📦 Project Structure

```
Portfolio/
├── index.html              # Main HTML structure
├── styles.css              # Complete styling (1300+ lines)
├── script.js               # Interactive functionality
├── image0.jpeg             # Profile photo
├── oracle.png              # Oracle certification logo
├── Resume_Atharv.pdf       # Professional resume
├── AZ900 Azure Fundamentals.pdf
├── 1Z0-1109-25 OCI DevOps Professional.pdf
├── MTA Python.pdf
└── README.md              # Documentation
```

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/snowjug/Portfoli.git
   cd Portfoli
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Customize content**
   - Update personal information in `index.html`
   - Replace `image0.jpeg` with your profile photo
   - Add your certifications and projects
   - Modify color scheme in CSS custom properties

## 🎨 Customization

### Change Theme Colors
Edit CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #000000;
    --accent-color: #0071e3;
    --background: #ffffff;
    /* ... more variables */
}
```

### Add New Projects
Add project cards in the Projects section of `index.html`:

```html
<a href="YOUR_GITHUB_REPO" class="project-card">
    <div class="project-image">
        <!-- Add SVG icon -->
    </div>
    <div class="project-overlay">
        <h3>Project Name</h3>
        <p>Description</p>
        <span class="project-link">View on GitHub →</span>
    </div>
</a>
```

## 📱 Responsive Breakpoints

- **Desktop**: > 900px - Full layout with all features
- **Tablet**: 769px - 900px - Adjusted floating icons and spacing
- **Mobile**: ≤ 768px - Stacked layout, smaller floating icons

## 🌟 Key Features Explained

### Floating Icons
- **Hero Section**: 6 tech icons (AWS, React, Docker, JavaScript, Python, Git) with float animations
- **About Section**: 6 DevOps/programming logos (Docker, Git, Kubernetes, GitHub Actions, Terraform, Python)
- Responsive sizing and positioning across all devices

### Dark Mode
- Toggle button in navigation bar
- Automatic persistence using localStorage
- Smooth transitions between themes
- Optimized colors for both light and dark modes

### Active Navigation
- Auto-detects current section based on scroll position
- Highlights corresponding nav link
- Smooth scroll to sections with offset for fixed navbar

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Atharv Shukla**
- LinkedIn: [@atharv2405](https://linkedin.com/in/atharv2405)
- GitHub: [@snowjug](https://github.com/snowjug)
- Credly: [@snowjug](https://www.credly.com/users/snowjug)
- Email: atharvshukla2405@gmail.com

## 🙏 Acknowledgments

- Design inspiration from Apple's website
- Icons from Simple Icons and custom SVG paths
- Built with ❤️ for the DevSecOps community

## 📈 Future Enhancements

- [ ] Add blog section
- [ ] Integrate GitHub API for dynamic project stats
- [ ] Add testimonials section
- [ ] Implement project filtering
- [ ] Add contact form with backend integration
- [ ] Performance optimization and PWA support
- [ ] Add loading animations
- [ ] Implement page transitions

---

⭐ Star this repo if you found it helpful!
