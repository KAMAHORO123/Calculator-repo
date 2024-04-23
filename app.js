document.addEventListener('DOMContentLoaded', function () {
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn');
    let clear = document.querySelector('.btn-clear');
    let equal = document.querySelector('.btn-equal');

    // if (!screen || !buttons || !clear || !equal) {
    //     console.error("One or more required elements not found.");
    //     return;
    // }

    buttons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            let value = e.target.dataset.num;
            screen.value += value;
        });
    });

    equal.addEventListener('click', function (e) {
        if (screen.value === '') {
            screen.value = "";
        } else {
            try {
                let answer = evaluateExpression(screen.value);
                screen.value = answer;
            } catch (error) {
                console.error("Evaluation error:", error);
                screen.value = "Error";
            }
        }
    });

    clear.addEventListener('click', function (e) {
        screen.value = "";
    });


    function evaluateExpression(expression) {

        let match = expression.match(/(\d+\.?\d*)([\+\-\*\/])(\d+\.?\d*)/);
        if (!match) throw new Error("Invalid expression");

        let operand1 = parseFloat(match[1]);
        let operator = match[2];
        let operand2 = parseFloat(match[3]);

        switch (operator) {
            case '+':
                return operand1 + operand2;
            case '-':
                return operand1 - operand2;
            case '*':
                return operand1 * operand2;
            case '/':
                if (operand2 === 0) throw new Error("Division by zero");
                return operand1 / operand2;
            default:
                throw new Error("Invalid operator");
        }
    }
});
