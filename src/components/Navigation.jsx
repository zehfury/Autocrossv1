import { useState } from 'react'

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="index.html" className="flex items-center space-x-3">
            <img src="assets/logo/logo.png" alt="ACN Logo" className="h-8 w-auto" />
            <span className="text-lg font-semibold text-gray-900 hidden sm:block">
              AUTOCROSS CLUB OF NEGROS
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a 
              href="index.html" 
              className="text-gray-700 hover:text-autocross-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              HOME
            </a>
            <a 
              href="index.html#events" 
              className="text-gray-700 hover:text-autocross-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              EVENTS
            </a>
            <a 
              href="#" 
              className="text-autocross-600 bg-autocross-50 px-3 py-2 rounded-md text-sm font-medium"
            >
              PHOTO GALLERY
            </a>
            <a 
              href="index.html#merchandise" 
              className="text-gray-700 hover:text-autocross-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              MERCHANDISE
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-autocross-600 hover:bg-gray-100 transition-colors"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a 
                href="index.html" 
                className="text-gray-700 hover:text-autocross-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                HOME
              </a>
              <a 
                href="index.html#events" 
                className="text-gray-700 hover:text-autocross-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                EVENTS
              </a>
              <a 
                href="#" 
                className="text-autocross-600 bg-autocross-50 block px-3 py-2 rounded-md text-base font-medium"
              >
                PHOTO GALLERY
              </a>
              <a 
                href="index.html#merchandise" 
                className="text-gray-700 hover:text-autocross-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                MERCHANDISE
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
