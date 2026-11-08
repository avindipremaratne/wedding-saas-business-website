import Image from "next/image";

// A simple phone outline around a screenshot of a wedding site.
export default function PhoneFrame({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative mx-auto w-[220px] rounded-[2.4rem] border-[10px] border-ink bg-ink shadow-[0_30px_80px_rgba(44,44,44,0.25)] sm:w-[260px]">
      <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
      <div className="overflow-hidden rounded-[1.7rem]">
        <Image src={src} alt={alt} width={720} height={1200} preload={priority} sizes="260px" className="h-auto w-full" />
      </div>
    </div>
  );
}
