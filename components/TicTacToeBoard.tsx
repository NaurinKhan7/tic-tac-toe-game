import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import AnimatedCell from "./AnimatedCell";
import { Colors } from "../constants/colors";

type Cell = "X" | "O" | null;

type Props = {
  board: Cell[];
  onPress: (index: number) => void;
  winningLine?: {
    type: "row" | "col" | "diag";
    index: number;
  } | null;
};

export default function TicTacToeBoard({
  board,
  onPress,
  winningLine,
}: Props) {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";

  let BOARD_SIZE = width * 0.85;
  const SOFT_MIN = width < 300 ? width * 0.92 : 260;
  const MAX = isWeb ? 520 : 380;

  BOARD_SIZE = Math.max(BOARD_SIZE, SOFT_MIN);
  BOARD_SIZE = Math.min(BOARD_SIZE, MAX);

  const CELL_SIZE = BOARD_SIZE / 3;
  const SYMBOL_SIZE = CELL_SIZE * 0.6;

  return (
    <View style={[styles.board, { width: BOARD_SIZE, height: BOARD_SIZE }]}>
      {board.map((cell, index) => (
        <Pressable
          key={index}
          style={styles.cellWrapper}
          onPress={() => onPress(index)}
        >
          <View style={styles.cell}>
            {cell && (
              <AnimatedCell>
                <Text
                  style={[
                    styles.symbol,
                    { fontSize: SYMBOL_SIZE },
                    cell === "X" ? styles.x : styles.o,
                  ]}
                >
                  {cell}
                </Text>
              </AnimatedCell>
            )}
          </View>
        </Pressable>
      ))}

      {winningLine && (
        <WinningStrike line={winningLine} boardSize={BOARD_SIZE} />
      )}
    </View>
  );
}

/* ---------------- STRIKE ---------------- */

function WinningStrike({
  line,
  boardSize,
}: {
  line: { type: "row" | "col" | "diag"; index: number };
  boardSize: number;
}) {
  const cell = boardSize / 3;
  const center = cell / 2;

  let style: any = {
    position: "absolute",
    backgroundColor: "#ffffff",
    borderRadius: 2,
  };

  // ROW
  if (line.type === "row") {
    style = {
      ...style,
      height: 4,
      width: cell * 3 - cell * 0.4, 
      top: cell * line.index + center - 2,
      left: cell * 0.2,
    };
  }

  // COLUMN
  if (line.type === "col") {
    style = {
      ...style,
      width: 4,
      height: cell * 3 - cell * 0.4,
      left: cell * line.index + center - 2,
      top: cell * 0.2,
    };
  }

  // DIAGONAL
if (line.type === "diag") {
  const length = boardSize * 1.15;

  style = {
    ...style,
    height: 4,
    width: length,
    top: boardSize / 2 - 2,
    left: (boardSize - length) / 2, 
    transform: [
      { rotate: line.index === 0 ? "45deg" : "-45deg" },
    ],
  };
}


  return <View style={style} />;
}



/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.board,
    borderRadius: 18,
    position: "relative",
  },
  cellWrapper: {
    width: "33.33%",
    height: "33.33%",
    padding: 5,
  },
  cell: {
    flex: 1,
    backgroundColor: Colors.cell,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  symbol: {
    fontWeight: "700",
  },
  x: { color: Colors.x },
  o: { color: Colors.o },

  strikeContainer: {
    position: "absolute",
    inset: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  strike: {
    position: "absolute",
    backgroundColor: "#ffffff",
    borderRadius: 2,
  },
});
