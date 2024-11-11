import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, StyleSheet, Animated } from 'react-native';

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [expandedNotes, setExpandedNotes] = useState({});

  // Add a new note with title and text
  const handleAddNote = () => {
    if (newNote.trim() !== '' && newNoteTitle.trim() !== '') {
      setNotes([...notes, { id: Date.now().toString(), title: newNoteTitle, text: newNote }]);
      setNewNote('');
      setNewNoteTitle('');
    }
  };

  // Edit a note
  const handleEditNote = (item) => {
    setNewNoteTitle(item.title);
    setNewNote(item.text);
    setIsEditingNote(true);
    setCurrentNote(item);
  };

  // Save the edited note
  const handleSaveNote = () => {
    setNotes(notes.map(note => note.id === currentNote.id ? { ...note, title: newNoteTitle, text: newNote } : note));
    setIsEditingNote(false);
    setNewNote('');
    setNewNoteTitle('');
    setCurrentNote(null);
  };

  // Delete a note
  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Toggle expanded state of a note
  const toggleExpandNote = (id) => {
    setExpandedNotes(prevState => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the expanded state of the note
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>

      {/* Notes Section */}
      <View style={styles.notesContainer}>
        <TextInput
          style={styles.noteTitleInput}
          placeholder="Note Title"
          placeholderTextColor="#97A97C"
          value={newNoteTitle}
          onChangeText={setNewNoteTitle}
        />
        <ScrollView style={styles.noteInputScroll}>
          <TextInput
            style={styles.noteInput}
            placeholder="Add a new note"
            placeholderTextColor="#97A97C"
            value={newNote}
            onChangeText={setNewNote}
            multiline={true}
          />
        </ScrollView>
        <TouchableOpacity
          style={isEditingNote ? styles.saveButton : styles.addButton}
          onPress={isEditingNote ? handleSaveNote : handleAddNote}
        >
          <Text style={styles.buttonText}>
            {isEditingNote ? 'Save Note' : 'Add Note'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View style={[styles.noteContainer]}>
            <TouchableOpacity onPress={() => toggleExpandNote(item.id)} style={styles.noteHeader}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={expandedNotes[item.id] ? styles.arrowUp : styles.arrowDown}>
                {expandedNotes[item.id] ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {expandedNotes[item.id] && (
              <View style={styles.noteDetails}>
                <Text style={styles.noteText}>{item.text}</Text>
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditNote(item)}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteNote(item.id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Animated.View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#DCEBCA',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#606F49',
    marginBottom: 20,
  },
  notesContainer: {
    backgroundColor: '#FDF3E1',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0D1B5',
    padding: 15,
    elevation: 3,
    height: 250,
  },
  noteTitleInput: {
    fontWeight: 'bold',
    borderBottomColor: '#97A97C',
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    color: '#606F49',
    backgroundColor: '#FFFBEA',
  },
  noteInputScroll: {
    maxHeight: 500,
  },
  noteInput: {
    textAlignVertical: 'top',
    borderColor: '#97A97C',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFFBEA',
    fontSize: 16,
    color: '#606F49',
    height: 100,
  },
  noteContainer: {
    backgroundColor: '#CFE1B9',
    borderWidth: 1,
    borderColor: '#A6B98B',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#606F49',
  },
  arrowDown: {
    fontSize: 18,
    color: '#849669',
  },
  arrowUp: {
    fontSize: 18,
    color: '#849669',
  },
  noteDetails: {
    marginTop: 10,
  },
  noteText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#606F49',
  },
  addButton: {
    backgroundColor: '#728359',
    height: 40,  // Adjust the height
    width: '100%',  // Adjust the width, or set it to a specific value like '80%', or '200' for fixed width
    justifyContent: 'center',  // Centers the text vertically
    alignItems: 'center',  // Centers the text horizontally
    borderRadius: 10,
    paddingVertical: 10,  // Adjust padding as needed
    paddingHorizontal: 10,  // Adjust padding for better width control
    marginTop: 10,
   
  },
  saveButton: {
    backgroundColor: '#849669',
    height: 40,  // Adjust the height
    width: '100%',  // Adjust the width similarly
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 10,  // Adjust padding for consistency
    paddingHorizontal: 30,
    
  },
  
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#849669',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  deleteButton: {
    backgroundColor: '#606F49',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
});

export default Note;

