
const SHIFTANDROTATE_TEXT =
`
<div class="infoTitle">Shift and Rotate</div>
<div class="infoText">
    The 6502 has four instructions that either shift or rotate a memory location (or Accumulator) by one bit. Two instructions go left,
    two go right. Each one of them use the Carry flag as a sort of 9<sup>th</sup> bit to push or pull from. These instructions are:
    <div class="infoTableHolder">
        <table class="infoTable">
            <tr><th>Instruction</th><th>Description</th></tr>
            <tr>
                <td>ASL</td>
                <td><u>A</u>ccumulator <u>S</u>hift <u>L</u>eft</td>
            </tr>
            <tr>
                <td>LSR</td>
                <td><u>L</u>ogical <u>S</u>hift <u>R</u>ight</td>
            </tr>
            <tr>
                <td>ROL</td>
                <td><u>Ro</u>tate <u>L</u>eft</td>
            </tr>
            <tr>
                <td>ROR</td>
                <td><u>Ro</u>tate <u>R</u>ight</td>
            </tr>
        </table>
    </div>
</div>
<div class="infoTitle1">ASL</div>
<div class="infoShiftDrawingHolderBottom">
    <div class="infoShiftDrawingCarry">C</div>
    <div class="infoShiftDrawingArrowLeft"></div>
    <div class="infoShiftDrawingArrowLine"></div>
    <div class="infoShiftDrawingByte"><div>7</div><div>0</div></div>
    <div class="infoShiftDrawingArrowLeft"></div>
    <div class="infoShiftDrawingArrowLine"></div>
    <div class="infoShiftDrawingZero">0</div>
</div>
<div class="infoTitle1">LSR</div>
<div class="infoShiftDrawingHolderBottom">
    <div class="infoShiftDrawingZero">0</div>
    <div class="infoShiftDrawingArrowLine"></div>
    <div class="infoShiftDrawingArrowRight"></div>
    <div class="infoShiftDrawingByte"><div>7</div><div>0</div></div>
    <div class="infoShiftDrawingArrowLine"></div>
    <div class="infoShiftDrawingArrowRight"></div>
    <div class="infoShiftDrawingCarry">C</div>
</div>
<div class="infoTitle1">ROL</div>
<div class="infoShiftDrawingTwoHolder">
    <div class="infoShiftDrawingHolderTopRight">
        <div class="infoShiftDrawingLineHolderLeft">
            <div class="infoShiftDrawingLineUpHolder">
                <div class="infoShiftDrawingLineSpacer"></div>
                <div class="infoShiftDrawingLineUp"></div>
            </div>
        </div>
        <div class="infoShiftDrawingUpperLine"></div>
        <div class="infoShiftDrawingLineHolderRight">
            <div class="infoShiftDrawingLineUpHolder">
                <div class="infoShiftDrawingLineSpacer"></div>
                <div class="infoShiftDrawingLineUp"></div>
            </div>
        </div>
    </div>
    <div class="infoShiftDrawingHolderBottom">
        <div class="infoShiftDrawingCarry">C</div>
        <div class="infoShiftDrawingArrowLeft"></div>
        <div class="infoShiftDrawingArrowLine"></div>
        <div class="infoShiftDrawingByte"><div>7</div><div>0</div></div>
        <div class="infoShiftDrawingArrowLeft"></div>
        <div class="infoShiftDrawingArrowLine"></div>
        <div class="infoShiftDrawingLineHolderRight">
            <div class="infoShiftDrawingLineUpHolder">
                <div class="infoShiftDrawingLineUp"></div>
                <div class="infoShiftDrawingLineSpacer"></div>
            </div>
        </div>
    </div>
</div>
<div class="infoTitle1">ROR</div>
<div class="infoShiftDrawingTwoHolder">
    <div class="infoShiftDrawingHolderTopLeft">
        <div class="infoShiftDrawingLineHolderLeft">
            <div class="infoShiftDrawingLineUpHolder">
                <div class="infoShiftDrawingLineSpacer"></div>
                <div class="infoShiftDrawingLineUp"></div>
            </div>
        </div>
        <div class="infoShiftDrawingUpperLine"></div>
        <div class="infoShiftDrawingLineHolderRight">
            <div class="infoShiftDrawingLineUpHolder">
                <div class="infoShiftDrawingLineSpacer"></div>
                <div class="infoShiftDrawingLineUp"></div>
            </div>
        </div>
    </div>
    <div class="infoShiftDrawingHolderBottom">
        <div class="infoShiftDrawingLineHolderLeft">
            <div class="infoShiftDrawingLineSpacer"></div>
            <div class="infoShiftDrawingLineUpHolder">
                <div class="infoShiftDrawingLineUp"></div>
                <div class="infoShiftDrawingLineSpacer"></div>
            </div>
        </div>
        <div class="infoShiftDrawingArrowLine"></div>
        <div class="infoShiftDrawingArrowRight"></div>
        <div class="infoShiftDrawingByte"><div>7</div><div>0</div></div>
        <div class="infoShiftDrawingArrowLine"></div>
        <div class="infoShiftDrawingArrowRight"></div>
        <div class="infoShiftDrawingCarry">C</div>
    </div>
</div>
<div style="height: 30px;"></div>
<div class="infoText">
    These instructions affect the Carry flag, depending on what they shift into it, or if the pull from it. Next to the Carry flag following flags
    are also affected:
    <ul class="infoList">
        <li>
            The Negative flag (N) takes the status of Bit 7. LSR will always result in N being 0.
        </li>
        <li>
            The Zero flag (Z) is set if the result of the shift or rotate is zero; otherwise it it cleared.
        </li>
    </ul>
</div>
`