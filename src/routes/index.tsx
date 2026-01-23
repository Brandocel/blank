
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../Landing/components/Navbar";
import Footer from "../Landing/components/Footer";
import Inicio from "../Landing/page/Inicio";
import Careers from "../Landing/page/Carrers";
import TermsAndConditions from "../Landing/page/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "../Landing/page/PrivacyPolicy/PrivacyPolicy";


const AppRoutes: React.FC = () => (
	<Router>
		<Navbar />
		<Routes>
			<Route path="/" element={<Inicio />} />
			<Route path="/careers" element={<Careers />} />
			<Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
			<Route path="/politicas-de-privacidad" element={<PrivacyPolicy />} />

		</Routes>
		<Footer />
	</Router>
);

export default AppRoutes;
