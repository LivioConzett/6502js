
const LOGICALINSTRUCTIONS_TEXT =
`
<div class="infoTitle">Logical Instructions</div>
<div class="infoText">
    In some cases one might want to comapre not the whole 8-bit value, but just a sinlge bit of it.
    In these situations the following logcal instructions may be of use:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr><th>Instruction</th><th>Description</th></tr>
            <tr>
                <td>AND</td>
                <td><u>AND</u> Memory with Accumulator</td>
            </tr>
            <tr>
                <td>EOR</td>
                <td><u>E</u>xclusive-<u>OR</u> Memory with Accumulator</td>
            </tr>
            <tr>
                <td>ORA</td>
                <td><u>OR</u> Memory with <u>A</u>ccumulator</td>
            </tr>
        </table>
    </div>
</div>
<div class="infoText">
    The instructions all affect two flags in the processor status register:
    <ul class="infoList">
        <li>
            The Negative flag (N) is set if the result is negative (Bit 7 = 1); otherwise, it is reset.
        </li>
        <li>
            The Zero flag (Z) is set if the result is zero; otherwise, it is reset.
        </li>
    </ul>
</div>
`