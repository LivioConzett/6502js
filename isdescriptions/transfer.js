
const TRANSFER_TEXT =
`
<div class="infoTitle">Transfers</div>
<div class="infoText">
    The 6502 has 6 instructions to transfer values between registers:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr><th>Instruction</th><th>Description</th></tr>
            <tr>
                <td>TAX</td>
                <td><u>T</u>ransfer <u>A</u>ccumulator to Index <u>X</u></td>
            </tr>
            <tr>
                <td>TAY</td>
                <td><u>T</u>ransfer <u>A</u>ccumulator to Index <u>Y</u></td>
            </tr>
            <tr>
                <td>TSX</td>
                <td><u>T</u>ransfer <u>S</u>tack Pointer to Index <u>X</u></td>
            </tr>
            <tr>
                <td>TXA</td>
                <td><u>T</u>ransfer Index <u>X</u> to <u>A</u>ccumulator</td>
            </tr>
            <tr>
                <td>TXS</td>
                <td><u>T</u>ransfer Index <u>X</u> to <u>S</u>tack Pointer</td>
            </tr>
            <tr>
                <td>TYA</td>
                <td><u>T</u>ransfer Index <u>Y</u> to <u>A</u>ccumulator</td>
            </tr>
        </table>
    </div>
    TXA and TYA affect two Status flags:
    <ul class="infoList">
        <li>
            The Negative flag (N) takes the status of Bit 7 in the Accumulator.
        </li>
        <li>
            The Zero flag (Z) is set if the Accumulator is zero after the transfer; otherwise it is cleared.
        </li>
    </ul>
</div>
`