<<<<<<< HEAD
// Very simple Lost & Found logic in plain JavaScript

// Get items from LocalStorage
function getItems() {
  var raw = localStorage.getItem("lostFoundItems");
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

// Save items back to LocalStorage
function saveItems(items) {
  localStorage.setItem("lostFoundItems", JSON.stringify(items));
}

// Add one item
function addItem(item) {
  var items = getItems();
  items.push(item);
  saveItems(items);
}

// Simple email check
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Show a small message in the corner
function showToast(message, isError) {
  var box = document.getElementById("toast");
  if (!box) return;
  box.textContent = message;
  box.classList.remove("error");
  if (isError) {
    box.classList.add("error");
  }
  box.classList.add("show");
  setTimeout(function () {
    box.classList.remove("show");
  }, 2500);
}

// Dark / light theme
function applyThemeFromStorage() {
  var saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark-mode");
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  var mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", mode);
}

// Lost item form
function setupLostForm() {
  var form = document.getElementById("lost-form");
  if (!form) return;

  var fileInput = document.getElementById("lost-image");
  var previewBox = document.getElementById("lost-image-preview");
  var previewImg = document.getElementById("lost-image-preview-img");
  var currentImage = null;

  if (fileInput) {
    fileInput.addEventListener("change", function (event) {
      var file = event.target.files[0];
      if (!file) {
        previewBox.style.display = "none";
        currentImage = null;
        return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        previewImg.src = e.target.result;
        previewBox.style.display = "block";
        currentImage = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Read values
    var itemName = document.getElementById("lost-item-name").value.trim();
    var category = document.getElementById("lost-category").value;
    var description = document.getElementById("lost-description").value.trim();
    var location = document.getElementById("lost-location").value.trim();
    var date = document.getElementById("lost-date").value;
    var contactName = document.getElementById("lost-contact-name").value.trim();
    var contactEmail = document.getElementById("lost-contact-email").value.trim();

    // Clear old errors
    document.getElementById("lost-item-name-error").textContent = "";
    document.getElementById("lost-category-error").textContent = "";
    document.getElementById("lost-description-error").textContent = "";
    document.getElementById("lost-location-error").textContent = "";
    document.getElementById("lost-date-error").textContent = "";
    document.getElementById("lost-contact-name-error").textContent = "";
    document.getElementById("lost-contact-email-error").textContent = "";

    var hasError = false;

    if (!itemName) {
      document.getElementById("lost-item-name-error").textContent = "Please enter a name.";
      hasError = true;
    }
    if (!category) {
      document.getElementById("lost-category-error").textContent = "Please choose a category.";
      hasError = true;
    }
    if (!description) {
      document.getElementById("lost-description-error").textContent = "Please enter a description.";
      hasError = true;
    }
    if (!location) {
      document.getElementById("lost-location-error").textContent = "Please enter a location.";
      hasError = true;
    }
    if (!date) {
      document.getElementById("lost-date-error").textContent = "Please pick a date.";
      hasError = true;
    }
    if (!contactName) {
      document.getElementById("lost-contact-name-error").textContent = "Please enter your name.";
      hasError = true;
    }
    if (!contactEmail) {
      document.getElementById("lost-contact-email-error").textContent = "Please enter an email.";
      hasError = true;
    } else if (!isValidEmail(contactEmail)) {
      document.getElementById("lost-contact-email-error").textContent = "Please enter a valid email.";
      hasError = true;
    }

    if (hasError) {
      showToast("Please fix the errors.", true);
      return;
    }

    var item = {
      id: Date.now(),
      type: "lost",
      itemName: itemName,
      category: category,
      description: description,
      location: location,
      date: date,
      contactInfo: contactEmail,
      imageData: currentImage,
      claimed: false
    };

    addItem(item);
    form.reset();
    if (previewBox) {
      previewBox.style.display = "none";
    }
    currentImage = null;
    showToast("Lost item saved.", false);
  });
}

// Found item form
function setupFoundForm() {
  var form = document.getElementById("found-form");
  if (!form) return;

  var fileInput = document.getElementById("found-image");
  var previewBox = document.getElementById("found-image-preview");
  var previewImg = document.getElementById("found-image-preview-img");
  var currentImage = null;

  if (fileInput) {
    fileInput.addEventListener("change", function (event) {
      var file = event.target.files[0];
      if (!file) {
        previewBox.style.display = "none";
        currentImage = null;
        return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        previewImg.src = e.target.result;
        previewBox.style.display = "block";
        currentImage = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var itemName = document.getElementById("found-item-name").value.trim();
    var category = document.getElementById("found-category").value;
    var description = document.getElementById("found-description").value.trim();
    var location = document.getElementById("found-location").value.trim();
    var date = document.getElementById("found-date").value;
    var contact = document.getElementById("found-contact-info").value.trim();

    document.getElementById("found-item-name-error").textContent = "";
    document.getElementById("found-category-error").textContent = "";
    document.getElementById("found-description-error").textContent = "";
    document.getElementById("found-location-error").textContent = "";
    document.getElementById("found-date-error").textContent = "";
    document.getElementById("found-contact-info-error").textContent = "";

    var hasError = false;

    if (!itemName) {
      document.getElementById("found-item-name-error").textContent = "Please enter a name.";
      hasError = true;
    }
    if (!category) {
      document.getElementById("found-category-error").textContent = "Please choose a category.";
      hasError = true;
    }
    if (!description) {
      document.getElementById("found-description-error").textContent = "Please enter a description.";
      hasError = true;
    }
    if (!location) {
      document.getElementById("found-location-error").textContent = "Please enter a location.";
      hasError = true;
    }
    if (!date) {
      document.getElementById("found-date-error").textContent = "Please pick a date.";
      hasError = true;
    }
    if (!contact) {
      document.getElementById("found-contact-info-error").textContent = "Please enter contact info.";
      hasError = true;
    }

    if (hasError) {
      showToast("Please fix the errors.", true);
      return;
    }

    var item = {
      id: Date.now(),
      type: "found",
      itemName: itemName,
      category: category,
      description: description,
      location: location,
      date: date,
      contactInfo: contact,
      imageData: currentImage,
      claimed: false
    };

    addItem(item);
    form.reset();
    if (previewBox) {
      previewBox.style.display = "none";
    }
    currentImage = null;
    showToast("Found item saved.", false);
  });
}

// View items page
function setupViewItems() {
  var grid = document.getElementById("items-grid");
  if (!grid) return;

  var btnAll = document.getElementById("filter-all");
  var btnLost = document.getElementById("filter-lost");
  var btnFound = document.getElementById("filter-found");
  var selectCategory = document.getElementById("filter-category");
  var searchInput = document.getElementById("search-input");

  var currentType = "all";
  var currentCategory = "";
  var currentSearch = "";

  function draw() {
    var items = getItems();
    var filtered = [];

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (currentType !== "all" && item.type !== currentType) {
        continue;
      }
      if (currentCategory && item.category !== currentCategory) {
        continue;
      }
      if (currentSearch) {
        var text = (item.itemName || "") + " " + (item.description || "") + " " + (item.location || "");
        if (text.toLowerCase().indexOf(currentSearch.toLowerCase()) === -1) {
          continue;
        }
      }
      filtered.push(item);
    }

    grid.innerHTML = "";

    if (filtered.length === 0) {
      var p = document.createElement("p");
      p.className = "empty-message";
      p.textContent = "No items match your filters yet.";
      grid.appendChild(p);
      return;
    }

    for (var j = 0; j < filtered.length; j++) {
      var it = filtered[j];
      var card = document.createElement("div");
      card.className = "item-card";

      var type = document.createElement("div");
      type.className = "item-type " + it.type;
      type.textContent = it.type === "lost" ? "Lost item" : "Found item";
      card.appendChild(type);

      var title = document.createElement("div");
      title.className = "item-title";
      title.textContent = it.itemName;
      card.appendChild(title);

      var cat = document.createElement("div");
      cat.textContent = "Category: " + (it.category || "Other");
      cat.style.fontSize = "0.85rem";
      card.appendChild(cat);

      var loc = document.createElement("div");
      loc.className = "item-location";
      loc.textContent = "Location: " + (it.location || "-");
      card.appendChild(loc);

      card.addEventListener("click", (function (itemCopy) {
        return function () {
          openModal(itemCopy);
        };
      })(it));

      grid.appendChild(card);
    }
  }

  function setActiveButton() {
    var buttons = [btnAll, btnLost, btnFound];
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i]) {
        buttons[i].classList.remove("active");
      }
    }
    if (currentType === "all" && btnAll) btnAll.classList.add("active");
    if (currentType === "lost" && btnLost) btnLost.classList.add("active");
    if (currentType === "found" && btnFound) btnFound.classList.add("active");
  }

  if (btnAll) {
    btnAll.addEventListener("click", function () {
      currentType = "all";
      setActiveButton();
      draw();
    });
  }
  if (btnLost) {
    btnLost.addEventListener("click", function () {
      currentType = "lost";
      setActiveButton();
      draw();
    });
  }
  if (btnFound) {
    btnFound.addEventListener("click", function () {
      currentType = "found";
      setActiveButton();
      draw();
    });
  }
  if (selectCategory) {
    selectCategory.addEventListener("change", function () {
      currentCategory = selectCategory.value;
      draw();
    });
  }
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      currentSearch = searchInput.value.trim();
      draw();
    });
  }

  setActiveButton();
  draw();
}

// Modal
function openModal(item) {
  var backdrop = document.getElementById("item-modal-backdrop");
  if (!backdrop) return;

  document.getElementById("modal-item-title").textContent = item.itemName;
  document.getElementById("modal-type").textContent = item.type === "lost" ? "Lost item" : "Found item";
  document.getElementById("modal-category").textContent = item.category || "Other";
  document.getElementById("modal-description").textContent = item.description || "-";
  document.getElementById("modal-location").textContent = item.location || "-";
  document.getElementById("modal-date").textContent = item.date || "-";
  document.getElementById("modal-contact").textContent = item.contactInfo || "-";

  var img = document.getElementById("modal-item-image");
  if (item.imageData) {
    img.src = item.imageData;
    img.style.display = "block";
  } else {
    img.style.display = "none";
  }

  var btnClaim = document.getElementById("btn-claim-item");
  if (btnClaim) {
    btnClaim.onclick = function () {
      markItemClaimed(item.id);
    };
  }

  backdrop.classList.add("show");
}

function closeModal() {
  var backdrop = document.getElementById("item-modal-backdrop");
  if (backdrop) {
    backdrop.classList.remove("show");
  }
}

function markItemClaimed(id) {
  var items = getItems();
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      items[i].claimed = true;
      break;
    }
  }
  saveItems(items);
  showToast("Item marked as claimed.", false);
  closeModal();
  setupViewItems();
}

// Contact form
function setupContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("contact-name").value.trim();
    var email = document.getElementById("contact-email").value.trim();
    var message = document.getElementById("contact-message").value.trim();

    document.getElementById("contact-name-error").textContent = "";
    document.getElementById("contact-email-error").textContent = "";
    document.getElementById("contact-message-error").textContent = "";

    var hasError = false;
    if (!name) {
      document.getElementById("contact-name-error").textContent = "Please enter your name.";
      hasError = true;
    }
    if (!email) {
      document.getElementById("contact-email-error").textContent = "Please enter your email.";
      hasError = true;
    } else if (!isValidEmail(email)) {
      document.getElementById("contact-email-error").textContent = "Please enter a valid email.";
      hasError = true;
    }
    if (!message) {
      document.getElementById("contact-message-error").textContent = "Please write a short message.";
      hasError = true;
    }

    if (hasError) {
      showToast("Please fix the errors.", true);
      return;
    }

    form.reset();
    showToast("Message sent (demo only).", false);
  });
}

// Run on every page
document.addEventListener("DOMContentLoaded", function () {
  applyThemeFromStorage();

  var themeBtn = document.getElementById("dark-mode-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  setupLostForm();
  setupFoundForm();
  setupViewItems();
  setupContactForm();

  var closeBtn = document.getElementById("modal-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }
  var backdrop = document.getElementById("item-modal-backdrop");
  if (backdrop) {
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) {
        closeModal();
      }
    });
  }
});

=======
// Very simple Lost & Found logic in plain JavaScript

// Get items from LocalStorage
function getItems() {
  var raw = localStorage.getItem("lostFoundItems");
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

// Save items back to LocalStorage
function saveItems(items) {
  localStorage.setItem("lostFoundItems", JSON.stringify(items));
}

// Add one item
function addItem(item) {
  var items = getItems();
  items.push(item);
  saveItems(items);
}

// Simple email check
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Show a small message in the corner
function showToast(message, isError) {
  var box = document.getElementById("toast");
  if (!box) return;
  box.textContent = message;
  box.classList.remove("error");
  if (isError) {
    box.classList.add("error");
  }
  box.classList.add("show");
  setTimeout(function () {
    box.classList.remove("show");
  }, 2500);
}

// Dark / light theme
function applyThemeFromStorage() {
  var saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark-mode");
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  var mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", mode);
}

// Lost item form
function setupLostForm() {
  var form = document.getElementById("lost-form");
  if (!form) return;

  var fileInput = document.getElementById("lost-image");
  var previewBox = document.getElementById("lost-image-preview");
  var previewImg = document.getElementById("lost-image-preview-img");
  var currentImage = null;

  if (fileInput) {
    fileInput.addEventListener("change", function (event) {
      var file = event.target.files[0];
      if (!file) {
        previewBox.style.display = "none";
        currentImage = null;
        return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        previewImg.src = e.target.result;
        previewBox.style.display = "block";
        currentImage = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Read values
    var itemName = document.getElementById("lost-item-name").value.trim();
    var category = document.getElementById("lost-category").value;
    var description = document.getElementById("lost-description").value.trim();
    var location = document.getElementById("lost-location").value.trim();
    var date = document.getElementById("lost-date").value;
    var contactName = document.getElementById("lost-contact-name").value.trim();
    var contactEmail = document.getElementById("lost-contact-email").value.trim();

    // Clear old errors
    document.getElementById("lost-item-name-error").textContent = "";
    document.getElementById("lost-category-error").textContent = "";
    document.getElementById("lost-description-error").textContent = "";
    document.getElementById("lost-location-error").textContent = "";
    document.getElementById("lost-date-error").textContent = "";
    document.getElementById("lost-contact-name-error").textContent = "";
    document.getElementById("lost-contact-email-error").textContent = "";

    var hasError = false;

    if (!itemName) {
      document.getElementById("lost-item-name-error").textContent = "Please enter a name.";
      hasError = true;
    }
    if (!category) {
      document.getElementById("lost-category-error").textContent = "Please choose a category.";
      hasError = true;
    }
    if (!description) {
      document.getElementById("lost-description-error").textContent = "Please enter a description.";
      hasError = true;
    }
    if (!location) {
      document.getElementById("lost-location-error").textContent = "Please enter a location.";
      hasError = true;
    }
    if (!date) {
      document.getElementById("lost-date-error").textContent = "Please pick a date.";
      hasError = true;
    }
    if (!contactName) {
      document.getElementById("lost-contact-name-error").textContent = "Please enter your name.";
      hasError = true;
    }
    if (!contactEmail) {
      document.getElementById("lost-contact-email-error").textContent = "Please enter an email.";
      hasError = true;
    } else if (!isValidEmail(contactEmail)) {
      document.getElementById("lost-contact-email-error").textContent = "Please enter a valid email.";
      hasError = true;
    }

    if (hasError) {
      showToast("Please fix the errors.", true);
      return;
    }

    var item = {
      id: Date.now(),
      type: "lost",
      itemName: itemName,
      category: category,
      description: description,
      location: location,
      date: date,
      contactInfo: contactEmail,
      imageData: currentImage,
      claimed: false
    };

    addItem(item);
    form.reset();
    if (previewBox) {
      previewBox.style.display = "none";
    }
    currentImage = null;
    showToast("Lost item saved.", false);
  });
}

// Found item form
function setupFoundForm() {
  var form = document.getElementById("found-form");
  if (!form) return;

  var fileInput = document.getElementById("found-image");
  var previewBox = document.getElementById("found-image-preview");
  var previewImg = document.getElementById("found-image-preview-img");
  var currentImage = null;

  if (fileInput) {
    fileInput.addEventListener("change", function (event) {
      var file = event.target.files[0];
      if (!file) {
        previewBox.style.display = "none";
        currentImage = null;
        return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        previewImg.src = e.target.result;
        previewBox.style.display = "block";
        currentImage = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var itemName = document.getElementById("found-item-name").value.trim();
    var category = document.getElementById("found-category").value;
    var description = document.getElementById("found-description").value.trim();
    var location = document.getElementById("found-location").value.trim();
    var date = document.getElementById("found-date").value;
    var contact = document.getElementById("found-contact-info").value.trim();

    document.getElementById("found-item-name-error").textContent = "";
    document.getElementById("found-category-error").textContent = "";
    document.getElementById("found-description-error").textContent = "";
    document.getElementById("found-location-error").textContent = "";
    document.getElementById("found-date-error").textContent = "";
    document.getElementById("found-contact-info-error").textContent = "";

    var hasError = false;

    if (!itemName) {
      document.getElementById("found-item-name-error").textContent = "Please enter a name.";
      hasError = true;
    }
    if (!category) {
      document.getElementById("found-category-error").textContent = "Please choose a category.";
      hasError = true;
    }
    if (!description) {
      document.getElementById("found-description-error").textContent = "Please enter a description.";
      hasError = true;
    }
    if (!location) {
      document.getElementById("found-location-error").textContent = "Please enter a location.";
      hasError = true;
    }
    if (!date) {
      document.getElementById("found-date-error").textContent = "Please pick a date.";
      hasError = true;
    }
    if (!contact) {
      document.getElementById("found-contact-info-error").textContent = "Please enter contact info.";
      hasError = true;
    }

    if (hasError) {
      showToast("Please fix the errors.", true);
      return;
    }

    var item = {
      id: Date.now(),
      type: "found",
      itemName: itemName,
      category: category,
      description: description,
      location: location,
      date: date,
      contactInfo: contact,
      imageData: currentImage,
      claimed: false
    };

    addItem(item);
    form.reset();
    if (previewBox) {
      previewBox.style.display = "none";
    }
    currentImage = null;
    showToast("Found item saved.", false);
  });
}

// View items page
function setupViewItems() {
  var grid = document.getElementById("items-grid");
  if (!grid) return;

  var btnAll = document.getElementById("filter-all");
  var btnLost = document.getElementById("filter-lost");
  var btnFound = document.getElementById("filter-found");
  var selectCategory = document.getElementById("filter-category");
  var searchInput = document.getElementById("search-input");

  var currentType = "all";
  var currentCategory = "";
  var currentSearch = "";

  function draw() {
    var items = getItems();
    var filtered = [];

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (currentType !== "all" && item.type !== currentType) {
        continue;
      }
      if (currentCategory && item.category !== currentCategory) {
        continue;
      }
      if (currentSearch) {
        var text = (item.itemName || "") + " " + (item.description || "") + " " + (item.location || "");
        if (text.toLowerCase().indexOf(currentSearch.toLowerCase()) === -1) {
          continue;
        }
      }
      filtered.push(item);
    }

    grid.innerHTML = "";

    if (filtered.length === 0) {
      var p = document.createElement("p");
      p.className = "empty-message";
      p.textContent = "No items match your filters yet.";
      grid.appendChild(p);
      return;
    }

    for (var j = 0; j < filtered.length; j++) {
      var it = filtered[j];
      var card = document.createElement("div");
      card.className = "item-card";

      var type = document.createElement("div");
      type.className = "item-type " + it.type;
      type.textContent = it.type === "lost" ? "Lost item" : "Found item";
      card.appendChild(type);

      var title = document.createElement("div");
      title.className = "item-title";
      title.textContent = it.itemName;
      card.appendChild(title);

      var cat = document.createElement("div");
      cat.textContent = "Category: " + (it.category || "Other");
      cat.style.fontSize = "0.85rem";
      card.appendChild(cat);

      var loc = document.createElement("div");
      loc.className = "item-location";
      loc.textContent = "Location: " + (it.location || "-");
      card.appendChild(loc);

      card.addEventListener("click", (function (itemCopy) {
        return function () {
          openModal(itemCopy);
        };
      })(it));

      grid.appendChild(card);
    }
  }

  function setActiveButton() {
    var buttons = [btnAll, btnLost, btnFound];
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i]) {
        buttons[i].classList.remove("active");
      }
    }
    if (currentType === "all" && btnAll) btnAll.classList.add("active");
    if (currentType === "lost" && btnLost) btnLost.classList.add("active");
    if (currentType === "found" && btnFound) btnFound.classList.add("active");
  }

  if (btnAll) {
    btnAll.addEventListener("click", function () {
      currentType = "all";
      setActiveButton();
      draw();
    });
  }
  if (btnLost) {
    btnLost.addEventListener("click", function () {
      currentType = "lost";
      setActiveButton();
      draw();
    });
  }
  if (btnFound) {
    btnFound.addEventListener("click", function () {
      currentType = "found";
      setActiveButton();
      draw();
    });
  }
  if (selectCategory) {
    selectCategory.addEventListener("change", function () {
      currentCategory = selectCategory.value;
      draw();
    });
  }
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      currentSearch = searchInput.value.trim();
      draw();
    });
  }

  setActiveButton();
  draw();
}

// Modal
function openModal(item) {
  var backdrop = document.getElementById("item-modal-backdrop");
  if (!backdrop) return;

  document.getElementById("modal-item-title").textContent = item.itemName;
  document.getElementById("modal-type").textContent = item.type === "lost" ? "Lost item" : "Found item";
  document.getElementById("modal-category").textContent = item.category || "Other";
  document.getElementById("modal-description").textContent = item.description || "-";
  document.getElementById("modal-location").textContent = item.location || "-";
  document.getElementById("modal-date").textContent = item.date || "-";
  document.getElementById("modal-contact").textContent = item.contactInfo || "-";

  var img = document.getElementById("modal-item-image");
  if (item.imageData) {
    img.src = item.imageData;
    img.style.display = "block";
  } else {
    img.style.display = "none";
  }

  var btnClaim = document.getElementById("btn-claim-item");
  if (btnClaim) {
    btnClaim.onclick = function () {
      markItemClaimed(item.id);
    };
  }

  backdrop.classList.add("show");
}

function closeModal() {
  var backdrop = document.getElementById("item-modal-backdrop");
  if (backdrop) {
    backdrop.classList.remove("show");
  }
}

function markItemClaimed(id) {
  var items = getItems();
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      items[i].claimed = true;
      break;
    }
  }
  saveItems(items);
  showToast("Item marked as claimed.", false);
  closeModal();
  setupViewItems();
}

// Contact form
function setupContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("contact-name").value.trim();
    var email = document.getElementById("contact-email").value.trim();
    var message = document.getElementById("contact-message").value.trim();

    document.getElementById("contact-name-error").textContent = "";
    document.getElementById("contact-email-error").textContent = "";
    document.getElementById("contact-message-error").textContent = "";

    var hasError = false;
    if (!name) {
      document.getElementById("contact-name-error").textContent = "Please enter your name.";
      hasError = true;
    }
    if (!email) {
      document.getElementById("contact-email-error").textContent = "Please enter your email.";
      hasError = true;
    } else if (!isValidEmail(email)) {
      document.getElementById("contact-email-error").textContent = "Please enter a valid email.";
      hasError = true;
    }
    if (!message) {
      document.getElementById("contact-message-error").textContent = "Please write a short message.";
      hasError = true;
    }

    if (hasError) {
      showToast("Please fix the errors.", true);
      return;
    }

    form.reset();
    showToast("Message sent (demo only).", false);
  });
}

// Run on every page
document.addEventListener("DOMContentLoaded", function () {
  applyThemeFromStorage();

  var themeBtn = document.getElementById("dark-mode-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  setupLostForm();
  setupFoundForm();
  setupViewItems();
  setupContactForm();

  var closeBtn = document.getElementById("modal-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }
  var backdrop = document.getElementById("item-modal-backdrop");
  if (backdrop) {
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) {
        closeModal();
      }
    });
  }
});

>>>>>>> c0632a6b171dd4a7ca0bb0ec6d9503fdba7eaba0
