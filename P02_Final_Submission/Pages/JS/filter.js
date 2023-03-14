const galleryContainer = document.querySelector(".gallery-container");

const initialProducts = getInitialProducts();

const activeFilters = new Set();

const filterButtons = document.querySelectorAll(".filter-button");
filterButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const filter = e.target.dataset.filterType;
    const isActive = e.target.dataset.active;
    if (isActive) {
      e.target.removeAttribute("data-active");
      activeFilters.delete(filter);
    }
    else {
      e.target.setAttribute("data-active", true);
      activeFilters.add(filter);
    }
    if (!activeFilters.size) {
      galleryContainer.replaceChildren(getGalleryNodes(initialProducts));
      return;
    }
    const filteredCategories = initialProducts.map(({ items, title }) => {
      const filteredItems = items.filter((item) => {
        if (!item.dataset.filterType) return true;
        const itemFilters = item.dataset.filterType.split(" ");
        let shouldInclude = true;
        for (const activeFilter of activeFilters) {
          if (!itemFilters.includes(activeFilter)) {
            shouldInclude = false;
            break;
          }
        }
        return shouldInclude;
      })
      return { title, items: filteredItems };
    });
    // Rerender with filtered items
    const content = getGalleryNodes(filteredCategories);
    galleryContainer.replaceChildren(content);
  });
})

function getGalleryNodes(data) {
  const container = document.createDocumentFragment();
  data.forEach((category) => {
    if (category.items.length) {
      container.appendChild(category.title);
      const section = document.createElement("section");
      section.classList.add("gallery");
      section.replaceChildren(...category.items);
      container.appendChild(section);
    }
  })
  return container;
}

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
const test = ["hi", "bye"]
console.log(test)
