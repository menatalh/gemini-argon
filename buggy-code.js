export const buggyCode = `
function averageScore(scores) {
    let total = 0;
    for (let i = 0; i <= scores.length; i++) {
        total += score[i];
    }
    return total / scores.length;
}

console.log(averageScore([80, 90, 100])); // expected 90, but prints NaN
`;