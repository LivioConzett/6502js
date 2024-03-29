
const INCREMENTANDDECREMENT_TEXT =
`
<div class="infoTitle">Increment and Decrement Instuctions</div>

<div class="infoTitle1">Increment / Decrement Registers</div>
<div class="infoText">
    The 6502's two general purpose registers X and Y can easily be incremented and decremented with the following instructions:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr><th>Instruction</th><th>Description</th></tr>
            <tr>
                <td>DEX</td>
                <td><u>De</u>crement Index <u>X</u> by one</td>
            </tr>
            <tr>
                <td>DEY</td>
                <td><u>De</u>crement Index <u>Y</u> by one</td>
            </tr>
            <tr>
                <td>INX</td>
                <td><u>In</u>crement Index <u>X</u> by one</td>
            </tr>
            <tr>
                <td>INY</td>
                <td><u>In</u>crement Index <u>Y</u> by one</td>
            </tr>
        </table>
    </div>
    These use the implied addressing mode, meaning they do not require any value or address. They affect two flags in the processor status register:
    <ul class="infoList">
        <li>
            The Negative flag (N) is set if the register contains a negative result after being incremented or decremented (Bit 7 = 1);
            otherwise, N is reset.
        </li>
        <li>
            The Zero flag (Z) is set if the result of the increment or decrement operation is zero; otherwise, it is reset.
        </li>
    </ul>
</div>

<div class='infoTitle1'>Incerment / Decrement Memory</div>
<div class="infoText">
    The 6502 can also increment memory and the accumulator.
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr><th>Instruction</th><th>Description</th></tr>
            <tr>
                <td>DEC</td>
                <td><u>Dec</u>rement Memory by one</td>
            </tr>
            <tr>
                <td>INC</td>
                <td><u>Inc</u>rement Memory by one</td>
            </tr>
        </table>
    </div>
    These two instructions do need an address given to them. They affect the same two flags like X and Y increment/decrement instructions.
</div>
<div class="infoText">
    Important to note is that the Carry flag (C) is not affected by any of the increment or decrement instructions.<br>
    However, when incrementing one can check the Zero flag to see if a wrap around has occured and when decrementing one can check the 
    Negative flag to determine when one has passed zero (again, a wrap around has happened).
</div>
`