// Курс: Разработка web приложений на JavaScript
// Тема: Итераторы и генераторы

// Домашнее задание

// Задача 1
// ========
// Создайте функцию infinite(list, tries), которая будет проходиться по элементам списка list
// заданное количество раз (tries) циклически. Один раз - один элемент списка. 
// После вывода последнего значения последовательности процедура начнется с самого начала.
// Например, если в списке 2 элемента, а функция получила значение 3, то сначала выведется первый объект, 
// потом последний, а потом опять первый. 
// Результат работы функции представьте в виде строки, состоящей из tries количества символов.

function infinite(list, iterations) {
    let result = '';
    let saved = [];
    let index = 0;

    for (let i = 0; i < iterations; i++) {
        if (list.length > 0) {
            const element = list[index % list.length];
            result += String(element);
            saved.push(element);
            index++;
        }
    }

    return result;
}

// Тесты
console.log('infinite:', infinite([2, 5, 8], 7));
console.log('infinite:', infinite([], 1000));
console.log('infinite:', infinite([7], 4));
//-------------------------------------------------------------------------------------------------------------------------------
// Задача 2
// ========
// Числа Фибоначчи представляют последовательность, получаемую в результате сложения двух предыдущих элементов. 
// Начинается коллекция с чисел 1 и 1. Она достаточно быстро растет, поэтому вычисление больших значений занимает немало времени. 
// Создайте генератор fib(n), который каждый раз возвращает следующее число Фибоначчи.

function* fib(n) {
    let a = 1;
    let b = 1;

    yield a;
    yield b;

    for (let i = 2; i < n; i++) {
        const next = a + b;
        yield next;
        a = b;
        b = next;
    }
}

// Пример использования генератора fib
const generator = fib(10); // Генератор для первых 10 чисел Фибоначчи

for (const num of generator)
    console.log('fibonnaci:', num);
//-------------------------------------------------------------------------------------------------------------------------------
// Задача 3
// ========
// Реализуйте итератор колоды карт (52 штуки) cardDeck. Каждая карта представлена в виде строки типа 2 Пик. 
// При вызове функции next() будет представлена следующая карта. По окончании перебора всех элементов выбросить исключение StopIteration.

class CardDeck {
    constructor () {
        this.cards = this.generateCards();
        this.index = 0;
    }

    generateCards () {
        const suits = ["Пик", "Черв", "Бубен", "Треф"];
        const ranks = [
            "2"
            , "3"
            , "4"
            , "5"
            , "6"
            , "7"
            , "8"
            , "9"
            , "10"
            , "Валет"
            , "Дама"
            , "Король"
            , "Туз"
        ];
        const cards = [];

        for (const suit of suits) {
            for (const rank of ranks) {
                const card = rank + " " + suit;
                cards.push(card);
            }
        }

        return cards;
    }

    next () {
        if (this.index >= this.cards.length) 
            throw new Error("StopIteration");
        

        const card = this.cards[this.index];
        this.index++;

        return card;
    }
}

// Пример использования итератора cardDeck
const deck = new CardDeck();

try {
    while (true) {
        const card = deck.next();
        console.log(card);
    }
} catch (error) {
    if (error.message === "StopIteration") console.log("Итерация по колоде карт завершена.");
    else console.log("Произошла ошибка:", error.message);
}