
const DECIMALMODE_TEXT =
`
<div class="infoTitle">Decimal Mode</div>
<div class="infoText">
    The 6502's Arithmetic Logic Unit (ALU) can function in two different modes: <i>binary</i> and <i>decimal</i>. These two modes determine
    how the ADC and SBC instructions interpert numbers.<br>
    In binary mode the whole 8 bits of a value are considered to be one number 00000000 (0<sub>10</sub>) to 11111111 (255<sub>10</sub>).<br>
    In decimal mode the 8 bits are split into two 4 bit numbers. Each one of thoes 4 bit segments are looked at as Binary-Coded Decimal (BCD) 
    0000 0000 (00<sub>bcd</sub>) to 1001 1001 (99<sub>bcd</sub>).
</div>
<div class="infoText">
    BCD digits only reach from 0 to 9 (0000 to 1001). 1010 to 1111 are not allowed.
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr>
                <th>BCD</th>
                <th>Binary</th>
            </tr>
            <tr>
                <td>0</td>
                <td>0000</td>
            </tr>
            <tr>
                <td>1</td>
                <td>0001</td>
            </tr>
            <tr>
                <td>2</td>
                <td>0010</td>
            </tr>
            <tr>
                <td>3</td>
                <td>0011</td>
            </tr>
            <tr>
                <td>4</td>
                <td>0100</td>
            </tr>
            <tr>
                <td>5</td>
                <td>0101</td>
            </tr>
            <tr>
                <td>6</td>
                <td>0110</td>
            </tr>
            <tr>
                <td>7</td>
                <td>0111</td>
            </tr>
            <tr>
                <td>8</td>
                <td>1000</td>
            </tr>
            <tr>
                <td>9</td>
                <td>1001</td>
            </tr>
        </table>
    </div>
</div>
<div class="infoText">
    Using the <i>Cleare Decimal Mode</i> (CLD) and <i>Set Decimal Mode</i> (SED) the mode of the ALU can be changed. This also 
    clears/sets the decimal mode flag (D) in the status register.
    At startup of the 6502 processor the mode is undifined and must be set first.
</div>
`