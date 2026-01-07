const API_BASE_URL = '/api/counter';

const counterValueEl = document.getElementById('counterValue');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');

function updateCounterValue(value) {
    counterValueEl.textContent = value;
}

function setButtonsDisabled(disabled) {
    incrementBtn.disabled = disabled;
    decrementBtn.disabled = disabled;
}

async function fetchCounter() {
    try {
        setButtonsDisabled(true);

        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        updateCounterValue(data.value);
    } catch (error) {
        console.error('카운터 값을 가져오는데 실패했습니다:', error);
        updateCounterValue('?');
    } finally {
        setButtonsDisabled(false);
    }
}

async function incrementCounter() {
    try {
        setButtonsDisabled(true);

        const response = await fetch(`${API_BASE_URL}/increment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        updateCounterValue(data.value);
    } catch (error) {
        console.error('카운터 증가 실패:', error);
    } finally {
        setButtonsDisabled(false);
    }
}

async function decrementCounter() {
    try {
        setButtonsDisabled(true);

        const response = await fetch(`${API_BASE_URL}/decrement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        updateCounterValue(data.value);
    } catch (error) {
        console.error('카운터 감소 실패:', error);
    } finally {
        setButtonsDisabled(false);
    }
}

incrementBtn.addEventListener('click', incrementCounter);
decrementBtn.addEventListener('click', decrementCounter);

document.addEventListener('DOMContentLoaded', fetchCounter);
