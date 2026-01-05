import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

interface ProfileAvatarProps {
  uri: string;
  size?: number; 
  isOnline?: boolean;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ uri, size = 60, isOnline = false }) => {
  const avatarSize = { width: size, height: size, borderRadius: size / 2 };
  const badgeSize = size * 0.25; 
  const badgePositionOffset = size * 0.05; 
  
  const badgeStyle = {
    width: badgeSize,
    height: badgeSize,
    borderRadius: badgeSize / 2,
    bottom: badgePositionOffset,
    right: badgePositionOffset,
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={{ uri }}
        style={[styles.avatar, avatarSize]}
      />
      {isOnline && (
        <View style={[styles.onlineBadge, badgeStyle]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 1, 
    borderColor: '#ccc', 
  },
  onlineBadge: {
    position: 'absolute',
    backgroundColor: '#4BCB1F', 
    borderWidth: 2, 
    borderColor: 'white', 
  },
});

export default ProfileAvatar;