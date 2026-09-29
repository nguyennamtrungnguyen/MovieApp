import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "../components/MovieCard";
import { Movie } from "../types/Movie";

const API_URL = "https://6abb553cb2118ed7abb840a4.mockapi.io/movies";
const HomeScreen = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isTile, setIsTile] = useState(false);

  const fetchMovies = async () => {
    const res = await fetch(API_URL);
    const data: Movie[] = await res.json();
    setMovies(data);
  };

  useEffect(() => {
    fetchMovies()
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchMovies();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSelect = useCallback(
    (id: string) =>
      Alert.alert("Phim", movies.find((m) => m.id === id)?.title ?? id),
    [movies]
  );

  const numColumns = isTile ? 2 : 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Movie App</Text>
        <View style={styles.switchRow}>
          <Text>Dạng lưới </Text>
          <Switch value={isTile} onValueChange={setIsTile} />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          key={String(numColumns)}
          data={movies}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          columnWrapperStyle={
            isTile ? { justifyContent: "space-between" } : undefined
          }
          contentContainerStyle={{ padding: 10 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              layout={isTile ? "tile" : "row"}
              onSelect={handleSelect}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
