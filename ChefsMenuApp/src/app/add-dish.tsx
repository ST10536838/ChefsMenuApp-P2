import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Export shared state and clear helper for index.tsx and menu-list.tsx
export let sharedMenuItems: any[] = [];

export function clearMenuItems() {
  sharedMenuItems.length = 0;
}

export default function AddDishScreen() {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starter');
  const [price, setPrice] = useState('');
  const [feedback, setFeedback] = useState({ text: '', isError: false });

  const handleSave = () => {
    if (!dishName.trim() || !description.trim() || !price.trim()) {
      setFeedback({ text: 'Validation Error: All fields are required.', isError: true });
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setFeedback({ text: 'Validation Error: Price must be a valid positive number.', isError: true });
      return;
    }

    // Save to shared array
    sharedMenuItems.unshift({
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: parsedPrice.toFixed(2),
    });

    // Reset inputs
    setDishName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
    setFeedback({ text: 'Success: Item saved to catalog!', isError: false });

    setTimeout(() => setFeedback({ text: '', isError: false }), 3000);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {feedback.text !== '' && (
            <View style={[styles.feedbackBanner, feedback.isError ? styles.errorBanner : styles.successBanner]}>
              <Text style={feedback.isError ? styles.errorText : styles.successText}>{feedback.text}</Text>
            </View>
          )}

          <View style={styles.formCard}>
            <Text style={styles.sectionHeader}>Add New Menu Entry</Text>

            <Text style={styles.inputLabel}>Dish Title / Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., Seafood Paella"
              placeholderTextColor="#94A3B8"
              value={dishName}
              onChangeText={setDishName}
            />

            <Text style={styles.inputLabel}>Course Classification</Text>
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={course} onValueChange={(val) => setCourse(val)}>
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Main Course" value="Main Course" />
                <Picker.Item label="Dessert" value="Dessert" />
              </Picker>
            </View>

            <Text style={styles.inputLabel}>Unit Price (R)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., 160.00"
              placeholderTextColor="#94A3B8"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />

            <Text style={styles.inputLabel}>Dish Description</Text>
            <TextInput
              style={[styles.textInput, styles.multilineInput]}
              placeholder="Provide key ingredients..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={3}
              value={description}
              onChangeText={setDescription}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
              <Text style={styles.submitButtonText}>+ Save Menu Item</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 16 },
  feedbackBanner: { padding: 12, borderRadius: 8, marginBottom: 16 },
  errorBanner: { backgroundColor: '#FEE2E2', borderLeftWidth: 4, borderLeftColor: '#EF4444' },
  successBanner: { backgroundColor: '#DCFCE7', borderLeftWidth: 4, borderLeftColor: '#22C55E' },
  errorText: { color: '#991B1B', fontWeight: '600', fontSize: 13 },
  successText: { color: '#166534', fontWeight: '600', fontSize: 13 },
  formCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, elevation: 2 },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', marginBottom: 12 },
  inputLabel: { fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 4, marginTop: 8 },
  textInput: { backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, fontSize: 14 },
  multilineInput: { height: 70, textAlignVertical: 'top' },
  pickerWrapper: { backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, overflow: 'hidden' },
  submitButton: { backgroundColor: '#0891B2', borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginTop: 16 },
  submitButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
});