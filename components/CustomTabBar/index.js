import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {state.routes.map((route, index) => {
          // const { options } = descriptors[route.key];
          const { key, name } = route; // Extrair a chave e o nome da rota

          const { options } = descriptors[route.key]; // Extrair options do objeto descriptors usando a chave

          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };
          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.accessibilityLabel}
              testID={options.tabBarTesteID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.buttonTab}
            >
              <View style={{ alignItems: "center", padding: 8 }}>
                <View
                  style={{
                    padding: 8,
                    backgroundColor: isFocused ? "#f8e2fd" : "transparent",
                    borderRadius: 99,
                  }}
                >
                  <MaterialIcons
                    name={options.tabBarIcon}
                    size={34}
                    color={isFocused ? "#8f2abd" : "#535353"}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: Platform.OS === "ios" ? 38 : 24,
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(255,255,255, 0.9)",
    gap: 50,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.8,
  },
  buttonTab: {
    justifyContent: "center",
    alignItems: "center",
  },
});
