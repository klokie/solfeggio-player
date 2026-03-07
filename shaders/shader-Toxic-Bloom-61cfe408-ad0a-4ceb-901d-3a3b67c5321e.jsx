import {
  Shader,
  Blob,
  FlowField,
  ProgressiveBlur,
  Swirl
} from 'shaders/react'
<Shader>
  <Swirl
    blend={5}
    colorA="#143620"
    colorB="#362238"
    colorSpace="oklch"
    detail={0.5}
    speed={0.3} />
  <Blob
    blendMode="normal-oklch"
    colorA="#0d778f"
    colorB="#99fa2a"
    colorSpace="oklab"
    deformation={1}
    highlightColor="#ffe01a"
    highlightIntensity={0.35}
    highlightX={-0.1}
    highlightY={-0.01}
    highlightZ={0.13}
    softness={0.43} />
  <ProgressiveBlur
    angle={90}
    center={{ x: 0.5, y: 0.5 }}
    falloff={0.47}
    intensity={1000} />
  <FlowField
    detail={4.4} />
</Shader>