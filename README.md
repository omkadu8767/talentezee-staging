# TalentEzee - Influencer Engagement Platform

A comprehensive frontend onboarding module built for TalentEzee.com, designed to manage influencer engagements with a clean, responsive interface using Next.js.

## 🚀 Features

### ✅ Complete User Experience
- **User Onboarding**: Sign-up with social media integration
- **Dashboard**: Comprehensive overview with stats and activities
- **Profile Management**: Edit personal information and social handles
- **Campaign System**: Browse and join influencer campaigns
- **Leaderboard**: Competitive ranking system
- **Settings**: Privacy, notifications, and account management
- **Credit System**: Top-up functionality with Stripe integration
- **Raffle System**: Persistent widget with ticket tracking

### 🎨 Modern UI/UX
- Responsive design with mobile-first approach
- Glass-morphism effects and gradient styling
- Smooth animations and transitions
- Toast notifications for user feedback
- Loading states and error handling

### 🔧 Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + CSS Variables
- **Auth**: Custom Mock Auth (Local Storage)
- **Payments**: Stripe Integration (test mode)
- **APIs**: Mocked RESTful API Routes
- **Deployment**: Vercel-ready

## 📁 Project Structure

\`\`\`
talentezee-onboarding/
├── app/
│   ├── api/                    # API routes
│   │   ├── enroll/            # User enrollment
│   │   ├── raffle-status/     # Raffle data
│   │   ├── raffle-award/      # Award tickets
│   │   ├── campaigns/         # Campaign management
│   │   ├── user-stats/        # User statistics
│   │   └── stripe-webhook/    # Stripe webhooks
│   ├── campaigns/             # Campaign browsing
│   ├── dashboard/             # User dashboard
│   ├── leaderboard/           # Rankings
│   ├── profile/               # Profile management
│   ├── settings/              # Account settings
│   ├── signup/                # User registration
│   ├── globals.css            # Global styles
│   └── layout.tsx             # Root layout
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── header.tsx             # Navigation header
│   ├── footer.tsx             # Site footer
│   ├── hero.tsx               # Landing hero
│   ├── features.tsx           # Feature showcase
│   ├── cta.tsx                # Call-to-action
│   ├── raffle-widget.tsx      # Floating raffle widget
│   ├── stripe-top-up.tsx      # Payment component
│   └── toast.tsx              # Custom toast system
├── hooks/
│   └── use-toast.ts           # Toast hook
├── lib/
│   └── utils.ts               # Utility functions
├── .env.local                 # Environment variables
└── README.md
\`\`\`

## 🛠️ Setup Instructions

### 1. Clone and Install
\`\`\`bash
git clone <repository-url>
cd talentezee-onboarding
npm install
\`\`\`

### 2. Environment Setup
Copy the provided `.env.local` file and update with your keys:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

### 3. Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the application.

## 🔑 Environment Variables

### Required for Development
\`\`\`env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
\`\`\`

### Optional Configuration
\`\`\`env
DATABASE_URL=postgresql://...
SMTP_HOST=smtp.gmail.com
OPENAI_API_KEY=sk-...
RESEND_API_KEY=re_...
\`\`\`

## 🎯 Key Features Explained

### User Onboarding Flow
1. **Sign-up Form**: Collects name, email, social handles
2. **Auto-enrollment**: `POST /api/enroll` with welcome bonus
3. **Session Storage**: Local storage for demo purposes
4. **Welcome Rewards**: €5 credits + 2 raffle tickets

### Credit & Raffle System
- **Top-up Integration**: Stripe-powered €1 payments
- **Raffle Tickets**: Awarded for sign-ups and top-ups
- **Persistent Widget**: Shows current tickets/credits
- **Mock APIs**: Simulate real-time data updates

### Campaign Management
- **Browse Campaigns**: Filter by status and difficulty
- **Join Campaigns**: Credit-based participation
- **Progress Tracking**: Participant counts and deadlines
- **Reward System**: Credit earnings for completion

### Leaderboard & Competition
- **User Rankings**: Based on credits and activity
- **Achievement Badges**: Diamond, Gold, Silver, Bronze
- **Social Proof**: Platform connections display
- **Statistics**: Monthly performance tracking

## 🔧 API Endpoints

### User Management
- `POST /api/enroll` - User registration
- `GET /api/user-stats?userId=...` - User statistics
- `GET /api/raffle-status?userId=...` - Raffle data

### Campaign System
- `GET /api/campaigns` - List campaigns
- `POST /api/campaigns` - Join campaign

### Raffle System
- `POST /api/raffle-award` - Award tickets
- `POST /api/stripe-webhook` - Payment processing

## 🎨 Design System

### Colors
- **Primary**: Purple to Blue gradient (`#8B5CF6` to `#3B82F6`)
- **Success**: Green (`#10B981`)
- **Warning**: Yellow (`#F59E0B`)
- **Error**: Red (`#EF4444`)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, gradient text effects
- **Body**: Regular weight, good contrast

### Components
- **Glass Effect**: `backdrop-blur-sm` with transparency
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Badges**: Color-coded status indicators

## 🚀 Deployment

### Vercel (Recommended)
\`\`\`bash
npm run build
vercel --prod
\`\`\`

### Environment Variables in Production
Ensure all required environment variables are set in your deployment platform.

## 🧪 Testing

### Manual Testing Checklist
- [ ] User can sign up with valid information
- [ ] Dashboard displays correct user data
- [ ] Top-up functionality works with test Stripe keys
- [ ] Raffle widget updates after transactions
- [ ] Profile editing saves correctly
- [ ] Logout functionality clears session
- [ ] Responsive design works on mobile

### Test Accounts
Use any email/name combination for testing. The system uses local storage for demo purposes.

## 🔒 Security Considerations

### Current Implementation (Demo)
- Local storage for session management
- Mock API responses
- Test Stripe keys only

### Production Recommendations
- Implement proper authentication (NextAuth.js)
- Use secure session management
- Add input validation and sanitization
- Implement rate limiting
- Use environment-specific API keys

## 📱 Mobile Responsiveness

- **Breakpoints**: Tailwind's default responsive system
- **Navigation**: Collapsible mobile menu
- **Cards**: Stack vertically on small screens
- **Forms**: Full-width inputs on mobile
- **Widgets**: Responsive positioning

## 🎯 Future Enhancements

### Phase 2 Features
- [ ] Real-time notifications
- [ ] Advanced campaign filtering
- [ ] Social media API integrations
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Advanced user roles and permissions
- [ ] Campaign performance analytics
- [ ] Automated payout system
- [ ] Content approval workflow

### Technical Improvements
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Redis caching for performance
- [ ] WebSocket for real-time updates
- [ ] Image upload and optimization
- [ ] Email notification system
- [ ] Advanced search functionality
- [ ] API rate limiting
- [ ] Comprehensive error logging

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Use TypeScript for type safety
- Follow ESLint configuration
- Write descriptive commit messages
- Add comments for complex logic
- Ensure responsive design compatibility

## 📞 Support

### Getting Help
- **Documentation**: Check this README first
- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub Discussions for questions
- **Email**: contact@talentezee.com

### Common Issues
1. **Stripe Integration**: Ensure test keys are properly set
2. **Local Storage**: Clear browser storage if experiencing issues
3. **API Errors**: Check browser console for detailed error messages
4. **Styling Issues**: Verify Tailwind CSS is properly configured

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Radix UI** for accessible component primitives
- **Stripe** for payment processing capabilities
- **Vercel** for seamless deployment platform

---

**Built with ❤️ for the TalentEzee community**

For more information, visit [TalentEzee.com](https://talentezee.com)
