import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import Cart from './components/Cart'
import Orders from './components/Orders'

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/app1" element={<Dashboard />} />
					<Route path="/app1/admin" element={<Admin />} />
					<Route path="/app1/cart" element={<Cart />} />
					<Route path="/app1/orders" element={<Orders />} />
				</Routes>
			</Router>
		</>
	)
}

export default App