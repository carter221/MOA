import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Text
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';

interface JournalEntryProps {
  entry: {
    title: string;
    date: string;
    text: string;
    images?: string[];
  };
  onDelete: () => void;
}

interface JournalEntryState {
  title: string;
  date: string;
  text: string;
  images: string[];
  emoji: string;
  isEmojiPickerVisible: boolean;
  width: number;
  isReady: boolean;
}

class JournalEntry extends Component<JournalEntryProps, JournalEntryState> {
  constructor(props: JournalEntryProps) {
    super(props);
    this.state = {
      title: props.entry.title,
      date: props.entry.date,
      text: props.entry.text,
      images: props.entry.images || [],
      emoji: '😊', // Predefined emoji
      isEmojiPickerVisible: false,
      width: 0,
      isReady: false,
    };
  }

  saveEntry = async () => {
    try {
      const journalEntry = {
        [this.state.date]: {
          title: this.state.title,
          text: this.state.text,
          images: this.state.images,
          emoji: this.state.emoji
        }
      };
      await AsyncStorage.setItem('journalEntry', JSON.stringify(journalEntry));
      console.log(journalEntry);
    } catch (error) {
      console.error('Failed to save the entry', error);
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      this.setState({ images: [...this.state.images, result.assets[0].uri] });
    }
  };

  deleteImage = (uri: string) => {
    this.setState({ images: this.state.images.filter(image => image !== uri) });
  };

  confirmDelete = () => {
    Alert.prompt(
      'Confirm Deletion',
      'Please type DELETE to confirm',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (input) => {
            if (input === 'DELETE') {
              this.props.onDelete();
            } else {
              Alert.alert('Incorrect input', 'You must type DELETE to confirm.');
            }
          },
        },
      ],
      'plain-text'
    );
  };

  handleLayout = ({ nativeEvent: { layout } }: any) => {
    this.setState({ width: layout.width }, () => {
      this.prerenderEmojis(() => {
        this.setState({ isReady: true });
      });
    });
  };

  prerenderEmojis = (callback: () => void) => {
    // Implement the logic to prerender emojis here
    callback();
  };

  componentDidUpdate(prevProps: JournalEntryProps, prevState: JournalEntryState) {
    if (
      prevState.title !== this.state.title ||
      prevState.date !== this.state.date ||
      prevState.text !== this.state.text ||
      prevState.images !== this.state.images ||
      prevState.emoji !== this.state.emoji
    ) {
      this.saveEntry();
    }
  }

  renderItem = ({ item }: { item: string }) => (
    <View style={styles.imageWrapper}>
      <Image source={{ uri: item }} style={styles.image} />
      <TouchableOpacity style={styles.deleteImageButton} onPress={() => this.deleteImage(item)}>
        <Ionicons name="close-circle" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container} onLayout={this.handleLayout}>
        <ScrollView>
          <FlatList
            data={this.state.images}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
            contentContainerStyle={styles.imageContainer}
          />
          <TextInput
            style={styles.title}
            value={this.state.title}
            onChangeText={(title) => this.setState({ title })}
            placeholder="Title"
            onBlur={this.saveEntry}
            inputAccessoryViewID="uniqueID"
          />
          <TextInput
            style={styles.date}
            value={this.state.date}
            editable={false}
          />
          <TouchableOpacity onPress={() => this.setState({ isEmojiPickerVisible: true })}>
            <Text style={styles.emoji}>{this.state.emoji || 'Select Emoji'}</Text>
          </TouchableOpacity>
          {this.state.isEmojiPickerVisible && (
            <EmojiSelector
              onEmojiSelected={(emoji) => {
                this.setState({ emoji, isEmojiPickerVisible: false });
              }}
              showSearchBar={false}
              showTabs={false}
              showHistory={false}
              showSectionTitles={false}
              category={Categories.all}
            />
          )}
          <TextInput
            style={styles.text}
            value={this.state.text}
            onChangeText={(text) => this.setState({ text })}
            placeholder="Write your journal entry here..."
            multiline
            onBlur={this.saveEntry}
            inputAccessoryViewID="uniqueID"
          />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={this.pickImage}>
            <Ionicons name="image" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={this.confirmDelete}>
            <Ionicons name="trash" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    height: 200,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  imageContainer: {
    justifyContent: 'space-between',
  },
  imageWrapper: {
    position: 'relative',
    width: '48%',
    height: 200,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  deleteImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageButton: {
    backgroundColor: 'gray',
    padding: 10,
    alignItems: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 24,
    marginBottom: 20,
  },
  predefinedEmoji: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default JournalEntry;