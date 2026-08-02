import { Hero } from '@/components/Hero'
import { Positioning } from '@/components/Positioning'
import { Pillars } from '@/components/Pillars'
import { LaunchpadJourney } from '@/components/LaunchpadJourney'
import { Offers } from '@/components/Offers'
import { Ladder } from '@/components/Ladder'
import { ProofStrip } from '@/components/ProofStrip'
import { CTASection } from '@/components/CTASection'

export function Home() {
  return (
    <>
      <Hero />
      <Positioning />
      <Pillars />
      <LaunchpadJourney />
      <Offers />
      <Ladder />
      <ProofStrip />
      <CTASection />
    </>
  )
}
