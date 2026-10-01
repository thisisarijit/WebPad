import { ArrowRight, Code, Code2, Eye, Handshake, Save } from "lucide-react";
import htmlLogo from "../../public/html_logo.png";
import cssLogo from "../../public/css_logo.png";
import jsLogo from "../../public/js_logo.png";

const features = [
  {
    name: "instant playground",
    details:
      "Start coding immediately with pre-configured HTML, CSS and JavaScript files",
    icon: Code2,
  },
  {
    name: "live preview",
    details: "See your changes in real-time with an integrated preview panel.",
    icon: Eye,
  },
  {
    name: "save & reset",
    details:
      "Keep your progress or reset back to the original files with one click",
    icon: Save,
  },
  {
    name: "beginner friendly",
    details:
      "Clear interface, simple workflow and a great way to learn web development.",
    icon: Handshake,
  },
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen text-white bg-black px-15 py-5 items-center justify-center md:gap-5">
      <div className="flex flex-col gap-5 justify-center items-center">
        <span className="border rounded-full px-2 md:py-1 flex gap-2 text-xs md:text-sm items-center">
          {" "}
          <Code size={12} /> Code | Create | Learn
        </span>
        <h1 className=" text-4xl md:text-5xl lg:text-6xl pb-2 font-extrabold overflow-hidden">
          Your Web Development <span className="text-accent">Playground</span>
        </h1>
        <p className="text-text-secondary text-xs md:text-md lg:text-lg">
          A simple and focused online IDE for practicing HTML, CSS and
          JavaScript. Write code, experiment with ideas and see your results
          instantly.
        </p>
        <button className="w-full md:p-1 px-2 py-1 text-sm md:text-md lg:text-lg text-white rounded-lg bg-accent flex justify-center items-center gap-1">
          Start Coding Now <ArrowRight />
        </button>
        <div className="flex gap-2 justify-center w-full text-xs md:text-sm text-text-secondary">
          <p className="mt-1">BUILT FOR</p>
          <span className="flex items-center justify-center gap-1">
            <img
              src={htmlLogo}
              alt="HTML Logo"
              className="h-7 md:h-8 p-1 bg-border/15 rounded-md"
            />
            <img
              src={cssLogo}
              alt="CSS Logo"
              className="h-7 md:h-8 p-1 bg-border/15 rounded-md"
            />
            <img
              src={jsLogo}
              alt="JS Logo"
              className="h-7 md:h-8 p-1 bg-border/15 rounded-md"
            />
          </span>
          <p className="mt-1">HTML | CSS | JavaScript</p>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 my-2">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.name}
              className="border border-accent flex flex-col items-center md:text-left bg-panel/20 p-2 md:p-4 rounded-lg"
            >
              <div className="border mb-5 flex h-8 md:h-10 w-8 md:w-10 items-center justify-center rounded-lg bg-accent/10 text-green-300 transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon size={19} />
                </div>
              <h1 className="capitalize font-bold text-sm md:text-xl">
                {feature.name}
              </h1>
              <p className="text-text-secondary text-xs md:text-sm">
                {feature.details}
              </p>
            </div>
          );
        })}
      </div>

      <footer className="mx-auto flex max-w-7xl items-center justify-between border-t border-white/20 pt-3 text-sm text-text-secondary">
        <span>&copy; {new Date().getFullYear()} || WebPad</span>
        {/* <span>| WebPad</span> */}
      </footer>
    </div>
  );
};

export default Home;
