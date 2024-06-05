// Note on usage:
// Type: defining custom types that won’t be extended.
// Interface: creating contracts for object shapes that can be extended or implemented by classes.
// Class: constructing objects with associated methods and internal state.

type Pair = {
  first: string;
  second: number;
};

interface Tuple2 {
  first: string;
  second: number;
}

class Dyad {
  constructor(
    public first: string,
    public second: number,
  ) {}
}

function test1(input: Pair) {
  console.log(`test1 called with ${input.first} and ${input.second}`);
}

function test2(input: Tuple2) {
  console.log(`test2 called with ${input.first} and ${input.second}`);
}

function test3(input: Dyad) {
  console.log(`test3 called with ${input.first} and ${input.second}`);
}

test1({ first: "a", second: 1 });
test2({ first: "b", second: 2 });
test3(new Dyad("c", 3));
