
type asyncSimulator<TReturnVal> = {
    timeout?: number,
    returnVal: TReturnVal,
    asSuccess?: boolean,
};

export function simulateAsync<TReturnVal>({
    timeout = 2000,
    returnVal,
    asSuccess = true,
}: asyncSimulator<TReturnVal>) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (asSuccess) res(returnVal);
            else rej(returnVal);
        }, timeout);
    });
}