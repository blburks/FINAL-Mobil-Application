import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getNotes } from "../../repositories/notes";

type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function NotesListScreen() {
  const navigation = useNavigation<any>();
  const [notes, setNotes] = useState<Note[]>([]);

  // Lifecycle: refresh notes + start timer when screen becomes active
  useFocusEffect(
    useCallback(() => {
      // Load notes from SQLite
      getNotes((loadedNotes: Note[]) => {
        setNotes(loadedNotes);
      });
      // Fetch sample public API data
      fetch("https://api.restful-api.dev/objects")
        .then((res) => res.json())
        .then((apiData) => {
          console.log("Public API data:", apiData);
        })
        .catch((err) => console.error("API error:", err));
      // Example lifecycle subscription (timer)
      const interval = setInterval(() => {
        console.log("NotesListScreen is active");
      }, 5000);
      // Cleanup when screen becomes inactive
      return () => clearInterval(interval);
    }, []),
  );

  const renderItem = ({ item }: { item: Note }) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => navigation.navigate("NoteDetailScreen", { note: item })}
    >
      <Text style={styles.noteTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddNoteScreen")}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  noteItem: {
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});