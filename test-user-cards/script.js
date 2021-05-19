"user strict";

const url = "https://jsonplaceholder.typicode.com/users";

const root = document.getElementById("root");

function handleFetch() {
  fetchUsers().then((data) => {
    const markupCardsList = createCardsList();
    root.insertAdjacentHTML("beforeend", markupCardsList);

    const markupCards = createCards(data);

    const cardsList = document.querySelector(".cards-list");
    cardsList.insertAdjacentHTML("beforeend", markupCards);

    const modal = document.querySelector(".modal");

    const btnOpenModal = document.querySelectorAll(".js-open-modal");
    btnOpenModal.forEach((btn) => {
      btn.addEventListener("click", showModal);
    });

    const btnCloseModal = document.querySelectorAll(".js-close-modal");
    btnCloseModal.forEach((btn) => {
      btn.addEventListener("click", hideModal);
    });

    const modalBackdrop = document.querySelectorAll(".js-modal-backdrop");
    const modalWindow = document.querySelector(".modal__window");
    modalBackdrop.forEach((item) => {
      item.addEventListener("click", (event) => {
        if (modalWindow === event.target) return;

        hideModal();
      });
    });

    function hideModal() {
      modal.classList.add("modal--hidden");
    }

    function showModal() {
      modal.classList.remove("modal--hidden");
    }
  });
}

function createCardsList() {
  return `
        <ul class="cards-list">
        </ul>
    `;
}

function createCards(cards) {
  return cards.reduce((markup, card) => {
    let circle = createCircle(card.name[0].toUpperCase());
    const modal = createModal(card.username, card.phone, card.website);

    return (
      markup +
      `<li class="card">
            ${circle}
            <h2 class="card__name">${card.name}</h2>
            <button class="button js-open-modal">More</button>
            ${modal}
        </li>
        `
    );
  }, "");
}

function createCircle(letter) {
  return `
    <div class="circle">
        <h2 class="name-letter">${letter}</h2>
    </div>
    `;
}

function createModal(username, phone, website) {
  return `
    <div class="modal modal--hidden">
        <div class="modal__backdrop js-modal-backdrop">
            <div class="modal__window">
                <h2 class="user-name">user-name: ${username}</h2>
                <span class="user-phone">user-phone: ${phone}</span>
                <span class="user-website">user-website: <a href="${website}">${website}</a></span>
                <button class="modal__close js-close-modal"></button>
            </div>
        </div>
    </div>
    `;
}

function fetchUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .catch((error) => {
      console.log("ERROR: ", error);
    });
}

handleFetch();
