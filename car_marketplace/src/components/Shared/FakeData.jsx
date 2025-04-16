import { faker } from "@faker-js/faker";

function createRandomeCarList() {
  return {
    name: faker.vehicle.vehicle(),
    fuelType: faker.vehicle.fuel(),
    model: faker.vehicle.model(),
    type: faker.vehicle.type(),
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-2SJLpCcUmj9z9rG566JJaG2xGolPlWQ4OQgC5lAPe7JUUSv9sTblbro&s",
    miles: 1000,
    gearTypes: "Automatic",
    price: faker.finance.amount({ min: 4000, max: 20000 }),
  };
}

const carList = faker.helpers.multiple(createRandomeCarList, {
  count: 7,
});

export default {
  carList,
};
