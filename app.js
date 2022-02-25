const numberButton = document.querySelectorAll(".number");
const operationButton = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const clearButton = document.querySelector(".clear");
const firstScreenTextElement = document.getElementById("screen1");
const secondScreenTextElement = document.getElementById("screen2");



class Calculator{
    
    constructor(firstScreenTextElement,secondScreenTextElement){
        this.firstScreenTextElement=firstScreenTextElement;
        this.secondScreenTextElement=secondScreenTextElement;
        this.clear();
    }

    clear(){

        this.firstScreen='';
        this.secondScreen='';
        this.operation=undefined;

    }
    delete(){
        this.secondScreen=this.secondScreen.toString().slice(0,-1)

    }
    equal(){

    }
    appendNumber(number){

        if(number==='.' && this.secondScreen.includes('.'))return
        this.secondScreen = this.secondScreen.toString() + number.toString()
        
    }
    chooseOperation(operation){

        if(this.secondScreen==='') return
        if(this.firstScreen!==''){
            this.comput()
        }
        this.operation=operation
        this.firstScreen=this.secondScreen
        this.secondScreen=''
    }
    comput(){
        let result
        const prev =parseFloat(this.firstScreen)
        const current=parseFloat(this.secondScreen)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+' :
                result = prev+current
            break
            case '-' :
                result = prev-current
            break
            case '*' :
                result = prev*current
            break
            case '÷' :
                result = prev/current
            break
            default : return
        }
        this.secondScreen=result
        this.operation=undefined
        this.firstScreen=''

    }
    updatDisplay(){

        this.secondScreenTextElement.innerText=this.secondScreen
        if (this.operation!=null) {
            this.firstScreenTextElement.innerText=
            `${this.firstScreen} ${this.operation}`
        }
    }
}

const calculator = new Calculator(firstScreenTextElement,secondScreenTextElement)

numberButton.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updatDisplay()
    })
})

operationButton.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updatDisplay()
    })
})

equalsButton.addEventListener('click',button=>{
    calculator.comput()
    calculator.updatDisplay()
})

clearButton.addEventListener('click',button=>{
    calculator.clear()
    calculator.updatDisplay()
})

deleteButton.addEventListener('click',button=>{
    calculator.delete()
    calculator.updatDisplay()
})