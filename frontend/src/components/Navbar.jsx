import { Link } from "react-router-dom";

const Navbar = () => {
return (
    <nav className="bg-gray-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
            <div>
                <img
                    src="/src/assets/logo.png"
                    alt="Logo"
                    className="h-8 w-auto object-contain rounded-md transition-transform hover:scale-105"
                />
            </div>
            <div className="flex items-center gap-6">
                <Link to="/" className="text-white hover:text-gray-300 font-medium">
                    Home
                </Link>
                <Link to="/about" className="text-white hover:text-gray-300 font-medium">
                    About
                </Link>
                <Link to="/practice" className="text-white hover:text-gray-300 font-medium">
                    Practice
                </Link>
                <Link to="/problems" className="text-white hover:text-gray-300 font-medium">
                    Problems
                </Link>
            </div>
        </div>
    </nav>
);
};
export default Navbar;
// make it responsive 
