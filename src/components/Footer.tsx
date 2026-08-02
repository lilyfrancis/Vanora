import { Link } from 'react-router-dom'
import { LinkedInIcon, XIcon, InstagramIcon } from '@/components/SocialIcons'

const anchors = [
  { label: 'Positioning', href: '/#positioning' },
  { label: 'What we install', href: '/#pillars' },
  { label: 'Launchpad', href: '/#launchpad' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-ink-2 text-cloud">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl">
              Vanora <span className="text-gold-lite">Partners</span>
            </p>
            <p className="mt-2 gold-italic text-base">Strategy. Installed.</p>
            <p className="mt-4 text-sm text-mist">A division of Techbots Group</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-3 text-sm text-mist md:flex-row md:gap-8">
              {anchors.map((a) => (
                <li key={a.label}>
                  <Link to={a.href} className="transition-colors hover:text-cloud">
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-mist transition-colors hover:text-gold-lite">
              <LinkedInIcon width={20} height={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X / Twitter" className="text-mist transition-colors hover:text-gold-lite">
              <XIcon width={18} height={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-mist transition-colors hover:text-gold-lite">
              <InstagramIcon width={20} height={20} />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-8 text-xs text-mist/70 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Vanora Partners. All rights reserved.</p>
          <p>vanorapartners.com</p>
        </div>
      </div>
    </footer>
  )
}
