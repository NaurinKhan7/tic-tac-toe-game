import { Animated, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AnimatedCell({ children }: Props) {
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale, opacity]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                 // ✅ fill the cell
    justifyContent: "center",// ✅ vertical center
    alignItems: "center",    // ✅ horizontal center
  },
});
