// AdminLybraryDashboard.js
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const recentlyAddedBooks = [
  { title: "The Silent Patient", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk3sfIt6uf-b5csBfUdwyN86bTgO2xwStqlg&s" },
  { title: "Dune", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLrOvdnbvylCQm_xbbzZzapzHv51w61CkbYQ&s" },
  { title: "Becoming", cover: "https://m.media-amazon.com/images/I/619vFEd3EAL._AC_UF1000,1000_QL80_.jpg" },
];

const borrowedBooks = [
  { title: "The Catcher in the Rye", dueDate: "May 01, 2024" },
];

const AdminLybraryDashboard = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Library Management</Text>
          <Text style={styles.subtitle}>Welcome, Sarah 👋</Text>
        </View>
        <Image
          source={"https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg"}
          style={styles.profileImage}
        />
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: '#4F46E5' }]}>
          <Text style={styles.statValue}>1,256</Text>
          <Text style={styles.statLabel}>Total Books</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: '#0EA5A4' }]}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Borrowed</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: '#F59E0B' }]}>
          <Text style={styles.statValue}>1</Text>
          <Text style={styles.statLabel}>Due Soon</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        {['Scan Book', 'My Books', 'Reservations', 'Fines'].map((item, i) => (
          <TouchableOpacity key={i} style={styles.actionButton}>
            <Text style={styles.actionIcon}>📚</Text>
            <Text style={styles.actionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recently Added */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recently Added</Text>
      </View>

      <ScrollView style={styles.recentbooks} horizontal showsHorizontalScrollIndicator={false}>
        {recentlyAddedBooks.map((book, index) => (
          <View key={index} style={styles.bookCard}>
            <Image source={{uri:book.cover}} style={styles.bookImage} />
            <Text style={styles.bookTitle}>{book.title}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Borrowed Books */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Borrowed Books</Text>
      </View>

      {borrowedBooks.map((book, index) => (
        <View key={index} style={styles.borrowedCard}>
          <View>
            <Text style={styles.borrowedTitle}>{book.title}</Text>
            <Text style={styles.dueText}>Due: {book.dueDate}</Text>
          </View>

          <TouchableOpacity style={styles.returnButton}>
            <Text style={styles.returnText}>Return</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

export default AdminLybraryDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 4,
  },

  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
recentbooks: {
    paddingVertical:10,
    marginTop: 4,
  },
  statLabel: {
    color: '#E5E7EB',
    marginTop: 4,
  },

  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 3,
  },

  actionIcon: {
    fontSize: 20,
    marginBottom: 4,
  },

  actionText: {
    fontSize: 12,
    fontWeight: '500',
  },

  sectionHeader: {
    marginBottom: 10,
    marginTop: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },

  bookCard: {
    width: 120,
    marginRight: 12,
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 14,
    elevation: 3,
  },

  bookImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },

  bookTitle: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
  },

  borrowedCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
  },

  borrowedTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  dueText: {
    color: '#6B7280',
    marginTop: 4,
  },

  returnButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  returnText: {
    color: '#FFF',
    fontWeight: '600',
  },
});