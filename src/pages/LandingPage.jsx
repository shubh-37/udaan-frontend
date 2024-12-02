import Header from '../shared/Header';
import HowItWorks from '../shared/HowItWorks';
import KeyFeatures from '../shared/KeyFeatures';

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen pb-4">
      <Header />
      <main className="text-center px-6 pt-10">
        <section>
          <h2 className="text-3xl font-bold italic text-gray-600 mb-2">
            Ace Your Interview with AI-Powered Mock Sessions
          </h2>
          <p className="text-gray-600 text-lg">
            Practice smarter and land your dream job with personalized AI mock interviews
          </p>
        </section>
      </main>
      <section className="flex lg:flex-row gap-6 justify-center mt-10 flex-wrap px-4">
        <HowItWorks />
        <KeyFeatures />
      </section>

      {/* Add other components as needed */}
    </div>
  );
};

export default LandingPage;
