import { ArrowBigRight, ArrowRight, Code, Code2, icons } from "lucide-react";
import htmlLogo from "../../public/html_logo.png";
import cssLogo from "../../public/css_logo.png";
import jsLogo from "../../public/js_logo.png";
import editorPage from "../../public/editorPage.png";

const features = [
  {
    name: "instant playground",
    details:
      "Start coding immediately with pre-configured HTML, CSS and JavaScript files",
    icons: "<Console />",
  },
  {
    name: "live preview",
    details: "See your changes in real-time with an integrated preview panel.",
    icons: "<Console />",
  },
  {
    name: "save & reset",
    details:
      "Keep your progress or reset back to the original files with one click",
    icons: "<Console />",
  },
  {
    name: "beginner friendly",
    details:
      "Clear interface, simple workflow and a great way to learn web development.",
    icons: "<Console />",
  },
];

const Home = () => {
  return (
    <div className="flex flex-col h-screen text-white bg-black px-15">
      <div className="border text-5xl">NAVBAR</div>

      <div className="border-white border-2 flex gap-5 p-20 flex-1 min-h-0 items-center justify-start">
        <div className="flex flex-col gap-5 justify-center items-center">
          <span className="border rounded-full px-5 py-2 flex gap-2"> <Code /> Code | Create | Learn</span>
          <h1 className="text-8xl pb-5 font-extrabold overflow-hidden">Your Web Development <span className="text-accent">Playground</span></h1>
          <p className="text-xl">
            A simple and focused online IDE for practicing HTML, CSS and
            JavaScript. Write code, experiment with ideas and see your results
            instantly.
          </p>
          <button className="w-full p-2 text-lg text-white rounded-lg bg-accent flex justify-center items-center gap-2">
            Start Coding Now <ArrowRight />
          </button>
          <div className="flex gap-2">
            <p className="mt-3">Built For</p>
            <span className="flex items-center justify-center gap-2">
              <img src={htmlLogo} alt="" className="h-12 p-1 bg-border/30 rounded-xl" />
              <img src={cssLogo} alt="" className="h-12 p-1 bg-border/30 rounded-xl" />
              <img src={jsLogo} alt="" className="h-12 p-1 bg-border/30 rounded-xl" />
            </span>
            <p className="mt-3">HTML . CSS . JavaScript</p>
          </div>
        </div>

        {/* editor image */}
        <div className="">
          <img src={editorPage} alt="Editor Page" className="" />
        </div>
      </div>

      {/* Features */}
      <div className="flex justify-evenly gap-5">
        {features.map((feature)=> (
          <div className="flex flex-col text-left">
            <h1 className="capitalize text-xl font-bold">{feature.name}</h1>
            <p className="text-text-secondary">{feature.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
