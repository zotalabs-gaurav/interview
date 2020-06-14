const _ = require('lodash');

const checkTheMaxResponse = (oldResponse, newResponse) => {
    if (oldResponse.nos.length > newResponse.nos.length) {
        return oldResponse;
    }
    return newResponse;
}
const getOtherCombinationOfMaxOccurrence = (targetNo, numbers, response) => {
    for (let index = 0; index < numbers.length; index++) {
        let tempResponse = {
            nos: [numbers[index]],
            targetSub: targetNo - numbers[index],
        }
        let found = false;
        while (true) {
            if (tempResponse.targetSub / 2 >= numbers[index]) {
                tempResponse.nos.push(numbers[index]);
                tempResponse.targetSub -= numbers[index];
            } else if (tempResponse.targetSub / numbers[index] === 1) {
                tempResponse.nos.push(numbers[index]);
                tempResponse.targetSub -= numbers[index];
                found = true;
                break;
            } else if (numbers.includes(tempResponse.targetSub - numbers[index])) {
                tempResponse.nos.push(numbers[index]);
                tempResponse.targetSub -= numbers[index];
            } else {
                if (numbers.includes(tempResponse.targetSub)) {
                    tempResponse.nos.push(tempResponse.targetSub);
                    tempResponse.targetSub = 0;
                    found = true;
                }
                break;
            }
        }
        if (found) {
            response = checkTheMaxResponse(response, tempResponse)
        } else {
            for (let index = 0; index < tempResponse.nos.length; index++) {
                tempResponse.targetSub += tempResponse.nos.pop();
                if (numbers.includes(tempResponse.targetSub)) {
                    tempResponse.nos.push(tempResponse.targetSub);
                    found = true;
                    break;
                }
            }
            if (found) {
                response = checkTheMaxResponse(response, tempResponse)
            }
        }
    }
    return response;
}
const format = (arr) => {
    if (arr.nos.length) {
        return arr.nos.join('+');
    } else {
        return 'none'
    }
}
const maxOccurrence = (targetNo, noArray) => {
    let numbers = noArray.filter(arr => (arr < targetNo)); // to remove the number greater then the target param from the array
    numbers = _.sortBy(_.uniq(numbers));
    let response = {
        times: 0,
        nos: []
    }
    return format(getOtherCombinationOfMaxOccurrence(targetNo, numbers, response));
}
console.log(`Target-13, Array:[2, 5, 6, 8, 6, 8], Ans: ${maxOccurrence(13, [2, 5, 6, 8, 6, 8])}`);//2+2+2+2+5
console.log(`Target-13, Array:[1, 2, 3, 5, 6, 8, 6, 8], Ans: ${maxOccurrence(13, [1, 2, 3, 5, 6, 8, 6, 8])}`);//1+1+1+1+1+1+1+1+1+1+1+1+1
console.log(`Target-13, Array:[2, 3, 5, 6, 8, 6, 8], Ans: ${maxOccurrence(13, [2, 3, 5, 6, 8, 6, 8])}`);//2+2+2+2+2+3
console.log(`Target-20, Array:[5, 6, 8, 6, 8], Ans: ${maxOccurrence(20, [5, 6, 8, 6, 8])}`);// 5+5+5+5
console.log(`Target-100, Array:[20, 5, 6, 8, 6, 8], Ans: ${maxOccurrence(100, [20, 5, 6, 8, 6, 8])}`);//5+5+5+5+5+5+5+5+5+5+5+5+5+5+5+5+5+5+5+5
console.log(`Target-25, Array:[2, 5, 6, 8, 6, 8], Ans: ${maxOccurrence(25, [2, 5, 6, 8, 6, 8])}`);//2+2+2+2+2+2+2+2+2+2+5
console.log(`Target-13, Array:[2, 5, 6], Ans: ${maxOccurrence(13, [2, 5, 6])}`);// 2+2+2+2+5