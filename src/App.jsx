import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/admin" element={<Admin />} />
				</Routes>
			</Router>
		</>
	)
}

export default App