import AnimatedShaderHero from '@/components/ui/animated-shader-hero'

// Reference usage example for AnimatedShaderHero — not wired into any route,
// kept alongside the component for documentation purposes.
function AnimatedShaderHeroDemo() {
  return (
    <div className="w-full">
      <AnimatedShaderHero
        trustBadge={{
          text: 'Trusted by forward-thinking teams.',
          icons: ['✨'],
        }}
        headline={{
          line1: 'Launch Your',
          line2: 'Workflow Into Orbit',
        }}
        subtitle="Supercharge productivity with AI-powered automation and integrations built for the next generation of teams — fast, seamless, and limitless."
        buttons={{
          primary: {
            text: 'Get Started for Free',
            onClick: () => console.log('Get Started clicked!'),
          },
          secondary: {
            text: 'Explore Features',
            onClick: () => console.log('Explore Features clicked!'),
          },
        }}
      />
    </div>
  )
}

export default AnimatedShaderHeroDemo
