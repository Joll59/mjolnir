export const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const percentage = (value: number) => {
    return (arg: number) => {
        return Math.floor((value / 100) * arg);
    };
};

export const percentage15 = percentage(15); 
export const percentage25 = percentage(25); 
export const percentage50 = percentage(50); 
export const percentage80 = percentage(80);

export const equals = (array1: number[], array2: number[]) => {
    // if the either array is a falsy value, return
    if (!array1 || !array2) {
        return false;
    }

    // compare lengths - low hanging fruit check. 
    if (array1.length !== array2.length) {
        return false;
    }

    for (var i = 0, l = array1.length; i < l; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
};