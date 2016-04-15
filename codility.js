'use strict';
const A = Array.from({length: 7}).map((v, i)=>Array.from({length: 3}));
A[0][0] = 5;
A[0][1] = 4;
A[0][2] = 4;
A[1][0] = 4;
A[1][1] = 3;
A[1][2] = 4;
A[2][0] = 3;
A[2][1] = 2;
A[2][2] = 4;
A[3][0] = 2;
A[3][1] = 2;
A[3][2] = 2;
A[4][0] = 3;
A[4][1] = 3;
A[4][2] = 4;
A[5][0] = 1;
A[5][1] = 4;
A[5][2] = 4;
A[6][0] = 4;
A[6][1] = 1;
A[6][2] = 1;

console.log(A);
console.log('---------------------');

function solution(A) {

    const taken = Array.from({length: A.length}).map((v, i)=>Array.from({length: A[i].length}).map(i=>0));
    const row = A.length - 1;
    let rowIndex = 0;

    function markUsed(i, j) {
        taken[i][j] = 1;
    }

    function moveDownFromPoint(i, j) {
        while (i <= row && taken[i][j] === 0) {
            markUsed(i, j);
            if (i != row && A[i][j] === A[i + 1][j]) {
                i++;
            } else {
                break;
            }
        }
        return [i, j];
    }

    function moveRightFromPoint(i, j) {
        const cell = A[i].length - 1;
        let moved = false;
        while (j <= cell && taken[i][j] === 0) {
            markUsed(i, j);
            moved = true;
            moveDownFromPoint(i, j);
            if (j != cell && A[i][j] === A[i][j + 1]) {
                j++;
            } else {
                break;
            }
        }
        return moved;
    }

    let c = 0;
    while (rowIndex <= row) {
        let cell = A[rowIndex].length - 1;
        let cellIndex = 0;
        while (taken[rowIndex][cellIndex]) {
            cellIndex++;
            if (cellIndex == cell) {
                rowIndex++;
                break;
            }
        }

        while (cellIndex < cell) {
            if (moveRightFromPoint(rowIndex, cellIndex)) {
                c++;
            }
            cellIndex++;
        }

        rowIndex++;

    }

    return c;


}

console.log(solution(A));
