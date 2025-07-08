

function one(){//path.scope OneScope a=1
    var a = 1;
    function two(){//path.scope TwoScope b = 2
        var b =2;
        console.log(a,b);
    }
}
//scope.generatedUid

let oneScope = {
    bindings:['a','_a'],
    generatedUid(varName){
        while (oneScope.bindings.includes(varName)){
            varName = '_' + varName;
        }
        return varName;
    }
}
console.log(oneScope.generatedUid('a'));