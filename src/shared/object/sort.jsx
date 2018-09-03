export function objStrSort(attribute, asc = true) {
    return (a, b) => {
        let compare = a[attribute] > b[attribute];
        compare = (asc) ? compare : !compare;
        if (compare && a[attribute] !== b[attribute]) {
            return 1;
        } else if (!compare && a[attribute] !== b[attribute]) {
            return -1;
        } else {
            return 0;
        }
    };
}