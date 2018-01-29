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