import { useState, type FormEvent } from 'react'
import { MagneticButton } from '@/components/MagneticButton'

const needs = ['AI & Automation', 'Revenue & Growth', 'Talent & People', 'Vanora Launchpad', 'Something else']

const inputClasses =
  'w-full rounded-xl border border-line bg-cloud px-4 py-3 text-slate placeholder:text-slate/40 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    await new Promise((resolve) => setTimeout(resolve, 700))
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-line bg-paper p-10 text-center">
        <p className="font-display text-2xl text-slate">Thank you.</p>
        <p className="mt-3 text-slate/70">We've received your message and will be in touch within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" action="https://formspree.io/f/placeholder" method="POST">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate/70">
          Name
          <input required name="name" type="text" className={inputClasses} placeholder="Your full name" />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate/70">
          Company
          <input required name="company" type="text" className={inputClasses} placeholder="Company name" />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm text-slate/70">
        Email
        <input required name="email" type="email" className={inputClasses} placeholder="you@company.com" />
      </label>

      <label className="flex flex-col gap-2 text-sm text-slate/70">
        What do you need?
        <select required name="need" defaultValue="" className={inputClasses}>
          <option value="" disabled>
            Select an area
          </option>
          {needs.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 text-sm text-slate/70">
        Message
        <textarea name="message" rows={5} className={inputClasses} placeholder="Tell us where you're stuck." />
      </label>

      <MagneticButton type="submit" className="mt-2 self-start">
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </MagneticButton>
    </form>
  )
}
