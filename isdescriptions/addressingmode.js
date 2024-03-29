
const ADDRESSINGMODE_TEXT =
`
<div class="infoTitle">Addressing Modes</div>

<div class="infoTitle1">Immediate Addressing</div>
<div class="infoText">
    In the Immediat Addessing Mode the value written is the value used by the 6502 processor. An immediate value is specified by placing
    a # before the value. For example,
    <div class="infoCode">
        LDA #$81
    </div>
    loads hexadecimal 81 (decimal 129) into the accumulator.
</div>

<div class="infoTitle1">Absolute Addressing</div>
<div class="infoText">
    With Absolute Addressing one can directly address any of the 65'536 memory locations possible. For example,
    <div class="infoCode">
        LDA $1234
    </div>
    loads the value stored in memory position hexadecimal 1234 into the accumulator. The example instruction looks like this in memory:
    <div class="infoCode">
        AD 34 12
    </div>
    AD is the OP Code for the LDA instruction using absolute addressing.
    Notice how the low-order address byte ($34) comes before the high-order one ($12). This is because the 6502 processor uses the
    <a target="_blank" href="https://en.wikipedia.org/wiki/Endianness">little-endian</a>
    formate.
</div>

<div class="infoTitle1">Zero Page Addressing</div>
<div class="infoText">
    Zero page addressing is like absolute addressing, but only the first 256 locations in memory are accessed (i.e., 0000 to 00FF ). Since 
    the high-order byte of the address is always $00 there is no need to write it.
    For example,
    <div class="infoCode">
        LDA #$3B
    </div>
    loads the value stored in memory position hexadecimal $003B into the accumulator.
    Since zero page addresses use one less byte in memory and one less cycle to execute, it is good practice to use Zero Page Addressing 
    for frequently used values.
</div>

<div class="infoTitle1">Implied Addressing</div>
<div class="infoText">
    A lot of 6502 instructions do not need a value or memory location to function, since they do not do anything memory related. For example:
    <div class="infoCode">
        <div>DEY</div>
        <div>TAY</div>
        <div>SEC</div>
    </div>
</div>

<div class="infoTitle1">Indirect Absolute Addressing</div>
<div class="infoText">
    Indirect absolute addressing is used by only the Jump (JMP) instruction.
    Instead of giving the instruction an address to jump to (like in Absolute Addressing), Indirect Absolute Addressing gives the instruction a 
    place in memory where the address is stored that the instruction should jump to.
</div>
<div class="infoText">
    An indirect absolute operand is specified by enclosing it in paranthese. For example in,
    <div class="infoCode">
        JMP ($1234)
    </div>
    the 6502 processor will use the value at location $1234 as the low-order byte of the address and the value at $1235 as the high-order address.
    If memory location $1234 holds the hexadecimal value C4 and location $1235 holds the hexadecimal value 22, then in the above example the 6502
    processor would jump to location $22C4.
</div>

<div class="infoTitle1">Absolute Indexed Addressing</div>
<div class="infoText">
    In absolute indexed addressing, the actual address is calculated by adding the value of the X or Y register to the absolute 
    address. That is,
    <div class="infoMiddle">
        Actual address = Absolute address + X<br>
        or<br>
        Actual address = Absolute address + Y
    </div>
    Absolute indexed operands are specified by adding a ",X" or a ",Y" to the end of the address.
    If the X register contains $09, the instruction
    <div class="infoCode">
        JMP $1234,X
    </div>
    loads the value of memory location $123D (i.e., $1234 + $09) into the accumulator.
</div>

<div class="infoTitle1">Zero Page Indexed Addressing</div>
<div class="infoText">
    Zero page indexed addressing is like absolute indexed addressing, except with zero page addresses.
</div>
<div class="infoText">
    Zero page indexed operands are specified by adding a ",X" or ",Y" to the end of the address.
    If the X register contains $09, the instruction
    <div class="infoCode">
        JMP $34,X
    </div>
    loads the value of location $003D (i.e., $0034 + $09) into the accumulator.
</div>
<div class="infoText">
    One important point to remember is that the calculated address is restricted to the zero page ($0000 - $00FF). If the address is larger 
    than hexadecimal FF, the 6502 will wrap-around the value.
    If in the above example X is hexadecimal CB then the address to jump to would be $FF. If X is hexadecimal CC then the address to jump to
    would become $00.
</div>

<div class="infoTitle1">Indexed Indirect Addressing</div>
<div class="infoText">
    As the name implies, indexed indirect addressing is a combination of indexed addressing and indirect addressing.
    With indexed indirect addressing, an offset in the X register is added to the zero page address in the 
    instruction. The resulting address is used as an indirect address where the actual address is stored.
</div>
<div class="infoText">
    Indexed indirect operands are written like (aa,X). If X contains $03, then
    <div class="infoCode">
        LDA ($34,X)
    </div>
    will cause the processor to caluculate the address $0037 ($34 + $03). It will get the low order byte for the actual address from $0037 
    and the high-order byte from location $0038. 
    So, if $0037 had value $45 and $0038 had value $55, then the processor would load the value at address $5544 into the accumulator. 
</div>

<div class=infoTitle1>Indirect Indexed Addressing</div>
<div class="infoText">
    Indexed indirect addressing is like indirect indexed addressing, but the other way around. First it gets the address stored in memory 
    at the specified location, then it adds the Y register to that newly gotten address.
</div>
<div class="infoText">
    Indirect indexed operands are written like (aa),Y. If Y contains $03, then
    <div class="infoCode">
        LDA ($34),Y
    </div>
    will cause the processor to get the address from location $34 and $35, then adds the Y register value to that address.
    So, if $0034 had value $45 and $0035 had value $55, then the processor would load the value at address $5547 ($5544 + $03) into the accumulator. 
</div>

<div class=infoTitle1>Relative Addressing</div>
<div class="infoText">
    Relative addressing is just what the name says. The value given is just the relative distance to the actual address from the current position.
    This means the actual address is calculated by adding a positive or negative displacement to the current value of the program counter. A positive 
    value will jump forward in memory and a negative one will jump backwards in memory.
</div>
<div class="infoText">
    Relative addressing is only used by the <i>branch instructions</i>. For example, the BNE instruction
    <div class="infoCode">
        <div>       BNE $03</div>
        <div>       LDA #$01</div>
        <div>       LDA #$02</div>
    </div>
    will cause the 6502 to branch 3 memory location forwards to the instruction LDA #$02 if the Zero flag is 0.
</div>
<div class="infoText">
    Being only an 8-bit displacement, it is limited to +127 bytes (forward) to -128 bytes (backward) from the instruction.
</div>
<div class="infoText">
    Most compilers (including the one on this site) will also calculate the offset from a label or absolute address. So,
    <div class="infoCode">
        <div>       BNE THERE</div>
        <div>HERE:</div>
        <div>       LDA #$01</div>
        <div>THERE:</div>
        <div>       LDA #$02</div>
    </div>
    will also branch to LDA #$02 if the zero flag is 0.
</div>

<div class="infoTitle1">Accumulator Addressing</div>
<div class="infoText">
    The shifting and rotating instructions can also be used on the accumulator and not just memory. In this case an "A" is given as an operand.
    For example,
    <div class="infoCode">
        LSR A
    </div>
    shifts the contents of the accumulator to the right.
</div>
`