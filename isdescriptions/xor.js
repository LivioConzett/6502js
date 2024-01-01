
const XOR_TEXT =
`
<div class="infoTitle">Exclusive-OR Instruction</div>
<div class="infoText">
    If either bit in a position are a 1, the resulting bit will be one; otherwise it will be a 0. However, if both bits 
    in a position are a 1, the resulting bit will be a 0.
    The following table summarizes the EOR condition:
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
                <td>1</td>
                <td> </td>
            </tr>
            <tr>
                <td>1</td>
                <td>0</td>
                <td>1</td>
                <td> </td>
            </tr>
            <tr>
                <td>1</td>
                <td>1</td>
                <td>0</td>
                <td> </td>
            </tr>
        </table>
    </div>
    Another way to look at it:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr>
                <td>  <g>1</g><r>0</r><g>1</g><r>0</r><r>1</r><g>0</g><r>1</r><g>0</g></td>
                <td>Memory</td>
            </tr>
            <tr>
                <td style="border-bottom: solid 1px;">⊻ <g>0</g><r>0</r><g>0</g><r>0</r><r>1</r><g>1</g><r>1</r><g>1</g></td>
                <td>Accumulator</td>
            </tr>
            <tr>
                <td>  <g>1</g><r>0</r><g>1</g><r>0</r><r>0</r><g>1</g><r>0</r><g>1</g></td>
                <td>result stored in accumulator</td>
            </tr>
        </table>
    </div>
</div>
`