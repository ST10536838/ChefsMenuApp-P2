import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import {
  getMenuItems,
  clearAllMenuItems,
  deleteMenuItem,
  MenuItem,
} from '../utils/menuStore';

export default function MenuListScreen() {
  const [items, setItems] = useState<MenuItem[]>([]);

  const refreshList = () => {
    setItems(getMenuItems());
  };

  useFocusEffect(
    React.useCallback(() => {
      refreshList();
    }, [])
  );

  const handleReset = () => {
    clearAllMenuItems();
    refreshList();
  };

  const handleDelete = (id: string) => {
    deleteMenuItem(id);
    refreshList();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.listHeaderRow}>
          <Text style={styles.sectionHeader}>Catalog Items</Text>
          <View style={styles.headerActions}>
            <Text style={styles.itemCounterBadge}>{items.length} Items</Text>
            {items.length > 0 && (
              <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.resetButtonText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {items.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateTitle}>No Dishes Available</Text>
            <Text style={styles.emptyStateSubtitle}>
              Head over to the "Add Dish" tab to build your menu.
            </Text>
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.menuCard}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.dishTitleText}>{item.dishName}</Text>
                  <View style={styles.courseBadge}>
                    <Text style={styles.courseBadgeText}>{item.course}</Text>
                  </View>
                </View>
                <Text style={styles.dishDescriptionText}>{item.description}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.dishPriceText}>Price: R{item.price}</Text>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.deleteBtnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#F8FAFC' },
  contentContainer: { flex: 1, padding: 16 },
  listHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  itemCounterBadge: { fontSize: 12, color: '#0891B2', fontWeight: '600', backgroundColor: '#E0F2FE', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  resetButton: { backgroundColor: '#FEE2E2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  resetButtonText: { fontSize: 12, color: '#EF4444', fontWeight: '600' },
  emptyStateContainer: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#CBD5E1', borderStyle: 'dashed', marginTop: 20 },
  emptyStateTitle: { fontSize: 14, fontWeight: 'bold', color: '#64748B', marginBottom: 4 },
  emptyStateSubtitle: { fontSize: 12, color: '#94A3B8', textAlign: 'center' },
  menuCard: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 14, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#0F172A', elevation: 1 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  dishTitleText: { fontSize: 15, fontWeight: 'bold', color: '#0F172A' },
  courseBadge: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  courseBadgeText: { fontSize: 10, fontWeight: '700', color: '#0891B2' },
  dishDescriptionText: { fontSize: 12, color: '#475569', marginBottom: 8 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 8 },
  dishPriceText: { fontSize: 13, fontWeight: 'bold', color: '#059669' },
  deleteBtn: { backgroundColor: '#FEE2E2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  deleteBtnText: { fontSize: 11, color: '#DC2626', fontWeight: '600' },
});