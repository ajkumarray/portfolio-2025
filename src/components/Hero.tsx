
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section 
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16"
    >
      <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-lg md:text-xl font-medium text-primary">Hello, I'm</h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-gradient leading-tight">
            John Developer
          </h1>
          <p className="text-xl md:text-2xl font-medium text-muted-foreground">
            Full Stack Software Engineer
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-md">
            I build exceptional digital experiences with modern technologies,
            focusing on creating efficient and maintainable solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              className="rounded-full font-medium"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full font-medium"
              asChild
            >
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 rounded-full bg-primary/10 backdrop-blur-3xl"></div>
            <div className="absolute inset-4 rounded-full bg-card shadow-lg flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&h=600&q=80"
                alt="John Developer"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Background gradient elements */}
      <div className="absolute top-1/3 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full filter blur-3xl"></div>
    </section>
  );
}
