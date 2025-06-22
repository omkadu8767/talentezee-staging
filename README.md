# TalentEzee Staging - Alatree Tech Assessment

This repository contains the merged work for the **Web Developer Tech Assessment** for Alatree Ventures, featuring 4 candidate modules integrated under one unified interface.

## 🔗 Live Staging URL

👉 [Unified Wrapper App](https://talentezee-wrapper.vercel.app/)

Each module is embedded via iframe and can be accessed via:

- [Yashika - UI Shell & Onboarding](https://talentezee-wrapper.vercel.app/yashika)
- [Sourav - Campaign Management & Analytics](https://talentezee-wrapper.vercel.app/sourav)
- [Abhijaiswal - Enhanced Onboarding Flows](https://talentezee-wrapper.vercel.app/abhijaiswal)
- [Irfan - Client Dashboard & Navigation](https://talentezee-wrapper.vercel.app/irfan)

---

## 📁 Repository Structure
talentezee-staging/\
├── modules/ \
&nbsp; &nbsp; &nbsp; &nbsp;├── ui-shell-onboarding-yashika/ # Yashika's original module \
&nbsp; &nbsp; &nbsp; &nbsp;├── campaign-management-sourav/ # Sourav's original module\
&nbsp; &nbsp; &nbsp; &nbsp;├── ui-shell-onboarding-abhijaiswal/ # Abhijaiswal's module \
&nbsp; &nbsp; &nbsp; &nbsp;└── ui-shell-onboarding-irfan/ # Irfan's client dashboard\
└── wrapper/ # Unified Vite + React + Tailwind wrapper app


---

## 📦 Wrapper Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

The `wrapper/` app includes routes that embed each module via iframe. This allows users to view each candidate module inside a unified experience.

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/omkadu/talentezee-staging
   cd talentezee-staging/wrapper

2. Install dependencies:
    ```bash
    npm install

3. Start the dev server:
   ```bash
   npm run dev

4. Visit http://localhost:5173 and navigate to:\
-   /yashika
-   /sourav
-   /abhijaiswal
-   /irfan


  ## 📫 Submission Info
GitHub Repo: https://github.com/omkadu/talentezee-staging \
Staging App: https://talentezee-wrapper.vercel.app/ \
All modules maintain their original structure and behavior. \
 This wrapper interface makes it easy to navigate and preview each implementation independently.

🙏
Thank you for reviewing my assessment. Looking forward to your feedback!

– [Om Kadu](https://www.linkedin.com/in/om-kadu-53305425a/)
