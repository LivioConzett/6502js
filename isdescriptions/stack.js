
const STACK_TEXT =
`
<div class="infoTitle">Stack Operations</div>
<div class="infoText">
    The Stack is a space in memory from $0100 to $01FF. The 6502 processor can push values onto the stack and pull thoes values
    back from the stack. The stack is addressed using the Stack pointer.<br>
    When pushing onto the stack the value gets saved in the stack at the position where the stack pointer is pointing toward then 
    the stack pointer gets <i>decremented</i> by one.<br>
    When pulling from the stack the Stack pointer gets <i>incremented</i> by one and then the value in the stack at the position 
    where the Stack pointer is pointing toward will be read.
</div>
<div class="infoText">
    The Stack is like a stack of plates. Each plate is a value. When pushing onto the stack you place a plate ontop of it. When pulling 
    from the stack, you take away the top plate. There are four push and pull instructions:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr><th>Instruction</th><th>Description</th></tr>
            <tr>
                <td>PHA</td>
                <td><u>P</u>us<u>h</u> <u>A</u>ccumulator onto Stack</td>
            </tr>
            <tr>
                <td>PHP</td>
                <td><u>P</u>us<u>h</u> <u>P</u>rocessor Status onto Stack</td>
            </tr>
            <tr>
                <td>PLA</td>
                <td><u>P</u>ul<u>l</u> <u>A</u>ccumulator from Stack</td>
            </tr>
            <tr>
                <td>PLP</td>
                <td><u>P</u>ul<u>l</u> <u>P</u>rocessor Status from Stack</td>
            </tr>
        </table>
    </div>
</div>
<div class="infoText">
    On startup of the 6502 processor the Stack pointer has a random value. It is good practice to set the Stack pointer to $FF in the beginning.
    <div class="infoCode">
        <div>LDX $FF  ;LOAD $FF INTO RESGISTER X</div>
        <div>TXS      ;TRANSFER X TO THE STACK POINTER</div>
    </div>
</div>
`