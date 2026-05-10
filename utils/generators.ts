import { v4 as uuidv4 } from 'uuid';

export const generateArrayOfUUIDs = (size: number) => {
    const array: string[] = [];
    for (let i = 0; i < size; i++) {
        array.push(uuidv4());
    }

    return array;
}

