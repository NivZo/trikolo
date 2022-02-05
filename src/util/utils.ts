

export const isDefined = (obj: any): boolean => (obj !== undefined && obj !== null);

export const joinClasses = (classNames: Array<string>): string => classNames.join(" ");

export const joinClassesConditionally = (conditionedClassNames: Array<[string, boolean]>): string =>
    conditionedClassNames
        .filter(conditionedClassName => conditionedClassName.length >= 2 && conditionedClassName[1])
        .map(conditionedClassName => conditionedClassName[0])
        .join(" ");

export const splitStringChunksOf4 = (str: string): Array<string> => {
    const matches = str.match(/.{1,4}/g);
    return matches ? matches : [];
}

export const splitArrayToSubarrays = <T extends any>(array: Array<T>, subarraySize: number) => {
    const result = [];

    while (array.length) {
        result.push(array.splice(0, subarraySize));
    }

    return result;
}
