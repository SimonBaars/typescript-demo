type Primitive = string | number | boolean;
const value1: Primitive = "hello";
const value2: Primitive = 1234.5678;
console.log(value1);
console.log(value2);

const value3: Primitive = Math.random() > 0.5 ? value1 : value2;
if (typeof value3 === "string") {
  // Type narrowed to string
  console.log(value3.toUpperCase());
} else {
  // Type narrowed to number
  console.log(value3.toFixed(2));
}
