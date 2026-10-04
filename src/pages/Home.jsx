import {
  ArrowRight,
  Code,
  Code2,
  Eye,
  Handshake,
  Pencil,
  Save,
} from "lucide-react";
import htmlLogo from "../../public/html_logo.png";
import cssLogo from "../../public/css_logo.png";
import jsLogo from "../../public/js_logo.png";
import { Link } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import ThemeToggleButton from "../components/ui/ThemeToggleButton";
import { motion } from "motion/react";

const features = [
  {
    name: "Instant Playground",
    details:
      "Start coding immediately with pre-configured HTML, CSS and JavaScript files",
    icon: Code2,
  },
  {
    name: "Live preview",
    details: "See your changes in real-time with an integrated preview panel.",
    icon: Eye,
  },
  {
    name: "Save & Reset",
    details:
      "Save your work or restore the project to its original files with one click.",
    icon: Save,
  },
  {
    name: "Beginner Friendly",
    details:
      "Clear interface, simple workflow and a great way to learn web development.",
    icon: Handshake,
  },
];

const Home = () => {
  const { isDarkMode } = useThemeContext();
  return (
    <div className="flex flex-col min-h-screen text-text-primary bg-background px-15 py-5 items-center justify-center gap-1 md:gap-3 lg:gap-5">
      <div className="flex items-center justify-between border-b w-full pb-2">
        <Link
          to="/"
          className="flex text-xl md:text-2xl lg:text-3xl font-extrabold"
        >
          Web<span className="text-accent">Pad</span>
        </Link>
        <ThemeToggleButton />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-2 md:gap-4 justify-center items-center"
      >
        <span className="border border-border rounded-full px-2 md:py-1 flex gap-2 text-xs md:text-sm lg:text-md items-center">
          {" "}
          <Code size={12} /> Code | Create | Learn
        </span>
        <h1 className="text-4xl text-center md:text-5xl lg:text-6xl pb-2 font-extrabold overflow-hidden">
          Your Web Development <span className="text-accent">Playground</span>
        </h1>

        <div className="flex gap-2 justify-center w-full text-xs md:text-sm lg:text-md text-text-secondary">
          <p className="mt-1.5">BUILT FOR</p>
          <span className="flex items-center justify-center gap-1">
            <img
              src={htmlLogo}
              alt="HTML Logo"
              className="h-7 lg:h-8 p-1 bg-border/50 rounded-md"
            />
            <img
              src={cssLogo}
              alt="CSS Logo"
              className="h-7 lg:h-8 p-1 bg-border/50 rounded-md"
            />
            <img
              src={jsLogo}
              alt="JS Logo"
              className="h-7 lg:h-8 p-1 bg-border/50 rounded-md"
            />
          </span>

          <p className="mt-1.5">HTML | CSS | JS</p>
        </div>

        <p className="text-text-secondary text-sm md:text-md lg:text-lg">
          A simple and focused online IDE for practicing HTML, CSS and
          JavaScript. Write code, experiment with ideas and see your results
          instantly.
        </p>

        <Link
          className="cosmic-button w-full text-sm md:text-md lg:text-lg flex justify-center items-center gap-1 text-white active:scale-95"
          to="/editor"
        >
          Start Coding Now <ArrowRight />
        </Link>
      </motion.div>

      {/* Features */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-2 my-2"
      >
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.name}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col items-center bg-panel border border-border text-center p-2 rounded-lg transition-colors hover:border-accent/40"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon size={19} />
              </div>

              <h2 className="font-bold text-md md:text-lg lg:text-xl">
                {feature.name}
              </h2>

              <p className="text-text-secondary text-xs sm:text-sm md:text-md text-center">
                {feature.details}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
      <footer className="mx-auto mt-1 w-full max-w-7xl border-t border-border pt-3 text-center text-xs text-text-secondary lg:text-sm">
        <span>&copy; {new Date().getFullYear()} | WebPad</span>
      </footer>
    </div>
  );
};

export default Home;
