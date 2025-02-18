import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import Header from "@/components/Navbar/Header";
import React from "react";

type Props = {
    children: React.ReactNode;
    showHero?: boolean;
};


const layout = ({ children, showHero }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {showHero && <Hero />}
            <div className="container mx-auto flex-1 py-10">  {children}</div>
            <Footer />
        </div>
    )
}

export default layout