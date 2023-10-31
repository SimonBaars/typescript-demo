type Mammal = { name: string; produceMilk(): void };
type EggLayer = { name: string; layEggs(): void };

// 1. Union types
type Animal = Mammal | EggLayer;

const creature1: Animal = {
  name: "dog",
  produceMilk() {
    console.log("producing dogmilk");
  },
};
const creature2: Animal = {
  name: "chicken",
  layEggs() {
    console.log("laying chickeneggs");
  },
};

console.log(creature1.name);
creature1.produceMilk(); // Invalid
// creature1.layEggs(); // Invalid

// 2. `in` capability check
const unknownAnimal: Animal = Math.random() > 0.5 ? creature1 : creature2;

if ("layEggs" in unknownAnimal) {
  unknownAnimal.layEggs(); // Must be an EggLayer
} else {
  unknownAnimal.produceMilk(); // Must be a Mammal
}

// 3. Convenience function for type narrowing
function isMammal(creature: Animal): creature is Mammal {
  return (<Mammal>creature).produceMilk !== undefined;
}

if (isMammal(unknownAnimal)) {
  unknownAnimal.produceMilk(); // Narrowed to mammal
} else {
  unknownAnimal.layEggs(); // Must be EggLayer if not mammal
}

// 4. Assertion function
function assertIsMammal(creature: Animal): asserts creature is Mammal {
  if ("produceMilk" in creature) return;
  throw new Error("Expected a Mammal");
}

function showAssertionFunction() {
  assertIsMammal(unknownAnimal);
  unknownAnimal.produceMilk(); // Narrowed to mammal
}

try {
  showAssertionFunction();
} catch (e) {
  console.log(e);
}

// 5. Aliased conditions
const animalOrString: Animal | string =
  Math.random() > 0.5 ? unknownAnimal : "hello!";
const isString = typeof animalOrString === "string";
const isEggLayer = !isString && "layEggs" in animalOrString;
if (isEggLayer) {
  animalOrString.layEggs(); // Narrowed to EggLayer
} else if (!isString) {
  animalOrString.produceMilk(); // Must be Mammal
}

// 6. Intersection types
type Platypus = Mammal & EggLayer;
const creature3: Platypus = {
  name: "platypus",
  produceMilk() {
    console.log("producing milk");
  },
  layEggs() {
    console.log("laying eggs");
  },
};
console.log(creature3.name);
creature3.produceMilk();
creature3.layEggs();
