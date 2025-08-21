const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-autocross-900 to-autocross-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
          PHOTO GALLERY
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90 animate-slide-up">
          Relive the excitement of our autocross events through stunning action shots and memorable moments captured on track.
        </p>
        <a 
          href="index.html" 
          className="inline-flex items-center px-6 py-3 bg-white text-autocross-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          BACK TO HOME
        </a>
      </div>
    </section>
  )
}

export default HeroSection
