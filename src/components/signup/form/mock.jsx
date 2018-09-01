export const challanges = new Promise((resolve, reject) => {
    setTimeout(function () {
        resolve([
            { id: 1, title: "Copenhagen - 2018" },
            { id: 2, title: "Paris - 2018" }
        ]);
    }, 500);
});
