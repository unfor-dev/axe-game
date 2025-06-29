import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { BackSide, Color } from "three";
import { degToRad } from "three/src/math/MathUtils.js";

export const GradientSky = ({
  colorTop = "black",
  colorMiddle = "#3ac3f6",
  colorBottom = "#567572",
  blendIntensity = 0.06,
  blendMiddle = 0.2,
}) => {
  return (
    <mesh rotation-x={degToRad(-5)} depthWrite={false} depthTest={false}>
      <sphereGeometry args={[40]} />
      <gradientMaterial
        side={BackSide}
        colorBottom={colorBottom}
        colorTop={colorTop}
        colorMiddle={colorMiddle}
        blendMiddle={blendMiddle}
        blendIntensity={blendIntensity}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
};

const GradientMaterial = shaderMaterial(
  {
    colorTop: new Color("white"),
    colorBottom: new Color("skyblue"),
    colorMiddle: new Color("pink"),
    blendMiddle: 0.2,
    blendIntensity: 1,
  },
  /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
  /* glsl */ `
uniform vec3 colorTop;
uniform vec3 colorBottom;
uniform vec3 colorMiddle;
uniform float blendMiddle;
uniform float blendIntensity;
varying vec2 vUv;
void main() {
  vec3 mixedTop = mix(colorMiddle, colorTop, smoothstep(0.498, 0.502, vUv.y));
  vec3 mixedBottom = mix(colorMiddle, colorBottom, smoothstep(0.502, 0.498, vUv.y));

  vec3 mixedColor = mix(colorBottom, colorTop, smoothstep(0.45, 0.55, vUv.y));
  float blendMiddle = smoothstep(0.5-blendMiddle, 0.5, vUv.y)  * smoothstep(0.5 + blendMiddle, 0.5, vUv.y) * blendIntensity;
  vec3 finalColor = mix(mixedColor, colorMiddle, blendMiddle);
  gl_FragColor = vec4(finalColor, 1.0);
  
}
`
);

extend({ GradientMaterial });
