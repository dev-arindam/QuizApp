import React, { useState, useRef } from "react";
import { TouchableOpacity, Animated, Easing, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MainFab({ setScreen }) {
  const [open, setOpen] = useState(false);

  const anims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,

  ];

  const items = [
    { icon: "person-outline", screen: "profile" },
   { icon: "star-outline", screen: "review" },
    { icon: "book-outline", screen: "home" },
    { icon: "calendar-outline", screen: "attendance" },
    { icon: "create-outline", screen: "quizDashboard" },
    { icon: "clipboard-outline", screen: "home" },
    { icon: "chatbubble-outline", screen: "home" },
    { icon: "home-outline", screen: "home" },
  ];

  const toggle = () => {
    const toValue = open ? 0 : 1;
    const animations = anims.map(a =>
      Animated.timing(a, {
        toValue,
        duration: 300,
        easing: Easing.out(Easing.back(1.3)),
        useNativeDriver: true,
      })
    );

    open
      ? Animated.stagger(40, animations.reverse()).start()
      : Animated.stagger(70, animations).start();

    setOpen(!open);
  };

  const FabItem = ({ anim, index, icon, screen }) => (
    <Animated.View
      style={{
        position: "absolute",
        right: 25,
        bottom: 80,
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -(index + 1) * 70],
            }),
          },
          {
            scale: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 1],
            }),
          },
        ],
        opacity: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      }}
    >
      <TouchableOpacity
        style={styles.small}
        onPress={() => {
          setScreen(screen);
          toggle();
        }}
      >
        <Ionicons name={icon} size={20} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <>
      {items.map((it, i) => (
        <FabItem
          key={i}
          anim={anims[i]}
          index={i}
          icon={it.icon}
          screen={it.screen}
        />
      ))}

      <TouchableOpacity style={styles.main} onPress={toggle}>
        <Ionicons name={open ? "close" : "menu"} size={26} color="#fff" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    right: 30,
    bottom: 60,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#8b5cf6",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },

  small: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#8b5cf6",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
});