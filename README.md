# DealDen.BMU - BML Munjal University Student Marketplace

A comprehensive web platform connecting BML Munjal University students for services and secondhand item trading.

## Features

### 🔐 User Authentication
- **Login System**: Secure login with BMU email validation (@bmu.edu.in)
- **Registration**: New user signup with password confirmation
- **Session Management**: Persistent login using localStorage

### 🛠️ Service Marketplace
Students can offer or request various services:

- **Editing** (₹200-500) - Essay and document editing
- **Photography** (₹1000-3000) - Event and portrait photography
- **Videography** (₹1500-5000) - Video recording and editing
- **Peer Tuition** (₹300-800/hour) - Academic tutoring
- **Graphic Design** (₹500-2000) - Logo and design services
- **Content Writing** (₹200-1000) - Blog posts and articles
- **Practical File Help** (₹100-300) - Academic file assistance
- **Music Lessons** (₹400-1200/hour) - Instrument and vocal training
- **Custom Gifts** (₹500-3000) - Personalized gift creation
- **Tech Help** (₹200-1000) - Laptop setup, app installation, coding help
- **Fitness Training** (₹500-2000/session) - Personal fitness coaching
- **Volunteering** (Free) - Community service opportunities

### 🛒 Secondhand Marketplace
Buy and sell used items in categories:
- **Books** - Textbooks, novels, reference materials
- **Electronics** - Laptops, phones, gadgets
- **Watches** - Smartwatches, traditional watches
- **Entertainment** - Games, movies, music equipment

## File Structure

```
DealDen-BMU/
├── index.html          # Login page
├── register.html       # User registration page
├── dashboard.html      # Main dashboard
├── styles.css          # CSS styling
├── script.js          # JavaScript functionality
└── README.md          # This file
```

## How to Use

### 1. Getting Started
1. Open `index.html` in a web browser
2. For first-time users, click "New User? Register Here"
3. Register with your BMU email address (@bmu.edu.in)
4. Login with your credentials

### 2. Using Services
1. After login, go to the "Services" tab
2. Choose "I Need a Service" or "I Want to Offer a Service"
3. Select a service category from the dropdown
4. Browse available providers or add your own service

### 3. Using Marketplace
1. Go to the "Marketplace" tab
2. Choose "Buy Items" or "Sell Items"
3. Browse items by category or list your own items
4. Contact sellers/buyers directly

## Technical Details

### Technologies Used
- **HTML5** - Structure and semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Client-side functionality
- **LocalStorage** - Data persistence

### Key Features
- **Responsive Design** - Works on desktop and mobile
- **Email Validation** - Ensures only BMU students can register
- **Real-time Updates** - Dynamic content loading
- **Category Filtering** - Easy item browsing
- **Contact System** - Direct communication between users

### Data Storage
All data is stored locally in the browser using localStorage:
- User accounts and authentication
- Service listings and providers
- Marketplace items and transactions

## Sample Data
The application includes sample data for demonstration:
- 3 sample service providers
- 3 sample marketplace items
- Pre-populated service categories with pricing

## Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Security Notes
- Passwords are stored in plain text (for demo purposes)
- In production, implement proper password hashing
- Add server-side validation and authentication
- Implement HTTPS for secure data transmission

## Future Enhancements
- Payment integration
- Rating and review system
- Real-time messaging
- Mobile app development
- Admin dashboard
- Advanced search and filtering
- Image upload functionality

## Getting Help
For technical support or feature requests, contact the development team or create an issue in the project repository.

---

**DealDen.BMU** - Connecting BMU students, one service at a time! 🎓
