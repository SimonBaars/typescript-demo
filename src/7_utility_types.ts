interface IEmployee {
  name: string;
  age: number;
  employeeNumber: string;
  salary: number;
}

// == 1. Read only ==
type ReadonlyEmployee = Readonly<IEmployee>;
const john: ReadonlyEmployee = {
  name: "john",
  age: 42,
  employeeNumber: "123456",
  salary: 50000,
};
// Invalid as all fields are readonly
// e1.name = 'jane';
console.log(john);

// == 2. Partial ==
type PartialEmployee = Partial<IEmployee>;
function copyWith(
  source: ReadonlyEmployee,
  update: PartialEmployee,
): ReadonlyEmployee {
  return {
    ...source,
    ...update,
  };
}
const stevie = copyWith(john, {
  name: "stevie",
  salary: 55000,
});
console.log(stevie);

// == 3. Required ==
type Employee2 = Required<PartialEmployee>;
const jane: Employee2 = {
  name: "jane",
  age: 42,
  employeeNumber: "123456",
  salary: 50000,
};
console.log(jane);

// == 4. Record ==
type ManagementRole = "ceo" | "cto" | "cfo";
// Constructs a new type with fields of a certain type
type Management = Record<ManagementRole, ReadonlyEmployee>;
const m: Management = {
  ceo: john,
  cto: stevie,
  cfo: jane,
};
console.log(m);

// == 5. Exclude/Extract ==
// Constructs an algebraic type by exluding types
type TechRole1 = Exclude<ManagementRole, "ceo" | "cfo">;
// Constructs an algebraic type by extracting types - a bit like an intersection
type TechRole2 = Extract<ManagementRole, "ceo" | "cto" | "someRandom" | number>;
const role1: TechRole1 = "cto";
const role2: TechRole2 = "ceo";
console.log(role1);
console.log(role2);

// == 6. Pick/Omit ==
// Constructs a new type by selecting a subset of fields
type Person1 = Pick<IEmployee, "name" | "age">;
// Constructs a new type by omitting a subset of fields
type Person2 = Omit<IEmployee, "employeeNumber" | "salary">;
const alex: Person1 = {
  name: "alex",
  age: 40,
};
const charlie: Person2 = {
  name: "charlie",
  age: 60,
};
console.log(alex);
console.log(charlie);
