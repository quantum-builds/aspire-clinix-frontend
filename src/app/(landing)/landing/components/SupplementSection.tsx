import Link from "next/link";

export default function SupplementSection() {
  const backgroundImage = "https://randomuser.me/api/portraits/men/75.jpg";
  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-[#D9D9D9] gap-[20px] relative p-4"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <p className="text-[18px] md:text-[64px] leading-{72.64px} font-opus">
        Our Supplements
      </p>
      <div className="flex flex-col items-center justify-center gap-[5px] text-[16px] lg:text-[32px] md:text-[28px] text-[#382F26] leading-{36.36px} font-gillSans">
        <p className="text-center w-[60%]">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Sociosqu a nec
          magna habitant nec. Ullamcorper dui varius volutpat primis lacinia
          elit morbi velit.
        </p>
      </div>
      <Link href="/">
        <button className="px-[20px] mt-5 flex justify-center items-center py-[25px] md:py-[30px] md:px-[80px] rounded-[20px] leading-[27.24px] bg-white text-[16px] md:text-[20px] font-opus absolute bottom-4 left-1/2 transform -translate-x-1/2 sm:relative sm:bottom-auto sm:left-auto sm:transform-none">
          Learn More
        </button>
      </Link>
    </div>
  );
}
