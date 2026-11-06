
const display = document.getElementById("display");

function appendNumber(number) {
    if (display.value === "0" || display.value === "Error") {
        display.value = number;
    } else {
        display.value += number;
    }
}

function appendOperator(operator) {
    const last = display.value.slice(-1);

    if ("+-*/".includes(last)) {
        display.value = display.value.slice(0, -1);
    }

    display.value += operator;
}

function clearDisplay() {
    display.value = "0";
}

function deleteNumber() {
    display.value = display.value.slice(0, -1) || "0";
}

function calculate() {
    try {
        const expression = display.value;

        if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
            throw new Error("Input tidak valid");
        }

        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Hasil tidak valid");
        }

        display.value = String(
            Number(result.toPrecision(12))
        );

    } catch {
        display.value = "Error";
    }
}
