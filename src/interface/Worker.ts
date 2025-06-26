// Representa la estructura de datos para un miembro del equipo (worker)
// Esta interfaz se usa para renderizar perfiles en la seccion de servicios

export interface Worker {
    id: number;             // Identificador unico del trabajador
    name: string;           // Nomre completo del trabajador
    role: string;           // Rol o cargo del trabajador dentro del equipo
    description: string;    // Breve descripcion de su experiencia, habilidades o aporte
    linkedin: string;       // URL al perfil de LinkedIn
}