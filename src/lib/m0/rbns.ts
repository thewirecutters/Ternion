export const WORD_WIDTH = 24;
export const MAX_VAL = (3 ** WORD_WIDTH - 1) / 2;
export const MIN_VAL = -MAX_VAL;

export type Bit = 0 | 1;
export type TritPair = readonly [Bit, Bit];
export type Word = TritPair[];

export function tritValue(pair: TritPair): -1 | 0 | 1 {
  return (pair[0] - pair[1]) as -1 | 0 | 1;
}

export function tritChar(pair: TritPair): "+" | "-" | "0" {
  const v = tritValue(pair);
  if (v === 1) return "+";
  if (v === -1) return "-";
  return "0";
}

export function encodeTrit(v: number): TritPair {
  if (v === 1) return [1, 0];
  if (v === -1) return [0, 1];
  return [0, 0];
}

export function wordToStr(word: Word): string {
  return word
    .map(tritChar)
    .reverse()
    .join("");
}

export function fromInt(val: number): Word {
  if (!Number.isInteger(val) || val < MIN_VAL || val > MAX_VAL) {
    throw new Error(`Value ${val} out of 24-trit range [${MIN_VAL}, ${MAX_VAL}]`);
  }
  const word: TritPair[] = [];
  let temp = Math.abs(val);
  while (word.length < WORD_WIDTH) {
    const rem = temp % 3;
    let trit: number;
    if (rem === 2) {
      trit = -1;
      temp = Math.floor((temp + 1) / 3);
    } else if (rem === 1) {
      trit = 1;
      temp = Math.floor(temp / 3);
    } else {
      trit = 0;
      temp = Math.floor(temp / 3);
    }
    if (val < 0) trit = -trit;
    word.push(encodeTrit(trit));
  }
  return word;
}

export function toInt(word: Word): number {
  let val = 0;
  for (let i = 0; i < word.length; i++) {
    val += tritValue(word[i]!) * 3 ** i;
  }
  return val;
}

export function rbnsAddTrit(
  t1: TritPair,
  t2: TritPair,
  carryIn: number,
): { sum: TritPair; carry: number } {
  const total = tritValue(t1) + tritValue(t2) + carryIn;
  let carry = 0;
  let sumVal = total;
  if (total >= 2) {
    carry = 1;
    sumVal = total - 3;
  } else if (total <= -2) {
    carry = -1;
    sumVal = total + 3;
  }
  return { sum: encodeTrit(sumVal), carry };
}

export function rbnsAdd(word1: Word, word2: Word): Word {
  const result: TritPair[] = [];
  let carry = 0;
  for (let i = 0; i < WORD_WIDTH; i++) {
    const step = rbnsAddTrit(word1[i] ?? [0, 0], word2[i] ?? [0, 0], carry);
    result.push(step.sum);
    carry = step.carry;
  }
  return result;
}

export function rbnsNegate(word: Word): Word {
  return word.map(([a, b]) => [b, a] as TritPair);
}

export function rbnsMul(word1: Word, word2: Word): Word {
  let res = toInt(word1) * toInt(word2);
  const span = 3 ** WORD_WIDTH;
  if (res > MAX_VAL) res = ((res + MAX_VAL) % span) - MAX_VAL;
  else if (res < MIN_VAL) res = ((res - MIN_VAL) % span) + MIN_VAL;
  return fromInt(res);
}
