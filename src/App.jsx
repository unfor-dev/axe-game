import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0.5, 10], fov: 50 }}>
        <Experience />
      </Canvas>
    </>
  );
}

export const AUDIOS = {
  pop: "sfxs/balloon-pop-48030.mp3",
  impact: "sfxs/cinematic-hit-159487-cut.mp3",
  throw: "sfxs/axe-slash-1-106748-cut.mp3",
};


export default App;
