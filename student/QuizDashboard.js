import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView, Animated, Easing
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import StudentFab from "../components/studentFab";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import React, { useState, useRef } from "react";

export default function QuizDashboard({
    user,
    scores,
    setScreen,
    setCategory,
    onStartQuiz
}) {



    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.profile}>
                    <View style={styles.avatar} />
                    <View>
                        <Text style={styles.name}>{user.fname} {user.name}</Text>
                    </View>
                </View>
                <View style={styles.coinBox}>
                    <Ionicons name="diamond" size={16} color="#8b5cf6" />
                    <Text style={styles.coinText}>160</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* BANNER */}
                <LinearGradient
                    colors={["#8b5cf6", "#22d3ee"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.banner}
                >
                    <Text style={styles.bannerTitle}>Test Your Knowledge with Quizzes</Text>
                    <Text style={styles.bannerSub}>Take fun quizzes, sharpen your skills & learn</Text>

                    <TouchableOpacity style={styles.playBtn} onPress={onStartQuiz}>
                        <Text style={styles.playText}>Play Now</Text>
                    </TouchableOpacity>
                </LinearGradient>

                {/* SEARCH */}
                <View style={styles.searchBox}>
                    <Ionicons name="search" size={18} color="#999" />
                    <TextInput placeholder="Search" style={styles.searchInput} />
                </View>

                {/* CATEGORIES */}
                <Text style={styles.sectionTitle}>Categories</Text>
                <View style={styles.categories}>
                    {[
                        { icon: "html5", label: "HTML", color: "#f16529" },
                        { icon: "js", label: "JAVASCRIPT", color: "#f7df1e" },
                        { icon: "react", label: "REACT", color: "#61dafb" },
                        { icon: "cuttlefish", label: "C++", color: "#00599C" },
                        { icon: "python", label: "PYTHON", color: "#306998" }
                    ].map((item, index) => (
                        <TouchableOpacity key={index} style={styles.categoryItem}
                            onPress={() => { setCategory(item.label); setScreen("quiz"); }}
                        >
                            <FontAwesome5 name={item.icon} size={26} color={item.color} />
                            <Text style={styles.categoryText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* RECENT ACTIVITY */}
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                {[
                    { title: "HTML", key: "HTML", color: "#f16529" },
                    { title: "JAVASCRIPT", key: "JAVASCRIPT", color: "#f7df1e" },
                    { title: "REACT", key: "REACT", color: "#61dafb" },
                    { title: "C++", key: "C++", color: "#00599C" },
                    { title: "PYTHON", key: "PYTHON", color: "#306998" }
                ].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.activityCard}
                        onPress={() => { setCategory(item.title); setScreen("quiz"); }}
                    >
                        <View style={styles.activityLeft}>
                            <FontAwesome5
                                name={
                                    item.key === "HTML" ? "html5" :
                                        item.key === "JAVASCRIPT" ? "js" :
                                            item.key === "REACT" ? "react" :
                                                item.key === "PYTHON" ? "python" :
                                                    "cuttlefish"
                                }
                                size={26}
                                color={item.color}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.activityTitle}>{item.title}</Text>
                                <Text style={styles.activitySub}>30 Questions</Text>
                            </View>
                        </View>

                        <View style={[styles.scoreCircle, { borderColor: item.color }]}>
                            <Text style={styles.scoreText}>{scores[item.key]}/30</Text>
                        </View>
                    </TouchableOpacity>
                ))}

            </ScrollView>

            {/* in clude other page  */}
            <StudentFab setScreen={setScreen} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#020617" },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 40,
        alignItems: "center"
    },

    profile: {
        flexDirection: "row",
        alignItems: "center"
    },

    avatar: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: "#6366f1",
        marginRight: 10
    },

    name: { fontWeight: "bold", fontSize: 14, color: "#fff" },

    coinBox: {
        flexDirection: "row",
        backgroundColor: "rgba(139,92,246,0.15)",
        padding: 6,
        borderRadius: 10,
        alignItems: "center"
    },

    coinText: { marginLeft: 4, fontWeight: "bold", color: "#fff" },

    banner: {
        margin: 20,
        padding: 20,
        borderRadius: 16,
        elevation: 5
    },

    bannerTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },

    bannerSub: {
        color: "#dbe6ff",
        marginVertical: 8,
        fontSize: 12
    },

    playBtn: {
        backgroundColor: "#fff",
        alignSelf: "flex-start",
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 8
    },

    playText: {
        color: "#8b5cf6",
        fontWeight: "bold"
    },

    searchBox: {
        flexDirection: "row",
        backgroundColor: "#1e293b",
        marginHorizontal: 20,
        padding: 12,
        borderRadius: 12,
        alignItems: "center"
    },

    searchInput: {
        marginLeft: 8,
        flex: 1,
        color: "#fff"
    },

    sectionTitle: {
        marginHorizontal: 20,
        marginTop: 20,
        fontWeight: "bold",
        color: "#fff"
    },

    categories: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20
    },

    categoryItem: {
        alignItems: "center"
    },

    categoryText: {
        fontSize: 10,
        marginTop: 4,
        color: "#fff"
    },

    activityCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#1e293b",
        marginHorizontal: 20,
        marginVertical: 6,
        padding: 14,
        borderRadius: 14,
        alignItems: "center"
    },

    activityLeft: {
        flexDirection: "row",
        alignItems: "center"
    },

    activityTitle: {
        fontWeight: "bold",
        color: "#fff"
    },

    activitySub: {
        fontSize: 11,
        color: "#c7d2fe"
    },

    scoreCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 4,
        justifyContent: "center",
        alignItems: "center"
    },

    scoreText: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#fff"
    },

    fab: {
        position: "absolute",
        right: 25,
        bottom: 30,
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: "#8b5cf6",
        alignItems: "center",
        justifyContent: "center",
        elevation: 10
    },

    fabSmall: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#8b5cf6",
        alignItems: "center",
        justifyContent: "center",
        elevation: 8
    },
});