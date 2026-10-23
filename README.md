# Tic Tac Toe 3D (React + Vite)

One-page, centered, 3D colorful Tic Tac Toe using **O** and **\***.

## Features
- **Play with user** – two players on one screen (Player 1 = O, Player 2 = *)
- **Play with machine** – you are O, machine is *. Easy = random, Hard = unbeatable (minimax)
- Result shown as **win** or **tie**, with winning line highlighted
- Score tracker (O wins, ties, * wins); starting player alternates each round
- Fits on a single screen, responsive, respects reduced-motion and dark mode

## Run
```bash
npm install
npm run dev      # development
npm run build    # production build into dist/
npm run preview  # preview the build
```

## Structure
```
src/
  App.jsx               game state & flow
  main.jsx              entry point
  styles.css            3D theme
  logic/game.js         rules (judge) + machine AI (minimax)
  components/
    Board.jsx  Mark.jsx  Controls.jsx  ScoreBoard.jsx  Status.jsx
```
