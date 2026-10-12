import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { sharedMenuItems } from './add-dish';

export default function HomeScreen() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      setItems([...sharedMenuItems]);
    }, [])
  );

  const totalItems = items.length;
  const starters = items.filter((i) => i.course === 'Starter').length;
  const mains = items.filter((i) => i.course === 'Main Course').length;
  const desserts = items.filter((i) => i.course === 'Dessert').length;

  const averagePrice =
    totalItems > 0
      ? (items.reduce((sum, item) => sum + parseFloat(item.price || 0), 0) / totalItems).toFixed(2)
      : '0.00';

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Header */}
        <View style={styles.heroCard}>
          <Text style={styles.welcomeTitle}>Welcome, Chef!</Text>
          <Text style={styles.welcomeSubtitle}>
            Manage your restaurant catalog, organize courses, and build custom menus.
          </Text>
        </View>

        {/* Catalog Overview Banner */}
        <View style={styles.statsCard}>
          <Text style={styles.cardHeader}>Menu Summary</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{totalItems}</Text>
              <Text style={styles.statLabel}>Total Dishes</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>R{averagePrice}</Text>
              <Text style={styles.statLabel}>Avg Price</Text>
            </View>
          </View>
        </View>

        {/* Breakdown by Course */}
        <Text style={styles.sectionHeader}>Course Breakdown</Text>
        <View style={styles.courseGrid}>
          <View style={[styles.courseBox, { borderLeftColor: '#3B82F6' }]}>
            <Text style={styles.courseCount}>{starters}</Text>
            <Text style={styles.courseName}>Starters</Text>
          </View>
          <View style={[styles.courseBox, { borderLeftColor: '#10B981' }]}>
            <Text style={styles.courseCount}>{mains}</Text>
            <Text style={styles.courseName}>Mains</Text>
          </View>
          <View style={[styles.courseBox, { borderLeftColor: '#F59E0B' }]}>
            <Text style={styles.courseCount}>{desserts}</Text>
            <Text style={styles.courseName}>Desserts</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionHeader}>Quick Actions</Text>
        <TouchableOpacity style={styles.actionButtonPrimary} onPress={() => router.push('/add-dish')}>
          <Text style={styles.actionButtonText}>+ Add New Dish</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButtonSecondary} onPress={() => router.push('/menu-list' as any)}>
          <Text style={styles.actionButtonSecondaryText}>View Full Catalog ({totalItems})</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 16 },
  heroCard: { backgroundColor: '#0F172A', borderRadius: 12, padding: 20, marginBottom: 16 },
  welcomeTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' },
  welcomeSubtitle: { fontSize: 13, color: '#94A3B8', marginTop: 6, lineHeight: 18 },
  statsCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 1 },
  cardHeader: { fontSize: 14, fontWeight: 'bold', color: '#0F172A', marginBottom: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statBox: { alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#0891B2' },
  statLabel: { fontSize: 12, color: '#64748B', marginTop: 2 },
  sectionHeader: { fontSize: 15, fontWeight: 'bold', color: '#0F172A', marginBottom: 10, marginTop: 8 },
  courseGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  courseBox: { flex: 1, backgroundColor: '#FFFFFF', padding: 12, borderRadius: 8, marginHorizontal: 4, borderLeftWidth: 4, elevation: 1 },
  courseCount: { fontSize: 18, fontWeight: 'bold', color: '#0F172A' },
  courseName: { fontSize: 11, color: '#64748B', marginTop: 2 },
  actionButtonPrimary: { backgroundColor: '#0891B2', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginBottom: 10 },
  actionButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  actionButtonSecondary: { backgroundColor: '#E0F2FE', borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  actionButtonSecondaryText: { color: '#0369A1', fontWeight: 'bold', fontSize: 14 },
});