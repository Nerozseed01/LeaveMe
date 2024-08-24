import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton, SkeletonProps } from '@rneui/base';

const Esqueleto = () => {
  return (
    <View style={styles.esqueletoContainer}>
      <View style={styles.esqueletoPost}>
        <View style={styles.esqueletoAvatar}>
          <Skeleton circle width={50} height={50} />
        </View>
        <View style={styles.esqueletoContent}>
          <Skeleton width="60%" height={20} style={styles.esqueletoUsername} />
          <Skeleton width="100%" height={100} style={styles.esqueletoText} />
          <Skeleton width="80%" height={20} style={styles.esqueletoInteractions} />
        </View>
      </View>
      <View style={styles.esqueletoPost}>
        <View style={styles.esqueletoAvatar}>
          <Skeleton circle width={50} height={50} />
        </View>
        <View style={styles.esqueletoContent}>
          <Skeleton width="60%" height={20} style={styles.esqueletoUsername} />
          <Skeleton width="100%" height={100} style={styles.esqueletoText} />
          <Skeleton width="80%" height={20} style={styles.esqueletoInteractions} />
        </View>
      </View>
      <View style={styles.esqueletoPost}>
        <View style={styles.esqueletoAvatar}>
          <Skeleton circle width={50} height={50} />
        </View>
        <View style={styles.esqueletoContent}>
          <Skeleton width="60%" height={20} style={styles.esqueletoUsername} />
          <Skeleton width="100%" height={100} style={styles.esqueletoText} />
          <Skeleton width="80%" height={20} style={styles.esqueletoInteractions} />
        </View>
      </View>
      <View style={styles.esqueletoPost}>
        <View style={styles.esqueletoAvatar}>
          <Skeleton circle width={50} height={50} />
        </View>
        <View style={styles.esqueletoContent}>
          <Skeleton width="60%" height={20} style={styles.esqueletoUsername} />
          <Skeleton width="100%" height={100} style={styles.esqueletoText} />
          <Skeleton width="80%" height={20} style={styles.esqueletoInteractions} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  esqueletoContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  esqueletoPost: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  esqueletoAvatar: {
    marginRight: 16,
  },
  esqueletoContent: {
    flex: 1,
  },
  esqueletoUsername: {
    marginBottom: 8,
  },
  esqueletoText: {
    marginBottom: 8,
  },
  esqueletoInteractions: {
    marginTop: 8,
  },
});

export default Esqueleto;