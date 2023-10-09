import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header className="navbar">
			<h3>Shakthimahotsav</h3>
			<nav ref={navRef}>
				<a href="#">Home</a>
				<a href="#about">About</a>
				<a href="#events">Events</a>
				<a href="#gallery">Gallery</a>
				<a href="#team">Team</a>
				<a href="#contact">Contact</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;