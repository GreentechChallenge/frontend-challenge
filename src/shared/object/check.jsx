export function countPropertiesAndNoEmpty(obj) {
    var count = 0;

    for (let property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property) && obj[property]) {
            count++;
        }
    }

    return count;
}
