import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
};

export type MovieCardProps = {
  movie: Movie;
  layout?: "row" | "tile";
  onSelect: (id: string) => void;
};

const MovieCard = ({ movie, layout = "row", onSelect }: MovieCardProps) => {
  const isTile = layout === "tile";
  const ratingText = `⭐ ${movie.rating.toFixed(1)}`;

  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.cardTile]}
      onPress={() => onSelect(movie.id)}
      activeOpacity={0.8}
    >
      <View style={isTile && styles.posterWrapTile}>
        <Image
          source={{ uri: movie.poster }}
          style={[styles.poster, isTile && styles.posterTile]}
        />
        {isTile && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{ratingText}</Text>
          </View>
        )}
      </View>

      <View style={[styles.info, isTile && styles.infoTile]}>
        <Text style={styles.title} numberOfLines={isTile ? 1 : 2}>
          {movie.title}
        </Text>
        {!isTile && (
          <>
            <Text style={styles.sub}>{movie.genre}</Text>
            <Text style={styles.sub}>{movie.year}</Text>
            <Text style={styles.rating}>{ratingText}</Text>
          </>
        )}
        <Text style={styles.status}>{movie.isShowing ? "✅" : "❌"}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cardTile: {
    width: "48%",
    flexDirection: "column",
    padding: 0,
    overflow: "hidden",
  },
  poster: { 
    width: 70, 
    height: 100, 
    borderRadius: 6 },
  posterTile: {
    width: "100%",
    height: undefined,
    aspectRatio: 2 / 3,
    borderRadius: 0,
  },
  posterWrapTile: { width: "100%" },
  badge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: { 
    color: "#fff", 
    fontSize: 12, 
    fontWeight: "600" 
},
  info: { 
    flex: 1, 
    marginLeft: 10, 
    justifyContent: "center" 
  },
  infoTile: { 
    flex: 0, 
    marginLeft: 0, 
    padding: 8 
  },
  title: { 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  sub: { 
    fontSize: 13, 
    color: "#666", 
    marginTop: 2 
  },
  rating: { 
    fontSize: 14, 
    marginTop: 4 
  },
  status: { 
    fontSize: 16, 
    marginTop: 4 
  },
});

export default React.memo(MovieCard);
