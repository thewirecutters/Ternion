export type MachineExample = {
  id: string;
  title: string;
  blurb: string;
  expected?: number;
  source: string;
};

export const MACHINE_EXAMPLES: MachineExample[] = [
  {
    id: "convolve",
    title: "Convolve",
    blurb: "151 × 70627 on 24-trit RBNS",
    expected: 151 * 70627,
    source: `field tensor_convolve {
  input: x = 151
  input: y = 70627
  constraints: {
    no_divergence,
    max_entropy: 0.42
  }
  target: z = x * y
}`,
  },
  {
    id: "sum",
    title: "Sum",
    blurb: "Balanced add, carry in trits",
    expected: 409 + 2187,
    source: `field sum_field {
  input: a = 409
  input: b = 2187
  constraints: { no_divergence }
  target: s = a + b
}`,
  },
  {
    id: "diff",
    title: "Difference",
    blurb: "Subtraction is negate then add",
    expected: 1000 - 333,
    source: `field difference {
  input: p = 1000
  input: q = 333
  constraints: { no_divergence }
  target: d = p - q
}`,
  },
  {
    id: "cmp",
    title: "Compare",
    blurb: "CMP3 returns +1, 0, or −1",
    expected: 1,
    source: `field compare {
  input: left = 12
  input: right = 7
  constraints: { no_divergence }
  target: c = left cmp right
}`,
  },
];
