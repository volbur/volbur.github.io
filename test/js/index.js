const items = [
  {
    isActive: true,
    id: 123456789012,
    dateStart: "04.04.2020",
    dateEnd: "12.10.2019",
    phoneNumber: 46546543,
    orderId: "12-345-67",
    lastName: "םהרבא ןב קחצי",
    firstName: "רצומה םש",
    model: "בכר",
  },
];

const app = new Vue({
  el: "#app",
  data: {
    items,
  },
});
