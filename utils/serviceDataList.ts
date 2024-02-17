export const generateTimeOperation = (): string[] => {
  const startTime = 8 * 60; // Convert 08:00 to minutes (8 hours * 60 minutes)
  const endTime = 15 * 60; // Convert 15:00 to minutes (15 hours * 60 minutes)

  const timeSlotInterval = 30; // 30 minutes interval

  const timeSlots = [];
  for (let time = startTime; time <= endTime; time += timeSlotInterval) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;
    timeSlots.push(formattedTime);
  }
  return timeSlots;
};
