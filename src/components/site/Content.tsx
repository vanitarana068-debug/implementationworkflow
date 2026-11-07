import { useState } from "react";
import {
  PhoneMissed, Keyboard, Timer, MessagesSquare, LayoutGrid, LineChart, ArrowRight,
  PhoneCall, Magnet, HeartHandshake, Megaphone, BarChart3, Workflow, Search, ClipboardCheck,
  PenTool, Plug, Activity, Stethoscope, UtensilsCrossed, Building2, Scissors, Dumbbell,
  ShoppingCart, Store, Hotel, GraduationCap, Plane, Check, Plus, Minus,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AUDIT_URL } from "@/lib/site";
import { Section } from "./Section";

const problems = [
  { i: PhoneMissed, t: "Missed customer enquiries", d: "Calls and messages after hours go unanswered — and to competitors." },
  { i: Keyboard, t: "Manual data entry", d: "Hours copying details between forms, sheets and CRMs." },
  { i: Timer, t: "Slow lead follow-ups", d: "Leads go cold while your team catches up." },
  { i: MessagesSquare, t: "Repetitive customer support", d: "The same ten questions, answered every single day." },
  { i: LayoutGrid, t: "Unorganised operations", d: "Tasks scattered across apps, inboxes and memory." },
  { i: LineChart, t: "No performance insights", d: "Decisions made on gut feel instead of live data." },
];

export function Problems() {
  return (
    <Section eyebrow="The problem" title="Hours lost to work AI can *handle.*" alt>
      <div data-reveal-stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {problems.map(({ i: I, t, d }, n) => (
          <div key={t} className="glass card-hover group rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="icon-box"><I className="h-[18px] w-[18px]" /></div>
              <span className="label-mono text-foreground/35">0{n + 1}</span>
            </div>
            <h3 className="mt-6 text-lg font-medium">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            <a href="#solutions" className="label-mono mt-5 inline-flex items-center gap-1 text-primary">See the solution <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></a>
          </div>
        ))}
      </div>
    </Section>
  );
}

const solutions = [
  { i: PhoneCall, t: "AI Receptionist", f: ["24/7 call answering", "Appointment booking", "Customer enquiries", "Call routing"], d: "A voice agent that answers every call, books appointments into your calendar and routes urgent calls to the right person.", tools: "Vapi, Google Calendar, Twilio" },
  { i: Magnet, t: "AI Lead Generation", f: ["Website lead capture", "Lead qualification", "Automated follow-ups", "CRM integration"], d: "Capture leads from every channel, score them with AI and follow up in minutes — not days.", tools: "n8n, Airtable, HubSpot, OpenAI" },
  { i: HeartHandshake, t: "AI Customer Management", f: ["WhatsApp automation", "Customer support", "Appointment reminders", "Customer segmentation"], d: "Keep every customer informed and looked after on the channels they already use.", tools: "WhatsApp Cloud API, Gemini, Supabase" },
  { i: Megaphone, t: "AI Marketing Automation", f: ["Email marketing", "Campaign automation", "Customer nurturing", "Marketing reports"], d: "Personalised campaigns that write, send and report on themselves.", tools: "Brevo, Make, OpenAI" },
  { i: BarChart3, t: "AI Business Analytics", f: ["Revenue tracking", "Expense monitoring", "Profit & loss analysis", "Performance reporting"], d: "A live view of revenue, expenses and profit, with AI-written weekly summaries.", tools: "Google Sheets, Stripe, Supabase" },
  { i: Workflow, t: "AI Workflow Automation", f: ["Connect business apps", "Automate repetitive tasks", "Data synchronisation", "Automated notifications"], d: "Connect the tools you already use so data flows without copy-paste.", tools: "n8n, Make, Webhooks, REST APIs" },
];

export function Solutions() {
  const [open, setOpen] = useState<(typeof solutions)[number] | null>(null);
  return (
    <Section id="solutions" eyebrow="Solutions" title="One system. Every part of your *business.*">
      <div data-reveal-stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map((s) => (
          <button key={s.t} onClick={() => setOpen(s)} className="glass card-hover group rounded-2xl p-7 text-left">
            <div className="icon-box"><s.i className="h-[18px] w-[18px]" /></div>
            <h3 className="mt-6 text-xl font-medium">{s.t}</h3>
            <ul className="mt-5 space-y-2.5 border-t border-white/5 pt-5">
              {s.f.map((f) => <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground"><span className="h-1 w-1 rounded-full bg-primary" />{f}</li>)}
            </ul>
            <span className="label-mono mt-6 inline-flex items-center gap-1 text-primary">Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
          </button>
        ))}
      </div>
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="border-border bg-card">
          {open && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-normal">{open.t}</DialogTitle>
                <DialogDescription>{open.d}</DialogDescription>
              </DialogHeader>
              <ul className="space-y-2">{open.f.map((f) => <li key={f} className="flex gap-2 text-sm"><Check className="h-4 w-4 text-primary" />{f}</li>)}</ul>
              <p className="text-sm text-muted-foreground">Typical tools: {open.tools}</p>
              <a href={AUDIT_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(null)} className="btn-primary">Get a free AI audit</a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}

const steps = [
  { i: Search, t: "Business Discovery", d: "Understand your business, challenges and requirements." },
  { i: ClipboardCheck, t: "AI Business Audit", d: "Identify automatable tasks and estimate savings." },
  { i: PenTool, t: "Workflow Design", d: "Design a custom automation architecture." },
  { i: Plug, t: "AI Implementation", d: "Connect agents, APIs, CRM and messaging." },
  { i: Activity, t: "Monitor & Optimise", d: "Track performance and keep improving." },
];

export function Process() {
  return (
    <Section eyebrow="How it works" title="From manual to automatic in *five steps.*" alt>
      <div className="relative grid gap-6 md:grid-cols-5">
        <svg className="absolute left-0 right-0 top-7 hidden h-1 w-full md:block" preserveAspectRatio="none">
          <line x1="10%" y1="2" x2="90%" y2="2" stroke="var(--primary)" strokeWidth="1" className="animate-dash" opacity="0.45" />
        </svg>
        {steps.map(({ i: I, t, d }, n) => (
          <div key={t} className="relative text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-background text-primary shadow-[0_0_24px_-6px_var(--primary)]"><I className="h-5 w-5" /></div>
            <div className="label-mono mt-5 text-primary">Step 0{n + 1}</div>
            <h3 className="mt-2 font-medium">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const industries = [
  { i: Stethoscope, t: "Dental Clinics", w: "Missed-call text-back, recall reminders, AI booking" },
  { i: UtensilsCrossed, t: "Restaurants", w: "WhatsApp reservations, review requests, menu FAQs" },
  { i: Building2, t: "Real Estate", w: "Lead qualification, viewing scheduling, agent alerts" },
  { i: Scissors, t: "Salons & Beauty", w: "24/7 booking, no-show reminders, rebooking nudges" },
  { i: Dumbbell, t: "Gyms & Fitness", w: "Trial follow-ups, renewal reminders, class booking" },
  { i: ShoppingCart, t: "E-commerce", w: "Order-status support, abandoned cart recovery" },
  { i: Store, t: "Retail Stores", w: "Stock alerts, loyalty messages, sales reporting" },
  { i: Hotel, t: "Hotels & Hospitality", w: "Guest concierge, booking confirmations, upsells" },
  { i: GraduationCap, t: "Coaching Institutes", w: "Enquiry handling, fee reminders, parent updates" },
  { i: Plane, t: "Travel Agencies", w: "Itinerary quotes, lead nurturing, trip reminders" },
];

export function Industries() {
  return (
    <Section id="industries" eyebrow="Industries" title="Built around the way your *industry works.*">
      <div data-reveal-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {industries.map(({ i: I, t, w }) => (
          <div key={t} className="glass card-hover rounded-2xl p-5">
            <I className="h-5 w-5 text-primary" strokeWidth={1.75} />
            <h3 className="mt-5 font-medium">{t}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{w}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const faqs = [
  ["What is AI workflow automation?", "Connecting your business tools with AI so repetitive tasks — replying to enquiries, updating records, sending follow-ups — happen automatically."],
  ["Can AI automate my small business?", "Most small businesses have several high-volume, rule-based tasks that are ideal for automation. The free audit shows where to start."],
  ["Do I need technical knowledge?", "No. We design, build and maintain everything; you get a simple dashboard."],
  ["How long does implementation take?", "A single workflow usually takes 1–2 weeks; larger systems 3–6 weeks."],
  ["Can AI integrate with my existing CRM?", "Yes — HubSpot, Airtable, Google Sheets and most tools with an API or webhook."],
  ["Can you automate WhatsApp?", "Yes, using the official WhatsApp Cloud API."],
  ["Do you provide ongoing support?", "Yes, through optional monthly maintenance plans."],
  ["Can I add more workflows later?", "Absolutely — systems are designed to grow with you."],
  ["Is my business data secure?", "We use secure, access-controlled infrastructure and never expose credentials in your website."],
];

export function FAQ() {
  const [o, setO] = useState<number | null>(0);
  return (
    <Section id="faq" eyebrow="FAQ" title="Questions, *answered.*">
      <div className="mx-auto max-w-3xl border-t border-white/10">
        {faqs.map(([q, a], i) => (
          <div key={q} className="border-b border-white/10">
            <button onClick={() => setO(o === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-normal transition-colors hover:text-primary">
              {q} {o === i ? <Minus className="h-4 w-4 text-primary" /> : <Plus className="h-4 w-4 text-muted-foreground" />}
            </button>
            {o === i && <p className="max-w-2xl pb-6 text-muted-foreground">{a}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}
