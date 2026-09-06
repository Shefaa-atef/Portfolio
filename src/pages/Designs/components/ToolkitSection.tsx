import { useInView } from "../../About/hooks/useInView";
import ChapterHeader from "../../About/components/ChapterHeader";
import figmaLogo from "../../../assets/images/photos/designs/figma.webp";
import illustratorLogo from "../../../assets/images/photos/designs/adove illustrator.webp";
import photoshopLogo from "../../../assets/images/photos/designs/photoshop.webp";
import premiereLogo from "../../../assets/images/photos/designs/adobe priemere.webp";
import canvaLogo from "../../../assets/images/photos/designs/canva.webp";
import expressLogo from "../../../assets/images/photos/designs/adobe express.webp";
import aiLogo from "../../../assets/images/photos/designs/ai.webp";

const TOOLS = [
  { name: "Figma", icon: figmaLogo },
  { name: "Adobe Illustrator", icon: illustratorLogo },
  { name: "Adobe Photoshop", icon: photoshopLogo },
  { name: "Adobe Premiere", icon: premiereLogo },
  { name: "Canva", icon: canvaLogo },
  { name: "Adobe Express", icon: expressLogo },
  { name: "Design with AI", sub: "(Videos & Photos)", icon: aiLogo },
];

export default function ToolkitSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="border-b-4 border-black bg-[#faf2fc] overflow-hidden" ref={ref}>
      <ChapterHeader
        chapter="CH.01"
        overline="SOFTWARE & CREATIVE GEAR"
        title="POWER-UPS & THE ARSENAL!"
        titleId="designs-toolkit-title"
        inView={inView}
        accent="var(--ink-purple)"
        ink="#fff"
      />

      <div className="p-6 md:p-10 lg:p-14 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-5">
          {TOOLS.map((t, index) => (
            <div
              key={t.name}
              className="flex flex-col items-center justify-between p-4 min-h-[185px] border-3 border-black bg-white shadow-[6px_6px_0_#000] hover:-translate-y-2 hover:shadow-[10px_10px_0_#000] transition-all rounded-md group"
              style={{
                animation: inView
                  ? `panel-slam 0.45s cubic-bezier(0.22,1,0.36,1) ${0.08 + index * 0.05}s both`
                  : "none",
              }}
            >
              <div className="w-full flex-1 flex items-center justify-center p-2">
                <img
                  src={t.icon}
                  alt=""
                  aria-hidden="true"
                  className="w-16 h-16 lg:w-20 lg:h-20 object-contain group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <div className="text-center mt-2">
                <span className="font-comic text-lg lg:text-xl text-center text-black leading-tight uppercase font-bold block">
                  {t.name}
                </span>
                {t.sub && (
                  <span className="font-sans text-[11px] font-bold text-[var(--ink-purple)] block leading-tight mt-0.5">
                    {t.sub}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



