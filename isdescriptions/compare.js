
const COMPARE_TEXT =
`
<div class="infoTitle">Compare Instructions</div>
<div class="infoText">
   There are three compare instructions:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr><td>CMP</td><td><u>C</u>o<u>mp</u>are Memory and Accumulator</td></tr>
            <tr><td>CPX</td><td><u>C</u>om<u>p</u>are Memory and Index <u>X</u></td></tr>
            <tr><td>CPY</td><td><u>C</u>om<u>p</u>are Memory and Index <u>Y</u></td></tr>
        </table>
    </div>
</div>
<div class="infoText">
    The compare instructions subtract a value from a register without altering the register or the value.
    The result of the comparison will affect three status flags -- Negative (N), Zero (Z), and Carry (C). With these flags 
    one can find out if the value in the register was greater than, less then or equal to the value tested against.
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr><th></th><th>N</th><th>Z</th><th>C</th><th></th></tr>
            <tr>
                <td>A, X, or Y < Memory</td><td>1*</td><td>0</td><td>0</td><td></td>
            </tr>
            <tr>
                <td>A, X, or Y = Memory</td><td>0 </td><td>1</td><td>1</td><td></td>
            </tr>
            <tr>
                <td>A, X, or Y > Memory</td><td>0*</td><td>0</td><td>1</td><td></td>
            </tr>
            <tr>
                <td> </td>
            </tr>
            <tr>
                <td colspan="5" style="font-size: 12px;">* Valid only for "two's complement" compare.</td>
            </tr>
        </table>
    </div>
</div>
<div class="infoText">
    Alone the compare instructions aren't really all that usful, but together with the branch instructions they become an important 
    part of any program. For example:
    <div class="infoCode">
        <div>       CMP $03    ;IS ACCUMULATOR LESS THAN LOCATION $03?</div>
        <div>       BCC THERE  ;IF YES, BRANCH TO THERE</div>
        <div>HERE:             ;IF NO, CONTINUE EXECUTION HERE</div>
        <div>        .</div>
        <div>        .</div>
        <div>        .</div>
        <div>THERE:            ;EXECUTE THIS IF A IS LESS THAN LOCATION $03</div>
        <div>        .</div>
        <div>        .</div>
        <div>        .</div>
    </div>
</div>
`