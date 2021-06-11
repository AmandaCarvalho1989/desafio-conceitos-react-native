import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleLikeRepository(id) {

    const response = await api.post(`repositories/${id}/like`)

    const repositoryIndex = repositories.findIndex(repository => repository.id == id)
    const updatedRepository = response.data

    repositories[repositoryIndex] = updatedRepository
    setRepositories([...repositories])

  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
      {repositories.length ?
        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => {
            return (
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{repository.title}</Text>

                <View style={styles.techsContainer}>
                  {repository.techs.map((tech, idx) => (
                    <Text key={idx} style={styles.tech}>{tech}</Text>)
                  )}
                </View>

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    testID={`repository-likes-${repository.id}`}
                  >
                    {repository.likes + ' ' + 'curtidas'}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(repository.id)}
                  testID={`like-button-${repository.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        />
        : <View style={styles.emptyList}>
        <Text style={styles.emptyListTitle}>Register a repository to see it </Text>
        </View>
      }
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    marginVertical: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",

  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },

  emptyList: {
    padding: 32,
    
  },
  emptyListTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: "bold",
  }
});
