import heroImage from "@/assets/hero.png";

const Hero = () => {
  return (
    <div className="">
      <img
        src={heroImage}
        alt="hero Image"
        className="w-full max-h-[600px] object-cover"
      />
    </div>
  );
};

export default Hero;
