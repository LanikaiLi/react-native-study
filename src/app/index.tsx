import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

export default function Index() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (text.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: text.trim(),
      done: false,
    };
    setTodos([...todos, newTodo]);
    setText('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todos</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Add a task"
          value={text}
          onChangeText={setText}
        />
        <Pressable style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        style={styles.list}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable style={styles.itemMain} onPress={() => toggleTodo(item.id)}>
              <Text style={[styles.itemText, item.done && styles.itemTextDone]}>
                {item.title}
              </Text>
            </Pressable>
            <Pressable onPress={() => deleteTodo(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  list: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemMain: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },
  deleteText: {
    color: '#e24a4a',
    fontWeight: 'bold',
  },
});