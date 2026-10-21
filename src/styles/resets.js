import { StyleSheet } from "react-native";
import { colors } from "./basic";
import { fonts } from "../assets/fonts";

export const resets = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  text: {
    color: colors.body,
    fontSize: 16,
    lineHeight: 27,
    fontFamily: fonts.regular,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    padding: 24,
  },
  loadError: { fontSize: 16, color: colors.body, textAlign: "center" },
});
