"use strict";

const skills = [
  { title: "Python Tutoring", category: "Programming", price: 20 },
  { title: "Guitar Lessons", category: "Music", price: 15 },
  { title: "Resume Review", category: "Career", price: 0 },
  { title: "Web Development", category: "Programming", price: 25 },
];

const skillList = document.querySelector("#skill-list");
const filterButtons = document.querySelectorAll(".skill-filter");
const calculatorForm = document.querySelector("#cost-calculator-form");
const calculatorResult = document.querySelector("#calculator-result");
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

calculatorForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(calculatorForm);
  const hourlyRate = Number(formData.get("hourlyRate"));
  const hours = Number(formData.get("hours"));
  const total = window.calculateTotalCosts(hourlyRate, hours);
  calculatorResult.textContent = `Total cost: ${currencyFormatter.format(total)}`;
});

const matcherForm = document.querySelector("#skill-matcher-form");
const matchResults = document.querySelector("#match-results");

function renderSkillCards(container, skillsToShow, emptyText) {
  container.replaceChildren();

  if (skillsToShow.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "skill-list-empty";
    emptyMessage.textContent = emptyText;
    container.append(emptyMessage);
    return;
  }

  skillsToShow.forEach((skill) => {
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
    container.append(card);
  });
}

function renderSkills(category) {
  renderSkillCards(
    skillList,
    window.filterSkillsByCategory(skills, category),
    "No skills found in this category.",
  );
}

matcherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(matcherForm);
  const userNeeds = {
    category: formData.get("category"),
    maxPrice: Number(formData.get("maxPrice")),
  };
  renderSkillCards(
    matchResults,
    window.matchSkillsToUser(userNeeds, skills),
    "No skills match your needs. Try a higher budget or another category.",
  );
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filterButton) => {
      filterButton.setAttribute("aria-pressed", String(filterButton === button));
    });
    renderSkills(button.dataset.category);
  });
});

renderSkills("All");
