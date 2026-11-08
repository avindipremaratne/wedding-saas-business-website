import Image from "next/image";
import EnquiryForm from "@/components/EnquiryForm";
import PhoneFrame from "@/components/PhoneFrame";
import { brand } from "@/lib/brand";

const FEATURES = [
  ["Envelope opening", "Guests tap a wax-sealed envelope to open your invitation, and your song begins."],
  ["Your story", "Your names, your words and a gallery of your favourite photos."],
  ["Countdown", "A live countdown to the moment you say “I do”."],
  ["Venue and map", "Date, time and address, with one tap to directions."],
  ["Attire guide", "Your dress code with a suggested colour palette for guests."],
  ["Schedule", "Ceremony, reception and everything in between."],
  ["RSVPs your way", "An email for every reply, a spreadsheet, or a private link to your up-to-date list."],
  ["Made for phones", "Designed first for the screen your guests will open it on."],
] as const;

const STEPS = [
  ["Enquire", "Tell us about your wedding using the form below."],
  ["Design together", "We talk through your colours, wording, photos and music, and any special touches."],
  ["Preview and approve", "You see your site before anyone else, and we refine it until it's just right."],
  ["Go live", "Share your link with guests. RSVPs come to you the way you prefer."],
] as const;

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-12 text-center">
      <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-taupe">{kicker}</p>
      <h2 className="font-serif text-3xl font-light uppercase leading-snug tracking-[0.14em] text-ink md:text-4xl">{title}</h2>
      <div className="mx-auto mt-5 flex items-center justify-center gap-3" aria-hidden="true">
        <span className="h-px w-12 bg-taupe/50" />
        <span className="h-1.5 w-1.5 rotate-45 bg-taupe" />
        <span className="h-px w-12 bg-taupe/50" />
      </div>
    </div>
  );
}

const primaryButton =
  "rounded-full bg-ink px-8 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-charcoal";
const secondaryButton =
  "rounded-full border border-ink px-8 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:border-taupe hover:text-taupe";

// The Vindora Invites business website: a showcase for the done-for-you
// service. Couples enquire here; their site is then built in the
// wedding-saas admin area.
export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-taupe/15 bg-mist/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <a href="#top" className="flex shrink-0 items-center gap-2.5 text-ink sm:gap-3">
            <Image src="/brand/vindora-monogram.png" alt="" width={26} height={32} preload />
            <span className="whitespace-nowrap font-serif text-[0.95rem] uppercase tracking-[0.2em] sm:text-xl sm:tracking-[0.28em]">{brand.name}</span>
          </a>
          <nav className="flex items-center gap-1 font-sans text-[0.7rem] uppercase tracking-[0.18em] text-charcoal">
            <a href="#designs" className="hidden rounded-full px-3 py-2 hover:text-taupe sm:inline">
              Designs
            </a>
            <a href="#how" className="hidden rounded-full px-3 py-2 hover:text-taupe sm:inline">
              How it works
            </a>
            <a href="#pricing" className="hidden rounded-full px-3 py-2 hover:text-taupe md:inline">
              Pricing
            </a>
            <a href="#enquire" className="ml-2 rounded-full bg-ink px-4 py-2 text-white transition-colors hover:bg-charcoal">
              Enquire
            </a>
          </nav>
        </div>
      </header>

      <main id="top" className="flex-1 bg-mist text-ink">
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-16 md:grid-cols-[1.15fr_1fr] md:pt-24">
          <div className="text-center md:text-left">
            <Image
              src="/brand/vindora-logo.png"
              alt={`${brand.name} logo`}
              width={900}
              height={900}
              preload
              sizes="(min-width: 768px) 240px, 200px"
              className="mx-auto -mt-6 mb-2 w-[200px] md:mx-0 md:-ml-8 md:w-[240px]"
            />
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-taupe">Wedding invitations, reimagined online</p>
            <h1 className="mb-6 font-serif text-5xl font-light leading-[1.1] md:text-6xl lg:text-7xl">A website that feels like the invitation</h1>
            <p className="mx-auto mb-10 max-w-xl font-sans text-base font-light leading-relaxed text-charcoal md:mx-0">
              At {brand.name}, we design and build your wedding website for you. Guests open a wax-sealed envelope to
              find your invitation, your photos and your song, and their RSVPs come straight to you. You tell us what you
              love; we take care of the rest.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
              <a href="#enquire" className={primaryButton}>
                Make an enquiry
              </a>
              {brand.demoUrl && (
                <a href={brand.demoUrl} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
                  View the live demo
                </a>
              )}
            </div>
          </div>
          <PhoneFrame src="/showcase/envelope.jpg" alt="A wedding website opening with a wax-sealed envelope" priority />
        </section>

        <section className="border-t border-taupe/20 bg-porcelain px-6 py-20">
          <SectionTitle kicker="Everything your guests need" title="What's included" />
          <ul className="mx-auto grid max-w-5xl gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(([title, text]) => (
              <li key={title} className="text-center">
                <span className="mx-auto mb-4 block h-2 w-2 rotate-45 bg-taupe" aria-hidden="true" />
                <h3 className="mb-2 font-serif text-lg font-semibold uppercase tracking-[0.15em]">{title}</h3>
                <p className="font-sans text-sm font-light leading-relaxed text-charcoal">{text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="designs" className="scroll-mt-16 border-t border-taupe/20 px-6 py-20">
          <SectionTitle kicker="Designs" title="Choose your style" />
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <article className="flex flex-col items-center rounded-2xl border border-taupe/25 bg-white/70 p-8 text-center shadow-[0_8px_48px_rgba(0,0,0,0.05)]">
              <PhoneFrame src="/showcase/invited.jpg" alt="The Heirloom design" />
              <h3 className="mb-2 mt-8 font-serif text-2xl font-semibold uppercase tracking-[0.2em]">Heirloom</h3>
              <p className="mb-6 max-w-sm font-sans text-sm font-light leading-relaxed text-charcoal">
                Timeless ivory and gold, an embossed envelope with your own wax seal, and elegant script lettering. Colours
                can be tailored to your wedding palette.
              </p>
              {brand.demoUrl && (
                <a href={brand.demoUrl} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
                  View the live demo
                </a>
              )}
            </article>
            <article className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-taupe/40 bg-linen p-8 text-center">
              <p className="mb-4 font-serif text-5xl font-light italic text-taupe">Your vision</p>
              <h3 className="mb-2 font-serif text-2xl font-semibold uppercase tracking-[0.2em]">Something custom</h3>
              <p className="mb-6 max-w-sm font-sans text-sm font-light leading-relaxed text-charcoal">
                Have an invitation, a theme or a colour story already? We&apos;ll design your site around it, so everything
                feels like one celebration. More designs are on the way.
              </p>
              <a href="#enquire" className={secondaryButton}>
                Tell us your idea
              </a>
            </article>
          </div>
        </section>

        <section id="how" className="scroll-mt-16 border-t border-taupe/20 bg-porcelain px-6 py-20">
          <SectionTitle kicker="How it works" title={"From hello to “I\u00a0do”"} />
          <ol className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([title, text], i) => (
              <li key={title} className="text-center">
                <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-taupe font-serif text-xl font-semibold text-taupe">
                  {i + 1}
                </span>
                <h3 className="mb-2 font-serif text-lg font-semibold uppercase tracking-[0.15em]">{title}</h3>
                <p className="font-sans text-sm font-light leading-relaxed text-charcoal">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="pricing" className="scroll-mt-16 border-t border-taupe/20 px-6 py-20">
          <SectionTitle kicker="Pricing" title="Made to order" />
          <div className="mx-auto max-w-2xl rounded-2xl border border-taupe/25 bg-white/70 p-10 text-center shadow-[0_8px_48px_rgba(0,0,0,0.05)]">
            <p className="mb-6 font-sans text-base font-light leading-relaxed text-charcoal">
              Every site is designed for one couple, so the price depends on what you&apos;d like: the design, the
              sections, and any custom touches. Tell us about your day and we&apos;ll send you a quote.
            </p>
            <p className="mb-8 font-serif text-2xl font-semibold uppercase tracking-[0.2em] text-ink">Contact for pricing</p>
            <a href="#enquire" className={primaryButton}>
              Request a quote
            </a>
          </div>
        </section>

        <section id="enquire" className="scroll-mt-16 border-t border-taupe/20 bg-porcelain px-6 py-20">
          <SectionTitle kicker="Enquire" title="Let's create yours" />
          <div className="mx-auto max-w-2xl rounded-2xl border border-taupe/25 bg-white/80 p-6 shadow-[0_8px_48px_rgba(0,0,0,0.06)] md:p-10">
            <EnquiryForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-taupe/20 bg-mist px-6 pb-10 pt-4 text-center text-charcoal">
        <Image src="/brand/vindora-logo.png" alt={`${brand.name} logo`} width={900} height={900} sizes="220px" className="mx-auto w-[220px]" />
        <p className="mb-3 mt-3 font-sans text-[0.7rem] uppercase tracking-[0.25em] text-taupe">Wedding websites that open like an invitation</p>
        {brand.contactEmail && (
          <a href={`mailto:${brand.contactEmail}`} className="font-sans text-sm hover:text-ink">
            {brand.contactEmail}
          </a>
        )}
        <p className="mt-4 font-sans text-xs text-taupe">© {new Date().getFullYear()} {brand.name}</p>
      </footer>
    </>
  );
}
