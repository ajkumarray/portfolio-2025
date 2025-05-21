
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingNavBar from "@/components/FloatingNavBar";
import { ThemeProvider } from "@/context/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 80, // Adjust for header
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <FloatingNavBar />
        <main>
          <section id="home">
            <Hero />
          </section>
          <section id="about">
            {/* Placeholder for About section */}
            <div className="container mx-auto py-20">
              <h2 className="text-3xl font-bold heading-gradient mb-6">About Me</h2>
              <p className="text-muted-foreground mb-4">This is the About section</p>
            </div>
          </section>
          <section id="portfolio">
            <Projects />
          </section>
          <section id="skills">
            <Skills />
          </section>
          <section id="services">
            {/* Placeholder for Services section */}
            <div className="container mx-auto py-20">
              <h2 className="text-3xl font-bold heading-gradient mb-6">Services</h2>
              <p className="text-muted-foreground mb-4">This is the Services section</p>
            </div>
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
