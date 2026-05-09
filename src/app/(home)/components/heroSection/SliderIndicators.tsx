'use client';

interface SliderIndicatorsProps {
  currentSlide: number;
  slides: any[];
}

const SliderIndicators = ({ currentSlide, slides }: SliderIndicatorsProps) => {
  return (
    <div className="w-full px-6 sm:px-12 md:px-20 lg:px-24 xl:px-32 pb-8 mt-auto flex items-end justify-between relative z-30">
      {/* Pagination Indicators */}
      <div className="flex gap-3 items-center">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-700 ease-in-out ${currentSlide === index ? 'w-10 sm:w-12 bg-primary shadow-sm' : 'w-2 bg-gray-300'}`}
          ></div>
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="hidden md:flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase origin-center rotate-90 mb-7">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-gray-400 to-transparent"></div>
      </div>
    </div>
  );
};

export default SliderIndicators;
