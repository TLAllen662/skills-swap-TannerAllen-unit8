function filterSkillsByCategory(skills, category) {
  if (category === "All") {
    return skills;
  }

  return skills.filter((skill) => skill.category === category);
}

function calculateTotalCosts(hourlyRate, hours) {
  return hourlyRate * hours;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { filterSkillsByCategory, calculateTotalCosts };
}

if (typeof window !== "undefined") {
  window.filterSkillsByCategory = filterSkillsByCategory;
  window.calculateTotalCosts = calculateTotalCosts;
}
