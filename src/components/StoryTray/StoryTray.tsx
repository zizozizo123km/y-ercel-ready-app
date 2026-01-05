import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import StoryCard from '../StoryCard/StoryCard'; // Assuming a StoryCard component exists
import AddStoryCard from '../AddStoryCard/AddStoryCard'; // Assuming an AddStoryCard component exists

// Mock data for stories (replace with actual data fetching logic)
const STORIES_DATA = [
  { id: '1', userName: 'Your Story', profileUri: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=User1', storyUri: 'https://via.placeholder.com/300/FF5733/FFFFFF?text=Story1' },
  { id: '2', userName: 'John Doe', profileUri: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=User2', storyUri: 'https://via.placeholder.com/300/33FF57/FFFFFF?text=Story2' },
  { id: '3', userName: 'Jane Smith', profileUri: 'https://via.placeholder.com/150/5733FF/FFFFFF?text=User3', storyUri: 'https://via.placeholder.com/300/5733FF/FFFFFF?text=Story3' },
  { id: '4', userName: 'Peter Jones', profileUri: 'https://via.placeholder.com/150/FF33A1/FFFFFF?text=User4', storyUri: 'https://via.placeholder.com/300/FF33A1/FFFFFF?text=Story4' },
  { id: '5', userName: 'Mary Lee', profileUri: 'https://via.placeholder.com/150/33A1FF/FFFFFF?text=User5', storyUri: 'https://via.placeholder.com/300/33A1FF/FFFFFF?text=Story5' },
];

const StoryTray: React.FC = () => {
  const renderItem = ({ item, index }: { item: typeof STORIES_DATA[0], index: number }) => {
    // The first item is usually dedicated to "Add Story" or "Your Story"
    if (index === 0) {
      // Assuming 'Your Story' is represented by a standard StoryCard in this mock,
      // but we should replace it with AddStoryCard functionality if needed.
      // For Facebook UI, the first card is usually a dedicated 'Create Story' card.
      return <AddStoryCard profileUri={item.profileUri} />;
    }

    return (
      <StoryCard
        key={item.id}
        userName={item.userName}
        profileUri={item.profileUri}
        storyUri={item.storyUri}
      />
    );
  };

  // Prepending a placeholder for the "Create Story" card if it wasn't already in the mock data,
  // or adjusting the existing mock data structure.
  const processedStoriesData = [
    // Ensure the first item (ID 1) represents the current user's story / Add Story button
    ...STORIES_DATA,
  ];


  return (
    <View style={styles.container}>
      <FlatList
        data={processedStoriesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200, // Standard height for story tray (adjust as necessary)
    backgroundColor: '#fff', // White background
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd', // Light grey separator
  },
  listContent: {
    paddingHorizontal: 8,
  }
});

export default StoryTray;