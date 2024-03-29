
const AND_TEXT =
`
<div class="infoTitle">AND Instruction</div>
<div class="infoText">
    The AND instruction is primarily used to filter, maks, or strip out certain bits in 
    the accumulator. That way, some form of processing can be done on the remaining bits.
    If both bits in a position are 1, the resulting bit will be one; otherwise it will be 0. The result is stored in the accumulator.
    The following table summarizes the AND condition:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr>
                <th>M</th>
                <th>A</th>
                <th>Result<br>in A</th>
                <th> </th>
            </tr>
            <tr>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td> </td>
            </tr>
            <tr>
                <td>0</td>
                <td>1</td>
                <td>0</td>
                <td> </td>
            </tr>
            <tr>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td> </td>
            </tr>
            <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td> </td>
            </tr>
        </table>
    </div>
    Another way to look at it:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr>
                <td>  <r>1010</r><g>1</g><r>0</r><g>1</g><r>0</r></td>
                <td>Memory</td>
            </tr>
            <tr>
                <td style="border-bottom: solid 1px;">⋀ <r>0000</r><g>1</g><r>1</r><g>1</g><r>1</r></td>
                <td>Accumulator</td>
            </tr>
            <tr>
                <td>  <r>0000</r><g>1</g><r>0</r><g>1</g><r>0</r></td>
                <td>result stored in accumulator</td>
            </tr>
        </table>
    </div>
    </div>
</div>
<!-- 
<div class="infoText">
    The AND instruction is best suited for testing selected accumulator bits for a 1 value, or to mask out bits that are of no interest in a
    particular program application. For example, in the American Standard Code for Information Interchange (ASCII), the characters 0 to 9 are
    assigned the values of:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr>
                <th> </th>
                <th colspan="2" style="border-bottom: solid 1px">Ascii</th>
                <th> </th></tr>
                <th> </th>
            <tr>
                <th>Character</th>
                <th>Hex</th>
                <th>Binary</th>
                <th>BCD</th>
                <th> </th>
            </tr>
            <tr>
                <td>0</td>
                <td>30</td>
                <td>00110000</td>
                <td>0000</td>
                <td> </td>
            </tr>
            <tr>
                <td>1</td>
                <td>31</td>
                <td>00110001</td>
                <td>0001</td>
                <td> </td>
            </tr>
            <tr>
                <td>2</td>
                <td>32</td>
                <td>00110010</td>
                <td>0010</td>
                <td> </td>
            </tr>
            <tr>
                <td>3</td>
                <td>33</td>
                <td>00110011</td>
                <td>0011</td>
                <td> </td>
            </tr>
            <tr>
                <td>4</td>
                <td>34</td>
                <td>00110100</td>
                <td>0100</td>
                <td> </td>
            </tr>
            <tr>
                <td>5</td>
                <td>35</td>
                <td>00110101</td>
                <td>0101</td>
                <td> </td>
            </tr>
            <tr>
                <td>6</td>
                <td>36</td>
                <td>00110110</td>
                <td>0110</td>
                <td> </td>
            </tr>
            <tr>
                <td>7</td>
                <td>37</td>
                <td>00110111</td>
                <td>0111</td>
                <td> </td>
            </tr>
            <tr>
                <td>8</td>
                <td>38</td>
                <td>00111000</td>
                <td>1000</td>
                <td> </td>
            </tr>
            <tr>
                <td>9</td>
                <td>39</td>
                <td>00111001</td>
                <td>1001</td>
                <td> </td>
            </tr>
        </table>
    </div>
</div>
<div class="infoText">
    If the four most-significant bits are masked out of the ASCII values so that they are reset to zero, the binary-coded decimal 
    (BCD) value for each character will remain in the four least-significant bits. Examin the number 5.
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr><td>0011<i>0101</i></td><td>ASCII</td></tr>
            <tr><td>0000<i>0101</i></td><td>BCD</td></tr>
        </table>
    </div>
    How can the four most-significant bits be masked to logic 0? It can be easily done with a logical AND. Any bit that is ANDed with 0 will be 
    cleared to 0 and any bit that is ANDed with 1 will retain its original value. Therefore, ASCII 5 in the accumulator can be easily converted 
    to BCD by ANDing its four most-significant bits with 0s and its four least-significant bits with 1s. This can be done with the instruction 
    AND #$0F. What will be contained in the accumulator when the instructions 
    <div class="infoCode">
        <div>LDA #$38</div>
        <div>AND #$0F</div>
    </div>
    are executed? The accumulator will contain 00001000 (BCD 8).
</div> -->
`