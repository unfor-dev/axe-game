export const Experience = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 10, 0]} intensity={1} />
      <spotLight
        position={[0, 10, 0]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={1}
      />
    </>
  );
};
