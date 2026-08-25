#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sovereign Compiler M0 - Ternary Compiler and Binary Simulator
------------------------------------------------------------
A full, runnable Python implementation of a balanced ternary compiler (Tern language)
and a binary-equivalent Virtual Machine (M0 Simulator).

Ternary values are simulated using binary bit-pairs (Redundant Binary Number System - RBNS):
- Trit value in {-1, 0, +1} is encoded as a bit-pair (a, b) where value = a - b.
- (1, 0) = +1
- (0, 1) = -1
- (0, 0) = 0
- (1, 1) is forbidden.

References:
- Address space width: 36 trits
- Word size: 24 trits (equivalent to ~38 bits of binary capacity)
- Balanced ternary range: -(3^24 - 1)/2 to +(3^24 - 1)/2 (= -7,174,453 to +7,174,453)
"""

import sys
import re

# ===========================================================================
# 1. TERNARY & RBNS REPRESENTATION IN BINARY
# ===========================================================================

WORD_WIDTH = 24  # M0 Machine word size in trits
MAX_VAL = (3**WORD_WIDTH - 1) // 2
MIN_VAL = -MAX_VAL

def trit_to_str(trit_pair):
    """Convert bit-pair (a, b) to character representation."""
    val = trit_pair[0] - trit_pair[1]
    if val == 1: return '+'
    if val == -1: return '-'
    return '0'

def word_to_str(word):
    """Convert a 24-trit word to a human-readable string (MSB to LSB)."""
    return "".join(trit_to_str(word[i]) for i in reversed(range(WORD_WIDTH)))

def from_int(val):
    """Convert a Python integer to a 24-trit word (list of (a, b) bit-pairs)."""
    if val < MIN_VAL or val > MAX_VAL:
        raise ValueError(f"Value {val} out of 24-trit range [{MIN_VAL}, {MAX_VAL}]")
    
    word = []
    temp = abs(val)
    # Standard balanced ternary conversion
    while len(word) < WORD_WIDTH:
        rem = temp % 3
        if rem == 2:
            trit = -1
            temp = (temp + 1) // 3
        elif rem == 1:
            trit = 1
            temp = temp // 3
        else:
            trit = 0
            temp = temp // 3
        
        # Apply sign of original value
        if val < 0:
            trit = -trit
            
        # Encode as bit-pair (a, b)
        if trit == 1:
            word.append((1, 0))
        elif trit == -1:
            word.append((0, 1))
        else:
            word.append((0, 0))
            
    return word

def to_int(word):
    """Convert a 24-trit word (list of (a, b) bit-pairs) to a Python integer."""
    val = 0
    for i, (a, b) in enumerate(word):
        trit_val = a - b
        val += trit_val * (3**i)
    return val

# ===========================================================================
# 2. CONSTANT-TIME RBNS ALU SIMULATION
# ===========================================================================

def rbns_add_trit(t1, t2, carry_in):
    """
    Simulates physical digit-level addition of two trits and a carry-in.
    Returns (sum_trit, carry_out).
    """
    v1 = t1[0] - t1[1]
    v2 = t2[0] - t2[1]
    cin = carry_in
    
    total = v1 + v2 + cin
    
    # Resolve balanced ternary carry logic
    if total >= 2:
        # 2 = 3*(1) - 1,  3 = 3*(1) + 0,  4 = 3*(1) + 1 (in case of carry-in overflow)
        carry_out = 1
        sum_val = total - 3
    elif total <= -2:
        # -2 = 3*(-1) + 1, -3 = 3*(-1) + 0, -4 = 3*(-1) - 1
        carry_out = -1
        sum_val = total + 3
    else:
        carry_out = 0
        sum_val = total
        
    # Convert sum_val and carry_out back to bit-pairs
    sum_pair = (1, 0) if sum_val == 1 else ((0, 1) if sum_val == -1 else (0, 0))
    return sum_pair, carry_out

def rbns_add(word1, word2):
    """
    Simulate balanced ternary/RBNS addition.
    In hardware, this completes in constant time O(1) across the word.
    Here we simulate it sequentially for verification but respect the digit constraints.
    """
    result = []
    carry = 0
    for i in range(WORD_WIDTH):
        sum_pair, carry = rbns_add_trit(word1[i], word2[i], carry)
        result.append(sum_pair)
    # Carry beyond MSB is truncated in fixed-width registers
    return result

def rbns_negate(word):
    """Zero-overhead sign-inversion via bit-pair swapping (a, b) -> (b, a)."""
    return [(b, a) for (a, b) in word]

def rbns_mul(word1, word2):
    """Multiply two 24-trit words."""
    v1 = to_int(word1)
    v2 = to_int(word2)
    res_val = v1 * v2
    # Truncate to 24-trit range
    if res_val > MAX_VAL:
        res_val = ((res_val + MAX_VAL) % (3**WORD_WIDTH)) - MAX_VAL
    elif res_val < MIN_VAL:
        res_val = ((res_val - MIN_VAL) % (3**WORD_WIDTH)) + MIN_VAL
    return from_int(res_val)

def rbns_div(word1, word2):
    """Integer division with remainder. Returns (quotient_word, remainder_word)."""
    v1 = to_int(word1)
    v2 = to_int(word2)
    if v2 == 0:
        raise ZeroDivisionError("Ternary division by zero")
    q = int(v1 / v2)
    r = v1 - q * v2
    return from_int(q), from_int(r)

# ===========================================================================
# 3. THE HIGH-LEVEL TERN LANGUAGE COMPILER
# ===========================================================================

class ASTField:
    def __init__(self, name):
        self.name = name
        self.inputs = {}
        self.target_expr = ""
        self.constraints = {}

class TernCompiler:
    """
    Compiles a high-level declarative Tern program into M0 machine code.
    """
    def __init__(self):
        self.symbol_table = {}
        self.instructions = []
        self.constants = {}

    def parse(self, source_code):
        """Simple recursive-descent/regex parser for the Tern Field Description language."""
        # Strip comments and extra whitespace
        clean_code = re.sub(r'//.*', '', source_code)
        clean_code = " ".join(clean_code.split())
        
        # Parse Field Declaration
        field_match = re.match(r'field\s+(\w+)\s*\{(.*)\}', clean_code)
        if not field_match:
            raise SyntaxError("Invalid Tern program. Must start with 'field <name> { ... }'")
        
        field_name = field_match.group(1)
        body = field_match.group(2)
        
        ast = ASTField(field_name)
        
        # Parse Inputs
        inputs = re.findall(r'input:\s*(\w+)\s*=\s*([+-]?\d+)', body)
        for var, val in inputs:
            ast.inputs[var] = int(val)
            
        # Parse Target expression
        target_match = re.search(r'target:\s*(\w+)\s*=\s*([^;]+)', body)
        if target_match:
            ast.target_expr = (target_match.group(1), target_match.group(2).strip())
            
        # Parse Constraints
        constraints_block = re.search(r'constraints:\s*\{(.*?)\}', body)
        if constraints_block:
            constraints = re.findall(r'(\w+)(?:\s*:\s*([0-9.]+))?', constraints_block.group(1))
            for key, val in constraints:
                ast.constraints[key] = float(val) if val else True
                
        return ast

    def compile(self, source_code):
        """
        Translates the AST of a field description into low-level M0 Instructions.
        """
        ast = self.parse(source_code)
        self.instructions = []
        self.symbol_table = {}
        
        print(f"[Compiler] Compiling field '{ast.name}'...")
        
        # 1. Allocate registers for inputs and load them
        reg_counter = 1
        for var, val in ast.inputs.items():
            reg = f"R{reg_counter}"
            self.symbol_table[var] = reg
            # Emitting LOAD immediate instruction
            self.instructions.append(f"LOAD {reg}, {val}")
            reg_counter += 1
            
        # 2. Parse target expression and generate math operations
        target_var, expr = ast.target_expr
        
        # Supported simple expressions: var1 + var2, var1 * var2, etc.
        tokens = expr.split()
        if len(tokens) == 3:
            left, op, right = tokens
            left_reg = self.symbol_table.get(left)
            right_reg = self.symbol_table.get(right)
            
            if not left_reg or not right_reg:
                raise NameError(f"Symbol in expression '{expr}' is not declared in inputs.")
                
            out_reg = f"R{reg_counter}"
            self.symbol_table[target_var] = out_reg
            
            if op == '+':
                self.instructions.append(f"ADD {out_reg}, {left_reg}, {right_reg}")
            elif op == '*':
                self.instructions.append(f"MUL {out_reg}, {left_reg}, {right_reg}")
            elif op == '-':
                # Load negate or use subtract sequence
                neg_reg = f"R{reg_counter+1}"
                self.instructions.append(f"NEG {neg_reg}, {right_reg}")
                self.instructions.append(f"ADD {out_reg}, {left_reg}, {neg_reg}")
            else:
                raise NotImplementedError(f"Operator '{op}' is not supported in M0 prototype compiler.")
        else:
            raise SyntaxError(f"Complex expression '{expr}' exceeds simple M0 code generator.")
            
        # Add output print state and HALT
        self.instructions.append(f"STORE {out_reg}, 100")  # Store output in mem address 100
        self.instructions.append("HALT")
        
        print(f"[Compiler] Generation complete. Generated {len(self.instructions)} assembly lines.")
        return self.instructions

# ===========================================================================
# 4. THE BINARY M0 SIMULATOR (VIRTUAL MACHINE)
# ===========================================================================

class M0Simulator:
    """
    A Virtual Machine that simulates execution of compiled M0 balanced ternary instructions.
    Uses binary-level structures (bit-pairs) to carry out the core logic.
    """
    def __init__(self):
        # 27 Registers, each storing a 24-trit word
        self.registers = {f"R{i}": from_int(0) for i in range(27)}
        # Trit-addressable memory segment (simulated as dict of addresses -> words)
        self.memory = {}
        self.pc = 0
        self.halted = False
        
        # Telemetry metrics (Passage 289)
        self.total_cycles = 0
        self.total_energy_pj = 0.0

    def load_program(self, instructions):
        self.instructions = instructions
        self.pc = 0
        self.halted = False
        self.total_cycles = 0
        self.total_energy_pj = 0.0

    def step(self):
        if self.halted or self.pc >= len(self.instructions):
            self.halted = True
            return
            
        instr = self.instructions[self.pc]
        self.pc += 1
        self.total_cycles += 1
        
        # Parse instruction
        parts = [p.strip(",") for p in instr.split()]
        op = parts[0]
        
        if op == "HALT":
            self.halted = True
            
        elif op == "LOAD":
            dest_reg = parts[1]
            val_str = parts[2]
            # Handle direct loading of immediate values
            if val_str.startswith("R"):
                # Register load
                self.registers[dest_reg] = list(self.registers[val_str])
                self.total_energy_pj += 1.2
            else:
                # Immediate value load
                val = int(val_str)
                self.registers[dest_reg] = from_int(val)
                self.total_energy_pj += 1.2
                
        elif op == "STORE":
            src_reg = parts[1]
            addr = int(parts[2])
            self.memory[addr] = list(self.registers[src_reg])
            self.total_energy_pj += 1.0
            
        elif op == "ADD":
            dest, src1, src2 = parts[1], parts[2], parts[3]
            self.registers[dest] = rbns_add(self.registers[src1], self.registers[src2])
            self.total_energy_pj += 0.8  # Passage 289: ADD RBNS energy
            
        elif op == "NEG":
            dest, src = parts[1], parts[2]
            self.registers[dest] = rbns_negate(self.registers[src])
            self.total_energy_pj += 0.2  # Low-cost bit-pair inversion
            
        elif op == "MUL":
            dest, src1, src2 = parts[1], parts[2], parts[3]
            self.registers[dest] = rbns_mul(self.registers[src1], self.registers[src2])
            self.total_energy_pj += 2.4  # Passage 289: MUL energy
            
        elif op == "CMP3":
            dest, src1, src2 = parts[1], parts[2], parts[3]
            v1 = to_int(self.registers[src1])
            v2 = to_int(self.registers[src2])
            res_val = 1 if v1 > v2 else (-1 if v1 < v2 else 0)
            self.registers[dest] = from_int(res_val)
            self.total_energy_pj += 0.6
            
        else:
            raise ValueError(f"Unknown instruction in M0 ISA: {instr}")

    def run_all(self):
        while not self.halted:
            self.step()

    def print_state(self):
        print("\n=== M0 Simulator Register State ===")
        for reg, word in sorted(self.registers.items(), key=lambda x: int(x[0][1:])):
            val = to_int(word)
            if val != 0:
                print(f"{reg:4s}: {word_to_str(word)} | Base-10: {val}")
        print("-----------------------------------")
        print(f"Total Cycles: {self.total_cycles}")
        print(f"Total Energy: {self.total_energy_pj:.2f} pJ")
        print("===================================\n")

# ===========================================================================
# 5. EXECUTION & DEMONSTRATION SUITE
# ===========================================================================

if __name__ == "__main__":
    print("=== TERN LANGUAGE COMPILER & M0 SIMULATOR START ===")
    
    # 1. High-level Tern Program defining a Convolution-Field operations segment
    tern_code = """
    field tensor_convolve {
        input: x = 151
        input: y = 70627
        constraints: {
            no_divergence,
            max_entropy: 0.42
        }
        target: z = x * y
    }
    """
    
    print("\n--- Phase 1: High-Level Tern Program ---")
    print(tern_code.strip())
    
    # 2. Compile high-level Tern to M0 Assembly
    compiler = TernCompiler()
    assembly = compiler.compile(tern_code)
    
    print("\n--- Phase 2: Compiled M0 Assembly ---")
    for idx, inst in enumerate(assembly):
        print(f"  Line {idx:02d}: {inst}")
        
    # 3. Initialize and run Binary-Equivalent M0 Simulator
    sim = M0Simulator()
    sim.load_program(assembly)
    
    print("\n--- Phase 3: Binary-Equivalent Simulator Execution ---")
    sim.run_all()
    sim.print_state()
    
    # Verify result from simulated memory
    output_word = sim.memory.get(100)
    if output_word:
        output_val = to_int(output_word)
        expected = 151 * 70627
        print(f"Memory Verification [Addr 100]:")
        print(f"  Ternary Word: {word_to_str(output_word)}")
        print(f"  Base-10 Value: {output_val}")
        print(f"  Expected Value: {expected}")
        assert output_val == expected, "Error: Mathematical discrepancy detected!"
        print("  Status: SUCCESS! Memory verification matches expected output exactly.")
    
    print("\n=== TERN LANGUAGE COMPILER & M0 SIMULATOR COMPLETE ===")
