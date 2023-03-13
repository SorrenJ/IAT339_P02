const galleryContainer = document.querySelector(".galleryContainer");

const initialProducts = getInitialProducts();

const filterButtons = document.querySelectorAll(".filter-button");
filterButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const filter = e.target.dataset.filterType;
    console.log(filter);
    const filteredProducts = initialProducts.map(({ items, title }) => {
      const filteredItems = items.filter((item) => {
        console.log(item.dataset.filterType !== filter);
        return item.dataset.filterType === filter
      })
      return { title, filteredItems };
    });
    console.log(filteredProducts);
  });
})

function getInitialProducts() {
  const initialProducts = [];
  const gallery = document.querySelectorAll(".gallery");
  const headings = document.querySelectorAll(".product-category-heading");
  if (gallery.length !== headings.length) return [];
  // Populate products with inital products in html
  Array.from({ length: gallery.length }).forEach((_, i) => {
    const items = gallery[i].querySelectorAll(".item");
    initialProducts.push({
      title: headings[i].cloneNode(true),
      items: Array.from(items).map((item) => item.cloneNode(true))
    });
  })
  return initialProducts;
}
