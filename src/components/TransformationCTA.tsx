export default function TransformationCTA() {
  return (
    <div className="text-center mt-16">
      <div className="bg-gradient-to-r from-[#1B3764] to-[#2A4A6B] rounded-3xl p-12 text-white">
        <h3 className="text-3xl font-bold mb-4">
          Ready to Start Your Transformation?
        </h3>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Join hundreds of satisfied property owners who have increased their bookings with our proven design process.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#F16022] hover:bg-[#E55A1A] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
            Start Free Consultation
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-[#1B3764] px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
            View Our Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}


