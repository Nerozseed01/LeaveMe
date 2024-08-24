import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { ListItem, Button } from 'react-native-elements';

const HomeScreenSkeleton = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.title} />
        <View style={styles.editButton} />
      </View>

      {/* Activity List */}
      <View style={styles.activityList}>
        {[...Array(5)].map((_, index) => (
          <ListItem key={index} containerStyle={styles.activityItem}>
            <ListItem.Content>
              <View style={styles.activityText} />
            </ListItem.Content>
            <View style={styles.checkbox} />
          </ListItem>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          title=""
          buttonStyle={styles.progressButton}
          loadingProps={{ animating: true }}
          loading
        />
        <Button
          icon={{
            name: 'add',
            size: 25,
            color: 'white',
          }}
          buttonStyle={styles.addButton}
          loadingProps={{ animating: true }}
          loading
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  title: {
    width: 200,
    height: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  editButton: {
    width: 40,
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },
  activityList: {
    height: '82%',
  },
  activityItem: {
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  activityText: {
    width: '70%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  checkbox: {
    width: 25,
    height: 25,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    paddingBottom: 12,
  },
  progressButton: {
    width: 120,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
  },
});

export default HomeScreenSkeleton;