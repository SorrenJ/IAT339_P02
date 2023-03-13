const galleryContainer = document.querySelector(".gallery-container");

const initialProducts = getInitialProducts();

const filterButtons = document.querySelectorAll(".filter-button");
filterButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const filter = e.target.dataset.filterType;
    const filteredCategories = initialProducts.map(({ items, title }) => {
      const filteredItems = items.filter((item) => {
        return item.dataset.filterType === filter
      })
      return { title, filteredItems };
    });
    // Rerender with filtered items
    const container = document.createDocumentFragment();
    filteredCategories.forEach((category) => {
      container.appendChild(category.title);
      const section = document.createElement("section");
      section.classList.add("gallery");
      section.replaceChildren(...category.filteredItems);
      container.appendChild(section);
    })
    galleryContainer.replaceChildren(container);
  });

})

// Get initial products from the html page
function getInitialProducts() {
  const initialProducts = [];
  const gallery = document.querySelectorAll(".gallery");
  const headings = document.querySelectorAll(".product-category-heading");
  if (gallery.length !== headings.length) return [];
  Array.from({ length: gallery.length }).forEach((_, i) => {
    const items = gallery[i].querySelectorAll(".item");
    initialProducts.push({
      title: headings[i].cloneNode(true),
      items: Array.from(items).map((item) => item.cloneNode(true))
    });
  })
  return initialProducts;
}
