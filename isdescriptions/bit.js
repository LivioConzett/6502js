
const BIT_TEXT =
`
<div class="infoTitle">BIT</div>
<div class="infoText">
    The 6502 processor has an instruction that allows you to test the value of individual bits in memory, by logically ANDing the contents 
    of the memory location with a bit selection mask in the accumulator. This instruction alters neither accumulator nor memory.
    Following status flags are affected:
    <ul class="infoList">
        <li>
            The Negative flag (N) is the initial (un-ANDed) value of Bit 7 of the memory location.
        </li>
        <li>
            The Overflow flag (V) is the initial (un-ANDed) value of Bit 6 of the memory location.
        </li>
        <li>
            The Zero flag (Z) is set if the AND operation generates a zero result; otherwise, it is reset.
        </li>
    </ul>
</div>
<div class="infoText">
    <i>Only</i> the Zero flag (Z) reflects the result of the BIT operation; the Negative (N) and Overflow (V) flags reflect the values 
    of the two most-significant memory bits before the operation.
    For example:
    <div class="infoCode">
        <div>LDA #08    ;MASK OFF ALL BUT BIT 3</div>
        <div>BIT $1234  ;IS BIT 3 = 0?</div>
        <div>BEQ ISOK   ;BRANCH TO ISOK IS BIT 3 = 0</div>
    </div>
</div>
`