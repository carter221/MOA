import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

interface JournalEntryProps {
  entry: {
    title: string;
    date: string;
    text: string;
    images?: string[];
  };
  onDelete: () => void;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ entry, onDelete }) => {
  const [title, setTitle] = useState(entry.title);
  const [date, setDate] = useState(entry.date);
  const [text, setText] = useState(entry.text);
  const [images, setImages] = useState<string[]>(entry.images || []);
  const inputAccessoryViewID = 'uniqueID';

  const saveEntry = async () => {
    try {
      const journalEntry = { title, date, text, images };
      await AsyncStorage.setItem('journalEntry', JSON.stringify(journalEntry));
      console.log('Entry saved');
    } catch (error) {
      console.error('Failed to save the entry', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const deleteImage = (uri: string) => {
    setImages(images.filter(image => image !== uri));
  };

  const confirmDelete = () => {
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
              onDelete();
            } else {
              Alert.alert('Incorrect input', 'You must type DELETE to confirm.');
            }
          },
        },
      ],
      'plain-text'
    );
  };

  useEffect(() => {
    const saveOnBlur = () => {
      saveEntry();
    };

    return () => {
      saveOnBlur();
    };
  }, [title, date, text, images]);

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.imageWrapper}>
      <Image source={{ uri: item }} style={styles.image} />
      <TouchableOpacity style={styles.deleteImageButton} onPress={() => deleteImage(item)}>
        <Ionicons name="close-circle" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={images}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.imageContainer}
        />
        <TextInput
          style={styles.title}
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          onBlur={saveEntry}
          inputAccessoryViewID={inputAccessoryViewID}
        />
        <TextInput
          style={styles.date}
          value={date}
          editable={false}
        />
        <TextInput
          style={styles.text}
          value={text}
          onChangeText={setText}
          placeholder="Write your journal entry here..."
          multiline
          onBlur={saveEntry}
          inputAccessoryViewID={inputAccessoryViewID}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Ionicons name="image" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
});

export default JournalEntry;