import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { LandingPage } from "./pages/LandingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MethodologyPage } from "./pages/MethodologyPage";
import { AboutPage } from "./pages/AboutPage";
import { SimulatorPage } from "./pages/SimulatorPage";
import { TransparencyPage } from "./pages/TransparencyPage";
import { PriorityMapPage } from "./pages/PriorityMapPage";
import { FeedbackPage } from "./pages/FeedbackPage";
import { AccountabilityPage } from "./pages/AccountabilityPage";
import { PolicyBriefPage } from "./pages/PolicyBriefPage";
import { SignalReviewPage } from "./pages/SignalReviewPage";
import { PublicFeedbackPage } from "./pages/public/PublicFeedbackPage";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/priority-map" element={<PriorityMapPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/accountability" element={<AccountabilityPage />} />
          <Route path="/policy-brief" element={<PolicyBriefPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/transparency" element={<TransparencyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signal-review" element={<SignalReviewPage />} />
          
          {/* Public Portal Nested Routes */}
          <Route path="/public" element={<LandingPage />} />
          <Route path="/public/map" element={<PriorityMapPage />} />
          <Route path="/public/feedback" element={<PublicFeedbackPage />} />
          <Route path="/public/transparency" element={<TransparencyPage />} />
          <Route path="/public/methodology" element={<MethodologyPage />} />
          <Route path="/public/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
