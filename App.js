import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor(profs) {
    super(profs)
    this.state = { isLoading: true }
  }

  async getNews() {
    const response = await fetch(LINK);
    const jsonData = await response.json();
    this.setState(
      {
        data: jsonData.articles,
        isLoading: false,
      }
    );
    console.log("ddd", jsonData.articles[0].author)
  }

  componentDidMount() {
    return this.getNews();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1 }} />
      )
    }
    return (
      <SafeAreaView style={styles.safeStyle}>
        <View style={styles.container}>
          <FlatList
            data={this.state.data}
            renderItem={
              ({ item }) => {
                return (
                  <View style={styles.viewItem}>
                    <Text style={styles.textTitle}>{item.title}</Text>
                    <Image
                      source={{ uri: item.urlToImage }}
                      style={styles.image}
                    />
                    <View style={styles.viewTextRow}>
                      <Text style={styles.textPublished}>Source: </Text>
                      <Text style={styles.textContent}>{item.source.name}</Text>
                    </View>
                    <Text style={{ marginVertical: 3 }}>{item.description}</Text>
                    <View style={styles.viewTextRow}>
                      <Text style={styles.textPublished}>Published: </Text>
                      <Text style={styles.textContent}>{item.publishedAt}</Text>
                    </View>
                    <TouchableOpacity style={styles.btnRead}>
                      <Text style={styles.textReadMore}>Read more</Text>
                    </TouchableOpacity>
                  </View>
                );
              }
            } />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewItem: {
    padding: 10,
    borderColor: "#000000",
    borderWidth: 1,
    margin: 5,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginVertical: 10
  },
  textPublished: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  textContent: {
    color: "#5e5e5e",
  },
  viewTextRow: {
    flexDirection: 'row'
  },
  btnRead: {
    width: '100%',
    height: 40,
    marginTop: 10,
    backgroundColor: "#428bff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  textReadMore: {
    color: "#ffffff",
    fontWeight: '700'
  }
}
);

const LINK = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe'
