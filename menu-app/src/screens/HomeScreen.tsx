import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Image 
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import Header from '../components/Header';
import { Course } from '../types';

// Predefined menu items
const PREDEFINED_ITEMS = [
  // Starters
  { name: 'Garlic Bread', description: 'Freshly baked bread with garlic butter', course: 'Starters' as Course, price: '5.99' },
  { name: 'Bruschetta', description: 'Toasted bread with tomatoes and basil', course: 'Starters' as Course, price: '6.99' },
  { name: 'Caesar Salad', description: 'Crisp romaine with Caesar dressing', course: 'Starters' as Course, price: '8.99' },
  { name: 'Spring Rolls', description: 'Crispy vegetable spring rolls', course: 'Starters' as Course, price: '7.99' },
  { name: 'Mozzarella Sticks', description: 'Breaded mozzarella with marinara', course: 'Starters' as Course, price: '6.99' },

  // Mains
  { name: 'Grilled Salmon', description: 'Atlantic salmon with lemon butter', course: 'Mains' as Course, price: '18.99' },
  { name: 'Beef Burger', description: 'Juicy beef patty with special sauce', course: 'Mains' as Course, price: '12.99' },
  { name: 'Chicken Parmesan', description: 'Breaded chicken with tomato sauce', course: 'Mains' as Course, price: '16.99' },
  { name: 'Vegetable Pasta', description: 'Fresh pasta with seasonal vegetables', course: 'Mains' as Course, price: '14.99' },
  { name: 'BBQ Ribs', description: 'Tender pork ribs with BBQ sauce', course: 'Mains' as Course, price: '19.99' },

  // Dessert
  { name: 'Chocolate Cake', description: 'Rich chocolate cake with ganache', course: 'Dessert' as Course, price: '6.99' },
  { name: 'Cheesecake', description: 'New York style with berry compote', course: 'Dessert' as Course, price: '7.99' },
  { name: 'Tiramisu', description: 'Classic Italian coffee dessert', course: 'Dessert' as Course, price: '8.99' },
  { name: 'Ice Cream Sundae', description: 'Vanilla ice cream with toppings', course: 'Dessert' as Course, price: '5.99' },
  { name: 'Apple Pie', description: 'Warm apple pie with ice cream', course: 'Dessert' as Course, price: '6.99' },

  // Drinks
  { name: 'Fresh Lemonade', description: 'Homemade lemonade with mint', course: 'Drinks' as Course, price: '3.99' },
  { name: 'Iced Coffee', description: 'Chilled coffee with milk', course: 'Drinks' as Course, price: '4.99' },
  { name: 'Fruit Smoothie', description: 'Mixed berry smoothie', course: 'Drinks' as Course, price: '5.99' },
  { name: 'Hot Chocolate', description: 'Rich hot chocolate', course: 'Drinks' as Course, price: '4.99' },
  { name: 'Green Tea', description: 'Premium green tea', course: 'Drinks' as Course, price: '2.99' },
];

export default function HomeScreen({ navigation }: any) {
  const { items, addItem, getTotalItems } = useMenu();

  const handleAddItem = (item: any) => {
    addItem(item);
  };

  const isItemAdded = (itemName: string) => {
    return items.some(item => item.name === itemName);
  };

  const CourseSection = ({ course }: { course: Course }) => {
    const courseItems = PREDEFINED_ITEMS.filter(item => item.course === course);
    
    return (
      <View style={styles.courseSection}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseTitle}>{course}</Text>
          <Text style={styles.courseCount}>{courseItems.length} items</Text>
        </View>
        
        {courseItems.map((item, index) => (
          <View key={index} style={styles.menuItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.addButton,
                isItemAdded(item.name) && styles.addedButton
              ]}
              onPress={() => handleAddItem(item)}
              disabled={isItemAdded(item.name)}
            >
              <Text style={[
                styles.addButtonText,
                isItemAdded(item.name) && styles.addedButtonText
              ]}>
                {isItemAdded(item.name) ? 'Added ✓' : 'Add to Menu'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  const totalPredefinedItems = PREDEFINED_ITEMS.length;
  const totalChefItems = getTotalItems();
  const totalCombinedItems = totalPredefinedItems + totalChefItems;

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.heroSection}>
        <Image 
         
         source={require('../assets/images/chef.webp')}
          style={styles.chefImage}
        />
        <View style={styles.heroText}>
          <Text style={styles.welcomeTitle}>Welcome, Chef! 👨‍🍳</Text>
          <Text style={styles.subtitle}>
            Browse our predefined menu items and add them to your restaurant's menu
          </Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalCombinedItems}</Text>
          <Text style={styles.statLabel}>Total Items</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalChefItems}</Text>
          <Text style={styles.statLabel}>Added by You</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalPredefinedItems}</Text>
          <Text style={styles.statLabel}>Predefined</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <CourseSection course="Starters" />
        <CourseSection course="Mains" />
        <CourseSection course="Dessert" />
        <CourseSection course="Drinks" />

        <TouchableOpacity 
          style={styles.createNewButton}
          onPress={() => navigation.navigate('AddMenu')}
        >
          <Text style={styles.createNewButtonText}>+ Create Custom Menu Item</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  
  // Hero Section avec photo du chef
  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  chefImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#2E8B57',
  },
  heroText: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2E8B57',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },

  // Stats Section
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E8B57',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },

  scrollView: { flex: 1, padding: 15 },
  
  courseSection: {
    marginBottom: 30,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E8B57',
  },
  courseCount: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#E9ECEF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  hefPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    backgroundColor: '#2E8B57',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#276749',
  },
  chefPlaceholderText: {
    fontSize: 32,
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 18,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E8B57',
  },
  addButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#2E8B57',
    minWidth: 100,
    alignItems: 'center',
  },
  addedButton: {
    backgroundColor: '#6C757D',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  addedButtonText: {
    color: '#E9ECEF',
  },
  createNewButton: {
    backgroundColor: '#FF7F3F',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#FF7F3F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  createNewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});