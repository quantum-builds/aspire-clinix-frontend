"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ServiceDetailCard from "./ServiceDetailCard";
import clsx from "clsx";
import { StaticImageData } from "next/image";

interface ServiceDetailSliderProp {
  is_dentistry: boolean;
  className?: string;
  scrollbarWidthOverride?: number;

  services: Array<{
    title: string;
    description: string | null;
    path: string;
    backgroundContent: string | StaticImageData;
  }>;
}

export default function ServiceDetailSlider({
  services,
  className,
}: ServiceDetailSliderProp) {
  const isDragging = useRef<boolean>(false);
  const scrollbarRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [thumbWidth, setThumbWidth] = useState(0);
  const [scrollThumbOffset, setScrollThumbOffset] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scrollbarWidth, setScrollbarWidth] = useState(848);
  const startDragX = useRef(0);
  const [loadedImages, setLoadedImages] = useState(0);

  useLayoutEffect(() => {
    if (loadedImages === services.length) {
      const container = containerRef.current;
      if (container) {
        const updateDimensions = () => {
          const screenWidth = window.innerWidth;
          if (screenWidth >= 1536) {
            setScrollbarWidth(848);
            setContainerWidth(3 * 562 + 2 * 40);
          } else if (screenWidth >= 1280) {
            setScrollbarWidth(600);
            setContainerWidth(3 * 562 + 2 * 40);
          } else if (screenWidth >= 1024) {
            setContainerWidth(3 * 562 + 2 * 40);
            setScrollbarWidth(470);
          } else if (screenWidth >= 768) {
            setContainerWidth(3 * 562 + 2 * 40);
            setScrollbarWidth(340);
          } else {
            setContainerWidth(562);
            setScrollbarWidth(310);
          }

          // Update thumb size
          const visibleWidth = container.clientWidth;
          const totalWidth = container.scrollWidth;
          const thumbSize = (visibleWidth / totalWidth) * scrollbarWidth;

          setThumbWidth(Math.max(thumbSize, 50));
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);

        return () => window.removeEventListener("resize", updateDimensions);
      }
    }
  }, [loadedImages, scrollbarWidth]);
  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1); // Increment the counter
  };
  useLayoutEffect(() => {
    handleContainerScroll(); // Force initial thumb synchronization
  }, [scrollbarWidth, thumbWidth]);

  const handleContainerScroll = () => {
    const container = containerRef.current;

    if (container) {
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      const thumbOffset =
        (scrollLeft / maxScrollLeft) * (scrollbarWidth - thumbWidth);
      setScrollThumbOffset(Math.min(thumbOffset, scrollbarWidth - thumbWidth));
    }
  };

  const handleScrollbarClick = (event: React.MouseEvent) => {
    const scrollbar = scrollbarRef.current;
    const container = containerRef.current;

    if (scrollbar && container) {
      const rect = scrollbar.getBoundingClientRect();
      const clickPosition = event.clientX - rect.left;
      const maxThumbOffset = scrollbarWidth - thumbWidth;

      // Calculate the corresponding scrollLeft for the container
      const scrollRatio = clickPosition / scrollbarWidth;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const newScrollLeft = scrollRatio * maxScrollLeft;

      container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
      setScrollThumbOffset(
        Math.min(
          (newScrollLeft / maxScrollLeft) * maxThumbOffset,
          maxThumbOffset
        )
      );
    }
  };

  const handleThumbDragStart = (event: React.MouseEvent) => {
    event.preventDefault();
    isDragging.current = true;
    startDragX.current = event.clientX;
  };

  const handleThumbDrag = (event: MouseEvent) => {
    if (!isDragging.current) return;

    const scrollbar = scrollbarRef.current;
    const container = containerRef.current;

    if (scrollbar && container) {
      const rect = scrollbar.getBoundingClientRect();
      const maxThumbOffset = scrollbarWidth - thumbWidth;
      const clickPosition = event.clientX - rect.left;

      const thumbOffset = Math.min(
        Math.max(0, clickPosition - thumbWidth / 2),
        maxThumbOffset
      );

      const scrollRatio = thumbOffset / maxThumbOffset;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      container.scrollTo({ left: scrollRatio * maxScrollLeft });
      setScrollThumbOffset(thumbOffset);
    }
  };

  const handleThumbDragEnd = () => {
    isDragging.current = false;
  };

  const handleScrollbarWheel = (event: WheelEvent) => {
    event.preventDefault();
    const container = containerRef.current;

    if (container) {
      // Forward the wheel delta to the container
      container.scrollLeft += event.deltaY;

      // Update the thumb position
      handleContainerScroll();
    }
  };

  useEffect(() => {
    const scrollbar = scrollbarRef.current;

    if (scrollbar) {
      // Add wheel event listener to custom scrollbar
      scrollbar.addEventListener("wheel", handleScrollbarWheel);
    }

    window.addEventListener("mousemove", handleThumbDrag);
    window.addEventListener("mouseup", handleThumbDragEnd);

    return () => {
      if (scrollbar) {
        scrollbar.removeEventListener("wheel", handleScrollbarWheel);
      }

      window.removeEventListener("mousemove", handleThumbDrag);
      window.removeEventListener("mouseup", handleThumbDragEnd);
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 md:gap-[3rem]">
      {/* Cards Container */}
      <div
        className="flex gap-[40px] overflow-x-auto scrollbar-hide w-full"
        ref={containerRef}
        onScroll={handleContainerScroll} // Synchronize with the custom scrollbar
        style={{ maxWidth: `${containerWidth}px` }}
      >
        {services.map((service, index) => (
          <ServiceDetailCard
            key={index}
            title={service.title}
            description={service.description}
            backgroundContent={service.backgroundContent}
            path={service.path}
            buttonText={"Learn More"}
            card_height={723}
            className="w-[350px] h-[full] md:w-[562px] md:h-[723px]"
            onLoad={handleImageLoad}
          />
        ))}
      </div>

      {/* Custom Scrollbar */}
      <div
        className={clsx(
          "relative h-3 bg-[#F1F5F9] rounded-full overflow-hidden cursor-pointer",
          className
        )}
        style={{ width: `${scrollbarWidth}px`, marginTop: "1rem" }}
        onClick={handleScrollbarClick} // Handles click interactions
        ref={scrollbarRef}
      >
        <div
          className="absolute h-full bg-black rounded-full"
          style={{
            width: `${thumbWidth}px`,
            transform: `translateX(${scrollThumbOffset}px)`,
            transition: "transform 0.1s ease",
          }}
          onMouseDown={handleThumbDragStart} // Handles drag interactions
        />
      </div>
    </div>
  );
}
