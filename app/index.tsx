import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import TicTacToeBoard from "../components/TicTacToeBoard";
import { useTicTacToe } from "../hooks/useTicTacToe";
import { Colors } from "../constants/colors";

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  const {
    board,
    isXTurn,
    winner,
    winningLine,
    makeMove,
    resetGame,
  } = useTicTacToe();

  const titleFontSize =
    width < 320 ? 26 : width < 768 ? 32 : 36;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: titleFontSize }]}>
        Tic Tac Toe
      </Text>

      <TicTacToeBoard
        board={board}
        onPress={makeMove}
        winningLine={winningLine}
      />

      <Text style={winner ? styles.winner : styles.status}>
        {winner
          ? winner === "Draw"
            ? "It's a Draw!"
            : `Winner: ${winner}`
          : `Turn: ${isXTurn ? "X" : "O"}`}
      </Text>

      <Pressable style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Restart Game</Text>
      </Pressable>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  status: {
    marginTop: 20,
    fontSize: 18,
    color: "#ffffff",
  },
  winner: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#38bdf8",
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "600",
  },
});
