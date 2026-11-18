import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import {
  getMenuItems,
  calculateMenuStatistics,
  MenuItem,
} from '../utils/menuStore';

export default function HomeScreen() {
  const router = useRouter();
  const [items, setItems] = useState<MenuItem[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      setItems(getMenuItems());
    }, [])
  );

  const stats = calculateMenuStatistics(items);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroCard}>
          <Text style={styles.welcomeTitle}>Welcome, Chef!</Text>
          <Text style={styles.welcomeSubtitle}>
            Manage your restaurant catalog, view real-time statistics, and organize courses.
          </Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.cardHeader}>Menu Statistics Overview</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stats.totalCount}</Text>
              <Text style={styles.statLabel}>Total Dishes</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>R{stats.overallAverage}</Text>
              <Text style={styles.statLabel}>Avg Price</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionHeader}>Course Breakdown</Text>
        <View style={styles.courseGrid}>
          <View style={[styles.courseBox, { borderLeftColor: '#3B82F6' }]}>
            <Text style={styles.courseName}>Starters</Text>
            <Text style={styles.courseCount}>{stats.starterCount}</Text>
            <Text style={styles.courseAvg}>Avg: R{stats.starterAverage}</Text>
          </View>

          <View style={[styles.courseBox, { borderLeftColor: '#10B981' }]}>
            <Text style={styles.courseName}>Mains</Text>
            <Text style={styles.courseCount}>{stats.mainCount}</Text>
            <Text style={styles.courseAvg}>Avg: R{stats.mainAverage}</Text>
          </View>

          <View style={[styles.courseBox, { borderLeftColor: '#F59E0B' }]}>
            <Text style={styles.courseName}>Desserts</Text>
            <Text style={styles.courseCount}>{stats.dessertCount}</Text>
            <Text style={styles.courseAvg}>Avg: R{stats.dessertAverage}</Text>
          </View>
        </View>

        <Text style={styles.sectionHeader}>Quick Actions</Text>
        <TouchableOpacity
          style={styles.actionButtonPrimary}
          onPress={() => router.push('/add-dish')}
        >
          <Text style={styles.actionButtonText}>+ Add New Dish</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButtonSecondary}
          onPress={() => router.push('/menu-list')}
        >
          <Text style={styles.actionButtonSecondaryText}>
            View & Manage Catalog ({stats.totalCount})
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 16 },
  heroCard: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderBottomWidth: 3,
    borderBottomColor: '#0891B2',
  },
  welcomeTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' },
  welcomeSubtitle: { fontSize: 13, color: '#94A3B8', marginTop: 6, lineHeight: 18 },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: { fontSize: 14, fontWeight: 'bold', color: '#0F172A', marginBottom: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  statBox: { alignItems: 'center', flex: 1 },
  divider: { width: 1, height: 36, backgroundColor: '#E2E8F0' },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#0891B2' },
  statLabel: { fontSize: 12, color: '#64748B', marginTop: 4 },
  sectionHeader: { fontSize: 15, fontWeight: 'bold', color: '#0F172A', marginBottom: 10, marginTop: 6 },
  courseGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, gap: 8 },
  courseBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    elevation: 1,
  },
  courseName: { fontSize: 11, fontWeight: '700', color: '#64748B', textTransform: 'uppercase' },
  courseCount: { fontSize: 18, fontWeight: 'bold', color: '#0F172A', marginTop: 4 },
  courseAvg: { fontSize: 11, fontWeight: '600', color: '#059669', marginTop: 4 },
  actionButtonPrimary: {
    backgroundColor: '#0891B2',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  actionButtonSecondary: {
    backgroundColor: '#E0F2FE',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  actionButtonSecondaryText: { color: '#0369A1', fontWeight: 'bold', fontSize: 14 },
}); 