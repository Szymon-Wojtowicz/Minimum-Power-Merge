# Minimum Power Game

In a game there is an array of cells, each with an integer value. In one move, merge two cells to obtain a new cell that contains the sum of two cells. The power needed in each move is the sum of the values of the two merged cells. The goal is to merge the cells until only one cell remains. Find the minimum possible power required to do so.

## Example

cells =[20,30,40]

1. Select cells with values 20 and 30 and merge them to obtain [50,40]. The power needed for this move is 20+30=50
2. Select cells with values 50 and 40 and merge them to obtain [90]. The power needed for this move is 50+40=90

The total power required is 50+90=140. This is the minimum possible power.

## Function Description

Complete the function minPower in the editor.

`minPower` has the following parameter:

- `int cells[n]`: the values of each cell

### Returns

- `int`: the minimum power required to finish the game.

### Constraints

- 2<=n<=10^5
- 1<=cells[i]<=100

### Input format for testing

The first line contains an integer, `n`, the number of elements in `cells`.

Each line `i` of the `n` subsequent lines (where 0<=i<=n) contains an integer, `cells[i]`.

## How to Run the Script

To execute the script with input and output redirection, navigate to the project folder and use the following command:

```bash
$env:OUTPUT_PATH="output.txt"; Get-Content input.txt | node script.js
```
