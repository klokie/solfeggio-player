import {
  Shader,
  Blob,
  FilmGrain,
  ProgressiveBlur,
  Swirl,
  WaveDistortion
} from 'shaders/react'
<Shader>
  <FilmGrain
    animated={0}
    strength={0.3}>
    <ProgressiveBlur
      angle={90}
      center={{ x: 0.5, y: 0.5 }}
      falloff={0.47}
      intensity={1000}>
      <Swirl
        blend={5}
        coarseX={50}
        coarseY={50}
        colorA="#4e7fd9"
        colorB="#121bc9"
        colorC="#529ff7"
        colorSpace="oklch"
        complexity={5.5}
        detail={0.5}
        fineX={50}
        fineY={50}
        mediumX={50}
        mediumY={50}
        scale={3}
        speed={0.3} />
      <Blob
        blendMode="normal-oklch"
        colorA="#fad041"
        colorB="#fa722a"
        colorSpace="oklab"
        deformation={0}
        highlightColor="#ffe01a"
        highlightIntensity={0.35}
        highlightX={0.11}
        highlightY={-0.01}
        highlightZ={0.13}
        softness={0.43} />
      <WaveDistortion
        angle={360}
        edges="mirror"
        frequency={10}
        speed={3.4}
        strength={0.01} />
    </ProgressiveBlur>
  </FilmGrain>
</Shader>