import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Plants from './pages/Plants';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import ProductDetails from './pages/Produts-details';
import ContactUs from './components/Contact-us';
import Cart from './components/Cart';
import SignIn from "./pages/SignIn"
import SignUpModal from './pages/SignUp';
import CheckoutPage from './components/CheckOut';
import { useState } from 'react';
function App() {
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const handleSwitchToSignUp = () => {
    setShowSignIn(false)
    setShowSignUp(true)
  }

  const handleSwitchToSignIn = () => {
    setShowSignUp(false)
    setShowSignIn(true)
  }
  useEffect(() => {
    const guestIdKey = 'guest_id';
    const existingGuestId = localStorage.getItem(guestIdKey);

    if (!existingGuestId) {
      const newGuestId = crypto.randomUUID();

      // Send the guest ID to the backend
      fetch('http://localhost:3000/user/registerGuest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guest_id: newGuestId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem(guestIdKey, newGuestId);
            console.log('Guest ID registered and saved:', newGuestId);
          } else {
            console.error('Guest registration failed:', data);
          }
        })
        .catch((err) => {
          console.error('Error registering guest:', err);
        });
    } else {
      console.log('Existing guest ID found:', existingGuestId);
    }
  }, []);

  return (
    <Router>
      <Navbar showSignInModal={setShowSignIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/productDetails/:id/:type" element={<ProductDetails />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/checkout" element={<CheckoutPage/>}/>
      </Routes>
      <Footer />
      <Cart/>
      <SignIn isOpen={showSignIn} onClose={() => setShowSignIn(false)} onSwitchToSignUp={handleSwitchToSignUp} />
      <SignUpModal isOpen={showSignUp} onClose={() => setShowSignUp(false)} onSwitchToSignIn={handleSwitchToSignIn} />
    </Router>
  );
}

export default App;
