import Link from "next/link";

interface AboutUsSectionProps {
  description: string;
  descriptionTextSize: number;
  descriptionLeadingHeight: number;
  hasButton: boolean | null;
  buttonText: string | null;
  backgroundColor: string;
  textColor: string;
  descriptionWidth: number;
}
export default function AboutUsSection({
  description,
  descriptionTextSize,
  descriptionLeadingHeight,
  hasButton,
  buttonText,
  backgroundColor,
  textColor,
  descriptionWidth,
}: AboutUsSectionProps) {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-[60px] min-h-screen font-opus`}
      style={{ backgroundColor: backgroundColor }}
    >
      <p
        className={`text-center w-[${descriptionWidth}%] text-[16px] sm:text-[30px] md:text-[${descriptionTextSize}] font-opus`}
        style={{
          color: textColor,
          lineHeight: `${descriptionLeadingHeight}px`,
        }}
      >
        {description}
      </p>

      {hasButton && (
        <Link href={"/"}>
          <button
            className=" text-black font-opus text-[20px] flex justify-center items-center md:rounded-[20px] rounded-[5px] md:w-[232px] w-[155px] h-[50px] md:h-[77px]"
            style={{
              backgroundColor: textColor,
            }}
          >
            {buttonText}
          </button>
        </Link>
      )}
    </div>
  );
}
