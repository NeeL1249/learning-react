# System Software & Compiler Design - Complete Theory Guide

## Module 1: Introduction to System Programs (07 Hours)

### 1.1 System Software Fundamentals

#### Concept of System Software
**System Software** is a collection of programs that control and coordinate the operations of a computer system. It acts as an interface between hardware and application software.

**Characteristics:**
- Close to hardware
- Written in low-level languages
- Machine dependent
- Difficult to understand and design
- Less interactive with users
- Smaller in size but complex

#### Goals of System Software
1. **Efficiency**: Maximum utilization of system resources
2. **Convenience**: Easy to use interface for programmers and users
3. **Correctness**: Error-free execution
4. **Reliability**: Consistent performance
5. **Maintainability**: Easy to modify and update

#### System Program vs Application Program

| Aspect | System Program | Application Program |
|--------|----------------|-------------------|
| Purpose | Control hardware and provide platform | Solve specific user problems |
| Users | System programmers, OS | End users |
| Complexity | High complexity, low-level | Moderate complexity, high-level |
| Dependency | Machine dependent | Machine independent |
| Examples | Compiler, OS, Assembler | Word processor, Games |
| Interaction | Less user interaction | More user interaction |

#### Introduction to System Programs

**1. Assembler**
- Translates assembly language to machine language
- One-to-one correspondence between assembly and machine instructions
- Types: Single-pass and Two-pass assemblers

**2. Compiler**
- Translates high-level language to machine language
- Performs optimization
- Generates efficient code
- Examples: GCC, Turbo C++

**3. Interpreter**
- Executes high-level language programs line by line
- No intermediate object code generation
- Slower execution but faster development
- Examples: Python interpreter, JavaScript engine

**4. Macroprocessor**
- Processes macro definitions and calls
- Text substitution mechanism
- Reduces code redundancy
- Example: C preprocessor (#define, #include)

**5. Linker**
- Combines multiple object files into single executable
- Resolves external references
- Performs address binding
- Types: Static and Dynamic linking

**6. Loader**
- Loads executable program into memory
- Performs relocation
- Types: Absolute, Relocatable, Dynamic loaders

### 1.2 Introduction to Compiler

#### Compiler Definition
A compiler is a system program that translates a program written in high-level language (source language) into an equivalent program in machine language (target language).

#### Phases of Compiler

**Analysis Phase (Front End):**
1. **Lexical Analysis**
2. **Syntax Analysis** 
3. **Semantic Analysis**

**Synthesis Phase (Back End):**
4. **Intermediate Code Generation**
5. **Code Optimization**
6. **Code Generation**

**Supporting Components:**
- **Symbol Table Management**
- **Error Handler**

**Detailed Phase Description:**

1. **Lexical Analysis (Scanner)**
   - Input: Source code
   - Output: Token stream
   - Removes whitespaces and comments
   - Identifies lexemes and converts to tokens

2. **Syntax Analysis (Parser)**
   - Input: Token stream
   - Output: Parse tree/Abstract Syntax Tree
   - Checks grammatical structure
   - Reports syntax errors

3. **Semantic Analysis**
   - Input: Parse tree
   - Output: Annotated parse tree
   - Type checking
   - Scope resolution
   - Declaration checking

4. **Intermediate Code Generation**
   - Input: Annotated parse tree
   - Output: Intermediate representation
   - Machine-independent code
   - Examples: Three-address code, P-code

5. **Code Optimization**
   - Input: Intermediate code
   - Output: Optimized intermediate code
   - Improves efficiency
   - Reduces execution time and space

6. **Code Generation**
   - Input: Optimized intermediate code
   - Output: Target machine code
   - Register allocation
   - Instruction selection

---

## Module 2: Lexical and Syntax Analysis (15 Hours)

### 2.1 Lexical Analysis

#### Role of Finite State Automata in Lexical Analysis

**Finite Automata (FA)** is used to recognize regular expressions that define tokens.

**Types of FA:**
1. **Deterministic Finite Automata (DFA)**
   - Each state has exactly one transition for each input symbol
   - More efficient for implementation
   - Used in lexical analyzer construction

2. **Non-deterministic Finite Automata (NFA)**
   - Multiple transitions possible for same input
   - Easier to construct from regular expressions
   - Converted to DFA for implementation

**Construction Process:**
1. Regular Expression → NFA (Thompson's Construction)
2. NFA → DFA (Subset Construction)
3. DFA → Minimized DFA

#### Role of Lexical Analyzer

**Primary Functions:**
1. **Tokenization**: Break input into meaningful symbols
2. **Remove whitespace** and comments
3. **Handle preprocessor directives**
4. **Symbol table interaction**
5. **Error reporting**

**Interface with Parser:**
- Parser calls `getNextToken()`
- Lexical analyzer returns `<token_type, attribute_value>`

#### Specification and Recognition of Tokens

**Token Categories:**
1. **Keywords**: if, while, int, float
2. **Operators**: +, -, *, /, ==, !=
3. **Identifiers**: variable names, function names
4. **Literals**: numbers, strings, characters
5. **Delimiters**: semicolon, comma, parentheses

**Regular Expressions for Common Tokens:**
```
Identifier: letter(letter|digit)*
Integer: digit+
Float: digit+.digit+
Keywords: if|while|for|int|float
Operators: +|-|*|/|==|!=|<=|>=
```

#### LEX/FLEX

**LEX Structure:**
```
%{
/* C declarations */
%}
/* Definitions */
%%
/* Rules */
pattern1    { action1 }
pattern2    { action2 }
%%
/* User code */
```

**Example:**
```lex
%{
#include <stdio.h>
%}

%%
[0-9]+          { printf("INTEGER: %s\n", yytext); }
[a-zA-Z]+       { printf("IDENTIFIER: %s\n", yytext); }
"+"             { printf("PLUS\n"); }
"-"             { printf("MINUS\n"); }
[ \t\n]         { /* ignore whitespace */ }
.               { printf("UNKNOWN: %s\n", yytext); }
%%

int main() {
    yylex();
    return 0;
}
```

#### Symbol Table

**Purpose:**
- Store information about identifiers
- Used throughout compilation phases
- Support scope management

**Information Stored:**
1. Name
2. Type
3. Scope
4. Memory location
5. Size
6. Line number of declaration

**Implementation:**
- Hash table (most common)
- Binary search tree
- Linear list

### 2.2 Syntax Analysis - Top-Down Parsers

#### Recursive Descent Parser

**Characteristics:**
- Each non-terminal has a corresponding procedure
- Uses recursive calls to match production rules
- Easy to implement and understand
- Requires grammar modification to remove left recursion

**Example Grammar:**
```
E → T E'
E' → + T E' | ε
T → F T'
T' → * F T' | ε
F → ( E ) | id
```

**Implementation:**
```c
void E() {
    T();
    E_prime();
}

void E_prime() {
    if (lookahead == '+') {
        match('+');
        T();
        E_prime();
    }
    // ε production - do nothing
}
```

#### Predictive Parser (LL)

**LL(k) Parser:**
- L: Left-to-right scan
- L: Leftmost derivation
- k: k symbols lookahead

**Requirements:**
1. Grammar must be LL(1)
2. No left recursion
3. No ambiguity
4. No common prefixes (left factoring needed)

**FIRST and FOLLOW Sets:**

**FIRST(α)**: Set of terminals that begin strings derived from α

**Rules for FIRST:**
1. If X is terminal: FIRST(X) = {X}
2. If X → ε: add ε to FIRST(X)
3. If X → Y₁Y₂...Yₖ:
   - Add FIRST(Y₁) - {ε} to FIRST(X)
   - If ε ∈ FIRST(Y₁), add FIRST(Y₂) - {ε}
   - Continue until non-ε or all symbols processed

**FOLLOW(A)**: Set of terminals that can appear immediately after A

**Rules for FOLLOW:**
1. Add $ to FOLLOW(start symbol)
2. If A → αBβ: add FIRST(β) - {ε} to FOLLOW(B)
3. If A → αB or A → αBβ where ε ∈ FIRST(β): add FOLLOW(A) to FOLLOW(B)

**LL(1) Parsing Table Construction:**
1. For production A → α:
   - For each terminal a ∈ FIRST(α): add A → α to M[A,a]
   - If ε ∈ FIRST(α): for each b ∈ FOLLOW(A), add A → α to M[A,b]

### 2.3 Bottom-Up Parsers

#### Shift-Reduce Parser

**Operations:**
1. **Shift**: Move input symbol onto stack
2. **Reduce**: Replace handle on stack with LHS non-terminal
3. **Accept**: Successful parsing
4. **Error**: Invalid input

**Handle**: A substring that matches RHS of production and whose reduction represents one step in reverse of rightmost derivation.

#### Operator Precedence Parser

**Precedence Relations:**
- a ⋖ b: a has lower precedence than b
- a ⋗ b: a has higher precedence than b  
- a ≐ b: a has same precedence as b

**Algorithm:**
1. Compare precedence of stack top with input symbol
2. If stack has higher precedence: reduce
3. If input has higher precedence: shift
4. If equal precedence: shift (for left associative)

#### LR Parsers

**LR(k) Parser:**
- L: Left-to-right scan
- R: Rightmost derivation in reverse
- k: k symbols lookahead

**LR Parsing Algorithm:**
```
Stack: s₀
Input: a₁a₂...aₙ$

repeat:
    s = top of stack
    a = current input symbol
    if ACTION[s,a] = shift t:
        push a then t onto stack
        advance input pointer
    else if ACTION[s,a] = reduce A→β:
        pop 2*|β| symbols from stack
        let s' = new top of stack
        push A then GOTO[s',A] onto stack
    else if ACTION[s,a] = accept:
        return success
    else:
        return error
```

#### SLR Parser

**Simple LR Parser:**
- Uses LR(0) items with FOLLOW sets
- Less powerful than canonical LR
- Smaller parsing tables

**LR(0) Item**: Production with dot indicating parsing position
- A → ⋅XYZ (initial item)
- A → X⋅YZ (after shifting X)
- A → XY⋅Z (after shifting Y)
- A → XYZ⋅ (reduction item)

**SLR Conflicts:**
- **Shift-Reduce**: Can both shift and reduce
- **Reduce-Reduce**: Multiple reductions possible

#### LALR Parser

**Look-Ahead LR Parser:**
- Merge LR(1) states with same core
- More powerful than SLR
- Smaller tables than canonical LR(1)
- Used by YACC/Bison

**Core**: LR(1) item without lookahead symbols

---

## Module 3: Semantic Analysis and Intermediate Code Generation (06 Hours)

### 3.1 Semantic Analysis

#### Purpose of Semantic Analysis
1. **Type checking**: Ensure type compatibility
2. **Scope resolution**: Variable and function scope
3. **Declaration checking**: Variables declared before use
4. **Flow control validation**: Break/continue in loops

#### Syntax Directed Definitions (SDD)

**Definition**: Generalization of context-free grammar where grammar symbols have associated attributes and production rules have semantic actions.

**Components:**
1. **Grammar**: Context-free grammar
2. **Attributes**: Values associated with grammar symbols
3. **Semantic Rules**: Compute attribute values

#### Synthesized and Inherited Attributes

**Synthesized Attributes:**
- Computed from attributes of children nodes
- Information flows bottom-up
- Always computable in bottom-up parsing

**Example:**
```
E → E₁ + T    { E.val = E₁.val + T.val }
E → T         { E.val = T.val }
T → T₁ * F    { T.val = T₁.val * F.val }
T → F         { T.val = F.val }
F → (E)       { F.val = E.val }
F → digit     { F.val = digit.lexval }
```

**Inherited Attributes:**
- Computed from attributes of parent/siblings
- Information flows top-down
- Require multiple passes or complex parsing

**Example:**
```
D → T L       { L.type = T.type }
T → int       { T.type = integer }
T → float     { T.type = real }
L → L₁, id    { L₁.type = L.type; addtype(id.entry, L.type) }
L → id        { addtype(id.entry, L.type) }
```

#### Evaluation Order for SDDs

**Dependency Graph**: Shows dependencies between attribute instances
- Node for each attribute instance
- Edge from attribute b to attribute c if c depends on b

**Topological Sort**: Provides valid evaluation order

#### S-attributed Definitions

**Characteristics:**
- Only synthesized attributes
- Can be evaluated during bottom-up parsing
- Single pass evaluation possible
- Most common in practice

**Evaluation**: Use parser stack to store attribute values

#### L-attributed Definitions

**Characteristics:**
- Inherited attributes of symbol on RHS depend only on:
  - Attributes of symbols to its left in production
  - Inherited attributes of LHS symbol
- Can be evaluated during top-down parsing
- Single pass evaluation possible

### 3.2 Intermediate Code Generation

#### Need for Intermediate Code
1. **Portability**: Same front-end for multiple targets
2. **Optimization**: Machine-independent optimizations
3. **Simplicity**: Easier to generate and optimize
4. **Retargeting**: Easy to generate code for new machines

#### Types of Intermediate Codes

#### 1. Syntax Tree

**Abstract Syntax Tree (AST)**: Tree representation showing hierarchical structure

**Example**: For expression `a + b * c`
```
    +
   / \
  a   *
     / \
    b   c
```

**Advantages:**
- Natural representation
- Easy to optimize
- Good for tree-walking algorithms

#### 2. Postfix Notation

**Reverse Polish Notation**: Operators follow operands

**Example**: 
- Infix: `a + b * c`
- Postfix: `a b c * +`

**Evaluation**: Use stack-based algorithm

#### 3. Three-Address Code

**Form**: `x = y op z`
- At most one operator per instruction
- Easy to optimize and generate code

**Example**:
```
t1 = b * c
t2 = a + t1
```

**Types of Three-Address Instructions:**
1. Assignment: `x = y op z`, `x = op y`, `x = y`
2. Copy: `x = y`
3. Unconditional jump: `goto L`
4. Conditional jump: `if x relop y goto L`
5. Procedure call: `call p, n`
6. Return: `return y`
7. Indexed assignment: `x = y[i]`, `x[i] = y`
8. Address assignment: `x = &y`, `x = *y`, `*x = y`

#### Implementation of Three-Address Code

#### Quadruples (op, arg1, arg2, result)

**Example**: `a + b * c`
```
(0) (*, b, c, t1)
(1) (+, a, t1, t2)
```

**Advantages:**
- Easy to rearrange (optimization)
- Relocatable

**Disadvantages:**
- Four fields per instruction
- More memory required

#### Triples (op, arg1, arg2)

**Example**: `a + b * c`
```
(0) (*, b, c)
(1) (+, a, (0))
```

**Advantages:**
- Only three fields
- Less memory

**Disadvantages:**
- Hard to optimize (position dependent)
- Not easily relocatable

#### Indirect Triples

**Structure**: Array of pointers to triples

**Advantages:**
- Combines benefits of quadruples and triples
- Easy to optimize and relocate

---

## Module 4: Code Optimization and Code Generation (11 Hours)

### 4.1 Code Optimization

#### Need for Code Optimization

**Reasons:**
1. **Performance**: Faster execution
2. **Space**: Reduced memory usage
3. **Energy**: Lower power consumption
4. **Cost**: Better resource utilization

**Trade-offs:**
- Compilation time vs execution time
- Space vs time optimization
- Optimization level vs compilation speed

#### Sources of Optimization

1. **Redundant computations**: Common subexpressions
2. **Unused code**: Dead code elimination
3. **Inefficient loops**: Loop optimization
4. **Poor register usage**: Register allocation
5. **Suboptimal instruction sequences**: Peephole optimization

#### Code Optimization Techniques

#### Machine Independent Optimizations

**1. Constant Folding**
```
Original: x = 2 + 3
Optimized: x = 5
```

**2. Constant Propagation**
```
Original: x = 5; y = x + 2
Optimized: x = 5; y = 7
```

**3. Copy Propagation**
```
Original: x = y; z = x + 1
Optimized: x = y; z = y + 1
```

**4. Dead Code Elimination**
```
Original: x = 1; y = 2; z = x + y; // z never used
Optimized: // entire code removed if z not used
```

**5. Common Subexpression Elimination**
```
Original: x = a + b; y = a + b + c
Optimized: t = a + b; x = t; y = t + c
```

**6. Loop Optimizations:**

**a) Code Motion**
```
Original:
for (i = 0; i < n; i++)
    x[i] = a + b;

Optimized:
t = a + b;
for (i = 0; i < n; i++)
    x[i] = t;
```

**b) Strength Reduction**
```
Original: y = x * 4
Optimized: y = x << 2

Original: for(i=0; i<n; i++) a[i*4] = 0
Optimized: for(i=0, j=0; i<n; i++, j+=4) a[j] = 0
```

**c) Loop Unrolling**
```
Original:
for (i = 0; i < 4; i++)
    a[i] = 0;

Optimized:
a[0] = 0; a[1] = 0; a[2] = 0; a[3] = 0;
```

#### Machine Dependent Optimizations

**1. Register Allocation**
- Assign frequently used variables to registers
- Graph coloring algorithm
- Spilling when registers insufficient

**2. Instruction Selection**
- Choose optimal instruction sequences
- Consider addressing modes
- Use specialized instructions

**3. Instruction Scheduling**
- Reorder instructions to minimize pipeline stalls
- Consider instruction dependencies
- Fill delay slots

**4. Peephole Optimization**
- Examine small instruction windows
- Replace with more efficient sequences

**Examples:**
```
Original: MOV R1, R2; MOV R2, R1
Optimized: // Remove redundant moves

Original: ADD R1, R2, #0
Optimized: MOV R1, R2
```

### 4.2 Runtime Environment and Storage Organization

#### Runtime Environment Components

1. **Code area**: Machine instructions
2. **Static data area**: Global variables
3. **Heap**: Dynamic allocation
4. **Stack**: Activation records

#### Storage Organization

**Memory Layout:**
```
High Memory
┌─────────────────┐
│     Stack       │ ← Stack Pointer (grows down)
│        ↓        │
├─────────────────┤
│                 │
│   Free Space    │
│                 │
├─────────────────┤
│        ↑        │
│      Heap       │ ← Heap Pointer (grows up)
├─────────────────┤
│   Static Data   │
├─────────────────┤
│     Code        │
└─────────────────┘
Low Memory
```

#### Storage Allocation Strategies

**1. Static Allocation**
- Size determined at compile time
- Used for global variables
- Simple but inflexible

**2. Stack Allocation**
- LIFO allocation/deallocation
- Used for local variables
- Automatic management

**3. Heap Allocation**
- Dynamic allocation
- Explicit allocation/deallocation
- Complex management (garbage collection)

#### Activation Records

**Structure:**
```
┌─────────────────┐
│  Return Value   │
├─────────────────┤
│   Parameters    │
├─────────────────┤
│ Control Link    │ ← Previous frame pointer
├─────────────────┤
│  Access Link    │ ← Static link for nested scopes
├─────────────────┤
│ Saved Registers │
├─────────────────┤
│ Local Variables │
├─────────────────┤
│  Temporaries    │
└─────────────────┘
```

#### Parameter Passing

**1. Call by Value**
- Copy actual parameter value
- Changes don't affect original
- Simple but can be expensive for large objects

**2. Call by Reference** 
- Pass address of actual parameter
- Changes affect original variable
- Efficient for large objects

**3. Call by Name**
- Substitute actual parameter expression
- Re-evaluate each time used
- Complex implementation

**4. Call by Copy-Restore**
- Copy in, modify copy, copy back
- Combines aspects of value and reference

### 4.3 Code Generation

#### Issues in Code Generator Design

1. **Input**: Intermediate representation
2. **Target machine**: Instruction set, addressing modes
3. **Instruction selection**: Choose appropriate instructions
4. **Register allocation**: Assign variables to registers
5. **Evaluation order**: Minimize register usage

#### Code Generation Algorithm

**Simple Algorithm:**
```
1. For each three-address instruction:
   a. Select machine instructions
   b. Determine operand locations
   c. Generate assembly code

2. Handle special cases:
   a. Function calls
   b. Jumps and branches
   c. Array references
```

**Example**:
Three-address: `t = a + b`
Assembly:
```
LOAD R1, a
ADD R1, R1, b
MOV t, R1
```

#### Basic Blocks and Flow Graphs

#### Basic Block

**Definition**: Maximal sequence of consecutive statements with:
- One entry point (first statement)
- One exit point (last statement)
- No internal jumps

**Construction Algorithm:**
1. Identify leaders:
   - First statement
   - Target of any jump
   - Statement following a jump

2. Basic block = leader + all statements until next leader

**Example**:
```
1: t1 = a + b
2: t2 = c + d
3: if t1 < t2 goto 7
4: t3 = a + b
5: t4 = t3 + c
6: goto 10
7: t5 = c + d
8: t6 = a + t5
9: t7 = t6 + b
10: ...
```

**Basic Blocks:**
- B1: {1, 2, 3}
- B2: {4, 5, 6}
- B3: {7, 8, 9}
- B4: {10, ...}

#### Flow Graph

**Definition**: Directed graph where:
- Nodes represent basic blocks  
- Edges represent possible flow of control

**Construction**: Add edge from block B1 to B2 if:
1. B2 immediately follows B1 and B1 doesn't end with unconditional jump
2. B1 ends with jump to B2

#### DAG Representation of Basic Blocks

**Directed Acyclic Graph (DAG)**: Represents expressions in basic block

**Construction:**
1. Create leaf for each initial value
2. For each statement x = y op z:
   - Create node for op with children y and z
   - Label node with x

**Example**:
```
t1 = a + b
t2 = a + b
t3 = t1 + t2
```

**DAG**:
```
      t3
      +
     / \
    t1,t2
      +
     / \
    a   b
```

**Benefits:**
- Identifies common subexpressions
- Shows which variables are live
- Guides local optimization

#### Liveness Analysis

**Live Variable**: Variable that may be used before being redefined

**Liveness Equations:**
- `out[B] = ∪ in[S]` for all successors S of B
- `in[B] = use[B] ∪ (out[B] - def[B])`

Where:
- `use[B]`: Variables used in B before definition
- `def[B]`: Variables defined in B

**Algorithm:**
1. Initialize all `in[B]` and `out[B]` to ∅
2. Repeat until no change:
   - For each block B (in reverse order):
     - `out[B] = ∪ in[S]` for successors S
     - `in[B] = use[B] ∪ (out[B] - def[B])`

**Uses of Liveness:**
1. **Register allocation**: Don't allocate registers to dead variables
2. **Dead code elimination**: Remove assignments to dead variables
3. **Optimization validation**: Ensure optimizations preserve semantics

---

## Important Algorithms Summary

### Lexical Analysis
1. **Thompson's Construction**: RE → NFA
2. **Subset Construction**: NFA → DFA  
3. **DFA Minimization**: Reduce states

### Syntax Analysis
1. **FIRST and FOLLOW computation**
2. **LL(1) parsing table construction**
3. **LR(0)/SLR/LALR item construction**
4. **Shift-reduce parsing algorithm**

### Semantic Analysis
1. **Attribute evaluation in SDDs**
2. **Type checking algorithms**
3. **Symbol table management**

### Code Generation
1. **Basic block construction**
2. **DAG construction**
3. **Liveness analysis**
4. **Register allocation**

### Optimization
1. **Constant folding/propagation**
2. **Dead code elimination** 
3. **Common subexpression elimination**
4. **Loop optimization techniques**

This comprehensive guide covers all essential theory for your System Software and Compiler Design exam. Focus on understanding concepts, algorithms, and their applications rather than just memorizing definitions.