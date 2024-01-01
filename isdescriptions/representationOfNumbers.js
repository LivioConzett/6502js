
const REPRESENTATIONOFNUMBERS_TEXT =
`
<div class="infoTitle">Representation of Numbers</div>
<div class="infoText">
    The 6502 processor can work with both <i>signed</i> and <i>unsigned</i> numbers. The processor itself doesn't care what form the numbers
    have, but you should know how to interpert both.
</div>
<div class="infoText">
    Before we look at signed and unsigned numbers, however, we must first understand how binary numbers work.<br>
    A byte is made up of 8 bits. The bits are numbered from right to left. Each bit has a certain weight depending on its position within 
    the byte. The right most bit is the least significant bit and the left most bit is the most significant bit.<br>
    To calculate the value of a binary number, first calculate the value of each bit and then calculate the sum of all the bit values.<br>
    To get the value of a bit, calculate 2 to the power of the bit's position and multiply that by the status of the bit.
    For example, if one wanted to know what number binary 00100010 was, one would do this:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr>
                <td>0 =</td>
                <td>2<sup>7</sup> * 0</td>
                <td>=</td>
                <td style="text-align:right">0</td>
            </tr>
            <tr>
                <td>0 =</td>
                <td>2<sup>6</sup> * 0</td>
                <td>=</td>
                <td style="text-align:right">0</td>
            </tr>
            <tr>
                <td>1 =</td>
                <td>2<sup>5</sup> * 1</td>
                <td>=</td>
                <td style="text-align:right">32</td>
            </tr>
            <tr>
                <td>0 =</td>
                <td>2<sup>4</sup> * 0</td>
                <td>=</td>
                <td style="text-align:right">0</td>
            </tr>
            <tr>
                <td>0 =</td>
                <td>2<sup>3</sup> * 0</td>
                <td>=</td>
                <td style="text-align:right">0</td>
            </tr>
            <tr>
                <td>0 =</td>
                <td>2<sup>2</sup> * 0</td>
                <td>=</td>
                <td style="text-align:right">0</td>
            </tr>
            <tr>
                <td>1 =</td>
                <td>2<sup>1</sup> * 1</td>
                <td>=</td>
                <td style="text-align:right">2</td>
            </tr>
            <tr>
                <td>0 =</td>
                <td>2<sup>0</sup> * 0</td>
                <td>=</td>
                <td style="text-align:right; border-bottom: solid 1px;">0</td>
                <td>+</td>
            </tr>
            <tr>
                <td> </td>
                <td> </td>
                <td> </td>
                <td style="text-align:right; border-bottom: double">34</td>
            </tr>
        </table>
    </div>
    Since anything times 0 will equal 0, it is only necessary to calculate the bits that are 1. And since anything times one will equal itself, 
    one can omit the "* 1" part.
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr>
                <td>1 =</td>
                <td>2<sup>5</sup></td>
                <td>=</td>
                <td style="text-align:right">32</td>
            </tr>
            <tr>
                <td>1 =</td>
                <td>2<sup>1</sup></td>
                <td>=</td>
                <td style="text-align:right; border-bottom: solid 1px;">2</td>
                <td>+</td>
            </tr>
            <tr>
                <td> </td>
                <td> </td>
                <td> </td>
                <td style="text-align:right; border-bottom: double">34</td>
            </tr>
        </table>
    </div>
    The weights can be shown like this:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr>
                <td>7</td>
                <td>6</td>
                <td>5</td>
                <td>4</td>
                <td>3</td>
                <td>2</td>
                <td>1</td>
                <td>0</td>
                <td><b>Bit Position</b></td>
            </tr>
            <tr>
                <td>2<sup>7</sup></td>
                <td>2<sup>6</sup></td>
                <td>2<sup>5</sup></td>
                <td>2<sup>4</sup></td>
                <td>2<sup>3</sup></td>
                <td>2<sup>2</sup></td>
                <td>2<sup>1</sup></td>
                <td>2<sup>0</sup></td>
                <td><b>Binary weight</b></td>
            </tr>
            <tr>
                <td>128</td>
                <td>64</td>
                <td>32</td>
                <td>16</td>
                <td>8</td>
                <td>4</td>
                <td>2</td>
                <td>1</td>
                <td><b>Equivelant Decimal Weight</b></td>
            </tr>
        </table>
    </div>
    With 8 bits one can create numbers from 0 (00000000) to +255 (11111111).
</div>
<div class="infoText">
    An <i>unsigned</i> number is a normal binary number calculated as shown above. Nothing special at all. It can, however, only be positive.
</div>
<div class="infoText">
    A <i>signed</i> number, however, is a bit different. A signed number has the capacity to indicate if the number is minus or not. For that it 
    highjackes the most-significant bit (in this case Bit 7) and uses it to show the sign (- or +) of a number. If it is a 1 the number is minus; otherwise
    the number is positive.<br>
    This does however mean that only Bit 6 to Bit 0 can be used to hold the value of the number effectively limiting it to positive numbers from 
    0 (00000000) to +127 (01111111) and negative numbers from -1 (11111111) to -128 (10000000).
</div>
<div class="infoText">
    But why is -1 represented as 11111111 and not 10000001? Well, that is because the negavtive-signed numbers are represented in their
    <i>two's complement</i> form. This form was created to solve the problems of having two zero forms (10000000 as -0 and 00000000 as +0).
    In the two's complement form the negative side has one more "value" (-128), but there is only one zero form; absolute zero 00000000.<br>
    To get the two's complement form from a number, you take the positive number and reverse the status of each bit (turn each 0 to a 1 and each 1 
    to a 0 (basicaly xor it with 11111111)) and then add 1 to it. Example:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr>
                <td> 00100010</td>
                <td>+34<sub>10</sub></td>
            </tr>
            <tr>
                <td> 11011101</td>
                <td>One's complement</td>
            </tr>
            <tr>
                <td style="border-bottom: solid 1px">+       1</td>
                <td>Add 1</td>
            </tr>
            <tr>
                <td> 11011110</td>
                <td>Two's complement -34<sub>10</sub></td>
            </tr>
        </table>
    </div>
</div>
`