import sah from '../index'

describe('Assembly compilation:', () => {
    it('should highlight: regular opCodes', () => {
        const code = 'SET @a #0000000000000100\nSET @b $a\nCLR @b\nINC @b\nDEC @a\nADD @a $b\nSUB @a $b\nMUL @a $b\nDIV @a $b\nBOR @a $b\nAND @a $b\nXOR @a $b\nSET @a $b\nNOT @a\nSET @a $($b)\nSET @a $c\nADD @a $b\nSET @a $($b + $c)\nPSH $b\nJSR :__fn_teste\nPOP @a\nSET @($a) $b\nSET @($a + $b) $c\nMOD @a $b\nSHL @a $b\nSHR @a $b\nSLP $a\nJMP :__fn_main\n\n__fn_teste:\nPOP @teste_d\nSET @r0 $teste_d\nINC @r0\nPSH $r0\nRET\n\n__fn_main:\nPCS\nINC @a\nFIN'
        const highlighted = "<span class='asmInstruction'>SET </span><span class='asmVariable'>@a </span><span class='asmNumber'>#0000000000000100</span><br><span class='asmInstruction'>SET </span><span class='asmVariable'>@b </span><span class='asmVariable'>$a</span><br><span class='asmInstruction'>CLR </span><span class='asmVariable'>@b</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmInstruction'>DEC </span><span class='asmVariable'>@a</span><br><span class='asmInstruction'>ADD </span><span class='asmVariable'>@a </span><span class='asmVariable'>$b</span><br><span class='asmInstruction'>SUB </span><span class='asmVariable'>@a </span><span class='asmVariable'>$b</span><br><span class='asmInstruction'>MUL </span><span class='asmVariable'>@a </span><span class='asmVariable'>$b</span><br><span class='asmInstruction'>DIV </span><span class='asmVariable'>@a </span><span class='asmVariable'>$b</span><br><span class='asmInstruction'>BOR </span><span class='asmVariable'>@a </span><span class='asmVariable'>$b</span><br><span class='asmInstruction'>AND </span><span class='asmVariable'>@a </span><span class='asmVariable'>$b</span><br><span class='asmInstruction'>XOR </span><span class='asmVariable'>@a </span><span class='asmVariable'>$b</span><br><span class='asmInstruction'>SET </span><span class='asmVariable'>@a </span><span class='asmVariable'>$b</span><br><span class='asmInstruction'>NOT </span><span class='asmVariable'>@a</span><br><span class='asmInstruction'>SET </span><span class='asmVariable'>@a</span> $(<span class='asmVariable'>$b</span>)<br><span class='asmInstruction'>SET </span><span class='asmVariable'>@a </span><span class='asmVariable'>$c</span><br><span class='asmInstruction'>ADD </span><span class='asmVariable'>@a </span><span class='asmVariable'>$b</span><br><span class='asmInstruction'>SET </span><span class='asmVariable'>@a </span>$(<span class='asmVariable'>$b</span> + <span class='asmVariable'>$c</span>)<br><span class='asmInstruction'>PSH </span><span class='asmVariable'>$b</span><br><span class='asmInstruction'>JSR </span><span class='asmLabel'>:__fn_teste</span><br><span class='asmInstruction'>POP </span><span class='asmVariable'>@a</span><br><span class='asmInstruction'>SET </span>@(<span class='asmVariable'>$a</span>) <span class='asmVariable'>$b</span><br><span class='asmInstruction'>SET </span>@(<span class='asmVariable'>$a</span> + <span class='asmVariable'>$b</span>) <span class='asmVariable'>$c</span><br><span class='asmInstruction'>MOD </span><span class='asmVariable'>@a </span><span class='asmVariable'>$b</span><br><span class='asmInstruction'>SHL </span><span class='asmVariable'>@a </span><span class='asmVariable'>$b</span><br><span class='asmInstruction'>SHR </span><span class='asmVariable'>@a </span><span class='asmVariable'>$b</span><br><span class='asmInstruction'>SLP </span><span class='asmVariable'>$a</span><br><span class='asmInstruction'>JMP </span><span class='asmLabel'>:__fn_main</span><br><br><span class='asmLabel'>__fn_teste:</span><br><span class='asmInstruction'>POP </span><span class='asmVariable'>@teste_d</span><br><span class='asmInstruction'>SET </span><span class='asmVariable'>@r0 </span><span class='asmVariable'>$teste_d</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@r0</span><br><span class='asmInstruction'>PSH </span><span class='asmVariable'>$r0</span><br><span class='asmInstruction'>RET</span><br><br><span class='asmLabel'>__fn_main:</span><br><span class='asmInstruction'>PCS</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@a</span><br><span class='asmInstruction'>FIN</span><br>"
        const result = sah.colorText(code)
        expect(result).toBe(highlighted)
    })
    it('should highlight: opCodes for api functions', () => {
        const code = 'FUN clear_A_B\nFUN set_A1 $a\nFUN set_A1_A2 $a $b\nFUN @a check_A_equals_B\nFUN @a add_Minutes_to_Timestamp $b $c\n'
        const highlighted = "<span class='asmInstruction'>FUN clear_A_B</span><br><span class='asmInstruction'>FUN set_A1 </span><span class='asmVariable'>$a</span><br><span class='asmInstruction'>FUN set_A1_A2 </span><span class='asmVariable'>$a </span><span class='asmVariable'>$b</span><br><span class='asmInstruction'>FUN </span><span class='asmVariable'>@a </span><span class='asmInstruction'>check_A_equals_B</span><br><span class='asmInstruction'>FUN </span><span class='asmVariable'>@a </span><span class='asmInstruction'>add_Minutes_to_Timestamp </span><span class='asmVariable'>$b </span><span class='asmVariable'>$c</span><br><br>"
        const result = sah.colorText(code)
        expect(result).toBe(highlighted)
    })
    it('should highlight: rare opCodes ', () => {
        const code = 'FIZ $a\nSTZ $a\nERR :__error\nINC @a\nNOP\nNOP\n__error:\nDEC @a'
        const highlighted = "<span class='asmInstruction'>FIZ </span><span class='asmVariable'>$a</span><br><span class='asmInstruction'>STZ </span><span class='asmVariable'>$a</span><br><span class='asmInstruction'>ERR </span><span class='asmLabel'>:__error</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@a</span><br><span class='asmInstruction'>NOP</span><br><span class='asmInstruction'>NOP</span><br><span class='asmLabel'>__error:</span><br><span class='asmInstruction'>DEC </span><span class='asmVariable'>@a</span><br>"
        const result = sah.colorText(code)
        expect(result).toBe(highlighted)
    })
    it('should highlight: all branches opCodes with positive offset (no overflow)', () => {
        const code = 'BZR $a :__if1_endif\nINC @b\n__if1_endif:\nBNZ $a :__if2_endif\nINC @b\n__if2_endif:\nBLE $a $b :__if3_endif\nINC @b\n__if3_endif:\nBGE $a $b :__if4_endif\nINC @b\n__if4_endif:\nBLT $a $b :__if5_endif\nINC @b\n__if5_endif:\nBGT $a $b :__if6_endif\nINC @b\n__if6_endif:\nBNE $a $b :__if7_endif\nINC @b\n__if7_endif:\nBEQ $a $b :__if8_endif\nINC @b\n__if8_endif:\nFIN\n'
        const highlighted = "<span class='asmInstruction'>BZR </span><span class='asmVariable'>$a </span><span class='asmLabel'>:__if1_endif</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmLabel'>__if1_endif:</span><br><span class='asmInstruction'>BNZ </span><span class='asmVariable'>$a </span><span class='asmLabel'>:__if2_endif</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmLabel'>__if2_endif:</span><br><span class='asmInstruction'>BLE </span><span class='asmVariable'>$a </span><span class='asmVariable'>$b </span><span class='asmLabel'>:__if3_endif</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmLabel'>__if3_endif:</span><br><span class='asmInstruction'>BGE </span><span class='asmVariable'>$a </span><span class='asmVariable'>$b </span><span class='asmLabel'>:__if4_endif</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmLabel'>__if4_endif:</span><br><span class='asmInstruction'>BLT </span><span class='asmVariable'>$a </span><span class='asmVariable'>$b </span><span class='asmLabel'>:__if5_endif</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmLabel'>__if5_endif:</span><br><span class='asmInstruction'>BGT </span><span class='asmVariable'>$a </span><span class='asmVariable'>$b </span><span class='asmLabel'>:__if6_endif</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmLabel'>__if6_endif:</span><br><span class='asmInstruction'>BNE </span><span class='asmVariable'>$a </span><span class='asmVariable'>$b </span><span class='asmLabel'>:__if7_endif</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmLabel'>__if7_endif:</span><br><span class='asmInstruction'>BEQ </span><span class='asmVariable'>$a </span><span class='asmVariable'>$b </span><span class='asmLabel'>:__if8_endif</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmLabel'>__if8_endif:</span><br><span class='asmInstruction'>FIN</span><br><br>"
        const result = sah.colorText(code)
        expect(result).toBe(highlighted)
    })
    it('should highlight: all branches opCodes with positive offset (no overflow)', () => {
        const code = 'BZR $a :__if1_endif\nINC @b\n__if1_endif:\nBNZ $a :__if2_endif\nINC @b\n__if2_endif:\nBLE $a $b :__if3_endif\nINC @b\n__if3_endif:\nBGE $a $b :__if4_endif\nINC @b\n__if4_endif:\nBLT $a $b :__if5_endif\nINC @b\n__if5_endif:\nBGT $a $b :__if6_endif\nINC @b\n__if6_endif:\nBNE $a $b :__if7_endif\nINC @b\n__if7_endif:\nBEQ $a $b :__if8_endif\nINC @b\n__if8_endif:\nFIN\n'
        const highlighted = "<span class='asmInstruction'>BZR </span><span class='asmVariable'>$a </span><span class='asmLabel'>:__if1_endif</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmLabel'>__if1_endif:</span><br><span class='asmInstruction'>BNZ </span><span class='asmVariable'>$a </span><span class='asmLabel'>:__if2_endif</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmLabel'>__if2_endif:</span><br><span class='asmInstruction'>BLE </span><span class='asmVariable'>$a </span><span class='asmVariable'>$b </span><span class='asmLabel'>:__if3_endif</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmLabel'>__if3_endif:</span><br><span class='asmInstruction'>BGE </span><span class='asmVariable'>$a </span><span class='asmVariable'>$b </span><span class='asmLabel'>:__if4_endif</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmLabel'>__if4_endif:</span><br><span class='asmInstruction'>BLT </span><span class='asmVariable'>$a </span><span class='asmVariable'>$b </span><span class='asmLabel'>:__if5_endif</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmLabel'>__if5_endif:</span><br><span class='asmInstruction'>BGT </span><span class='asmVariable'>$a </span><span class='asmVariable'>$b </span><span class='asmLabel'>:__if6_endif</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmLabel'>__if6_endif:</span><br><span class='asmInstruction'>BNE </span><span class='asmVariable'>$a </span><span class='asmVariable'>$b </span><span class='asmLabel'>:__if7_endif</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmLabel'>__if7_endif:</span><br><span class='asmInstruction'>BEQ </span><span class='asmVariable'>$a </span><span class='asmVariable'>$b </span><span class='asmLabel'>:__if8_endif</span><br><span class='asmInstruction'>INC </span><span class='asmVariable'>@b</span><br><span class='asmLabel'>__if8_endif:</span><br><span class='asmInstruction'>FIN</span><br><br>"
        const result = sah.colorText(code)
        expect(result).toBe(highlighted)
    })
    it('should highlight: ^declare, ^const, ^comment, ^program and multi spaces', () => {
        const code = '^declare r0\n^const SET @c #9887766554433221\n^comment This is a comment\n   SET     @a     #0000000000000005\n   ^program something something something\n'
        const highlighted = "<span class='asmDirective'>^declare</span><span class='asmVariable'> r0</span><br><span class='asmDirective'>^const</span><span class='asmInstruction'> SET </span><span class='asmVariable'>@c </span><span class='asmNumber'>#9887766554433221</span><br><span class='asmDirective'>^comment</span><span class='asmComment'> This is a comment</span><br><span class='asmInstruction'>   SET     </span><span class='asmVariable'>@a     </span><span class='asmNumber'>#0000000000000005</span><br><span class='asmDirective'>   ^program something</span> something something<br><br>"
        const result = sah.colorText(code)
        expect(result).toBe(highlighted)
    })
    it('should highlight atv3 new codes', () => {
        const code = '^comment new opCodes SIP-37\nSLP\nPOW @base $exp\nMDV @x $y $den\n^comment new APICodes SIP-37\nFUN @ret Check_Sig_B_With_A\nFUN @ret Get_Code_Hash_Id\nFUN @ret Get_Activation_Fee\nFUN Put_Last_Block_GSig_In_A\n^comment new APICodes SIP-38\nFUN @ret Get_Map_Value_Keys_In_A\nFUN Set_Map_Value_Keys_In_A\n^comment new APICodes SIP-39\nFUN @ret Issue_Asset\nFUN Mint_Asset\nFUN Distribute_To_Asset_Holders\nFUN @ret Get_Asset_Holders_Count\n'
        const highlighted = "<span class='asmDirective'>^comment</span><span class='asmComment'> new opCodes SIP-37</span><br><span class='asmInstruction'>SLP</span><br><span class='asmInstruction'>POW </span><span class='asmVariable'>@base </span><span class='asmVariable'>$exp</span><br><span class='asmInstruction'>MDV </span><span class='asmVariable'>@x </span><span class='asmVariable'>$y </span><span class='asmVariable'>$den</span><br><span class='asmDirective'>^comment</span><span class='asmComment'> new APICodes SIP-37</span><br><span class='asmInstruction'>FUN </span><span class='asmVariable'>@ret </span><span class='asmInstruction'>Check_Sig_B_With_A</span><br><span class='asmInstruction'>FUN </span><span class='asmVariable'>@ret </span><span class='asmInstruction'>Get_Code_Hash_Id</span><br><span class='asmInstruction'>FUN </span><span class='asmVariable'>@ret </span><span class='asmInstruction'>Get_Activation_Fee</span><br><span class='asmInstruction'>FUN Put_Last_Block_GSig_In_A</span><br><span class='asmDirective'>^comment</span><span class='asmComment'> new APICodes SIP-38</span><br><span class='asmInstruction'>FUN </span><span class='asmVariable'>@ret </span><span class='asmInstruction'>Get_Map_Value_Keys_In_A</span><br><span class='asmInstruction'>FUN Set_Map_Value_Keys_In_A</span><br><span class='asmDirective'>^comment</span><span class='asmComment'> new APICodes SIP-39</span><br><span class='asmInstruction'>FUN </span><span class='asmVariable'>@ret </span><span class='asmInstruction'>Issue_Asset</span><br><span class='asmInstruction'>FUN Mint_Asset</span><br><span class='asmInstruction'>FUN Distribute_To_Asset_Holders</span><br><span class='asmInstruction'>FUN </span><span class='asmVariable'>@ret </span><span class='asmInstruction'>Get_Asset_Holders_Count</span><br><br>"
        const result = sah.colorText(code)
        expect(result).toBe(highlighted)
    })
    it('should highlight error: ^comment and multi spaces', () => {
        const code = 'SET @a #0000000000000100\nC @a\n\nFUN Xclear_A_B\nFUN Xset_A1 $a\nFUN Xset_A1_A2 $a $b\nFUN @a Xcheck_A_equals_B\nFUN @a Xadd_Minutes_to_Timestamp $b $c'
        const highlighted = "<span class='asmInstruction'>SET </span><span class='asmVariable'>@a </span><span class='asmNumber'>#0000000000000100</span><br><span class='asmError'>C @a</span><br><br><span class='asmInstruction'>FUN </span><span class='asmError'>Xclear_A_B</span><br><span class='asmInstruction'>FUN </span><span class='asmError'>Xset_A1 </span><span class='asmVariable'>$a</span><br><span class='asmInstruction'>FUN </span><span class='asmError'>Xset_A1_A2 </span><span class='asmVariable'>$a </span><span class='asmVariable'>$b</span><br><span class='asmInstruction'>FUN </span><span class='asmVariable'>@a </span><span class='asmError'>Xcheck_A_equals_B</span><br><span class='asmInstruction'>FUN </span><span class='asmVariable'>@a </span><span class='asmError'>Xadd_Minutes_to_Timestamp </span><span class='asmVariable'>$b </span><span class='asmVariable'>$c</span><br>"
        const result = sah.colorText(code)
        expect(result).toBe(highlighted)
    })
    it('should highlight error: Rule not found and Non existent 0x36 api function', () => {
        const code = 'long day here\nFUN @A 0x36APIFunction $B'
        const highlighted = "<span class='asmError'>long day here</span><br><span class='asmError'>FUN @A 0x36APIFunction $B</span><br>"
        const result = sah.colorText(code)
        expect(result).toBe(highlighted)
    })
    it('should highlight with line numbers', () => {
        const code = '^declare r0\n^declare r1\n^declare r2\n^declare a\n\nSET @r0 #0000000000000001\nSLP $r0\nFUN @a get_B1\nFIN\n'
        const highlighted = "<div class='table'><div class='div_row'><div class='div_cell_a'>1</div><div class='div_cell_b'><span class='asmDirective'>^declare</span><span class='asmVariable'> r0</span></div></div><div class='div_row'><div class='div_cell_a'>2</div><div class='div_cell_b'><span class='asmDirective'>^declare</span><span class='asmVariable'> r1</span></div></div><div class='div_row'><div class='div_cell_a'>3</div><div class='div_cell_b'><span class='asmDirective'>^declare</span><span class='asmVariable'> r2</span></div></div><div class='div_row'><div class='div_cell_a'>4</div><div class='div_cell_b'><span class='asmDirective'>^declare</span><span class='asmVariable'> a</span></div></div><div class='div_row'><div class='div_cell_a'>5</div><div class='div_cell_b'></div></div><div class='div_row'><div class='div_cell_a'>6</div><div class='div_cell_b'><span class='asmInstruction'>SET </span><span class='asmVariable'>@r0 </span><span class='asmNumber'>#0000000000000001</span></div></div><div class='div_row'><div class='div_cell_a'>7</div><div class='div_cell_b'><span class='asmInstruction'>SLP </span><span class='asmVariable'>$r0</span></div></div><div class='div_row'><div class='div_cell_a'>8</div><div class='div_cell_b'><span class='asmInstruction'>FUN </span><span class='asmVariable'>@a </span><span class='asmInstruction'>get_B1</span></div></div><div class='div_row'><div class='div_cell_a'>9</div><div class='div_cell_b'><span class='asmInstruction'>FIN</span></div></div><div class='div_row'><div class='div_cell_a'>10</div><div class='div_cell_b'></div></div></div>"
        sah.Config.preAll = "<div class='table'>"
        sah.Config.postAll = '</div>'
        sah.Config.preLine = "<div class='div_row'><div class='div_cell_a'>%line%</div><div class='div_cell_b'>"
        sah.Config.postLine = '</div></div>'
        const result = sah.colorText(code)
        expect(result).toBe(highlighted)
    })
})
