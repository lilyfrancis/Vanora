export interface LaunchpadStage {
  id: string
  number: string
  title: string
  descriptor: string
  details: string[]
}

export const launchpadStages: LaunchpadStage[] = [
  {
    id: 'validate',
    number: '01',
    title: 'Validate & Structure',
    descriptor: 'Idea, model, market validation, strategy.',
    details: ['Idea & market validation', 'Business model design', 'Go-to-market strategy'],
  },
  {
    id: 'register',
    number: '02',
    title: 'Register & Establish',
    descriptor: 'Company registration in Nigeria + US / UK, banking & compliance.',
    details: ['Company registration — Nigeria, US, UK', 'Banking setup', 'Regulatory compliance'],
  },
  {
    id: 'build',
    number: '03',
    title: 'Build',
    descriptor: 'Branding, website, StackForge tools & first hires.',
    details: ['Brand identity & website', 'StackForge tool deployment', 'First key hires'],
  },
  {
    id: 'grow',
    number: '04',
    title: 'Grow',
    descriptor: 'Plug in revenue systems & advisory until the milestone is hit.',
    details: ['Revenue system installation', 'Ongoing advisory', 'Scale to milestone or raise'],
  },
]
