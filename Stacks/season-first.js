
// ------------------ stack using class --------------------
class Stack {
    constructor() {
        this.bookstore = []
    }

    push(item) {
        this.bookstore.push(item)
    }

    pop() {
        let popItem = this.bookstore.pop()
        return popItem
    }

    peek() {
        if (!this.isEmpty()) {
            let peakItem = this.bookstore[this.bookstore.length - 1]
            return peekItem
        } else {
            throw new Error('stack is empty.')
        }
    }

    isEmpty() {
        return this.bookstore.length === 0
    }
}

// let stack = new Stack()
// stack.push(10)
// stack.push(30)
// stack.push(15)
// console.log(stack.pop())
// console.log(stack.pop())
// console.log(stack.pop())
// console.log(stack.peek())



// ------------------ stack using linked list --------------------





// ✅ 🔴 ⚪️ 👋 ---------------  stack questions ----------------

// https://www.geeksforgeeks.org/implement-two-stacks-in-an-array/
class Twostack {
    constructor(n) {
        this.size = n
        this.top1 = -1
        this.top2 = this.size
        this.arr = new Array(n).fill(0)
    }

    // for first stack
    push1(item) {
        if (this.top1 < this.top2 - 1) {
            this.top1++
            this.arr[this.top1] = item
        } else {
            throw new Error('stack1 overflow')
        }
    }
    pop1() {
        if (this.top1 >= 0) {
            let x = this.arr[this.top1];
            this.top1--;
            return x;
        } else {
            throw new Error('stack1 underflow')
        }
    }

    // for second stack
    push2(item) {
        if (this.top1 < this.top2 - 1) {
            this.top2--
            this.arr[this.top2] = item
        } else {
            throw new Error('stack2 overflow')
        }
    }
    pop2() {
        if (this.top2 < this.size) {
            let x = this.arr[this.top2];
            this.top2++;
            return x;
        } else {
            throw new Error('stack2 underflow')
        }
    }
}

// let stk = new Twostack(6)
// stk.push1(10)
// stk.push1(20)
// stk.push1(30)
// stk.push2(50)
// stk.push2(150)
// stk.push2(100)
// console.log(stk.pop1())
// console.log(stk.pop1())
// console.log(stk.pop2())





// ✅ 🔴 ⚪️ ------------- reverse string using stack ---------------
// function reverse(string) {
//     let stack = []

//     for (let ch of string) {
//         stack.push(ch);
//     }

//     for (let index = 0; index < string.length; index++) {
//         console.log(stack.pop())
//     }
// }
// reverse("maitra")





// ✅ 🔴 ⚪️ 🔥 --------------- delete middle elment from stack ------------------
// 1. using recursion - will think next time....... some doubts here
function deleteMiddle(stack) {
    if (stack.length === 0) {
        return stack;
    }

    const middleIndex = Math.floor(stack.length / 2);

    if (stack.length === 1) {
        stack.pop();
        return stack;
    }

    const removedElement = stack.pop();

    if (stack.length !== middleIndex) {
        stack = deleteMiddle(stack);
    }

    stack.push(removedElement);
    return stack;
}
// const stack = [1, 2, 3, 4, 5];
// console.log('Original stack:', stack);
// const modifiedStack = deleteMiddle(stack);
// console.log('Modified stack:', modifiedStack);



// 🔥 💅 2nd. using 2 stack (Important Concept)...
const deleteMiddle2 = (nums) => {
    let mainStack = []
    let stack = []

    // adding all to mainStack
    for (let x of nums) {
        mainStack.push(x)
    }

    // pop element form mainStack and add that element to stack for future
    for (let i = 0; i <= mainStack.length / 2 - 1; i++) {
        let popEle = mainStack.pop()
        stack.push(popEle)
    }
    // while(mainStack.length/2) {
    //     let popEle = mainStack.pop()
    //     stack.push(popEle)
    // }

    /// remove middle of mainStack
    mainStack.pop()

    // console.log({mainStack, stack})
    // add remaining element from stack to mainStack as middle element is removed
    // for (let i = 0; i <= stack.length; i++) {
    //     let popEle = stack.pop()
    //     mainStack.push(popEle)
    // }

    while (stack.length) {
        let popEle = stack.pop()
        mainStack.push(popEle)
    }

    return mainStack
}

// let arr = [1,2,3,4,5,6]
// console.log(deleteMiddle2(arr))





// ✅ 🔴 ⚪️ 🔥 ------------------- valid paranthesis ---------------------
function validParanthesis(expression) {
    let stack = []
    let ans = true

    for (exp of expression) {
        let peek = stack[stack.length - 1]
        if (exp === '(' || exp === '{' || exp === '[') {
            stack.push(exp)
        }

        if (exp === ')') {
            if (peek === '(') {
                stack.pop()
            } else {
                ans = false
                return ans
            }
        } else if (exp === '}') {
            if (peek === '{') {
                stack.pop()
            } else {
                ans = false
                return ans
            }

        } else if (exp === ']') {
            if (peek === '[') {
                stack.pop()
            } else {
                ans = false
                return ans
            }
        }
    }

    if (stack.length) {
        ans = false
        return ans
    }
    return ans
}

// let paranthesis = '[{}]()';
// console.log(validParanthesis(paranthesis))





// ✅ 🔴 ⚪️ 🔥 ------------ insert element at bottom of stack ---------------
//1. recursive approch .. will do later

//2. 👋 using 2 stack
function pushAtBottom(nums, target) {
    let mainStack = []
    let stack = []

    // store all value to mainStack
    for (let x of nums) {
        mainStack.push(x)
    }

    // remove all value from mainStack to stack
    while (mainStack.length) {
        let popEle = mainStack.pop()
        stack.push(popEle)
    }

    // add element to mainStack (which is empty right now)
    mainStack.push(target)

    // add values from stack to mainStack
    while (stack.length) {
        let popEle = stack.pop()
        mainStack.push(popEle)
    }

    return mainStack
}

// let nums = [2, 5, 10, 20]
// console.log(pushAtBottom(nums, 100))




// ✅ 🔴 ⚪️ 🔥 ---------------- sorted stack -------------------
// 👇 using temprary stack
function sortStack(stack) {
    // Create two additional stacks: tempStack and sortedStack.
    const tempStack = [];
    const sortedStack = [];

    // While the original stack is not empty, perform the following steps:
    while (stack.length > 0) {
        // Pop the top element from the original stack and store 
        // it in a variable called currentElement.
        const currentElement = stack.pop();

        // While sortedStack is not empty and the top element of sortedStack > currentElement,
        // pop elements from sortedStack and push them into tempStack.
        while (sortedStack.length > 0 && sortedStack[sortedStack.length - 1] > currentElement) {
            tempStack.push(sortedStack.pop());
        }

        // Push currentElement onto sortedStack.
        sortedStack.push(currentElement);

        // While tempStack is not empty, pop elements from tempStack and push them back into sortedStack.
        while (tempStack.length > 0) {
            sortedStack.push(tempStack.pop());
        }
    }
    // Once the original stack is empty, the sortedStack will contain the sorted elements.

    // Return the sortedStack.
    return sortedStack;
}

// const stack = [5, 2, 9, 1, 3];
// console.log('Original stack:', stack);
// const sortedStack = sortStack(stack);
// console.log('Sorted stack:', sortedStack);

// using recursion... will do later
