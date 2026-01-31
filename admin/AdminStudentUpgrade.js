import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AdminStudentUpgradeScreen() {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const [upgrades, setUpgrades] = useState([
        {
            id: "1",
            name: "Arindam Bar",
            from: "1st Semester",
            to: "2nd Semester",
            status: "Approved",
        },
        {
            id: "2",
            name: "Jane Smith",
            from: "2nd Semester",
            to: "3rd Semester",
            status: "Pending",
        },
        {
            id: "3",
            name: "Michael Lee",
            from: "3rd Semester",
            to: "4th Semester",
            status: "Pending",
        },
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Approved":
                return "#2e7d32";
            case "Pending":
                return "#f9a825";
            case "Rejected":
                return "#c62828";
            default:
                return "#616161";
        }
    };

    const handleAction = (id, newStatus) => {
        setUpgrades((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status: newStatus } : item
            )
        );
    };

    const filteredData = useMemo(() => {
        return upgrades.filter((item) => {
            const matchesSearch = item.name
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesFilter =
                activeFilter === "All" || item.status === activeFilter;
            return matchesSearch && matchesFilter;
        });
    }, [search, activeFilter, upgrades]);

    const renderStats = () => {
        const approved = upgrades.filter((i) => i.status === "Approved").length;
        const pending = upgrades.filter((i) => i.status === "Pending").length;
        const rejected = upgrades.filter((i) => i.status === "Rejected").length;

        return (
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Ionicons name="people" size={20} color="#0b3d91" />
                    <Text style={styles.statNumber}>{upgrades.length}</Text>
                    <Text style={styles.statLabel}>Total</Text>
                </View>

                <View style={styles.statCard}>
                    <Ionicons name="checkmark-circle" size={20} color="#2e7d32" />
                    <Text style={styles.statNumber}>{approved}</Text>
                    <Text style={styles.statLabel}>Approved</Text>
                </View>

                <View style={styles.statCard}>
                    <Ionicons name="time" size={20} color="#f9a825" />
                    <Text style={styles.statNumber}>{pending}</Text>
                    <Text style={styles.statLabel}>Pending</Text>
                </View>

                <View style={styles.statCard}>
                    <Ionicons name="close-circle" size={20} color="#c62828" />
                    <Text style={styles.statNumber}>{rejected}</Text>
                    <Text style={styles.statLabel}>Rejected</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Student Upgrades</Text>
                    <Text style={styles.headerSubtitle}>
                        Manage semester promotions easily
                    </Text>
                </View>
                <View style={styles.headerIconBox}>
                    <Ionicons name="school" size={22} color="#0b3d91" />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                overScrollMode="never">
                {renderStats()}

                {/* SEARCH */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={18} color="#777" />
                    <TextInput
                        placeholder="Search student..."
                        value={search}
                        onChangeText={setSearch}
                        style={styles.searchInput}
                    />
                    {search.length > 0 && (
                        <TouchableOpacity onPress={() => setSearch("")}>
                            <Ionicons name="close-circle" size={18} color="#999" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* FILTERS */}
                <View style={styles.filterRow}>
                    {["All", "Approved", "Pending", "Rejected"].map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            onPress={() => setActiveFilter(filter)}
                            style={[
                                styles.filterButton,
                                activeFilter === filter && styles.activeFilter,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    activeFilter === filter && styles.activeFilterText,
                                ]}
                            >
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* CARDS */}
                {filteredData.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="folder-open-outline" size={40} color="#bbb" />
                        <Text style={styles.emptyText}>No records found</Text>
                    </View>
                ) : (
                    filteredData.map((item) => (
                        <View
                            key={item.id}
                            style={[
                                styles.card,
                                { borderLeftColor: getStatusColor(item.status) },
                            ]}
                        >
                            <View style={styles.row}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>
                                        {item.name.charAt(0)}
                                    </Text>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <View style={styles.semesterRow}>
                                        <Text style={styles.semesterText}>{item.from}</Text>
                                        <Ionicons
                                            name="arrow-forward"
                                            size={14}
                                            color="#999"
                                            style={{ marginHorizontal: 6 }}
                                        />
                                        <Text style={styles.semesterText}>{item.to}</Text>
                                    </View>
                                </View>

                                <View
                                    style={[
                                        styles.badge,
                                        { backgroundColor: getStatusColor(item.status) + "20" },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.badgeText,
                                            { color: getStatusColor(item.status) },
                                        ]}
                                    >
                                        {item.status}
                                    </Text>
                                </View>
                            </View>

                            {item.status === "Pending" && (
                                <View style={styles.actions}>
                                    <TouchableOpacity
                                        style={styles.approveBtn}
                                        onPress={() => handleAction(item.id, "Approved")}
                                    >
                                        <Ionicons name="checkmark" size={16} color="#fff" />
                                        <Text style={styles.actionText}>Approve</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.rejectBtn}
                                        onPress={() => handleAction(item.id, "Rejected")}
                                    >
                                        <Ionicons name="close" size={16} color="#fff" />
                                        <Text style={styles.actionText}>Reject</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f6fb",
        overflow: "hidden",
    },
    header: {

        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTitle: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
    },
    headerSubtitle: {
        color: "#777",
        fontSize: 12,
        marginTop: 4,
    },
    headerIconBox: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 14,
    },
    statsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 14,
    },
    statCard: {
        backgroundColor: "#fff",
        width: "48%",
        marginBottom: 10,
        padding: 14,
        borderRadius: 16,
        alignItems: "center",
        elevation: 3,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 6,
        color: "#0b3d91",
    },
    statLabel: {
        fontSize: 12,
        color: "#777",
    },
    searchContainer: {
        backgroundColor: "#fff",
        margin: 10,
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        padding: 10,
    },
    filterRow: {
        flexDirection: "row",
        paddingHorizontal: 14,
        flexWrap: "wrap",
    },
    filterButton: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: "#e3e8f5",
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    activeFilter: {
        backgroundColor: "#0b3d91",
    },
    filterText: {
        fontSize: 12,
        fontWeight: "600",
    },
    activeFilterText: {
        color: "#fff",
    },
    card: {
        backgroundColor: "#fff",
        marginHorizontal: 14,
        marginTop: 14,
        padding: 16,
        borderRadius: 18,
        borderLeftWidth: 5,
        elevation: 4,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#e3ecff",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    avatarText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0b3d91",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    semesterRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    semesterText: {
        fontSize: 13,
        color: "#757575",
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "bold",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 12,
    },
    approveBtn: {
        backgroundColor: "#2e7d32",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 10,
    },
    rejectBtn: {
        backgroundColor: "#c62828",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    actionText: {
        color: "#fff",
        marginLeft: 4,
        fontSize: 12,
        fontWeight: "600",
    },
    emptyContainer: {
        alignItems: "center",
        marginTop: 40,
    },
    emptyText: {
        marginTop: 10,
        color: "#999",
    },
});