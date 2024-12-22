import { motion } from "framer-motion";

function Title() {
  const scrollToSection = () => {
    const section = document.getElementById("events-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-6xl font-extrabold text-white"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          Student Hub
        </motion.h1>
        <motion.p
          className="mt-4 text-xl text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Connect, Learn, and Grow with the Best Opportunities!
        </motion.p>

        <motion.button
          className="mt-8 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToSection}
        >
          Explore Now
        </motion.button>
      </motion.div>
    </section>
  );
}

export default Title;
