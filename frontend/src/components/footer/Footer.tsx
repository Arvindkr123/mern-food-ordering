const Footer = () => {
  return (
    <div className="bg-red-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-5xl text-white font-bold tracking-tight">
          MernEats.com
        </span>
        <span className="text-white font-bold  tracking-tight flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Services</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
