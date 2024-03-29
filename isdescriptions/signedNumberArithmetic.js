
const SIGNEDNUMBERARITHMATIC_TEXT =
`
<div class="infoTitle">Signed Number Arithmetic</div>
<div class="infoText">
    Having only one zero using the two's-complement isn't the only advantage.<br>
    The other advantage is being able to add the two numbers together without having to worry about the sign. For example,
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr>
                <td>   30</td>
            </tr>
            <tr>
                <td style="border-bottom: solid 1px;">+ -10</td>
            </tr>
            <tr>
                <td>   20</td>
            </tr>
        </table>
    </div>
    in binary:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr>
                <td>  00011110</td>
            </tr>
            <tr>
                <td style="border-bottom: solid 1px;">+ 11110110</td>
            </tr>
            <tr>
                <td> <r>1</r>00010100</td>
            </tr>
        </table>
    </div>
    Adding the two's complement -10 to 30 produces and overflow (red 1). Since we are operating in the relms of only 8 bits, that red 1 
    is outside the size and thus cut off of the value. So, what is 00010100 in decimal? Well, 20.<br>
    Adding a two's complement number to another value will cause a wrap-around that results in the correct answer.
    This means, that for the processor, <i>it doesn't matter if the number is signed or not</i>.
</div>
`