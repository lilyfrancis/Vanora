import { Phone, MessageCircle, Crown, UserSquare2, Sparkles, Layers3, type LucideIcon } from 'lucide-react'

export interface Offer {
  id: string
  title: string
  descriptor: string
  icon: LucideIcon
  demo?: 'voice' | 'chat'
}

export const offers: Offer[] = [
  {
    id: 'ai-voice-agents',
    title: 'AI Voice Agents',
    descriptor: 'Answers calls, qualifies & books, 24/7.',
    icon: Phone,
    demo: 'voice',
  },
  {
    id: 'whatsapp-commerce',
    title: 'WhatsApp Commerce & Bots',
    descriptor: 'Automated sales & support where buyers already are.',
    icon: MessageCircle,
  },
  {
    id: 'fractional-executives',
    title: 'Fractional Executives',
    descriptor: 'CMO / CRO / CTO on retainer.',
    icon: Crown,
  },
  {
    id: 'founder-branding',
    title: 'Founder Personal Branding',
    descriptor: 'LinkedIn authority for CEOs.',
    icon: UserSquare2,
  },
  {
    id: 'ai-content-engine',
    title: 'AI Content Engine',
    descriptor: 'Done-for-you content at scale.',
    icon: Sparkles,
  },
  {
    id: 'stackforge',
    title: 'StackForge',
    descriptor: 'We deploy your growth stack and train your team to run it.',
    icon: Layers3,
  },
]
