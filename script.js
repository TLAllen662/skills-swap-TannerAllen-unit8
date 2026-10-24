"use strict";

const skills = [
  { title: "Python Tutoring", category: "Programming", price: 20 },
  { title: "Guitar Lessons", category: "Music", price: 15 },
  { title: "Resume Review", category: "Career", price: 0 },
  { title: "Web Development", category: "Programming", price: 25 },
];

const skillList = document.querySelector("#skill-list");
const filterButtons = document.querySelectorAll(".skill-filter");

function renderSkills(category) {
  const filteredSkills = window.filterSkillsByCategory(skills, category);
  skillList.replaceChildren();

  if (filteredSkills.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "skill-list-empty";
    emptyMessage.textContent = "No skills found in this category.";
    skillList.append(emptyMessage);
    return;
  }

  filteredSkills.forEach((skill) => {
    const card = document.createElement("article");
    card.className = "skill-card";

    const title = document.createElement("h3");
    title.textContent = skill.title;

    const categoryLabel = document.createElement("p");
    categoryLabel.className = "skill-card-category";
    categoryLabel.textContent = skill.category;

    const price = document.createElement("p");
    price.className = "skill-card-price";
    price.textContent = skill.price === 0 ? "Free" : `$${skill.price}`;

    card.append(title, categoryLabel, price);
    skillList.append(card);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filterButton) => {
      filterButton.setAttribute("aria-pressed", String(filterButton === button));
    });
    renderSkills(button.dataset.category);
  });
});

renderSkills("All");
