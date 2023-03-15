const galleryContainer = document.querySelector(".gallery-container");

const initialProducts = getInitialProducts();

const activeFilters = new Set();

const filterButtons = document.querySelectorAll(".filter-button");

// Add click listeners to all buttons with the class="filter-button"
filterButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Each button will have a data attribute [data-filter-type]
    // which indicates the type of filter
    const filter = e.target.dataset.filterType;
    const isActive = e.target.dataset.active;

    // If currently active when clicked, set to inactive
    // The data-active attribute is used for applying css styles
    if (isActive) {
      e.target.removeAttribute("data-active");
      activeFilters.delete(filter);
    }
    else {
      e.target.setAttribute("data-active", true);
      activeFilters.add(filter);
    }

    // Check if then number of filters is > 0
    // If not, then there's no filter active so display initial products
    if (!activeFilters.size) {
      galleryContainer.replaceChildren(getGalleryNodes(initialProducts));
      return;
    }

    // Filter must be active
    const filteredCategories = initialProducts.map(({ items, title }) => {
      // Get intersection of products and activeFilters
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
