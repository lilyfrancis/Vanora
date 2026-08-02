import {
  TrendingUp,
  Bot,
  Megaphone,
  Users,
  GraduationCap,
  Building2,
  Landmark,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

export interface Pillar {
  id: string
  number: string
  title: string
  descriptor: string
  icon: LucideIcon
  products: string[]
  services: string[]
}

export const pillars: Pillar[] = [
  {
    id: 'revenue-growth',
    number: '01',
    title: 'Revenue & Growth',
    descriptor: 'AI lead-gen, outreach & sales systems.',
    icon: TrendingUp,
    products: ['DealFlow Engine', 'Revenue Reactor AI', 'OmniReach AI', 'Revenue Leak Audit'],
    services: [
      'DealFlow Engine — automated pipeline build-out',
      'Revenue Reactor AI — AI-scored lead routing',
      'OmniReach AI — multichannel outbound at scale',
      'Revenue Leak Audit — find where deals stall',
      'Sales playbook & CRM re-engineering',
      'Pricing & offer strategy',
    ],
  },
  {
    id: 'ai-automation',
    number: '02',
    title: 'AI & Automation',
    descriptor: 'Agents, voice, chat & process automation.',
    icon: Bot,
    products: ['SmartResponse AI Desk', 'AI Voice Agents', 'WhatsApp Commerce', 'AI Readiness Audit'],
    services: [
      'SmartResponse AI Desk — inbox & support automation',
      'AI Voice Agents — inbound/outbound call handling',
      'WhatsApp Commerce — automated sales & support',
      'AI Readiness Audit — where automation pays off first',
      'Internal workflow & operations automation',
      'Custom agent design and deployment',
    ],
  },
  {
    id: 'digital-demand',
    number: '03',
    title: 'Digital & Demand',
    descriptor: 'SEO, funnels, GTM & brand demand.',
    icon: Megaphone,
    products: ['RankRocket AI', 'Funnels', 'AI Content Engine'],
    services: [
      'RankRocket AI — AI-driven SEO growth',
      'Funnel design, build & optimization',
      'AI Content Engine — always-on content production',
      'Go-to-market strategy & launch planning',
      'Paid demand generation',
      'Brand positioning & messaging',
    ],
  },
  {
    id: 'talent-people',
    number: '04',
    title: 'Talent & People',
    descriptor: 'AI recruitment, staffing & HR-as-a-service.',
    icon: Users,
    products: [],
    services: [
      'AI-assisted recruitment & candidate screening',
      'Staffing & contract placement',
      'HR-as-a-service — policy, payroll, compliance',
      'Org design & role architecture',
      'Performance frameworks',
      'Culture & onboarding systems',
    ],
  },
  {
    id: 'corporate-enablement',
    number: '05',
    title: 'Corporate Enablement',
    descriptor: 'Leadership, management & sales training, fractional execs.',
    icon: GraduationCap,
    products: [],
    services: [
      'Leadership development programs',
      'Management & people-manager training',
      'Sales skills & negotiation training',
      'Fractional executive placement',
      'Executive coaching',
      'Team performance workshops',
    ],
  },
  {
    id: 'business-foundations',
    number: '06',
    title: 'Business Foundations',
    descriptor: 'Setup, market entry & process design.',
    icon: Building2,
    products: ['BizLaunch 360'],
    services: [
      'BizLaunch 360 — end-to-end business setup',
      'Market entry strategy',
      'Process & SOP design',
      'Legal & regulatory setup coordination',
      'Operating model design',
      'Standard operating procedures',
    ],
  },
  {
    id: 'sector-solutions',
    number: '07',
    title: 'Sector Solutions',
    descriptor: 'Education, real estate & government.',
    icon: Landmark,
    products: ['EduXpert 360', 'PropertyLead X'],
    services: [
      'EduXpert 360 — education sector systems',
      'PropertyLead X — real estate lead generation',
      'Government & public-sector advisory',
      'Sector-specific compliance guidance',
      'Institutional partnership structuring',
      'Sector go-to-market playbooks',
    ],
  },
  {
    id: 'build-equip',
    number: '08',
    title: 'Build & Equip',
    descriptor: 'StackForge tool setup + custom branding.',
    icon: Wrench,
    products: ['StackForge'],
    services: [
      'StackForge — full growth stack deployment',
      'Custom branding & visual identity',
      'Website & product build',
      'Tooling selection & integration',
      'Team training on the new stack',
      'Ongoing stack maintenance',
    ],
  },
]
