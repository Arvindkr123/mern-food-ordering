import appDownloadImage from "@/assets/appDownload.png";
import landingImage from "@/assets/landing.png";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white text-white shadow-lg py-8 flex flex-col gap-5 text-center -mt-16 rounded-lg">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into takeway today
        </h1>
        <span className="text-xl text-black">Food is just a click away!</span>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tight">
            Order takeaway even faster!
          </span>
          <span className="">
            Download the MernEats App for faster ordering and personalised
            recommendations
          </span>
          <img src={appDownloadImage} alt="app download image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
