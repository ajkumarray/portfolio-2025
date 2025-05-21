
import { useState, useEffect } from "react";
import { Home, User, Briefcase, Wrench, MailPlus } from "lucide-react";

type NavItem = {
  icon: JSX.Element;
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { icon: <Home className="h-5 w-5" />, href: "#home", label: "Home" },
  { icon: <User className="h-5 w-5" />, href: "#about", label: "About" },
  { icon: <Briefcase className="h-5 w-5" />, href: "#portfolio", label: "Portfolio" },
  { icon: <Wrench className="h-5 w-5" />, href: "#services", label: "Services" },
  { icon: <MailPlus className="h-5 w-5" />, href: "#contact", label: "Contact" },
];

export default function FloatingNavBar() {
  const [activeSection, setActiveSection] = useState<string>("#about"); // Default to About

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Get all section elements
      const sections = navItems.map((item) => 
        document.querySelector(item.href) as HTMLElement
      ).filter(Boolean);
      
      // Find the current active section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section) continue;
        
        if (section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial active section
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 py-3 px-5 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border border-gray-200 dark:border-gray-800 animate-fade-in">
      <div className="flex items-center justify-between space-x-2 md:space-x-4">
        {navItems.map((item) => {
          const isActive = activeSection === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className="relative px-3 py-2 group"
            >
              {/* The elevated active icon */}
              <div 
                className={`relative flex flex-col items-center justify-center rounded-full transition-all duration-300 ${
                  isActive 
                    ? "p-2 bg-green-500 text-white -translate-y-5 shadow-[0_4px_12px_rgba(34,197,94,0.4)] z-20" 
                    : "p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 z-10"
                }`}
              >
                {item.icon}
                
                {/* Show label for all items, but style differently for active */}
                <span className={`text-[10px] whitespace-nowrap font-medium mt-1 ${
                  isActive 
                    ? "text-gray-700 dark:text-gray-300" 
                    : "text-gray-600 dark:text-gray-400"
                }`}>
                  {item.label}
                </span>
              </div>
              
              {/* Crater effect in the navbar */}
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-white/90 dark:bg-gray-900/90 rounded-b-xl z-0"></div>
              )}
              
              {/* Hover effect for inactive items */}
              {!isActive && (
                <div className="absolute inset-0 rounded-full bg-gray-100/0 dark:bg-gray-800/0 transition-all duration-300 group-hover:bg-gray-100/70 dark:group-hover:bg-gray-800/40 z-0"></div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
