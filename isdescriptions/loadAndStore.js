
const LOADANDSTORE_TEXT =
`
<div class="infoTitle">Load And Store Instructions</div>

<div class="infoText">
    The 6502 processor can load from and store into memory. All of these transfers are done with the three registers A, X, and Y.
</div>
<div class="infoText">
    These are the three Load instructions:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr><th>Instruction</th><th>Description</th></tr>
            <tr><td>LDA</td><td><u>L</u>oa<u>d</u> <u>A</u>ccumulator with Memory</td></tr>
            <tr><td>LDX</td><td><u>L</u>oa<u>d</u> <u>X</u> Register with Memory</td></tr>
            <tr><td>LDY</td><td><u>L</u>oa<u>d</u> <u>Y</u> Register with Memory</td></tr>
        </table>
    </div>
    The place in memory where a value is being loaded from will stay unaltered. Two flags in the processor status register are affected 
    by the load instructions. The Negative flag (N) will take on the status of Bit 7 of the loaded value. The Zero flag (Z) is set 
    if the loaded value is zero. For example
    <div class="infoCode">
        LDA $1234
    </div>
    loads the value of memoery location $1234 into the accumulator.
</div>
<div class="infoText">
    These are the three Store instructions:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr><th>Instruction</th><th>Description</th></tr>
            <tr><td>STA</td><td><u>St</u>ore <u>A</u>ccumulator in Memory</td></tr>
            <tr><td>STX</td><td><u>ST</u>ore <u>X</u> Register in Memory</td></tr>
            <tr><td>STY</td><td><u>St</u>ore <u>Y</u> Register in Memory</td></tr>
        </table>
    </div>
    The value of the registers is unaffected by the store instruction. The store instructions also do not alter any flags.
    The easiest way to store a value in memory is to first load it into a register and then store said register.
    <div class="infoCode">
        <div>LDA #69</div>
        <div>STA $03</div>
    </div>
    This sotres the decimal value 69 in memory location $0003.
</div>
`