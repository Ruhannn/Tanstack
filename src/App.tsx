import Project from "./components/Project";
import Todos from "./components/Todos";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-[#1a1b26] text-gray-300 space-y-8 p-6">
      {/* <Todos /> */}
      <Project />
    </div>
  );
}
