import Footer from "./footer";
import Navbar from "./navbar";

export default function DynamicCourseLayout({
  children,
  course,
}: {
  children: React.ReactNode;
  course: {
    id: string;
    fullTitle: string;
    slug: string;
    bannerColor?: string;
  };
}) {
  const bgColor = course.bannerColor || 'bg-blue-600';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Banner superior dinámico */}
      <header className={`${bgColor} py-20 px-4 text-white`}>
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">{course.fullTitle}</h1>
          <p className="text-xl">Curso especializado para ingenieros</p>
        </div>
      </header>

      {/* Contenido específico del curso */}
      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}