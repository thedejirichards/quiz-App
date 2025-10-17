function useTimeOfDay() {
  function getTimeOfDay() {
    const hour = new Date().getHours(); // returns hour in 24-hour format (0–23)

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  }
  return { getTimeOfDay };
}

export { useTimeOfDay };
