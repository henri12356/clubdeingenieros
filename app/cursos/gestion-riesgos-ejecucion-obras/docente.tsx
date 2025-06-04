// app/cursos/gestion-riesgos-ejecucion-obras/docente.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Linkedin, 
  Twitter, 
  Github, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  Star, 
  Settings, 
  Zap,
  Sparkles, // Nuevo icono para el título
  ChevronRight // Nuevo icono para listas
} from 'lucide-react';

// Componentes Shadcn/UI (asegúrate que las rutas son correctas para tu proyecto)
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Interfaces (sin cambios)
interface ProyectoDestacado {
  id: number;
  entidad: string;
  descripcion: string;
}
interface AreaEstrategica {
  id: number;
  area: string;
  detalle?: string;
}
interface Formacion {
  id: number;
  nombre: string;
}
interface RedSocialDocente {
  id: number;
  nombre: string;
  url: string;
  iconName: keyof typeof iconComponentsDocente;
}
interface DatosDocenteKevin {
  nombreCompleto: string;
  tituloPrincipal: string;
  subtitulo: string;
  descripcionGeneral: string;
  areasEstrategicas: AreaEstrategica[];
  proyectosDestacados: ProyectoDestacado[];
  formacionAdicional: Formacion[];
  rasgosProfesionales: string[];
  imagenUrl: string;
  email?: string;
  redesSociales: RedSocialDocente[];
}

const iconComponentsDocente = {
  Linkedin,
  Twitter,
  Github,
  Globe,
};

// Datos del docente (sin cambios)
const datosDocenteKevin: DatosDocenteKevin = {
  nombreCompleto: "Ing. Kevin M. Navarro Chancan",
  tituloPrincipal: "Ingeniero Agrícola Colegiado",
  subtitulo: "Especialista en Evaluación de Riesgos (EVAR), Modelamiento Hidráulico e Hidrológico",
  descripcionGeneral:
    "Egresado de la Universidad Nacional Agraria La Molina, con sólida formación y experiencia en la gestión de recursos hídricos y la prevención de desastres. Comprometido con la aplicación de tecnologías y metodologías avanzadas para soluciones sostenibles.",
  imagenUrl: "/fondo01.jpg", // Actualiza esta ruta!
  email: "k.navarro@clubdeingenieros.com", // Ejemplo
  areasEstrategicas: [
    { id: 1, area: "Modelamiento Hidrológico e Hidráulico", detalle: "HEC-HMS, HEC-RAS" },
    { id: 2, area: "Evaluación de Riesgos de Desastres", detalle: "EVAR acreditado por CENEPRED" },
    { id: 3, area: "Manejo de Software Especializado", detalle: "ArcGIS, ModelMuse, Civil 3D, MODFLOW" },
    { id: 4, area: "Gestión de Recursos Hídricos en Microcuencas" },
    { id: 5, area: "Programación Aplicada a Hidrología", detalle: "R y Matlab" },
  ],
  proyectosDestacados: [
    { id: 1, entidad: "CENEPRED", descripcion: "Escenarios de riesgo por inundaciones y remoción en masa (cuencas Chancay-Huaral y Lurín)." },
    { id: 2, entidad: "SEDAPAL", descripcion: "Recuperación de servicios ecosistémicos de regulación hídrica en microcuencas." },
    { id: 3, entidad: "Municipalidad de Santa Eulalia", descripcion: "Estudio de Gestión de Riesgos." },
  ],
  formacionAdicional: [
    { id: 1, nombre: "Curso de Evaluación de Daños y Análisis de Necesidades (EDAN)" },
    { id: 2, nombre: "Curso de Plan de Prevención y Reducción de Riesgos de Desastres (PPRRD)" },
  ],
  rasgosProfesionales: [
    "Alto dominio técnico",
    "Liderazgo de equipos",
    "Gestión sostenible",
    "Adaptabilidad",
    "Enfoque en soluciones",
  ],
  redesSociales: [
    { id: 1, nombre: "LinkedIn", url: "https://www.linkedin.com/in/kevin-navarro-chancan/", iconName: "Linkedin" },
  ],
};

const DocenteSection = () => {
  // Variantes de animación de Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const sectionIconMap = {
    "Áreas de Especialización": <Zap className="w-5 h-5 mr-2 text-accent-foreground" />,
    "Proyectos Destacados": <Briefcase className="w-5 h-5 mr-2 text-accent-foreground" />,
    "Formación Complementaria": <GraduationCap className="w-5 h-5 mr-2 text-accent-foreground" />,
    "Rasgos Profesionales": <Star className="w-5 h-5 mr-2 text-accent-foreground" />,
  };

  // Helper para renderizar secciones con Cards estilizadas
  const renderSection = (title: keyof typeof sectionIconMap, content: React.ReactNode) => (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden transition-all duration-300 ease-out hover:shadow-2xl bg-card border-border/50 dark:border-border/30">
        <CardHeader className="bg-muted/30 dark:bg-muted/20 border-b border-border/50 dark:border-border/30">
          <CardTitle className="text-lg md:text-xl font-semibold text-card-foreground flex items-center">
            {sectionIconMap[title]}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 text-sm md:text-base text-muted-foreground leading-relaxed">
          {content}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <motion.section 
      id="docente" 
      className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 dark:from-slate-900 dark:to-slate-950"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          variants={itemVariants}
        >
          <div className="inline-flex items-center justify-center bg-primary/10 dark:bg-primary/20 p-2 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Conoce a tu Instructor
          </h2>
          <p className="mt-3 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Un profesional con la experiencia y dedicación para guiarte hacia el éxito.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Columna Izquierda (Información Detallada) */}
          <motion.div className="lg:w-2/3 space-y-6 md:space-y-8" variants={containerVariants}> {/* Aplicar stagger a las cards */}
            <motion.div
              variants={itemVariants}
              className="p-6 md:p-8 bg-card border border-border/50 dark:border-border/30 rounded-xl shadow-lg" // Usar bg-card para consistencia
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">{datosDocenteKevin.nombreCompleto}</h3>
              <p className="text-lg md:text-xl text-primary font-medium mt-1">{datosDocenteKevin.tituloPrincipal}</p>
              <p className="text-base text-muted-foreground mt-1 mb-4">{datosDocenteKevin.subtitulo}</p>
              <Separator className="my-4 md:my-6 bg-border" />
              <p className="text-muted-foreground leading-relaxed text-base">
                {datosDocenteKevin.descripcionGeneral}
              </p>
            </motion.div>

            {renderSection(
              "Áreas de Especialización",
              <ul className="space-y-3 list-none p-0">
                {datosDocenteKevin.areasEstrategicas.map(area => (
                  <li key={area.id} className="flex items-start space-x-3">
                    <Settings className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <span className="font-medium text-card-foreground">{area.area}</span>
                      {area.detalle && <span className="text-xs text-muted-foreground block lg:inline lg:ml-1">({area.detalle})</span>}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {renderSection(
              "Proyectos Destacados",
              <ul className="space-y-4 list-none p-0">
                {datosDocenteKevin.proyectosDestacados.map(proyecto => (
                  <li key={proyecto.id} className="p-4 bg-background/50 dark:bg-muted/10 rounded-lg border border-border/30">
                    <h4 className="font-semibold text-card-foreground">{proyecto.entidad}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{proyecto.descripcion}</p>
                  </li>
                ))}
              </ul>
            )}

            {renderSection(
              "Formación Complementaria",
              <ul className="space-y-3 list-none p-0">
                {datosDocenteKevin.formacionAdicional.map(formacion => (
                  <li key={formacion.id} className="flex items-center space-x-3">
                    <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-card-foreground">{formacion.nombre}</span>
                  </li>
                ))}
              </ul>
            )}

            {renderSection(
              "Rasgos Profesionales",
              <div className="flex flex-wrap gap-2 md:gap-3">
                {datosDocenteKevin.rasgosProfesionales.map((rasgo, index) => (
                  // Usar variant="default" o "secondary" de Badge para que tome el tema de Shadcn
                  // O definir un estilo consistente para las badges
                  <Badge key={index} variant="secondary" className="text-sm font-normal px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 dark:bg-primary/20 dark:text-primary-foreground dark:border-primary/30">
                    {rasgo}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>

          {/* Columna Derecha (Avatar y Redes) - Sticky */}
          <motion.div 
            className="lg:w-1/3 lg:sticky lg:top-28" // Ajustar top según altura del navbar
            variants={itemVariants}
          >
            <Card className="shadow-xl text-center p-6 md:p-8 bg-card border-border/50 dark:border-border/30 overflow-hidden">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {/* Elemento decorativo de fondo para el Avatar */}
                <div className="absolute inset-0 opacity-50 dark:opacity-30">
                  <div className="w-full h-1/2 bg-gradient-to-b from-primary/20 to-transparent dark:from-primary/30"></div>
                </div>
                <Avatar className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-5 border-4 border-background shadow-2xl ring-2 ring-primary">
                  <AvatarImage asChild src={datosDocenteKevin.imagenUrl}>
                      <Image
                          src={datosDocenteKevin.imagenUrl}
                          alt={`Fotografía de ${datosDocenteKevin.nombreCompleto}`}
                          width={160} // Tamaño para el <Image>
                          height={160}
                          className="object-cover"
                          priority
                      />
                  </AvatarImage>
                  <AvatarFallback className="text-3xl md:text-4xl bg-muted text-muted-foreground">
                    {datosDocenteKevin.nombreCompleto.split(" ").map((n) => n[0]).slice(0,2).join("")}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">{datosDocenteKevin.nombreCompleto}</h2>
              <p className="text-sm md:text-base text-primary font-medium">{datosDocenteKevin.tituloPrincipal}</p>
              {datosDocenteKevin.email && 
                <a href={`mailto:${datosDocenteKevin.email}`} className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 block mt-1 mb-4">
                  {datosDocenteKevin.email}
                </a>
              }
              
              <Separator className="my-4 md:my-6 bg-border" />

              {datosDocenteKevin.redesSociales.length > 0 && (
                <>
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-3">Conecta con el Ingeniero</h3>
                  <div className="flex justify-center space-x-3">
                    {datosDocenteKevin.redesSociales.map((red) => {
                      const IconComponent = iconComponentsDocente[red.iconName];
                      return (
                        <motion.div
                          key={red.id}
                          whileHover={{ scale: 1.15, y: -3, rotate: 3 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Button asChild variant="outline" size="icon" className="rounded-full border-border hover:border-primary hover:bg-primary/5 dark:hover:border-primary dark:hover:bg-primary/10 transition-all duration-200">
                            <a href={red.url} target="_blank" rel="noopener noreferrer" aria-label={red.nombre} className="text-muted-foreground hover:text-primary">
                              <IconComponent className="w-5 h-5" />
                            </a>
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default DocenteSection;