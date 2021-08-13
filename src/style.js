import { StyleSheet } from "react-native"

const colors = {
    primary: "#1bd",
    dark: "#222",
    light: "#777",
  }

const style = StyleSheet.create({
  h1: {
    fontSize: 24,
    textAlign: 'center'
  },
  h2:{
    fontSize: 22,
    textAlign: 'left'
  },
  h3: {
    textAlign: 'right',
    fontSize: 20
  },
  h4: {
    textAlign: "center",
    fontSize: 16,
    color: "black"
  },
  p: {
    fontSize: 14,
  },
  right: {
    textAlign: "right"
  },

  appFrame: {
    marginHorizontal: 15,
  },
})

export {
  colors,
  style
}