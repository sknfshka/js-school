export function loadFilms() {
  let films = [
      {
          id: "2",
          title: "Asd",
          date: new Date(2014, 11, 2),
          rating: 8.3,
          picture: "/images/iphone360_586397.jpg",
          categories: ["Комедия"]
      },
      {
          id: "4",
          title: "Джанго освобожденный",
          date: new Date(2013, 11, 2),
          rating: 2,
          picture: "/images/iphone360_586397.jpg",
          categories: ["Комедия","Боевик"]
      },
      {
          id: "1",
          title: "Аанго освобожденный",
          date: new Date(2012, 11, 2),
          rating: 5,
          picture: "/images/iphone360_586397.jpg",
          categories: ["Комедия","Боевик"]
      },
      {
          id: "3",
          title: "фыв",
          date: new Date(2015, 11, 2),
          rating: 10,
          picture: "/images/iphone360_586397.jpg",
          categories: ["Комедия","Боевик"]
      },
      {
          id: "4",
          title: "Джанго освобожденный",
          date: new Date(2013, 11, 2),
          rating: 2,
          picture: "/images/iphone360_586397.jpg",
          categories: ["Комедия","Боевик"]
      },
      {
          id: "4",
          title: "Джанго освобожденный",
          date: new Date(2013, 11, 2),
          rating: 2,
          picture: "/images/iphone360_586397.jpg",
          categories: ["Комедия","Боевик"]
      },
      {
          id: "4",
          title: "Джанго освобожденный",
          date: new Date(2013, 11, 2),
          rating: 2,
          picture: "/images/iphone360_586397.jpg",
          categories: ["Комедия","Боевик"]
      }]
      .sort((a, b) => a.title.localeCompare(b.title));

  return films;
}