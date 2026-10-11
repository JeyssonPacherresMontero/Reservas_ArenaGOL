export const sportTypes = [
    { value: "futbol_7", label: "Canchas de 7" },
    { value: "futbol_5", label: "Canchas de 5" },
    { value: "futbol_11", label: "Canchas de 11" },
    { value: "futbol_6", label: "Canchas de 6" },
    { value: "futbol_8", label: "Canchas de 8" },
    { value: "futbol_4", label: "Canchas de 4" },
    { value: "futbol_9", label: "Canchas de 9" },
    { value: "futbol_10", label: "Canchas de 10" },
    { value: "futbol", label: "Fútbol" },
    { value: "voley", label: "Vóley" },
    { value: "tenis", label: "Tenis" },
    { value: "padel", label: "Pádel" },
    { value: "basquet", label: "Básquet" },
]

export const timeSlots: string[] = [];

for (let hour = 7; hour <= 23; hour++) {
  timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
}
